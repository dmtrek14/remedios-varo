import { createSignal, createEffect, For, onMount, onCleanup } from 'solid-js'
import type { Component } from 'solid-js'

export interface CarouselImage {
  src: string
  title?: string
  year?: string
  description?: string
  alt?: string
}

interface CarouselProps {
  images: CarouselImage[]
  height?: string
  showControls?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

const Carousel: Component<CarouselProps> = (props) => {
  const {
    images,
    height = '600px',
    showControls = true,
    autoPlay = false,
    autoPlayInterval = 5000
  } = props

  const [currentSlide, setCurrentSlide] = createSignal(0)
  const [isAutoPlaying, setIsAutoPlaying] = createSignal(autoPlay)
  let carouselRef: HTMLDivElement | undefined
  let autoPlayTimer: number | undefined

  // Navigate to a specific slide
  const goToSlide = (index: number) => {
    if (index < 0 || index >= images.length) return

    setCurrentSlide(index)

    if (carouselRef) {
      const slideWidth = carouselRef.offsetWidth
      carouselRef.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      })
    }
  }

  // Navigate to previous slide
  const prevSlide = () => {
    const newIndex = currentSlide() === 0 ? images.length - 1 : currentSlide() - 1
    goToSlide(newIndex)
  }

  // Navigate to next slide
  const nextSlide = () => {
    const newIndex = currentSlide() === images.length - 1 ? 0 : currentSlide() + 1
    goToSlide(newIndex)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextSlide()
    }
  }

  // Auto-play functionality
  const startAutoPlay = () => {
    if (typeof window === 'undefined' || !isAutoPlaying()) return

    autoPlayTimer = window.setInterval(() => {
      nextSlide()
    }, autoPlayInterval)
  }

  const stopAutoPlay = () => {
    if (typeof window === 'undefined') return

    if (autoPlayTimer) {
      clearInterval(autoPlayTimer)
      autoPlayTimer = undefined
    }
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying())
  }

  // Setup and cleanup
  onMount(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('keydown', handleKeyDown)

    if (isAutoPlaying()) {
      startAutoPlay()
    }
  })

  onCleanup(() => {
    if (typeof window === 'undefined') return

    window.removeEventListener('keydown', handleKeyDown)
    stopAutoPlay()
  })

  // Watch for auto-play changes
  createEffect(() => {
    if (typeof window === 'undefined') return

    if (isAutoPlaying()) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
  })

  if (!images || images.length === 0) {
    return null
  }

  const currentImage = () => images[currentSlide()]

  return (
    <div class="w-full carousel-wrapper">
      {/* Main carousel */}
      <div
        class="carousel w-full overflow-hidden relative"
        style={{ height }}
        onMouseEnter={() => autoPlay && stopAutoPlay()}
        onMouseLeave={() => autoPlay && isAutoPlaying() && startAutoPlay()}
      >
        <div
          ref={carouselRef}
          class="flex transition-transform duration-500 ease-in-out h-full"
          style={{
            transform: `translateX(-${currentSlide() * 100}%)`,
            width: `${images.length * 100}%`
          }}
        >
          <For each={images}>
            {(image, index) => (
              <div class="w-full h-full flex-shrink-0 flex items-center justify-center bg-base-300">
                <img
                  src={image.src}
                  alt={image.alt || image.title || `Slide ${index() + 1}`}
                  class="max-w-full max-h-full object-contain"
                  loading={index() === 0 ? 'eager' : 'lazy'}
                />
              </div>
            )}
          </For>
        </div>

        {/* Navigation buttons - outside the sliding container */}
        {showControls && images.length > 1 && (
          <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10 pointer-events-none">
            <button
              class="btn btn-circle pointer-events-auto"
              onClick={prevSlide}
              aria-label="Previous slide"
              type="button"
            >
              ❮
            </button>
            <button
              class="btn btn-circle pointer-events-auto"
              onClick={nextSlide}
              aria-label="Next slide"
              type="button"
            >
              ❯
            </button>
          </div>
        )}
      </div>

      {/* Caption display */}
      <div class="w-full bg-base-200 p-4 text-center min-h-[4rem] flex items-center justify-center">
        <div class="w-full">
          {currentImage().title && currentImage().year ? (
            <p class="font-semibold text-lg">
              {currentImage().title} ({currentImage().year})
            </p>
          ) : currentImage().title ? (
            <p class="font-semibold text-lg">{currentImage().title}</p>
          ) : currentImage().year ? (
            <p class="font-semibold text-lg">{currentImage().year}</p>
          ) : (
            <p class="text-base-content/50 italic">No caption</p>
          )}
          {currentImage().description && (
            <p class="text-sm text-base-content/70 mt-1">{currentImage().description}</p>
          )}
        </div>
      </div>

      {/* Dot navigation */}
      {images.length > 1 && (
        <div class="flex w-full justify-center gap-2 py-2">
          <For each={images}>
            {(_, index) => (
              <button
                class={`btn btn-xs ${currentSlide() === index() ? 'btn-primary' : ''}`}
                onClick={() => goToSlide(index())}
                type="button"
                aria-label={`Go to slide ${index() + 1}`}
              >
                {index() + 1}
              </button>
            )}
          </For>
        </div>
      )}
    </div>
  )
}

export default Carousel

import { Show, createEffect } from 'solid-js';
import type { Artwork } from '@/data/artworks';

interface Props {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  locale?: string;
}

export default function ArtworkLightbox(props: Props) {
  const locale = () => props.locale || 'es';

  const translations = {
    es: {
      close: 'Cerrar',
      prev: 'Anterior',
      next: 'Siguiente',
      type: 'Tipo',
      year: 'Año',
      medium: 'Técnica',
      collection: 'Colección',
      tags: 'Etiquetas'
    },
    en: {
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
      type: 'Type',
      year: 'Year',
      medium: 'Medium',
      collection: 'Collection',
      tags: 'Tags'
    }
  };

  const t = () => translations[locale() as keyof typeof translations] || translations.es;

  // Handle keyboard events
  createEffect(() => {
    if (props.isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') props.onClose();
        if (e.key === 'ArrowLeft') props.onPrev();
        if (e.key === 'ArrowRight') props.onNext();
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  });

  const title = () => {
    if (!props.artwork) return '';
    return locale() === 'es' && props.artwork.titleEs
      ? props.artwork.titleEs
      : props.artwork.title;
  };

  const description = () => {
    if (!props.artwork) return '';
    return locale() === 'es' && props.artwork.descriptionEs
      ? props.artwork.descriptionEs
      : props.artwork.description;
  };

  return (
    <Show when={props.isOpen && props.artwork}>
      <div class="modal modal-open">
        <div class="modal-box max-w-6xl w-full p-0 overflow-hidden">
          {/* Close button */}
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50 bg-base-100/80 hover:bg-base-100"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); props.onClose(); }}
            type="button"
          >
            ✕
          </button>

          {/* Content */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div class="relative bg-base-300 flex items-center justify-center p-8" style="min-height: 500px;">
              <img
                src={`/src/assets/work/${props.artwork?.imagePath}`}
                alt={title()}
                class="max-w-full max-h-[600px] object-contain"
              />

              {/* Navigation arrows */}
              <button
                class="btn btn-circle btn-ghost absolute left-2 top-1/2 -translate-y-1/2 bg-base-100/80 hover:bg-base-100"
                style="transform: translateY(-50%) !important; transition: none !important;"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); props.onPrev(); }}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                class="btn btn-circle btn-ghost absolute right-2 top-1/2 -translate-y-1/2 bg-base-100/80 hover:bg-base-100"
                style="transform: translateY(-50%) !important; transition: none !important;"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); props.onNext(); }}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Details Section */}
            <div class="p-8 overflow-y-auto max-h-[600px]">
              <h2 class="text-3xl font-bold mb-4">{title()}</h2>

              <div class="space-y-4">
                {/* Year */}
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div class="text-sm font-semibold text-base-content/70">{t().year}</div>
                    <div class="text-lg">{props.artwork?.year}</div>
                  </div>
                </div>

                {/* Type */}
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <div class="text-sm font-semibold text-base-content/70">{t().type}</div>
                    <div class="text-lg capitalize">{props.artwork?.type}</div>
                  </div>
                </div>

                {/* Medium */}
                <Show when={props.artwork?.medium}>
                  <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <div>
                      <div class="text-sm font-semibold text-base-content/70">{t().medium}</div>
                      <div class="text-lg">{props.artwork?.medium}</div>
                    </div>
                  </div>
                </Show>

                {/* Collection */}
                <Show when={props.artwork?.collection}>
                  <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <div>
                      <div class="text-sm font-semibold text-base-content/70">{t().collection}</div>
                      <div class="text-lg">{props.artwork?.collection}</div>
                    </div>
                  </div>
                </Show>

                {/* Description */}
                <Show when={description()}>
                  <div class="pt-4 border-t border-base-300">
                    <p class="text-base-content/80 leading-relaxed">{description()}</p>
                  </div>
                </Show>

                {/* Tags */}
                <Show when={props.artwork?.tags && props.artwork.tags.length > 0}>
                  <div class="pt-4">
                    <div class="text-sm font-semibold text-base-content/70 mb-2">{t().tags}</div>
                    <div class="flex flex-wrap gap-2">
                      {props.artwork?.tags.map(tag => (
                        <div class="badge badge-outline">{tag.replace(/-/g, ' ')}</div>
                      ))}
                    </div>
                  </div>
                </Show>
              </div>
            </div>
          </div>
        </div>

        {/* Modal backdrop */}
        <div class="modal-backdrop" onClick={props.onClose}></div>
      </div>
    </Show>
  );
}

import { createSignal, createMemo, For, Show } from 'solid-js';
import type { Artwork } from '@/data/artworks';
import ArtworkCard from './ArtworkCard';
import ArtworkLightbox from './ArtworkLightbox';
import { getUniqueYears, getUniqueTypes, getUniqueTags } from '@/data/artworks';

interface Props {
  artworks: Artwork[];
  locale?: string;
}

export default function ArtworkGallery(props: Props) {
  const ITEMS_PER_PAGE = 25;
  const locale = () => props.locale || 'es';

  // State
  const [searchQuery, setSearchQuery] = createSignal('');
  const [sortBy, setSortBy] = createSignal<'year-asc' | 'year-desc' | 'title-asc' | 'title-desc'>('year-desc');
  const [selectedTypes, setSelectedTypes] = createSignal<string[]>(getUniqueTypes(props.artworks));
  const [selectedTags, setSelectedTags] = createSignal<string[]>([]);
  const [yearMin, setYearMin] = createSignal<number | null>(null);
  const [yearMax, setYearMax] = createSignal<number | null>(null);
  const [currentPage, setCurrentPage] = createSignal(1);
  const [lightboxIndex, setLightboxIndex] = createSignal<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = createSignal(false);

  // Computed values
  const years = () => getUniqueYears(props.artworks);
  const types = () => getUniqueTypes(props.artworks);
  const tags = () => getUniqueTags(props.artworks);
  const minYear = () => Math.min(...years());
  const maxYear = () => Math.max(...years());

  // Filtered and sorted artworks
  const filteredArtworks = createMemo(() => {
    let results = [...props.artworks];

    // Search filter
    const query = searchQuery().toLowerCase();
    if (query) {
      results = results.filter(artwork =>
        artwork.title.toLowerCase().includes(query) ||
        artwork.titleEs?.toLowerCase().includes(query)
      );
    }

    // Type filter
    const types = selectedTypes();
    if (types.length > 0) {
      results = results.filter(artwork => types.includes(artwork.type));
    }

    // Tags filter
    const tags = selectedTags();
    if (tags.length > 0) {
      results = results.filter(artwork =>
        tags.some(tag => artwork.tags.includes(tag))
      );
    }

    // Year range
    const yMin = yearMin();
    const yMax = yearMax();
    if (yMin) results = results.filter(a => a.year >= yMin);
    if (yMax) results = results.filter(a => a.year <= yMax);

    // Sort
    const sort = sortBy();
    results.sort((a, b) => {
      switch (sort) {
        case 'year-asc': return a.year - b.year;
        case 'year-desc': return b.year - a.year;
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        default: return 0;
      }
    });

    return results;
  });

  // Paginated artworks
  const paginatedArtworks = createMemo(() => {
    const start = (currentPage() - 1) * ITEMS_PER_PAGE;
    return filteredArtworks().slice(start, start + ITEMS_PER_PAGE);
  });

  const totalPages = createMemo(() => Math.ceil(filteredArtworks().length / ITEMS_PER_PAGE));

  // Event handlers
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSortBy('year-desc');
    setSelectedTypes(types());
    setSelectedTags([]);
    setYearMin(null);
    setYearMax(null);
    setCurrentPage(1);
  };

  const handleSearch = (e: Event) => {
    setSearchQuery((e.target as HTMLInputElement).value);
    setCurrentPage(1);
  };

  const handleSort = (e: Event) => {
    setSortBy((e.target as HTMLSelectElement).value as any);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const prevLightbox = () => {
    const current = lightboxIndex();
    if (current !== null) {
      const newIndex = current === 0 ? filteredArtworks().length - 1 : current - 1;
      setLightboxIndex(newIndex);
    }
  };

  const nextLightbox = () => {
    const current = lightboxIndex();
    if (current !== null) {
      const newIndex = current === filteredArtworks().length - 1 ? 0 : current + 1;
      setLightboxIndex(newIndex);
    }
  };

  const currentLightboxArtwork = createMemo(() => {
    const index = lightboxIndex();
    return index !== null ? filteredArtworks()[index] : null;
  });;

  const translations = {
    es: {
      search: 'Buscar obras...',
      sortBy: 'Ordenar por',
      yearAsc: 'Año (antiguo a reciente)',
      yearDesc: 'Año (reciente a antiguo)',
      titleAsc: 'Título (A-Z)',
      titleDesc: 'Título (Z-A)',
      filterByType: 'Filtrar por tipo',
      filterByYear: 'Filtrar por año',
      filterByTags: 'Filtrar por etiquetas',
      reset: 'Restablecer',
      showing: 'Mostrando',
      of: 'de',
      works: 'obras',
      noResults: 'No se encontraron obras con estos filtros',
      previous: 'Anterior',
      next: 'Siguiente',
      page: 'Página'
    },
    en: {
      search: 'Search artworks...',
      sortBy: 'Sort by',
      yearAsc: 'Year (old to recent)',
      yearDesc: 'Year (recent to old)',
      titleAsc: 'Title (A-Z)',
      titleDesc: 'Title (Z-A)',
      filterByType: 'Filter by type',
      filterByYear: 'Filter by year',
      filterByTags: 'Filter by tags',
      reset: 'Reset',
      showing: 'Showing',
      of: 'of',
      works: 'works',
      noResults: 'No artworks found with these filters',
      previous: 'Previous',
      next: 'Next',
      page: 'Page'
    }
  };

  const t = () => translations[locale() as keyof typeof translations] || translations.es;

  return (
    <div class="artwork-gallery">
      {/* Filters */}
      <div class="artwork-filters bg-base-200 p-6 rounded-lg mb-8">
        {/* Search and Sort Row */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Search */}
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">{t().search}</span>
            </label>
            <input
              type="text"
              placeholder={t().search}
              class="input input-bordered w-full"
              value={searchQuery()}
              onInput={handleSearch}
            />
          </div>

          {/* Sort */}
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">{t().sortBy}</span>
            </label>
            <select class="select select-bordered w-full" value={sortBy()} onChange={handleSort}>
              <option value="year-desc">{t().yearDesc}</option>
              <option value="year-asc">{t().yearAsc}</option>
              <option value="title-asc">{t().titleAsc}</option>
              <option value="title-desc">{t().titleDesc}</option>
            </select>
          </div>
        </div>

        {/* Filters Row */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Type Filter */}
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">{t().filterByType}</span>
            </label>
            <div class="space-y-2 max-h-48 overflow-y-auto p-2 bg-base-100 rounded">
              <For each={types()}>
                {(type) => (
                  <label class="label cursor-pointer justify-start gap-2 py-1">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      checked={selectedTypes().includes(type)}
                      onChange={() => handleTypeToggle(type)}
                    />
                    <span class="label-text capitalize">{type}</span>
                  </label>
                )}
              </For>
            </div>
          </div>

          {/* Year Range Filter */}
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">{t().filterByYear}</span>
            </label>
            <div class="space-y-3 p-2 bg-base-100 rounded">
              <div class="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  min={minYear()}
                  max={maxYear()}
                  class="input input-bordered input-sm w-full"
                  value={yearMin() || ''}
                  onInput={(e) => setYearMin(parseInt((e.target as HTMLInputElement).value) || null)}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  min={minYear()}
                  max={maxYear()}
                  class="input input-bordered input-sm w-full"
                  value={yearMax() || ''}
                  onInput={(e) => setYearMax(parseInt((e.target as HTMLInputElement).value) || null)}
                />
              </div>
              <div class="text-xs text-base-content/60 text-center">
                {minYear()} - {maxYear()}
              </div>
            </div>
          </div>

          {/* Tags Filter */}
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">{t().filterByTags}</span>
            </label>
            <div class="space-y-2 max-h-48 overflow-y-auto p-2 bg-base-100 rounded">
              <For each={tags()}>
                {(tag) => (
                  <label class="label cursor-pointer justify-start gap-2 py-1">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      checked={selectedTags().includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                    />
                    <span class="label-text capitalize">{tag.replace(/-/g, ' ')}</span>
                  </label>
                )}
              </For>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div class="flex justify-between items-center mt-6 pt-4 border-t border-base-300">
          <div class="text-sm text-base-content/70">
            {t().showing} <span class="font-bold">{filteredArtworks().length}</span> {t().of} <span class="font-bold">{props.artworks.length}</span> {t().works}
          </div>
          <button class="btn btn-outline btn-sm" onClick={resetFilters}>
            {t().reset}
          </button>
        </div>
      </div>

      {/* Grid */}
      <Show
        when={paginatedArtworks().length > 0}
        fallback={
          <div class="text-center py-12">
            <p class="text-lg text-base-content/70 mb-4">{t().noResults}</p>
            <button class="btn btn-outline btn-sm" onClick={resetFilters}>
              {t().reset}
            </button>
          </div>
        }
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <For each={paginatedArtworks()}>
            {(artwork, index) => (
              <ArtworkCard
                artwork={artwork}
                locale={locale()}
                onClick={() => openLightbox((currentPage() - 1) * ITEMS_PER_PAGE + index())}
              />
            )}
          </For>
        </div>

        {/* Pagination */}
        <Show when={totalPages() > 1}>
          <div class="mt-12 mb-8">
            <div class="text-sm text-center text-base-content/70 mb-4">
              {t().showing} <span class="font-semibold">{(currentPage() - 1) * ITEMS_PER_PAGE + 1}</span> {t().of.toLowerCase()} <span class="font-semibold">{Math.min(currentPage() * ITEMS_PER_PAGE, filteredArtworks().length)}</span> {t().of} <span class="font-semibold">{filteredArtworks().length}</span> {t().works}
            </div>
            <div class="flex justify-center items-center gap-2">
              <button
                class="btn btn-outline btn-sm"
                disabled={currentPage() === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                {t().previous}
              </button>
              <span class="text-sm">
                {t().page} {currentPage()} {t().of} {totalPages()}
              </span>
              <button
                class="btn btn-outline btn-sm"
                disabled={currentPage() === totalPages()}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                {t().next}
              </button>
            </div>
          </div>
        </Show>
      </Show>

      {/* Lightbox */}
      <ArtworkLightbox
        artwork={currentLightboxArtwork()}
        isOpen={isLightboxOpen()}
        onClose={closeLightbox}
        onPrev={prevLightbox}
        onNext={nextLightbox}
        locale={locale()}
      />
    </div>
  );
}

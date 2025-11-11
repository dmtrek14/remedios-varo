export interface Artwork {
  id: string;
  title: string;
  titleEs?: string; // Spanish title if different
  year: number;
  type:
    | "painting"
    | "drawing"
    | "sketch"
    | "sculpture"
    | "collage"
    | "other"
    | "furniture painting";
  imagePath: string; // Path relative to public/work/
  tags: string[];
  description?: string;
  descriptionEs?: string;
  collection?: string;
  medium?: string; // e.g., 'Oil on canvas', 'Pencil on paper'
}

// Import generated artworks from the download script
import { generatedArtworks } from "./artworks-generated";

// Export all artworks
export const artworks: Artwork[] = generatedArtworks;

// Helper functions for filtering and sorting
export function getUniqueYears(artworks: Artwork[]): number[] {
  const years = artworks.map((a) => a.year);
  return [...new Set(years)].sort((a, b) => a - b);
}

export function getUniqueTypes(artworks: Artwork[]): string[] {
  const types = artworks.map((a) => a.type);
  return [...new Set(types)].sort();
}

export function getUniqueTags(artworks: Artwork[]): string[] {
  const tags = artworks.flatMap((a) => a.tags);
  return [...new Set(tags)].sort();
}

export function filterArtworks(
  artworks: Artwork[],
  filters: {
    searchQuery?: string;
    types?: string[];
    tags?: string[];
    yearMin?: number;
    yearMax?: number;
  },
): Artwork[] {
  return artworks.filter((artwork) => {
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = artwork.title.toLowerCase().includes(query);
      const matchesTitleEs = artwork.titleEs?.toLowerCase().includes(query);
      if (!matchesTitle && !matchesTitleEs) return false;
    }

    // Type filter
    if (filters.types && filters.types.length > 0) {
      if (!filters.types.includes(artwork.type)) return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasTag = filters.tags.some((tag) => artwork.tags.includes(tag));
      if (!hasTag) return false;
    }

    // Year range filter
    if (filters.yearMin && artwork.year < filters.yearMin) return false;
    if (filters.yearMax && artwork.year > filters.yearMax) return false;

    return true;
  });
}

export function sortArtworks(
  artworks: Artwork[],
  sortBy: "year-asc" | "year-desc" | "title-asc" | "title-desc",
): Artwork[] {
  const sorted = [...artworks];

  switch (sortBy) {
    case "year-asc":
      return sorted.sort((a, b) => a.year - b.year);
    case "year-desc":
      return sorted.sort((a, b) => b.year - a.year);
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

export function paginateArtworks(
  artworks: Artwork[],
  page: number,
  perPage: number = 25,
) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    artworks: artworks.slice(start, end),
    totalPages: Math.ceil(artworks.length / perPage),
    currentPage: page,
    totalItems: artworks.length,
  };
}

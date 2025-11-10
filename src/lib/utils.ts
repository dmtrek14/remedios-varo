import { profile } from "../settings";
import { template } from "../settings";
import type { ImageMetadata } from "astro";

export function highlightAuthor(authors: string): string {
  const author = authors.split(", ");
  if (author.includes(profile.author_name)) {
    return authors.replace(
      profile.author_name,
      `<span class='font-medium underline'>${profile.author_name}</span>`,
    );
  }
  return authors;
}

export function trimExcerpt(excerpt: string): string {
  const excerptLength = template.excerptLength;
  return excerpt.length > excerptLength
    ? `${excerpt.substring(0, excerptLength)}...`
    : excerpt;
}

/**
 * Converts glob imported images object to an array of image metadata
 * @param imagesGlob - The result of import.meta.glob()
 * @returns Array of image metadata objects
 */
export function getImagesArray(
  imagesGlob: Record<string, () => Promise<{ default: ImageMetadata }>>,
): ImageMetadata[] {
  return Object.values(imagesGlob).map((importFn: any) =>
    importFn().then((mod: any) => mod.default),
  );
}

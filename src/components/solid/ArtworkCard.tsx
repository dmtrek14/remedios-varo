import type { Artwork } from '@/data/artworks';

interface Props {
  artwork: Artwork;
  locale?: string;
  onClick?: () => void;
}

export default function ArtworkCard(props: Props) {
  const locale = () => props.locale || 'es';
  const title = () => locale() === 'es' && props.artwork.titleEs ? props.artwork.titleEs : props.artwork.title;
  const description = () => locale() === 'es' && props.artwork.descriptionEs ? props.artwork.descriptionEs : props.artwork.description;

  // Build image path
  const imageSrc = () => `/src/assets/work/${props.artwork.imagePath}`;

  return (
    <div
      class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer artwork-card h-full flex flex-col"
      onClick={props.onClick}
      data-artwork-id={props.artwork.id}
    >
      <figure class="relative overflow-hidden" style="height: 300px;">
        <img
          src={imageSrc()}
          alt={title()}
          class="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div class="absolute inset-0 bg-black/0 hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <button class="btn btn-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            {locale() === 'es' ? 'Ver detalles' : 'View details'}
          </button>
        </div>
      </figure>

      <div class="card-body p-4 flex-grow flex flex-col">
        <h3 class="card-title text-lg line-clamp-2" title={title()}>
          {title()}
        </h3>

        <div class="text-sm text-base-content/70 mb-2">
          <span class="font-semibold">{props.artwork.year}</span>
          {props.artwork.medium && (
            <>
              <span class="mx-1">•</span>
              <span class="capitalize">{props.artwork.medium}</span>
            </>
          )}
        </div>

        {description() && (
          <p class="text-sm text-base-content/80 line-clamp-2 mb-3">
            {description()}
          </p>
        )}

        <div class="card-actions justify-start flex-wrap mt-auto">
          <div class="badge badge-secondary badge-sm">{props.artwork.type}</div>
          {props.artwork.tags.slice(0, 3).map((tag) => (
            <div class="badge badge-outline badge-sm">
              {tag.replace(/-/g, ' ')}
            </div>
          ))}
          {props.artwork.tags.length > 3 && (
            <div class="badge badge-ghost badge-sm">
              +{props.artwork.tags.length - 3}
            </div>
          )}
        </div>

        {props.artwork.collection && (
          <div class="text-xs text-base-content/60 mt-2 italic">
            {props.artwork.collection}
          </div>
        )}
      </div>
    </div>
  );
}

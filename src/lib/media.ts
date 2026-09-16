import type { PhotoAsset } from "@/lib/types";

export const mediaPaths = {
  celebrity: (country: "pakistan" | "india", slug: string) => `/images/celebrities/${country}/${slug}/profile.jpg`,
  cricketer: (slug: string) => `/images/cricket/players/${slug}/profile.jpg`,
  dramaBanner: (slug: string) => `/images/dramas/pakistan/${slug}/banner.jpg`,
  movieBanner: (slug: string) => `/images/movies/bollywood/${slug}/banner.jpg`,
};

export function withDefaultPhoto(src: string, alt: string): PhotoAsset {
  return { src, alt };
}

import type { PhotoAsset } from "@/lib/types";

const LICENSED_CELEBRITY_PHOTOS: Record<string, PhotoAsset> = {
  "fawad-khan": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fawad_Khan_2022.png", alt: "Fawad Khan", photographer: "Voice of America", source: "Wikimedia Commons", license: "public_domain", credit: "Voice of America / Wikimedia Commons", originalUrl: "https://commons.wikimedia.org/wiki/File:Fawad_Khan_2022.png" },
  "mahira-khan": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mahira_Khan_2022.png", alt: "Mahira Khan", photographer: "Voice of America", source: "Wikimedia Commons", license: "public_domain", credit: "Voice of America / Wikimedia Commons", originalUrl: "https://commons.wikimedia.org/wiki/File:Mahira_Khan_2022.png" },
  "humayun-saeed": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Humayun_Saeed.png", alt: "Humayun Saeed", photographer: "BBC Urdu", source: "Wikimedia Commons", license: "creative_commons", credit: "BBC Urdu / Wikimedia Commons", originalUrl: "https://commons.wikimedia.org/wiki/File:Humayun_Saeed.png" },
  "yumna-zaidi": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Yumna_Zaidi.png", alt: "Yumna Zaidi", photographer: "VOA Urdu", source: "Wikimedia Commons", license: "public_domain", credit: "VOA Urdu / Wikimedia Commons", originalUrl: "https://commons.wikimedia.org/wiki/File:Yumna_Zaidi.png" },
  "hania-aamir": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hania_Aamir.png", alt: "Hania Aamir", photographer: "Lahore News HD", source: "Wikimedia Commons", license: "creative_commons", credit: "Lahore News HD / Wikimedia Commons", originalUrl: "https://commons.wikimedia.org/wiki/File:Hania_Aamir.png" },
  "maya-ali": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Maya_Ali_2020.png", alt: "Maya Ali", photographer: "BBC Urdu", source: "Wikimedia Commons", license: "creative_commons", credit: "BBC Urdu / Wikimedia Commons", originalUrl: "https://commons.wikimedia.org/wiki/File:Maya_Ali_2020.png" },
  "saba-qamar": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Saba_Qamar.jpg", alt: "Saba Qamar", photographer: "Bollywood Hungama", source: "Wikimedia Commons", license: "creative_commons", credit: "Bollywood Hungama / Wikimedia Commons", originalUrl: "https://commons.wikimedia.org/wiki/File:Saba_Qamar.jpg" },
  "sanam-saeed": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pakistani_Actress_Sanam_Saeed.jpg", alt: "Sanam Saeed", photographer: "Sammy Joseph", source: "Wikimedia Commons", license: "creative_commons", credit: "Sammy Joseph / Wikimedia Commons", originalUrl: "https://commons.wikimedia.org/wiki/File:Pakistani_Actress_Sanam_Saeed.jpg" },
  "bilal-abbas-khan": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bilal_Abbas_Khan.jpg", alt: "Bilal Abbas Khan", photographer: "BBC News Urdu", source: "Wikimedia Commons", license: "creative_commons", credit: "BBC News Urdu / Wikimedia Commons", originalUrl: "https://commons.wikimedia.org/wiki/File:Bilal_Abbas_Khan.jpg" },
};

export const mediaPaths = {
  celebrity: (country: "pakistan" | "india", slug: string): PhotoAsset => LICENSED_CELEBRITY_PHOTOS[slug] ?? { src: `/images/celebrities/${country}/${slug}/profile.svg`, alt: `${slug.replaceAll("-", " ")} portrait` },
  cricketer: (slug: string) => `/images/cricket/players/${slug}/profile.jpg`,
  dramaBanner: (slug: string) => `/images/dramas/pakistan/${slug}/banner.svg`,
  movieBanner: (slug: string) => `/images/movies/bollywood/${slug}/banner.svg`,
};

export function withDefaultPhoto(src: string, alt: string): PhotoAsset {
  return { src, alt };
}

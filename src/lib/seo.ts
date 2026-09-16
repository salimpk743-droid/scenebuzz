import { absUrl, SITE } from "@/lib/site";

type HeadInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function pageHead({
  title,
  description,
  path,
  image = "/assets/images/hero-news.jpg",
  type = "website",
  jsonLd,
}: HeadInput) {
  const url = absUrl(path);
  const fullTitle = title.includes("SceneBuzz") ? title : `${title} | SceneBuzz`;
  const img = image.startsWith("http") ? image : absUrl(image);
  const graph = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { name: "theme-color", content: SITE.themeColor },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type === "article" ? "article" : "website" },
      { property: "og:image", content: img },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
    scripts: graph.map((obj) => ({
      type: "application/ld+json",
      children: JSON.stringify(obj),
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.domain,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.domain}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

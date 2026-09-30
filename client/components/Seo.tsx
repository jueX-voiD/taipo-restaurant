import { useEffect } from "react";

export const SITE_URL = "https://www.taiporestaurants.com";
const SITE_NAME = "Taipo";
const ROBOTS_INDEX =
  "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large";

type SeoProps = {
  title: string;
  description?: string;
  /** Path of the page, e.g. "/menu/". Used for canonical + og:url. */
  path: string;
  image?: string;
  noindex?: boolean;
};

function setMeta(attr: "name" | "property", key: string, content?: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href?: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Sets the per-page <title>, meta description, canonical and social tags. */
export default function Seo({
  title,
  description,
  path,
  image = `${SITE_URL}/wp-content/uploads/2024/03/taipo-banner.jpg`,
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "follow, noindex" : ROBOTS_INDEX);
    setCanonical(noindex ? undefined : url);

    setMeta("property", "og:locale", "en_US");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", SITE_NAME);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
  }, [title, description, path, image, noindex]);

  return null;
}

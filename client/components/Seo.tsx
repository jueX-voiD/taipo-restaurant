import { useEffect } from "react";
import { PAGES, ROBOTS_INDEX, SITE_NAME, SITE_URL, jsonLd } from "@shared/seo";

type SeoProps = {
  /** Canonical path of the page, e.g. "/menu/". Must be a key of PAGES. */
  path: string;
  noindex?: boolean;
  /** Only needed for pages that aren't in PAGES (e.g. the 404 page). */
  title?: string;
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

function setJsonLd(data?: object) {
  let el = document.head.querySelector<HTMLScriptElement>("#seo-jsonld");
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "seo-jsonld";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/** Sets the per-page <title>, meta description, canonical, social tags and JSON-LD. */
export default function Seo({ path, noindex = false, title }: SeoProps) {
  useEffect(() => {
    const page = PAGES[path];
    const pageTitle = page?.title ?? title ?? SITE_NAME;
    const url = `${SITE_URL}${path}`;

    document.title = pageTitle;
    setMeta("name", "description", page?.description);
    setMeta("name", "robots", noindex ? "follow, noindex" : ROBOTS_INDEX);
    setCanonical(noindex ? undefined : url);
    setJsonLd(page && !noindex ? jsonLd(path, page) : undefined);

    setMeta("property", "og:locale", "en_US");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", page?.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image", page?.image);
    setMeta("property", "og:image:alt", SITE_NAME);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", page?.description);
    setMeta("name", "twitter:image", page?.image);
  }, [path, noindex, title]);

  return null;
}

/**
 * Single source of truth for page-level SEO. Used by the client (<Seo />) to
 * update the head on navigation, and by the production server to render the
 * right head into the initial HTML so crawlers that don't run JS still see it.
 */

export const SITE_URL = "https://www.taiporestaurants.com";
export const SITE_NAME = "Taipo";
const IMG = `${SITE_URL}/og`;
const BANNER = `${IMG}/taipo-share.jpg`;
const LOGO = `${IMG}/taipo-logo.png`;

export const ROBOTS_INDEX =
  "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large";

export interface PageSeo {
  title: string;
  description: string;
  image: string;
  /** Breadcrumb label (omitted for the home page). */
  crumb?: string;
}

/** Keyed by canonical path (with trailing slash). */
export const PAGES: Record<string, PageSeo> = {
  "/": {
    title: "Experience Authentic Nepali Cuisine in Arlington - Taipo",
    description:
      "Discover Taipo in Arlington, TX, for authentic Nepali cuisine infused with global flavors. Order online or visit us for an unforgettable dining experience.",
    image: BANNER,
  },
  "/menu/": {
    title: "Discover 5 Must-Try Nepali-Inspired Dishes in Taipo's Menu",
    description:
      "Explore Taipo’s diverse menu in Arlington, TX, featuring authentic Nepali-inspired dishes like momos and stir-fries. Experience bold flavors and cultural fusion.",
    image: `${IMG}/menu.webp`,
    crumb: "Menu",
  },
  "/about-us/": {
    title: "Taipo: A Culinary Fusion of Tradition and Innovation",
    description:
      "Discover Taipo, where traditional Nepali flavors meet global influences in Arlington, TX. Experience a unique fusion of bold, diverse, and innovative cuisine.",
    image: `${IMG}/about.webp`,
    crumb: "About Us",
  },
  "/contact-us/": {
    title: "Contact Taipo Arlington - Reach Out for Reservations & Inquiries",
    description:
      "Contact Taipo in Arlington for reservations, questions, or feedback. We're here to assist you with any inquiries related to our authentic Nepali cuisine.",
    image: BANNER,
    crumb: "Contact Us",
  },
  "/reservations/": {
    title: "Taipo - Behind the Door contact for reservation",
    description: "Contact for taipo's behind the door fine dining experience.",
    image: `${IMG}/behind-the-door.webp`,
    crumb: "Reservations",
  },
  "/order-now/": {
    title: "Order Nepali-Inspired Cuisine Online in Arlington - Taipo",
    description:
      "Order authentic Nepali-inspired dishes from Taipo in Arlington, TX, for pickup or delivery. Enjoy bold flavors with the convenience of online ordering.",
    image: `${IMG}/order-now.webp`,
    crumb: "Order Now",
  },
};

/** Normalise "/about-us" | "/about-us/" -> "/about-us/". */
export function canonicalPath(pathname: string): string {
  const p = pathname.replace(/\/+$/, "");
  return p ? `${p}/` : "/";
}

/** Old React paths -> the WordPress URLs that are already indexed. */
export const REDIRECTS: Record<string, string> = {
  "/about/": "/about-us/",
  "/contact/": "/contact-us/",
  "/reservation/": "/reservations/",
  "/order/": "/order-now/",
};

const restaurant = {
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "Taipo",
  url: SITE_URL,
  image: BANNER,
  logo: LOGO,
  telephone: "+1-469-602-8318",
  email: "reservation@taiporestaurant.com",
  servesCuisine: ["Nepali", "Asian Fusion"],
  acceptsReservations: "True",
  menu: `${SITE_URL}/menu/`,
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=200+E+Abram+St+%23140%2C+Arlington%2C+TX+76010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "200 E Abram St Suite 140",
    addressLocality: "Arlington",
    addressRegion: "TX",
    postalCode: "76010",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 32.7357, longitude: -97.1115 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:00",
      closes: "00:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "11:00",
      closes: "02:00",
    },
  ],
  sameAs: ["https://www.instagram.com/taipoarlington/"],
};

export function jsonLd(path: string, page: PageSeo) {
  const url = `${SITE_URL}${path}`;
  const graph: unknown[] = [
    restaurant,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#restaurant` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#restaurant` },
      primaryImageOfPage: { "@type": "ImageObject", url: page.image },
      inLanguage: "en-US",
    },
  ];
  if (page.crumb) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        { "@type": "ListItem", position: 2, name: page.crumb, item: url },
      ],
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** The full SEO <head> block for a path, as an HTML string. */
export function renderHead(path: string, page: PageSeo): string {
  const url = `${SITE_URL}${path}`;
  const t = esc(page.title);
  const d = esc(page.description);
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta name="robots" content="${ROBOTS_INDEX}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:image" content="${page.image}" />`,
    `<meta property="og:image:alt" content="${SITE_NAME}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${page.image}" />`,
    `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(
      jsonLd(path, page),
    ).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

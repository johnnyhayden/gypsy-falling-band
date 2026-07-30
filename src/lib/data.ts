/*
 * The band's identity lives here and nowhere else. Three renames have passed
 * through this site and each one left a stale address or handle behind in a
 * component that had hardcoded it, so every surface that names the band —
 * metadata, copy, the wordmark, the booking email — reads from this object.
 */
/*
 * The one canonical origin. metadata, robots.ts and sitemap.ts all read this,
 * so the site never advertises two different domains to crawlers. Override via
 * NEXT_PUBLIC_SITE_URL only for preview deploys.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thechainreactionband.com";

export const band = {
  name: "The Chain Reaction",
  city: "Nashville, Tennessee",
  email: "booking@thechainreactionband.com",
  instagram: "@thechainreactionband",
  instagramUrl: "https://www.instagram.com/thechainreactionband",
};

export const navLinks = [
  { label: "Watch", href: "#video" },
  { label: "The Show", href: "#show" },
  { label: "Set List", href: "#setlist" },
  { label: "Book Us", href: "#booking" },
];

export const featuredVideo = {
  id: "kQ_xaoJmY9o",
  title: "Promo 2026",
};

// Order matters: SetList.tsx assigns icons and accent colors by index.
export const setListCategories = [
  {
    title: "Fleetwood Mac",
    description: "The Mac canon",
    songs: [
      "Dreams",
      "Go Your Own Way",
      "Rhiannon",
      "The Chain",
      "Gold Dust Woman",
      "Landslide",
      "Everywhere",
      "Don't Stop",
      "Say You Love Me",
    ],
  },
  {
    title: "Tom Petty",
    description: "Petty & the Heartbreakers",
    songs: [
      "American Girl",
      "Mary Jane's Last Dance",
      "Runnin' Down a Dream",
      "I Won't Back Down",
      "Learning to Fly",
      "Refugee",
      "Breakdown",
      "Free Fallin'",
      "The Waiting",
    ],
  },
  {
    title: "The Solo Years",
    description: "Away from the bands",
    songs: [
      "Edge of Seventeen",
      "Stand Back",
      "Wildflowers",
      "Stop Draggin' My Heart Around",
    ],
  },
];

export const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Festival",
  "Private Party",
  "Venue Booking",
  "Other",
];

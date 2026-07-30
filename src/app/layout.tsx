import type { Metadata } from "next";
import { Bodoni_Moda, Barlow } from "next/font/google";
import { band, siteUrl } from "@/lib/data";
import "./globals.css";

/*
 * Bodoni's high stroke contrast and flat hairline serifs give the wordmark an
 * engraved, seventies-record-sleeve weight. Barlow stays out of the way.
 */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const title = `${band.name} | Fleetwood Mac & Tom Petty Tribute Band in Nashville`;
const description = `${band.name} is a Nashville-area Fleetwood Mac and Tom Petty tribute band available for venues, community events and private bookings throughout Middle Tennessee.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // The *.vercel.app deploy serves the same page; this points crawlers at one of them.
  alternates: { canonical: "/" },
  title,
  description,
  keywords: [
    band.name,
    "Fleetwood Mac tribute",
    "Tom Petty tribute",
    "Stevie Nicks tribute",
    "Nashville tribute band",
    "live music Nashville",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/band-photo-july2026.jpg",
        width: 2006,
        height: 2006,
        alt: band.name,
      },
    ],
  },
};

/*
 * Structured data for search engines. MusicGroup rather than LocalBusiness —
 * the band is the entity being searched for, not a storefront.
 */
const bandSchema = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: band.name,
  url: siteUrl,
  description:
    "A Fleetwood Mac and Tom Petty tribute band based in the Nashville and Franklin, Tennessee area.",
  genre: ["Rock", "Classic Rock", "Tribute"],
  email: band.email,
  areaServed: [
    "Nashville, Tennessee",
    "Franklin, Tennessee",
    "Middle Tennessee",
  ],
  sameAs: [band.instagramUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${barlow.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(bandSchema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}

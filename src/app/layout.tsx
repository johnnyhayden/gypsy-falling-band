import type { Metadata } from "next";
import { Bodoni_Moda, Barlow } from "next/font/google";
import { band } from "@/lib/data";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://fleetwoodmac-tompetty-band.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${band.name} | Fleetwood Mac & Tom Petty Tribute Band`,
  description: `${band.name} brings together the timeless music of Fleetwood Mac and Tom Petty in one unforgettable live show. Book the band for festivals, weddings, corporate events, and venues.`,
  keywords: [
    band.name,
    "Fleetwood Mac tribute",
    "Tom Petty tribute",
    "Stevie Nicks tribute",
    "Nashville tribute band",
    "live music Nashville",
  ],
  openGraph: {
    title: band.name,
    description:
      "The timeless music of Fleetwood Mac and Tom Petty in one unforgettable live show.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}

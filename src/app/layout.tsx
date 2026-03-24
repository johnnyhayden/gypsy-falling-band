import type { Metadata } from "next";
import { Cinzel, Barlow } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gypsy Falling Band | Nashville Fleetwood Mac & Tom Petty Tribute",
  description:
    "Nashville's premier tribute to the legends of Fleetwood Mac and Tom Petty. Book the band for your next event — weddings, festivals, corporate events, and more.",
  keywords: [
    "Fleetwood Mac tribute",
    "Tom Petty tribute",
    "Nashville tribute band",
    "Gypsy Falling Band",
    "live music Nashville",
  ],
  openGraph: {
    title: "Gypsy Falling Band",
    description:
      "Nashville's Premier Tribute to the Legends of Fleetwood Mac and Tom Petty",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import { PDFDocument, PDFName, PDFString, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// The EPK is live — write straight into public/ so the site serves it at
// /fleetwood-music-city-epk.pdf (linked from the booking section).
const outputDir = path.join(__dirname, "..", "public");

/*
 * Mirrors `band` in src/lib/data.ts, which is the source of truth — this is a
 * plain .mjs script run outside the Next build, so it can't import the TypeScript
 * module without pulling in a loader for one object. Kept here deliberately, but
 * it does have to be updated alongside data.ts: the last two renames were missed
 * here, and this file shipped a dead address and a two-names-ago Instagram handle
 * long after the site itself had moved on.
 *
 * Straight apostrophes throughout, not curly. The PDF is set in the standard
 * Helvetica, whose WinAnsi encoding has no U+2019 — a curly quote anywhere in the
 * strings below throws at encode time.
 */
const BAND = {
  name: "Fleetwood Music City",
  tagline: "A Fleetwood Mac & Tom Petty Tribute",
  phone: "615-838-4666",
  email: "booking@FleetwoodMusicCity.com",
  instagram: "@FleetwoodMusicCity",
  website: "FleetwoodMusicCity.com",
  city: "Nashville, Tennessee",
};

async function generateEPK() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]); // US Letter
  const { width, height } = page.getSize();

  // Fonts
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const timesItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);

  // The black-ink variant of the hero lockup (same letterforms, recolored for
  // light backgrounds — regenerate it from logo-full.png if the mark changes).
  const logoBytes = fs.readFileSync(
    path.join(__dirname, "..", "public", "logo-lockup-ink.png")
  );
  const logo = await doc.embedPng(logoBytes);

  // Colors — light "printed one-sheet" palette. Gold and wine carry over from
  // the site; bronze stands in for the site's brighter gold, which washes out
  // at small sizes on white.
  const gold = rgb(0.722, 0.525, 0.043);
  const bronze = rgb(0.55, 0.4, 0.03);
  const ink = rgb(0.08, 0.07, 0.05);
  const pageBg = rgb(1, 1, 1);
  const cardBg = rgb(0.965, 0.955, 0.935);
  const cardBorder = rgb(0.85, 0.83, 0.79);
  const wine = rgb(0.45, 0.13, 0.25);
  const paper = rgb(0.96, 0.94, 0.9);
  const dimText = rgb(0.32, 0.3, 0.27);

  // pdf-lib has no high-level link API, so clickable regions are raw Link
  // annotations. Rects are in page coordinates off the text baseline; the small
  // reach below (2) and above (size + 1) covers descenders and cap height.
  const linkAnnots = [];
  const addLink = (x, baselineY, w, size, url) => {
    linkAnnots.push(
      doc.context.register(
        doc.context.obj({
          Type: "Annot",
          Subtype: "Link",
          Rect: [x, baselineY - 2, x + w, baselineY + size + 1],
          Border: [0, 0, 0],
          A: { Type: "Action", S: "URI", URI: PDFString.of(url) },
        })
      )
    );
  };

  const centerText = (text, size, font, y, color) => {
    page.drawText(text, {
      x: (width - font.widthOfTextAtSize(text, size)) / 2,
      y,
      size,
      font,
      color,
    });
  };

  // === BACKGROUND ===
  page.drawRectangle({
    x: 0, y: 0, width, height,
    color: pageBg,
  });

  // Top gold accent bar
  page.drawRectangle({
    x: 0, y: height - 4, width, height: 4,
    color: gold,
  });

  // === HEADER: LOGO LOCKUP ===
  // The lockup already carries the band name and the tribute line, so the header
  // sets only the location strap underneath it as live text.
  let y = height - 34;
  const logoW = 176;
  const logoH = logoW * (logo.height / logo.width);
  page.drawImage(logo, {
    x: (width - logoW) / 2,
    y: y - logoH,
    width: logoW,
    height: logoH,
  });
  y -= logoH + 16;

  centerText("NASHVILLE, TENNESSEE   |   PRESS KIT", 9, helvetica, y, gold);

  // === DIVIDER ===
  y -= 16;
  page.drawRectangle({
    x: 50, y, width: width - 100, height: 0.5,
    color: cardBorder,
  });

  // === ABOUT CARD ===
  // Wrap by measurement, not by hand — hand-wrapped lines drifted to two-thirds
  // of the card width the last time the copy changed.
  const wrapText = (text, font, size, maxWidth) => {
    const lines = [];
    let line = "";
    for (const word of text.split(" ")) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  const bodyWidth = width - 120; // card inset (60) mirrored on the right
  const aboutText = [
    ...wrapText(
      "Fleetwood Music City is a Nashville-area tribute band celebrating the music of Fleetwood Mac and Tom Petty in one live show. Available for venues, community events, and private bookings throughout Middle TN.",
      helvetica, 9, bodyWidth
    ),
    "",
    ...wrapText(
      "Fleetwood Mac is at the heart of the show, with strong female vocals, layered harmonies, and the songs that made the band timeless. The set also draws deeply on Tom Petty favorites, adding energy, variety, and rock-and-roll drive.",
      helvetica, 9, bodyWidth
    ),
  ];
  const quoteText = wrapText(
    "\"From the harmonies of Fleetwood Mac to the unmistakable hooks of Tom Petty, the two catalogs come together naturally in a show filled with songs audiences already know and love.\"",
    timesItalic, 9.5, bodyWidth - 30
  );
  const closingText = wrapText(
    "Fleetwood Music City focuses on the sound and feel of the music with experienced musicians bringing these songs to life with authentic vocals, thoughtful arrangements, and respect for what made them great.",
    helvetica, 9, bodyWidth
  );

  // Card height is measured off the copy, not hardcoded — the last rewrite of the
  // about text left the old fixed-height card clipping two lines.
  const bodyLineHeight = (lines) =>
    lines.reduce((h, line) => h + (line === "" ? 6 : 12.5), 0);
  const aboutCardHeight =
    14 + 18 + bodyLineHeight(aboutText) + 10 +
    quoteText.length * 13 + 10 + bodyLineHeight(closingText) + 12;

  y -= 26;
  const aboutCardTop = y + 14;
  page.drawRectangle({
    x: 45, y: aboutCardTop - aboutCardHeight,
    width: width - 90, height: aboutCardHeight,
    color: cardBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });

  page.drawText("ABOUT THE SHOW", {
    x: 60, y,
    size: 10,
    font: helveticaBold,
    color: gold,
  });

  y -= 18;
  for (const line of aboutText) {
    if (line === "") { y -= 6; continue; }
    page.drawText(line, {
      x: 60, y,
      size: 9,
      font: helvetica,
      color: dimText,
    });
    y -= 12.5;
  }

  y -= 10;
  for (const line of quoteText) {
    centerText(line, 9.5, timesItalic, y, ink);
    y -= 13;
  }

  y -= 10;
  for (const line of closingText) {
    page.drawText(line, {
      x: 60, y,
      size: 9,
      font: helvetica,
      color: dimText,
    });
    y -= 12.5;
  }

  // === SET LIST HIGHLIGHTS ===
  // Drop from the card's measured bottom edge, not the last text baseline — the
  // gold marker bar rises 15pt above the title baseline, and a text-relative
  // drop left it clipping the card border.
  y = aboutCardTop - aboutCardHeight - 32;
  page.drawRectangle({
    x: 50, y: y - 1, width: 3, height: 16,
    color: gold,
  });
  page.drawText("SET LIST HIGHLIGHTS", {
    x: 60, y,
    size: 11,
    font: helveticaBold,
    color: ink,
  });

  y -= 16;
  page.drawText(
    "A sampling only - the band's songbook runs deep across both catalogs and the solo years, and they build a set list around each event.",
    {
      x: 55, y,
      size: 8.5,
      font: timesItalic,
      color: dimText,
    }
  );

  y -= 20;
  // Same order as the set list on the site: Mac, Petty, then the solo years.
  // Keep in sync with setListCategories in src/lib/data.ts.
  const categories = [
    {
      title: "FLEETWOOD MAC",
      songs: ["Dreams", "Go Your Own Way", "Rhiannon", "The Chain", "Gold Dust Woman", "Landslide", "Everywhere", "Don't Stop", "Say You Love Me"],
    },
    {
      title: "TOM PETTY & THE HEARTBREAKERS",
      songs: ["American Girl", "Mary Jane's Last Dance", "Runnin' Down a Dream", "I Won't Back Down", "Learning to Fly", "Refugee", "Breakdown", "Free Fallin'", "The Waiting"],
    },
    {
      title: "THE SOLO YEARS",
      songs: ["Edge of Seventeen", "Stand Back", "Wildflowers", "Stop Draggin' My Heart Around"],
    },
  ];

  const colWidth = (width - 100) / 3;
  // Tightened from 13 to fit nine-song columns above the footer strip.
  const songLeading = 11;
  categories.forEach((cat, i) => {
    const cx = 50 + i * colWidth;
    let cy = y;

    page.drawText(cat.title, {
      x: cx + 5, y: cy,
      size: 7.5,
      font: helveticaBold,
      color: bronze,
    });
    cy -= 5;
    page.drawRectangle({
      x: cx + 5, y: cy, width: 40, height: 0.5,
      color: gold,
    });
    cy -= 14;

    cat.songs.forEach((song) => {
      page.drawText(`-  ${song}`, {
        x: cx + 5, y: cy,
        size: 8,
        font: helvetica,
        color: dimText,
      });
      cy -= songLeading;
    });
  });

  // === AVAILABILITY ===
  // Clear the tallest column rather than a fixed drop: 19pt of title and rule,
  // then the songs, then breathing room. A magic number collides once a column grows.
  const tallestColumn = Math.max(...categories.map((c) => c.songs.length));
  y -= 19 + tallestColumn * songLeading + 14;
  page.drawRectangle({
    x: 50, y: y - 1, width: 3, height: 16,
    color: gold,
  });
  page.drawText("AVAILABILITY", {
    x: 60, y,
    size: 11,
    font: helveticaBold,
    color: ink,
  });

  y -= 18;
  page.drawText(
    "Venue Bookings   •   Corporate Events   •   Festivals   •   Private Parties",
    {
      x: 55, y,
      size: 9,
      font: helvetica,
      color: dimText,
    }
  );

  // === WATCH ===
  y -= 26;
  page.drawRectangle({
    x: 50, y: y - 1, width: 3, height: 16,
    color: gold,
  });
  page.drawText("WATCH", {
    x: 60, y,
    size: 11,
    font: helveticaBold,
    color: ink,
  });

  y -= 18;
  const watchPrefix = "Promo 2026:  ";
  const watchUrl = "youtube.com/watch?v=kQ_xaoJmY9o";
  page.drawText(watchPrefix + watchUrl, {
    x: 55, y,
    size: 9,
    font: helvetica,
    color: bronze,
  });
  addLink(
    55 + helvetica.widthOfTextAtSize(watchPrefix, 9), y,
    helvetica.widthOfTextAtSize(watchUrl, 9), 9,
    `https://www.${watchUrl}`
  );

  // === CONTACT & BOOKING ===
  y -= 26;
  page.drawRectangle({
    x: 50, y: y - 1, width: 3, height: 16,
    color: gold,
  });
  page.drawText("CONTACT & BOOKING", {
    x: 60, y,
    size: 11,
    font: helveticaBold,
    color: ink,
  });

  y -= 20;
  // Label-over-value columns, hand-placed: the email is the wide one, so the
  // columns are uneven rather than a quarter-width grid.
  const contactCols = [
    { label: "PHONE", value: BAND.phone, x: 55, href: `tel:+1${BAND.phone.replaceAll("-", "")}` },
    { label: "EMAIL", value: BAND.email, x: 150, href: `mailto:${BAND.email}` },
    { label: "INSTAGRAM", value: BAND.instagram, x: 320, href: `https://www.instagram.com/${BAND.instagram.slice(1)}` },
    { label: "WEBSITE", value: BAND.website, x: 435, href: `https://${BAND.website}` },
  ];
  contactCols.forEach((col) => {
    page.drawText(col.label, {
      x: col.x, y,
      size: 6.5,
      font: helveticaBold,
      color: gold,
    });
    page.drawText(col.value, {
      x: col.x, y: y - 12,
      size: 8.5,
      font: helvetica,
      color: ink,
    });
    addLink(col.x, y - 12, helvetica.widthOfTextAtSize(col.value, 8.5), 8.5, col.href);
  });
  y -= 12;

  // === FOOTER ===
  // Bottom gold bar
  page.drawRectangle({
    x: 0, y: 0, width, height: 3,
    color: gold,
  });

  // Wine accent strip
  page.drawRectangle({
    x: 0, y: 3, width, height: 40,
    color: wine,
  });

  page.drawText(`${BAND.name.toUpperCase()}  •  ${BAND.tagline.toUpperCase()}`, {
    x: 50, y: 22,
    size: 8,
    font: helveticaBold,
    color: paper,
  });
  page.drawText(`© 2026 ${BAND.name}. All rights reserved.   |   ${BAND.website}`, {
    x: 50, y: 10,
    size: 7.5,
    font: helvetica,
    color: rgb(0.85, 0.8, 0.75),
  });

  // Attach the collected link annotations to the page.
  page.node.set(PDFName.of("Annots"), doc.context.obj(linkAnnots));

  // Save
  const pdfBytes = await doc.save();
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "fleetwood-music-city-epk.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`EPK saved to ${outputPath} (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
}

generateEPK().catch(console.error);

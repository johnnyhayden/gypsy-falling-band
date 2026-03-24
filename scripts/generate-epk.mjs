import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

async function generateEPK() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]); // US Letter
  const { width, height } = page.getSize();

  // Fonts
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const timesItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);

  // Colors
  const black = rgb(0.02, 0.02, 0.02);
  const gold = rgb(0.722, 0.525, 0.043);
  const darkGold = rgb(0.831, 0.627, 0.067);
  const cream = rgb(0.96, 0.94, 0.9);
  const darkBg = rgb(0.05, 0.05, 0.05);
  const cardBg = rgb(0.1, 0.1, 0.1);
  const wine = rgb(0.45, 0.13, 0.25);
  const dimText = rgb(0.65, 0.63, 0.58);

  // === BACKGROUND ===
  page.drawRectangle({
    x: 0, y: 0, width, height,
    color: darkBg,
  });

  // Top gold accent bar
  page.drawRectangle({
    x: 0, y: height - 4, width, height: 4,
    color: gold,
  });

  // === HEADER ===
  let y = height - 60;

  page.drawText("GYPSY FALLING", {
    x: 50, y,
    size: 36,
    font: helveticaBold,
    color: cream,
  });

  y -= 6;
  // Gold underline
  page.drawRectangle({
    x: 50, y, width: 200, height: 1.5,
    color: gold,
  });

  y -= 18;
  page.drawText("ELECTRONIC PRESS KIT", {
    x: 50, y,
    size: 10,
    font: helvetica,
    color: gold,
  });

  // Right-aligned contact block
  const contactX = width - 200;
  let contactY = height - 55;
  const contactLines = [
    "johnnyhayden+pettynicks@gmail.com",
    "@pettynicksofnash",
    "Nashville, TN",
  ];
  for (const line of contactLines) {
    page.drawText(line, {
      x: contactX, y: contactY,
      size: 8,
      font: helvetica,
      color: dimText,
    });
    contactY -= 13;
  }

  // === DIVIDER ===
  y -= 20;
  page.drawRectangle({
    x: 50, y, width: width - 100, height: 0.5,
    color: rgb(0.2, 0.2, 0.2),
  });

  // === TAGLINE ===
  y -= 30;
  page.drawText("Nashville's Premier Tribute to the Legends of", {
    x: 50, y,
    size: 14,
    font: timesItalic,
    color: cream,
  });
  y -= 20;
  page.drawText("Fleetwood Mac & Tom Petty", {
    x: 50, y,
    size: 14,
    font: timesItalic,
    color: darkGold,
  });

  // === ABOUT CARD ===
  y -= 35;
  const aboutCardTop = y;
  const aboutCardHeight = 130;
  page.drawRectangle({
    x: 45, y: aboutCardTop - aboutCardHeight + 10,
    width: width - 90, height: aboutCardHeight,
    color: cardBg,
    borderColor: rgb(0.18, 0.18, 0.18),
    borderWidth: 1,
  });

  y -= 5;
  page.drawText("ABOUT THE BAND", {
    x: 60, y,
    size: 10,
    font: helveticaBold,
    color: gold,
  });

  y -= 18;
  const aboutText = [
    "Gypsy Falling Band is a six-piece tribute act based in Nashville, TN, delivering",
    "the definitive live experience of Fleetwood Mac and Tom Petty & The Heartbreakers.",
    "",
    "With collective decades of professional performance on Nashville stages and beyond,",
    "the band brings period-accurate equipment, spot-on characterizations, and an",
    "authenticity that audiences feel from the first note — the unmistakable 12-string",
    "jangle, soaring three-part harmonies, and deep respect for the source material.",
  ];
  for (const line of aboutText) {
    if (line === "") { y -= 6; continue; }
    page.drawText(line, {
      x: 60, y,
      size: 9,
      font: helvetica,
      color: dimText,
    });
    y -= 13;
  }

  // === STATS ROW ===
  y -= 25;
  const stats = [
    { value: "6", label: "MUSICIANS" },
    { value: "2", label: "LEGENDARY ACTS" },
    { value: "30+", label: "SONGS DEEP" },
    { value: "2+ HRS", label: "SHOW LENGTH" },
  ];

  const statWidth = (width - 100) / stats.length;
  stats.forEach((stat, i) => {
    const sx = 50 + i * statWidth;
    // Stat card
    page.drawRectangle({
      x: sx + 5, y: y - 30,
      width: statWidth - 10, height: 45,
      color: cardBg,
      borderColor: rgb(0.18, 0.18, 0.18),
      borderWidth: 1,
    });
    page.drawText(stat.value, {
      x: sx + 15, y: y,
      size: 18,
      font: helveticaBold,
      color: gold,
    });
    page.drawText(stat.label, {
      x: sx + 15, y: y - 20,
      size: 7,
      font: helvetica,
      color: dimText,
    });
  });

  // === SET LIST ===
  y -= 70;
  page.drawRectangle({
    x: 50, y: y - 1, width: 3, height: 16,
    color: gold,
  });
  page.drawText("SAMPLE SET LIST", {
    x: 60, y,
    size: 11,
    font: helveticaBold,
    color: cream,
  });

  y -= 25;
  const categories = [
    {
      title: "THE DUETS",
      songs: ["Stop Draggin' My Heart Around", "Insider", "I Will Run To You"],
    },
    {
      title: "FLEETWOOD MAC",
      songs: ["Dreams", "Go Your Own Way", "Rhiannon", "The Chain", "Gold Dust Woman", "Landslide"],
    },
    {
      title: "TOM PETTY",
      songs: ["American Girl", "Free Fallin'", "Mary Jane's Last Dance", "Runnin' Down a Dream", "I Won't Back Down", "Learning to Fly"],
    },
  ];

  const colWidth = (width - 100) / 3;
  categories.forEach((cat, i) => {
    const cx = 50 + i * colWidth;
    let cy = y;

    page.drawText(cat.title, {
      x: cx + 5, y: cy,
      size: 8,
      font: helveticaBold,
      color: darkGold,
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
      cy -= 13;
    });
  });

  // === IDEAL FOR ===
  y -= 120;
  page.drawRectangle({
    x: 50, y: y - 1, width: 3, height: 16,
    color: gold,
  });
  page.drawText("IDEAL FOR", {
    x: 60, y,
    size: 11,
    font: helveticaBold,
    color: cream,
  });

  y -= 22;
  const idealFor = [
    ["Festivals & Outdoor Concerts", "Corporate Events & Galas"],
    ["Weddings & Private Parties", "Venue & Club Bookings"],
    ["Fundraisers & Charity Events", "College & University Events"],
  ];
  idealFor.forEach((row) => {
    row.forEach((item, i) => {
      page.drawText(`>  ${item}`, {
        x: 55 + i * 250, y,
        size: 9,
        font: helvetica,
        color: dimText,
      });
    });
    y -= 16;
  });

  // === TECHNICAL SPECS ===
  y -= 20;
  page.drawRectangle({
    x: 50, y: y - 1, width: 3, height: 16,
    color: gold,
  });
  page.drawText("TECHNICAL REQUIREMENTS", {
    x: 60, y,
    size: 11,
    font: helveticaBold,
    color: cream,
  });

  y -= 22;
  const techSpecs = [
    "Full PA and sound reinforcement (band can provide for smaller venues)",
    "Standard stage plot and input list available upon request",
    "Minimum stage size: 16' x 12'  •  Standard set length: 2 hours (two sets with break)",
  ];
  techSpecs.forEach((spec) => {
    page.drawText(spec, {
      x: 55, y,
      size: 8.5,
      font: helvetica,
      color: dimText,
    });
    y -= 14;
  });

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

  page.drawText("BOOKING & INQUIRIES", {
    x: 50, y: 22,
    size: 8,
    font: helveticaBold,
    color: cream,
  });
  page.drawText("johnnyhayden+pettynicks@gmail.com   |   @pettynicksofnash   |   Nashville, TN", {
    x: 50, y: 10,
    size: 7.5,
    font: helvetica,
    color: rgb(0.85, 0.8, 0.75),
  });

  // Save
  const pdfBytes = await doc.save();
  const outputPath = path.join(publicDir, "gypsy-falling-epk.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`EPK saved to ${outputPath} (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
}

generateEPK().catch(console.error);

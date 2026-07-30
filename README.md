# The Chain Reaction — Website

Marketing and booking website for **The Chain Reaction**, Nashville's tribute to Fleetwood Mac and Tom Petty. The site's primary goal is to showcase the band and convert visitors into booked events by making it easy to inquire and find the band on social media.

---

## Site Goals

- Present the band's story, music, and live performance credentials
- Provide a sample set list spanning both Fleetwood Mac and Tom Petty catalogues, plus the solo years
- Feature a promo video
- Capture booking inquiries via a contact form and deliver them to the band by email, with a best-effort text alert
- Offer an Electronic Press Kit (EPK) download for festival bookers and corporate talent buyers — **built but not yet enabled**, see [Electronic Press Kit](#electronic-press-kit)

---

## Page Structure

The site is a single page with anchor-linked sections, assembled in `src/app/page.tsx`:

| Section | Anchor | Description |
|---|---|---|
| Navbar | — | Fixed navigation, condenses on scroll, full-screen mobile menu |
| Hero | — | Photo, logo lockup, and CTAs to the video and the booking form |
| Featured Video | `#video` | Embedded YouTube promo |
| The Show | `#show` | What the show is, and how the two catalogues sit together |
| Set List | `#setlist` | Three columns: Fleetwood Mac, Tom Petty, The Solo Years |
| Booking Form | `#booking` | Inquiry form |
| Footer | — | Social links, direct email, copyright |

---

## Brand

The band name lives in one place: the `band` object in `src/lib/data.ts`. Every surface that
names the band — page metadata, body copy, the wordmark, the booking email's `from` and
signature — reads from it. The site has been renamed three times; each rename that hardcoded the
name into a component left a stale address or handle behind, so please keep it centralised.

`scripts/generate-epk.mjs` is the one deliberate exception. It is a plain `.mjs` script run
outside the Next build and cannot import the TypeScript module, so it mirrors the same values in
a `BAND` constant at the top of the file. **Update it alongside `data.ts`.**

### The mark

There are two forms of the mark, and they are not interchangeable:

- **`public/logo-lockup.png`** — the drawn lockup: name, chain rule, and the line "A Fleetwood
  Mac & Tom Petty tribute". Used in the hero only. Its hairline outlines and small-caps tagline
  stop resolving below roughly 40px tall.
- **`public/logo-inline.png`** — the inline cut: one line, no rule and no tribute label. Used in
  the navbar, where it survives at bar height because it drops the lockup's other two parts. It is
  trimmed to its artwork and pre-sized to 512px wide (it never renders wider than ~217px), and is
  served `unoptimized` — the optimizer has nothing left to save on it, and routing it through
  `/_next/image` hung on this asset in dev and left the navbar with an empty box.
- **`src/components/Wordmark.tsx`** — the name typeset in Bodoni Moda, all cream. Still used by
  the footer and the mobile menu overlay.

Because the lockup's tribute line is pixels rather than text, the hero image's `alt` carries
"a Fleetwood Mac & Tom Petty tribute" — that phrasing is doing real SEO and accessibility work
for a band whose search traffic is people typing those two act names. Don't drop it.

---

## Booking / Inquiry Flow

1. Visitor fills out the booking form (`Name`, `Email`, `Event Date`, `Venue/Location`, `Event Type`, `Message`)
2. The form `POST`s to `/api/booking`
3. The API sends an **HTML email** to every address in `EMAIL_RECIPIENTS` via Nodemailer + Gmail SMTP, and awaits it
4. Only once that has succeeded does it attempt a short **text alert** through a carrier email-to-SMS gateway. This is deliberately sequential and best-effort: a failure here is logged and swallowed, because the inquiry is already safe
5. The visitor sees a confirmation message; the band is expected to reply within 24 hours

**Recipients** are defined at the top of `src/app/api/booking/route.ts`:

```ts
const EMAIL_RECIPIENTS = [band.email, "joefortemusic@gmail.com"];
const SMS_GATEWAY_RECIPIENTS = ["6152942922@txt.att.net"];
```

Add to these arrays to notify additional people on every inquiry. `GMAIL_USER` is the sending
credential only, **not** a recipient — add it to `EMAIL_RECIPIENTS` explicitly if that inbox
should also receive inquiries.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── booking/
│   │       └── route.ts      # POST handler — booking email + best-effort text alert
│   ├── icon.svg              # Favicon (file convention)
│   ├── layout.tsx            # Root layout, metadata, fonts
│   ├── page.tsx              # Home page (assembles all sections)
│   └── globals.css           # Tailwind theme tokens + the hero-over layout switch
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Wordmark.tsx          # Typeset mark for the navbar and footer
│   ├── FeaturedVideo.tsx
│   ├── TheShow.tsx
│   ├── WildflowerRule.tsx    # Drawn section divider
│   ├── SetList.tsx
│   ├── BookingForm.tsx       # Client component — form UI + submission
│   └── Footer.tsx
└── lib/
    └── data.ts               # Band identity, nav links, set list, event types

scripts/
└── generate-epk.mjs          # Builds the EPK PDF with pdf-lib

public/
├── band-photo-july2026.jpg           # Hero photograph
├── logo-lockup.png                   # Hero mark, trimmed to the artwork — used by the site
├── logo-inline.png                   # Navbar mark, trimmed and pre-sized to 512px — used by the site
├── thechainreactionlogo_trans.png    # Source artwork for the lockup, 1024² with transparent padding
├── thechainreactionlogo.png          # Source artwork on a solid ground (unused)
└── logo_cream_inline_trans.png       # Source artwork for the inline mark, 1536×1024

private/
└── the-chain-reaction-epk.pdf        # Generated EPK — gitignored, not served
```

---

## Electronic Press Kit

`node scripts/generate-epk.mjs` writes the press kit to
`private/the-chain-reaction-epk.pdf`. It is generated **outside `public/`** so it is not served,
and the download button in `BookingForm.tsx` is commented out. To publish it: move the PDF into
`public/` and restore that block.

Two constraints when editing the generator:

- It sets the PDF in the standard Helvetica, whose WinAnsi encoding **cannot represent a curly
  apostrophe** (U+2019). Every string in that file must use straight quotes or `drawText` throws.
- The gold rule under the title is measured from the rendered title width, so it tracks the name
  automatically across renames. Don't hardcode it.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 — CSS-first, configured via `@theme` in `globals.css` (there is no `tailwind.config.js`) |
| Fonts | Google Fonts via `next/font` — Bodoni Moda (headings), Barlow (body) |
| Email | Nodemailer 8 + Gmail SMTP |
| PDF | `pdf-lib` (dev dependency, EPK generation only) |
| Hosting | Vercel |

---

## Environment Variables

All secrets are stored in environment variables — never committed to the repository.

### Local Development

Create a `.env.local` file in the project root:

```env
# Gmail — email notifications
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### Production (Vercel)

Set the same two variables under **Project Settings → Environment Variables**.

`NEXT_PUBLIC_SITE_URL` is optional. It sets `metadataBase` for absolute OG/canonical URLs; when
unset the site falls back to the default `*.vercel.app` domain. Set it once a real domain is live.

---

## External Services

### Gmail (Email)

- **Purpose:** Delivers HTML-formatted booking inquiry emails to the band's inbox
- **Service:** Gmail SMTP via Nodemailer
- **Auth:** Requires a Gmail [App Password](https://support.google.com/accounts/answer/185833) (not the regular account password — 2FA must be enabled on the account)
- **Behavior:** Sent `from` the configured Gmail address with the band name as the display name, and `replyTo` set to the visitor's email so the band can reply directly
- **Recipients:** every address in `EMAIL_RECIPIENTS` in `src/app/api/booking/route.ts`
- **Config vars:** `GMAIL_USER`, `GMAIL_APP_PASSWORD`
- **Text alerts:** a short second message goes to `SMS_GATEWAY_RECIPIENTS` in the same file — carrier email-to-SMS addresses (`6152942922@txt.att.net` for AT&T; `@vtext.com` Verizon, `@tmomail.net` T-Mobile). This replaced a Twilio integration, since a US toll-free sender needs carrier verification before it can message handsets at all. The gateways are unofficial and are being retired carrier by carrier, so the send is best-effort: a failure is logged and the inquiry still succeeds on the strength of the email

### YouTube

- **Purpose:** Embeds the promo video in the `#video` section; poster frames load from `i.ytimg.com`
- **Config:** the hostname is allowlisted under `images.remotePatterns` in `next.config.ts`
- **No API key required**

### Google Fonts

- **Purpose:** Loads Bodoni Moda (headings) and Barlow (body)
- **Method:** `next/font/google` — fetched at build time and self-hosted by Next.js; no runtime external request
- **No API key required**

### Instagram

- **Purpose:** Links visitors to the band's Instagram profile (`@thechainreactionband`)
- **Location:** Navbar and footer
- **No API key required** — static link only

---

## Development

```bash
npm install
# create .env.local with the variables above
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

### Working on the hero

The hero is the fiddliest part of the site and the easiest thing to break without noticing. It
has **two layouts**, switched by the `hero-over` custom variant defined at the top of
`globals.css`: a stacked layout (photo band on top, mark below) and an overlay layout (full-bleed
photo with the mark laid across the band's torsos).

The variant's stepped media queries and the mark's size formula are derived from the same
budget — where the chin line falls given a width-driven cover crop, and how much room is left
under it. Both are documented in the comments in `Hero.tsx`; if you change one, re-derive the
other. Always check the result at **390×844**, **1440×780** (the tightest window where the
overlay still fires), **1920×1080**, and **768×1024** (must fall back to stacked).

---

## Deployment

The project is configured for zero-config deployment on Vercel. Push to `main` and Vercel will
build and deploy automatically. Ensure `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in the
Vercel project before deploying.

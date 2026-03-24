# Gypsy Falling Band — Website

Marketing and booking website for **Gypsy Falling Band**, Nashville's tribute to Fleetwood Mac and Tom Petty. The site's primary goal is to showcase the band and convert visitors into booked events by making it easy to inquire, download a press kit, and find the band on social media.

---

## Site Goals

- Present the band's story, music, and live performance credentials
- Provide a sample set list spanning both Fleetwood Mac and Tom Petty catalogues, including their shared duets
- Host a media gallery for videos and photos
- Offer an Electronic Press Kit (EPK) download for festival bookers and corporate talent buyers
- Capture booking inquiries via a contact form and deliver them instantly to the band via email and SMS

---

## Page Structure

The site is a single-page application with anchor-linked sections:

| Section | Anchor | Description |
|---|---|---|
| Navbar | — | Sticky navigation with mobile hamburger menu |
| Hero | — | Full-screen intro with primary CTA to the booking form |
| About | `#about` | Band origin story, Nashville roots, and stats |
| Media Gallery | `#media` | Embedded videos and photo gallery |
| Set List | `#setlist` | Three-column set list: Mac Staples, Petty Classics, The Duets |
| Booking Form | `#booking` | Inquiry form + EPK download |
| Footer | — | Social links, direct email, copyright |

---

## Booking / Inquiry Flow

1. Visitor fills out the booking form (`Name`, `Email`, `Event Date`, `Venue/Location`, `Event Type`, `Message`)
2. The form `POST`s to `/api/booking`
3. The API simultaneously dispatches:
   - An **HTML email** to the band's Gmail inbox (via Nodemailer + Gmail SMTP)
   - An **SMS text message** to each number in `SMS_RECIPIENTS` (via Twilio)
4. Both are fired in parallel with `Promise.allSettled` — if one channel fails the other still delivers
5. The visitor sees a confirmation message; the band is expected to reply within 24 hours

**SMS recipients** are defined in `src/app/api/booking/route.ts`:

```ts
const SMS_RECIPIENTS = ["6152942922"];
```

Add more numbers to this array to notify additional people on every inquiry.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── booking/
│   │       └── route.ts      # POST handler — sends email + SMS
│   ├── layout.tsx             # Root layout, metadata, fonts
│   ├── page.tsx               # Home page (assembles all sections)
│   └── globals.css            # Tailwind base + custom theme tokens
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── MediaGallery.tsx
│   ├── SetList.tsx
│   ├── BookingForm.tsx        # Client component — form UI + submission
│   └── Footer.tsx
└── lib/
    └── data.ts                # Static content: nav links, set list, event types, media placeholders

public/
└── gypsy-falling-epk.pdf      # Downloadable Electronic Press Kit
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Fonts | Google Fonts via `next/font` — Cinzel (headings), Barlow (body) |
| Email | Nodemailer 8 + Gmail SMTP |
| SMS | Twilio SDK 5 |
| Hosting | Vercel (recommended) |

---

## Environment Variables

All secrets are stored in environment variables — never committed to the repository.

### Local Development

Create a `.env.local` file in the project root:

```env
# Gmail — email notifications
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Twilio — SMS notifications
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

### Production (Vercel)

Set the same five variables under **Project Settings → Environment Variables** in the Vercel dashboard.

---

## External Services

### Gmail (Email)

- **Purpose:** Delivers HTML-formatted booking inquiry emails to the band's inbox
- **Service:** Gmail SMTP via Nodemailer
- **Auth:** Requires a Gmail [App Password](https://support.google.com/accounts/answer/185833) (not the regular account password — 2FA must be enabled on the account)
- **Behavior:** Email is sent `from` the configured Gmail address, with `replyTo` set to the visitor's email so the band can reply directly
- **Config vars:** `GMAIL_USER`, `GMAIL_APP_PASSWORD`

### Twilio (SMS)

- **Purpose:** Delivers an SMS text to the band's phone(s) simultaneously with the email on every inquiry
- **Service:** [Twilio Programmable Messaging](https://www.twilio.com/en-us/messaging)
- **Requirements:** A Twilio account, a purchased sending number, and a verified recipient number (if using a trial account)
- **Recipients:** Defined in `SMS_RECIPIENTS` array in `src/app/api/booking/route.ts`
- **Config vars:** `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`

### Google Fonts

- **Purpose:** Loads Cinzel (headings) and Barlow (body) typefaces
- **Method:** `next/font/google` — fonts are fetched at build time and self-hosted by Next.js; no runtime external request
- **No API key required**

### Instagram

- **Purpose:** Links visitors to the band's Instagram profile (`@pettynicksofnash`)
- **Location:** Footer
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

---

## Deployment

The project is configured for zero-config deployment on Vercel. Push to `main` and Vercel will build and deploy automatically. Ensure all five environment variables are set in the Vercel project before deploying.

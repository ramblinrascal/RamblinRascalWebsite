# Ramblin’ Rascal website

Independent Next.js static website. The homepage design, Three.js can animation, overalls and cursor are preserved. About, booking and merch links open local pages. Official patch and coaster logos are included.

## Run and build

Install Node.js 22.13 or newer and the pnpm version specified in package.json.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

`out/` is the complete deployable website. It runs on static hosting with no ChatGPT login, OpenAI API key, Sites account, database or server required. Fonts and images are local. Maps and Instagram remain intentional external links. For a local production preview, run `pnpm preview` (requires Python 3) and open http://localhost:8080.

## Put it on GitHub

1. Create an empty private repository in the bar’s GitHub organisation.
2. Extract this folder locally. Run `git init`, `git add .`, `git commit -m "Initial website"`, and `git branch -M main`.
3. Set its remote using the URL GitHub supplies: `git remote add origin YOUR_REPOSITORY_URL`.
4. Run `git push -u origin main` and authenticate through your own invited GitHub account.

No credentials are included in this package. Do not upload node_modules, .next, environment files or private account details. Rights to the bar’s branding, photographs, fonts and third-party dependencies remain with their respective owners; confirm permission and agree the handover rights with the bar before commercial launch.

## Hosting

For Cloudflare Pages, connect this repository, use `pnpm build`, and select `out` as the output directory. Use Node 22 or later. No Worker is needed.

For Netlify, connect the repository. The included netlify.toml sets the build command and output folder. Connect the existing domain only after preview checks. Keep email DNS records, domain renewal, and any independent email subscriptions intact.

## Everyday edits

- About page: `app/about/page.tsx`.
- Menu and merch: `lib/rascal-data.ts`.
- Homepage copy/hours/links: `components/rascal/story.tsx`.
- Booking page: `app/bookings/page.tsx` and `components/rascal/enquiry.tsx`.
- Merch page: `app/shop/page.tsx`.
- Photos/fonts/textures: `public/`.
- New page styles: the scoped `.rascal-subpage` block in `app/globals.css`.
- 3D animation: `components/rascal/can-scene.tsx` — unchanged in this handover.

Make changes on a branch, build and review the hosting preview, then merge to main. Keep the last known-good commit for rollback.

## Booking and shop limits — resolve before replacing Squarespace

The booking page prepares a message locally; it does not collect or transmit personal information. Visitors copy the message and send it to the official Instagram account, or open a prefilled email draft. It never claims an enquiry was sent or a booking confirmed.

`bookingEmail` in `lib/rascal-data.ts` uses charlie@ramblinrascal.com from the supplied venue hire deck and enables an email-draft handoff alongside Instagram. That opens the visitor’s email application; it is not direct form delivery. To deliver from the website itself, connect a form provider or a server endpoint with spam protection and test receipt at the bar’s inbox. Do not cancel their existing enquiry service until the replacement is approved and tested.

The official Squarespace shop listed all seven products as sold out when checked on 8 October 2026. This package is an honest catalogue with those prices and a restock contact link. It has no cart, stock management or payment processing. Add an agreed commerce service if online sales are required; do not cancel required Squarespace commerce until that is ready.

Opening hours conflict across the official pages. The unchanged homepage uses the published homepage schedule, with Tuesday, Sunday and holidays left for visitors to confirm with the bar. Confirm hours, menu prices, stock and any new gig dates before launch. No unverified dated gig poster is presented as a current schedule.

## Account handover checklist

The bar controls its domain, hosting account and GitHub organisation; the maintainer uses invited access. Keep account recovery and 2FA with the business. Record the confirmed enquiry destination, required commerce service, maintenance scope and rollback process. This package does not switch their domain or cancel Squarespace.

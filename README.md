# AANI — website

Static-built React (Vite) single-page site for AANI, deployed on Netlify.

## Local development

1. Clone the repository.
2. `npm install`
3. `npm run dev` — starts the Vite dev server.

No client-side environment variables are required to run the site locally;
the frontend has no build-time dependency on any external app platform.

## Checkout (Stripe)

Checkout is handled by two Netlify Functions in `netlify/functions/`:

- `create-checkout.js` — creates a Stripe Checkout Session and returns its
  redirect URL. Exposed at `/api/create-checkout`.
- `stripe-webhook.js` — verifies and logs the `checkout.session.completed`
  webhook event. Exposed at `/api/stripe-webhook`.

Both require environment variables set in Netlify (Site configuration ->
Environment variables), never committed to this repo. See `.env.example`
for the full list and where to get each value:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

To test checkout locally, use the [Netlify CLI](https://docs.netlify.com/cli/get-started/)
(`netlify dev`) so the functions run alongside the Vite dev server, and the
[Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhook events
to `http://localhost:8888/api/stripe-webhook`.

## Deployment

Deploys are handled by Netlify via continuous deployment from this
repository (`netlify.toml` defines the build command, publish directory,
functions directory, and redirects). Pushing to the connected branch
triggers a new deploy; nothing here needs to be published or synced from
any other platform.

## Project structure

- `src/pages/` — route-level page components (Home, Collection, Craft,
  Vision, Atelier, Thank You, 404).
- `src/components/` — shared UI components, including `SEO.jsx` (per-page
  meta tags and JSON-LD via `react-helmet-async`).
- `src/lib/` — utilities (breadcrumb JSON-LD builder, collection data,
  etc.).
- `netlify/functions/` — server-side Netlify Functions (Stripe checkout and
  webhook handling).
- `public/` — static assets served as-is, including `images/`, `robots.txt`,
  `sitemap.xml`, and `favicon.svg`.

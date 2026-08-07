# Deploying to Cloudflare Pages (GitHub Actions)

This site now builds as a **static export** (`output: 'export'` in `next.config.ts`) and
deploys to **Cloudflare Pages** from a **GitHub Actions** workflow. Content is still
authored in **TinaCMS Cloud**; edits commit to `main`, which triggers a rebuild + deploy.

## What changed

- `next.config.ts` — added `output: 'export'` and `images.unoptimized: true`; removed the
  `/admin` rewrite (not supported by static export — Cloudflare serves `public/admin/` directly).
- `app/projects/[slug]/page.tsx` — added `generateStaticParams()` + `dynamicParams = false`
  so every project page is pre-rendered at build time.
- `.github/workflows/deploy.yml` — builds with `pnpm build` and deploys `out/` to Cloudflare Pages.

## One-time setup

### 1. Create the Cloudflare Pages project
- Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Direct Upload**.
- Name it **`dipti-portfolio-website`** (must match `--project-name` in the workflow).
- Set the **Production branch** to **`main`** (Settings → Builds & deployments).
- Do **not** connect it to Git — GitHub Actions pushes the build, not Cloudflare.

### 2. Create a Cloudflare API token
- **My Profile → API Tokens → Create Token → "Edit Cloudflare Workers"** template
  (or a custom token with **Account → Cloudflare Pages → Edit**).
- Copy your **Account ID** from the dashboard right sidebar.

### 3. Add GitHub repository secrets
Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | the token from step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | your Cloudflare account ID |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | same value you have in Netlify today |
| `TINA_TOKEN` | same value you have in Netlify today |
| `NEXT_PUBLIC_TINA_BRANCH` | `main` |

> Tip: copy the three Tina values straight from your Netlify site's environment settings.

### 4. Deploy
Push to `main` (or run the workflow manually via **Actions → Deploy to Cloudflare Pages → Run workflow**).
The first successful run publishes to `https://dipti-portfolio-website.pages.dev`.

### 5. Point your domain
- Cloudflare Pages project → **Custom domains → Set up a domain** → add your domain.
- Update DNS (if the domain is already on Cloudflare this is one click), then remove the
  site from Netlify once the new deploy is verified.

## Cost

Cloudflare Pages static hosting is **free** — unlimited requests and bandwidth,
500 builds/month on the free plan (you build in GitHub Actions, so that limit is irrelevant).
GitHub Actions build minutes are covered by your Pro plan.

## Notes / trade-offs

- **ISR / `revalidate` no longer applies.** The site is a static snapshot rebuilt on each
  push. Content edits in TinaCMS commit to `main` → Action runs → new deploy (~1–2 min).
- **Images are unoptimized** (served as-is). If you later want on-the-fly resizing, enable
  Cloudflare Images/Image Resizing at the CDN layer — no code change needed.
- **`/admin`** (the TinaCMS editor) is built to `public/admin/` and served statically by Pages.

## Local build sanity check

```bash
pnpm install
pnpm build        # TinaCMS Cloud build + static export -> ./out
npx serve out     # preview the static site locally
```

## Contact form: D1 + Telegram

The `/contact` page posts to `functions/api/contact.ts`, a Cloudflare Pages Function
(auto-detected from the top-level `functions/` dir on deploy — no workflow change needed).
It writes each submission to a D1 database and forwards it to a Telegram chat.

### 1. Create the D1 database
```bash
npx wrangler d1 create dipti-contact-db
```
`wrangler.toml` is already wired to the live database (`dipti_contact_db` binding,
`database_id = b7c58e34-dea8-4f3d-b23b-298e57ef95b2`).

### 2. Run the migration against the remote database
```bash
npx wrangler d1 execute dipti_contact_db --remote --file=migrations/0001_create_submissions.sql
```

### 3. Bind D1 to the Pages project
Cloudflare dashboard → your Pages project → **Settings → Functions → D1 database bindings**
→ add binding `dipti_contact_db` → select `dipti-contact-db`. (Pages Functions read bindings
from the dashboard config at runtime, not from `wrangler.toml`, for Direct Upload deploys.)

### 4. Create a Telegram bot and get your chat ID
- Message **@BotFather** on Telegram → `/newbot` → copy the bot token.
- Message your new bot once (anything), then visit
  `https://api.telegram.org/bot<TOKEN>/getUpdates` and read `message.chat.id` from the
  response — that's your `TELEGRAM_CHAT_ID`.

### 5. Add the secrets to the Pages project
Dashboard → **Settings → Environment variables** (Production) → add:

| Variable | Value |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | token from BotFather |
| `TELEGRAM_CHAT_ID` | chat id from step 4 — comma-separate multiple ids to notify more than one person |

Mark both **Encrypt**. No redeploy needed — Functions read secrets at request time.

### 6. Bot commands: `/today` and `/csv`
`functions/api/telegram-webhook.ts` handles inbound messages to the bot. Only chat ids
listed in `TELEGRAM_CHAT_ID` get a response — anyone else is silently ignored.

- `/today` — text digest of inquiries received today.
- `/csv` — exports every submission as a `.csv` file.

Wire it up once, after the site with this route is deployed:
```bash
curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-site>/api/telegram-webhook"
```
Optional but recommended — add a random `TELEGRAM_WEBHOOK_SECRET` secret (same dashboard
step as above) and pass it as `secret_token` when registering the webhook, so only real
Telegram requests reach the endpoint:
```bash
curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-site>/api/telegram-webhook&secret_token=<SAME_VALUE_AS_THE_SECRET>"
```

### Local testing
```bash
cp .dev.vars.example .dev.vars   # fill in a test bot token/chat id, or leave blank to skip Telegram
npx wrangler d1 execute dipti_contact_db --local --file=migrations/0001_create_submissions.sql
pnpm pages:dev                    # builds + runs wrangler pages dev out
```
`wrangler pages dev` runs a local D1 (no Cloudflare account needed) and reads `.dev.vars`
for the Telegram secrets. If `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` are unset, the function
still saves to D1 and just skips the Telegram call.

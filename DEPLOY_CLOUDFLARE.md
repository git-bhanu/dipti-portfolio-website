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

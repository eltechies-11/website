# ELtechies Website

Marketing site for **ELtechies** — web, mobile, and custom software.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Lucide React icons
- FormSubmit.co for Sales / Career form emails

---

## How to run locally

### Requirements

- Node.js **20+** ([nodejs.org](https://nodejs.org))
- npm (comes with Node)

### Steps

1. Unzip the project and open a terminal in the folder.
2. Install dependencies:

```bash
npm install
```

3. Create env file:

```bash
cp .env.example .env.local
```

4. Start the site:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

### Production build (local test)

```bash
npm run build
npm run start
```

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run share` | Temporary public preview tunnel |

### Contact / Careers forms

Forms use **FormSubmit.co** from the browser (same provider as the initial commit).

```env
SALES_EMAIL=sales@eltechies.com
CAREER_EMAIL=careers@eltechies.com
NEXT_PUBLIC_SITE_URL=https://eltechies.com
```

Email subjects are prefixed with `[Sales]` or `[Career]`.

**One-time activation:** first submission for each inbox (`sales@` / `careers@`) on each domain sends a FormSubmit confirmation email. Click **Activate Form**.

If FormSubmit keeps saying “needs activation” but no email arrives (common for some custom-domain inboxes):
1. Search spam/junk for FormSubmit
2. Find any older FormSubmit activation email for that address — it contains a random form ID
3. Set that ID in Vercel as `NEXT_PUBLIC_CAREER_FORMSUBMIT_ID` (or `NEXT_PUBLIC_SALES_FORMSUBMIT_ID`) and redeploy

### Edit content

- Copy / structure: `src/content/site.ts`
- Images: `public/images/` and `public/icon.png`

---

## How to host on GoDaddy (recommended path)

GoDaddy **shared / cPanel hosting usually cannot run Next.js** (needs a Node.js server, not only PHP/HTML upload).

Best approach: **host the app on Vercel (free) + keep your domain on GoDaddy**.

### A) Deploy the app (Vercel)

1. Create a free account at [vercel.com](https://vercel.com).
2. Click **Add New… → Project**.
3. Upload this project (or connect GitHub if you push the code there).
4. Framework preset: **Next.js** (auto-detected).
5. Add environment variables:

   - `SALES_EMAIL` = `sales@eltechies.com`
   - `CAREER_EMAIL` = `careers@eltechies.com`
   - `NEXT_PUBLIC_SITE_URL` = `https://eltechies.com`
   - Optional if activation is stuck: `NEXT_PUBLIC_CAREER_FORMSUBMIT_ID` / `NEXT_PUBLIC_SALES_FORMSUBMIT_ID`

6. Click **Deploy**.
7. You’ll get a temporary URL like `https://eltechies.vercel.app` — confirm the site works.

### B) Point your GoDaddy domain to Vercel

1. In Vercel → Project → **Settings → Domains**, add your domain (e.g. `eltechies.com` and `www.eltechies.com`).
2. Vercel shows the DNS records to use (usually an **A** record and/or **CNAME**).
3. In GoDaddy → **My Products → DNS** for your domain:
   - For root domain (`eltechies.com`): set **A** record to the IP Vercel shows (commonly `76.76.21.21`).
   - For `www`: set **CNAME** to `cname.vercel-dns.com` (or the exact value Vercel shows).
4. Remove conflicting old A/CNAME records that point elsewhere.
5. Wait for DNS (often 5–30 minutes; can take up to 48 hours).
6. In Vercel, wait until the domain shows **Valid**.

SSL (HTTPS) is issued automatically by Vercel.

### C) After go-live checklist

- [ ] Homepage loads on your domain
- [ ] Contact form sends a `[Sales]` email
- [ ] Careers form sends a `[Career]` email
- [ ] Confirm FormSubmit activation emails if you haven’t already
- [ ] Mobile / dark-mode buttons look correct

---

## Alternative: GoDaddy VPS / Node hosting

Only use this if you must run everything on GoDaddy servers.

1. Buy a **VPS** (or hosting plan with **Node.js** support).
2. Install Node.js 20+ on the server.
3. Upload the project (FTP/SFTP/git), then:

```bash
npm install
npm run build
npm run start
```

4. Put a reverse proxy (Nginx / Apache / cPanel Node app) in front of port `3000`.
5. Attach your domain + SSL in GoDaddy / cPanel.

This is more setup than Vercel + GoDaddy DNS.

---

## Do not upload / share secrets

Keep these out of shared zips and public repos:

- `.env.local`
- API keys / private credentials
- `node_modules/` (recipients should run `npm install`)

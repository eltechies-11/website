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

- **Sales** → FormSubmit from the browser to `sales@eltechies.com`
- **Careers** → Resend via `/api/contact` to `career@eltechies.com`  
  (FormSubmit activation emails often never reach custom-domain inboxes like `career@`)

```env
SALES_EMAIL=sales@eltechies.com
CAREER_EMAIL=career@eltechies.com
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL="ELtechies Careers <noreply@eltechies.com>"
NEXT_PUBLIC_SITE_URL=https://eltechies.com
```

**Resend setup (careers):**
1. Create an account at [resend.com](https://resend.com)
2. Add and verify domain `eltechies.com` (DNS records Resend shows)
3. Create an API key
4. Add `RESEND_API_KEY` + `RESEND_FROM_EMAIL` in Vercel → Project → Settings → Environment Variables
5. Redeploy

Email subjects are prefixed with `[Sales]` or `[Career]`.

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
   - `CAREER_EMAIL` = `career@eltechies.com`
   - `RESEND_API_KEY` = your Resend API key
   - `RESEND_FROM_EMAIL` = `ELtechies Careers <noreply@eltechies.com>` (domain must be verified in Resend)
   - `NEXT_PUBLIC_SITE_URL` = `https://eltechies.com`

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

# Happy Little Leaders — Born to Win

A full-stack preschool web app for **Happy Little Leaders** (Hyderabad, India) with two campuses, a multi-page public site, role-based logins (parent / teacher / admin) and dashboards.

```
happy-little-leaders/
├── backend/    Node + Express + MongoDB (Mongoose) + JWT
└── frontend/   React (Vite) + React Router + Tailwind CSS + Framer Motion
```

## Quick start

You'll need **Node 18+** and (optionally) a local **MongoDB** running on `mongodb://127.0.0.1:27017`. The API also boots without a DB if Mongo isn't available — write endpoints will just fail until you connect one.

### 1. Backend

```bash
cd backend
cp .env.example .env       # on Windows: copy .env.example .env
npm install
npm run seed               # creates demo admin / teacher / parent (optional, requires MongoDB)
npm run dev                # http://localhost:5000
```

Demo accounts (after seeding):

| Role    | Email              | Password   |
|---------|--------------------|------------|
| Admin   | admin@hll.com      | admin123   |
| Teacher | teacher@hll.com    | teacher123 |
| Parent  | parent@hll.com     | parent123  |

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                # http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:5000`, so you don't need to set any extra env vars during development.

## Routes

| Path                    | Page                              |
|-------------------------|-----------------------------------|
| `/`                     | Home (hero, highlights, testimonials, branch previews) |
| `/about`                | Vision, mission, philosophy       |
| `/programs`             | Playgroup, Nursery, LKG, UKG + activities |
| `/admissions`           | Admissions Open banner, steps, downloadable form, inquiry form |
| `/gallery`              | Responsive grid + lightbox        |
| `/contact`              | Both branches with Google Maps + Get Directions, contact form, **Book a Visit** |
| `/login`                | Login + register (role-based)     |
| `/dashboard-parent`     | Child progress, attendance, announcements |
| `/dashboard-teacher`    | Mark attendance, post announcements, class updates |
| `/dashboard-admin`      | Manage users, inquiries, visit requests, announcements |

## REST API

All endpoints prefixed with `/api`. Auth is JWT via `Authorization: Bearer <token>`.

| Method | Path                          | Auth      | Notes |
|--------|-------------------------------|-----------|-------|
| POST   | `/auth/register`              | —         | parent/teacher self-signup |
| POST   | `/auth/login`                 | —         | returns `{ token, user }` |
| GET    | `/auth/me`                    | any user  | current profile |
| GET    | `/users`                      | admin     | list users |
| PATCH  | `/users/:id/role`             | admin     | change role |
| DELETE | `/users/:id`                  | admin     | remove user |
| GET    | `/attendance`                 | any user  | parent sees own child |
| POST   | `/attendance`                 | teacher/admin | upsert by `(studentId, date)` |
| GET    | `/announcements`              | any user  | filtered by audience |
| POST   | `/announcements`              | teacher/admin | post |
| DELETE | `/announcements/:id`          | admin     | delete |
| GET    | `/reports`                    | any user  | parent sees own child |
| POST   | `/reports`                    | teacher/admin | publish report |
| POST   | `/inquiries`                  | —         | public inquiry from contact/admissions |
| GET    | `/inquiries`                  | admin     | list inquiries |
| POST   | `/visits`                     | —         | Book-a-Visit form |
| GET    | `/visits`                     | admin     | list visits |
| POST   | `/newsletter`                 | —         | subscribe |

## Contact details (hard-coded per spec)

- **Phone:** 8790564656, 8341004656
- **Branch 1 — Chintalkunta:** 44/A Janapriya Homes, Chintalkunta, Abhyudaya Nagar, Hyderabad – 500074
- **Branch 2 — Vanasthalipuram:** Plot No 110, FCI Colony, Vanasthalipuram, Hyderabad – 500070

A WhatsApp floating button is wired to the primary number; the `/contact` page shows both branches with embedded Google Maps and "Get Directions" buttons.

## Design

Pastel palette (sky / sun / peach / mint / lilac), rounded-3xl cards, soft shadows, Poppins + Nunito fonts via Google Fonts. Subtle animations through Framer Motion plus a few CSS keyframes (`float`, `wiggle`).

## Tech stack

- **Frontend:** Vite, React 18, React Router 6, Tailwind CSS 3, Framer Motion
- **Backend:** Express 4, Mongoose 8, jsonwebtoken, bcryptjs, express-rate-limit, cors, morgan
- **Database:** MongoDB

## Deploy

The frontend includes a **demo-mode fallback** — if it can't reach a backend, it transparently uses `localStorage`-backed mock data so the site is fully usable on a static host without any server.

### Option A — Vercel (recommended, easiest)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo.
3. Accept the defaults (Vercel reads [`vercel.json`](vercel.json) and builds `frontend/`).
4. Click **Deploy**. Production URL appears in seconds.

### Option B — Netlify

1. Push this repo to GitHub.
2. Go to [app.netlify.com/start](https://app.netlify.com/start) → connect the repo.
3. Defaults work because of [`netlify.toml`](netlify.toml).
4. Click **Deploy site**.

### Option C — GitHub Pages

The workflow at [`.github/workflows/pages.yml`](.github/workflows/pages.yml) auto-deploys on every push to `main`.

1. Push the repo.
2. In the repo settings → **Pages**, set **Source** to "GitHub Actions".
3. The workflow runs; site is live at `https://<user>.github.io/<repo>/`.

### Optional — backend on Render

Backend is **not** required to use the site (demo mode handles it). If you want real persistence:

1. Push the repo, then [render.com/new](https://render.com/new) → "Web Service" → connect repo.
2. Root directory: `backend`, build: `npm install`, start: `npm start`.
3. Add env vars: `MONGO_URI` (MongoDB Atlas), `JWT_SECRET`, `CLIENT_ORIGIN` (your deployed frontend URL).
4. In Vercel/Netlify, add env var `VITE_API_URL=https://<your-render-app>.onrender.com/api` and redeploy the frontend.

## Publishing to GitHub (one-time)

If this is a brand-new project, here are the exact steps from a fresh Windows machine:

```bash
# 1. Install Git (https://git-scm.com/download/win) and GitHub CLI (https://cli.github.com/)
# 2. From the project root:
git init
git add .
git commit -m "Initial commit: Happy Little Leaders"
gh auth login                                    # browser-based login to GitHub
gh repo create happy-little-leaders --public --source=. --push
```

That's it — the repo will exist on GitHub and your local main is pushed.

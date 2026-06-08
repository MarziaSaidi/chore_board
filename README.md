# Task Manager

A simple task-manager web app built with [Next.js](https://nextjs.org) (App Router, TypeScript), [Tailwind CSS](https://tailwindcss.com), and [Supabase](https://supabase.com).

## Prerequisites

- [Node.js](https://nodejs.org) 18.18+ (developed on v24)
- npm (developed on v11)
- A [Supabase](https://supabase.com) account (free tier is fine)

## Tech stack

- Next.js 15 (App Router, `src/` directory, `@/*` import alias)
- TypeScript
- Tailwind CSS v4
- Supabase JS client (`@supabase/supabase-js`) + SSR helpers (`@supabase/ssr`)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

   ```bash
   cp .env.example .env.local
   ```

   Then fill in the values from your Supabase project (see below).

## Create your Supabase project (manual step)

This repo ships with Supabase client code but **no project** — you need to create
one under your own account:

1. Go to [supabase.com](https://supabase.com) and sign in (or create an account).
2. Click **New project**, give it a name, set a database password, and pick a region.
3. Wait for the project to finish provisioning.
4. In the project dashboard, open **Project Settings → API**.
5. Copy the **Project URL** and the **anon / public** API key.
6. Paste them into `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

> `.env.local` is gitignored and will never be committed. `.env.example` is the
> committed template.

The Supabase clients live in `src/lib/supabase/`:

- `client.ts` — browser client (use in Client Components)
- `server.ts` — server client with cookie handling (use in Server Components, Route Handlers, and Server Actions)

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint
```

## Push to a git remote

This project is already a git repo with an initial commit. To push it to GitHub
(or another remote):

```bash
git remote add origin <your-remote-url>
git push -u origin main
```

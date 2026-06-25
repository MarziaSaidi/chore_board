# Chore Board

A real-time collaborative task manager with a Studio Ghibli-inspired UI. Built with Next.js, TypeScript, Supabase, and Tailwind CSS.

**Live demo:** [choreboard-dun.vercel.app](https://choreboard-dun.vercel.app)

---

## Features

- **Kanban board** — drag-and-drop tasks across To Do / In Progress / Done columns using dnd-kit, with optimistic UI updates and conflict-safe position reordering
- **Real-time collaboration** — task changes sync instantly across all connected clients via Supabase Realtime WebSocket subscriptions
- **Authentication** — JWT-based auth with protected routes and session persistence
- **Board invitations** — board owners can invite members by email; invited users see shared boards on their dashboard
- **Row Level Security** — Supabase RLS policies ensure users can only access data they're authorized to see
- **Ghibli UI** — Matsu theme with oklch color tokens, watercolor texture overlay, and CSS masked images

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, TypeScript, `src/` directory) |
| Styling | Tailwind CSS v4 · Matsu theme · Kalam + Nunito fonts |
| Database | Supabase (PostgreSQL + Row Level Security) |
| Auth | Supabase Auth (JWT, SSR cookie handling) |
| Real-time | Supabase Realtime (WebSocket subscriptions) |
| Drag & drop | dnd-kit |
| Deployment | Vercel (CI/CD via GitHub) |

---

## Getting started

### Prerequisites

- Node.js 18.18+
- npm
- A [Supabase](https://supabase.com) account (free tier works)

### 1. Clone and install

```bash
git clone https://github.com/MarziaSaidi/chore_board.git
cd chore_board
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In **Project Settings → API**, copy your **Project URL** and **anon/public key**
3. Create your environment file:

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> `.env.local` is gitignored and will never be committed.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # lint
```

---

## Project structure

```
src/
├── app/
│   ├── auth/          # login, signup, signout actions
│   ├── boards/[id]/   # board page, kanban actions, member actions
│   ├── dashboard/     # boards list
│   └── globals.css    # Matsu theme tokens + texture
├── components/
│   ├── kanban/        # KanbanBoard, TaskCard, AddTaskForm
│   ├── board/         # MembersPanel
│   └── ui/            # Button, Input, Select, Card, Badge, Alert…
└── lib/
    ├── supabase/      # browser + server clients
    └── db/            # boards, tasks, members queries
```

---

## Acknowledgements

- [Matsu theme](https://matsu-theme.vercel.app) — Studio Ghibli-inspired shadcn/ui theme
- Developed with the assistance of [Claude](https://claude.ai) (Anthropic) and [Cursor](https://cursor.sh)

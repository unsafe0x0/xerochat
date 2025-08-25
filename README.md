# XeroChat

Minimal multi‑model AI chat UI (Next.js + TypeScript + Tailwind). Streams replies, lets you switch models, and keeps chats locally.

## Quick Start

```bash
git clone https://github.com/unsafe0x0/xerochat.git
cd xerochat
bun install        # or npm install
bun dev            # or npm run dev
```

Open http://localhost:3000

## Configure Keys

Open Settings in the sidebar and paste any you have:

- OpenRouter (models hitting `/api/open-router`)
- Gemini ( `/api/gemini` )
- Groq ( `/api/groq-cloud` )
  Keys are stored in localStorage; no server env vars needed.

## Edit Models

File: `data/Models.tsx`
Add / remove / rename models or change endpoint. Appears instantly in the selector.

## Folder Structure

`app/api/*` lightweight proxy routes
`components/*` UI (chat, input, sidebar, model selector, settings)
`utils/api.ts` picks correct endpoint + key

## Basic Use

1. Enter a key (or use free ones if available)
2. Type a prompt
3. Switch model from the selector any time
4. Copy / regenerate messages via their action buttons

## Build / Prod

```bash
bun run build   # or npm run build
bun start       # or npm start
```

Deploy on Vercel (zero config) or any Node host.

## Customize

- Styling: tweak Tailwind classes in components
- Models: edit `data/Models.tsx`
- Proxy logic: adjust `app/api/<provider>/route.ts`

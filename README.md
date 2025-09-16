# XeroChat

Minimal multi model AI chat UI (Next.js + TypeScript + Tailwind). Streams replies, lets you switch models, and keeps chats locally.

## Quick Start

```bash
git clone https://github.com/unsafe0x0/xerochat.git
cd xerochat
bun install        # or npm install
bun dev            # or npm run dev
```

Open http://localhost:3000

## Configure Keys

Open Settings in the sidebar and paste any API keys you have:

- **OpenRouter** (models using `/api/open-router`)
- **Gemini** (models using `/api/gemini`)
- **Mistral** (models using `/api/mistral`)

Keys are stored in localStorage; no server env vars needed.

## Edit Models

File: `data/Models.tsx`
Add, remove, or rename models, or change their endpoint. Only OpenRouter and Gemini models are available by default. Changes appear instantly in the selector.

## Folder Structure

`app/api/*` – lightweight proxy routes for each provider (e.g. open-router, gemini)
`components/*` – UI (chat, input, sidebar, model selector, settings, markdown renderer)
`data/Models.tsx` – model list and config
`utils/api.ts` – picks correct endpoint + key

## Basic Use

1. Enter a key (or use free ones if available)
2. Type a prompt
3. Switch model from the selector at any time
4. Copy or regenerate messages via their action buttons

## Build / Prod

```bash
bun run build   # or npm run build
bun start       # or npm start
```

Deploy on Vercel (zero config) or any Node host.

## Customize

- Styling: tweak Tailwind classes in components
  - Models: edit `data/Models.tsx` (OpenRouter and Gemini endpoints only)
- Proxy logic: adjust `app/api/<provider>/route.ts`

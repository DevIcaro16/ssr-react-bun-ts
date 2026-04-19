# ssr-react-bun-ts

A Server-Side Rendering (SSR) demo built with **Bun**, **React 19**, and **TypeScript** — no Vite, no Express, no webpack. Uses the [PokéAPI](https://pokeapi.co) as a data source.

## How it works

1. `server.tsx` receives every request and resolves the page component from the URL path (`/` → `src/pages/home/Home.tsx`).
2. If the page exports `getServerSideProps`, it is called on the server and the props are passed to the component.
3. The component is rendered to an HTML string via `react-dom/server` and sent to the browser.
4. The browser receives the pre-rendered HTML along with the serialized initial data (`window.__INITIAL_DATA__`).
5. `src/BrowserEntry.tsx` hydrates the page using `hydrateRoot`, making it fully interactive.

## Project structure

```
.
├── server.tsx              # Bun.serve() — SSR request handler + static asset bundling
├── index.tsx               # Root HTML shell (rendered server-side)
├── index.css               # Global styles (entry point for CSS bundler)
├── src/
│   ├── BrowserEntry.tsx    # Client hydration entry point
│   ├── components/
│   │   └── PokemonCard/    # Card component (sprite, name, types, favorite toggle)
│   ├── pages/
│   │   └── home/           # Home page — fetches 50 Pokémon, grid + pagination + sort
│   └── types/
│       └── pokemon.ts      # Shared TypeScript types
├── docs/
│   ├── GITFLOW.md          # Git branching strategy
│   └── superpowers/        # Design specs and implementation plans
├── .env.example            # Environment variable reference
└── package.json
```

## Getting started

```bash
# Install dependencies
bun install

# Copy env file
cp .env.example .env

# Development (watch mode)
bun run dev

# Production
bun run start
```

The server starts on `http://localhost:3001` by default. Set `PORT` in `.env` to change it.

## Environment variables

| Variable | Default | Description          |
|----------|---------|----------------------|
| `PORT`   | `3001`  | Port the server listens on |

## Scripts

| Script        | Command                   | Description              |
|---------------|---------------------------|--------------------------|
| `bun run dev` | `bun --watch server.tsx`  | Start with hot-reload    |
| `bun run start` | `bun run server.tsx`    | Start in production mode |
| `bun test`    | —                         | Run test suite           |

## Tech stack

- [Bun](https://bun.sh) — runtime, bundler, test runner
- [React 19](https://react.dev) — UI library
- [TypeScript 5](https://www.typescriptlang.org) — type safety
- [PokéAPI](https://pokeapi.co) — public REST API (no auth required)

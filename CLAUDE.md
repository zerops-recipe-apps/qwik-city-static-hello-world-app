# qwik-city-static-hello-world-app

Qwik City SPA compiled to static HTML/CSS/JS by Vite — served by nginx in prod; dev container runs the Vite dev server over SSH.

## Zerops service facts

- HTTP port: dev `5173` (Vite) / prod `80` (nginx)
- Siblings: —
- Runtime base: dev `nodejs@22` / prod `static`

## Zerops dev

`setup: dev` idles on `zsc noop --silent`; the agent starts the dev server.

- Dev command: `npm run dev`
- In-container rebuild without deploy: `npm run build`

**All platform operations (start/stop/status/logs of the dev server, deploy, env / scaling / storage / domains) go through the Zerops development workflow via `zcp` MCP tools. Don't shell out to `zcli`.**

## Notes

- `npm run build` runs two Vite builds: client bundle (`vite build`) and the static adapter (`vite build -c adapters/static/vite.config.ts`) that emits the pre-rendered HTML. Output lands in `dist/`, deployed flattened (`dist/~`) as the nginx root.
- `PUBLIC_*` env vars are baked into the bundle at build time via Vite. Use the `RUNTIME_` prefix pattern in `zerops.yaml` (e.g. `PUBLIC_APP_ENV=${RUNTIME_APP_ENV:-production} npm run build`) to inject service env vars into the build.
- Dev script is `vite --mode ssr` — Qwik's dev server mirrors the SSR pipeline even though prod output is fully static.

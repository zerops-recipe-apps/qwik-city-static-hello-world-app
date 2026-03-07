# Qwik City Hello World Recipe App

<!-- #ZEROPS_EXTRACT_START:intro# -->
A minimal Qwik City application built as a fully static site — compiled to HTML/CSS/JS by the Vite-based Qwik build pipeline, then served by Nginx on Zerops with no Node.js runtime required.
Used within [Qwik City Hello World recipe](https://app.zerops.io/recipes/qwik-city-hello-world) for [Zerops](https://zerops.io) platform.
<!-- #ZEROPS_EXTRACT_END:intro# -->

⬇️ **Full recipe page and deploy with one-click**

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/light/deploy-button.svg)](https://app.zerops.io/recipes/qwik-city-hello-world?environment=small-production)

![qwik cover](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/svg/cover-qwik.svg)

## Integration Guide

<!-- #ZEROPS_EXTRACT_START:integration-guide# -->

### 1. Adding `zerops.yaml`
The main application configuration file you place at the root of your repository, it tells Zerops how to build, deploy and run your application.

```yaml
# Qwik City Hello World — Zerops build and deploy pipeline.
# Two setups: 'prod' compiles static assets for Nginx serving;
# 'dev' prepares a workspace for development via SSH.
zerops:

  - setup: prod
    build:
      # Build with Node.js (npm/npx), serve with Nginx.
      # The build container compiles Qwik source into static
      # HTML/CSS/JS — Node.js is NOT present at runtime.
      base: nodejs@22

      buildCommands:
        - npm ci
        # RUNTIME_ prefix pattern: Zerops injects every runtime env var
        # into the build shell prefixed with RUNTIME_. So if the service
        # has APP_ENV=production at runtime, the build shell sees
        # RUNTIME_APP_ENV=production. The shell expansion reads it and
        # passes it to Vite as a PUBLIC_ var baked into the bundle.
        # This is the only way to inject env config into a static build —
        # there is no runtime process to read variables after deploy.
        - PUBLIC_APP_ENV=${RUNTIME_APP_ENV:-production} npm run build

      # Strip the 'dist/' prefix — dist/index.html becomes /index.html
      # at the Nginx document root.
      deployFiles:
        - dist/~

      cache:
        - node_modules

    run:
      # Nginx serves the compiled output — no Node.js at runtime.
      # Built-in SPA fallback: unmatched routes serve /index.html,
      # so Qwik City client-side routing works without custom config.
      base: static


  - setup: dev
    build:
      base: nodejs@22
      os: ubuntu

      buildCommands:
        # npm install (not npm ci) — dev may work from a fresh clone
        # without a committed lock file.
        - npm install

      # Deploy the full source tree so the developer can edit files
      # and run 'npm run dev' directly from the SSH session.
      deployFiles: ./

      cache:
        - node_modules

    run:
      # nodejs@22 at runtime — the developer needs Node.js to run
      # 'npm run dev' or other Qwik CLI commands via SSH.
      base: nodejs@22
      os: ubuntu

      # Keep the container alive without starting any server.
      # The developer starts their own dev server via SSH.
      start: zsc noop --silent
```
<!-- #ZEROPS_EXTRACT_END:integration-guide# -->

import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { readFileSync } from 'node:fs';

// Read Qwik version from installed package at build time
const qwikPkg = JSON.parse(
  readFileSync('./node_modules/@builder.io/qwik/package.json', 'utf-8')
);

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],

    // Expose PUBLIC_* env vars to client code (Qwik City convention).
    // Set PUBLIC_APP_ENV in the build shell to inject the environment name.
    envPrefix: ['PUBLIC_', 'VITE_'],

    define: {
      // Baked into the bundle at build time — no runtime process reads these.
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __QWIK_VERSION__: JSON.stringify(qwikPkg.version),
    },

    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});

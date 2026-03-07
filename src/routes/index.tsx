import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  // PUBLIC_APP_ENV is a Vite PUBLIC_* env var baked in at build time.
  // Set via: PUBLIC_APP_ENV=${RUNTIME_APP_ENV:-production} npm run build
  const env = import.meta.env.PUBLIC_APP_ENV || 'development';

  // __BUILD_TIME__ and __QWIK_VERSION__ are injected via vite.config.ts `define`.
  const buildTime = new Date(__BUILD_TIME__).toUTCString();

  return (
    <main class="container">
      <div class="card">
        <h1>Hello from Zerops!</h1>
        <p class="subtitle">Qwik City static deployment</p>

        <dl class="info">
          <dt>Framework</dt>
          <dd>Qwik City v{__QWIK_VERSION__}</dd>

          <dt>Environment</dt>
          <dd class="env-badge">{env}</dd>

          <dt>Built</dt>
          <dd>{buildTime}</dd>
        </dl>
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: 'Qwik City Hello World | Zerops',
  meta: [
    {
      name: 'description',
      content: 'Qwik City static Hello World recipe on Zerops.',
    },
  ],
};

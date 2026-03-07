import { staticAdapter } from '@builder.io/qwik-city/adapters/static/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

export default extendConfig(baseConfig, () => {
  return {
    build: {
      // SSR pass: renders every route to static HTML, writes into dist/.
      ssr: true,
      rollupOptions: {
        input: ['@qwik-city-plan'],
      },
    },
    plugins: [
      staticAdapter({
        // Origin is used for sitemap / canonical URL generation only —
        // change to your actual domain before going live.
        origin: 'https://example.zerops.io',
      }),
    ],
  };
});

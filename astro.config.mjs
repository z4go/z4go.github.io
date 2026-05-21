// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages at https://z4go.github.io/z4go/
// `site` + `base` must match the repo so generated URLs/assets resolve.
export default defineConfig({
  site: 'https://z4go.github.io',
  base: '/z4go',
});

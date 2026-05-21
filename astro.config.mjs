// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { remarkTodo } from './plugins/remark-todo.mjs';

// Deployed to GitHub Pages at the org root: https://z4go.github.io/
// No `base` — this is served from a `z4go.github.io` repo, not a project page.
export default defineConfig({
  site: 'https://z4go.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkTodo],
  },
});

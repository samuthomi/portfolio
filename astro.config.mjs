// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://samsonkirigua.com',
  // Keep build.format as 'file'. It writes dist/case-study-x.html, the same
  // layout the site had before Astro, so Cloudflare Pages keeps serving
  // /case-study-x, /case-study-x.html and /case-study-x/ exactly as before.
  // The default ('directory') would make every old .html link return 404.
  build: { format: 'file' },
  trailingSlash: 'never',
  // Keep whitespace between tags as written, so inline spacing matches the old pages.
  compressHTML: false,
  // Leave quotes and apostrophes exactly as typed in the content files.
  markdown: { smartypants: false },
  integrations: [mdx()],
});

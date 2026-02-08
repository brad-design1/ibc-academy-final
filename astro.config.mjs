// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { readFileSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'https://ibcacademy.org',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [
    sitemap({
      lastmod: new Date(),
      priority: 0.7,
      changefreq: 'weekly',
      customPages: [],
      serialize(item) {
        // Set priority based on URL path
        if (item.url === 'https://ibcacademy.org/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/learn/articles/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
          
          // Try to get lastmod from file timestamp for articles
          try {
            const articleSlug = item.url.split('/learn/articles/')[1].replace('/', '');
            const articlePath = join(__dirname, 'src', 'content', 'articles', `${articleSlug}.md`);
            const stats = statSync(articlePath);
            item.lastmod = stats.mtime;
          } catch (e) {
            // Fallback to current date if file not found
            item.lastmod = new Date();
          }
        } else if (item.url.includes('/learn/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/paths/')) {
          item.priority = 0.85;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/book/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/about') || item.url.includes('/contact')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        
        return item;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
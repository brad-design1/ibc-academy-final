import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles');

  // Sort by date, newest first
  const sortedArticles = articles.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'IBC Academy',
    description: 'Free education on the Infinite Banking Concept. No products sold. Just principles that work.',
    site: context.site || 'https://ibcacademy.org',
    items: sortedArticles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.pubDate,
      description: article.data.description,
      link: `/learn/articles/${article.id}/`,
      categories: [article.data.category, ...article.data.tags],
    })),
    customData: `<language>en-us</language>
<copyright>© ${new Date().getFullYear()} IBC Academy. All rights reserved.</copyright>
<webMaster>contact@ibcacademy.org (IBC Academy)</webMaster>
<image>
  <url>https://ibcacademy.org/og-default.png</url>
  <title>IBC Academy</title>
  <link>https://ibcacademy.org</link>
</image>`,
  });
}

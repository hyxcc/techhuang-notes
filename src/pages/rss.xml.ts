import { site } from '../data/site';
import { getPublishedPosts } from '../utils/posts';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET() {
  const articles = await getPublishedPosts();
  const items = articles.map((article) => `
    <item>
      <title>${escapeXml(article.data.title)}</title>
      <description>${escapeXml(article.data.description)}</description>
      <link>${site.url}/articles/${article.id}/</link>
      <guid>${site.url}/articles/${article.id}/</guid>
      <pubDate>${article.data.date.toUTCString()}</pubDate>
    </item>`).join('');
  const body = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0"><channel>
    <title>${escapeXml(site.name)}</title><description>${escapeXml(site.description)}</description><link>${site.url}</link>
    ${items}
  </channel></rss>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

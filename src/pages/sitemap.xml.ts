import { site } from '../data/site';
import { getAllSeries, getAllTags, getPublishedPosts } from '../utils/posts';
import { getPublishedProjects } from '../utils/projects';
import { getPublishedReading } from '../utils/reading';

export async function GET() {
  const articles = await getPublishedPosts();
  const projects = await getPublishedProjects();
  const reading = await getPublishedReading();
  const tags = getAllTags(articles);
  const series = getAllSeries(articles);
  const paths = [
    '/',
    '/articles/',
    '/tags/',
    '/series/',
    '/projects/',
    '/reading/',
    '/now/',
    '/about/',
    ...articles.map((article) => `/articles/${article.id}/`),
    ...tags.map((tag) => `/tags/${encodeURIComponent(tag.name)}/`),
    ...series.map((item) => `/series/${encodeURIComponent(item.name)}/`),
    ...projects.map((project) => `/projects/${project.id}/`),
    ...reading.map((item) => `/reading/${item.id}/`),
  ];
  const urls = paths.map((path) => `<url><loc>${site.url}${path}</loc></url>`).join('');
  const body = `<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

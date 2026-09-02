import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatPostDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getAdjacentPosts(posts: BlogPost[], currentId: string) {
  const currentIndex = posts.findIndex((post) => post.id === currentId);

  return {
    newer: currentIndex > 0 ? posts[currentIndex - 1] : undefined,
    older: currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined,
  };
}

export function getRelatedPosts(posts: BlogPost[], current: BlogPost, limit = 3) {
  const candidates = posts
    .filter((post) => post.id !== current.id)
    .map((post) => {
      const sharedTags = post.data.tags.filter((tag) => current.data.tags.includes(tag)).length;
      const sameCategory = post.data.category === current.data.category ? 1 : 0;
      const sameSeries = current.data.series && post.data.series === current.data.series ? 1 : 0;
      return { post, score: sharedTags * 2 + sameCategory + sameSeries * 3 };
    })
    .sort((a, b) => b.score - a.score || b.post.data.date.valueOf() - a.post.data.date.valueOf())
    .slice(0, limit);

  return candidates.map(({ post }) => post);
}

export function getAllTags(posts: BlogPost[]) {
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  });

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
}

export function getPostsByTag(posts: BlogPost[], tag: string) {
  return posts.filter((post) => post.data.tags.includes(tag));
}

export function getAllSeries(posts: BlogPost[]) {
  const groups = new Map<string, BlogPost[]>();

  posts.forEach((post) => {
    if (!post.data.series) return;
    const seriesPosts = groups.get(post.data.series) ?? [];
    seriesPosts.push(post);
    groups.set(post.data.series, seriesPosts);
  });

  return [...groups.entries()]
    .map(([name, seriesPosts]) => ({
      name,
      count: seriesPosts.length,
      latestDate: new Date(Math.max(...seriesPosts.map((post) => post.data.date.valueOf()))),
      posts: sortSeriesPosts(seriesPosts),
    }))
    .sort((a, b) => b.latestDate.valueOf() - a.latestDate.valueOf());
}

export function getPostsBySeries(posts: BlogPost[], series: string) {
  return sortSeriesPosts(posts.filter((post) => post.data.series === series));
}

function sortSeriesPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    const orderA = a.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB || a.data.date.valueOf() - b.data.date.valueOf();
  });
}

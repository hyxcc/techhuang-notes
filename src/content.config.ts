import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['Java 后端', 'AI 实践', '面试复盘', '生活记录']),
    readingTime: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
  }).superRefine((data, context) => {
    if (Boolean(data.series) !== Boolean(data.seriesOrder)) {
      context.addIssue({
        code: 'custom',
        message: 'series 和 seriesOrder 必须同时填写',
        path: data.series ? ['seriesOrder'] : ['series'],
      });
    }
    if (data.updatedDate && data.updatedDate < data.date) {
      context.addIssue({
        code: 'custom',
        message: 'updatedDate 不能早于 date',
        path: ['updatedDate'],
      });
    }
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.enum(['规划中', '迭代中', '已完成']),
    tech: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    repository: z.string().url().optional(),
    website: z.string().url().optional(),
  }),
});

const reading = defineCollection({
  loader: glob({ base: './src/content/reading', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    status: z.enum(['reading', 'interested', 'finished']),
    category: z.enum(['技术', '思维', '文学', '生活', '个人成长', '其他']),
    addedDate: z.coerce.date(),
    startedDate: z.coerce.date().optional(),
    finishedDate: z.coerce.date().optional(),
    progress: z.number().min(0).max(100).optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    externalUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }).superRefine((data, context) => {
    if (data.status === 'reading' && !data.startedDate) {
      context.addIssue({
        code: 'custom',
        message: 'reading 状态需要填写 startedDate',
        path: ['startedDate'],
      });
    }
    if (data.status === 'reading' && data.progress === undefined) {
      context.addIssue({
        code: 'custom',
        message: 'reading 状态需要填写 progress',
        path: ['progress'],
      });
    }
    if (data.status === 'finished' && !data.finishedDate) {
      context.addIssue({
        code: 'custom',
        message: 'finished 状态需要填写 finishedDate',
        path: ['finishedDate'],
      });
    }
  }),
});

const readingNotes = defineCollection({
  loader: glob({ base: './src/content/reading-notes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    book: z.string(),
    recordedAt: z.coerce.date(),
    chapter: z.string(),
    pages: z.string(),
    relatedContent: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects, reading, readingNotes };

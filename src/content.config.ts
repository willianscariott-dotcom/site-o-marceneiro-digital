import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const estudosDeCaso = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/estudos-de-caso" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    location: z.string(),
    challenge: z.string(),
    efficiency_iec: z.number(),
    investment: z.string(),
    cover_image: z.string(),
    cortecloud_image: z.string(),
    seo_keywords: z.array(z.string()).optional(),
    secondary_label: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    cover_image: z.string().optional(),
    cover_alt: z.string().optional(),
    author: z.string(),
    video_id: z.string().optional(),
    video_title: z.string().optional(),
    video_description: z.string().optional(),
    seo_keywords: z.array(z.string()).optional(),
    hidden: z.boolean().optional(),
  }),
});

export const collections = {
  'estudos-de-caso': estudosDeCaso,
  'blog': blog,
};
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
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    excerpt: z.string(),
    cover_image: z.string(),
  }),
});

export const collections = {
  'estudos-de-caso': estudosDeCaso,
  'blog': blog,
};
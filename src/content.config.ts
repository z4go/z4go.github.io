import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

// One Markdown file per trip day. Frontmatter drives every component.
const trips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trips' }),
  schema: ({ image }) =>
    z.object({
      day: z.number().int().positive(),
      title: z.string(),
      date: z.coerce.date(),
      location: z.string(),
      weather: z.string(),
      summary: z.string(),
      status: z.enum(['done', 'todo']).default('todo'),
      lang: z.enum(['en', 'th']).default('en'),
      hero: image(),
      heroAlt: z.string().default('Trip day hero image'),
      stats: z.object({
        steps: z.number(),
        spent: z.string(),
        stops: z.number(),
        photos: z.number(),
      }),
      timeline: z
        .array(
          z.object({
            time: z.string(),
            stop: z.string(),
            cost: z.string(),
          }),
        )
        .default([]),
      coords: z
        .array(
          z.object({
            label: z.string(),
            lat: z.number(),
            lng: z.number(),
          }),
        )
        .default([]),
      photos: z.array(image()).default([]),
      references: z
        .array(
          z.object({
            title: z.string(),
            url: z.string().url(),
            icon: z.string().optional(),
          }),
        )
        .default([]),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { trips };

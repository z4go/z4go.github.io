import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

// Two collections rooted at the same folder, split by glob depth:
//   src/content/trips/<slug>.md         → trip metadata  (collection: trips)
//   src/content/trips/<slug>/day-N.md   → day entries    (collection: days)
const trips = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/trips' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      location: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      summary: z.string(),
      travellers: z.number().int().positive().default(1),
      cover: image(),
      coverAlt: z.string().default('Trip cover image'),
      status: z.enum(['planning', 'live', 'done']).default('planning'),
      tags: z.array(z.string()).default([]),
      decisions: z
        .array(
          z.object({
            kind: z.enum(['todo', 'warn']),
            label: z.string(),
            day: z.number().int().positive(),
          }),
        )
        .default([]),
    }),
});

const days = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/trips' }),
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

export const collections = { trips, days };

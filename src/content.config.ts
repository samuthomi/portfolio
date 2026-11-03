import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const metric = z.object({ number: z.string(), label: z.string() });

const caseStudies = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    // Must equal the old filename stem, because it is the public URL.
    slug: z.string().regex(/^case-study-[a-z0-9-]+$/),
    title: z.string(),
    pageTitle: z.string(),
    description: z.string(),
    subtitle: z.string().optional(),
    // Shown when the link is shared. The image is /images/og/<slug>.jpg (1200x630).
    previewDescription: z.string().optional(),
    year: z.number().int(),
    order: z.number(),
    listed: z.boolean(),
    noindex: z.boolean().default(false),
    metrics: z.array(metric).optional(),
    meta: z.object({
      team: z.string(),
      timeline: z.string().optional(),
      role: z.string(),
    }),
    cover: z
      .object({
        src: z.string(),
        width: z.number(),
        height: z.number(),
        mobileSrc: z.string().optional(),
        mobileWidth: z.number().optional(),
        mobileHeight: z.number().optional(),
        alt: z.string(),
      })
      .optional(),
    card: z
      .object({ thumb: z.string(), thumbAlt: z.string(), text: z.string(), result: z.string() })
      .optional(),
    moreWork: z.array(z.string().regex(/^case-study-[a-z0-9-]+$/)),
  }),
});

export const collections = { caseStudies };

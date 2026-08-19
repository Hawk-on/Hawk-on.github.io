import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		tittel: z.string(),
		publisertDato: z.coerce.date(),
		oppdatertDato: z.coerce.date().optional(),
		ingress: z.string(),
		tags: z.array(z.string()).default([]),
		lesetid: z.number().optional(),
		bilete: z.string().optional(),
		bileteAlt: z.string().optional(),
		utkast: z.boolean().default(false),
	}),
});

export const collections = { blog };

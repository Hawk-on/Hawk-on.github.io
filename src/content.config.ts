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
		// Språk og kopling mellom dei to versjonane av same artikkel.
		// 'nn' bur på /blog/<slug>/, 'en' på /blog/en/<slug>/.
		sprak: z.enum(['nn', 'en']).default('nn'),
		omsetjing: z.string().optional(),
		bilete: z.string().optional(),
		bileteAlt: z.string().optional(),
		utkast: z.boolean().default(false),
	}),
});

export const collections = { blog };

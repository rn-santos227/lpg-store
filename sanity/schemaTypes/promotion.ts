import type { Rule } from 'sanity'

export default {
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
      description: 'Main headline shown in hero',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Short supporting text',
    },
    {
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Button text (e.g. Order Now)',
    },
    {
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      description: 'Internal path or external URL',
    },

    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
      description: 'Controls whether this promotion is shown',
    },
  ],
}

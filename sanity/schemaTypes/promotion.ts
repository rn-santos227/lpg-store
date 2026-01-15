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

  ],
}

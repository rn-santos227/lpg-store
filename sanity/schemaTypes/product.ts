import type { Rule } from 'sanity'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'sizeKg',
      title: 'Size (KG)',
      type: 'number',
      description: 'Applicable to LPG tanks or refills only',
    },
    {
      name: 'price',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'available',
      title: 'Available for Order',
      type: 'boolean',
      initialValue: true,
    },
  ],
}

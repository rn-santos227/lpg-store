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
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Mark as a featured item for promotional placements.',
      initialValue: false,
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
      name: 'primaryImage',
      title: 'Primary Image',
      type: 'image',
      description: 'Optional primary product photo.',
      options: { hotspot: true },
      validation: (Rule: Rule) =>
        Rule.custom((value, context) => {
          const gallery = context.document?.gallery as unknown[] | undefined

          if (!value && gallery && gallery.length > 0) {
            return 'Primary image is required when gallery images are provided.'
          }

          return true
        }),
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Optional additional images for the product gallery.',
      validation: (Rule: Rule) =>
        Rule.custom((value, context) => {
          const primaryImage = context.document?.primaryImage
          const images = value as unknown[] | undefined

          if (images && images.length > 0 && !primaryImage) {
            return 'Add a primary image when providing gallery images.'
          }

          return true
        }),
    },
    {
      name: 'available',
      title: 'Available for Order',
      type: 'boolean',
      initialValue: true,
    },
  ],
}

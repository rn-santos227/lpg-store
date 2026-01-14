import type { Rule } from 'sanity'

export default {
  name: 'review',
  title: 'Product Review',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'customer',
      title: 'Customer (optional)',
      type: 'reference',
      to: [{ type: 'customer' }],
    },
  ],
}

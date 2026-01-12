import type { Rule } from 'sanity'

export default {
  name: 'inventory',
  title: 'Inventory',
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
      name: 'quantity',
      title: 'Available Quantity',
      type: 'number',
      description: 'Number of units currently in stock',
      validation: (Rule: Rule) => Rule.required().min(0),
    },
  ],
}

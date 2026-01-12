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
    {
      name: 'lowStockThreshold',
      title: 'Low Stock Threshold',
      type: 'number',
      description: 'Trigger warning when stock falls below this number',
      initialValue: 5,
      validation: (Rule: Rule) => Rule.min(0),
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
    },
  ],
}

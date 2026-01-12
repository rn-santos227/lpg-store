import type { Rule } from 'sanity'

export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'customerSnapshot',
      title: 'Customer Snapshot',
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'address', type: 'text' },
        { name: 'location', type: 'geopoint' },
      ],
      description: 'Frozen customer data at time of order',
    },
  ],
}

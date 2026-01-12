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
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              type: 'reference',
              to: [{ type: 'product' }],
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'productSnapshot',
              title: 'Product Snapshot',
              type: 'object',
              fields: [
                { name: 'name', type: 'string' },
                { name: 'sizeKg', type: 'number' },
                { name: 'price', type: 'number' },
              ],
              description: 'Price and product details at order time',
            },
            {
              name: 'quantity',
              type: 'number',
              validation: (Rule: Rule) => Rule.required().min(1),
            },
          ],
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Out for Delivery', value: 'out_for_delivery' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'deliveryNotes',
      title: 'Delivery Notes',
      type: 'text',
      description: 'Instructions from customer',
    },
    {
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Staff-only notes',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
}

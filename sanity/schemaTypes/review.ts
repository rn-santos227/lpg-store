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
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating from 1 to 5',
      validation: (Rule: Rule) =>
        Rule.required().min(1).max(5),
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
      description: 'Optional review text',
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
}

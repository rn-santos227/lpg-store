import type { Rule } from 'sanity'

export default {
  name: 'booking',
  title: 'Service Booking',
  type: 'document',
  fields: [
    {
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'serviceSnapshot',
      title: 'Service Snapshot',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Service Title',
          type: 'string',
        },
        {
          name: 'fee',
          title: 'Service Fee',
          type: 'number',
        },
      ],
    },
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
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
        },
      ],
    },
    {
      name: 'preferredDate',
      title: 'Preferred Date',
      type: 'date',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'preferredTime',
      title: 'Preferred Time',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
    },
    {
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'createdAt',
      title: 'Booked At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
}

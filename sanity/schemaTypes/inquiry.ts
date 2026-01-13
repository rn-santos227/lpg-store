import type { Rule } from 'sanity'


export default {
  name: 'inquiry',
  title: 'Customer Inquiry',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Sender Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'contactNumber',
      title: 'Contact Number',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Inquiry Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Responded', value: 'responded' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Website', value: 'website' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Phone', value: 'phone' },
        ],
      },
      initialValue: 'website',
    },
    {
      name: 'createdAt',
      title: 'Received At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
}

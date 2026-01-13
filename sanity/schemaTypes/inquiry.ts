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
  ],
}

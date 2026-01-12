import type { Rule } from 'sanity'

export default {
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'phone',
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
      name: 'address',
      title: 'Full Address',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
      description: 'Human-readable delivery address',
    },
    {
      name: 'location',
      title: 'Map Location',
      type: 'geopoint',
      description: 'Pin the delivery location on the map',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
}

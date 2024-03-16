import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Featured menu categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Featured Category Name',
      validation : (Rule)=> Rule.required()
    }),
    defineField({
      name: 'short_description',
      type: 'string',
      title: 'Short description',
    }),
    defineField({
      name: 'restaurants',
      type: 'array',
      of:[{type:"reference",to:[{type:"restaurant"}]}],
    }),
   
  ],
})



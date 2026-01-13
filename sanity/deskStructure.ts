import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('A4R LPG Admin')
    .items([
      S.listItem()
        .title('Operations')
        .child(
          S.list()
            .title('Operations')
            .items([
              S.listItem()
                .title('Orders')
                .schemaType('order')
                .child(
                  S.documentTypeList('order')
                    .title('Orders')
                    .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
                ),

              S.listItem()
                .title('Customer Inquiries')
                .schemaType('inquiry')
                .child(
                  S.documentTypeList('inquiry')
                    .title('Customer Inquiries')
                    .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
                ),
            ])
        ),

      S.listItem()
        .title('Inventory')
        .child(
          S.documentTypeList('inventory')
            .title('Inventory')
            .defaultOrdering([{ field: 'quantity', direction: 'asc' }])
        ),

      S.listItem()
        .title('Catalog')
        .child(
          S.list()
            .title('Catalog')
            .items([
              S.listItem()
                .title('Products')
                .schemaType('product')
                .child(S.documentTypeList('product').title('Products')),

              S.listItem()
                .title('Categories')
                .schemaType('category')
                .child(S.documentTypeList('category').title('Categories')),
            ])
        ),

      S.listItem()
        .title('Customers')
        .schemaType('customer')
        .child(
          S.documentTypeList('customer')
            .title('Customers')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),
    ])

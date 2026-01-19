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
                    .defaultOrdering([
                      { field: 'createdAt', direction: 'desc' },
                    ])
                ),

              S.listItem()
                .title('Customer Inquiries')
                .schemaType('inquiry')
                .child(
                  S.documentTypeList('inquiry')
                    .title('Customer Inquiries')
                    .defaultOrdering([
                      { field: 'createdAt', direction: 'desc' },
                    ])
                ),

              S.listItem()
                .title('Product Reviews')
                .schemaType('review')
                .child(
                  S.documentTypeList('review')
                    .title('Product Reviews')
                    .defaultOrdering([
                      { field: 'createdAt', direction: 'desc' },
                    ])
                ),
            ])
        ),

      S.listItem()
        .title('Inventory')
        .schemaType('inventory')
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
                .child(
                  S.documentTypeList('product')
                    .title('Products')
                ),

              S.listItem()
                .title('Categories')
                .schemaType('category')
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                ),

              S.listItem()
                .title('Services')
                .schemaType('service')
                .child(
                  S.documentTypeList('service')
                    .title('Services')
                ),
            ])
        ),

      S.listItem()
        .title('Promotions')
        .schemaType('promotion')
        .child(
          S.documentTypeList('promotion')
            .title('Promotions')
            .defaultOrdering([
              { field: 'priority', direction: 'desc' },
              { field: 'createdAt', direction: 'desc' },
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

      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('Contact Information')
                .schemaType('contact')
                .child(
                  S.document()
                    .schemaType('contact')
                    .documentId('contact')
                ),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('System')
        .child(
          S.list()
            .title('System')
            .items([
              S.listItem()
                .title('All Orders')
                .schemaType('order')
                .child(S.documentTypeList('order')),

              S.listItem()
                .title('All Inquiries')
                .schemaType('inquiry')
                .child(S.documentTypeList('inquiry')),

              S.listItem()
                .title('All Reviews')
                .schemaType('review')
                .child(S.documentTypeList('review')),

              S.listItem()
                .title('All Promotions')
                .schemaType('promotion')
                .child(S.documentTypeList('promotion')),
            ])
        ),
    ])

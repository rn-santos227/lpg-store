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
    ])

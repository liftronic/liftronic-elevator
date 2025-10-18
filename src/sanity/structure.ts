import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Home Page Settings
      S.listItem()
        .title('Home Page Settings')
        .child(
          S.document()
            .schemaType('homePageSettings')
            .documentId('homePageSettings')
        ),
      S.divider(),
      // Blog section
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),
      S.divider(),
      // All other document types (excluding the ones we've already listed)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'homePageSettings'].includes(item.getId()!),
      ),
    ])

# Migration

- [Migration](#migration)
  - [From version 1.x.x to 2.0.x](#from-version-1xx-to-20x) -[Deprecated API and components](#deprecated-api-and-components)

## From version 1.x.x to 2.0.x

### Deprecated API and components

With our first major release several components where reviewed in order to remove properties already marked as deprecated.

- Deprecated
  - Button
    - type replaced by category.
    - colorType replaced by category.
  - Card
    - Header
      - needsBorder (not in use).
    - Content
      - needsBorder (not in use).
    - Footer
      - actions.icon replaced by iconCallback
  - Dropdown
    - label replaced by labels.title
  - Text area
    - **inputTextConfiguration** replaced by **labels**
    - **value** replaced by **initialValue** (used just for initial values)
    - **inputValue** replaced by **value**

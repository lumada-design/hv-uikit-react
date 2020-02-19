# Migration

- [Migration](#migration)
  - [From version 1.x.x to 2.0.x](#from-version-1xx-to-20x)
    - [Deprecated API and components](#deprecated-api-and-components)

## From version 1.x.x to 2.0.x

### Deprecated API and components

With our first major release several components where reviewed in order to remove properties already marked as deprecated.

- Deprecated
  - Button
    - **type** replaced by **category**.
    - **colorType** replaced by **category**.
  - Card
    - Header
      - needsBorder (not in use).
    - Content
      - needsBorder (not in use).
    - Footer
      - actions.icon replaced by iconCallback
  - Dropdown
    - label replaced by labels.title
  - Checkbox
    - **propsIcon** replaced by **formControlLabelProps**
    - **propsLabel ** replaced by **checkboxProps**
    - **type** replaced by **category**.
    - **colorType** replaced by **category**.
  - Card
    - Header
      - **needsBorder** (not in use).
    - Content
      - **needsBorder** (not in use).
    - Footer
      - **actions.icon** replaced by **iconCallback**
  - Dropdown
    - **label** replaced by **labels.title**
  - Login
    - **titleText** replaced by **labels.titleText**
    - **recoveryTitle** replaced by **labels.recoveryTitle**
    - **messageToRecover** replaced by **labels.messageToRecover**
    - **messageAfterRecover** replaced by **labels.messageAfterRecover**
    - **recoveryInputLabel** replaced by **labels.recoveryInputLabel**
    - **recoveryPlaceholder** replaced by **labels.recoveryPlaceholder**
    - **recoveryErrorMessage** replaced by **labels.recoveryErrorMessage**
    - **userNameInputLabel** replaced by **labels.userNameInputLabel**
    - **userNamePlaceHolder** replaced by **labels.userNamePlaceHolder**
    - **passwordInputLabel** replaced by **labels.passwordInputLabel**
    - **passwordPlaceHolder** replaced by **labels.passwordPlaceHolder**
    - **rememberMeLabel** replaced by **labels.rememberMeLabel**
    - **incorrectCredentialsMessage** replaced by **labels.incorrectCredentialsMessage**
  - List
    - **values.leftIcon** replaced by **values.iconCallback**
    - Affects:
      - Dropdown Menu
      - Vertical Navigation
  - KPI
    - **kpiTextConfiguration** replaced by **labels**.
  - Radio button
    - **propsLabel** replaced by **formControlLabelProps**
    - **propsIcon** replaced by **radioProps**
  - Snackbar
    - **message** replaced by **label**
  - Input
    - **validate** replaced by **showInfo**
    - **validate** replaced by **showInfo**
    - **validate** replaced by **showInfo**
    - **validate** replaced by **showInfo**
    - **validate** replaced by **showInfo**
    - **value** replaced by **initialValue**
    - **iconVisible** replaced by **validationIconVisible**
    - **iconPosition** replaced by **validationIconPosition**
    - **inputTextConfiguration** replaced by **labels**

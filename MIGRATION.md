# Migration

- [Migration](#migration)
  - [From version 1.x.x to 2.0.x](#from-version-1xx-to-20x)
    - [Deprecated API and components](#deprecated-api-and-components)
    - [Changes](#changes)

## From version 1.x.x to 2.0.x

### Deprecated API and components

With our first major release several components where reviewed in order to remove properties already marked as deprecated.

- Button
  - **type** replaced by **category**.
  - **colorType** replaced by **category**.
- Card
  - **OnClickAction** replaced by **OnClick**
  - **defaultAriaLabel** replaced by **cardButtonProps.aria-label**
  - **defaultAriaLabelledBy** replaced by **cardButtonProps.aria-labelledby**
  - **defaultAriaDescribedBy** replaced by **cardButtonProps.aria-describedby**
  - **mediaAriaLabel** replaced by **mediaProps.aria-label**
  - **mediaAriaLabelledBy** replaced by **mediaProps.aria-labelledby**
  - **mediaAriaDescribedBy** replaced by **mediaProps.aria-describedby**
  - **checkboxSelected** replaced by **checked**
  - **checkboxValue** replaced by **checkboxProps.value**
  - **checkboxLabel** replaced by **checkboxProps.label**
  - **checkboxIndeterminate** replaced by **checkboxProps.indeterminate**
  - **checkboxAriaLabel** replaced by **checkboxProps.aria-label**
  - **checkboxAriaLabelledby** replaced by **checkboxProps.aria-labelledby**
  - **checkboxDescribedby** replaced by **checkboxProps.aria-describedby**
  - Header
    - **needsBorder** (not in use).
    - **OnClickAction** replaced by **OnClick**
  - Content
    - **needsBorder** (not in use).
    - **OnClickAction** replaced by **OnClick**
    - **InnerCardContent** replaced by **children**
  - Footer
    - **actions.icon** replaced by **iconCallback**
    - **checkboxSelected** replaced by **checked**
    - **checkboxValue** replaced by **checkboxProps.value**
    - **checkboxLabel** replaced by **checkboxProps.label**
    - **checkboxIndeterminate** replaced by **checkboxProps.indeterminate**
    - **checkboxAriaLabel** replaced by **checkboxProps.aria-label**
    - **checkboxAriaLabelledby** replaced by **checkboxProps.aria-labelledby**
    - **checkboxDescribedby** replaced by **checkboxProps.aria-describedby**
  - Media
    - **mediaTitle** replaced by **title**
    - **OnClickAction** replaced by **OnClick**
    - **mediaAriaLabel** replaced by **aria-label**
    - **mediaAriaLabelledBy** replaced by **aria-labelledby**
    - **mediaAriaDescribedBy** replaced by **aria-describedby**
- Dropdown
  - **label** replaced by **labels.title**
- Text area
  - **inputTextConfiguration** replaced by **labels**
  - **value** replaced by **initialValue** (used just for initial values)
  - **inputValue** replaced by **value**
- Checkbox
  - **propsIcon** replaced by **formControlLabelProps**
  - **propsLabel** replaced by **checkboxProps**
  - **type** replaced by **category**.
  - **colorType** replaced by **category**.
- Card
  - Header
    - **needsBorder** (not in use).
  - Content
    - **needsBorder** (not in use).
  - Footer
    - **actions.icon** replaced by **iconCallback**
- Table
  - **titleText** replaced by **labels.titleText**
  - **subtitleText** replaced by **labels.subtitleText**
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
  - **propsIcon** replaced by use of **others**
- Snackbar
  - **message** replaced by **label**
- Input
  - **validate** replaced by **showInfo**
  - **value** replaced by **initialValue**
  - **inputValue** replaced by **value**
  - **iconVisible** replaced by **validationIconVisible**
  - **iconPosition** replaced by **validationIconPosition**
  - **inputTextConfiguration** replaced by **labels**
- Toggle button
  - **selectedTitle** replaced by **labels.selectedTitle**
  - **notSelectedTitle** replaced by **labels.notSelectedTitle**

### Changes

- Packages

  - Package `@hv/uikit-common-themes` moved from the [hv-uikit-common](https://github.com/pentaho/hv-uikit-common) repository to this repository.
  - Package `@hv/uikit-common-icons` integrated in `@hv/uikit-react-icons` package. SVG files can be found in `assets/`.
  - Package `@hv/uikit-common-utils` integrated in `@hv/uikit-react-core` package, under `/dist/utils`.

- Layout
  - The greater change is our layout component (the Grid) is the definition of spacing, that now uses a 7.5px factor. For example if we passed a spacing of 2, the resulting spacing between containers is 15px.

* Icons
  - Removed all deprecated icons, now the path to use the generics should be: `@hv/uikit-react-icons/dist/<icon_name>`
  - Added the icons index to the module for allowing the ES6 import usage (destructuring).
  - Icon box dimensions are now according to Design System specifications by default.
* Input
  - Renamed `container` class to `root`.
  - Renamed `labelDisable` class to `labelDisabled`.
* Toggle Button
  - Removed display inline-table from icon
* List
  - Renamed `root` class to `list`
  - Removed `listProps` props. Instead pass props directly to the component
* Login Title
  - Renamed `logoContainer` class to `root`.
  - Renamed `root` class to `titleContainer`.
* Modal
  - Removed `iconContainer` class - use `closeButton` class instead.
* Modal Actions
  - Renamed class `action` to `spacing`.
* MultiButton
  - Removed `btnBase` and `btnSecondary` classes - use `button` class instead.
  - Renamed `rootVertical` class to `vertical`.
* Tabs
  - Css class **labelContainer** passed to the **root**
* Dropdown Menu
  - onClick callback was triggered not only on selection but also when opening the dropdown. A new specific callback **onToggleOpen** was created.
    This callback is triggered whenever the open state of the dropdown changes
* Card
  - Added class `cardContainer`
  - Removed class `upperArea`
  - Removed prop `actionItemWidth`
  - `checkboxSelected` changed to `checked`
  - `checkboxValue` added to `checkboxProps`
  - `checkboxLabel` added to `checkboxProps`
  - `checkboxIndeterminate` added to `checkboxProps`
  - `checkboxAriaLabel` added to `checkboxProps`
  - `checkboxAriaLabelledBy` added to `checkboxProps`
  - `checkboxAriaDescribedBy` added to `checkboxProps`
  - Content
    - removed `buttomBorder` class
    - `innerCardContent` replaced by `children`
    - `onClickAction` changed to `onClick`
  - Footer
    - `checkboxSelected` changed to `checked`
    - `checkboxValue` added to `checkboxProps`
    - `checkboxLabel` added to `checkboxProps`
    - `checkboxIndeterminate` added to `checkboxProps`
    - `checkboxAriaLabel` added to `checkboxProps`
    - `checkboxAriaLabelledBy` added to `checkboxProps`
    - `checkboxAriaDescribedBy` added to `checkboxProps`
  - Header
    - `onClickAction` changed to `onClick`
  - Media
    - `mediaContainer` class rename to `root`
    - `mediaAriaLabel` removed. Use `aria-label` directly
    - `mediaAriaLabelledBy` removed. Use `aria-labelledby` directly
    - `mediaAriaDescribedBy` removed. Use `aria-describedby` directly
    - `mediaTitle` changed to `title`
    - `onClickAction` changed to `onClick`
* Tooltip
  - Renamed `multitooltip` class to `tooltipMulti`.
* Provider
  - The routing was removed from the provider. The component HvLink that used the router now offers a href or a div with the onClick.
* Asset inventory
  - `searchBoxLabels` and `labels` merged into `labels`
  - List View Row
    - `checkboxSemantic` changed to `semantic`
    - `checkboxSelected` changed to `checked`
    - `checkboxValue` changed to `checkboxProps.value`
    - `checkboxIndeterminate` changed to `checkboxProps.indeterminate`
* Banner
  - Added `bannerContentProps` to pass props to the content wrapper.
* Dropdown
  - `rootActive` class rename to `rootOpen`
* KPI
  - `kpicontainer` class rename to `root`
* Pagination
  - Added `showPageProps` to pass props directly to show page component
  - Added `navigationProps` to pass props directly to the pagination component.
* Checkbox
  - removed `checkboxProps`. Instead pass props directly to the component
* Radio button
  - removed `radioProps`. Instead pass props directly to the component
* Snackbar
  - Added `snackbarContentProps` to pass props to the content wrapper.
  - Now has `offset=60` as a default, matching `HvBanner`.
* Table
  - added `allCheckBoxProps`.
  - added `dropdownMenuProps`
* Typography
  - added `root` class

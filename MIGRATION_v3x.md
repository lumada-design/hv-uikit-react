# Migration Guide

**Table of Contents**

- [Icons Changes](#icons-changes)
- [Theme](#theme)
- [Component Changes](#component-changes)
  - [Asset Inventory](#asset-inventory)
  - [Button](#button)
  - [Card](#card)
  - [Checkbox](#checkbox)
  - [Dropdown](#dropdown)
  - [Dropdown Menu](#dropdown-menu)
  - [Input](#input)
  - [KPI](#kpi)
  - [List](#list)
  - [Login](#login)
  - [Modal](#modal)
  - [Multi-Button](#multi-button)
  - [Radio Button](#radio-button)
  - [Snackbar](#snackbar)
  - [Tabs](#tabs)
  - [Table](#table)
  - [Text Area](#text-area)
  - [Toggle Button](#toggle-button)
  - [Tooltip](#tooltip)


# From v2.x to v3.x

## Icons Changes

- Removed all deprecated icons. Generic Icons were moved up a directory (to `dist/`).
- Added the icons index to the module for allowing the ES6 import usage (destructuring).

To import an icon you should use (using `Checkbox` as an example):

```diff
-import { Checkbox } from "@hv/uikit-react-icons/dist/Generic";
+import { Checkbox } from "@hv/uikit-react-icons/dist";
```

- Icon box dimensions are now according to Design System specifications by default.

##Theme

## Component Changes

With our first major release several components where reviewed in order to remove properties already marked as deprecated. The following list lists all breaking changes that you must fix.

- Component's event function props now always pass `event` as first parameter (`onClick`, `onChange`, etc.)

```diff
-<HvList onClick={(data, event)} />
+<HvList onClick={(event, data)} />
```

```diff
-<HvMultiButton onChange={(data)} />
+<HvMultiButton onChange={(event, data)} />
```

### Asset Inventory

- `searchBoxLabels` and `labels` merged into `labels`
- #### List View Row
  - `checkboxSemantic` renamed to `semantic`
  - `checkboxSelected` renamed to `checked`
  - `checkboxValue` renamed to `checkboxProps.value`
  - `checkboxIndeterminate` renamed to `checkboxProps.indeterminate`

### Button

- `type` renamed to `category`.
- `colorType` renamed to `category`.

### Card

- Removed class `upperArea`
- `onClickAction` renamed to `onClick`
- `checkboxSelected` renamed to `checked`
- Removed prop `actionItemWidth`. Use CSS to change the width if necessary

Some of Card's props that are passed down to the Card's sub-components were grouped into a single prop. This applies if a Card is not built using composition. The new group props are the following: `mediaProps`, `checkboxProps`, `cardButtonProps`

- `checkboxValue` changed to `checkboxProps.value`
- `checkboxLabel` changed to `checkboxProps.label`
- `checkboxIndeterminate` changed to `checkboxProps.indeterminate`

As for the accessibility aria-\* props, you should pass them directly to the sub-component by composition of using the grouped props:

- `mediaAriaLabel`, `mediaAriaLabelledBy`, `mediaAriaDescribedBy` removed. You should instead pass these props to `mediaProps`
- `checkboxAriaLabel`, `checkboxAriaLabelledBy`, `checkboxAriaDescribedBy` were removed. You should instead pass these props to `checkboxProps`
- `defaultAriaLabel`, `defaultAriaLabelledBy`, `defaultAriaDescribedBy` removed. You should instead pass these props to `cardButtonProps`

- #### Card Header

  - `needsBorder` removed (was not in use)
  - `onClickAction` renamed to `onClick`

- #### Card Content

  - `needsBorder` removed (was not in use)
  - `buttomBorder` class removed
  - `innerCardContent` renamed to `children`
  - `onClickAction` renamed to `onClick`

- #### Card Footer

  - `actions.icon` renamed to `actions.iconCallback`
  - `checkboxSelected` changed to `checked`
  - `checkboxValue` changed to `checkboxProps.value`
  - `checkboxLabel` changed to `checkboxProps.label`
  - `checkboxIndeterminate` changed to `checkboxProps.indeterminate`
  - `checkboxAriaLabel` changed to `checkboxProps.aria-label`
  - `checkboxAriaLabelledby` changed to `checkboxProps.aria-labelledby`
  - `checkboxDescribedby` changed to `checkboxProps.aria-describedby`

- #### Card Media
  - `mediaTitle` renamed to `title`
  - `mediaContainer` class rename to `root`
  - `mediaAriaLabel` removed. Pass `aria-label` directly
  - `mediaAriaLabelledBy` removed. Pass `aria-labelledby` directly
  - `mediaAriaDescribedBy` removed. Pass `aria-describedby` directly
  - `mediaTitle` renamed to `title`
  - `onClickAction` renamed to `onClick`

### Checkbox

- `type` renamed to `category`.
- `colorType` renamed to `category`.
- `propsIcon` renamed to `formControlLabelProps`
- Removed `checkboxProps` and `propsLabel`. These are now directly passed to the Checkbox

### Dropdown

- `label` changed to `labels.title`
- `rootActive` class renamed to `rootOpen`

### Dropdown Menu

- `onClick` callback was triggered not only on selection but also when opening the dropdown. A new specific callback `onToggleOpen` was created. This callback is triggered whenever the open state of the dropdown changes

### Input

- `validate` renamed to `showInfo`
- `value` renamed to `initialValue`
- `inputValue` renamed to `value`
- `iconVisible` renamed to `validationIconVisible`
- `iconPosition` renamed to `validationIconPosition`
- `inputTextConfiguration` replaced by `labels`
- `container` class renamed to `root`.
- `labelDisable` class renamed to `labelDisabled`.

### KPI

- `kpiContainer` class renamed to `root`
- `kpiTextConfiguration` renamed to `labels`.

### List

- Renamed `root` class to `list`
- Removed `listProps` props. Instead pass props directly to the component
- `values.leftIcon` replaced by `values.iconCallback`
- These changes should also propagated to the `DropDropMenu` and `VerticalNavigation` components

### Login

- `titleText` changed to `labels.titleText`
- `recoveryTitle` changed to `labels.recoveryTitle`
- `messageToRecover` changed to `labels.messageToRecover`
- `messageAfterRecover` changed to `labels.messageAfterRecover`
- `recoveryInputLabel` changed to `labels.recoveryInputLabel`
- `recoveryPlaceholder` changed to `labels.recoveryPlaceholder`
- `recoveryErrorMessage` changed to `labels.recoveryErrorMessage`
- `userNameInputLabel` changed to `labels.userNameInputLabel`
- `userNamePlaceHolder` changed to `labels.userNamePlaceHolder`
- `passwordInputLabel` changed to `labels.passwordInputLabel`
- `passwordPlaceHolder` changed to `labels.passwordPlaceHolder`
- `rememberMeLabel` changed to `labels.rememberMeLabel`
- `incorrectCredentialsMessage` changed to `labels.incorrectCredentialsMessage`
- #### Login Title
  - Renamed `logoContainer` class to `root`.
  - Renamed `root` class to `titleContainer`.

### Modal

- Removed `iconContainer` class - use `closeButton` class instead.
- #### Modal Actions
  - Renamed class `action` to `spacing`.

### Multi-Button

- Removed `btnBase` and `btnSecondary` classes - use `button` class instead.
- Renamed `rootVertical` class to `vertical`.

### Radio Button

- `propsLabel` renamed to `formControlLabelProps`
- Removed `radioProps` and `propsIcon`. Instead pass props directly to the component

### Snackbar

- `message` renamed to `label`
- Now has `offset=60` as a default, matching `HvBanner`.

### Tabs

- Css class `labelContainer` passed to the `root`

### Table

- `titleText` changed to `labels.titleText`
- `subtitleText` changed to `labels.subtitleText`

### Text Area

- `inputTextConfiguration` replaced by `labels`
- `value` renamed to `initialValue` (used just for initial values)
- `inputValue` renamed to `value`

### Toggle Button

- `selectedTitle` changed to `labels.selectedTitle`
- `notSelectedTitle` changed to `labels.notSelectedTitle`
- Removed display inline-table from icon

### Tooltip

- Renamed `multitooltip` class to `tooltipMulti`.
- `tooltipAnchor` removes, now uses composition.

# Migration Guide

**Table of Contents**

- [Icons](#icons)
- [Theme](#theme)
  - [Typography](#typography)
- [Components](#components)
- [Templates](#templates)

# From v2.x to v3.x

## Icons

- `UpXS` renamed to `DropUpXS`
- `AppleLogo` renamed to `AppleLogoFilled`
- `LocatinTarget` renamed to `LocationTarget`
- `ShowMargins` renamed to `MarginsOn`
- `WindowsLogo` renamed to `WindowsLogoFilled`

## Theme

### Typography

- `selected-text` removed, the responsibility should lie on CSS of the component.
- `inline-link` renamed to `link`
- `disabled-label-text` renamed to `disabled-text`
- `disabled-button-text` renamed to `disabled-text`
- `label-text` renamed to `highlight-text`
- `info-text` renamed to `normal-text`
- `s-link` renamed to `xs-inline-link`
- `s-text` renamed to `normal-text`

## Components

### Asset Inventory

The view icons must now be passed to the `multibuttonProps` prop, via the `icon` key instead of the views (`CardView`/`ListView`).

The `selectedView` prop now receives the **index** of the view, instead of the `id` of the MultiButton button passed in `multibuttonProps`. As so, the `id` key is no longer strictly necessary.

- `iconCallback` renamed to `icon`. You can now pass a React element directly, as well as the callback.

```diff
<HvAssetInventory
-  multibuttonProps={[{id: "cardV"}, {id: "listV"}]}
-  selectedView="cardV"
+  multibuttonProps={[{icon: <Cards />}, {icon: <List />}]}
+  selectedView={0}
>
-  <HvCardView icon={<Cards />} />
-  <HvListView icon={<List />} />
+  <HvCardView />
+  <HvListView />
</HvAssetInventory>
```

The `emptyComponent` prop present in the `CardView`/`ListView` should be used in the `AssetInventory` instead.

```diff
<HvAssetInventory
+  emptyComponent={<EmptyState />}
>
-  <HvCardView emptyComponent={<EmptyState />} />
-  <HvListView emptyComponent={<EmptyState />} />
+  <HvCardView />
+  <HvListView />
</HvAssetInventory>
```

#### CardView

- `icon` removed, pass it to `multibuttonProps` as described above.

#### ListView

- `icon` removed, pass it to `multibuttonProps` as described above.

### Badge

- `count` is not longer required, and will be ignored if `label` is defined.

### Bulk Actions

- `labels` removed. Use `selectAllLabel`, `selectAllPagesLabel` props instead.

### Button

The icon `category` (`category="icon"`) was promoted to a prop, so its possible to use icon Buttons with a category other than ghost (still defaults to ghost).

```diff
<HvButton
-  category="icon"
+  icon
+  category="ghost" // or any other category
>
  Button
</HvButton>
```

- `rootIcon` class renamed to `icon`.

### Card

`HvCard` must now be built using `children` composition, and as so, all the "hoisted" props from `HvCard`'s sub-components were removed.

We recommend you build it using `HvCardHeader`, `HvCardContent` and `HvCardMedia`, although it's not necessary.
`HvCardFooter` was removed, and we recommend you replace it with `HvActionBar`.

It's internal selection control was also removed, and you can control selection using the `selectable`, `selected`.

- `isSelectable` renamed to `selectable`.
- `checked` renamed to `selected`, and is no longed tied to a selection checkbox.

- `cardButtonProps` removed.
- `checkboxProps` removed.
- `footerProps` removed, build the card with `HvActionBar`.
- `contentProps` removed, pass these props directly to `HvCardContent`.

- `innerCardContent` removed, pass `children` instead.
- `noHeader` removed.
- `noFooter` removed.
- `selectOnClickAction` removed.

#### Card Header

- `headerTitle` removed, pass `title` to `HvCardHeader` instead.
- `subheader` removed, pass `subheader` to `HvCardHeader` instead.
- `headerProps` removed, pass these props directly to `HvCardHeader`.

```diff
<HvCard
-  headerTitle="Title"
-  subheader="subtitle"
>
+  <HvCardHeader title="Title" subheader="subtitle" />
</HvCard>
```

#### Card Footer

This component has been removed.

You can use `HvActionsGeneric` to obtain a similar container, and `HvActionsGeneric` for the same actions API.
The props `actions`, `actionsCallback`, `maxVisibleActions`, `actionsAlignment` "hoisted" from `HvActionsGeneric` were removed from `HvCard`.

```diff
<HvCard
-  actions=[]
-  actionsCallback={() => {}}
-  maxVisibleActions={1}
-  actionsAlignment="left"
>
+  <HvActionBar>
+    <HvActionsGeneric
+      actions=[]
+      actionsCallback={() => {}}
+      maxVisibleActions={1}
+      actionsAlignment="left"
+    />
+  </HvActionBar>
</HvCard>
```

#### Card Media

- `mediaPath` removed, pass `image` to `HvCardMedia`
- `mediaTitle` removed, pass `title` to `HvCardMedia`
- `mediaHeight` removed, pass `height` to `HvCardMedia`
- `mediaProps` removed, pass these props directly to `HvCardMedia`.

#### Card Content

- `innerCardContent` removed.
- `needsBorder` removed.
- `onClickAction` removed.

### DatePicker

This component now only accepts `Date` objects. `Date` internally uses time values in UTC, but the basic methods to fetch the date and time or its components all work in the local time zone and offset. When generating dates, remember that parsing strings is strongly discouraged due to browser differences and inconsistencies. Note: `new Date("YYYY-MM-DD")` does not produce the same time value as `new Date("MM/DD/YYYY")` when the local time zone is not UTC.

- `value`, `startValue`, and `endValue` changed from date `string` to `Date` object

```diff
<HvDatePicker
-  value="2020-10-18"
+  value={new Date(2020, 9, 18)}
/>
```

### Dropdown

The following `classes` were removed:

```
header
headerDisabled
icon
list
rootDisabled
rootOpen
selection
```

The `selectDefault` prop was removed

### DropDownMenu

The following `classes` were removed:

```
inputExtensionFloatLeft
inputExtensionFloatRight
inputExtensionLeftPosition
inputExtensionOpen
inputExtensionOpenShadow
menuList
popper
```

### FormElement

- `HelperText` removed.

### Input

- `infoIcon` removed.
- `infoIcon` and `infoIconContainer` classes removed.

### KPI

Component was removed. Construct KPIs using the `HvCard` component

### List

We encourage the use of the `HvListContainer` component to achieve the use cases covered
by the list.
Use cases related with selections like a list with checkbox, radio-buttons
please check the `HvRadioGroup` and/or `HvCheckBoxGroup`

The following `classes` were removed:

```
condensed
disabled
focus
label
labelIconLeftPadding
link
list
listItem
noIconLeftPadding
selectAll
selected
selector
textDisabled
```

The `selectDefault` prop was removed

### Loading

Loading is now visible by default. To hide it, use `hidden` prop.
Removed option to pass `children` and use component as a wrapper "HOC". We still provide a sample of an `HvLoading` wrapping a component.

- `text` renamed to `label`
- `isActive` renamed to `hidden`, and is not visible by default (`hidden=false`)
- `loadingText` class renamed to `label` (`classes.label`)

### Login

Component was replaced for `HvLoginContainer`.

### LoginContainer

Component was renamed to `HvLogin`.

- `customBackground` renamed to `background`.

### Multi-Button

The Multi-Button is now built through composition and offers no control.

```diff
<HvMultiButton
-  buttons={[
-    { id: "map", value: "Map", icon: <Map />, selected: true },
-    { id: "location", value: "Location", icon: <LocationPin /> }
-  ]}
>
+  <HvButton icon selected>
+    <Map />
+  </HvButton>
+  <HvButton icon>
+    <LocationPin />
+  </HvButton>
</HvMultiButton>
```

### Pagination

- `selectDownIcon` class removed.

### Searchbox

- `ariaLabel` removed, you can pass `aria-*` props directly to the component.

```diff
<HvSearchbox
-  ariaLabel="label"
+  aria-label="label"
/>
```

### Selectors

- _TODO Checkbox/Radio/Switch/ToggleButton_

### TextArea

- `startCount` removed.
- `endCount` removed.

### ToggleButton

- no longer adds a tooltip, which means it needs to be configured externally through composition. Example added to explain how to do it
- built using the Button, instead using a custom button

### Tooltip

- `tooltipData` renamed to `title`.

## Templates

The template section has been removed, as we considered that the [Adoption project](https://github.com/lumada-design/hv-uikit-adoption) does a better job of showing how to use the UI Kit project.

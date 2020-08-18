# Migration Guide

**Table of Contents**

- [Icons](#icons)
- [Theme](#theme)
  - [Typography](#typography)
- [Components](#components)

# From v2.x to v3.x

## Icons

**Changes**

- `UpXS` changed to `DropUpXS`
- `AppleLogo` changed to `AppleLogoFilled`
- `LocatinTarget` changed to `LocationTarget`
- `ShowMargins` changed to `MarginsOn`
- `WindowsLogo` changed to `WindowsLogoFilled`

## Theme

### Typography

**Added**

- `section-title`

**Removed**

- `selected-text` - the responsibility should lie on CSS of the component.

**Changes**

- `inline-link` changed to `link`
- `disabled-label-text` changed to `disabled-text`
- `disabled-button-text` changed to `disabled-text`
- `label-text` changed to `highlight-text`
- `info-text` changed to `normal-text`
- `s-link` changed to `xs-inline-link`
- `s-text` changed to `normal-text`

## Components

### Input

- `showInfoIcon` removed.

### FormElement

- `HelperText` removed.

### Pagination

- `pageSizeInputRoot` class removed.

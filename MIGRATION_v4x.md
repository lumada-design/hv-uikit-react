# Migration Guide

**Table of Contents**

- [MUI 5 Migration](#mui-5-migration)
- [Packages Changes](#packages-changes)
  - [Visualizations package](#visualizations-package)
  - [Compatibility package](#compatibility-package)
- [Components](#components)
- [What's next?](#whats-next)

# From v3 to v4

Having reached a point of stability and maturity we have approached v4 mostly as a **technical release**, with a focus on cleanup and organization in order to **unlock the next stage of growth** (streamline the adoption of new versions of the Design System and improve the customization experience).

## MUI 5 Migration

We have been following [MUI](https://mui.com/) for a long time and using many of the solutions provided since day one. Our approach has always been to use what we find value and unlock the remaining features for our users. Following the same spirit we decided that it was important to upgrade to the latest MUI v5.

- **Styling Solution** - This is our biggest coupling point with MUI today since we are leveraging entirely their [JSS styling system](https://mui.com/system/styles/basics/). For many reasons MUI 5 moved from [JSS to emotion](https://mui.com/blog/mui-core-v5/#migration-from-jss-to-emotion), but since we could keep using JSS, we thought it would be a perfect compromise for now, since it gives us the necessary time to do our own evaluation.

### Update MUI packages

Install the Material UI v5 packages.

```
npm install @mui/material @mui/styles
```

### Peer dependencies

Next, add the Emotion packages.

```
npm install @emotion/react @emotion/styled
```

### Replace all imports

With the release of v5, the names of all related packages were changed from @material-ui/_ to @mui/_.

```diff
-  import { makeStyle, withStyles, withTheme } from "@material-ui/core"
+  import { makeStyle, withStyles, withTheme } from "@mui/styles"

- import { MaterialComponents, MaterialProps } from "@material-ui/core";
+ import { MaterialComponents, MaterialProps } from "@mui/material";
```

### Remove old packages

Once you've installed all the necessary packages and ensured that your app still runs, you can safely remove the old `@material-ui/*` packages by running `npm uninstall @material-ui/*`.

## Packages organization

There were some known issues with our packages, mainly because we were promoting too much coupling and enforcing our users to install unneeded dependencies.

### Visualizations package

We created this package in order to remove the Plotly.js dependency from the core package. This was introduced early on as a known breaking change, since the benefits were considered to be superior than the possible drawbacks of going against our standard release process.

To use the visualizations you need to:

### Install the new package.

```
npm install @hitachivantara/hv-uikit-viz
```

### Replace all imports

```diff
-  import { HvBarchart ... } from "@hitachivantara/uikit-react-core"
+  import { HvBarchart ... } from "@hitachivantara/uikit-react-viz"
```

### Compatibility package

There were some widely used components that were deprecated in favor of different approaches (Asset Inventory) or newer versions (Table).
We knew that this could have a big impact on our users and delay possible upgrades. In order to streamline the process we created this package to transitively support the usage of these components:

To keep using the deprecated `Asset Inventory` and `Table` components you need to:

### Install the new package.

```
npm install @hitachivantara/hv-uikit-compat
```

### Replace all imports

```diff
-  import { HvAssetInventory, HvTable } from "@hitachivantara/uikit-react-core"
+  import { HvAssetInventory, HvTable } from "@hitachivantara/uikit-react-compat"
```

## Components

Aligned with our stability strategy, there were no major breaking changes introduced to our components API. We finished the alignment with DS 3.6 and did some cleanup ir order to **remove deprecated** components and **promoted** some of the lab components to core.

### API breaking changes:

### Provider

- `injectStylesFirst` prop was removed.
- `disableCssBaseline` prop was replaced by `cssBaseline`.

### cssBaseline

The UI Kit components require a baseline of CSS styles to function properly. By default the baseline styles are applied globally to the application.  
If you need to scope the CSS to avoid styling conflicts, you can set this prop to `scoped`.

```
<HvProvider cssBaseline="scoped">
  {/* The rest of your application */}
</HvProvider>
```

If you are providing the baseline styles, you can set this prop to `false`.

Check [CSS Baseline](http://localhost:9001/?path=/docs/theme-css-baseline--page) for more information.

### Promoted components (lab > core):

- Controls
- Dot Pagination
- Progressbar
- Query Builder
- Table (column renderers, hooks)
- Time Picker

Please do the necessary imports updates:

```diff
-  import { HvControls  ... } from "@hitachivantara/uikit-react-lab"
+  import { HvControls ... } from "@hitachivantara/uikit-react-core"
```

### Removed components:

These components were mainly removed in favor of existent `core` versions or due to different approaches promoted `Asset Inventory`.

- `core`
  - Asset Inventory (moved to compat package)
  - Table (moved to compat package)
- `lab`
  - App Switcher Panel (core version exists)
  - Slider (core version exists)
  - Tag (core version exists)
  - Form Composer

## What's next?

- **Upgrade to Next Design System:** In our continuous effort to keep the UI Kit library closely following the latest Design System Guidelines, we will upgrade all components to the Design System v5 and try to streamline the adoption of future versions​.

- **White Labeling:** This is a major topic for us and we'll improve the customization experience and allow the UI Kit components to be easier customized.

- **Typescript:** Right now the typescript definitions the UI Kit library provides are manually authored. In the future we're moving to fully integrate Typescript in the library.
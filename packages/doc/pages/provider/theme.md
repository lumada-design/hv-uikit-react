# Theming

All UI-kit components are required to be theme-able by default, so they must receive the description of the theme as a prop.
this theme value is a material-ui-like object that contains the definition of the various colors and spaces defined by design system.
To Achieve this UI-kit is using a wrapper of material-ui theme provider called HvProvider

```jsx
<HvProvider>
    <MyCustomComponent>
<HvProvider/>
```
every component or subcomponent enclosed by the HvProvider will be injected with a prop called theme that contains the theme object were the various values are described.

by default the provided theme is the dawn theme whoever this can be overriden by changing the HvProvider theme prop to point to another theme

```jsx
<HvProvider theme={mycustomTheme}>
    <MyCustomComponent>
<HvProvider/>
```
The HvProvider must be present in every app to be able to style correctly the ui-kit components, generally the HvProvider is placed at the root level of the apps as to enclose every component.


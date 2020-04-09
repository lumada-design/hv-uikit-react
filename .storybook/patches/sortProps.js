// patched version of https://github.com/storybookjs/storybook/blob/next/addons/docs/src/frameworks/react/propTypes/sortProps.ts
// because our components are almost all wrapped using withStyles and that caused it to fail

// making this noop, as we are reordering the props in our own extractProps
export function keepOriginalDefinitionOrder(extractedProps, component) {
  return extractedProps;
}

import type { Theme } from "@mui/material/styles";

// makeStyles is now exported from @mui/styles package which does not know about Theme
// we need to augment the DefaultTheme (empty object) in @mui/styles with Theme from the core.
declare module "@mui/private-theming" {
  interface DefaultTheme extends Theme {}
}

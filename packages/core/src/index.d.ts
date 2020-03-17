export { default as HvBadge } from "./Badge";
export * from "./Badge";

export { default as HvBanner } from "./Banner";
export * from "./Banner";

export { default as HvBarchart } from "./Barchart";
export * from "./Barchart";

export { default as HvBreadCrumb } from "./BreadCrumb";
export * from "./BreadCrumb";

export { default as HvButton } from "./Button";
export * from "./Button";

export { default as HvDatePicker } from "./DatePicker";
export * from "./DatePicker";

export { default as HvDropdown } from "./Dropdown";
export * from "./Dropdown";

export { default as HvDropDownMenu } from "./DropDownMenu";
export * from "./DropDownMenu";

export { default as HvEmptyState } from "./EmptyState";
export * from "./EmptyState";

export { default as HvGrid } from "./Grid";
export * from "./Grid";

export { default as HvHeader } from "./Header";
export * from "./Header";

export { default as HvInput } from "./Input";
export * from "./Input";

export { default as HvSearchBox } from "./SearchBox";
export * from "./SearchBox";

export { default as HvKpi } from "./Kpi";
export * from "./Kpi";

export { default as HvLinechart } from "./Linechart";
export * from "./Linechart";

export { default as HvLink } from "./Link";
export * from "./Link";

export { default as HvList } from "./List";
export * from "./List";

export { default as HvMultiButton } from "./MultiButton";
export * from "./MultiButton";

export { default as HvPagination } from "./Pagination";
export * from "./Pagination";

export { default as HvCheckBox } from "./Selectors/CheckBox";
export * from "./Selectors/CheckBox";

export { default as HvRadio } from "./Selectors/RadioButton";
export * from "./Selectors/RadioButton";

export { default as HvSnackbar } from "./Snackbar";
export * from "./Snackbar";

export { default as HvSwitch } from "./Switch";
export * from "./Switch";

export { default as HvTab } from "./Tab";
export * from "./Tab";

export { default as HvTable } from "./Table";
export * from "./Table";

export { default as HvTabs } from "./Tabs";
export * from "./Tabs";

export { default as HvTextArea } from "./TextArea";
export * from "./TextArea";

export { default as HvToggleButton } from "./ToggleButton";
export * from "./ToggleButton";

export { default as HvTypography } from "./Typography";
export * from "./Typography";

export { default as HvProvider } from "./Provider";
export * from "./Provider";

export interface HvTheme {
  type: string;
  name: string;
  palette: HvThemePalette;
  typography: HvThemeTypography;
  spacing: HvThemeSpacing;
  viz: HvThemeVizPalette;
}

export interface HvThemePalette {
  accent: HvAccentColors;
  atmosphere: HvAtmosphereColors;
  base: HvBaseColors;
  semantic: HvSemanticColors;
  support: HvSupportColors;
}

interface HvAccentColors extends Map<string, string> {}

interface HvAtmosphereColors extends Map<string, string> {}

interface HvBaseColors extends Map<string, string> {}

interface HvSemanticColors extends Map<string, string> {}

interface HvSupportColors extends Map<string, string> {}

interface HvThemeTypography extends Map<string, HvThemeTypographyDefinition> {
  fontFamily: string;
}

interface HvThemeTypographyDefinition {
  color: string;
  fontSize: string;
  letterSpacing: string;
  lineHeight: string;
  fontWeight: string;
}

interface HvThemeSpacing extends Map<string, number> {}

interface HvThemeVizPalette {
  palette: {
    categorical: Map<string, string>;
    undefinedState: Map<string, string>;
    sequential: Map<string, string>;
    polarizes: Map<string, string>;
  };
}

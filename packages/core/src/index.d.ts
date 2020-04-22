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

export { default as HvCard } from "./Card";
export * from "./Card";

export { default as HvContainer } from "./Container";
export * from "./Container";

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

export { default as HvFileUploader } from "./FileUploader"
export * from "./FileUploader";

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

export { default as HvLogin } from "./Login";
export * from "./Login";

export { default as HvModal } from "./Modal";
export * from "./Modal";

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

export { default as HvTooltip } from "./Tooltip";
export * from "./Tooltip";

export { default as HvTypography } from "./Typography";
export * from "./Typography";

export { default as HvVerticalNavigation } from "./VerticalNavigation";
export * from "./VerticalNavigation";

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

export type HvAccentColorKeys = "acce0" | "acce1" | "acce2" | "acce2h" | "acce3";
export type HvAtmosphereColorKeys =
  | "atmo1"
  | "atmo2"
  | "atmo3"
  | "atmo4"
  | "atmo5"
  | "atmo6"
  | "atmo7";
export type HvBaseColorKeys = "base1" | "base2";
export type HvSemanticColorKeys =
  | "sema1"
  | "sema2"
  | "sema3"
  | "sema4"
  | "sema5"
  | "sema6"
  | "sema7"
  | "sema8"
  | "sema9"
  | "sema10"
  | "sema11"
  | "sema12"
  | "sema13"
  | "sema14"
  | "sema15"
  | "sema16"
  | "sema17"
  | "sema18"
  | "sema19";

interface HvAccentColors extends Map<HvAccentColorKeys, string> {}

interface HvAtmosphereColors extends Map<HvAtmosphereColorKeys, string> {}

interface HvBaseColors extends Map<HvBaseColorKeys, string> {}

interface HvSemanticColors extends Map<HvSemanticColorKeys, string> {}

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

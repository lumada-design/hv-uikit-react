export { default as HvAccordion } from "./Accordion";
export * from "./Accordion";

export { default as HvActionBar } from "./ActionBar";
export * from "./ActionBar";

export { default as HvActionsGeneric } from "./ActionsGeneric";
export * from "./ActionsGeneric";

export { default as HvAssetInventory } from "./AssetInventory";
export * from "./AssetInventory";

export { default as HvAvatar } from "./Avatar";
export * from "./Avatar";

export { default as HvBadge } from "./Badge";
export * from "./Badge";

export { default as HvBanner } from "./Banner";
export * from "./Banner";

export { default as HvBarchart } from "./Barchart";
export * from "./Barchart";

export { default as HvBreadCrumb } from "./BreadCrumb";
export * from "./BreadCrumb";

export { default as HvBulkActions } from "./BulkActions";
export * from "./BulkActions";

export { default as HvButton } from "./Button";
export * from "./Button";

export { default as HvCard } from "./Card";
export * from "./Card";

export * from "./Calendar";

export { default as HvContainer } from "./Container";
export * from "./Container";

export { default as HvDatePicker } from "./DatePicker";
export * from "./DatePicker";

export { default as HvDonutchart } from "./Donutchart";
export * from "./Donutchart";

export { default as HvDropdown } from "./Dropdown";
export * from "./Dropdown";

export { default as HvBaseDropdown } from "./BaseDropdown";
export * from "./BaseDropdown";

export { default as HvDropDownMenu } from "./DropDownMenu";
export * from "./DropDownMenu";

export { default as HvEmptyState } from "./EmptyState";
export * from "./EmptyState";

export { default as HvFileUploader } from "./FileUploader";
export * from "./FileUploader";

export { default as HvFilterGroup } from "./FilterGroup";

export { default as HvFooter } from "./Footer";
export * from "./Footer";

export { default as HvGrid } from "./Grid";
export * from "./Grid";

export { default as HvGlobalActions } from "./GlobalActions";
export * from "./GlobalActions";

export { default as HvHeader } from "./Header";
export * from "./Header";

export { default as HvBaseInput } from "./BaseInput";
export * from "./BaseInput";

export { default as HvInput } from "./Input";
export * from "./Input";

export * from "./Forms";

export { default as HvLabel } from "./Forms/Label";
export * from "./Forms/Label";

export { default as HvKpi } from "./Kpi";
export * from "./Kpi";

export { default as HvLinechart } from "./Linechart";
export * from "./Linechart";

export { default as HvLink } from "./Link";
export * from "./Link";

export { default as HvList } from "./List";
export * from "./List";

export { default as HvListContainer } from "./ListContainer";
export * from "./ListContainer";

export { default as HvLoading } from "./Loading";
export * from "./Loading";

export { default as HvLogin } from "./Login";
export * from "./Login";

export { default as HvDialog } from "./Dialog";
export * from "./Dialog";

export { default as HvMultiButton } from "./MultiButton";
export * from "./MultiButton";

export { default as HvPagination } from "./Pagination";
export * from "./Pagination";

export { default as HvPanel } from "./Panel";
export * from "./Panel";

export { default as HvProvider } from "./Provider";
export * from "./Provider";

export { default as HvBaseCheckBox } from "./BaseCheckBox";
export * from "./BaseCheckBox";

export { default as HvCheckBox } from "./CheckBox";
export * from "./CheckBox";

export { default as HvCheckBoxGroup } from "./CheckBoxGroup";
export * from "./CheckBoxGroup";

export { default as HvBaseRadio } from "./BaseRadio";
export * from "./BaseRadio";

export { default as HvRadio } from "./Radio";
export * from "./Radio";

export { default as HvRadioGroup } from "./RadioGroup";
export * from "./RadioGroup";

export { default as HvBaseSwitch } from "./BaseSwitch";
export * from "./BaseSwitch";

export { default as HvSwitch } from "./Switch";
export * from "./Switch";

export { default as HvSnackbar } from "./Snackbar";
export * from "./Snackbar";

export { default as HvTab } from "./Tab";
export * from "./Tab";

export { default as HvTag } from "./Tag";
export * from "./Tag";

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

export { default as HvUserPreferences } from "./UserPreferences";
// TODO refactor the HvUserPreferences subcomponents' names
export {
  Actions as HvUserPreferencesActions,
  Action as HvUserPreferencesAction,
} from "./UserPreferences";
export {
  Options as HvUserPreferencesOptions,
  Option as HvUserPreferencesOption,
  Group as HvUserPreferencesOptionsGroup,
  Label as HvUserPreferencesOptionsGroupLabel,
} from "./UserPreferences";

export { default as HvVerticalNavigation } from "./VerticalNavigation";
// TODO refactor the HvVerticalNavigation subcomponents' names
export {
  Navigation as HvVerticalNavigationTree,
  NavigationData as HvVerticalNavigationTreeItem,
} from "./VerticalNavigation";
export { TreeView as HvTreeView, TreeViewItem as HvTreeViewItem } from "./VerticalNavigation";
export {
  Actions as HvVerticalNavigationActions,
  Action as HvVerticalNavigationAction,
} from "./VerticalNavigation";

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
export type HvSupportColorKeys = "supp1" | "supp2" | "supp3" | "supp4" | "supp5";
export type HvUndefinedStateColorKeys = "atmo4";
export type HvCategoricalColorKeys =
  | "cviz1"
  | "cviz2"
  | "cviz3"
  | "cviz4"
  | "cviz5"
  | "cviz6"
  | "cviz7"
  | "cviz8"
  | "cviz9"
  | "cviz10"
  | "cviz11"
  | "cviz12"
  | "cviz13"
  | "cviz14"
  | "cviz15"
  | "cviz16"
  | "cviz17"
  | "cviz18"
  | "cviz19"
  | "cviz20";
export type HvSequentialColorKeys =
  | "cviz1"
  | "cviz1_100"
  | "cviz1_200"
  | "cviz1_300"
  | "cviz1_400"
  | "cviz1_500"
  | "cviz1_600"
  | "cviz1_700"
  | "cviz1_800"
  | "cviz1_900";
export type HvPolarizedColorKeys =
  | "sema1"
  | "cviz21"
  | "cviz22"
  | "cviz23"
  | "cviz24"
  | "cviz25"
  | "cviz26"
  | "cviz27"
  | "cviz28"
  | "sema5";

export type HvAccentColors = Record<HvAccentColorKeys, string>;

export type HvAtmosphereColors = Record<HvAtmosphereColorKeys, string>;

export type HvBaseColors = Record<HvBaseColorKeys, string>;

export type HvSemanticColors = Record<HvSemanticColorKeys, string>;

export type HvSupportColors = Record<HvSupportColorKeys, string>;

export interface HvThemeTypographyDefinition {
  color: string;
  fontSize: string;
  letterSpacing: string;
  lineHeight: string;
  fontWeight: number;
}

export type HvSpacingKeys = "xs" | "sm" | "md" | "lg" | "xl";

export type HvThemeSpacing = Record<HvSpacingKeys, string>;

export interface HvThemeVizPalette {
  palette: {
    categorical: Record<HvCategoricalColorKeys, string>;
    undefinedState: Record<HvUndefinedStateColorKeys, string>;
    sequential: Record<HvSequentialColorKeys, string>;
    polarized: Record<HvPolarizedColorKeys, string>;
  };
}

export interface HvThemePalette {
  accent: HvAccentColors;
  atmosphere: HvAtmosphereColors;
  base: HvBaseColors;
  semantic: HvSemanticColors;
  support: HvSupportColors;
}

export type HvTypographyKeys =
  | "5xlTitle"
  | "4xlTitle"
  | "3xlTitle"
  | "xxlTitle"
  | "xlTitle"
  | "lTitle"
  | "mTitle"
  | "sTitle"
  | "xsTitle"
  | "xxsTitle"
  | "sectionTitle"
  | "highlightText"
  | "normalText"
  | "placeholderText"
  | "link"
  | "disabledText"
  | "selectedNavText"
  | "vizText"
  | "vizTextDisabled"
  | "xsInlineLink";

export type HvThemeTypography = Record<HvTypographyKeys, HvThemeTypographyDefinition> & {
  fontFamily: string;
};

export interface HvTheme {
  type: string;
  name: string;
  palette: HvThemePalette;
  typography: HvThemeTypography;
  spacing: HvThemeSpacing;
  viz: HvThemeVizPalette;
}

import { DeepString } from "./common";

/**
 * Optional UI Kit component-level theming configuration.
 */
export type HvThemeComponentsProps<ComponentNames extends string = string> = {
  /** Component-specific overrides for props or tokens. */
  components?: Record<ComponentNames, Record<string, any>>;
  /** Custom icon overrides. Keyed by icon name; includes a global `viewBox`. */
  icons?: Record<string, string> & { viewBox?: string };
};

/**
 * Theme structure for UI components.
 * Serves as a design contract for component token consumption.
 */
export type HvThemeComponents = {
  header: {
    height: string;
    secondLevelHeight: string;
  };
  form: {
    errorColor: string;
  };
  bulkActions: {
    actionButtonVariant: string;
  };
  /** @deprecated This is no longer used and will be removed in a future version.*/
  table: {
    rowStripedBackgroundColorEven: string;
    rowStripedBackgroundColorOdd: string;
    rowExpandBackgroundColor: string;
    rowSortedColor: string;
    rowSortedColorAlpha: string;
  };
  stepNavigation: {
    separatorMargin: string;
    defaultSeparatorHeight: number;
    simpleSeparatorHeight: number;
  };
  filterGroup: {
    applyButtonVariant: string;
    cancelButtonVariant: string;
  };
  scrollTo: {
    dotSelectedSize: number;
    backgroundColorOpacity: number;
  };
  colorPicker: {
    hueDirection: "vertical" | "horizontal";
  };
  snackbar: {
    actionButtonVariant: string;
  };
};

/**
 *
 * Deep stringified structure of `HvThemeComponents`.
 * Useful for validation, introspection, or schema generation.
 */
export const componentsSpec: DeepString<HvThemeComponents> = {
  header: {
    height: "string",
    secondLevelHeight: "string",
  },
  form: {
    errorColor: "string",
  },
  bulkActions: {
    actionButtonVariant: "string",
  },
  table: {
    rowStripedBackgroundColorEven: "string",
    rowStripedBackgroundColorOdd: "string",
    rowExpandBackgroundColor: "string",
    rowSortedColor: "string",
    rowSortedColorAlpha: "string",
  },
  stepNavigation: {
    separatorMargin: "string",
    defaultSeparatorHeight: "string",
    simpleSeparatorHeight: "string",
  },
  filterGroup: {
    applyButtonVariant: "string",
    cancelButtonVariant: "string",
  },
  scrollTo: {
    dotSelectedSize: "string",
    backgroundColorOpacity: "string",
  },
  colorPicker: {
    hueDirection: "string",
  },
  snackbar: {
    actionButtonVariant: "string",
  },
};

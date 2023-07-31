export type HvFilterGroupFilters = {
  id: string;
  name: string;
  data: {
    id: string | number;
    name: string;
  }[];
}[];

export type HvFilterGroupValue = (string | number)[][];

export interface HvFilterGroupLabels {
  /** Apply button label. */
  applyLabel?: string;
  /** Cancel button label. */
  cancelLabel?: string;
  /** Cancel button label. */
  clearLabel?: string;
  /** Placeholder label. */
  placeholder?: string;
  /** SearchBox placeholder label. */
  searchBoxPlaceholder?: string;
  /** Select All placeholder label. */
  selectAll?: string;
  /** Multi selection conjunction placeholder label. */
  multiSelectionConjunction?: string;
}

export type HvFilterGroupHorizontalPlacement = "left" | "right";

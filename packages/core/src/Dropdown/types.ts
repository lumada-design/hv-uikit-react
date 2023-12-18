export interface HvDropdownLabelsProps {
  /**
   * Label for overwrite the default header behavior.
   */
  select?: string;
  /**
   * Label used for the All checkbox action.
   */
  selectAll?: string;
  /**
   * Cancel button label.
   */
  cancelLabel?: string;
  /**
   * Apply button label.
   */
  applyLabel?: string;
  /**
   * The label used in the middle of the multiSelection count.
   */
  multiSelectionConjunction?: string;
  /**
   * The label used in search.
   */
  searchPlaceholder?: string;
}

export type HvDropdownStatus = "standBy" | "valid" | "invalid";

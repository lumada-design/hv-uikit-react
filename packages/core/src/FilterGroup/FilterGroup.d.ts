import { StandardProps } from "@material-ui/core";
import { HvFormElementProps } from "..";

export type HvFilterGroupClassKey = "root" | "labelContainer" | "label" | "description" | "error";

interface FilterValue {
  value: string | number[][];
}

export interface HvFilterGroupProps
  extends StandardProps<HvFormElementProps, HvFilterGroupClassKey> {
  /**
   * The callback fired when the cancel button is clicked.
   */
  onCancel: (event: Event) => void;

  /**
   * The callback fired when the clear filters button is clicked.
   */
  onClear: (event: Event) => void;

  /**
   * The callback fired when the value changes.
   */
  onChange?: (event: Event, value: FilterValue) => void;

  /**
   * An Object containing the various text associated with the input.
   */
  labels?: {
    /**
     * Apply button label.
     */
    applyLabel?: string;
    /**
     * Cancel button label.
     */
    cancelLabel?: string;
    /**
     * Cancel button label.
     */
    clearLabel?: string;
    /**
     * Placeholder label.
     */
    placeholder?: string;
    /**
     * SearchBox placeholder label.
     */
    searchBoxPlaceholder?: string;
    /**
     * Select All placeholder label.
     */
    selectAll?: string;
    /**
     * Multi selection conjunction placeholder label.
     */
    multiSelectionConjunction?: string;
  };

  /**
   * The placeholder value when nothing is selected.
   */
  placeholder?: string;

  /**
   * The initial value of the input when in single calendar mode.
   */
  filters: {
    id: string;
    name: string;
    data: {
      id: string | number;
      name: string;
      checked?: boolean;
    }[];
  }[];

  /**
   * The value of the filter group.
   */
  value?: FilterValue;

  /**
   * The placement where the filter group should be placed according to the input. Options are `left` or `right`.
   */
  horizontalPlacement?: "left" | "right";
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * Sets if the filter container should be out of the screen or stay visible.
   */
  escapeWithReference?: boolean;

  /**
   * The Height of the filter panel, between 295 and 425. Defaults to 350
   */
  height?: number | string;

  /**
   * The filter content props
   */
  filterContentProps?: object;
}

export default function HvFilterGroup(props: HvFilterGroupProps): JSX.Element | null;

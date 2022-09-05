import { StandardProps } from "@mui/material";
import { HvDropdownProps, ListValueProp } from "../..";

export type HvRightControlClassKey = "root" | "sortDropdown";

export interface HvControlsViewConfiguration extends Record<string, unknown> {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface RightListControls extends ListValueProp {
  accessor: string;
  desc: boolean;
}

export interface HvRightControlProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvRightControlClassKey> {
  /** Children to be rendered. */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * if `true` the hide sort by dropdown is not rendered
   */
  hideSortBy?: boolean;
  /**
   * options for the dropdown to sort
   */
  values?: RightListControls[];
  /**
   * Callback called when a sort action occurs
   */
  onSort?: (selected: RightListControls | ListValueProp | ListValueProp[] | undefined) => void;
  /**
   * Extra props passed to dropdown
   */
  sortProps?: HvDropdownProps;
}

export default function HvRightControl(props: HvRightControlProps): JSX.Element | null;

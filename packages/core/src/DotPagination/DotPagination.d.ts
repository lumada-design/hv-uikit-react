import { StandardProps } from "@mui/material";
import { HvRadioGroupProps } from "..";

export type HvDotPaginationClassKey = "root" | "horizontal" | "radioRoot";

export interface HvDotPaginationProps
  extends StandardProps<HvRadioGroupProps, HvDotPaginationClassKey> {
  /**
   *  The number of pages the component has.
   */
  pages?: number;
  /**
   * The currently selected page.
   */
  page?: number;
  /**
   * The callback fired when the page value changes.
   */
  onPageChange?: (event: Event, page: number) => void;
  /**
   * The callback fired to get the page aria label.
   */
  getItemAriaLabel?: (page: number) => string;
}

export default function HvDotPagination(props: HvDotPaginationProps): JSX.Element | null;

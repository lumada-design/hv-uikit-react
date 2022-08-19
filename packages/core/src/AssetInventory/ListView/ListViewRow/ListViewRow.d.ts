import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { ListViewConfiguration } from "..";
import { HvAtmosphereColorKeys, HvCheckBoxProps, HvSemanticColorKeys } from "../../..";

export type HvListViewRowClassKey = "root";

export interface HvListViewRowProps
  extends StandardProps<React.HTMLAttributes<HTMLTableSectionElement>, HvListViewRowClassKey> {
  /**
   * This value is provided by the asset inventory list view and contains necessary configurations for the columns.
   */
  viewConfiguration?: ListViewConfiguration;
  /**
   *  The function that will be executed when the row is selected.
   */
  onSelection?: (event: React.FormEvent<HTMLDivElement>) => void;
  /**
   * Whether the checkbox is selected or not.
   *
   * Note: if this value is specified the checkbox becomes a controlled component and it's state should be set from outside.
   */
  checked?: boolean;
  /**
   * Properties to be passed onto the checkbox component, the values of the object are equivalent to the
   * HvCheckbox API.
   */
  checkboxProps?: HvCheckBoxProps;
  /**
   *  The border to the right of the checkbox
   */
  semantic?: HvSemanticColorKeys | HvAtmosphereColorKeys;
}

export default function HvListViewRow(props: HvListViewRowProps): JSX.Element | null;

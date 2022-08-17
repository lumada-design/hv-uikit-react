import React from "react";
import { StandardProps } from "@mui/material";
import { FilterValue, HvBaseDropdownProps } from "../..";

export type HvFilterContentClassKey =
  | "root"
  | "panel"
  | "actionBar"
  | "space"
  | "header"
  | "baseDropdownSelection"
  | "leftSidePanel"
  | "rightSidePanel";

export interface HvFilterContentProps
  extends StandardProps<HvBaseDropdownProps, HvFilterContentClassKey, "onChange"> {
  description?: React.ReactNode;
  status?: "standBy" | "valid" | "invalid";

  onChange?: (evt: React.MouseEventHandler<HTMLButtonElement>, filterValues: FilterValue[]) => void;
  onCancel?: (evt: any[]) => void;
  onClear?: (evt: React.MouseEventHandler<HTMLButtonElement>) => void;

  labels?: {
    applyLabel?: string;
    cancelLabel?: string;
    clearLabel?: string;
    placeholder?: string;
    searchBoxPlaceholder?: string;
    selectAll?: string;
    multiSelectionConjunction?: string;
  };

  horizontalPlacement?: "left" | "right";
  disablePortal?: boolean;
  escapeWithReference?: boolean;
  height?: any;

  /**
   * Element to render when there are no filters
   */
  leftEmptyElement?: React.ReactNode;
  /**
   * Element to render when the selected filter has no values
   */
  rightEmptyElement?: React.ReactNode;
}

export default function HvFilterContent(props: HvFilterContentProps): JSX.Element | null;

import * as React from "react";
import { StandardProps, PopperProps } from "@mui/material";
import { ListValueProp } from "../..";

export type HvSuggestionsClassKey = "root" | "popper" | "list";

export interface HvSuggestionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvSuggestionsClassKey> {
  /**
   * Whether suggestions is visible.
   */
  expanded?: boolean;
  /**
   * The HTML element Suggestions attaches to.
   */
  anchorEl?: PopperProps["anchorEl"];
  /**
   * Array of { id, label, ...others } values to display in the suggestion list
   */
  suggestionValues?: ListValueProp[];
  /**
   * Function called when suggestion list is closed
   */
  onClose?: (event: React.SyntheticEvent) => void;
  /**
   * Function called when a suggestion is selected
   */
  onSuggestionSelected?: (event: React.MouseEvent, item: ListValueProp) => void;
}

export default function HvSuggestions(props: HvSuggestionsProps): JSX.Element | null;

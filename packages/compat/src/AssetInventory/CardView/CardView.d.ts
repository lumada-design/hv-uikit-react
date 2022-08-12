import * as React from "react";
import { StandardProps } from "@mui/material";
import { AssetInventoryMetadata } from "..";
import { ViewConfiguration } from "../ViewConfiguration";

export type SizeProps = true | false | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type HvCardViewClassKey = "root" | "elements" | "elementsXS" | "rightColumn" | "leftColumn";

export interface CardViewConfiguration extends ViewConfiguration {
  /**
   * Defines the number of columns the component is going to use. Check the Grid component
   * for possible values.
   */
  breakpoints?: {
    xs?: SizeProps;
    sm?: SizeProps;
    md?: SizeProps;
    lg?: SizeProps;
    xl?: SizeProps;
  };
}

export interface HvCardViewProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvCardViewClassKey> {
  /**
   * Metadata associated with the values.
   */
  metadata?: AssetInventoryMetadata[];
  /**
   * Values to be passed to the card render.
   */
  values?: object[];
  /**
   * Selected values.
   */
  selectedValues?: string[];
  /**
   * Custom render for the cards.
   */
  renderer?: (
    value: object,
    index: number,
    viewConfiguration: CardViewConfiguration,
    metadata: AssetInventoryMetadata
  ) => React.ReactNode;
  /**
   * innerCardContent to be passed to the standard render.
   */
  innerCardContent?: React.ReactNode;
  /**
   * Component to the present when no data is available.
   */
  emptyComponent?: React.ReactNode;
  /**
   * Configuration settings for the view.
   */
  viewConfiguration?: CardViewConfiguration;
}

export default function HvCardView(props: HvCardViewProps): JSX.Element | null;

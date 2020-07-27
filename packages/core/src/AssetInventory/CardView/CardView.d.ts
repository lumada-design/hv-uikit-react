import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { AssetInventoryMetadata } from "..";
import { ViewConfiguration } from "../ViewConfiguration";

export type SizeProps = true | false | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

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
   * Icon used in the multi button in the asset inventory.
   */
  icon: React.ReactNode;
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
  emptyComponent: React.ReactNode;
  /**
   * Configuration settings for the view.
   */
  viewConfiguration?: CardViewConfiguration;
}

export type HvCardViewClassKey = "root" | "elements";

export default function HvCardView(props: HvCardViewProps): JSX.Element | null;

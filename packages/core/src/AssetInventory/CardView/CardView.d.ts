import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { AssetInventoryMetadata } from "@hv/uikit-react-core/AssetInventory";
import {Action} from "@hv/uikit-react-core/Actions";

type SizeProps = true | false | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface HvCardViewProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvCardViewClassKey> {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: {
    /**
     * Styles applied to the root.
     */
    root: string;
  };
  /**
   * Icon used in the multi button in the assert inventory.
   */
  icon: React.ReactNode;
  /**
   * Metadata associated with the values.
   */
  metadata: AssetInventoryMetadata[];
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
  renderer?: Function;
  /**
   * innerCardContent to be passed to the standard render.
   */
  innerCardContent?: Function;
  /**
   * Configuration settings for the view.
   */
  viewConfiguration: {
    /**
     * Callback evoked in the selection of the card.
     */
    onSelection?: Function;
    /**
     * Defines if the view allows selections.
     */
    isSelectable?: boolean;
    /**
     * List of actions to be passed to the cards.
     */
    actions?: Action[];
    /**
     *  The callback function ran when an action is triggered, receiving ´action´ as param
     */
    actionsCallback?: (id: string, action: Action) => void;
    /**
     *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
     */
    maxVisibleActions?: number;
    /**
     * Defines the number of columns the component is going to use. Check the
     * Grid component for possible values
     */
    breakpoints?: {
      xs?: SizeProps;
      sm?: SizeProps;
      md?: SizeProps;
      lg?: SizeProps;
      xl?: SizeProps;
    };
  };
}

type HvCardViewClassKey = "root";

export default function HvCardView(props: HvCardViewProps): JSX.Element | null;

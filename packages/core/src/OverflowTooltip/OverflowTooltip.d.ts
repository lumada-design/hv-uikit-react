import { StandardProps, TooltipProps } from "@material-ui/core";

export type HvOverflowTooltipKey = "tooltipData" | "tooltipAnchor" | "tooltipAnchorParagraph";

export interface HvOverflowTooltipProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, HvOverflowTooltipKey> {
   /**
    * Id to be applied to the tooltip.
    */
   id?: string;
   /**
    * The node that will be rendered inside the tooltip.
    */
   data: React.ReactNode;
   /**
    * Class names to be applied.
    */
   className?: string;
   /**
    * If `true` the overflow tooltip will always use the paragraph overflow style.
    */
   paragraphOverflow?: boolean;
   /**
    * If true, the tooltip is shown.
    */
   open?: boolean;
   /**
    * Tooltip placement.
    */
   placement?:
   | 'bottom-end'
   | 'bottom-start'
   | 'bottom'
   | 'left-end'
   | 'left-start'
   | 'left'
   | 'right-end'
   | 'right-start'
   | 'right'
   | 'top-end'
   | 'top-start'
   | 'top';
   /**
    * Extra properties to add to the tooltip.
    */
   tooltipsProps?: TooltipProps;
}

export default function HvOverflowTooltip(props: HvOverflowTooltipProps): JSX.Element | null;

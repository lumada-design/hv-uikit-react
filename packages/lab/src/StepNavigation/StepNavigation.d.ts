import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvStepProps } from "./DefaultNavigation/Step/Step";

export type HvStepNavigationClassKey = "root";

export type HvStepNavigationProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvStepNavigationClassKey
> & {
  /**
   * Type of step navigation. Values = {"Simple", "Default"}
   */
  type: "Simple" | "Default";
  /**
   * Steps to show on the component.
   */
  steps: Array<Pick<HvStepProps, "state" | "title" | "onClick" | "className">> & {
    /**
     * Class names to override styles on the separator component after the step.
     */
    separatorClassName: string;
    /**
     * Class names to override styles on the title component above the step.
     */
    titleClassName: string;
  };
  /**
   * Sets one of the standard sizes of the steps
   */
  stepSize?: "XS" | "SM" | "MD" | "LG" | "XL";
  /**
   * Width of the component element.
   */
  width?: number;
  /**
   * Defines either show a title or only a tooltip on each step component
   */
  showTitles?: boolean;
};

export default function HvStepNavigation(props: HvStepNavigationProps): JSX.Element | null;

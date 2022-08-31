import * as React from "react";
import { StandardProps } from "@material-ui/core";

import { HvTheme } from "@hitachivantara/uikit-react-core";

import { HvStepNavigationProps } from "../StepNavigation";
import { HvDotProps } from "./Dot";

export type HvSimpleNavigationClassKey = "root";

export type ComponentChildProps = {
  stepsWidth: number;
  navWidth: number;
  separatorValues: {
    minWidth: number;
    maxWidth: number;
    getColor: (state: HvDotProps["state"], theme: HvTheme) => any;
    height: number;
  };
  stepValues: {
    minSize: number;
    maxSize: number;
    StepComponent: React.ComponentType<HvDotProps>;
  };
};

export type HvSimpleNavigationProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvSimpleNavigationClassKey
> &
  Pick<HvStepNavigationProps, "stepSize"> & {
    /**
     * Number of steps to show on the component.
     */
    numSteps: number;
    /**
     * Returns a JSX.element of the titles container.
     */
    getTitles: (
      getTitleProps?: (params: {
        state: HvDotProps["state"];
        rawTitle: string;
        number: number;
      }) => { variant: string; title: string }
    ) => JSX.Element | null;
    /**
     * Returns dynamic width values of the component (width, titleWidth, separatorWidth).
     */
    getDynamicValues: (stepsWidth: number) => {
      width: number;
      titleWidth: number;
      separatorWidth: number;
    };
    /**
     * Component to render Step Navigation with props = {separatorValues, stepValues, stepsWidth}
     */
    children: React.FunctionComponent<ComponentChildProps>;
  };

export default function HvSimpleNavigation(props: HvSimpleNavigationProps): JSX.Element | null;

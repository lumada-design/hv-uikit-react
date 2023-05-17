import {
  HvBaseProps,
  HvTheme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { HvStepNavigationProps } from "../StepNavigation";
import { HvDot, HvDotProps } from "./Dot";
import { HvSimpleNavigationClasses } from "./simpleNavigationClasses";
import { getColor, dotSizes } from "./utils";

export type ComponentChildProps = {
  stepsWidth: number;
  navWidth: number;
  separatorValues: {
    minWidth: number;
    maxWidth: number;
    getColor: (state: HvDotProps["state"], activeTheme: HvTheme) => any;
    height: number;
  };
  stepValues: {
    minSize: number;
    maxSize: number;
    StepComponent: React.ComponentType<HvDotProps>;
  };
};

export interface HvSimpleNavigationProps
  extends Pick<HvStepNavigationProps, "stepSize">,
    Omit<HvBaseProps, "children"> {
  /** Number of steps to show on the component. */
  numSteps: number;
  /** Returns a JSX.element of the titles container. */
  getTitles: (
    getTitleProps?: (params: {
      state: HvDotProps["state"];
      rawTitle: string;
      number: number;
    }) => { variant: string; title: string }
  ) => JSX.Element | null;
  /** Returns dynamic width values of the component (width, titleWidth, separatorWidth). */
  getDynamicValues: (stepsWidth: number) => {
    width: number;
    titleWidth: number;
    separatorWidth: number;
  };
  /** A Jss Object used to override or extend the styles applied to the empty state StepNavigation. */
  classes?: HvSimpleNavigationClasses;
  /** Component to render Step Navigation with props = {separatorValues, stepValues, stepsWidth} */
  children: React.FunctionComponent<ComponentChildProps>;
}

export const HvSimpleNavigation = ({
  numSteps,
  stepSize = "sm",
  getTitles,
  getDynamicValues,
  children,
  ...others
}: HvSimpleNavigationProps) => {
  const { activeTheme } = useTheme();

  // step values
  const dotSize = dotSizes[stepSize];
  const StepComponent = HvDot;
  //

  const stepsWidth = (numSteps + 0.5) * dotSize;
  const { width, titleWidth, separatorWidth } = getDynamicValues(stepsWidth);

  // separator values
  const maxWidth = Math.max(titleWidth - dotSize, separatorWidth);
  const minWidth = Math.max(titleWidth - dotSize * 1.25, separatorWidth);
  //

  const Steps = children;

  const titles = getTitles(({ rawTitle, number }) => ({
    variant: "label",
    title: `${number}. ${rawTitle}`,
    titleWidth,
  }));

  return (
    <div {...others}>
      {titles}
      <Steps
        {...{
          stepsWidth,
          navWidth: width,
          separatorValues: {
            minWidth,
            maxWidth,
            getColor,
            height: activeTheme?.stepNavigation.simpleSeparatorHeight || 0,
          },
          stepValues: {
            minSize: dotSize,
            maxSize: 1.5 * dotSize,
            StepComponent,
          },
        }}
      />
    </div>
  );
};

import { clsx } from "clsx";
import { ClassNames } from "@emotion/react";
import { theme } from "@hitachivantara/uikit-styles";
import {
  HvBaseProps,
  HvBreakpoints,
  useTheme,
  useWidth,
  HvBox,
  HvTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { HvDefaultNavigation } from "./DefaultNavigation";
import { HvSimpleNavigation } from "./SimpleNavigation";
import { HvStepProps } from "./DefaultNavigation/Step/Step";
import { styles } from "./StepNavigation.styles";
import stepNavigationClasses, {
  HvStepNavigationClasses,
} from "./stepNavigationClasses";
import { SEPARATOR_WIDTH, TITLE_MARGIN, TITLE_WIDTH } from "./utils";
import styled from "@emotion/styled";

export interface HvStepNavigationProps extends HvBaseProps {
  /** Type of step navigation. Values = {"Simple", "Default"} */
  type?: "Simple" | "Default";
  /** Steps to show on the component. */
  steps: Array<
    Pick<
      HvStepProps,
      "state" | "title" | "onClick" | "className" | "disabled"
    > & {
      /** Class names to override styles on the separator component after the step. */
      separatorClassName?: string;
      /** Class names to override styles on the title component above the step. */
      titleClassName?: string;
    }
  >;
  /** Sets one of the standard sizes of the steps. */
  stepSize?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Width of the component element on each breakpoint screen resolution. */
  width?: { [breakpoint in HvBreakpoints]?: number };
  /** Defines either show a title or only a tooltip on each step component. */
  showTitles?: boolean;
  /** A Jss Object used to override or extend the styles applied to the empty state StepNavigation. */
  classes?: HvStepNavigationClasses;
}

/**
 * Navigation page with steps.
 *
 * You need to define the <b>steps<b/> displayed on the component so that itself can be drawn on the UI.
 * On each step, you need to define a <b>state</b> - 'Pending', 'Failed', 'Completed', 'Current', 'Disabled' -
 * and a <b>title</b> to be shown as a tooltip or a text above of the step. You can also:
 * * Define a <b>className</b> on each step element;
 * * Define a <b>separatorClassName</b> to specify a className for the separator element. The default height
 * values of the separator element are 2px/3px on 'Simple'/'Default' layouts respectively;
 * * Define a <b>titleClassName</b> to specify a className for the title above each step element.
 *
 * For the root element, you can:
 * * Define a <b>className</b>;
 * * Choose a <b>type</b> of layout: 'Simple' or 'Default';
 * * Choose the <b>stepSize</b> of the step component: "xs", "sm", "md", "lg", "xl". The default size will be
 * correspondent to the current media breakpoint;
 * * Choose either you want to <b>showTitles</b> near to each step component or a tooltip on hover;
 * * Define a <b>width</b> of the component. If you don't define any value and the step component has no title
 * displayed above, the width of the separator element will be 100px.
 * If the step component has titles, each one will have 215px of width by default.
 */
export const HvStepNavigation = ({
  className,
  classes,
  width,
  steps,
  stepSize,
  showTitles = true,
  type = "Default",
  ...others
}: HvStepNavigationProps) => {
  const { activeTheme } = useTheme();

  // current breakpoint 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  const breakpoint = useWidth();
  // step configurations
  const stepSizeKey =
    stepSize ?? (["xs", "sm"].includes(breakpoint) ? "sm" : "md");
  const hasTitles = showTitles ?? !["xs", "sm"].includes(breakpoint);

  const styledLi = (containerSize) =>
    styled("li")({
      width: containerSize,
      height: containerSize,
    });

  const styledDiv = (containerSize) =>
    styled("div")({
      width: containerSize,
      height: containerSize,
    });

  const styledSeparatorElement = (
    title,
    separatorClassName,
    separatorHeight,
    separatorWidth,
    backgroundColor
  ) => {
    const StyledLi = styled("li")({
      height: separatorHeight,
      width:
        separatorWidth -
        2 *
          parseInt(
            (activeTheme?.stepNavigation.separatorMargin || "0px").replace(
              "px",
              ""
            )
          ),
      backgroundColor,
      margin: `0 ${theme.stepNavigation.separatorMargin}`,
    });

    return (
      <ClassNames key={`separator-${title}`}>
        {({ css }) => (
          <StyledLi
            aria-hidden
            className={clsx(
              css(styles.separator),
              stepNavigationClasses.separator,
              classes?.separator
            )}
          >
            <div
              aria-label={`separator-${title}`}
              className={clsx(separatorClassName)}
            />
          </StyledLi>
        )}
      </ClassNames>
    );
  };

  const drawItems = ({
    separatorValues: { minWidth, maxWidth, getColor, height },
    stepValues: { minSize, maxSize, StepComponent },
  }: any) => {
    const items = steps.reduce(
      (acc, { state, title, separatorClassName, ...props }, index): any => {
        const containerSize = state === "Current" ? maxSize : minSize;
        const StepContainer = styledLi(containerSize);
        const Step = styledDiv(Math.max(containerSize, 30));
        const stepProps = {
          ...{
            size: stepSizeKey,
            state,
            title,
            number: index + 1,
            ...props,
          },
        };
        const stepElement = (
          <ClassNames key={`step-${title}`}>
            {({ css }) => (
              <StepContainer
                className={clsx(
                  css(styles.li),
                  stepNavigationClasses.li,
                  classes?.li
                )}
              >
                {hasTitles ? (
                  <StepComponent
                    key={`step-${title}`}
                    aria-label={`step-${title}`}
                    {...stepProps}
                  />
                ) : (
                  <HvTooltip
                    placement="bottom"
                    title={
                      <HvTypography>{`${index + 1}. ${title}`}</HvTypography>
                    }
                  >
                    <div aria-label={`step-container-${title}`}>
                      <Step
                        className={clsx(
                          css(styles.li),
                          stepNavigationClasses.li,
                          classes?.li
                        )}
                      >
                        <StepComponent
                          aria-label={`step-${title}`}
                          {...stepProps}
                        />
                      </Step>
                    </div>
                  </HvTooltip>
                )}
              </StepContainer>
            )}
          </ClassNames>
        );
        if (index < steps.length - 1) {
          const separatorElement = styledSeparatorElement(
            title,
            separatorClassName,
            height,
            [steps[index + 1].state, state].includes("Current")
              ? minWidth
              : maxWidth,
            getColor(
              steps[index + 1].state === "Disabled" ? "Disabled" : state,
              theme
            )
          );
          return [...acc, stepElement, separatorElement];
        }
        return [...acc, stepElement];
      },
      []
    );

    return (
      <ClassNames>
        {({ css }) => (
          <ol
            className={clsx(
              css(styles.ol),
              stepNavigationClasses.ol,
              classes?.ol
            )}
          >
            {items}
          </ol>
        )}
      </ClassNames>
    );
  };

  const getDynamicValues = (stepsWidth) => {
    const maxWidth =
      width?.[breakpoint] ??
      Math.max(
        Number(hasTitles) * (TITLE_WIDTH + TITLE_MARGIN) * steps.length -
          TITLE_MARGIN,
        SEPARATOR_WIDTH * (steps.length - 1) + stepsWidth
      );
    // const next = theme.breakpoints.keys.find((_, index, self) =>
    const next = Object.keys(theme.breakpoints.values).find((_, index, self) =>
      index - 1 >= 0 ? self[index - 1] === breakpoint : false
    );
    const navWidth =
      (next &&
        Math.min(
          maxWidth,
          activeTheme?.breakpoints.values[next] ?? maxWidth
        )) ||
      0;
    const titleWidth =
      Number(hasTitles) * Math.ceil((navWidth + TITLE_MARGIN) / steps.length);
    const separatorWidth =
      Number(!hasTitles) *
      Math.ceil((navWidth - stepsWidth) / (steps.length - 1));

    return { width: navWidth, titleWidth, separatorWidth };
  };

  const styledTitle = (
    titleClassName,
    variant,
    title,
    titleWidth,
    titleDisabled
  ) => {
    const StyledTitle = styled(HvTypography)({
      textAlign: "center",
      width: titleWidth - TITLE_MARGIN,
      marginRight: TITLE_MARGIN,
    });

    return (
      <StyledTitle
        variant={variant}
        className={titleClassName}
        disabled={titleDisabled}
        key={`title-${title}`}
      >
        {title}
      </StyledTitle>
    );
  };

  const getTitles = (getTitleProps) =>
    hasTitles ? (
      <ClassNames>
        {({ css }) => (
          <div
            className={clsx(
              css(styles.titles),
              stepNavigationClasses.titles,
              classes?.titles
            )}
          >
            {steps.map(({ title: rawTitle, state, titleClassName }, index) => {
              const {
                variant = "label",
                title = rawTitle,
                titleWidth = 0,
                titleDisabled = false,
              } = getTitleProps({
                state,
                rawTitle,
                number: index + 1,
              });
              let Title = styledTitle(
                titleClassName,
                variant,
                title,
                titleWidth,
                titleDisabled
              );
              return Title;
            })}
          </div>
        )}
      </ClassNames>
    ) : null;

  const StepNavigation = {
    Default: HvDefaultNavigation,
    Simple: HvSimpleNavigation,
  }[type];

  return (
    <ClassNames>
      {({ css }) => (
        <StepNavigation
          {...{
            numSteps: steps.length,
            stepSize: stepSizeKey,
            getTitles,
            getDynamicValues,
            className: clsx(
              className,
              stepNavigationClasses.root,
              classes?.root,
              css(styles.root)
            ),
            ...others,
          }}
        >
          {({ stepsWidth, navWidth, ...itemsProps }) => (
            <HvBox
              as="nav"
              style={{
                width: `${navWidth}px`,
                margin: 0,
              }}
            >
              {drawItems(itemsProps)}
            </HvBox>
          )}
        </StepNavigation>
      )}
    </ClassNames>
  );
};

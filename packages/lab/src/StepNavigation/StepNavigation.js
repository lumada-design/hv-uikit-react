import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Typography, styled, useTheme } from "@mui/material";
import { withStyles } from "@mui/styles";
import { HvTooltip, HvTypography, useWidth } from "@hitachivantara/uikit-react-core";

import HvDefaultNavigation from "./DefaultNavigation";
import HvSimpleNavigation from "./SimpleNavigation";
import { SEPARATOR_WIDTH, TITLE_MARGIN, TITLE_WIDTH } from "./utils";
import styles from "./styles";

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
 * * Choose the <b>stepSize</b> of the step component: "XS", "SM", "MD", "LG", "XL". The default size will be
 * correspondent to the current media breakpoint;
 * * Choose either you want to <b>showTitles</b> near to each step component or a tootlip on hover;
 * * Define a <b>width</b> of the component. If you don't define any value and the step component has no title
 * displayed above, the width of the separator element;
 * will be 100px. If the step component has titles, each one will have 215px of width by default.
 */
const HvStepNavigation = ({
  className,
  classes,
  width,
  steps,
  stepSize,
  showTitles,
  type = "Default",
  ...others
}) => {
  const theme = useTheme();
  // current breakpoint 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  const breakpoint = useWidth();
  // step configurations
  const stepSizeKey = stepSize ?? (["xs", "sm"].includes(breakpoint) ? "SM" : "MD");
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
    const Separator = withStyles({
      separatorElement: {
        height: separatorHeight,
        width: separatorWidth,
        backgroundColor,
      },
    })(({ classes: { separatorElement } }) => (
      <div
        aria-label={`separator-${title}`}
        className={clsx(separatorElement, separatorClassName)}
      />
    ));
    return (
      <li aria-hidden key={`separator-${title}`} className={classes.separator}>
        <Separator />
      </li>
    );
  };

  const drawItems = ({
    separatorValues: { minWidth, maxWidth, getColor, height },
    stepValues: { minSize, maxSize, StepComponent },
  }) => {
    const items = steps.reduce((acc, { state, title, separatorClassName, ...props }, index) => {
      const containerSize = state === "Current" ? maxSize : minSize;
      const StepContainer = styledLi(containerSize);
      const Step = styledDiv(Math.max(containerSize, 30), Math.max(containerSize, 30));
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
        <StepContainer key={`step-${title}`} className={classes.li}>
          {hasTitles ? (
            <StepComponent aria-label={`step-${title}`} {...stepProps} />
          ) : (
            <HvTooltip
              placement="bottom"
              title={<HvTypography>{`${index + 1}. ${title}`}</HvTypography>}
            >
              <div aria-label={`step-container-${title}`}>
                <Step className={classes.li}>
                  <StepComponent aria-label={`step-${title}`} {...stepProps} />
                </Step>
              </div>
            </HvTooltip>
          )}
        </StepContainer>
      );
      if (index < steps.length - 1) {
        const separatorElement = styledSeparatorElement(
          title,
          separatorClassName,
          height,
          [steps[index + 1].state, state].includes("Current") ? minWidth : maxWidth,
          getColor(state)
        );
        return [...acc, stepElement, separatorElement];
      }
      return [...acc, stepElement];
    }, []);

    return <ol className={classes.ol}>{items}</ol>;
  };

  const getDynamicValues = (stepsWidth) => {
    const maxWidth =
      width?.[breakpoint] ??
      Math.max(
        Number(hasTitles) * (TITLE_WIDTH + TITLE_MARGIN) * steps.length - TITLE_MARGIN,
        SEPARATOR_WIDTH * (steps.length - 1) + stepsWidth
      );
    const next = theme.breakpoints.keys.find((_, index, self) =>
      index - 1 >= 0 ? self[index - 1] === breakpoint : false
    );
    const navWidth = Math.min(maxWidth, theme.breakpoints.values?.[next] ?? maxWidth);
    const titleWidth = Number(hasTitles) * Math.ceil((navWidth + TITLE_MARGIN) / steps.length);
    const separatorWidth =
      Number(!hasTitles) * Math.ceil((navWidth - stepsWidth) / (steps.length - 1));
    return { width: navWidth, titleWidth, separatorWidth };
  };

  const styledTitle = (titleClassName, variant, title, titleWidth) =>
    withStyles({
      stepTitle: {
        textAlign: "center",
        width: titleWidth - TITLE_MARGIN,
        marginRight: TITLE_MARGIN,
      },
    })(({ classes: { stepTitle } }) =>
      title ? (
        <HvTypography variant={variant} className={clsx(stepTitle, titleClassName)}>
          {title}
        </HvTypography>
      ) : null
    );

  const getTitles = (getTitleProps) =>
    hasTitles ? (
      <div className={classes.titles}>
        {steps.map(({ title: rawTitle, state, titleClassName }, index) => {
          const {
            variant = "highlightText",
            title = rawTitle,
            titleWidth = 0,
          } = getTitleProps({
            state,
            rawTitle,
            number: index + 1,
          });
          const Title = styledTitle(titleClassName, variant, title, titleWidth);
          return <Title key={`step-title-${rawTitle}`} />;
        })}
      </div>
    ) : null;

  const StepNavigation = {
    Default: HvDefaultNavigation,
    Simple: HvSimpleNavigation,
  }[type];

  return (
    <StepNavigation
      {...{
        stepSize: stepSizeKey,
        numSteps: steps.length,
        getTitles,
        getDynamicValues,
        className: clsx(className, classes.root),
        ...others,
      }}
    >
      {({ stepsWidth, navWidth, ...itemsProps }) => (
        <Typography
          component="nav"
          style={{
            width: `${navWidth}px`,
            margin: 0,
          }}
        >
          {drawItems(itemsProps)}
        </Typography>
      )}
    </StepNavigation>
  );
};

HvStepNavigation.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the li element.
     */
    li: PropTypes.string,
    /**
     *  Styles applied to the ol element.
     */
    ol: PropTypes.string,
    /**
     * Styles applied to the separator element.
     */
    separator: PropTypes.string,
    /**
     * Styles applied to the titles container element.
     */
    titles: PropTypes.string,
  }).isRequired,
  /**
   * Type of step navigation. Values = {"Simple", "Default"}.
   */
  type: PropTypes.oneOf(["Simple", "Default"]),
  /**
   * Steps to show on the component.
   */
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Class names to override styles on the step component.
       */
      className: PropTypes.string,
      /**
       * Class names to override styles on the separator component after the step.
       */
      separatorClassName: PropTypes.string,
      /**
       * Class names to override styles on the title component above the step.
       */
      titleClassName: PropTypes.string,
      /**
       * Title of the step.
       */
      title: PropTypes.string.isRequired,
      /**
       * State of the step. Values = {"Pending", "Failed", "Completed", "Current", "Disabled"}.
       */
      state: PropTypes.oneOf(["Pending", "Failed", "Completed", "Current", "Disabled"]).isRequired,
      /**
       * Define if a step is disabled/enabled.
       * If this property is not defined and the step is on state "Disabled", the step component will be disabled
       */
      disabled: PropTypes.bool,
    })
  ).isRequired,
  /**
   * Sets one of the standard sizes of the steps. Values = {"XS", "SM", "MD", "LG", "XL"}
   */
  stepSize: PropTypes.oneOf(["XS", "SM", "MD", "LG", "XL"]),
  /**
   * Width of the component element on each breakpoint screen resolution.
   */
  width: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
  }),
  /**
   * Defines either show a title or only a tooltip on each step component
   */
  showTitles: PropTypes.bool,
};

export default withStyles(styles, { name: "HvStepNavigation" })(HvStepNavigation);

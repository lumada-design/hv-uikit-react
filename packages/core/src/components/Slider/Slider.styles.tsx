import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import { CSSProperties } from "react";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";

import {
  HvFormElement,
  HvFormElementProps,
  HvWarningText,
} from "@core/components/Forms";
import { transientOptions } from "@core/utils/transientOptions";
import { outlineStyles } from "@core/utils/focusUtils";

import base from "./base";

const dot: CSSProperties = {
  position: "absolute",
  bottom: "-1px",
  marginLeft: "0px",
  width: "1px",
  height: "4px",
  border: "none",
  borderRadius: "0%",
  backgroundColor: theme.colors.atmo4,
  cursor: "pointer",
  verticalAlign: "middle",
  zIndex: "-3",
};

const dragSquare: CSSProperties = {
  cursor: "grab",
  width: "calc(100% - 40px)",
  left: "20px",
  height: "27px",
  position: "absolute",
  top: "-12px",
  content: "''",
  background: "transparent",
  borderTop: `12px solid ${theme.slider.dragBarColor}`,
  borderBottom: `12px solid ${theme.slider.dragBarColor}`,
  zIndex: "-2",
};

const ring: CSSProperties = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  border: `9px solid ${theme.slider.ringColor}`,
  opacity: theme.slider.ringOpacity,
  content: "''",
  position: "absolute",
  top: "-10px",
  left: "-10px",
};

const border: CSSProperties = {
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  border: `2px solid ${theme.colors.atmo1}`,
  content: "''",
  position: "absolute",
  top: "-4px",
  left: "-4px",
};

export interface SliderStyles {
  disabledMark: CSSProperties;
  mark: CSSProperties;
  dotDisabled: CSSProperties;
  dot: CSSProperties;
  knobInner: CSSProperties;
  knobOuter: CSSProperties;
  knobHidden: CSSProperties;
  knobHiddenLast: CSSProperties;
  track: CSSProperties;
  rail: CSSProperties;
}

export const sliderStyles: SliderStyles = {
  mark: {
    ...(theme.typography.caption1 as CSSProperties),
    fontFamily: theme.fontFamily.body,
    top: "-2px",
    zIndex: -1,
  },
  disabledMark: {
    ...(theme.typography.caption1 as CSSProperties),
    fontFamily: theme.fontFamily.body,
    color: `${theme.colors.secondary_60}`,
    cursor: "not-allowed",
    top: "-2px",
  },
  dot: {
    ...dot,
  },
  dotDisabled: {
    ...dot,
    cursor: "not-allowed",
  },
  knobHidden: { display: "none" },
  knobHiddenLast: {
    borderColor: "transparent",
    height: "3px",
    width: "2px",
    marginLeft: "-1px",
    border: "none",
    borderRadius: "0",
    marginTop: "0px",
    left: "100%",
    touchAction: "none",
    cursor: "default",
  },
  knobInner: {
    borderColor: "transparent",
    boxShadow: "none",
    backgroundColor: theme.colors.secondary,
    width: "16px",
    height: "16px",
  },
  knobOuter: {
    position: "relative",
    borderColor: "transparent",
    borderRadius: "50%",
    boxShadow: "none",
    backgroundColor: theme.colors.atmo4,
    width: "32px",
    height: "32px",
    top: "-80%",
    left: "-80%",
    zIndex: "-1",
  },
  track: {
    backgroundColor: theme.colors.secondary,
    height: "3px",
    zIndex: "-1",
    marginTop: "-1px",
  },
  rail: { backgroundColor: theme.colors.atmo4, height: "1px", zIndex: "-3" },
};

export const StyledFormElement = styled(
  (props: HvFormElementProps) => <HvFormElement {...props} />,
  transientOptions
)(
  ({
    $dragging,
    $standBy,
    $disabled,
  }: {
    $dragging: boolean;
    $standBy: boolean;
    $disabled: boolean;
  }) => ({
    ...($dragging && {
      cursor: "grabbing",

      "& .rc-slider-track": {
        "&::before": {
          ...dragSquare,
          cursor: "grabbing",
        },
      },
    }),

    ...($standBy && {
      "& .rc-slider-track": {
        "&:hover": {
          "&::before": {
            ...dragSquare,
          },
        },
      },
    }),

    ...($disabled && {
      cursor: "not-allowed",
      "&& .rc-slider-disabled": {
        background: "transparent",
      },
    }),
  })
);

export const StyledLabelContainer = styled(
  "div",
  transientOptions
)(({ $hasLabel }: { $hasLabel: boolean }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px",
  marginLeft: "20px",
  marginRight: "20px",

  ...($hasLabel && { justifyContent: "space-between" }),

  ...(!$hasLabel && { justifyContent: "flex-end" }),
}));

export const StyledWarning = styled(HvWarningText)({ padding: "0 8px" });

export const StyledSlider = styled(Slider)({
  zIndex: 0,
});

export const StyledTooltipContainer = styled(
  "div",
  transientOptions
)(
  ({
    $hidden,
    $disabled,
    $active,
  }: {
    $hidden: boolean;
    $disabled: boolean;
    $active: boolean;
  }) => ({
    ...($active && {
      "& .rc-slider-handle": {
        cursor: "pointer",
        marginTop: "-8px",
        opacity: 1,
        "&:active": {
          cursor: "grab",
          "&::before": {
            ...ring,
          },
          "&::after": {
            ...border,
          },
        },
        "&:hover": {
          "&::before": {
            ...ring,
          },
          "&::after": {
            ...border,
          },
        },

        // Note about the usage of `!important below`: the way the rc-slider allows us to
        // style the knobs is through inline styles. This means that the `box-shadow`, which
        // is an inline style and is set to `none` to prevent the default rc-slider style to
        // show, can't be overridden for the focus scenario unless we use the `!important` flag.
        "&:focus-visible": {
          ...outlineStyles,
          boxShadow:
            "0 0 0 3px #52A8EC, 0 0 0 7px rgba(29,155,209,.3)!important",
          "&::after": {
            ...border,
          },
        },
      },
    }),

    ...($disabled && {
      "&& .rc-slider-handle": {
        cursor: "not-allowed",
        marginTop: "-8px",
        opacity: 1,
        "&:active": {
          cursor: "not-allowed",
        },
        "&:hover": {
          cursor: "not-allowed",
        },
      },
    }),

    ...($hidden && {
      display: "none",
    }),
  })
);

export const StyledTooltip = styled(Tooltip)({
  "& .rc-slider-tooltip-inner": {
    background: theme.colors.atmo1,
    borderRadius: 0,
    maxWidth: "532px",
    height: "100%",
    padding: theme.space.sm,
    ...(theme.typography.body as CSSProperties),
    fontFamily: theme.fontFamily.body,
    boxShadow: "none",
  },

  "& .rc-slider-tooltip-arrow": {
    visibility: "hidden",
  },
});

export const StyledSliderContainer = styled("div")({
  ...(base as CSSProperties),

  marginBottom: "18px",
  padding: "0 23px",
});

import { forwardRef } from "react";
import type { Placement } from "@popperjs/core";
import { DropDownXS } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { ExtractNames, createClasses } from "../utils/classes";
import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvDropdownButton", {
  root: {
    cursor: "pointer",
    userSelect: "none",
    position: "relative",
    background: theme.colors.atmo1,
    boxSizing: "border-box",
    border: `1px solid ${theme.colors.secondary}`,
    borderRadius: theme.radii.base,
    "&:hover": {
      border: `1px solid ${theme.colors.primary}`,
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
      border: `1px solid ${theme.colors.primary}`,
    },
  },
  open: {
    border: `1px solid ${theme.colors.secondary}`,

    "&:hover": {
      border: `1px solid ${theme.colors.secondary}`,
    },
  },
  openUp: {
    borderRadius: `0px 0px ${theme.radii.base} ${theme.radii.base}`,
  },
  openDown: {
    borderRadius: `${theme.radii.base} ${theme.radii.base} 0px 0px`,
  },
  disabled: {
    cursor: "not-allowed",
    pointerEvents: "none",
    color: theme.colors.secondary_60,
    border: `1px solid ${theme.colors.secondary_60}`,
    background: theme.colors.atmo2,
    "&:hover": {
      border: `1px solid ${theme.colors.secondary_60}`,
    },
  },
  readOnly: {
    cursor: "not-allowed",
    pointerEvents: "none",
    border: `1px solid ${theme.colors.secondary_60}`,
    background: theme.colors.atmo2,
    userSelect: "text",
    "&:focus-visible": {
      outline: "none",
      border: `1px solid ${theme.colors.secondary_60}`,
    },
  },

  selection: {
    display: "flex",
    alignItems: "center",
    height: "30px",
    boxSizing: "border-box",
    paddingLeft: theme.space.xs,
    paddingRight: theme.sizes.sm,
  },
  placeholder: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ...theme.typography.body,
    color: theme.colors.secondary_80,
  },

  arrowContainer: {
    position: "absolute",
    pointerEvents: "none",
    top: -1,
    right: -1,
  },
  arrow: {
    transition: "rotate 0.2s ease",
  },
});

export type HvDropdownButtonClasses = ExtractNames<typeof useClasses>;

export interface HvDropdownButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  readOnly?: boolean;
  open?: boolean;
  disabled?: boolean;
  placement?: Placement;
  adornment?: React.ReactNode;
  classes?: HvDropdownButtonClasses;
}

/**
 * HvBaseDropdown internal header button component
 *
 * TODO: migrate to use HvButton with `endIcon` & align with DS specs
 */
export const HvDropdownButton = forwardRef<
  HTMLDivElement,
  HvDropdownButtonProps
>((props, ref) => {
  const {
    classes: classesProp,
    className,
    open,
    placement = "bottom",
    disabled,
    readOnly,
    children,
    adornment,
    ...others
  } = useDefaultProps("HvDropdownButton", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <div
      ref={ref}
      className={cx(classes.root, className, {
        [classes.open]: open,
        [classes.openUp]: open && placement.includes("top"),
        [classes.openDown]: open && placement.includes("bottom"),
        [classes.disabled]: disabled,
        [classes.readOnly]: readOnly,
      })}
      {...others}
    >
      <div className={classes.selection}>
        {children && typeof children === "string" ? (
          <div className={cx(classes.placeholder)}>{children}</div>
        ) : (
          children
        )}
      </div>
      <div className={classes.arrowContainer}>
        {adornment || (
          <DropDownXS
            iconSize="XS"
            className={classes.arrow}
            style={{ rotate: open ? "180deg" : undefined }}
          />
        )}
      </div>
    </div>
  );
});

import { forwardRef } from "react";
import type { Placement } from "@popperjs/core";
import { DropDownXS } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { ExtractNames, createClasses } from "../utils/classes";
import { HvButton } from "../Button";

export const { staticClasses, useClasses } = createClasses("HvSelectButton", {
  root: {
    width: "100%",
    minWidth: "unset",
    userSelect: "none",
    position: "relative",
    paddingLeft: theme.space.xs,
    justifyContent: "flex-start",
  },
  disabled: {},
  readOnly: {
    userSelect: "text",
    backgroundColor: theme.colors.atmo2,
  },
  open: {
    backgroundColor: theme.colors.atmo1,
  },
  openUp: {
    borderRadius: `0px 0px ${theme.radii.base} ${theme.radii.base}`,
  },
  openDown: {
    borderRadius: `${theme.radii.base} ${theme.radii.base} 0px 0px`,
  },

  selection: {
    color: "inherit",
    flex: 1,
    textAlign: "start",

    overflow: "clip visible",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  placeholder: {},
  arrowContainer: {
    marginRight: theme.spacing(-2),
  },
  arrow: {
    transition: "rotate 0.2s ease",
  },
});

export type HvSelectButtonClasses = ExtractNames<typeof useClasses>;

export interface HvSelectButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  readOnly?: boolean;
  open?: boolean;
  disabled?: boolean;
  placement?: Placement;
  adornment?: React.ReactNode;
  classes?: HvSelectButtonClasses;
}

/**
 * HvSelect internal header button component
 */
export const HvSelectButton = forwardRef<
  HTMLButtonElement,
  HvSelectButtonProps
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
  } = useDefaultProps("HvSelectButton", props);
  const { classes, cx } = useClasses(classesProp);

  const endIcon = adornment ?? (
    <DropDownXS
      iconSize="XS"
      style={{ rotate: open ? "180deg" : undefined }}
      className={classes.arrow}
    />
  );

  return (
    <HvButton
      ref={ref}
      variant="secondarySubtle"
      disabled={disabled || readOnly}
      className={cx(classes.root, className, {
        [classes.open]: open,
        [classes.openUp]: open && placement.includes("top"),
        [classes.openDown]: open && placement.includes("bottom"),
        [classes.disabled]: disabled,
        [classes.readOnly]: readOnly,
      })}
      classes={{ endIcon: classes.arrowContainer }}
      endIcon={endIcon}
      {...others}
    >
      <div className={classes.selection}>
        {children && typeof children === "string" ? (
          <div className={classes.placeholder}>{children}</div>
        ) : (
          children
        )}
      </div>
    </HvButton>
  );
});

import { forwardRef } from "react";
import { theme } from "@hitachivantara/uikit-styles";

import { HvPanel, HvPanelProps } from "../Panel";
import { createClasses, ExtractNames } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvDropdownPanel", {
  panel: {
    border: `1px solid ${theme.colors.secondary}`,
    // borderRadius: 0,
    marginTop: -1,
    marginBottom: -1,
  },
  panelOpenedUp: {
    borderRadius: `${theme.radii.base} ${theme.radii.base} 0 0`,
  },
  panelOpenedDown: {
    borderRadius: `0 0 ${theme.radii.base} ${theme.radii.base}`,
  },
  extensionOpen: {
    height: 0,
    backgroundColor: theme.colors.atmo1,
    borderTop: "none",
    borderBottom: "none",
    borderRight: `1px solid ${theme.colors.secondary}`,
    borderLeft: `1px solid ${theme.colors.secondary}`,
    boxShadow: `0px 8px 0px ${theme.colors.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`,
  },
  extensionLeftPosition: { marginLeft: "auto" },
  extensionFloatRight: { float: "right" },
  extensionFloatLeft: { float: "left" },
});

export type HvDropdownPanelClasses = ExtractNames<typeof useClasses>;

export interface HvDropdownPanelProps extends Omit<HvPanelProps, "classes"> {
  classes?: HvDropdownPanelClasses;
  placement?: string;
}

/**
 * HvBaseDropdown container HvPanel that includes DS3 "extensions"
 *
 * TODO:
 * - make default HvBaseDropdown inherit `HvPanel`'s padding
 * - refactor extensions into ::before and ::after to remove DS3-only DOM elements
 */
export const HvDropdownPanel = forwardRef<HTMLDivElement, HvDropdownPanelProps>(
  (props, ref) => {
    const {
      classes: classesProp,
      className,
      children,
      placement = "bottom-start",
      ...others
    } = props;
    const { classes, cx } = useClasses(classesProp);

    return (
      <>
        {placement.includes("bottom") && (
          <div
            className={cx(classes.extensionOpen, {
              [classes.extensionLeftPosition]: placement.includes("end"),
            })}
          />
        )}
        <HvPanel
          ref={ref}
          className={cx(classes.panel, className, {
            [classes.panelOpenedUp]: placement.includes("top"),
            [classes.panelOpenedDown]: placement.includes("bottom"),
          })}
          {...others}
        >
          {children}
        </HvPanel>
        {placement.includes("top") && (
          <div
            className={cx(classes.extensionOpen, {
              [classes.extensionFloatRight]: placement.includes("end"),
              [classes.extensionFloatLeft]: placement.includes("start"),
            })}
          />
        )}
      </>
    );
  }
);

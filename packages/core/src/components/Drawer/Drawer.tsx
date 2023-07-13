import { useEffect, useState } from "react";

import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from "@mui/material";

import { Close } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import { HvBaseProps } from "@core/types/generic";
import { withTooltip } from "@core/hocs/withTooltip";
import { hexToRgbA } from "@core/utils/hexToRgbA";
import { setId } from "@core/utils/setId";
import { checkValidHexColorValue } from "@core/utils/checkValidHexColorValue";
import { ExtractNames } from "@core/utils/classes";
import { getVarValue } from "@core/utils/theme";
import { HvButton } from "@core/components/Button";
import { useTheme } from "@core/hooks/useTheme";

import { staticClasses, useClasses } from "./Drawer.styles";

export { staticClasses as drawerClasses };

export type HvDrawerClasses = ExtractNames<typeof useClasses>;

export interface HvDrawerProps
  extends MuiDrawerProps,
    Omit<MuiDrawerProps, "classes">,
    HvBaseProps<HTMLDivElement> {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvDrawerClasses;
  /**
   * Components of the Drawer.
   */
  children?: React.ReactNode;
  /**
   * Current state of the Drawer.
   */
  open?: boolean;
  /**
   * Function executed on close.
   * Extended from Modal from material-ui
   *
   */
  onClose?: (
    event: React.SyntheticEvent,
    reason?: "escapeKeyDown" | "backdropClick"
  ) => void;
  /**
   * The side the drawer opens from.
   */
  anchor?: "left" | "top" | "right" | "bottom";
  /**
   * Title for the button close.
   */
  buttonTitle?: string;
}

const getBackgroundColor = (color: string) => {
  return checkValidHexColorValue(color) ? hexToRgbA(color, 0.8) : color;
};

/**
 * The Drawer component provides a foundation to create a sliding pane.
 * It only provides the pane with a close button, the rest of the
 * content can be customized.
 */
export const HvDrawer = ({
  className,
  classes: classesProp,
  id,
  children,
  open,
  onClose,
  anchor = "right",
  buttonTitle = "Close",
  ...others
}: HvDrawerProps) => {
  const { classes, css, cx } = useClasses(classesProp);
  const { activeTheme, rootId } = useTheme();

  const [backgroundColorValue, setBackgroundColorValue] = useState<string>(
    getVarValue(theme.drawer.backDropBackgroundColor, rootId) || ""
  );

  const closeButtonDisplay = () => <Close role="presentation" />;

  const CloseButtonTooltipWrapper = buttonTitle
    ? withTooltip(closeButtonDisplay, buttonTitle, "top")
    : closeButtonDisplay;

  const [backgroundColor, setBackgroundColor] = useState(
    getBackgroundColor(backgroundColorValue)
  );

  useEffect(() => {
    setBackgroundColorValue(
      getVarValue(theme.drawer.backDropBackgroundColor, rootId) ||
        activeTheme?.drawer.backDropBackgroundColor ||
        ""
    );

    setBackgroundColor(getBackgroundColor(backgroundColorValue));
  }, [
    activeTheme?.colors.modes.selectedMode,
    backgroundColorValue,
    setBackgroundColor,
    rootId,
    activeTheme?.drawer.backDropBackgroundColor,
  ]);

  return (
    <MuiDrawer
      className={cx(classes.root, className)}
      id={id}
      anchor={anchor}
      open={open}
      PaperProps={{
        classes: {
          root: classes.paper,
        },
      }}
      BackdropProps={{
        classes: {
          root: cx(css({ backgroundColor }), classes.background),
        },
      }}
      onClose={onClose}
      {...others}
    >
      <HvButton
        id={setId(id, "close")}
        className={classes.closeButton}
        variant="secondaryGhost"
        onClick={onClose}
        aria-label={buttonTitle}
      >
        <CloseButtonTooltipWrapper />
      </HvButton>
      {children}
    </MuiDrawer>
  );
};

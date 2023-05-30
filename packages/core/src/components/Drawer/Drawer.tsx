import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from "@mui/material";
import { ClassNames } from "@emotion/react";
import { Close } from "@hitachivantara/uikit-react-icons";
import { HvBaseProps } from "@core/types/generic";
import { withTooltip } from "@core/hocs";
import {
  getVarValue,
  hexToRgbA,
  setId,
  checkValidHexColorValue,
} from "@core/utils";
import { theme } from "@hitachivantara/uikit-styles";
import { HvButton } from "@core/components";
import { useEffect, useState } from "react";
import { useTheme } from "@core/hooks";
import { styles } from "./Drawer.styles";
import drawerClasses, { HvDrawerClasses } from "./drawerClasses";

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

/**
 * The Drawer component provides a foundation to create a sliding pane.
 * It only provides the pane with a close button, the rest of the
 * content can be customized.
 */
export const HvDrawer = ({
  className,
  classes,
  id,
  children,
  open,
  onClose,
  anchor = "right",
  buttonTitle = "Close",
  ...others
}: HvDrawerProps) => {
  const { activeTheme, selectedMode } = useTheme();

  const [backgroundColorValue, setBackgroundColorValue] = useState<string>(
    getVarValue(theme.drawer.backDropBackgroundColor)
  );

  const closeButtonDisplay = () => <Close role="presentation" />;

  const CloseButtonTooltipWrapper = buttonTitle
    ? withTooltip(closeButtonDisplay, buttonTitle, "top")
    : closeButtonDisplay;

  let backgroundColor = checkValidHexColorValue(backgroundColorValue)
    ? hexToRgbA(backgroundColorValue, 0.8)
    : backgroundColorValue;

  useEffect(() => {
    setBackgroundColorValue(getVarValue(theme.drawer.backDropBackgroundColor));

    backgroundColor = checkValidHexColorValue(backgroundColorValue)
      ? hexToRgbA(backgroundColorValue, 0.8)
      : backgroundColorValue;
  }, [activeTheme?.colors?.modes[selectedMode], backgroundColorValue]);

  return (
    <ClassNames>
      {({ css, cx }) => (
        <MuiDrawer
          className={cx(
            css(styles.root),
            drawerClasses.root,
            classes?.root,
            className
          )}
          id={id}
          anchor={anchor}
          open={open}
          PaperProps={{
            classes: {
              root: cx(css(styles.paper), drawerClasses.paper, classes?.paper),
            },
          }}
          BackdropProps={{
            classes: {
              root: cx(
                css({
                  backgroundColor,
                }),
                drawerClasses.background,
                classes?.background
              ),
            },
          }}
          onClose={onClose}
          {...others}
        >
          <HvButton
            id={setId(id, "close")}
            className={cx(
              css(styles.closeButton),
              drawerClasses.closeButton,
              classes?.closeButton
            )}
            variant="primaryGhost"
            onClick={onClose}
            aria-label={buttonTitle}
          >
            <CloseButtonTooltipWrapper />
          </HvButton>
          {children}
        </MuiDrawer>
      )}
    </ClassNames>
  );
};

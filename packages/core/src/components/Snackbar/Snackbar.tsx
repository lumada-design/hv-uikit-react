import Slide from "@mui/material/Slide";
import {
  SnackbarCloseReason,
  SnackbarOrigin,
  SnackbarProps as MuiSnackbarProps,
} from "@mui/material/Snackbar";
import { HvBaseProps } from "../../types";
import { StyledSnackbar } from "./Snackbar.styles";
import { HvSnackbarClasses } from "./snackbarClasses";
import { capitalize } from "lodash";
import { SyntheticEvent } from "react";
import HvSnackBarContentWrapper from "./SnackbarContentWrapper";
import { setId } from "utils";
import { HvAction, HvListValue } from "components";

export type HvSnackbarVariant = "default" | "success" | "warning" | "error";

export type HvSnackbarProps = Omit<MuiSnackbarProps, "action"> &
  HvBaseProps & {
    /** If true, Snackbar is open. */
    open?: boolean;
    /** Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway. */
    onClose?:
      | ((
          event: Event | SyntheticEvent<any, Event>,
          reason: SnackbarCloseReason
        ) => void)
      | undefined;
    /** The message to display. */
    label?: React.ReactNode;
    /** The anchor of the Snackbar. vertical: "top", "bottom" | horizontal: "left","center","right. It defines where the snackbar will end his animation */
    anchorOrigin?: SnackbarOrigin;
    /** The number of milliseconds to wait before automatically calling the onClose function. onClose should then set the state of the open prop to hide the Snackbar */
    autoHideDuration?: number;
    /** Variant of the snackbar. */
    variant?: HvSnackbarVariant;
    /** Custom icon to replace the variant default. */
    customIcon?: React.ReactNode;
    /** Controls if the associated icon to the variant should be shown. */
    showIcon?: boolean;
    /** Action to display. */
    action?: React.ReactNode | HvAction;
    /** The callback function ran when an action is triggered, receiving `action` as param */
    actionCallback?: (
      event:
        | React.ChangeEvent<HTMLLIElement>
        | React.MouseEvent<HTMLButtonElement>,
      id: string,
      action: HvAction | HvListValue
    ) => void;
    /** Duration of transition in milliseconds. */
    transitionDuration?: number;
    /** Direction of slide transition. */
    transitionDirection?: "up" | "down" | "left" | "right";
    /** Custom offset from top/bottom of the page, in px. */
    offset?: number;
    /** Others applied to the content of the snackbar. */
    snackbarContentProps?: object;
    /** A Jss Object used to override or extend the styles applied to the empty state component. */
    classes?: HvSnackbarClasses;
  };

const transLeft = (props) => <Slide {...props} direction="left" />;
const transRight = (props) => <Slide {...props} direction="right" />;
const transUp = (props) => <Slide {...props} direction="up" />;
const transDown = (props) => <Slide {...props} direction="down" />;

const snackBarDirComponent = (direction) => {
  switch (direction) {
    default:
    case "left":
      return transLeft;
    case "right":
      return transRight;
    case "up":
      return transUp;
    case "down":
      return transDown;
  }
};

/**
 * A Snackbar provides brief messages about app processes.
 * It is dismissed automatically after a given interval.
 *
 * Snackbar can be built with two different components.
 * One is the HvSnackbar, which wraps all the positioning, transition, auto hide, etc.
 * The other is the HvSnackbarContent, which allows a finer control and customization of the content of the Snackbar.
 */
export const HvSnackbar = ({
  classes,
  className,
  id,
  open = false,
  onClose,
  label = "",
  anchorOrigin = { vertical: "top", horizontal: "right" },
  autoHideDuration = 5000,
  variant = "default",
  showIcon = false,
  customIcon = null,
  action = null,
  actionCallback,
  transitionDuration = 300,
  transitionDirection = "left",
  offset = 60,
  snackbarContentProps,
  ...others
}: HvSnackbarProps) => {
  const anchorOriginOffset = {
    anchorOriginTop: {
      top: `${offset}px`,
    },
    anchorOriginBottom: {
      bottom: `${offset}px`,
    },
  };

  return (
    <StyledSnackbar
      style={
        anchorOriginOffset[`anchorOrigin${capitalize(anchorOrigin.vertical)}`]
      }
      classes={classes}
      className={className}
      id={id}
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      transitionDuration={transitionDuration}
      TransitionComponent={snackBarDirComponent(transitionDirection)}
      {...others}
    >
      <HvSnackBarContentWrapper
        id={setId(id, "content")}
        label={label}
        variant={variant}
        customIcon={customIcon}
        showIcon={showIcon}
        action={action}
        actionCallback={actionCallback}
        {...snackbarContentProps}
      />
    </StyledSnackbar>
  );
};

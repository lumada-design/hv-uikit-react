import Slide from "@mui/material/Slide";
import {
  SnackbarCloseReason,
  SnackbarOrigin,
  SnackbarProps as MuiSnackbarProps,
} from "@mui/material/Snackbar";
import { Snackbar as MuiSnackbar } from "@mui/material";

import capitalize from "lodash/capitalize";

import { SyntheticEvent } from "react";

import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";
import { setId } from "@core/utils/setId";
import { HvActionGeneric } from "@core/components/ActionsGeneric";

import {
  HvSnackbarContentProps,
  HvSnackbarContent,
} from "./SnackbarContentWrapper";
import { staticClasses, useClasses } from "./Snackbar.styles";
import { HvSnackbarVariant } from "./types";

export { staticClasses as snackbarClasses };

export type HvSnackbarClasses = ExtractNames<typeof useClasses>;

export interface HvSnackbarProps
  extends Omit<MuiSnackbarProps, "action" | "classes">,
    Omit<HvBaseProps, "children"> {
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
  action?: React.ReactNode | HvActionGeneric;
  /** The callback function ran when an action is triggered, receiving `action` as param */
  actionCallback?: (
    event: React.SyntheticEvent,
    id: string,
    action: HvActionGeneric
  ) => void;
  /** Duration of transition in milliseconds. */
  transitionDuration?: number;
  /** Direction of slide transition. */
  transitionDirection?: "up" | "down" | "left" | "right";
  /** Custom offset from top/bottom of the page, in px. */
  offset?: number;
  /** Others applied to the content of the snackbar. */
  snackbarContentProps?: HvSnackbarContentProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvSnackbarClasses;
}

const transLeft = (props) => <Slide {...props} direction="left" />;
const transRight = (props) => <Slide {...props} direction="right" />;
const transUp = (props) => <Slide {...props} direction="up" />;
const transDown = (props) => <Slide {...props} direction="down" />;

const snackBarDirComponent = (direction) => {
  switch (direction) {
    case "right":
      return transRight;
    case "up":
      return transUp;
    case "down":
      return transDown;
    case "left":
    default:
      return transLeft;
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
  classes: classesProp,
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
  const { classes } = useClasses(classesProp);

  const anchorOriginOffset = {
    anchorOriginTop: {
      top: `${offset}px`,
    },
    anchorOriginBottom: {
      bottom: `${offset}px`,
    },
  };

  return (
    <MuiSnackbar
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
      <HvSnackbarContent
        id={setId(id, "content")}
        label={label}
        variant={variant}
        customIcon={customIcon}
        showIcon={showIcon}
        action={action}
        actionCallback={actionCallback}
        {...snackbarContentProps}
      />
    </MuiSnackbar>
  );
};

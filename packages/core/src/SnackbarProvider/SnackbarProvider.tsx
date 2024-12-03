import { forwardRef, useCallback, useMemo } from "react";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import {
  OptionsObject,
  SnackbarContent,
  SnackbarProvider,
  SnackbarProviderProps,
  useSnackbar,
} from "notistack";
import { type ExtractNames } from "@hitachivantara/uikit-react-utils";

import {
  HvSnackbarContent,
  HvSnackbarContentProps,
} from "../Snackbar/SnackbarContent";
import { HvSnackbarVariant } from "../Snackbar/types";
import { staticClasses, useClasses } from "./SnackbarProvider.styles";

export { staticClasses as snackbarProviderClasses };

export type HvSnackbarProviderClasses = ExtractNames<typeof useClasses>;

export interface HvSnackbarProviderProps {
  /** Your component tree. */
  children: React.ReactNode;
  /** Max visible snackbars. */
  maxSnack?: number;
  /** How much time the snackbar remains visible in milliseconds. */
  autoHideDuration?: number;
  /** Where is the snackbar placed. */
  anchorOrigin?: SnackbarOrigin;
  /** Class object used to override notistack classes. */
  notistackClassesOverride?: SnackbarProviderProps["classes"];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvSnackbarProviderClasses;
  /** Class names to be applied. */
  className?: string;
  /** The container the snackbar should slide from. */
  container?: SnackbarProviderProps["domRoot"];
}

export interface HvNotistackSnackMessageProps extends OptionsObject {
  /** Id to be applied to the root node. */
  id?: string;
  /** class name to apply on the root node */
  className?: string;
  /** Your component tree. */
  message?: React.ReactNode;
  /** Variant of the snackbar. */
  variant?: HvSnackbarVariant;
  /** Extra values to pass to the snackbar. */
  snackbarContentProps?: HvSnackbarContentProps;
}

const HvNotistackSnackMessage = forwardRef<
  HTMLDivElement,
  HvNotistackSnackMessageProps
>(function HvNotistackSnackMessage(props, ref) {
  const { id, message, variant = "success", snackbarContentProps } = props;

  return (
    <SnackbarContent ref={ref}>
      <HvSnackbarContent
        id={id}
        variant={variant}
        showIcon
        label={message}
        role="none"
        {...snackbarContentProps}
      />
    </SnackbarContent>
  );
});

// We override notistack hook to be able to customize the snackbar that should be called.
export const useHvSnackbar = () => {
  const snackbarContext = useSnackbar();

  if (!snackbarContext) {
    throw new Error("useHvSnackbar must be used within an HvSnackbarProvider");
  }

  const { enqueueSnackbar: enqueueNotistackSnackbar, closeSnackbar } =
    snackbarContext;

  const enqueueSnackbar = useCallback(
    (message: React.ReactNode, options: HvNotistackSnackMessageProps = {}) => {
      const {
        id,
        variant = "success",
        snackbarContentProps,
        className,
        ...otherOptions
      } = options;

      return enqueueNotistackSnackbar(
        <HvNotistackSnackMessage
          id={id}
          message={message}
          variant={variant}
          snackbarContentProps={snackbarContentProps}
        />,
        { ...otherOptions, className },
      );
    },
    [enqueueNotistackSnackbar],
  );
  return useMemo(
    () => ({
      enqueueSnackbar,
      closeSnackbar,
    }),
    [enqueueSnackbar, closeSnackbar],
  );
};

export const HvSnackbarProvider = ({
  children,
  notistackClassesOverride,
  maxSnack = 5,
  autoHideDuration = 5000,
  anchorOrigin = {
    vertical: "top",
    horizontal: "right",
  },
  classes: classesProp,
  className,
  container,
  ...others
}: HvSnackbarProviderProps) => {
  const { classes, css, cx } = useClasses(classesProp);

  const { containerRoot, ...otherNotistackClasses } =
    notistackClassesOverride || {};

  const notistackClasses: SnackbarProviderProps["classes"] = {
    containerRoot: cx(
      css({
        pointerEvents: "all",
        "& > div > div": {
          // Overrides notistack extra padding
          padding: "0 !important",
          transition: "all 0s ease 0s !important",
        },
      }),
      containerRoot,
    ),
    ...otherNotistackClasses,
  };

  return (
    <SnackbarProvider
      classes={notistackClasses}
      maxSnack={maxSnack}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      className={cx(classes.snackItemRoot, className)}
      domRoot={container}
      {...others}
    >
      {children}
    </SnackbarProvider>
  );
};

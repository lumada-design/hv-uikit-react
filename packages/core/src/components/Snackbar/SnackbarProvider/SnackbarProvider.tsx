import { forwardRef, ReactNode, useCallback, useMemo } from "react";

import {
  CombinedClassKey,
  SnackbarContent,
  SnackbarProvider,
  useSnackbar,
} from "notistack";

import { clsx } from "clsx";

import { SnackbarOrigin } from "@mui/material/Snackbar";
import { ClassNameMap } from "@mui/material";

import { css } from "@emotion/css";

import { ExtractNames } from "@core/utils/classes";

import { HvSnackbarContent, HvSnackbarContentProps } from "../SnackbarContent";
import { staticClasses, useClasses } from "./SnackbarProvider.styles";
import { HvSnackbarVariant } from "../types";

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
  notistackClassesOverride?: Partial<ClassNameMap<CombinedClassKey>>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvSnackbarProviderClasses;
  className?: string;
}

export interface HvNotistackSnackMessageProps {
  /** Id to be applied to the root node. */
  id?: string;
  /** Classname to apply on the root node */
  className?: string;
  /** Your component tree. */
  message?: ReactNode | string;
  /** Variant of the snackbar. */
  variant?: HvSnackbarVariant;
  /** Extra values to pass to the snackbar. */
  snackbarContentProps?: HvSnackbarContentProps;
}

const HvNotistackSnackMessage = forwardRef<
  HTMLDivElement,
  HvNotistackSnackMessageProps
>(({ id, message, variant = "success", snackbarContentProps }, ref) => {
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
  const { enqueueSnackbar: enqueueNotistackSnackbar, closeSnackbar } =
    useSnackbar();
  const enqueueSnackbar = useCallback(
    (message: ReactNode | string | undefined, options = {}) => {
      const {
        id,
        variant = "success",
        snackbarContentProps,
        className,
        ...otherOptions
      }: HvNotistackSnackMessageProps = options;

      return enqueueNotistackSnackbar(
        <HvNotistackSnackMessage
          id={id}
          message={message}
          variant={variant}
          snackbarContentProps={snackbarContentProps}
        />,
        { ...otherOptions, className: clsx(className) }
      );
    },
    [enqueueNotistackSnackbar]
  );
  return useMemo(
    () => ({
      enqueueSnackbar,
      closeSnackbar,
    }),
    [enqueueSnackbar, closeSnackbar]
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
  ...others
}: HvSnackbarProviderProps) => {
  const { classes, cx } = useClasses(classesProp);

  const notistackClasses: Partial<ClassNameMap<CombinedClassKey>> = {
    containerRoot: css({
      pointerEvents: "all",
      "& > div > div": {
        // Overrides notistack extra padding
        padding: "0 !important",
        transition: "all 0s ease 0s !important",
      },
    }),
    ...notistackClassesOverride,
  };

  return (
    <SnackbarProvider
      classes={notistackClasses}
      maxSnack={maxSnack}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin as SnackbarOrigin}
      className={cx(classes.snackItemRoot, className)}
      {...others}
    >
      {children}
    </SnackbarProvider>
  );
};

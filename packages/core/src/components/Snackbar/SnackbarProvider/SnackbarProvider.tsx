import { forwardRef, useCallback, useMemo } from "react";
import { SnackbarContent, SnackbarProvider, useSnackbar } from "notistack";
import clsx from "clsx";
import styled from "@emotion/styled";
import HvSnackbarContentWrapper from "../SnackbarContentWrapper";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { HvSnackbarVariant } from "../Snackbar";
import { transientOptions } from "utils/transientOptions";
import { HvSnackbarContentWrapperProps } from "../SnackbarContentWrapper/SnackbarContentWrapper";

export type HvSnackbarProviderProps = {
  /** Your component tree. */
  children: React.ReactNode;
  /** Max visible snackbars. */
  maxSnack?: number;
  /** How much time the snackbar remains visible in milliseconds. */
  autoHideDuration?: number;
  /** Where is the snackbar placed. */
  anchorOrigin?: SnackbarOrigin;
  /** Class object used to override notistack classes. */
  notistackClassesOverride?: object;
};

export type HvNotistackSnackMessageProps = {
  /** Id to be applied to the root node. */
  id?: string;
  /** Classname to apply on the root node */
  className?: string;
  /** Your component tree. */
  message?: string;
  /** Variant of the snackbar. */
  variant?: HvSnackbarVariant;
  /** Extra values to pass to the snackbar. */
  snackbarContentProps?: HvSnackbarContentWrapperProps;
};

const HvNotistackSnackMessage = forwardRef<
  HTMLDivElement,
  HvNotistackSnackMessageProps
>(({ id, message, variant = "success", snackbarContentProps }, ref) => {
  return (
    <SnackbarContent ref={ref}>
      <HvSnackbarContentWrapper
        id={id}
        variant={variant}
        showIcon
        label={message}
        {...snackbarContentProps}
      />
    </SnackbarContent>
  );
});

const StyledRoot = styled(
  "div",
  transientOptions
)(({ $notistackClassesOverride }: { $notistackClassesOverride: object }) => ({
  "& .SnackbarContainer-root": {
    pointerEvents: "all",
    "& > div > div": {
      // Overrides notistack extra padding
      padding: "0 !important",
      transition: "all 0s ease 0s !important",
    },
  },
  ...$notistackClassesOverride,
}));

const StyledSnackbarProvider = styled(SnackbarProvider)({
  backgroundColor: "transparent !important",
  boxShadow: "none !important",
  "&&": {
    color: "inherit",
    padding: "0",
    fontSize: "inherit",
    boxShadow: "none",
    alignItems: "center",
    fontFamily: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    borderRadius: "0",
    letterSpacing: "inherit",
    backgroundColor: "inherit",
  },
});

// We override notistack hook to be able to customize the snackbar that should be called.
const useHvSnackbar = () => {
  const { enqueueSnackbar: enqueueNotistackSnackbar, closeSnackbar } =
    useSnackbar();
  const enqueueSnackbar = useCallback(
    (message, options = {}) => {
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

const HvSnackbarProvider = ({
  children,
  notistackClassesOverride = {},
  maxSnack = 5,
  autoHideDuration = 5000,
  anchorOrigin = {
    vertical: "top",
    horizontal: "right",
  },
  ...others
}) => {
  return (
    <StyledRoot $notistackClassesOverride={notistackClassesOverride}>
      <StyledSnackbarProvider
        maxSnack={maxSnack}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin as SnackbarOrigin}
        {...others}
      >
        {children}
      </StyledSnackbarProvider>
    </StyledRoot>
  );
};

export default HvSnackbarProvider;
export { useHvSnackbar };

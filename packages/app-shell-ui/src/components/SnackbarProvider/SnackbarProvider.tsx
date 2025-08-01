import { css } from "@emotion/css";
import {
  HvSnackbarProps,
  HvSnackbarProvider,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";

const snackbarClasses = {
  containerRoot: css`
    margin-top: ${theme.header.height};
  `,
};

interface SnackbarProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const { activeTheme } = useTheme();

  const isPentahoTheme = activeTheme?.name === "pentaho";
  const anchorOrigin: HvSnackbarProps["anchorOrigin"] = isPentahoTheme
    ? { vertical: "bottom", horizontal: "center" }
    : undefined;

  return (
    <HvSnackbarProvider
      anchorOrigin={anchorOrigin}
      notistackClassesOverride={anchorOrigin ? undefined : snackbarClasses}
    >
      {children}
    </HvSnackbarProvider>
  );
};

export default SnackbarProvider;

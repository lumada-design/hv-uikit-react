import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HvThemeStructure } from "@hitachivantara/uikit-styles";

export type MuiProviderProps = {
  theme: HvThemeStructure;
  mode: string;
  children: React.ReactNode;
};

export const MuiProvider = ({ theme, mode, children }: MuiProviderProps) => {
  const muiTheme = useMemo(() => {
    const colors = theme.colors.modes[mode];
    return createTheme({
      spacing: theme.space.base,
      typography: {
        fontFamily: theme.fontFamily.body,
      },
      palette: {
        primary: { main: colors.primary },
        success: { main: colors.positive },
        warning: { main: colors.warning },
        error: { main: colors.negative },
        info: { main: colors.info },
        text: {
          primary: colors.text,
          secondary: colors.textSubtle,
          disabled: colors.textDisabled,
        },
        background: {
          default: colors.bgPage,
          paper: colors.bgContainer,
        },
        divider: colors.border,
        action: {
          active: colors.primary,
          hover: colors.primaryStrong,
          selected: colors.primaryStrong,
          disabled: colors.textDisabled,
          disabledBackground: colors.bgDisabled,
        },
      },
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
      },
      breakpoints: theme.breakpoints,
    });
  }, [theme, mode]);

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

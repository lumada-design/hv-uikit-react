import {
  Breakpoint,
  Breakpoints,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { theme } from "..";

type Type = keyof Pick<Breakpoints, "down" | "up" | "only" | "not">;

export const useBreakpoints = (type: Type = "up") => {
  const muiTheme = useTheme();
  return (Object.keys(theme.breakpoints.values) as Breakpoint[])
    .reverse()
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: useMediaQuery(muiTheme.breakpoints[type](key)),
      }),
      {} as Record<Breakpoint, boolean>
    );
};

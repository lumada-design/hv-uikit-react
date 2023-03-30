import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { outlineStyles } from "utils";

export const StyledRoot = styled("div")({
  "& + root": {
    paddingTop: 8,
  },
});

export const StyledContainer = styled("div")(
  ({ hidden }: { hidden: boolean }) => ({
    paddingTop: 8,
    height: "auto",

    ...(hidden && {
      height: 0,
      display: "none",
    }),
  })
);

export const StyledLabel = styled(HvTypography)(
  ({ disabled }: { disabled?: boolean }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",

    ...(!disabled && {
      "&:hover": {
        background: theme.colors.atmo3,
      },
      "&:focus": {
        background: theme.colors.atmo3,
      },
    }),

    "&[disabled], &:active": {
      outline: "none",
    },

    "&:focus": {
      outline: "none",
    },

    "&:focus-visible": {
      ...outlineStyles,
    },

    // cursor
    cursor: "pointer",
    ...(disabled && {
      cursor: "not-allowed",
      color: theme.colors.secondary_60,
    }),
  })
);

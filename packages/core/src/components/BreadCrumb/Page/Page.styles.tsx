import { CSSInterpolation } from "@emotion/css";
import { outlineStyles } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";

export const styles = {
  link: {
    padding: `8px ${theme.space.xs}`,
    borderRadius: theme.radii.base,
    maxWidth: 170 + 16,
    textTransform: "capitalize",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.colors.atmo3,
    },
    "&:focus": {
      backgroundColor: theme.colors.atmo3,
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
} satisfies Record<string, CSSInterpolation>;

import styled from "@emotion/styled";
import { theme, themeVariant } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "../Focus/Focus.Styles";
import { ButtonSize, ButtonVariant, ButtonRadius } from "./Button";

export const StyledContentDiv = styled.div<{}>({
  display: "flex",
  alignItems: "center",
  height: "100%",
  overflow: "visible",
});

export const StyledIconSpan = styled.span<{}>({
  marginRight: theme.button.marginIconRight,
  marginLeft: theme.button.marginIconLeft,
});

export const StyledChildren = styled.span<{}>({
  whiteSpace: "nowrap",
  display: "flex",
});

export const StyledButton = styled.button<{
  variant: ButtonVariant;
  iconOnly: Boolean;
  size?: ButtonSize;
  radius?: ButtonRadius;
  overrideIconColors: Boolean;
}>(
  {
    display: "inline-flex",
    justifyContent: "center",
    textTransform: "none",
    "&:hover": {},
    "&:focus": {},
    "&:focus-visible": {
      ...outlineStyles,
    },
    "&:active": {},
    "&:disabled": {
      cursor: "not-allowed",
      pointerEvents: "auto",
    },
    cursor: "pointer",
    fontSize: theme.fontSizes.base,
    fontWeight: 600,
  },
  (props) =>
    props.overrideIconColors &&
    themeVariant({
      prop: "variant",
      variants: {
        primary: {
          "& svg .color0": {
            fill: theme.colors.atmo1,
          },
          "&:disabled": {
            "& svg .color0": {
              fill: theme.colors.atmo5,
            },
          },
        },
        primarySubtle: {
          "& svg .color0": {
            fill: theme.colors.acce2,
          },
          "&:disabled": {
            "& svg .color0": {
              fill: theme.colors.atmo5,
            },
          },
        },
        primaryGhost: {
          "& svg .color0": {
            fill: theme.colors.acce2,
          },
          "&:disabled": {
            "& svg .color0": {
              fill: theme.colors.atmo5,
            },
          },
        },
        secondarySubtle: {
          "& svg .color0": {
            fill: theme.colors.acce1,
          },
          "&:disabled": {
            "& svg .color0": {
              fill: theme.colors.atmo5,
            },
          },
        },
        secondaryGhost: {
          "& svg .color0": {
            fill: theme.colors.acce1,
          },
          "&:disabled": {
            "& svg .color0": {
              fill: theme.colors.atmo5,
            },
          },
        },
        semantic: {
          "& svg .color0": {
            fill: theme.colors.base2,
          },
          "&:disabled": {
            "& svg .color0": {
              fill: theme.colors.atmo5,
            },
          },
        },
      },
    }),
  themeVariant({
    prop: "variant",
    variants: {
      primary: {
        color: theme.colors.atmo1,
        backgroundColor: theme.colors.acce2,
        "&:hover": {
          backgroundColor: theme.colors.acce2h,
        },
        "&:disabled": {
          color: theme.colors.atmo5,
          backgroundColor: theme.colors.atmo3,
        },
        "&:focus-visible": {
          backgroundColor: theme.colors.acce2h,
        },
      },
      primarySubtle: {
        backgroundColor: "transparent",
        border: `1px solid ${theme.colors.acce2}`,
        color: theme.colors.acce2,
        "&:hover": {
          backgroundColor: theme.colors.atmo3,
        },
        "&:focus-visible": {
          backgroundColor: theme.colors.atmo3,
        },
        "&:disabled": {
          color: theme.colors.atmo5,
          backgroundColor: theme.colors.atmo3,
          border: `1px solid ${theme.colors.atmo4}`,
        },
      },
      primaryGhost: {
        color: theme.colors.acce2,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: theme.colors.atmo3,
        },
        "&:focus-visible": {
          backgroundColor: theme.colors.atmo3,
        },
        "&:disabled": {
          color: theme.colors.atmo5,
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
      secondarySubtle: {
        color: theme.colors.acce1,
        backgroundColor: "transparent",
        border: `1px solid ${theme.colors.atmo4}`,
        "&:hover": {
          backgroundColor: theme.colors.atmo3,
          border: `1px solid ${theme.colors.atmo4}`,
        },
        "&:focus-visible": {
          backgroundColor: theme.colors.atmo3,
        },
        "&:disabled": {
          color: theme.colors.atmo5,
          backgroundColor: theme.colors.atmo3,
          border: `1px solid ${theme.colors.atmo4}`,
        },
      },
      secondaryGhost: {
        color: theme.colors.acce1,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: theme.colors.atmo3,
        },
        "&:focus-visible": {
          backgroundColor: theme.colors.atmo3,
        },
        "&:disabled": {
          color: theme.colors.atmo5,
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
      semantic: {
        color: theme.colors.base2,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: theme.button.semanticColor,
        },
        "&:disabled": {
          color: theme.colors.atmo5,
          backgroundColor: theme.button.semanticColorDisabled,
        },
      },
    },
  }),

  themeVariant({
    prop: "size",
    variants: {
      xs: {
        height: theme.sizes.xs,
        paddingLeft: theme.space.xs,
        paddingRight: theme.space.xs,
        fontSize: theme.fontSizes.xs,
      },
      sm: {
        height: theme.sizes.sm,
        paddingLeft: theme.space.sm,
        paddingRight: theme.space.sm,
        fontSize: theme.fontSizes.sm,
      },
      md: {
        height: theme.sizes.md,
        paddingLeft: theme.space.md,
        paddingRight: theme.space.md,
      },
      lg: {
        height: theme.sizes.lg,
        paddingLeft: theme.space.lg,
        paddingRight: theme.space.lg,
        fontSize: theme.fontSizes.lg,
      },
      xl: {
        height: theme.sizes.xl,
        paddingLeft: theme.space.xl,
        paddingRight: theme.space.xl,
        fontSize: theme.fontSizes.xl,
      },
    },
  }),
  themeVariant({
    prop: "radius",
    variants: {
      xs: {
        borderRadius: theme.radii.xs,
      },
      sm: {
        borderRadius: theme.radii.sm,
      },
      md: {
        borderRadius: theme.radii.md,
      },
      lg: {
        borderRadius: theme.radii.lg,
      },
      xl: {
        borderRadius: theme.radii.xl,
      },
      none: {
        borderRadius: theme.radii.none,
      },
      base: {
        borderRadius: theme.radii.base,
      },
    },
  }),
  themeVariant({
    prop: "iconOnly",
    variants: {
      true: {
        margin: 0,
        padding: 0,
        width: theme.sizes.sm,
        height: theme.sizes.sm,
      },
      false: {
        minWidth: "70px",
      },
    },
  })
);

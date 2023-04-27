import { clsx } from "clsx";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { CSSProperties } from "react";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledRoot = styled(
  "div",
  transientOptions
)(({ $vertical }: { $vertical: boolean }) => ({
  display: "flex",
  height: 32,
  alignItems: "center",
  transition: "none",
  background: theme.colors.atmo2,
  position: "relative",
  zIndex: 0,

  // prevent the focus ring to be hidden by sibling hover background
  "&>.HvIsFocusVisible": {
    zIndex: 5,
  },

  ...($vertical && {
    flexDirection: "column",
    height: "auto",
    btnSecondary: {
      flex: "1 1 20px",
    },
    "& button.button": {
      width: "100%",
      borderLeft: `solid 1px ${theme.colors.atmo4}`,
      borderRight: `solid 1px ${theme.colors.atmo4}`,
      borderTop: "solid 1px transparent",
      borderBottom: "solid 1px transparent",
      "&:disabled": {
        color: theme.colors.secondary_60,
        borderLeft: `solid 1px ${theme.colors.atmo4}`,
        borderRight: `solid 1px ${theme.colors.atmo4}`,
        borderTop: "solid 1px transparent",
        borderBottom: "solid 1px transparent",
        "&:hover": {
          borderLeft: `solid 1px ${theme.colors.atmo4}`,
          borderRight: `solid 1px ${theme.colors.atmo4}`,
          borderTop: "solid 1px transparent",
          borderBottom: "solid 1px transparent",
        },
      },
      "&:first-of-type": {
        borderTop: `solid 1px ${theme.colors.atmo4}`,
        borderTopLeftRadius: "2px",
        borderTopRightRadius: "2px",
        "&:disabled:hover": {
          borderTop: `solid 1px ${theme.colors.atmo4}`,
        },
      },
      "&:last-child": {
        borderBottom: `solid 1px ${theme.colors.atmo4}`,
        borderBottomLeftRadius: "2px",
        borderBottomRightRadius: "2px",
        "&:disabled:hover": {
          borderBottom: `solid 1px ${theme.colors.atmo4}`,
        },
      },
      "&:not(:first-of-type)": {
        marginLeft: 0,
        marginTop: -1,
      },
      "&.selected": {
        height: 32,
        width: `calc(100% + 2px) !important`,
        background: theme.colors.atmo1,
        ...(theme.typography.label as CSSProperties),
        borderRadius: theme.radii.base,
        border: `solid 1px ${theme.colors.secondary}`,
        zIndex: 2,
        "&:hover, &:focus": {
          background: theme.colors.atmo3,
        },
        "&:disabled": {
          zIndex: 1,
          color: theme.colors.secondary_60,
          background: theme.colors.atmo1,
          border: `solid 1px ${theme.colors.atmo4}`,
        },
      },
    },
  }),
}));

export const StyledButton = (Element) =>
  styled(({ className }) => (
    <Element.type
      {...Element.props}
      className={clsx(
        "button",
        Element.props.selected && "selected",
        className
      )}
    />
  ))({
    height: 32,
    width: "100%",
    minWidth: 32,
    maxWidth: 200,
    padding: 0,
    transition: "none",
    flex: "1 0 0px",
    borderTop: `solid 1px ${theme.colors.atmo4}`,
    borderBottom: `solid 1px ${theme.colors.atmo4}`,
    borderLeft: "solid 1px transparent",
    borderRight: "solid 1px transparent",
    borderRadius: 0,
    backgroundColor: theme.colors.atmo2,
    ":disabled": { backgroundColor: theme.multiButton.disabledBackgroundColor },
    ":hover": {
      borderTop: `solid 1px ${theme.colors.atmo4}`,
      borderBottom: `solid 1px ${theme.colors.atmo4}`,
      borderLeft: "solid 1px transparent",
      borderRight: "solid 1px transparent",
    },
    ...(theme.typography.body as CSSProperties),
    "&:active": {
      backgroundColor: `${theme.colors.atmo3}`,
    },
    "&:disabled": {
      color: theme.colors.secondary_60,
      borderTop: `solid 1px ${theme.colors.atmo4}`,
      borderBottom: `solid 1px ${theme.colors.atmo4}`,
      "&:hover": {
        borderTop: `solid 1px ${theme.colors.atmo4}`,
        borderBottom: `solid 1px ${theme.colors.atmo4}`,
        borderLeft: "solid 1px transparent",
        borderRight: "solid 1px transparent",
      },
    },
    "&:first-of-type": {
      borderLeft: `solid 1px ${theme.colors.atmo4}`,
      borderTopLeftRadius: theme.radii.base,
      borderBottomLeftRadius: theme.radii.base,
      "&:disabled:hover": {
        borderLeft: `solid 1px ${theme.colors.atmo4}`,
      },
    },
    "&:last-child": {
      borderRight: `solid 1px ${theme.colors.atmo4}`,
      borderTopRightRadius: theme.radii.base,
      borderBottomRightRadius: theme.radii.base,
      "&:disabled:hover": {
        borderRight: `solid 1px ${theme.colors.atmo4}`,
      },
    },
    "&:not(:first-of-type)": {
      marginLeft: "-1px",
    },
    "&.selected": {
      background: theme.colors.atmo1,
      height: 34,
      ...(theme.typography.label as CSSProperties),
      border: `solid 1px ${theme.colors.secondary}`,
      zIndex: 2,
      "&:hover": {
        background: theme.colors.atmo3,
        "&:not(:disabled)": {
          border: `solid 1px ${theme.colors.secondary}`,
        },
        "&:disabled": {
          border: `solid 1px ${theme.colors.atmo4}`,
        },
      },
      "&:first-of-type, &:last-child": {
        border: `solid 1px ${theme.colors.secondary}`,
      },

      // prevent the focus ring to be hidden by sibling hover background
      // even when selected
      "&.HvIsFocusVisible": {
        zIndex: 5,
      },
      "&:disabled": {
        zIndex: 1,
        color: theme.colors.secondary_60,
        background: theme.colors.atmo1,
        border: `solid 1px ${theme.colors.atmo4}`,
      },
    },
  });

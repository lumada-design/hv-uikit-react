import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  item: css({
    width: "100%",
    cursor: "move",
    "& p": {
      fontWeight: "bold",
      color: theme.colors.secondary_80,
    },
  }),
  selected: css({
    background: theme.colors.primary_20,
    border: `1px solid ${theme.colors.atmo3}`,
  }),
  grid: css({
    "& p": {
      textAlign: "center",
      marginTop: 5,
    },
  }),
  list: css({
    marginBottom: 10,
    "& p": {
      marginBottom: 5,
    },
  }),
  icon: css({
    border: `1px solid ${theme.colors.atmo3}`,
    borderRadius: theme.radii.round,
    padding: theme.space.xs,
    "&:hover": {
      background: theme.colors.primary_20,
      border: `1px solid ${theme.colors.atmo3}`,
    },
  }),
  iconGrid: css({
    height: 50,
  }),
  iconList: css({
    height: 40,
  }),
  placeholder: css({
    width: "100%",
    height: "100%",
    background: theme.colors.atmo2,
  }),
};

export default styles;

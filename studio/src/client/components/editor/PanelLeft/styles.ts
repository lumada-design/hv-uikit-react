import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  panelLeft: css({
    display: "flex",
  }),
  navBar: css({
    display: "flex",
    width: 55,
    flexDirection: "column",
    rowGap: theme.space.xs,
    padding: `${theme.space.sm} ${theme.space.xs}`,
    background: theme.colors.atmo1,
  }),
  // panelLeft: css({
  //   width: 250,
  // }),
  // panelLeftField: css({
  //   all: "unset",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: 50,
  //   width: 250,
  //   borderBottom: "1px solid black",
  //   cursor: "pointer",
  //   userSelect: "none",
  // }),
  // overlay: css({
  //   background: "black",
  //   color: "white",
  // }),
};

export default styles;

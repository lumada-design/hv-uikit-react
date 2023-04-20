import { css } from "@emotion/css";
// import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  root: css({
    display: "flex",
    flexDirection: "row",
    gap: 40,
    marginTop: 20,
  }),
  section: css({
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }),
  subSection: css({
    marginBottom: 20,
    marginTop: 20,
  }),
  title: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
  tool: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  }),
  toolTitle: css({
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginRight: 20,
    minWidth: 140,
  }),
};

export default styles;

import { detect } from "detect-browser";

const { name: browser } = detect();

export const outlineStyles = {
  outlineColor: "Highlight",
  outlineStyle: ["ie", "edge"].includes(browser) ? "solid" : "auto",
  outlineWidth: 4,
  outlineOffset: -2
};

const styles = theme => ({
  root: {
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    lineHeight: "50px",
    margin: "40px 0 30px",
    paddingBottom: "5px"
  },
  titleContainer: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center"
  },
  content: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    marginBottom: "30px"
  },
  component: {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    padding: "20px"
  }
});

export default styles;

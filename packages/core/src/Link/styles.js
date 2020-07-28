import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  a: {
    ...theme.hv.typography.link,
    textDecoration: "none",
    "&:focus": { ...outlineStyles }
  }
});

export default styles;

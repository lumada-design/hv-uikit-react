import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  a: {
    ...theme.hv.typography.inlineLink,
    textDecoration: "none",
    "&:focus": { ...outlineStyles }
  }
});

export default styles;

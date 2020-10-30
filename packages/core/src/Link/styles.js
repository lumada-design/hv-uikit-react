import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  a: {
    ...theme.hv.typography.link,
    "&.focus-visible": { ...outlineStyles },
  },
});

export default styles;

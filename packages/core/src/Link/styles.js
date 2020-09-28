import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  a: {
    ...theme.hv.typography.link,
    "&:focus": { ...outlineStyles },
  },
});

export default styles;

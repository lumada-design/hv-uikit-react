const styles = (theme) => ({
  root: {
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    margin: `${theme.hv.spacing.xs}px 0 0`,
    padding: `${theme.hv.spacing.xs}px ${theme.hv.spacing.sm}px  0`,
  },
  label: {
    marginBottom: `5px`,
  },
  ul: {
    paddingInlineStart: 0,
    margin: 0,
    "& > :not(:last-child)": {
      paddingBottom: "8px",
    },
  },
});

export default styles;

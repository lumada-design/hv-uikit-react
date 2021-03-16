const styles = (theme) => ({
  root: {},
  button: {
    "&:not(:last-child)": {
      marginRight: theme.hvSpacing("xs"),
    },
  },
  actionContainer: {
    display: "flex",
    float: "right",
  },
  dropDownMenu: {},
  dropDownMenuButton: {},
  dropDownMenuButtonSelected: {},
});

export default styles;

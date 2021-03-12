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
  dropdownContainer: {
    width: 32,
  },
  dropDownMenu: {},
  dropDownMenuButton: {},
  dropDownMenuButtonSelected: {},
});

export default styles;

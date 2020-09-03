const styles = theme => ({
  root: {},
  button: {
    "&:not(:last-child)": {
      marginRight: theme.spacing("xs")
    }
  },
  actionContainer: {
    display: "flex",
    float: "right"
  },
  dropDownMenu: {},
  dropDownMenuButton: {},
  dropDownMenuButtonSelected: {}
});

export default styles;

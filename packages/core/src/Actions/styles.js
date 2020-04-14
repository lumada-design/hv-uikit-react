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
  dropDownMenuIcon: {}
});

export default styles;

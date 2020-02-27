const styles = theme => ({
  button: {
    "&:not(:last-child)": {
      marginRight: theme.spacing("xs")
    }
  },
  actionContainer: {
    display: "flex"
  },
  dropDownMenu: {},
  dropDownMenuIcon: {
    width: "32px",
    height: "32px"
  }
});

export default styles;

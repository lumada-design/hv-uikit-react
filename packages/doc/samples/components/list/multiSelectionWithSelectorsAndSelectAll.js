import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "Arhauss is somewhere",
    selected: false
  },
  {
    label: "Allentown is not are 51",
    selected: false
  },
  {
    label: "Bergamo where you can eat",
    selected: true
  },
  {
    label: "Bergen city",
    selected: false
  },
  {
    label: "Boston of the Seven Seas",
    selected: false
  }
];

const styles = theme => ({
  wrapper: {
    width: 240,
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

const ListWrapper = withStyles(styles, { withTheme: true })(
  ({ classes, children }) => <div className={classes.wrapper}>{children}</div>
);

export default (
  <ListWrapper>
    <List values={data} multiSelect={true} showSelectAll useSelector />
  </ListWrapper>
);
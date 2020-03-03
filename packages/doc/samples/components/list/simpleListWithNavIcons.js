import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "Today",
    showNavIcon: true
  },
  {
    label: "Yesterday"
  },
  {
    label: "Last week"
  },
  {
    label: "Last month"
  },
  {
    label: "Last year",
    showNavIcon: true
  }
];

const styles = theme => ({
  wrapper: {
    width: 200,
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

const ListWrapper = withStyles(styles)(({ classes, children }) => (
  <div className={classes.wrapper}>{children}</div>
));

// Passing the aria-label to the component is necessary in order for the component
// to meet accessibility requirements
const ariaProps = {
  "aria-label": "Simple List with Navicons Title"
};

export default (
  <ListWrapper>
    <List values={data} selectable={false} listProps={ariaProps} Ω />
  </ListWrapper>
);

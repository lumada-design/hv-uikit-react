import React from "react";
import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "Share"
  },
  {
    label: "Edit"
  },
  {
    label: "Remove"
  },
  {
    label: "Delete"
  },
  {
    label: "Update"
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
  "aria-label": "Simple Condensed List Title"
};

export default (
  <ListWrapper>
    <List values={data} selectable={false} condensed listProps={ariaProps} />
  </ListWrapper>
);

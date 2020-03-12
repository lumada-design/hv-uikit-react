import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
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
    label: "Updateaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
];

const styles = theme => ({
  wrapper: {
    width: 240,
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
  "aria-label": "Single Selection List Title"
};

export default (
  <ListWrapper>
    <List values={data} selectDefault hasTooltips listProps={ariaProps} />
  </ListWrapper>
);

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  { label: "Share" },
  { label: "Edit" },
  { label: "Remove" },
  { label: "Delete" },
  { label: "Update" }
];

const styles = theme => ({
  root: {
    width: 200,
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

const StyledList = withStyles(styles)(List);

const otherProps = {
  id: "list",
  "aria-label": "Simple Condensed List Title"
};

export default <StyledList values={data} selectable={false} condensed {...otherProps} />;

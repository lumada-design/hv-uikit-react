import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  { label: "98001, Store Manager" },
  { label: "98002, Store Manager" },
  { label: "98003, Store Manager" },
  { label: "98004, Store Manager", disabled: true },
  { label: "98005, Store Manager" }
];

const styles = theme => ({
  root: {
    width: 240,
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

const StyledList = withStyles(styles)(List);

const otherProps = {
  id: "list",
  "aria-label": "Single Selection List Title"
};

export default <StyledList values={data} selectDefault useSelector {...otherProps} />;

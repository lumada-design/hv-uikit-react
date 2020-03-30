import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  { label: "Today", showNavIcon: true },
  { label: "Yesterday" },
  { label: "Last week" },
  { label: "Last month" },
  { label: "Last year", showNavIcon: true }
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
  "aria-label": "Simple List with Navicons Title"
};

export default <StyledList values={data} selectable={false} {...otherProps} />;

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  { label: "Arhauss is somewhere", selected: false },
  { label: "Allentown is not are 51", selected: false },
  { label: "Bergamo where you can eat", selected: true },
  { label: "Bergen city", selected: false },
  { label: "Boston of the Seven Seas", selected: false }
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
  "aria-label": "Multi Selection List with Selectors and Select All Title"
};

export default <StyledList values={data} multiSelect showSelectAll useSelector {...otherProps} />;

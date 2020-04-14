import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  { id: "1", label: "Arhauss is somewhere", selected: false },
  { id: "2", label: "Allentown is not are 51", selected: false },
  { id: "3", label: "Bergamo where you can eat", selected: true },
  { id: "4", label: "Bergen city", disabled: true, selected: false },
  { id: "5", label: "Boston of the Seven Seas", selected: false }
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
  "aria-label": "Multi Selection List with Selectors Title"
};

export default <StyledList values={data} multiSelect useSelector {...otherProps} />;

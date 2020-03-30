import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  { label: "Share", disabled: true },
  { label: "Edit" },
  { label: "Remove", path: "https://www.hitachivantara.com" },
  { label: "Delete" },
  { label: "Update", path: "https://www.hitachivantara.com" }
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
  "aria-label": "Simple Non Selectable List Title"
};

export default <StyledList values={data} selectable={false} {...otherProps} />;

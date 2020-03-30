import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  { label: "Share" },
  { label: "Edit" },
  { label: "Remove" },
  { label: "Delete" },
  { label: "Updateaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }
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

export default (
  <>
    <button type="button" id="anchorButton" tabIndex={0}>
      Anchor
    </button>
    <StyledList values={data} hasTooltips {...otherProps} />
  </>
);

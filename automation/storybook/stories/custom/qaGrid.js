import React from "react";
import PropTypes from "prop-types";
import Grid from "@hv/uikit-react-core/dist/Grid";

const QaGrid = ({ children }) => (
  <Grid
    container
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white"
    }}
  >
    <Grid item style={{ margin: "auto" }} justify="space-between">
      {children}
    </Grid>
  </Grid>
);

QaGrid.propTypes = {
  children: PropTypes.node.isRequired
};

export default QaGrid;

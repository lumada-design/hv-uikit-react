import React from "react";
import Grid from "@hv/uikit-react-core/dist/Grid";

const QaGrid = ({children}) => (
  <Grid container style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white" }}>
    <Grid item style={{ margin: "auto"}} >
      {children}
    </Grid>
  </Grid>
);

export default QaGrid;
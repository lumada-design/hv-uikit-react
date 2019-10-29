import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";
import Lock from "@hv/uikit-react-icons/dist/Generic/Lock";
import Unlock from "@hv/uikit-react-icons/dist/Generic/Unlock";

const styles = () => ({
  rootS: {
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    "&>svg": {
      margin: "0 auto"
    }
  }
});

const StyledLock = withStyles(styles, { withTheme: true })(Lock);
const StyledUnlock = withStyles(styles, { withTheme: true })(Unlock);

export default (
  <ToggleButton
    notSelectedIcon={StyledUnlock}
    notSelectedTitle="Open"
    selectedIcon={StyledLock}
    selectedTitle="Closed"
  />
);

import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@hv/uikit-react-core/dist/Button";
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

const ToggleButtonControl = () => {
  const [select, setSelect] = useState(true);

  const toggleState = () => setSelect(!select);

  const label = select ? "Selected" : "Not Selected";

  return (
    <>
      <Button style={{ marginBottom: "12px" }} onClick={toggleState}>{label}</Button>
      <div>
        <ToggleButton
          selected={select}
          notSelectedIcon={StyledUnlock}
          notSelectedTitle="Open"
          selectedIcon={StyledLock}
          selectedTitle="Closed"
          onClick={toggleState}
        />
      </div>
    </>
  );
};

export default <ToggleButtonControl />;

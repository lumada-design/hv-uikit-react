import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvButton from "@hv/uikit-react-core/dist/Button";
import {
  Download,
  Play,
  Pause,
  Stop
} from "@hv/uikit-react-icons/dist/Generic";

const buttonStyles = () => ({
  root: { margin: "10px 20px" }
});

const boxStyles = {
  width: 32,
  height: 30
};

const icon = <Download boxStyles={boxStyles} />;
const Button = withStyles(buttonStyles, { withTheme: true })(HvButton);

export default (
  <>
    <Button startIcon={<Play boxStyles={boxStyles} />} category="ghost">
      Play
    </Button>
    <Button startIcon={<Pause boxStyles={boxStyles} />} category="ghost">
      Pause
    </Button>
    <Button startIcon={<Stop boxStyles={boxStyles} />} category="ghost">
      Stop
    </Button>
    <br />
    <Button startIcon={icon} category="primary">
      Download plug-in
    </Button>
    <Button style={{ width: 260 }} startIcon={icon} category="secondary">
      Download
    </Button>
    <Button startIcon={icon} category="ghost">
      Download
    </Button>
    <Button startIcon={icon} category="ghostSecondary">
      Download
    </Button>
    <div style={{ display: "inline-block", background: "#D3E3F6" }}>
      <Button startIcon={icon} category="semantic">
        Download
      </Button>
    </div>
  </>
);

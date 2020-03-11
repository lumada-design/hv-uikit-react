import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvButton from "@hv/uikit-react-core/dist/Button";
import { Download, Play, Pause, Stop } from "@hv/uikit-react-icons/dist";

const buttonStyles = () => ({
  root: {
    margin: "10px 20px"
  }
});

const Button = withStyles(buttonStyles)(HvButton);

export default (
  <>
    <Button category="icon">
      <Play />
    </Button>
    <Button category="icon">
      <Pause />
    </Button>
    <Button category="icon">
      <Stop />
    </Button>
    <br />
    <Button startIcon={<Play />} category="ghost">
      Play
    </Button>
    <Button startIcon={<Pause />} category="ghost">
      Pause
    </Button>
    <Button startIcon={<Stop />} category="ghost">
      Stop
    </Button>
    <br />
    <Button startIcon={<Download />} category="primary">
      Download plug-in
    </Button>
    <Button style={{ width: 260 }} startIcon={<Download />} category="secondary">
      Download
    </Button>
    <Button startIcon={<Download />} category="ghost">
      Download
    </Button>
    <Button startIcon={<Download />} category="ghostSecondary">
      Download
    </Button>
    <div style={{ display: "inline-block", background: "#D3E3F6" }}>
      <Button startIcon={<Download />} category="semantic">
        Download
      </Button>
    </div>
  </>
);

/* eslint-disable react/prop-types */
import React from "react";
import { HvOverflowTooltip } from "../..";
import { RawOverflowTooltip } from "../OverflowTooltip";

export default {
  title: "Components/Overlay/Overflow Tooltip",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvOverflowTooltip } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: RawOverflowTooltip,
};

export const Main = () => {
  const styling = {
    container: {
      display: "flex",
    },
    textContainer: {
      display: "flex",
      textAlign: "center",
      justifyContent: "space-between",
      maxWidth: 200,
      overflow: "hidden",
      textOverflow: "ellipsis",
      margin: "0 auto",
      paddingTop: 80,
    },
  };

  const longText =
    "This is a very long text that should be cut because it so long that it doesn't fit";
  const shortText = "This text is short";
  return (
    <div style={styling.container}>
      <div style={styling.textContainer}>
        <HvOverflowTooltip data={longText} />
      </div>
      <div style={styling.textContainer}>
        <HvOverflowTooltip data={shortText} />
      </div>
      <div style={styling.textContainer}>
        <HvOverflowTooltip data={longText} placement="top" open />
      </div>
    </div>
  );
};

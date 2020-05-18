import React from "react";

import { HvAvatar } from "@hv/uikit-react-core/dist";

import man1 from "./resources/man-1.png";
import man2 from "./resources/man-2.png";
import woman1 from "./resources/woman-1.png";
import woman2 from "./resources/woman-2.png";

const exampleStyles = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "300px",
  padding: "0",
  alignItems: "center",
  justifyContent: "space-evenly",
};

export default (
  <div style={exampleStyles}>
    <HvAvatar alt="Ben" src={man1} />
    <HvAvatar alt="Beatrice" src={woman1} />
    <HvAvatar alt="Wayne" src={man2} />
    <HvAvatar alt="Clara Soul" src={woman2} />
  </div>
);

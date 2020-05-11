import React from "react";

import { HvAvatar } from "@hv/uikit-react-core/dist";

import HvButton from "@hv/uikit-react-core/dist/Button";

import { LogIn } from "@hv/uikit-react-icons/dist/Generic";

import woman2 from "./resources/woman-2.png";

const exampleStyles = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "300px",
  padding: "0",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const AvatarButton = ({ children, ...other }) => (
  <HvButton aria-label="Open the user profile" category="icon" {...other}>
    {children}
  </HvButton>
);

const doAlert = () => alert("Avatar clicked");

export default (
  <div style={exampleStyles}>
    <HvAvatar id="default_icon" component={AvatarButton} onClick={doAlert} />
    <HvAvatar
      id="letters"
      backgroundColor="sema19"
      component={AvatarButton}
      onClick={doAlert}
    >
      BM
    </HvAvatar>
    <HvAvatar
      id="image"
      alt="Clara Soul"
      src={woman2}
      component={AvatarButton}
      onClick={doAlert}
    />
    <HvAvatar
      id="icon"
      backgroundColor="sema1"
      component={AvatarButton}
      onClick={doAlert}
    >
      <LogIn color={["atmo1"]} iconSize="XS" />
    </HvAvatar>
  </div>
);

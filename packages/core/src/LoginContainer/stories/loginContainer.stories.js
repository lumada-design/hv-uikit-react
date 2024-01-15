import React from "react";
import clsx from "clsx";
import { HvButton, HvTypography, HvLabel, HvBaseInput, HvLoginContainer, HvDropdown } from "../..";
import customBackground from "./background-custom.jpg";
import useStyles from "./styles";

export default {
  title: "Components/LoginContainer",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvLoginContainer } from "@hitachivantara/uikit-react-core";',
  },
  component: HvLoginContainer,
  decorators: [(storyFn) => <div style={{ display: "flex", height: "100vh" }}>{storyFn()}</div>],
};

export const Main = () => {
  const classes = useStyles();

  return (
    <HvLoginContainer>
      <div className={classes.root}>
        <HvTypography variant="mTitle">Welcome</HvTypography>

        <HvLabel id="username-label" label="Username" classes={{ root: classes.input }}>
          <HvBaseInput id="username-input" placeholder="Enter text" />
        </HvLabel>

        <HvLabel id="password-label" label="Password" classes={{ root: classes.input }}>
          <HvBaseInput
            id="password-input"
            placeholder="Enter text"
            inputProps={{ type: "password" }}
          />
        </HvLabel>

        <HvButton
          type="submit"
          category="primary"
          className={clsx(classes.submit, classes.sentenceCase)}
        >
          Login
        </HvButton>
      </div>
    </HvLoginContainer>
  );
};

export const CustomBackground = () => {
  const classes = useStyles();

  return (
    <HvLoginContainer customBackground={customBackground}>
      <div className={classes.root}>
        <HvTypography variant="mTitle">Welcome</HvTypography>

        <HvLabel id="username-label" label="Username" classes={{ root: classes.input }}>
          <HvBaseInput id="username-input" placeholder="Enter text" />
        </HvLabel>

        <HvLabel id="domain-label" label="Domain" classes={{ root: classes.input }}>
          <HvDropdown
            id="domain-dropdown"
            values={[
              { id: "id-1", label: "Domain 1" },
              { id: "id-2", label: "Domain 2" },
              { id: "id-3", label: "Domain 3" },
              { id: "id-4", label: "Domain 4" },
            ]}
          />
        </HvLabel>

        <HvButton
          type="submit"
          category="primary"
          className={clsx(classes.submit, classes.sentenceCase)}
        >
          Login
        </HvButton>
      </div>
    </HvLoginContainer>
  );
};

CustomBackground.story = {
  parameters: {
    docs: {
      storyDescription: "Login container with custom background.",
    },
  },
};

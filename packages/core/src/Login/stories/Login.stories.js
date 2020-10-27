import React from "react";
import clsx from "clsx";
import { HvButton, HvTypography, HvInput, HvLogin, HvDropdown } from "../..";
import customBackground from "./background-custom.jpg";
import useStyles from "./styles";

export default {
  title: "Components/Login Container",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvLogin } from '@hv/uikit-react-core/dist'",

    dsVersion: "3.2.1",
  },
  component: HvLogin,
  decorators: [(storyFn) => <div style={{ display: "flex", height: "100vh" }}>{storyFn()}</div>],
};

export const Main = () => {
  const classes = useStyles();

  return (
    <HvLogin>
      <div className={classes.root}>
        <HvTypography variant="mTitle">Welcome</HvTypography>

        <HvInput
          name="username"
          label="Username"
          placeholder="Enter text"
          classes={{ root: classes.input }}
        />

        <HvInput
          name="password"
          label="Password"
          placeholder="Enter text"
          type="password"
          classes={{ root: classes.input }}
        />

        <HvButton
          type="submit"
          category="primary"
          className={clsx(classes.submit, classes.sentenceCase)}
        >
          Login
        </HvButton>
      </div>
    </HvLogin>
  );
};

export const CustomBackground = () => {
  const classes = useStyles();

  return (
    <HvLogin customBackground={customBackground} className={classes.customBackgroundPosition}>
      <div className={classes.root}>
        <HvTypography variant="mTitle">Welcome</HvTypography>

        <HvInput
          name="username"
          label="Username"
          placeholder="Enter text"
          classes={{ root: classes.input }}
        />

        <HvDropdown
          name="domain"
          label="Domain"
          classes={{
            root: classes.input,
            dropdown: classes.dropdownWidthFix,
            rootList: classes.dropdownWidthFix,
          }}
          values={[
            { id: "id-1", label: "Domain 1" },
            { id: "id-2", label: "Domain 2" },
            { id: "id-3", label: "Domain 3" },
            { id: "id-4", label: "Domain 4" },
          ]}
        />

        <HvButton
          type="submit"
          category="primary"
          className={clsx(classes.submit, classes.sentenceCase)}
        >
          Login
        </HvButton>
      </div>
    </HvLogin>
  );
};

CustomBackground.story = {
  parameters: {
    docs: {
      storyDescription: "Login container with custom background.",
    },
  },
};

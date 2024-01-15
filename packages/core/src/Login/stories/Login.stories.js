import React from "react";
import { HvLogin } from "../..";
import backgroundImage from "../resources/background.jpg";
import logoImage from "../resources/Hitachi-logo.png";

export default {
  title: "Components/Login",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvLogin } from "@hitachivantara/uikit-react-core";',
    deprecated: true,
    compNameToUse: "HvLoginContainer component.",
  },
  component: HvLogin,
  decorators: [(storyFn) => <div style={{ display: "flex", height: "100vh" }}>{storyFn()}</div>],
};

const callSimulation = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const callSimulationError = () =>
  new Promise(() => {
    throw new Error("error");
  });

export const Main = () => (
  <HvLogin login={callSimulation} recovery={callSimulation} id="test" allowRecover />
);

export const Successful = () => (
  <HvLogin login={callSimulation} recovery={callSimulation} id="test" allowRecover />
);

Successful.story = {
  parameters: {
    docs: {
      storyDescription: "Login sample with a successful result on login attempt",
    },
  },
};

export const Unsuccessful = () => (
  <HvLogin
    login={callSimulationError}
    recovery={callSimulationError}
    id="test"
    allowRecover
    labels={{ incorrectCredentialsMessage: "Error!", loginButtonLabel: "Login" }}
  />
);

Unsuccessful.story = {
  parameters: {
    docs: {
      storyDescription: "Login sample with an error result on login attempt",
    },
  },
};

export const NoRememberCredentials = () => (
  <HvLogin
    login={callSimulation}
    recovery={callSimulation}
    allowRecover={false}
    allowRememberMe={false}
  />
);

NoRememberCredentials.story = {
  parameters: {
    docs: {
      storyDescription: 'Without "Forgot Your Credentials" or "Remember Me"',
    },
  },
};

export const CustomLabels = () => (
  <HvLogin
    login={callSimulation}
    recovery={callSimulation}
    labels={{
      titleText: "Title text",
      recoveryTitle: "Recovery title",
      userNameInputLabel: "Username label",
      userNamePlaceHolder: "User placeholder",
      passwordInputLabel: "Password input label",
      passwordPlaceHolder: "Password placeholder",
      rememberMeLabel: "Remember me label",
      loginButtonMessage: "Log message",
    }}
  />
);

CustomLabels.story = {
  parameters: {
    docs: {
      storyDescription: "Login overriding some default labels",
    },
  },
};

export const CustomBackground = () => (
  <HvLogin
    login={callSimulation}
    recovery={callSimulation}
    backgroundImage={backgroundImage}
    backgroundImageSize="100%"
  />
);

export const CustomMessage = () => (
  <HvLogin
    login={callSimulation}
    allowRecover={false}
    allowRememberMe={false}
    customMessage={{
      text: "Here is some message.\nErrors will override it. Log in for error.",
    }}
  />
);

export const TenantBrand = () => <HvLogin login={callSimulation} logo={logoImage} />;

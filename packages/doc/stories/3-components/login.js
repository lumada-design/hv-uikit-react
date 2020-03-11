import React from "react";
import { storiesOf } from "@storybook/react";
import HvLogin from "@hv/uikit-react-core/dist/Login";

storiesOf("Components", module).add("Login", () => <HvLogin />, {
  title: "Login",
  description: "Login form with the capability for recovery of lost credentials.",
  usage: "import { HvLogin } from '@hv/uikit-react-core/dist/Login'",
  examples: [
    {
      title: "1. Successful requests",
      src: "components/login/login1"
    },
    {
      title: "2. Unsuccessful requests",
      src: "components/login/login2"
    },
    {
      title: "3. Without Forgot Your Credentials and Remember me",
      src: "components/login/login3"
    },
    {
      title: "4. Custom Labels",
      src: "components/login/login4"
    },
    {
      title: "5. Custom Background",
      src: "components/login/login5"
    },
    {
      title: "6. Custom initial message",
      src: "components/login/login6"
    },
    {
      title: "7. Tenant brand",
      src: "components/login/login7"
    }
  ]
});

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import { storiesOf } from "@storybook/react";
import HvLogin from "@hv-ui/react/core/Login";


storiesOf("Core", module).add("Login", () => <HvLogin />, {
  title: "Login",
  description:
    "Login form with the capability for recovery of lost credentials.",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import { HvLogin } from '@hv-ui/react/core/Login'",
  examples: [
    {
      title: "Login with successful requests",
      src: "core/login/login1"
    },
    {
      title: "Login with successful requests",
      src: "core/login/login2"
    },
    {
      title: "Login without Forgot Your Credentials and Remember me",
      src: "core/login/login3"
    }
  ]
});

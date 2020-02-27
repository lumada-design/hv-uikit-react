import React from "react";
import { storiesOf } from "@storybook/react";
import Templates from "../../samples/templates/Templates";
import login from "./resources/login.png";
import home from "./resources/home.png";

storiesOf("Templates", module)
  .addParameters({
    options: {
      isToolshown: false
    }
  })
  .add("Templates", () => (
    <Templates
      description="A selection of basic react templates to help you get started building your app."
      containers={[
        {
          id: "login",
          img: login,
          labels: { title: "Login", text: "A simple Login page." },
          sourceCodeUrl:
            "https://github.com/pentaho/hv-uikit-react/blob/master/packages/doc/samples/templates/login/Login.js",
          associatedStory: ["Templates", "Login"]
        },
        {
          id: "home",
          img: home,
          labels: { title: "Home", text: "A home example." },
          sourceCodeUrl:
            "https://github.com/pentaho/hv-uikit-react/tree/master/packages/doc/samples/templates/home",
          associatedStory: ["Templates", "Home"]
        }
      ]}
    />
  ));

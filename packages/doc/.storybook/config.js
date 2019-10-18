import React, { useState } from "react";
import { addDecorator, configure, addParameters } from "@storybook/react";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import { create } from "@storybook/theming";
import withLayout from "./layout-addon";

const req = require.context("../stories", true, /\.js$/);

const routerWrapper = {
  push: (route, params, options) => {},
  prefetch: (route, params) => {}
};

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

let appTheme = "dawn";

addParameters({
  options: {
    theme: create({
      brandTitle: "React UI-Kit",
      brandUrl: "https://github.com/pentaho/hv-uikit-react"
    }),
    showPanel: false,
    isToolshown: true
  }
});

addDecorator(withLayout());

const App = ({ story, initialTheme }) => {
  const [theme, setTheme] = useState(initialTheme);

  const switchTheme = () => {
    let newTheme = theme === "dawn" ? "wicked" : "dawn";
    setTheme(newTheme);
    appTheme = newTheme;
  };

  return (
    <HvProvider
      router={routerWrapper}
      uiKitTheme={theme}
      changeTheme={() => switchTheme()}
    >
      {story()}
    </HvProvider>
  );
};

addDecorator(story => <App story={story} initialTheme={appTheme} />);

configure(loadStories, module);

import React, { useState } from "react";
import { configure, addDecorator } from "@storybook/react";
import withLayout from "./layout-addon";
import HvProvider from "@hv/uikit-react-core/dist/Provider";

const req = require.context("../stories", true, /\.js$/);

const routerWrapper = {
  push: (route, params, options) => {},
  prefetch: (route, params) => {}
};

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

let appTheme = "dawn";

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

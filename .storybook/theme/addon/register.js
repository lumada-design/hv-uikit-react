import addons, { types } from "@storybook/addons";
import * as React from "react";

import ThemeSelector from "./ThemeSelector";

addons.register("storybook/theme-selector", (api) => {
  addons.add("ui-kit-themes", {
    title: "UI Kit theme selector",
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === "story" || viewMode === "docs",
    render: () => <ThemeSelector api={api} />,
  });
});

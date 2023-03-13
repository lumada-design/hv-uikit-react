import React from "react";
import { addons, types } from "@storybook/addons";

import { ADDON_ID, ADDON_TITLE } from "./constants";
import ThemeSelector from "./ThemeSelector";

addons.register(ADDON_ID, (api) => {
  addons.add(ADDON_ID, {
    title: ADDON_TITLE,
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <ThemeSelector api={api} />,
  });
});

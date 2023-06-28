import React from "react";
import { addons, types } from "@storybook/addons";

import { ADDON_ID, ADDON_TITLE } from "./constants";
import ModeSelector from "./ModeSelector";

addons.register(ADDON_ID, (api) => {
  addons.add(ADDON_ID, {
    title: ADDON_TITLE,
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <ModeSelector api={api} />,
  });
});

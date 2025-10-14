/*eslint-disable no-restricted-imports */
import * as React from "react";
import { addons, types } from "storybook/manager-api";

import { ADDON_ID, ADDON_TITLE } from "./constants";
import VersionSelector from "./VersionSelector";

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: ADDON_TITLE,
    type: types.TOOL,
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: () => <VersionSelector />,
  });
});

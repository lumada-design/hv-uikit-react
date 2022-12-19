import { addons, types } from "@storybook/addons";

import { ADDON_ID, ADDON_TITLE } from "../constants";
import { ThemeSwitcher } from "../ThemeSwitcher";

// Register the addon
addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: ADDON_TITLE,
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <ThemeSwitcher />,
  });
});

import React, { useEffect, useState } from "react";

import { addons } from "@storybook/addons";

import { getInitialMode } from "./utils";
import { ADDON_EVENT } from "./constants";

const channel = addons.getChannel();

export const useModeSelector = () => {
  const [isDark, setIsDark] = useState(getInitialMode() === "wicked");

  const switchMode = (mode) => {
    setIsDark(mode === "wicked");
  };

  useEffect(() => {
    channel.on(ADDON_EVENT, switchMode);

    return () => {
      channel.off(ADDON_EVENT, switchMode);
    };
  }, [channel, switchMode]);

  return isDark;
};

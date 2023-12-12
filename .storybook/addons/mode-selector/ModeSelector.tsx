import React, { useState } from "react";

import { IconButton } from "@storybook/components";

import { colors } from "@hitachivantara/uikit-styles";

import { Mode, getInitialMode, setLocalMode } from "./utils";
import { ADDON_EVENT, ADDON_ID } from "./constants";
import { themes } from "../../theme";

const ModeSelector = ({ api }) => {
  const initialMode: Mode = getInitialMode();

  const [selectedMode, setSelectedMode] = useState<Mode>(initialMode);

  const switchMode = () => {
    const mode: Mode = selectedMode === "wicked" ? "dawn" : "wicked";

    setLocalMode(mode);
    setSelectedMode(mode);

    api.setOptions({ theme: themes[mode] });
    api.emit(ADDON_EVENT, mode);
  };

  return (
    <IconButton
      key={ADDON_ID}
      title={
        selectedMode === "wicked"
          ? "Change theme to Dawn"
          : "Change theme to Wicked"
      }
      onClick={switchMode}
      placeholder="Switch theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        height="16"
        width="16"
      >
        <path
          fill={colors[selectedMode === "wicked" ? "dark" : "light"].secondary}
          d="M14.54626 12.57422c.0268-.03833.05713-.07373.08326-.11231.11-.16284.20837-.33239.30584-.50244.03162-.05517.06751-.1073.09784-.16321.086-.15881.16034-.32287.23535-.48693.03364-.07349.07209-.144.10352-.21875.06787-.16126.1239-.32691.18109-.49244.02826-.08166.06165-.16088.08728-.24365.05506-.17773.09754-.359.14014-.54053.01745-.07409.04022-.14611.05554-.22119.0423-.20654.07123-.41626.09717-.62646.00659-.05371.01819-.10571.02374-.15967.02374-.23108.03369-.46435.03717-.69824.00061-.0365.00568-.07178.0058-.1084l-.00024-.00525.00067-.01428A7.98991 7.98991 0 0 0 8.001 0H8a8 8 0 0 0 0 16h.001a7.94253 7.94253 0 0 0 5.649-2.3501c.13953-.13891.26728-.28711.39533-.43506.03924-.04541.08276-.08691.121-.13317.13524-.16346.25872-.33467.37993-.50745zM8 15a6.953 6.953 0 0 1-4.943-2.057A7.02151 7.02151 0 0 1 8.001.95618V15z"
        ></path>
      </svg>
    </IconButton>
  );
};

export default ModeSelector;

import React from "react";
import {
  HvPanel,
  HvCheckBox,
  HvRadio,
  HvSwitch,
  // @ts-ignore
} from "@hitachivantara/uikit-react-core";
// @ts-ignore
import { Level0Good, Level1 } from "@hitachivantara/uikit-react-icons";
import styled from "@emotion/styled";

export const ThemeSample = () => {
  const StyledPanel = styled(HvPanel)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "10px",

    "& > *": {
      margin: "0px 10px",
    },
  });

  return (
    <StyledPanel>
      <HvCheckBox label="Checkbox" />
      <HvRadio label="Radio" />
      <HvSwitch aria-label="Switch" />
      <Level0Good semantic="sema1" />
      <Level1 semantic="sema2" />
      <Level1 semantic="sema3" />
      <Level1 semantic="sema15" />
    </StyledPanel>
  );
};

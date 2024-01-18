import { useState } from "react";
import { HvTab, HvTabs, HvTabsProps } from "@hitachivantara/uikit-react-core";

export const FullWidth = () => {
  const [value, setValue] = useState(0);

  const handleChange: HvTabsProps["onChange"] = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <HvTabs variant="fullWidth" value={value} onChange={handleChange}>
      <HvTab label="Clickable tab 1" />
      <HvTab label="Clickable tab 2" />
      <HvTab label="Clickable tab 3" />
    </HvTabs>
  );
};

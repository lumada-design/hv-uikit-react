import { useState } from "react";
import {
  HvTab,
  HvTabs,
  HvTabsProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export const ContentChanging = () => {
  const [value, setValue] = useState(0);

  const handleChange: HvTabsProps["onChange"] = (_, newValue) => {
    setValue(newValue);
  };

  const renderContent = (page: number) => (
    <HvTypography style={{ padding: 8 * 3 }}>{`Page ${page}`}</HvTypography>
  );

  return (
    <>
      <HvTabs value={value} onChange={handleChange}>
        <HvTab label="Clickable tab 1" />
        <HvTab label="Clickable tab 2" />
        <HvTab label="Clickable tab 3" />
      </HvTabs>
      {renderContent(value)}
    </>
  );
};

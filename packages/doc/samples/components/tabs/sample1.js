import React from "react";
import HvTabs from "@hv/uikit-react-core/dist/Tabs";
import HvTab from "@hv/uikit-react-core/dist/Tab";

function Sample1() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <HvTabs id="tabs" value={value} onChange={handleChange}>
      <HvTab id="tabs-tab1" label="Clicable tab 1"></HvTab>
      <HvTab id="tabs-tab2" label="Clicable tab 2"></HvTab>
      <HvTab id="tabs-tab3" label="Clicable tab 3"></HvTab>
    </HvTabs>
  );
}

export default <Sample1 />;

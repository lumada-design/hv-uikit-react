import React from "react";
import HvTabs from "@hv/uikit-react-core/dist/Tabs";
import HvTab from "@hv/uikit-react-core/dist/Tab";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

function TabContainer({ id, children }) {
  return (
    <HvTypography id={id} component="div" style={{ padding: 8 * 3 }}>
      {children}
    </HvTypography>
  );
}

function Sample4() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HvTabs id="tabs" value={value} onChange={handleChange}>
        <HvTab id="tabs-tab1" label="Clickable tab 1" />
        <HvTab id="tabs-tab2" label="Clickable tab 2" />
        <HvTab id="tabs-tab3" label="Clickable tab 3" />
      </HvTabs>
      {value === 0 && <TabContainer id="container1">Page One</TabContainer>}
      {value === 1 && <TabContainer id="container2">Page Two</TabContainer>}
      {value === 2 && <TabContainer id="container3">Page Three</TabContainer>}
    </>
  );
}

export default <Sample4 />;

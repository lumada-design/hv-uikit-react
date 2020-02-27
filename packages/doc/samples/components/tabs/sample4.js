import React from "react";
import HvTabs from "@hv/uikit-react-core/dist/Tabs";
import HvTab from "@hv/uikit-react-core/dist/Tab";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

function TabContainer(props) {
  return (
    <HvTypography id={props.id} component="div" style={{ padding: 8 * 3 }}>
      {props.children}
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
        <HvTab id="tabs-tab1" label="Clicable tab 1"></HvTab>
        <HvTab id="tabs-tab2" label="Clicable tab 2"></HvTab>
        <HvTab id="tabs-tab3" label="Clicable tab 3"></HvTab>
      </HvTabs>
      {value === 0 && <TabContainer id="container1">Page One</TabContainer>}
      {value === 1 && <TabContainer id="container2">Page Two</TabContainer>}
      {value === 2 && <TabContainer id="container3">Page Three</TabContainer>}
    </>
  );
}

export default <Sample4 />;

import React from "react";
import HvTabs from "@hv/uikit-react-core/dist/Tabs";
import HvTab from "@hv/uikit-react-core/dist/Tab";
import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";

const StyledTab = withStyles(theme => ({
  root: {
    fontSize: theme.hv.typography.sTitle.fontSize
  }
}))(props => <HvTab {...props} />);

function Sample3() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <HvTabs id="tabs" value={value} onChange={handleChange}>
      <StyledTab id="tabs-tab1" label="Clickable tab" />
      <StyledTab id="tabs-tab2" disabled label="Disabled tab" />
      <StyledTab id="tabs-tab3" label="Clickable tab" />
    </HvTabs>
  );
}

export default <Sample3 />;

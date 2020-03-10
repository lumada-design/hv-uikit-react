import React from "react";
import HvTabs from "@hv/uikit-react-core/dist/Tabs";
import HvTab from "@hv/uikit-react-core/dist/Tab";
import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";

const StyledTabs = withStyles({
  flexContainer: {
    justifyContent: "center"
  }
})(props => <HvTabs {...props} />);

function Sample5() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledTabs value={value} onChange={handleChange}>
      <HvTab label="Clickable tab" />
      <HvTab label="Clickable tab" />
      <HvTab label="Clickable tab" />
    </StyledTabs>
  );
}

export default <Sample5 />;

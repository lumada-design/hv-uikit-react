import React from "react";
import HvTabs from "@hv/uikit-react-core/dist/Tabs";
import HvTab from "@hv/uikit-react-core/dist/Tab";
import withStyles from "@material-ui/core/styles/withStyles";

const StyledTabs = withStyles(theme => ({
  flexContainer: {
    justifyContent: "center",
  }
}))(props => <HvTabs {...props} />);

function Sample5() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledTabs value={value} onChange={handleChange}>
      <HvTab label="Clicable tab"></HvTab>
      <HvTab label="Clicable tab"></HvTab>
      <HvTab label="Clicable tab"></HvTab>
    </StyledTabs>
  );
}

export default <Sample5/>

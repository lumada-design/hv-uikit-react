import React from "react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";
import HvTab from "@hv/uikit-react-core/dist/Tab";
import HvTabs from "@hv/uikit-react-core/dist/Tabs";
import withStyles from "@material-ui/core/styles/withStyles";

const StyledTab = withStyles(theme => ({
  root: {
    fontSize: theme.hv.typography.sTitle.fontSize,
    minHeight: "inherit",
    justifyContent: "center"
  },
  labelContainer: {
    padding: "21px 40px",
    maxWidth: "unset",
    width: 265,
    justifyContent: "center",
    display: "flex"
  }
}))(props => <HvTab {...props} />);

const Sample = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <HvTabs value={value} onChange={handleChange}>
      <StyledTab label={<HvBadge showCount count={2} text="Track events" />} />
      <StyledTab label={<HvBadge count={1} text="Vehicle events" />} />
    </HvTabs>
  );
};

export default <Sample />;

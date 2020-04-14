import React from "react";
import List from "@hv/uikit-react-core/dist/List";
import { Calendar, LineChart, Machine, Plane, User } from "@hv/uikit-react-icons/dist";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    width: 240,
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

const getColors = ({ isSelected, isDisabled }) => {
  if (isSelected) return "atmo1";
  if (isDisabled) return "atmo7";
  return undefined;
};

const data = [
  {
    label: "Advanced server DS120",
    selected: false,
    iconCallback: state => <User color={getColors(state)} />
  },
  {
    label: "Advanced server DS122",
    selected: false,
    iconCallback: state => <Calendar color={getColors(state)} />
  },
  {
    label: "Advanced server DS250",
    selected: true,
    iconCallback: state => <Machine color={getColors(state)} />
  },
  {
    label: "Advanced server DS530",
    selected: false,
    disabled: true,
    iconCallback: state => <Plane color={getColors(state)} />
  },
  {
    label: "Advanced server DS555",
    selected: false,
    iconCallback: state => <LineChart color={getColors(state)} />
  }
];

const StyledList = withStyles(styles)(List);

const otherProps = {
  id: "list",
  "aria-label": "Single Selection List with Left Icons Title"
};

export default <StyledList values={data} selectDefault {...otherProps} />;

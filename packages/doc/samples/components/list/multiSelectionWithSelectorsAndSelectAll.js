import React from "react";
import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "Arhauss is somewhere",
    selected: false
  },
  {
    label: "Allentown is not are 51",
    selected: false
  },
  {
    label: "Bergamo where you can eat",
    selected: true
  },
  {
    label: "Bergen city",
    selected: false
  },
  {
    label: "Boston of the Seven Seas",
    selected: false
  }
];

const styles = theme => ({
  wrapper: {
    width: 240,
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

const ListWrapper = withStyles(styles)(({ classes, children }) => (
  <div className={classes.wrapper}>{children}</div>
));

// Passing the aria-label to the component is necessary in order for the component
// to meet accessibility requirements
const ariaProps = {
  "aria-label": "Multi Selection List with Selectors and Select All Title"
};

export default (
  <ListWrapper>
    <List
      values={data}
      multiSelect
      showSelectAll
      useSelector
      listProps={ariaProps}
    />
  </ListWrapper>
);

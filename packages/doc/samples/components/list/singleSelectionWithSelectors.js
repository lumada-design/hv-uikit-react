import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "98001, Store Manager"
  },
  {
    label: "98002, Store Manager"
  },
  {
    label: "98003, Store Manager"
  },
  {
    label: "98004, Store Manager",
    disabled: true
  },
  {
    label: "98005, Store Manager"
  }
];

const styles = theme => ({
  wrapper: {
    width: 240,
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

const ListWrapper = withStyles(styles, { withTheme: true })(
  ({ classes, children }) => <div className={classes.wrapper}>{children}</div>
);

// Passing the aria-label to the component is necessary in order for the component
// to meet accessibility requirements
const ariaProps = {
  "aria-label": "Single Selection List Title"
};

export default (
    <ListWrapper>
      <List values={data} selectDefault useSelector listProps={ariaProps} />
    </ListWrapper>
);

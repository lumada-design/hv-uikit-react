import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import Icon from "@hv/uikit-react-icons/dist/Upload.S";
import HvButton from "@hv/uikit-react-core/dist/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import MoreOptionsIcon from "@hv/uikit-react-icons/dist/MoreOptionsVertical.S";
import { HvCardFooter, HvCardMedia } from "@hv/uikit-react-core/dist/Card";
import leaf from "./resources/leaf.png";

const styles = theme => ({
  mediaContainer: {
    width: "100%",
    paddingBottom: "0px",
    borderLeft: `1px solid ${theme.palette.grey.plain}`,
    borderRight: `1px solid ${theme.palette.grey.plain}`
  },
  media: {
    height: "100%",
    width: "100%"
  }
});

const CustomMedia = withStyles(styles, { withTheme: true })(HvCardMedia);

const MultipleActionsWithMediaButtons = ({classes}) => (
  <>
    <HvButton category="ghost">
      <Icon />
      Update
    </HvButton>
    <HvButton category="ghost" className={classes.smallButton}>
      <MoreOptionsIcon />
    </HvButton>
  </>
);

const multipleActionsWidhMediaButtonsStyle = theme => ({
  smallButton: {
    width: "32px",
    minWidth: "32px",
    padding: 0,
    color: theme.palette.grey.inspire,
    "& span": {
      color: theme.palette.grey.inspire
    }
  }
});

const CustomActions = withStyles(multipleActionsWidhMediaButtonsStyle, {
  withTheme: true
})(MultipleActionsWithMediaButtons);

export default (
  <div style={{ width: "500px" }}>
    <HvCard variant="error">
      <CustomMedia mediaPath={leaf} mediaHeight={160} />
      <HvCardFooter
        actions={<CustomActions />}
        isSelectable
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
    </HvCard>
  </div>
);

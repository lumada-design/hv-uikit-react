import React from "react";
import HvCard from "@hv-ui/react/core/Card";
import Icon from "@hv-ui/icons/core/S-icons/Upload16";
import HvButton from "@hv-ui/react/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import MoreOptionsIcon from "@hv-ui/icons/core/S-icons/MoreOptionsVertical16";
import { HvCardFooter, HvCardMedia } from "@hv-ui/react/core/Card";
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

const MultipleActionsWithMediaButtons = () => (
  <>
    <HvButton colorType="link">
      <Icon />
      Update
    </HvButton>
    <HvButton colorType="link">
      <MoreOptionsIcon />
    </HvButton>
  </>
);

export default (
  <div style={{ width: "500px" }}>
    <HvCard variant="error">
      <CustomMedia mediaPath={leaf} mediaHeight={160} />
      <HvCardFooter
        Actions={<MultipleActionsWithMediaButtons />}
        isSelectable
        onSelect={event => console.log(`my value is ${event.target.value}`)}
      />
    </HvCard>
  </div>
);

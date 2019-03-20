import React from "react";
import HvCard, { HvCardFooter, HvCardHeader } from "@hv-ui/react/core/Card";
import Icon from "@hv-ui/icons/core/S-icons/Upload16";
import HvButton from "@hv-ui/react/core/Button";
import MoreOptionsIcon from "@hv-ui/icons/core/S-icons/MoreOptionsVertical16";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    color: "red"
  }
});

const IconButton = withStyles(styles, { withTheme: true })(HvButton);

const MoreOptionsIconButton = withStyles(styles, {
  withTheme: true
})(HvButton);

const MultipleActionsWithMediaButtons = () => (
  <>
    <IconButton colorType="link">
      <Icon />
      Update
    </IconButton>
    <MoreOptionsIconButton colorType="link">
      <MoreOptionsIcon />
    </MoreOptionsIconButton>
  </>
);

const headerStyles = (theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.grey.plain}`
  }
});

const HeaderWithStyles = withStyles(headerStyles, {
  withTheme: true
})(HvCardHeader);

export default (
  <div style={{ width: "500px" }}>
    <HvCard variant="error">
      <HvCardFooter
        Actions={<MultipleActionsWithMediaButtons />}
        isSelectable
        onSelect={event => console.log(`my value is ${event.target.value}`)}
      />
      <HeaderWithStyles HeaderTitle="Asset Avatar L90" Subheader="Compressor" />
    </HvCard>
  </div>
);

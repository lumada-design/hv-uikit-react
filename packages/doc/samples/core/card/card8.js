import React from "react";
import HvCard, {
  HvCardFooter,
  HvCardHeader
} from "@hv/uikit-react-core/dist/Card";
import Icon from "@hv/uikit-react-icons/dist/Upload.S";
import HvButton from "@hv/uikit-react-core/dist/Button";
import MoreOptionsIcon from "@hv/uikit-react-icons/dist/MoreOptionsVertical.S";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    color: "red"
  }
});

const moreOptionsStyles = theme => ({
  root: {
    width: "32px",
    minWidth: "32px",
    padding: 0,
    color: theme.palette.grey.inspire,
    "& span": {
      color: theme.palette.grey.inspire
    }
  }
});

const IconButton = withStyles(styles, { withTheme: true })(HvButton);

const MoreOptionsIconButton = withStyles(moreOptionsStyles, {
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

const headerStyles = theme => ({
  root: {
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  }
});

const footerStyles = () => ({
  root: {
    borderTop: "none"
  }
});

const HeaderWithStyles = withStyles(headerStyles, {
  withTheme: true
})(HvCardHeader);

const FooterWithStyles = withStyles(footerStyles, {
  withTheme: true
})(HvCardFooter);

export default (
  <div style={{ width: "500px" }}>
    <HvCard>
      <FooterWithStyles
        actions={<MultipleActionsWithMediaButtons />}
        isSelectable
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
      <HeaderWithStyles headerTitle="Asset Avatar L90" subheader="Compressor" />
    </HvCard>
  </div>
);

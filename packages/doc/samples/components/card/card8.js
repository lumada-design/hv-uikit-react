import React from "react";
import HvCard, {
  HvCardFooter,
  HvCardHeader
} from "@hv/uikit-react-core/dist/Card";
import Icon from "@hv/uikit-react-icons/dist/Upload";
import HvButton from "@hv/uikit-react-core/dist/Button";
import MoreOptionsIcon from "@hv/uikit-react-icons/dist/MoreOptionsVertical";
import withStyles from "@material-ui/core/styles/withStyles";

const moreOptionsStyles = () => ({
  root: {
    width: "32px",
    minWidth: "32px",
    padding: 0
  }
});

const MoreOptionsIconButton = withStyles(moreOptionsStyles, {
  withTheme: true
})(HvButton);

const MultipleActionsWithMediaButtons = () => (
  <>
    <HvButton>
      <Icon />
      Update
    </HvButton>
    <MoreOptionsIconButton>
      <MoreOptionsIcon aria-label="more options" />
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
        checkboxAriaLabel="Composed card"
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
      <HeaderWithStyles headerTitle="Asset Avatar L90" subheader="Compressor" />
    </HvCard>
  </div>
);

import React from "react";
import HvCard, {
  HvCardFooter,
  HvCardHeader
} from "@hv/uikit-react-core/dist/Card";
import HvButton from "@hv/uikit-react-core/dist/Button";
import { Upload, MoreOptionsVertical } from "@hv/uikit-react-icons/dist";
import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";

const MultipleActionsWithMediaButtons = () => (
  <>
    <HvButton category="ghost">
      <Upload />
      Update
    </HvButton>
    <HvButton category="icon">
      <MoreOptionsVertical aria-label="more options" />
    </HvButton>
  </>
);

const headerStyles = theme => ({
  root: {
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  }
});

const footerStyles = {
  root: {
    borderTop: "none"
  }
};

const HeaderWithStyles = withStyles(headerStyles)(HvCardHeader);
const FooterWithStyles = withStyles(footerStyles)(HvCardFooter);

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

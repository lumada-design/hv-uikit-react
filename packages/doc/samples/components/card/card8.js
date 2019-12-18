import React from "react";
import HvCard, {
  HvCardFooter,
  HvCardHeader
} from "@hv/uikit-react-core/dist/Card";
import Icon from "@hv/uikit-react-icons/dist/Generic/Upload";
import HvButton from "@hv/uikit-react-core/dist/Button";
import MoreOptionsIcon from "@hv/uikit-react-icons/dist/Generic/MoreOptionsVertical";
import withStyles from "@material-ui/core/styles/withStyles";

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

const stylesMediaButton = () => ({
  box: {
    padding: "7px",
    width: "30px",
    height: "30px"
  }
})

const MoreOptionsIconButton = withStyles(moreOptionsStyles, {
  withTheme: true
})(HvButton);

const MultipleActionsWithMediaButtons = ({classes}) => (
  <>
    <HvButton category="link">
      <Icon className={classes.box} />
      Update
    </HvButton>
    <MoreOptionsIconButton category="link">
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

const MultipleActionsWithMediaButtonsWithStyles = withStyles(stylesMediaButton, {
  withTheme: true
})(MultipleActionsWithMediaButtons);

export default (
  <div style={{ width: "500px" }}>
    <HvCard>
      <FooterWithStyles
        actions={<MultipleActionsWithMediaButtonsWithStyles />}
        isSelectable
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
      <HeaderWithStyles headerTitle="Asset Avatar L90" subheader="Compressor" />
    </HvCard>
  </div>
);

import React from "react";
import compressor from "../card/resources/compressor.png";
import leaf from "../card/resources/leaf.png";
import withStyles from "@material-ui/core/styles/withStyles";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import HvCard, {
  HvCardFooter,
  HvCardMedia
} from "@hv/uikit-react-core/dist/Card";
import HvButton from "@hv/uikit-react-core/dist/Button";
import Icon from "@hv/uikit-react-icons/dist/Upload.S";
import MoreOptionsIcon from "@hv/uikit-react-icons/dist/MoreOptionsVertical.S";

//------------------ Render --------------------
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

const MultipleActionsWithMediaButtons = ({ classes }) => (
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

const multipleActionsWithMediaButtonsStyle = theme => ({
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

const CustomActions = withStyles(multipleActionsWithMediaButtonsStyle, {
  withTheme: true
})(MultipleActionsWithMediaButtons);

const renderer = (value, viewConfiguration) => (
  <HvCard id={value.id}>
    <CustomMedia mediaPath={value.mediaPath} mediaHeight={160} />
    <HvCardFooter
      actions={<CustomActions />}
      isSelectable={viewConfiguration.isSelectable}
      onChange={viewConfiguration.onSelection}
      checkboxValue={value.checkboxValue}
    />
  </HvCard>
);

//------------------- Data ---------------------
const compressorData = id => {
  return {
    id: "id_" + id,
    mediaPath: compressor,
    checkboxValue: "id_" + id
  };
};

const leafData = id => {
  return {
    id: "id_" + id,
    mediaPath: leaf,
    checkboxValue: "id_" + id
  };
};

const values = () => {
  let cards = [];
  for (let i = 0; i < 8; ++i)
    cards.push(i % 2 === 0 ? compressorData(i) : leafData(i));
  return cards;
};

//--------------- Configuration ----------------
const viewConfiguration = {
  onSelection: event => alert(event.target.value),
  breakpoints: {
    xs: "false",
    sm: "false",
    md: 4,
    lg: 3,
    xl: 3
  },
  isSelectable: true
};

export default (
  <CardView
    id="id1"
    icon={<Icon />}
    viewConfiguration={viewConfiguration}
    values={values()}
    renderer={renderer}
  />
);

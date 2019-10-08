import React from "react";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import compressor from "../card/resources/compressor.png";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvCardFooter, HvCardMedia } from "@hv/uikit-react-core/dist/Card";
import HvButton from "@hv/uikit-react-core/dist/Button";
import Icon from "@hv/uikit-react-icons/dist/Upload.S";
import MoreOptionsIcon from "@hv/uikit-react-icons/dist/MoreOptionsVertical.S";
import HvCard from "@hv/uikit-react-core/dist/Card";
import { ViewContextConsumer } from "@hv/uikit-react-core/src/AssetInventory/CardView/ViewContext";

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

const renderer = data => (
  <div style={{ width: "500px" }}>
    <ViewContextConsumer>
      {value => (
        <HvCard id={data.id}>
          <CustomMedia mediaPath={data.mediaPath} mediaHeight={160} />
          <HvCardFooter
            actions={<CustomActions />}
            isSelectable={value.isSelectable}
            onChange={value.onSelection}
            checkboxValue={data.checkboxValue}
          />
        </HvCard>
      )}
    </ViewContextConsumer>
  </div>
);

const compressorData = id => {
  return {
    id: "id_" + id,
    mediaPath: compressor,
    checkboxValue: "id_" + id
  };
};

const values = () => {
  let cards = [];
  for (let i = 0; i < 10; ++i) cards.push(compressorData(i));
  return cards;
};

const viewConfiguration = {
  onSelection: event => console.log(event.target.value),
  breakpoints: {
    xs: "false",
    sm: "false",
    md: "false",
    lg: "false",
    xl: "false"
  },
  isSelectable: true
};

export default (
  <CardView
    id="id"
    viewConfiguration={viewConfiguration}
    values={values()}
    renderer={renderer}
  />
);

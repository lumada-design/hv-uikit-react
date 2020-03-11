import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import HvCard, { HvCardFooter, HvCardMedia } from "@hv/uikit-react-core/dist/Card";
import HvButton from "@hv/uikit-react-core/dist/Button";
import { Upload, MoreOptionsVertical, Tool } from "@hv/uikit-react-icons/dist";
import leaf from "../card/resources/leaf.png";
import compressor from "../card/resources/compressor.png";

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

const CustomMedia = withStyles(styles)(HvCardMedia);

const MultipleActionsWithMediaButtons = ({ classes }) => (
  <>
    <HvButton category="ghost">
      <Upload />
      Update
    </HvButton>
    <HvButton category="ghost" className={classes.smallButton}>
      <MoreOptionsVertical />
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

const CustomActions = withStyles(multipleActionsWithMediaButtonsStyle)(
  MultipleActionsWithMediaButtons
);

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

// ------------------- Data ---------------------

const compressorData = id => ({
  headerTitle: `Asset Avatar ${id + 1}`,
  subheader: "Compressor",
  id: `id_${id}`,
  mediaPath: compressor,
  mediaHeight: 186,
  semantic: "sema2",
  checkboxValue: `id_${id}`,
  data: {
    firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
    secondContent: "Jun 30, 2015 12:27:53 PM"
  }
});

const machineData = id => ({
  headerTitle: `${id} Asset Avatar ${id + 1}`,
  subheader: "Machine",
  id: `id_${id}`,
  mediaPath: leaf,
  mediaHeight: 186,
  semantic: "sema3",
  checkboxValue: `id_${id}`,
  data: {
    firstContent: "7cd4-2101cad3-1000-bdp95-d8c497176e7c",
    secondContent: "Aug 30, 2017 12:27:53 PM"
  }
});

const values = (num = 10) =>
  Array.from(Array(num).keys()).map(i => (i % 2 === 0 ? compressorData(i) : machineData(i)));

// --------------- Configuration ----------------
const viewConfiguration = {
  onSelection: event => alert(event.target.value),
  breakpoints: {
    xs: false,
    sm: false,
    md: 4,
    lg: 3,
    xl: 3
  },
  isSelectable: true
};

export default (
  <CardView
    id="id1"
    icon={<Tool />}
    viewConfiguration={viewConfiguration}
    values={values()}
    renderer={renderer}
  />
);

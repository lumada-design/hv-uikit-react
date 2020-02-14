import React from "react";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import compressor from "../card/resources/compressor.png";
import leaf from "../card/resources/leaf.png";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvCardFooter, HvCardMedia } from "@hv/uikit-react-core/dist/Card";
import HvCard from "@hv/uikit-react-core/dist/Card";
import RawUploadIcon from "@hv/uikit-react-icons/dist/Generic/Upload";
import RawAddIcon from "@hv/uikit-react-icons/dist/Generic/Add";
import RawPreviewIcon from "@hv/uikit-react-icons/dist/Generic/Preview";
import RawDeleteIcon from "@hv/uikit-react-icons/dist/Generic/Delete";
import RawIcon from "@hv/uikit-react-icons/dist/Generic/Tool";

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
  },
  box: {
    padding: "7px",
    width: "30px",
    height: "30px"
  }
});

const Icon = withStyles(styles, { withTheme: true })(({ classes }) => (
  <RawIcon className={classes.box} />
));

const AddIcon = withStyles(styles, { withTheme: true })(
  ({ classes, disabled, theme }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <RawAddIcon className={classes.box} color={color} />;
  }
);

const PreviewIcon = withStyles(styles, { withTheme: true })(
  ({ classes, disabled, theme }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <RawPreviewIcon className={classes.box} color={color} />;
  }
);

const UploadIcon = withStyles(styles, { withTheme: true })(
  ({ classes, disabled, theme }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <RawUploadIcon className={classes.box} color={color} />;
  }
);

const DeleteIcon = withStyles(styles, { withTheme: true })(
  ({ classes, disabled, theme }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <RawDeleteIcon className={classes.box} color={color} />;
  }
);
//------------------ Render --------------------

const CustomMedia = withStyles(styles, { withTheme: true })(HvCardMedia);

const renderer = (value, viewConfiguration) => (
  <HvCard id={value.id}>
    <CustomMedia mediaPath={value.mediaPath} mediaHeight={160} />
    <HvCardFooter
      actions={viewConfiguration.actions}
      maxVisibleActions={viewConfiguration.maxVisibleActions}
      actionsCallback={viewConfiguration.actionsCallback}
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
const myActions = [
  {
    id: "post",
    label: "Add",
    iconCallback: () => <AddIcon />,
    disabled: false
  },
  {
    id: "get",
    label: "Preview",
    iconCallback: () => <PreviewIcon disabled />,
    disabled: true
  },
  {
    id: "put",
    label: "Upload",
    iconCallback: () => <UploadIcon disabled />,
    disabled: true
  },
  {
    id: "delete",
    label: "Delete",
    iconCallback: () => <DeleteIcon />,
    disabled: false
  }
];

const viewConfiguration = {
  onSelection: event => console.log(event.target.value),
  breakpoints: {
    xs: false,
    sm: false,
    md: 4,
    lg: 3,
    xl: 3
  },
  isSelectable: true,
  actions: myActions,
  actionsCallback: (id, action) =>
    alert("You have pressed card " + id + " with action " + action.label)
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

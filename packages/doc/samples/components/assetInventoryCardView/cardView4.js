import React from "react";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import compressor from "../card/resources/compressor.png";
import leaf from "../card/resources/leaf.png";
import withStyles from "@material-ui/core/styles/withStyles";
import HvCard, {
  HvCardFooter,
  HvCardMedia
} from "@hv/uikit-react-core/dist/Card";
import RawUploadIcon from "@hv/uikit-react-icons/dist/Upload";
import RawAddIcon from "@hv/uikit-react-icons/dist/Add";
import RawPreviewIcon from "@hv/uikit-react-icons/dist/Preview";
import RawDeleteIcon from "@hv/uikit-react-icons/dist/Delete";
import RawIcon from "@hv/uikit-react-icons/dist/Tool";

const iconStyles = () => ({
  box: {
    width: "32px",
    height: "32px"
  }
});

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


const renderIcon = (Icon, disabled) =>
  withStyles(iconStyles, {
    withTheme: true
  })(({ classes, theme }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <Icon className={classes.box} color={color} />;
  });

const Icon = renderIcon(RawIcon, false);

const AddIcon = renderIcon(RawAddIcon, false);

const PreviewIcon = renderIcon(RawPreviewIcon, true);

const UploadIcon = renderIcon(RawUploadIcon, true);

const DeleteIcon = renderIcon(RawDeleteIcon, false);

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
    iconCallback: () => <PreviewIcon />,
    disabled: true
  },
  {
    id: "put",
    label: "Upload",
    iconCallback: () => <UploadIcon />,
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

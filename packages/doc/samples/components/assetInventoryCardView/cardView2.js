import React from "react";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import compressor from "../card/resources/compressor.png";
import leaf from "../card/resources/leaf.png";
import RawUploadIcon from "@hv/uikit-react-icons/dist/Generic/Upload";
import RawAddIcon from "@hv/uikit-react-icons/dist/Generic/Add";
import RawPreviewIcon from "@hv/uikit-react-icons/dist/Generic/Preview";
import RawDeleteIcon from "@hv/uikit-react-icons/dist/Generic/Delete";
import RawIcon from "@hv/uikit-react-icons/dist/Generic/Tool";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  box: {
    padding: "7px",
    width: "30px",
    height: "30px"
  }
});

const Icon = withStyles(styles, { withTheme: true })(({classes}) => <RawIcon className={classes.box} />);

const AddIcon = withStyles(styles, { withTheme: true }) (
  ({classes, disabled, theme}) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return (<RawAddIcon className={classes.box} color={color} />)
  }
);

const PreviewIcon = withStyles(styles, { withTheme: true }) (
  ({classes, disabled, theme}) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return (<RawPreviewIcon className={classes.box} color={color} />)
  }
);


const UploadIcon = withStyles(styles, { withTheme: true }) (
  ({classes, disabled, theme}) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return (<RawUploadIcon className={classes.box} color={color} />)
  }
);

const DeleteIcon = withStyles(styles, { withTheme: true }) (
  ({classes, disabled, theme}) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return (<RawDeleteIcon className={classes.box} color={color} />)
  }
);
//---------------- InnerContent ----------------

const InnerContent = ({ classes, values }) => (
  <>
    <div>
      <div>
        <HvTypography variant="labelText">ID</HvTypography>
      </div>
      <div>
        <HvTypography variant="normalText" className={classes.text}>
          {values.data.firstContent}
        </HvTypography>
      </div>
    </div>
    <div style={{ marginTop: "15px" }}>
      <div>
        <HvTypography variant="labelText">Last connected</HvTypography>
      </div>
      <div>
        <HvTypography variant="normalText" className={classes.text}>
          {values.data.secondContent}
        </HvTypography>
      </div>
    </div>
  </>
);

const innerContentFunc = values => (
  <InnerContent classes={styles} values={values} />
);

//-------------------- Data --------------------
const compressorData = id => {
  return {
    headerTitle: "Asset Avatar " + (id + 1),
    subheader: "Compressor",
    id: "id_" + id,
    mediaPath: compressor,
    mediaHeight: 186,
    semantic: "sema2",
    checkboxValue: "id_" + id,
    data: {
      firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
      secondContent: "Jun 30, 2015 12:27:53 PM"
    }
  };
};

const leafData = id => {
  return {
    headerTitle: "Asset Avatar " + (id + 1),
    subheader: "Machine",
    id: "id_" + id,
    mediaPath: leaf,
    mediaHeight: 186,
    semantic: "sema3",
    checkboxValue: "id_" + id,
    data: {
      firstContent: "7cd4-2101cad3-1000-bdp95-d8c497176e7c",
      secondContent: "Aug 30, 2017 12:27:53 PM"
    }
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
  { id: "post", label: "Add", iconCallback: () => <AddIcon />, disabled: false },
  { id: "get", label: "Preview", iconCallback: () => <PreviewIcon disabled />, disabled: true },
  { id: "put", label: "Upload", iconCallback: () => <UploadIcon disabled />, disabled: true },
  { id: "delete", label: "Delete", iconCallback: () => <DeleteIcon />, disabled: false }
];

const viewConfiguration = {
  onSelection: event => console.log(event.target.value),
  breakpoints: {
    xs: "false",
    sm: "false",
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
  <div>
    <CardView
      id="id1"
      icon={<Icon />}
      values={values()}
      viewConfiguration={viewConfiguration}
      innerCardContent={innerContentFunc}
    />
  </div>
);

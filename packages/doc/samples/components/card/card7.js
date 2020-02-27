import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import Upload from "@hv/uikit-react-icons/dist/Generic/Upload";
import AddIcon from "@hv/uikit-react-icons/dist/Generic/Add";
import DeleteIcon from "@hv/uikit-react-icons/dist/Generic/Delete";
import PreviewIcon from "@hv/uikit-react-icons/dist/Generic/Preview";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvCardFooter, HvCardMedia } from "@hv/uikit-react-core/dist/Card";
import leaf from "./resources/leaf.png";

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

const iconStyles = () => ({
  box: {
    padding: "7px",
    width: "30px",
    height: "30px"
  }
});

const StyledUploadIcon = withStyles(iconStyles, {
  withTheme: true
})(({ classes }) => <Upload className={classes.box} />);
const StyledPreviewIcon = withStyles(iconStyles, {
  withTheme: true
})(({ classes }) => <PreviewIcon className={classes.box} />);
const StyledAddIcon = withStyles(iconStyles, {
  withTheme: true
})(({ classes }) => <AddIcon className={classes.box} />);
const StyledDeleteIcon = withStyles(iconStyles, {
  withTheme: true
})(({ classes }) => <DeleteIcon className={classes.box} />);

const myActions = [
  {
    id: "post",
    label: "Upload",
    iconCallback: () => <StyledUploadIcon />,
    disabled: false
  },
  {
    id: "get",
    label: "Preview",
    iconCallback: () => <StyledPreviewIcon />,
    disabled: true
  },
  {
    id: "put",
    label: "Add",
    iconCallback: () => <StyledAddIcon />,
    disabled: true
  },
  {
    id: "delete",
    label: "Delete",
    iconCallback: () => <StyledDeleteIcon />,
    disabled: false
  }
];

export default (
  <div style={{ width: "500px" }}>
    <HvCard>
      <CustomMedia mediaPath={leaf} mediaHeight={160} />
      <HvCardFooter
        checkboxAriaLabel="Composed card"
        actions={myActions}
        isSelectable
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
    </HvCard>
  </div>
);

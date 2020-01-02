import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import AddIcon from "@hv/uikit-react-icons/dist/Generic/Add";
import UploadIcon from "@hv/uikit-react-icons/dist/Generic/Upload";
import DeleteIcon from "@hv/uikit-react-icons/dist/Generic/Delete";
import PreviewIcon from "@hv/uikit-react-icons/dist/Generic/Preview";
import withStyles from "@material-ui/core/styles/withStyles";

const configurationNoMedia = {
  title: "Advanced Server DS120",
  subtitle: "QTFCR27520007"
};

const styles = () => ({
  box: {
    padding: "7px",
    width: "30px",
    height: "30px"
  }
})

const StyledAddIcon = withStyles(styles, { withTheme: true })(({classes}) => <AddIcon className={classes.box} />);
const StyledPreviewIcon = withStyles(styles, { withTheme: true })(({classes}) => <PreviewIcon className={classes.box} />);
const StyledUploadIcon = withStyles(styles, { withTheme: true })(({classes}) => <UploadIcon className={classes.box} />);
const StyledDeleteIcon = withStyles(styles, { withTheme: true })(({classes}) => <DeleteIcon className={classes.box} />);

const myActions = [
  { id: "post", label: "Add", icon: () => <StyledAddIcon />, disabled: false },
  { id: "get", label: "Preview", icon: () => <StyledPreviewIcon />, disabled: true },
  { id: "put", label: "Upload", icon: () => <StyledUploadIcon />, disabled: true },
  { id: "delete", label: "Delete", icon: ()=> <StyledDeleteIcon />, disabled: false }
];

export default (
  <div style={{ width: "360px" }}>
    <HvCard
      headerTitle={configurationNoMedia.title}
      subheader={configurationNoMedia.subtitle}
      isSelectable
      actions={myActions}
      actionsCallback={(id, a) => alert("You have pressed " + a.label)}
      maxVisibleActions={3}
      actionsAlignment="left"
      checkboxValue="value"
      onChange={event => console.log(`my value is ${event.target.value}`)}
      actionItemWidth={110}
      id='card'
    />
  </div>
);

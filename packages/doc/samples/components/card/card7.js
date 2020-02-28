import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import Upload from "@hv/uikit-react-icons/dist/Upload";
import AddIcon from "@hv/uikit-react-icons/dist/Add";
import DeleteIcon from "@hv/uikit-react-icons/dist/Delete";
import PreviewIcon from "@hv/uikit-react-icons/dist/Preview";
import withStyles from "@material-ui/core/styles/withStyles";
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

const myActions = [
  {
    id: "post",
    label: "Upload",
    iconCallback: () => <Upload />,
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
    label: "Add",
    iconCallback: () => <AddIcon />,
    disabled: true
  },
  {
    id: "delete",
    label: "Delete",
    iconCallback: () => <DeleteIcon />,
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

import React from "react";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import compressor from "../card/resources/compressor.png";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvCardFooter, HvCardMedia } from "@hv/uikit-react-core/dist/Card";
import UploadIcon from "@hv/uikit-react-icons/dist/Upload.S";
import HvCard from "@hv/uikit-react-core/dist/Card";
import { ViewContextConsumer } from "@hv/uikit-react-core/src/AssetInventory/CardView/ViewContext";
import AddIcon from "@hv/uikit-react-icons/dist/Add.S";
import PreviewIcon from "@hv/uikit-react-icons/dist/Preview.S";
import DeleteIcon from "@hv/uikit-react-icons/dist/Delete.S";

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

const renderer = data => (
  <div style={{ width: "500px" }}>
    <ViewContextConsumer>
      {value => (
        <HvCard id={data.id}>
          <CustomMedia mediaPath={data.mediaPath} mediaHeight={160} />
          <HvCardFooter
            actions={value.actions}
            maxVisibleActions={value.maxVisibleActions}
            actionsCallback={value.actionsCallback}
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

const myActions = [
  { id: "post", label: "Add", icon: AddIcon, disabled: false },
  { id: "get", label: "Preview", icon: PreviewIcon, disabled: true },
  { id: "put", label: "Upload", icon: UploadIcon, disabled: true },
  { id: "delete", label: "Delete", icon: DeleteIcon, disabled: false }
];

const viewConfiguration = {
  onSelection: event => console.log(event.target.value),
  breakpoints: {
    xs: "false",
    sm: "false",
    md: "false",
    lg: "false",
    xl: "false"
  },
  isSelectable: true,
  actions: myActions,
  maxVisibleActions: 3,
  actionsCallback: (id, action) =>
    alert("You have pressed card " + id + " with action " + action.label)
};

export default (
  <CardView
    id="id"
    viewConfiguration={viewConfiguration}
    values={values()}
    renderer={renderer}
  />
);

import React from "react";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import compressor from "../card/resources/compressor.png";
import leaf from "../card/resources/leaf.png";
import AddIcon from "@hv/uikit-react-icons/dist/Add.S";
import UploadIcon from "@hv/uikit-react-icons/dist/Upload.S";
import DeleteIcon from "@hv/uikit-react-icons/dist/Delete.S";
import PreviewIcon from "@hv/uikit-react-icons/dist/Preview.S";
import Icon from "@hv/uikit-react-icons/dist/DawnTheme/Tool.S";

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
    md: 4,
    lg: 3,
    xl: 3
  },
  isSelectable: true,
  actions: myActions,
  maxVisibleActions: 3,
  actionsCallback: (id, action) =>
    alert("You have pressed card " + id + " with action " + action.label)
};

export default (
  <div>
    <CardView
      id="id1"
      icon={<Icon />}
      values={values()}
      viewConfiguration={viewConfiguration} />
  </div>
);

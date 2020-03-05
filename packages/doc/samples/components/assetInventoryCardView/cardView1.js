import React from "react";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import { Add, Upload, Delete, Preview, Tool } from "@hv/uikit-react-icons/dist";
import compressor from "../card/resources/compressor.png";
import leaf from "../card/resources/leaf.png";

// -------------------- Data --------------------

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
  Array.from(Array(num).keys()).map(i =>
    i % 2 === 0 ? compressorData(i) : machineData(i)
  );

// --------------- Configuration ----------------
const myActions = [
  {
    id: "post",
    label: "Add",
    iconCallback: () => <Add />,
    disabled: false
  },
  {
    id: "get",
    label: "Preview",
    iconCallback: () => <Preview color="atmo7" />,
    disabled: true
  },
  {
    id: "put",
    label: "Upload",
    iconCallback: () => <Upload color="atmo7" />,
    disabled: true
  },
  {
    id: "delete",
    label: "Delete",
    iconCallback: () => <Delete />,
    disabled: false
  }
];

const viewConfiguration = {
  onSelection: event => console.log(event.target.checked),
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
    alert(`You have pressed card ${id} with action ${action.label}`)
};

export default (
  <div>
    <CardView
      id="id1"
      icon={<Tool />}
      values={values()}
      viewConfiguration={viewConfiguration}
    />
  </div>
);

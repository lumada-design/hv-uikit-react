import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import AddIcon from "@hv/uikit-react-icons/dist/Generic/Add";
import UploadIcon from "@hv/uikit-react-icons/dist/Generic/Upload";
import DeleteIcon from "@hv/uikit-react-icons/dist/Generic/Delete";
import PreviewIcon from "@hv/uikit-react-icons/dist/Generic/Preview";

const configurationNoMedia = {
  title: "Advanced Server DS120",
  subtitle: "QTFCR27520007"
};

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

export default (
  <div style={{ width: "360px" }}>
    <HvCard
      headerTitle={configurationNoMedia.title}
      subheader={configurationNoMedia.subtitle}
      isSelectable
      actions={myActions}
      actionsCallback={(id, a) => alert("You have pressed " + a.label)}
      actionsAlignment="left"
      checkboxValue="value"
      onChange={event => console.log(`my value is ${event.target.value}`)}
      actionItemWidth={110}
      id="card"
    />
  </div>
);

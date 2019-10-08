import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import AddIcon from "@hv/uikit-react-icons/dist/Add.S";
import UploadIcon from "@hv/uikit-react-icons/dist/Upload.S";
import DeleteIcon from "@hv/uikit-react-icons/dist/Delete.S";
import PreviewIcon from "@hv/uikit-react-icons/dist/Preview.S";

const configurationNoMedia = {
  title: "Advanced Server DS120",
  subtitle: "QTFCR27520007"
};

const myActions = [
  { id: "post", label: "Add", icon: AddIcon, disabled: false },
  { id: "get", label: "Preview", icon: PreviewIcon, disabled: true },
  { id: "put", label: "Upload", icon: UploadIcon, disabled: true },
  { id: "delete", label: "Delete", icon: DeleteIcon, disabled: false }
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
    />
  </div>
);

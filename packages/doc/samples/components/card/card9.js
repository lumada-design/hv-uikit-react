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

const logAction = (a) => alert('You have pressed ' + a.name);

const myActions = [
  { name: "Add", text: "Add", icon: AddIcon, onClick: (a) => logAction(a), disabled: false },
  { name: "Preview", text: "Preview", icon: PreviewIcon, onClick: (a) => logAction(a), disabled: true },
  { name: "Upload", text: "Upload", icon: UploadIcon, onClick: (a) => logAction(a), disabled: true },
  { name: "Delete", text: "Delete", icon: DeleteIcon, onClick: (a) => logAction(a), disabled: false },
];

export default (
  <div style={{ width: "360px" }}>
    <HvCard
      headerTitle={configurationNoMedia.title}
      subheader={configurationNoMedia.subtitle}
      isSelectable
      actions={myActions}
      maxVisibleActions={3}
      actionsAlignment="left"
      checkboxValue="value"
      onChange={event => console.log(`my value is ${event.target.value}`)}
    />
  </div>
);

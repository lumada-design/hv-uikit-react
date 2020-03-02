import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import { Add, Delete, Preview, Upload } from "@hv/uikit-react-icons/dist";

const configurationNoMedia = {
  title: "Advanced Server DS120",
  subtitle: "QTFCR27520007"
};

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

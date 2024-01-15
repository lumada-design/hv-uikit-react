import React, { useState } from "react";
import uniqueId from "lodash/uniqueId";
import { withStyles } from "@material-ui/core";
import { Add, Delete, Lock, Preview, Upload } from "@hitachivantara/uikit-react-icons";

import { HvBulkActions, HvCheckBox } from "../..";

export default {
  title: "Components/Bulk Actions",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvBulkActions } from "@hitachivantara/uikit-react-core";',
  },
  component: HvBulkActions,
  decorators: [
    (Story) => (
      <div style={{ padding: 10 }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => {
  const actions = [
    { id: "get", label: "Upload", iconCallback: () => <Upload /> },
    { id: "lock", label: "Lock", iconCallback: () => <Lock /> },
    { id: "delete", label: "Delete", iconCallback: () => <Delete /> },
    { id: "post", label: "Add", iconCallback: () => <Add /> },
    { id: "put", label: "Preview", iconCallback: () => <Preview /> },
  ];

  return (
    <HvBulkActions
      actions={actions}
      actionsCallback={(e, id, action) => {
        console.log("Action data:", action);
      }}
      maxVisibleActions={3}
    />
  );
};

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "&>*": {
      width: 160,
      padding: theme.spacing("xs"),
      margin: theme.spacing("xs"),
      textAlign: "center",
      borderRadius: 4,
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
    },
  },
});

const SampleComponent = withStyles(styles)(({ classes, data, onChange }) => (
  <div className={classes.root}>
    {data.map((el, i) => (
      <div key={String(el.id)}>
        <HvCheckBox
          id={String(el.id)}
          label={el.value}
          checked={data[i].checked}
          onChange={(e, checked) => onChange(e, i, checked)}
        />
      </div>
    ))}
  </div>
));

export const Controlled = () => {
  const addEntry = (i) => ({
    id: `val${i + 1}`,
    value: `Value ${i + 1}`,
    checked: false,
  });

  const [data, setData] = useState(Array.from(Array(8), (el, i) => addEntry(i)));

  const handleSelectAll = (e, checked = false) => {
    setData(data.map((el) => ({ ...el, checked: !checked })));
  };

  const handleChange = (e, i, checked) => {
    const newData = [...data];
    newData[i].checked = !checked;
    setData(newData);
  };

  return (
    <div>
      <HvBulkActions
        numTotal={data.length}
        numSelected={data.filter((el) => el.checked).length}
        onSelectAll={handleSelectAll}
        onSelectAllPages={handleSelectAll}
        maxVisibleActions={3}
      />
      <SampleComponent data={data} onChange={handleChange} />
    </div>
  );
};

export const ControlledWithActions = () => {
  const actions = [
    { id: "add", label: "Add", iconCallback: () => <Add /> },
    { id: "delete", label: "Delete", iconCallback: () => <Delete /> },
    { id: "lock", label: "Lock", iconCallback: () => <Lock /> },
    { id: "put", label: "Preview", iconCallback: () => <Preview /> },
  ];
  const addEntry = (id) => ({
    id,
    value: `Value ${id}`,
    checked: false,
  });

  const [data, setData] = useState(Array.from(Array(8), (el, i) => addEntry(i)));

  const handleSelectAll = (e, checked = false) => {
    setData(data.map((el) => ({ ...el, checked: !checked })));
  };

  const handleChange = (e, i, checked) => {
    const newData = [...data];
    newData[i].checked = !checked;
    setData(newData);
  };

  const handleAction = (e, id, action) => {
    const selected = data.filter((el) => el.checked);
    console.log(id, action);
    switch (action.id) {
      case "add": {
        const newEls = selected.map((el) => addEntry(`${el.id}-copy-${uniqueId()}`));
        setData([...data, ...newEls]);
        break;
      }
      case "delete": {
        const selectedIds = selected.map((el) => el.id);
        setData(data.filter((el) => !selectedIds.includes(el.id)));
        break;
      }
      case "lock":
      default:
        break;
    }
  };

  return (
    <div>
      <HvBulkActions
        id="bulkActions"
        numTotal={data.length}
        numSelected={data.filter((el) => el.checked).length}
        onSelectAll={handleSelectAll}
        onSelectAllPages={handleSelectAll}
        actions={actions}
        actionsCallback={handleAction}
        maxVisibleActions={2}
      />
      <SampleComponent data={data} onChange={handleChange} />
    </div>
  );
};

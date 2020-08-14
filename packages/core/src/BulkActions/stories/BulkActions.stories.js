import React, { useState } from "react";
import uniqueId from "lodash/uniqueId";
import { withStyles } from "@material-ui/core";
import { Add, Delete, Lock, Preview, Upload } from "@hv/uikit-react-icons";
import { wait, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { HvBulkActions, HvCheckBox, HvMultiButton } from "../..";

export default {
  title: "Components/Bulk Actions",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvBulkActions } from '@hv/uikit-react-core/dist'"
  },
  component: HvBulkActions,
  decorators: [
    Story => (
      <div style={{ padding: 10 }}>
        <Story />
      </div>
    )
  ]
};

export const Main = () => {
  const actions = [
    { id: "get", label: "Upload", iconCallback: () => <Upload /> },
    { id: "lock", label: "Lock", iconCallback: () => <Lock /> },
    { id: "delete", label: "Delete", iconCallback: () => <Delete /> },
    { id: "post", label: "Add", iconCallback: () => <Add /> },
    { id: "put", label: "Preview", iconCallback: () => <Preview /> }
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

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "&>*": {
      width: 160,
      padding: theme.spacing("xs"),
      margin: theme.spacing("xs"),
      textAlign: "center",
      borderRadius: 4,
      backgroundColor: theme.hv.palette.atmosphere.atmo1
    }
  }
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
  const addEntry = i => ({
    id: `val${i + 1}`,
    value: `Value ${i + 1}`,
    checked: false
  });

  const [data, setData] = useState(Array.from(Array(8), (el, i) => addEntry(i)));

  const handleSelectAll = (e, checked = false) => {
    setData(data.map(el => ({ ...el, checked: !checked })));
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
        numSelected={data.filter(el => el.checked).length}
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
    { id: "put", label: "Preview", iconCallback: () => <Preview /> }
  ];
  const addEntry = id => ({
    id,
    value: `Value ${id}`,
    checked: false
  });

  const [data, setData] = useState(Array.from(Array(8), (el, i) => addEntry(i)));

  const handleSelectAll = (e, checked = false) => {
    setData(data.map(el => ({ ...el, checked: !checked })));
  };

  const handleChange = (e, i, checked) => {
    const newData = [...data];
    newData[i].checked = !checked;
    setData(newData);
  };

  const handleAction = (e, id, action) => {
    const selected = data.filter(el => el.checked);
    console.log(id, action);
    switch (action.id) {
      case "add": {
        const newEls = selected.map(el => addEntry(`${el.id}-copy-${uniqueId()}`));
        setData([...data, ...newEls]);
        break;
      }
      case "delete": {
        const selectedIds = selected.map(el => el.id);
        setData(data.filter(el => !selectedIds.includes(el.id)));
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
        numSelected={data.filter(el => el.checked).length}
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

export const WithMultiButton = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([
    { id: "monday", value: "M" },
    { id: "tuesday", value: "T" },
    { id: "wednesday", value: "W" },
    { id: "thursday", value: "T" },
    { id: "friday", value: "F" },
    { id: "saturday", value: "S" },
    { id: "sunday", value: "S" }
  ]);

  const handleSelectAll = (e, checked = false) => {
    setData(data.map(el => ({ ...el, selected: !checked })));
  };

  return (
    <div>
      <HvBulkActions
        numTotal={data.length}
        numSelected={data.filter(el => el.selected).length}
        onSelectAll={handleSelectAll}
        onSelectAllPages={handleSelectAll}
        maxVisibleActions={3}
      />
      <HvMultiButton
        multi
        type="text"
        style={{ width: "224px", margin: 10 }}
        buttons={data}
        onChange={(e, state = []) => {
          setData(data.map(el => ({ ...el, selected: state.includes(el.id) })));
        }}
      />
    </div>
  );
};

WithMultiButton.story = {
  parameters: {
    docs: {
      disable: true
    }
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, selected
export const selected = () => ControlledWithActions();

selected.story = {
  parameters: {
    docs: {
      disable: true
    },
    eyes: {
      runBefore() {
        userEvent.click(screen.getByText("All"))
        return wait(() => screen.getByText("8 of 8 items"))
      }
    }
  }
};

// test scenario, indeterminate status
export const indeterminate = () => ControlledWithActions();

indeterminate.story = {
  parameters: {
    docs: {
      disable: true
    },
    eyes: {
      runBefore() {
        userEvent.click(screen.getByText("Value 3"))
        return wait(() => screen.getByText("1 of 8 items"))
      }
    }
  }
};

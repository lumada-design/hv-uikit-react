import React, { useState } from "react";
import uniqueId from "lodash/uniqueId";
import { withStyles } from "@material-ui/core";

import { Add, Delete, Lock, Preview, Upload } from "@hv/uikit-react-icons";

import { HvBulkActions, HvCheckBox, HvPagination } from "../..";

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

Main.parameters = {
  v3: true
};

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
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

  const handleSelectAllPages = e => handleSelectAll(e, true);

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
        onSelectAllPages={handleSelectAllPages}
        maxVisibleActions={3}
      />
      <SampleComponent data={data} onChange={handleChange} />
    </div>
  );
};

Controlled.parameters = {
  v3: true
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
        actions={actions}
        actionsCallback={handleAction}
        maxVisibleActions={2}
      />
      <SampleComponent data={data} onChange={handleChange} />
    </div>
  );
};

ControlledWithActions.parameters = {
  v3: true
};

export const ControlledWithAllPages = () => {
  const pageSizeOptions = [4, 6, 12, 24, 48, 2000];
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

  const [data, setData] = useState(Array.from(Array(18), (el, i) => addEntry(i)));
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[1]);

  const handleSelectAllPages = (checked = true) => {
    setData(data.map(el => ({ ...el, checked })));
  };

  const handleSelectAll = () => {
    if (data.some(el => el.checked)) {
      handleSelectAllPages(false);
      return;
    }

    const start = pageSize * page;
    const end = pageSize * (page + 1);

    const selectedAll = data.slice(start, end).reduce((accum, el) => accum || el.checked, false);

    const newData = [...data];
    newData.forEach((el, i) => {
      if (i >= start && i < end) newData[i] = { ...el, checked: !selectedAll };
    });
    setData(newData);
  };

  const handleChange = (e, i, checked) => {
    const newData = [...data];
    newData[i + pageSize * page].checked = !checked;
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

  const numPages = Math.ceil(data.length / pageSize);

  return (
    <>
      <HvBulkActions
        id="bulkActions"
        numTotal={data.length}
        numSelected={data.filter(el => el.checked).length}
        onSelectAll={handleSelectAll}
        onSelectAllPages={handleSelectAllPages}
        actions={actions}
        actionsCallback={handleAction}
        maxVisibleActions={2}
        showSelectAllPages
      />
      <SampleComponent
        data={data.slice(pageSize * page, pageSize * (page + 1))}
        onChange={handleChange}
      />
      <p />
      <HvPagination
        id="pagination"
        pages={numPages}
        page={page}
        canPrevious={page > 0}
        canNext={page < numPages - 1}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={value => setPage(value)}
        onPageSizeChange={value => setPageSize(value)}
        labels={{ pageSizeEntryName: "items" }}
      />
    </>
  );
};

ControlledWithAllPages.parameters = {
  v3: true
};

import styled from "@emotion/styled";
import {
  HvCheckBox,
  HvActionGeneric,
  HvListValue,
  HvBulkActions,
  HvPagination,
} from "@hitachivantara/uikit-react-core";
import { Add, Delete, Preview, Lock } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { useState } from "react";

const StyledRoot = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  "&>*": {
    width: 160,
    padding: theme.space.xs,
    margin: theme.space.xs,
    textAlign: "center",
    borderRadius: 4,
    backgroundColor: theme.colors.atmo1,
  },
});

type SampleComponentDatum = {
  id: string | number;
  value: string;
  checked: boolean;
};

const SampleComponent = ({
  data,
  onChange,
}: {
  data: SampleComponentDatum[];
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    checked: boolean
  ) => void;
}) => (
  <StyledRoot>
    {data.map((el, i) => (
      <div key={el.id}>
        <HvCheckBox
          id={el.id.toString()}
          label={el.value}
          checked={el.checked}
          onChange={(e, checked) => onChange(e, i, checked)}
        />
      </div>
    ))}
  </StyledRoot>
);

export const BulkActions = () => {
  const pageSizeOptions: number[] = [4, 6, 12, 24, 48, 2000];

  const actions: HvActionGeneric[] = [
    { id: "add", label: "Add", icon: <Add /> },
    { id: "delete", label: "Delete", icon: <Delete /> },
    { id: "lock", label: "Lock", icon: <Lock /> },
    { id: "put", label: "Preview", icon: <Preview /> },
  ];

  const addEntry = (i: number | string): SampleComponentDatum => ({
    id: i,
    value: `Value ${i}`,
    checked: false,
  });

  const [data, setData] = useState<SampleComponentDatum[]>(
    Array.from(Array(18), (_, i) => addEntry(i))
  );

  const [page, setPage] = useState<number>(0);

  const [pageSize, setPageSize] = useState<number>(pageSizeOptions[1]);

  const handleSelectAllPages = (checked = true) => {
    setData(data.map((el) => ({ ...el, checked })));
  };

  const handleSelectAll = () => {
    if (data.some((el) => el.checked)) {
      handleSelectAllPages(false);
      return;
    }

    const start = pageSize * page;
    const end = pageSize * (page + 1);

    const selectedAll = data
      .slice(start, end)
      .reduce((accum, el) => accum || el.checked, false);

    const newData = [...data];
    newData.forEach((el, i) => {
      if (i >= start && i < end) newData[i] = { ...el, checked: !selectedAll };
    });
    setData(newData);
  };

  const handleChange = (_, i: number, checked: boolean) => {
    const newData = [...data];
    newData[i + pageSize * page].checked = checked;
    setData(newData);
  };

  const handleAction = (_, __, action: HvActionGeneric | HvListValue) => {
    const selected = data.filter((el) => el.checked);

    switch (action.id) {
      case "add": {
        const newEls = selected.map((el) => addEntry(`${el.id}-copy`));
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

  const numPages = Math.ceil(data.length / pageSize);

  const [semantic, setSemantic] = useState<boolean>(true);

  return (
    <>
      <HvCheckBox
        label="Semantic"
        onChange={() => setSemantic((value) => !value)}
        checked={semantic}
      />
      <br />
      <HvBulkActions
        semantic={semantic}
        numTotal={data.length}
        numSelected={data.filter((el) => el.checked).length}
        onSelectAll={handleSelectAll}
        onSelectAllPages={() => handleSelectAllPages()}
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
        pages={numPages}
        page={page}
        canPrevious={page > 0}
        canNext={page < numPages - 1}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={(value) => setPage(value)}
        onPageSizeChange={(value) => setPageSize(value)}
        labels={{ pageSizeEntryName: "items" }}
      />
    </>
  );
};

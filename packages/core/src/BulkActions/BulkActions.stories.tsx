import { useState } from "react";
import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import {
  HvActionGeneric,
  HvBulkActions,
  HvBulkActionsProps,
  HvCheckBox,
  HvPagination,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Add, Delete, Lock, Preview } from "@hitachivantara/uikit-react-icons";

const uniqueId = () => Math.random().toString(36).slice(2, 9);

const actions: HvActionGeneric[] = [
  { id: "add", label: "Add", icon: <Add /> },
  { id: "delete", label: "Delete", icon: <Delete /> },
  { id: "lock", label: "Lock", icon: <Lock /> },
  { id: "put", label: "Preview", icon: <Preview /> },
];

const meta: Meta<typeof HvBulkActions> = {
  title: "Widgets/Bulk Actions",
  component: HvBulkActions,
  decorators: [(Story) => <div style={{ padding: 10 }}>{Story()}</div>],
};

export default meta;

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

type SampleComponentProps = {
  data: SampleComponentDatum[];
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    checked: boolean,
  ) => void;
};

const SampleComponent = ({ data, onChange }: SampleComponentProps) => (
  <StyledRoot>
    {data.map((el, i) => (
      <div key={el.id}>
        <HvCheckBox
          label={el.value}
          checked={el.checked}
          onChange={(e, checked) => onChange(e, i, checked)}
        />
      </div>
    ))}
  </StyledRoot>
);

export const Main: StoryObj<HvBulkActionsProps> = {
  args: {
    showSelectAllPages: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    onSelectAll: { control: { disable: true } },
    onSelectAllPages: { control: { disable: true } },
    checkboxProps: { control: { disable: true } },
  },
  render: (args) => {
    const addEntry = (i: number): SampleComponentDatum => ({
      id: `val${i + 1}`,
      value: `Value ${i + 1}`,
      checked: false,
    });

    const [data, setData] = useState<SampleComponentDatum[]>(
      Array.from(Array(8), (_, i) => addEntry(i)),
    );

    const handleSelectAll = (_: any, checked = false) => {
      setData(data.map((el) => ({ ...el, checked })));
    };

    const handleSelectAllPages: HvBulkActionsProps["onSelectAllPages"] = (e) =>
      handleSelectAll(e, true);

    const handleChange: SampleComponentProps["onChange"] = (_, i, checked) => {
      const newData = [...data];
      newData[i].checked = checked;
      setData(newData);
    };

    return (
      <div>
        <HvBulkActions
          {...args}
          numTotal={data.length}
          numSelected={data.filter((el) => el.checked).length}
          onSelectAll={handleSelectAll}
          onSelectAllPages={handleSelectAllPages}
          maxVisibleActions={3}
        />
        <SampleComponent data={data} onChange={handleChange} />
      </div>
    );
  },
};

export const WithActions: StoryObj<HvBulkActionsProps> = {
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: () => {
    const addEntry = (id: string | number): SampleComponentDatum => ({
      id: `Entry ${id}`,
      value: `Value ${id}`,
      checked: false,
    });

    const [data, setData] = useState<SampleComponentDatum[]>(
      Array.from(Array(8), (_, i) => addEntry(i)),
    );

    const handleSelectAll: HvBulkActionsProps["onSelectAll"] = (_, checked) => {
      setData(data.map((el) => ({ ...el, checked })));
    };

    const handleChange: SampleComponentProps["onChange"] = (_, i, checked) => {
      const newData = [...data];
      newData[i].checked = checked;
      setData(newData);
    };

    const handleAction: HvBulkActionsProps["onAction"] = (event, action) => {
      const selected = data.filter((el) => el.checked);

      switch (action.id) {
        case "add": {
          const newEls = selected.map((el) =>
            addEntry(`${el.id}-copy-${uniqueId()}`),
          );
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
      actions && (
        <div>
          <HvBulkActions
            numTotal={data.length}
            numSelected={data.filter((el) => el.checked).length}
            onSelectAll={handleSelectAll}
            actions={actions}
            onAction={handleAction}
            maxVisibleActions={2}
          />
          <SampleComponent data={data} onChange={handleChange} />
        </div>
      )
    );
  },
};

export const WithPagination: StoryObj<HvBulkActionsProps> = {
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  // For visual testing
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name: /All/i });
    await userEvent.click(checkbox);
    await expect(canvas.getByRole("button", { name: /add/i })).toBeEnabled();
  },
  render: () => {
    const pageSizeOptions: number[] = [4, 6, 12, 24, 48, 2000];

    const addEntry = (i: number | string): SampleComponentDatum => ({
      id: i,
      value: `Value ${i}`,
      checked: false,
    });

    const [data, setData] = useState<SampleComponentDatum[]>(
      Array.from(Array(18), (_, i) => addEntry(i)),
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
        if (i >= start && i < end)
          newData[i] = { ...el, checked: !selectedAll };
      });
      setData(newData);
    };

    const handleChange: SampleComponentProps["onChange"] = (_, i, checked) => {
      const newData = [...data];
      newData[i + pageSize * page].checked = checked;
      setData(newData);
    };

    const handleAction: HvBulkActionsProps["onAction"] = (event, action) => {
      const selected = data.filter((el) => el.checked);

      switch (action.id) {
        case "add": {
          const newEls = selected.map((el) =>
            addEntry(`${el.id}-copy-${uniqueId()}`),
          );
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

    return (
      <>
        <HvBulkActions
          numTotal={data.length}
          numSelected={data.filter((el) => el.checked).length}
          onSelectAll={handleSelectAll}
          onSelectAllPages={() => handleSelectAllPages()}
          actions={actions}
          onAction={handleAction}
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
  },
};

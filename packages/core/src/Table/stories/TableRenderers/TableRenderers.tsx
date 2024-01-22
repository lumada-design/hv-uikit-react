import React, { useMemo, useState } from "react";
import type { StoryObj } from "@storybook/react";
import { Ban } from "@hitachivantara/uikit-react-icons";
import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvData,
  useHvPagination,
  useHvRowExpand,
  HvEmptyState,
  HvPagination,
  HvTypography,
  HvRowInstance,
  HvCellProps,
  hvTextColumn,
  hvDateColumn,
  hvExpandColumn,
  hvSwitchColumn,
  hvNumberColumn,
  hvTagColumn,
  hvDropdownColumn,
  hvProgressColumn,
  theme,
} from "@hitachivantara/uikit-react-core";
import { fireEvent, screen, waitFor, within } from "@storybook/testing-library";

import { makeRenderersData, NewRendererEntry } from "../storiesUtils";

const EmptyRow = ({ height }) => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height }}>
      <HvEmptyState message="No data to display" icon={<Ban role="none" />} />
    </HvTableCell>
  </HvTableRow>
);

const AllColumnRenderers = () => {
  const getColumns = () => [
    hvSwitchColumn<NewRendererEntry, string>(
      {
        Header: "isDisabled",
        accessor: "isDisabled",
        style: { minWidth: 130 },
        id: "disabled-header",
      },
      "default",
      "yes",
      "no",
      {
        disabled: true,
      }
    ),
    hvExpandColumn<NewRendererEntry, string>(
      {
        Header: "Title",
        accessor: "name",
        style: { maxWidth: 100 },
        id: "title-header",
      },
      "expand",
      "collapse",
      () => true
    ),
    hvDateColumn<NewRendererEntry, string>(
      {
        Header: "Time",
        accessor: "createdDate",
        style: { minWidth: 50 },
        id: "time-header",
      },
      "YYYY/MM/DD HH:mm"
    ),
    hvNumberColumn<NewRendererEntry, string>({
      Header: "Quantity",
      accessor: "eventQuantity",
      style: { minWidth: 20 },
      id: "quantity-header",
    }),
    hvTextColumn<NewRendererEntry, string>({
      Header: "Event Type",
      accessor: "eventType",
      style: { maxWidth: 160 },
      id: "event-type-header",
    }),
    hvTagColumn<NewRendererEntry, string, NewRendererEntry["status"]>(
      {
        Header: "Status",
        accessor: "status",
        style: { width: 20 },
        id: "status-header",
      },
      "status_name",
      "status_color",
      "status_text_color",
      undefined,
      undefined
    ),
    hvProgressColumn<NewRendererEntry, string>(
      {
        Header: "Probability",
        accessor: "riskScore",
        style: { width: 125 },
        disableSortBy: true,
        id: "probability-header",
      },
      (row) => row.original.riskScore,
      () => 100,
      "secondary"
    ),
    hvDropdownColumn<NewRendererEntry, string>(
      { Header: "Severity", accessor: "severity", id: "severity-header" },
      undefined,
      "Select severity...",
      "Select severity...",
      () => console.log("select me")
    ),
  ];

  const columns = useMemo(() => {
    return getColumns();
  }, []);

  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data] = useState(initialData);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
          value ?? "—",
      },
      disableCreateExpandButton: true,
    },
    useHvRowExpand,
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            {...row.getRowProps({
              "aria-rowindex": index + 1,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
          <HvTableRow style={{ display: row.isExpanded ? undefined : "none" }}>
            <HvTableCell
              style={{
                paddingBottom: 0,
                paddingTop: 0,
                textAlign: "center",
                height: 100,
                backgroundColor: theme.colors.atmo2,
                borderTop: `solid 1px ${theme.colors.atmo4}`,
              }}
              colSpan={100}
            >
              <HvTypography>
                Expanded content for: {row.values.name}
              </HvTypography>
            </HvTableCell>
          </HvTableRow>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader
                  {...col.getHeaderProps()}
                  key={col.Header}
                  id={col.id}
                >
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={100} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};

export const AllColumnRenderersStory: StoryObj = {
  parameters: {
    eyes: { include: true },
    docs: {
      source: {
        code: `
const getColumns = () => [
  hvSwitchColumn<NewRendererEntry, string>(
    {
      Header: "isDisabled",
      accessor: "isDisabled",
      style: { minWidth: 130 },
      id: "disabled-header"
    },
    "default",
    "yes",
    "no",
    {
      disabled: true,
    }
  ),
  hvExpandColumn<NewRendererEntry, string>(
    { Header: "Title", accessor: "name", style: { maxWidth: 100 }, id: "title-header" },
    "expand",
    "collapse",
    () => true
  ),
  hvDateColumn<NewRendererEntry, string>(
    { Header: "Time", accessor: "createdDate", style: { minWidth: 50 }, id: "time-header" },
    "YYYY/MM/DD HH:mm"
  ),
  hvNumberColumn<NewRendererEntry, string>({
    Header: "Quantity",
    accessor: "eventQuantity",
    style: { minWidth: 20 },
    id: "quantity-header"
  }),
  hvTextColumn<NewRendererEntry, string>({
    Header: "Event Type",
    accessor: "eventType",
    style: { maxWidth: 160 },
    id: "event-type-header"
  }),
  hvTagColumn<NewRendererEntry, string, NewRendererEntry["status"]>(
    { Header: "Status", accessor: "status", style: { width: 20 }, id: "status-header" },
    "status_name",
    "status_color",
    "status_text_color",
    undefined,
    undefined
  ),
  hvProgressColumn<NewRendererEntry, string>(
    {
      Header: "Probability",
      accessor: "riskScore",
      style: { width: 125 },
      disableSortBy: true,
      id: "probability-header"
    },
    (row) => row.original.riskScore,
    () => 100,
    "secondary"
  ),
  hvDropdownColumn<NewRendererEntry, string>(
    { Header: "Severity", accessor: "severity", id: "severity-header" },
    undefined,
    "Select severity...",
    "Select severity...",
    () => console.log("select me")
  ),
];

const columns = useMemo(() => {
  return getColumns();
}, []);

const initialData = useMemo(() => makeRenderersData(64), []);

const [data] = useState(initialData);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 100 }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="none" />}
      />
    </HvTableCell>
  </HvTableRow>
);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headers,
  page,
  getHvPaginationProps,
} = useHvData<NewRendererEntry, string>(
  {
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
        value ?? "—",
    },
    disableCreateExpandButton: true,
  },
  useHvRowExpand,
  useHvPagination
);

const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
  return pages.map((row, index) => {
    prepareRow(row);

    return (
      <React.Fragment key={row.id}>
        <HvTableRow
          {...row.getRowProps({
            "aria-rowindex": index + 1,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
        <HvTableRow style={{ display: row.isExpanded ? undefined : "none" }}>
          <HvTableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              textAlign: "center",
              height: 100,
              backgroundColor: theme.colors.atmo2,
              borderTop: solid 1px theme.colors.atmo4,
            }}
            colSpan={100}
          >
            <HvTypography>
              Expanded content for: {row.values.name}
            </HvTypography>
          </HvTableCell>
        </HvTableRow>
      </React.Fragment>
    );
  });
};

return (
  <>
    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
      >
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()} key={col.Header} id={col.id}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
    <HvPagination {...getHvPaginationProps?.()} />
  </>
);`,
      },
    },
  },
  render: () => <AllColumnRenderers />,
};

const TextColumnRenderer = () => {
  const getColumns = () => [
    hvTextColumn<NewRendererEntry, string>({
      Header: "Event Type",
      accessor: "eventType",
      style: { maxWidth: 160 },
    }),
  ];

  const columns = useMemo(() => {
    return getColumns();
  }, []);

  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data] = useState(initialData);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
          value ?? "—",
      },
    },
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            {...row.getRowProps({
              "aria-rowindex": index + 1,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
          style={{
            width: 230,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={100} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};

export const TextColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: {
      source: {
        code: `
const getColumns = () => [
  hvTextColumn<NewRendererEntry, string>({
    Header: "Event Type",
    accessor: "eventType",
    style: { maxWidth: 160 },
  }),
];

const columns = useMemo(() => {
  return getColumns();
}, []);

const initialData = useMemo(() => makeRenderersData(64), []);

const [data] = useState(initialData);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 100 }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="none" />}
      />
    </HvTableCell>
  </HvTableRow>
);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headers,
  page,
  getHvPaginationProps,
} = useHvData<NewRendererEntry, string>(
  {
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
        value ?? "—",
    },
  },
  useHvPagination
);

const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
  return pages.map((row, index) => {
    prepareRow(row);

    return (
      <React.Fragment key={row.id}>
        <HvTableRow
          {...row.getRowProps({
            "aria-rowindex": index + 1,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      </React.Fragment>
    );
  });
};

return (
  <>
    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
        style={{
          width: 230,
        }}
      >
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
    <HvPagination {...getHvPaginationProps?.()} />
  </>
);`,
      },
    },
  },
  render: () => <TextColumnRenderer />,
};

const NumberColumnRenderer = () => {
  const getColumns = () => [
    hvNumberColumn<NewRendererEntry, string>({
      Header: "Quantity",
      accessor: "eventQuantity",
      style: { maxWidth: 100 },
    }),
  ];

  const columns = useMemo(() => {
    return getColumns();
  }, []);

  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data] = useState(initialData);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
          value ?? "—",
      },
    },
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            {...row.getRowProps({
              "aria-rowindex": index + 1,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
          style={{
            width: 50,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={50} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};

export const NumberColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: {
      source: {
        code: `
const getColumns = () => [
  hvNumberColumn<NewRendererEntry, string>({
    Header: "Quantity",
    accessor: "eventQuantity",
    style: { maxWidth: 100 },
  }),
];

const columns = useMemo(() => {
  return getColumns();
}, []);

const initialData = useMemo(() => makeRenderersData(64), []);

const [data] = useState(initialData);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 50 }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="none" />}
      />
    </HvTableCell>
  </HvTableRow>
);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headers,
  page,
  getHvPaginationProps,
} = useHvData<NewRendererEntry, string>(
  {
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
        value ?? "—",
    },
  },
  useHvPagination
);

const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
  return pages.map((row, index) => {
    prepareRow(row);

    return (
      <React.Fragment key={row.id}>
        <HvTableRow
          {...row.getRowProps({
            "aria-rowindex": index + 1,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      </React.Fragment>
    );
  });
};

return (
  <>
    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
        style={{
          width: 50,
        }}
      >
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
    <HvPagination {...getHvPaginationProps?.()} />
  </>
);`,
      },
    },
  },
  render: () => <NumberColumnRenderer />,
};

const DateColumnRenderer = () => {
  const getColumns = () => [
    hvDateColumn<NewRendererEntry, string>(
      { Header: "Time", accessor: "createdDate", style: { minWidth: 80 } },
      "DD/MM/YYYY"
    ),
  ];

  const columns = useMemo(() => {
    return getColumns();
  }, []);

  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data] = useState(initialData);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
          value ?? "—",
      },
    },
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            {...row.getRowProps({
              "aria-rowindex": index + 1,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
          style={{
            width: 100,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={50} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};

export const DateColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: {
      source: {
        code: `
const getColumns = () => [
  hvDateColumn<NewRendererEntry, string>(
    { Header: "Time", accessor: "createdDate", style: { minWidth: 80 } },
    "DD/MM/YYYY"
  ),
];

const columns = useMemo(() => {
  return getColumns();
}, []);

const initialData = useMemo(() => makeRenderersData(64), []);

const [data] = useState(initialData);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 50 }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="none" />}
      />
    </HvTableCell>
  </HvTableRow>
);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headers,
  page,
  getHvPaginationProps,
} = useHvData<NewRendererEntry, string>(
  {
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
        value ?? "—",
    },
  },
  useHvPagination
);

const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
  return pages.map((row, index) => {
    prepareRow(row);

    return (
      <React.Fragment key={row.id}>
        <HvTableRow
          {...row.getRowProps({
            "aria-rowindex": index + 1,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      </React.Fragment>
    );
  });
};

return (
  <>
    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
        style={{
          width: 100,
        }}
      >
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
    <HvPagination {...getHvPaginationProps?.()} />
  </>
);`,
      },
    },
  },
  render: () => <DateColumnRenderer />,
};

const ExpandColumnRenderer = () => {
  const getColumns = () => [
    hvTextColumn<NewRendererEntry, string>({
      Header: "Event Type",
      accessor: "eventType",
      style: { maxWidth: 160 },
    }),
    hvExpandColumn<NewRendererEntry, string>(
      { Header: "Title", accessor: "name", style: { maxWidth: 100 } },
      "expand",
      "collapse",
      (row) => row.original.eventType !== undefined
    ),
  ];

  const columns = useMemo(() => {
    return getColumns();
  }, []);

  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data] = useState(initialData);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
          value ?? "—",
      },
      disableCreateExpandButton: true,
    },
    useHvRowExpand,
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            {...row.getRowProps({
              "aria-rowindex": index + 1,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
          <HvTableRow style={{ display: row.isExpanded ? undefined : "none" }}>
            <HvTableCell
              style={{
                paddingBottom: 0,
                paddingTop: 0,
                textAlign: "center",
                height: 100,
                backgroundColor: theme.colors.atmo2,
                borderTop: `solid 1px ${theme.colors.atmo4}`,
              }}
              // @ts-ignore
              colSpan="100%"
            >
              <HvTypography>
                Expanded content for: {row.values.name}
              </HvTypography>
            </HvTableCell>
          </HvTableRow>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
          style={{
            width: 300,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={50} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};

export const ExpandColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: {
      source: {
        code: `
const getColumns = () => [
  hvTextColumn<NewRendererEntry, string>({
    Header: "Event Type",
    accessor: "eventType",
    style: { maxWidth: 160 },
  }),
  hvExpandColumn<NewRendererEntry, string>(
    { Header: "Title", accessor: "name", style: { maxWidth: 100 } },
    "expand",
    "collapse",
    (row) => row.original.eventType !== undefined
  ),
];

const columns = useMemo(() => {
  return getColumns();
}, []);

const initialData = useMemo(() => makeRenderersData(64), []);

const [data] = useState(initialData);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 50 }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="none" />}
      />
    </HvTableCell>
  </HvTableRow>
);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headers,
  page,
  getHvPaginationProps,
} = useHvData<NewRendererEntry, string>(
  {
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
        value ?? "—",
    },
    disableCreateExpandButton: true,
  },
  useHvRowExpand,
  useHvPagination
);

const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
  return pages.map((row, index) => {
    prepareRow(row);

    return (
      <React.Fragment key={row.id}>
        <HvTableRow
          {...row.getRowProps({
            "aria-rowindex": index + 1,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
        <HvTableRow style={{ display: row.isExpanded ? undefined : "none" }}>
          <HvTableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              textAlign: "center",
              height: 100,
              backgroundColor: "theme.colors.atmo2",
              borderTop: "solid 1px theme.colors.atmo4",
            }}
            colSpan="100%"
          >
            <HvTypography>
              Expanded content for: {row.values.name}
            </HvTypography>
          </HvTableCell>
        </HvTableRow>
      </React.Fragment>
    );
  });
};

return (
  <>
    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
        style={{
          width: 300,
        }}
      >
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
    <HvPagination {...getHvPaginationProps?.()} />
  </>
);`,
      },
    },
  },
  render: () => <ExpandColumnRenderer />,
};

const SwitchColumnRenderer = () => {
  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data, setData] = useState(initialData);

  const columns = useMemo(() => {
    return [
      hvSwitchColumn<NewRendererEntry, string>(
        {
          Header: "isDisabled",
          accessor: "isDisabled",
          style: { minWidth: 180 },
        },
        "default",
        "yes",
        "no",
        {
          onChange: (_, checked, value) => {
            let newData = [...data];
            newData = newData.map((val, index) => {
              const newVal = { ...val };
              if (index.toString() === value) {
                newVal.isDisabled = checked;
              }
              return newVal;
            });
            setData(newData);
          },
        }
      ),
    ];
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
          value ?? "—",
      },
    },
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            {...row.getRowProps({
              "aria-rowindex": index + 1,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
          style={{
            width: 50,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={50} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};

export const SwitchColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: {
      source: {
        code: `
const initialData = useMemo(() => makeRenderersData(64), []);

const [data, setData] = useState(initialData);

const columns = useMemo(() => {
  return [
    hvSwitchColumn<NewRendererEntry, string>(
      {
        Header: "isDisabled",
        accessor: "isDisabled",
        style: { minWidth: 180 },
      },
      "default",
      "yes",
      "no",
      {
        onChange: (_, checked, value) => {
          let newData = [...data];
          newData = newData.map((val, index) => {
            const newVal = { ...val };
            if (index.toString() === value) {
              newVal.isDisabled = checked;
            }
            return newVal;
          });
          setData(newData);
        },
      }
    ),
  ];
}, [data]);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 50 }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="none" />}
      />
    </HvTableCell>
  </HvTableRow>
);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headers,
  page,
  getHvPaginationProps,
} = useHvData<NewRendererEntry, string>(
  {
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
        value ?? "—",
    },
  },
  useHvPagination
);

const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
  return pages.map((row, index) => {
    prepareRow(row);

    return (
      <React.Fragment key={row.id}>
        <HvTableRow
          {...row.getRowProps({
            "aria-rowindex": index + 1,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      </React.Fragment>
    );
  });
};

return (
  <>
    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
        style={{
          width: 50,
        }}
      >
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
    <HvPagination {...getHvPaginationProps?.()} />
  </>
);`,
      },
    },
  },
  render: () => <SwitchColumnRenderer />,
};

const TagColumnRenderer = () => {
  const columns = useMemo(() => {
    return [
      hvTagColumn<NewRendererEntry, string, NewRendererEntry["status"]>(
        { Header: "Status", accessor: "status", style: { width: 20 } },
        "status_name",
        "status_color",
        "status_text_color",
        false,
        {
          color: "cat5",
          type: "categorical",
        }
      ),
    ];
  }, []);

  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data] = useState(initialData);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
          value ?? "—",
      },
    },
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            {...row.getRowProps({
              "aria-rowindex": index + 1,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
          style={{
            width: 50,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={50} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};

export const TagColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: {
      source: {
        code: `
const columns = useMemo(() => {
  return [
    hvTagColumn<NewRendererEntry, string, NewRendererEntry["status"]>(
      { Header: "Status", accessor: "status", style: { width: 20 } },
      "status_name",
      "status_color",
      "status_text_color",
      false,
      {
        color: "cat5",
        type: "categorical",
      }
    ),
  ];
}, []);

const initialData = useMemo(() => makeRenderersData(64), []);

const [data] = useState(initialData);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 50 }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="none" />}
      />
    </HvTableCell>
  </HvTableRow>
);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headers,
  page,
  getHvPaginationProps,
} = useHvData<NewRendererEntry, string>(
  {
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
        value ?? "—",
    },
  },
  useHvPagination
);

const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
  return pages.map((row, index) => {
    prepareRow(row);

    return (
      <React.Fragment key={row.id}>
        <HvTableRow
          {...row.getRowProps({
            "aria-rowindex": index + 1,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      </React.Fragment>
    );
  });
};

return (
  <>
    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
        style={{
          width: 50,
        }}
      >
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
    <HvPagination {...getHvPaginationProps?.()} />
  </>
);`,
      },
    },
  },
  render: () => <TagColumnRenderer />,
};

const ProgressColumnRenderer = () => {
  const columns = useMemo(() => {
    return [
      hvProgressColumn<NewRendererEntry, string>(
        {
          Header: "Probability",
          accessor: "riskScore",
          style: { width: 125 },
          disableSortBy: true,
          id: "probability-header",
        },
        (row) => row.original.riskScore,
        () => 100,
        "secondary"
      ),
    ];
  }, []);

  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data] = useState(initialData);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
          value ?? "—",
      },
    },
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            {...row.getRowProps({
              "aria-rowindex": index + 1,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
          style={{
            width: 230,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader
                  {...col.getHeaderProps()}
                  key={col.Header}
                  id={col.id}
                >
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={100} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};

export const ProgressColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: {
      source: {
        code: `
const columns = useMemo(() => {
  return [
    hvProgressColumn<NewRendererEntry, string>(
      {
        Header: "Probability",
        accessor: "riskScore",
        style: { width: 125 },
        disableSortBy: true,
        id: "probability-header"
      },
      (row) => row.original.riskScore,
      () => 100,
      "secondary"
    ),
  ];
}, []);

const initialData = useMemo(() => makeRenderersData(64), []);

const [data] = useState(initialData);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 100 }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="none" />}
      />
    </HvTableCell>
  </HvTableRow>
);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headers,
  page,
  getHvPaginationProps,
} = useHvData<NewRendererEntry, string>(
  {
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
        value ?? "—",
    },
  },
  useHvPagination
);

const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
  return pages.map((row, index) => {
    prepareRow(row);

    return (
      <React.Fragment key={row.id}>
        <HvTableRow
          {...row.getRowProps({
            "aria-rowindex": index + 1,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      </React.Fragment>
    );
  });
};

return (
  <>
    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
        style={{
          width: 230,
        }}
      >
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()} key={col.Header} id={col.id}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
    <HvPagination {...getHvPaginationProps?.()} />
  </>
);`,
      },
    },
  },
  render: () => <ProgressColumnRenderer />,
};

const DropdownColumnRenderer = () => {
  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data, setData] = useState(initialData);

  // initialData[0].severity = undefined;

  const columns = useMemo(() => {
    return [
      hvDropdownColumn<NewRendererEntry, string>(
        { Header: "Severity", accessor: "severity", id: "severity-header" },
        undefined,
        "Select severity...",
        "Select severity...",
        (id, value) => {
          let newData = [...data];
          newData = newData.map((val, index) => {
            const newVal = { ...val };
            if (index.toString() === id) {
              if (newVal.severity) {
                newVal.severity = newVal.severity.map((sev) => {
                  const newSev = { ...sev };
                  newSev.selected = false;
                  if (newSev.id === value.id) newSev.selected = value.selected;
                  return newSev;
                });
              }
            }
            return newVal;
          });
          setData(newData);
        }
      ),
    ];
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
          value ?? "—",
      },
    },
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            {...row.getRowProps({
              "aria-rowindex": index + 1,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
          style={{
            width: 230,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader
                  {...col.getHeaderProps()}
                  key={col.Header}
                  id={col.id}
                >
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={100} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};

export const DropdownColumnRendererStory: StoryObj = {
  parameters: {
    eyes: {
      include: true,
      runBefore() {
        // reduce the number of visible rows
        fireEvent.click(
          screen.getByRole("combobox", { name: "Select how many to display" })
        );
        fireEvent.click(screen.getByRole("option", { name: "5" }));

        const tableElement = screen.getByRole("table", {
          name: "Severity",
        });
        fireEvent.click(within(tableElement).getByText("Major"));

        return waitFor(() => screen.getByRole("listbox"));
      },
    },
    docs: {
      source: {
        code: `
const initialData = useMemo(() => makeRenderersData(64), []);

const [data, setData] = useState(initialData);

const columns = useMemo(() => {
  return [
    hvDropdownColumn<NewRendererEntry, string>(
      { Header: "Severity", accessor: "severity", id: "severity-header" },
      undefined,
      "Select severity...",
      "Select severity...",
      (id, value) => {
        let newData = [...data];
        newData = newData.map((val, index) => {
          const newVal = { ...val };
          if (index.toString() === id) {
            newVal.severity = newVal.severity.map((sev) => {
              const newSev = { ...sev };
              newSev.selected = false;
              if (newSev.id === value.id) newSev.selected = !!value.selected;
              return newSev;
            });
          }
          return newVal;
        });
        setData(newData);
      }
    ),
  ];
}, [data]);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 100 }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="none" />}
      />
    </HvTableCell>
  </HvTableRow>
);

const {
  getTableProps,
  getTableBodyProps,
  prepareRow,
  headers,
  page,
  getHvPaginationProps,
} = useHvData<NewRendererEntry, string>(
  {
    columns,
    data,
    defaultColumn: {
      Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
        value ?? "—",
    },
  },
  useHvPagination
);

const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
  return pages.map((row, index) => {
    prepareRow(row);

    return (
      <React.Fragment key={row.id}>
        <HvTableRow
          {...row.getRowProps({
            "aria-rowindex": index + 1,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      </React.Fragment>
    );
  });
};

return (
  <>
    <HvTableContainer>
      <HvTable
        {...getTableProps({
          "aria-rowcount": data.length,
        })}
        style={{
          width: 230,
        }}
      >
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()} key={col.Header} id={col.id}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
    <HvPagination {...getHvPaginationProps?.()} />
  </>
);`,
      },
    },
  },
  render: () => <DropdownColumnRenderer />,
};

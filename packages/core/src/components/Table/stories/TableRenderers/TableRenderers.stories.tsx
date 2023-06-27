import React, { useMemo, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Ban } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
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
} from "@core/components";
import {
  hvTextColumn,
  hvDateColumn,
  hvExpandColumn,
  hvSwitchColumn,
  hvNumberColumn,
  hvTagColumn,
  hvDropdownColumn,
  hvProgressColumn,
} from "../../renderers/renderers";
import { makeRenderersData, NewRendererEntry } from "../storiesUtils";

export default {
  component: HvTable,
} satisfies Meta<typeof HvTable>;

const EmptyRow = ({ height }) => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height }}>
      <HvEmptyState
        message="No data to display"
        icon={<Ban role="presentation" />}
      />
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
      },
      "default",
      "yes",
      "no",
      {
        disabled: true,
      }
    ),
    hvExpandColumn<NewRendererEntry, string>(
      { Header: "Title", accessor: "name", style: { maxWidth: 100 } },
      "expand",
      "collapse",
      () => true
    ),
    hvDateColumn<NewRendererEntry, string>(
      { Header: "Time", accessor: "createdDate", style: { minWidth: 50 } },
      "YYYY/MM/DD HH:mm"
    ),
    hvNumberColumn<NewRendererEntry, string>({
      Header: "Quantity",
      accessor: "eventQuantity",
      style: { minWidth: 20 },
    }),
    hvTextColumn<NewRendererEntry, string>({
      Header: "Event Type",
      accessor: "eventType",
      style: { maxWidth: 160 },
    }),
    hvTagColumn<NewRendererEntry, string, NewRendererEntry["status"]>(
      { Header: "Status", accessor: "status", style: { width: 20 } },
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
      },
      (row) => row.original.riskScore,
      () => 100,
      "secondary"
    ),
    hvDropdownColumn<NewRendererEntry, string>(
      { Header: "Severity", accessor: "severity" },
      "Severity-id-101",
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
              "aria-rowindex": index,
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

export const AllColumnRenderersStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const getColumns = () => [
  hvSwitchColumn<NewRendererEntry, string>(
    {
      Header: "isDisabled",
      accessor: "isDisabled",
      style: { minWidth: 130 },
    },
    "default",
    "yes",
    "no",
    {
      disabled: true,
    }
  ),
  hvExpandColumn<NewRendererEntry, string>(
    { Header: "Title", accessor: "name", style: { maxWidth: 100 } },
    "expand",
    "collapse",
    () => true
  ),
  hvDateColumn<NewRendererEntry, string>(
    { Header: "Time", accessor: "createdDate", style: { minWidth: 50 } },
    "YYYY/MM/DD HH:mm"
  ),
  hvNumberColumn<NewRendererEntry, string>({
    Header: "Quantity",
    accessor: "eventQuantity",
    style: { minWidth: 20 },
  }),
  hvTextColumn<NewRendererEntry, string>({
    Header: "Event Type",
    accessor: "eventType",
    style: { maxWidth: 160 },
  }),
  hvTagColumn<NewRendererEntry, string, NewRendererEntry["status"]>(
    { Header: "Status", accessor: "status", style: { width: 20 } },
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
    },
    (row) => row.original.riskScore,
    () => 100,
    "secondary"
  ),
  hvDropdownColumn<NewRendererEntry, string>(
    { Header: "Severity", accessor: "severity" },
    "Severity-id-101",
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
        icon={<Ban role="presentation" />}
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
            "aria-rowindex": index,
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
              "aria-rowindex": index,
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
        icon={<Ban role="presentation" />}
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
            "aria-rowindex": index,
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
              "aria-rowindex": index,
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
        icon={<Ban role="presentation" />}
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
            "aria-rowindex": index,
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
              "aria-rowindex": index,
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
        icon={<Ban role="presentation" />}
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
            "aria-rowindex": index,
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
              "aria-rowindex": index,
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
        icon={<Ban role="presentation" />}
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
            "aria-rowindex": index,
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
              "aria-rowindex": index,
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
        icon={<Ban role="presentation" />}
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
            "aria-rowindex": index,
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
              "aria-rowindex": index,
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
        icon={<Ban role="presentation" />}
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
            "aria-rowindex": index,
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
              "aria-rowindex": index,
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

export const ProgressColumnRendererStory: StoryObj = {
  parameters: {
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
        icon={<Ban role="presentation" />}
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
            "aria-rowindex": index,
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
  render: () => <ProgressColumnRenderer />,
};

const DropdownColumnRenderer = () => {
  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data, setData] = useState(initialData);

  const columns = useMemo(() => {
    return [
      hvDropdownColumn<NewRendererEntry, string>(
        { Header: "Severity", accessor: "severity" },
        "Severity-id-101",
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
              "aria-rowindex": index,
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

export const DropdownColumnRendererStory: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `
const initialData = useMemo(() => makeRenderersData(64), []);

const [data, setData] = useState(initialData);

const columns = useMemo(() => {
  return [
    hvDropdownColumn<NewRendererEntry, string>(
      { Header: "Severity", accessor: "severity" },
      "Severity-id-101",
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
        icon={<Ban role="presentation" />}
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
            "aria-rowindex": index,
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
  render: () => <DropdownColumnRenderer />,
};

import React, { useMemo, useState } from "react";
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
} from "components";
import {
  hvTextColumn,
  hvDateColumn,
  hvExpandColumn,
  hvSwitchColumn,
  hvNumberColumn,
  hvTagColumn,
  hvDropdownColumn,
  hvProgressColumn,
} from "../renderers/renderers";
import { makeRenderersData } from "./storiesUtils";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HvTable> = {
  title: "Guides/Table/Table Renderers",
  decorators: [(Story) => <Story />],
};

export default meta;

export const AllColumnRenderers: StoryObj = {
  render: () => {
    const getColumns = () => [
      hvSwitchColumn(
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
      hvExpandColumn(
        { Header: "Title", accessor: "name", style: { maxWidth: 100 } },
        "expand",
        "collapse",
        () => true
      ),
      hvDateColumn(
        { Header: "Time", accessor: "createdDate", style: { minWidth: 50 } },
        "YYYY/MM/DD HH:mm"
      ),
      hvNumberColumn({
        Header: "Quantity",
        accessor: "eventQuantity",
        style: { minWidth: 20 },
      }),
      hvTextColumn({
        Header: "Event Type",
        accessor: "eventType",
        style: { maxWidth: 160 },
      }),
      hvTagColumn(
        { Header: "Status", accessor: "status", style: { width: 20 } },
        "status_name",
        "status_color",
        "status_text_color",
        undefined,
        undefined
      ),
      hvProgressColumn(
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
      hvDropdownColumn(
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
    } = useHvData(
      {
        columns,
        data,
        defaultColumn: {
          Cell: ({ value }) => value ?? "—",
        },
        disableCreateExpandButton: true,
      },
      useHvRowExpand,
      useHvPagination
    );

    const rowRenderer = (pages) => {
      return pages.map((row, index) => {
        prepareRow(row);

        return (
          <React.Fragment key={row.id}>
            <HvTableRow
              key={row.Header}
              {...row.getRowProps({
                "aria-rowindex": index,
              })}
            >
              {row.cells.map((cell) => (
                <HvTableCell key={cell.Header} {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </HvTableCell>
              ))}
            </HvTableRow>
            <HvTableRow
              style={{ display: row.isExpanded ? undefined : "none" }}
            >
              <HvTableCell
                style={{
                  paddingBottom: 0,
                  paddingTop: 0,
                  textAlign: "center",
                  height: 100,
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
              caption: "Table Caption",
            })}
          >
            <HvTableHead>
              <HvTableRow>
                {headers.map((col) => (
                  <HvTableHeader key={col.Header} {...col.getHeaderProps()}>
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

        <HvPagination {...getHvPaginationProps()} />
      </>
    );
  },
};

export const TextColumnRenderer: StoryObj = {
  render: () => {
    const getColumns = () => [
      hvTextColumn({
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
    } = useHvData(
      {
        columns,
        data,
        defaultColumn: {
          Cell: ({ value }) => value ?? "—",
        },
      },
      useHvPagination
    );

    const rowRenderer = (pages) => {
      return pages.map((row, index) => {
        prepareRow(row);

        return (
          <React.Fragment key={row.id}>
            <HvTableRow
              key={row.Header}
              {...row.getRowProps({
                "aria-rowindex": index,
              })}
            >
              {row.cells.map((cell) => (
                <HvTableCell key={cell.Header} {...cell.getCellProps()}>
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
              caption: "Table Caption",
            })}
            style={{
              width: 230,
            }}
          >
            <HvTableHead>
              <HvTableRow>
                {headers.map((col) => (
                  <HvTableHeader key={col.Header} {...col.getHeaderProps()}>
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

        <HvPagination {...getHvPaginationProps()} />
      </>
    );
  },
};

export const NumberColumnRenderer: StoryObj = {
  render: () => {
    const getColumns = () => [
      hvNumberColumn({
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
    } = useHvData(
      {
        columns,
        data,
        defaultColumn: {
          Cell: ({ value }) => value ?? "—",
        },
      },
      useHvPagination
    );

    const rowRenderer = (pages) => {
      return pages.map((row, index) => {
        prepareRow(row);

        return (
          <React.Fragment key={row.id}>
            <HvTableRow
              key={row.Header}
              {...row.getRowProps({
                "aria-rowindex": index,
              })}
            >
              {row.cells.map((cell) => (
                <HvTableCell key={cell.Header} {...cell.getCellProps()}>
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
              caption: "Table Caption",
            })}
            style={{
              width: 50,
            }}
          >
            <HvTableHead>
              <HvTableRow>
                {headers.map((col) => (
                  <HvTableHeader key={col.Header} {...col.getHeaderProps()}>
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

        <HvPagination {...getHvPaginationProps()} />
      </>
    );
  },
};

export const DateColumnRenderer: StoryObj = {
  render: () => {
    const getColumns = () => [
      hvDateColumn(
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
    } = useHvData(
      {
        columns,
        data,
        defaultColumn: {
          Cell: ({ value }) => value ?? "—",
        },
      },
      useHvPagination
    );

    const rowRenderer = (pages) => {
      return pages.map((row, index) => {
        prepareRow(row);

        return (
          <React.Fragment key={row.id}>
            <HvTableRow
              key={row.Header}
              {...row.getRowProps({
                "aria-rowindex": index,
              })}
            >
              {row.cells.map((cell) => (
                <HvTableCell key={cell.Header} {...cell.getCellProps()}>
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
              caption: "Table Caption",
            })}
            style={{
              width: 100,
            }}
          >
            <HvTableHead>
              <HvTableRow>
                {headers.map((col) => (
                  <HvTableHeader key={col.Header} {...col.getHeaderProps()}>
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

        <HvPagination {...getHvPaginationProps()} />
      </>
    );
  },
};

export const ExpandColumnRenderer = () => {
  const getColumns = () => [
    hvTextColumn({
      Header: "Event Type",
      accessor: "eventType",
      style: { maxWidth: 160 },
    }),
    hvExpandColumn(
      { Header: "Title", accessor: "name", style: { maxWidth: 100 } },
      "expand",
      "collapse",
      (row) => row.values.eventType !== undefined
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
  } = useHvData(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }) => value ?? "—",
      },
      disableCreateExpandButton: true,
    },
    useHvRowExpand,
    useHvPagination
  );

  const rowRenderer = (pages) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            key={row.Header}
            {...row.getRowProps({
              "aria-rowindex": index,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell key={cell.Header} {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
          {/* @ts-ignore */}
          <HvTableRow style={{ display: row.isExpanded ? null : "none" }}>
            <HvTableCell
              style={{
                paddingBottom: 0,
                paddingTop: 0,
                textAlign: "center",
                height: 100,
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
            caption: "Table Caption",
          })}
          style={{
            width: 300,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader key={col.Header} {...col.getHeaderProps()}>
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

      <HvPagination {...getHvPaginationProps()} />
    </>
  );
};

export const SwitchColumnRenderer: StoryObj = {
  render: () => {
    const initialData = useMemo(() => makeRenderersData(64), []);

    const [data, setData] = useState(initialData);

    const columns = useMemo(() => {
      return [
        hvSwitchColumn(
          {
            Header: "isDisabled",
            accessor: "isDisabled",
            style: { minWidth: 180 },
          },
          "default",
          "yes",
          "no",
          {
            onChange: (event, checked, value) => {
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
    } = useHvData(
      {
        columns,
        data,
        defaultColumn: {
          Cell: ({ value }) => value ?? "—",
        },
      },
      useHvPagination
    );

    const rowRenderer = (pages) => {
      return pages.map((row, index) => {
        prepareRow(row);

        return (
          <React.Fragment key={row.id}>
            <HvTableRow
              key={row.Header}
              {...row.getRowProps({
                "aria-rowindex": index,
              })}
            >
              {row.cells.map((cell) => (
                <HvTableCell key={cell.Header} {...cell.getCellProps()}>
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
              caption: "Table Caption",
            })}
            style={{
              width: 50,
            }}
          >
            <HvTableHead>
              <HvTableRow>
                {headers.map((col) => (
                  <HvTableHeader key={col.Header} {...col.getHeaderProps()}>
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

        <HvPagination {...getHvPaginationProps()} />
      </>
    );
  },
};

export const TagColumnRenderer: StoryObj = {
  render: () => {
    const columns = useMemo(() => {
      return [
        hvTagColumn(
          { Header: "Status", accessor: "status", style: { width: 20 } },
          "status_name",
          "status_color",
          "status_text_color",
          false,
          {
            color: "cviz5",
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
    } = useHvData(
      {
        columns,
        data,
        defaultColumn: {
          Cell: ({ value }) => value ?? "—",
        },
      },
      useHvPagination
    );

    const rowRenderer = (pages) => {
      return pages.map((row, index) => {
        prepareRow(row);

        return (
          <React.Fragment key={row.id}>
            <HvTableRow
              key={row.Header}
              {...row.getRowProps({
                "aria-rowindex": index,
              })}
            >
              {row.cells.map((cell) => (
                <HvTableCell key={cell.Header} {...cell.getCellProps()}>
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
              caption: "Table Caption",
            })}
            style={{
              width: 50,
            }}
          >
            <HvTableHead>
              <HvTableRow>
                {headers.map((col) => (
                  <HvTableHeader key={col.Header} {...col.getHeaderProps()}>
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

        <HvPagination {...getHvPaginationProps()} />
      </>
    );
  },
};

export const ProgressColumnRenderer = () => {
  const columns = useMemo(() => {
    return [
      hvProgressColumn(
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
  } = useHvData(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }) => value ?? "—",
      },
    },
    useHvPagination
  );

  const rowRenderer = (pages) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            key={row.Header}
            {...row.getRowProps({
              "aria-rowindex": index,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell key={cell.Header} {...cell.getCellProps()}>
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
            caption: "Table Caption",
          })}
          style={{
            width: 230,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader key={col.Header} {...col.getHeaderProps()}>
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

      <HvPagination {...getHvPaginationProps()} />
    </>
  );
};

export const DropdownColumnRenderer = () => {
  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data, setData] = useState(initialData);

  const columns = useMemo(() => {
    return [
      hvDropdownColumn(
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
                if (newSev.id === value.id) newSev.selected = value.selected;
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
  } = useHvData(
    {
      columns,
      data,
      defaultColumn: {
        Cell: ({ value }) => value ?? "—",
      },
    },
    useHvPagination
  );

  const rowRenderer = (pages) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            key={row.Header}
            {...row.getRowProps({
              "aria-rowindex": index,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell key={cell.Header} {...cell.getCellProps()}>
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
            caption: "Table Caption",
          })}
          style={{
            width: 230,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader key={col.Header} {...col.getHeaderProps()}>
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

      <HvPagination {...getHvPaginationProps()} />
    </>
  );
};

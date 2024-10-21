import { useState } from "react";
import { PropItem } from "react-docgen-typescript";
import { css } from "@emotion/css";
import { useData } from "nextra/hooks";
import {
  HvInput,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableColumnConfig,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

const classes = {
  root: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.space.md,
  }),
  search: css({
    marginTop: theme.space.md,
  }),
  table: css({
    backgroundColor: "transparent",
  }),
  head: css({
    backgroundColor: "transparent",
  }),
  row: css({
    display: "table-row",
    borderColor: theme.colors.atmo3,
    backgroundColor: "transparent",
  }),
  type: css({
    fontSize: 12,
    color: theme.colors.primary_80,
  }),
  tooltip: css({
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  }),
};

const reorderProps = (obj: Record<string, PropItem>) => {
  const entries = Object.entries(obj);
  const sortedEntries = entries.sort(
    ([, a], [, b]) => (b.required ? 1 : 0) - (a.required ? 1 : 0),
  );
  return Object.fromEntries(sortedEntries);
};

const columns: HvTableColumnConfig<PropItem, string>[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Description",
    accessor: "description",
  },
];

export const Props = () => {
  const { meta } = useData();

  const props = meta.docgen?.props;

  const [propsToShow, setPropsToShow] = useState(props);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => {
    const filteredEntries = Object.entries(props).filter(([key]) =>
      key.includes(value),
    );
    setPropsToShow(Object.fromEntries(filteredEntries));
  };

  // reorder props to show required props first
  const orderedPros = reorderProps(propsToShow);

  return (
    <div className={classes.root}>
      <HvInput
        type="search"
        placeholder="Search prop"
        onChange={handleSearch}
        className={classes.search}
      />
      <HvTypography variant="title2">
        {meta.component} component props
      </HvTypography>
      <HvTableContainer className={classes.table}>
        <HvTable>
          <HvTableHead>
            <HvTableRow className={classes.row}>
              {columns.map((el) => (
                <HvTableHeader key={el.Header} className={classes.head}>
                  {el.Header}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody>
            {Object.entries(orderedPros).map(
              ([propKey, value]: [string, unknown]) => {
                const propItem = value as PropItem;
                return (
                  <HvTableRow key={propKey} className={classes.row}>
                    <HvTableCell style={{ width: "25%" }}>
                      <HvTypography>
                        {propKey}
                        {propItem.required ? "*" : ""}
                      </HvTypography>
                    </HvTableCell>
                    <HvTableCell style={{ width: "30%" }}>
                      <HvTypography className={classes.type}>
                        <pre className={classes.tooltip}>
                          {propItem.type.name}
                        </pre>
                      </HvTypography>
                    </HvTableCell>
                    <HvTableCell>
                      <HvTypography
                        dangerouslySetInnerHTML={{
                          __html: propItem.description.replace(
                            /`([^`]+)`/g,
                            "<code>$1</code>",
                          ),
                        }}
                      />
                    </HvTableCell>
                  </HvTableRow>
                );
              },
            )}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    </div>
  );
};

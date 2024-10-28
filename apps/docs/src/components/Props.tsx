import { useState } from "react";
import { PropItem } from "react-docgen-typescript";
import { css } from "@emotion/css";
import { useData } from "nextra/hooks";
import {
  HvEmptyState,
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
import { Ban } from "@hitachivantara/uikit-react-icons";

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
    marginBottom: theme.space.md,
  }),
  head: css({
    backgroundColor: "transparent",
  }),
  row: css({
    display: "table-row",
    borderColor: theme.colors.atmo3,
    backgroundColor: "transparent",
  }),
  emptyRow: css({
    display: "table-row",
    borderColor: theme.colors.atmo3,
    backgroundColor: "transparent",
    justifyContent: "center",
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

// order the props by required first and then alphabetically
const reorderProps = (obj: Record<string, PropItem>) => {
  return Object.fromEntries(
    Object.entries(obj).sort(([keyA, a], [keyB, b]) => {
      if (a.required === b.required) {
        return keyA.localeCompare(keyB);
      }
      return a.required ? -1 : 1;
    }),
  );
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

const EmptyStateRow = () => (
  <HvTableRow className={classes.row}>
    <HvTableCell colSpan={3} style={{ height: 64 }}>
      <HvEmptyState message="No data to display." icon={<Ban />} />
    </HvTableCell>
  </HvTableRow>
);

const PropsTable = ({ propsObj }: { propsObj: Record<string, PropItem> }) => {
  return (
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
          {Object.entries(propsObj).length === 0 ? (
            <EmptyStateRow />
          ) : (
            Object.entries(propsObj).map(
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
                          {propItem.type?.name}
                        </pre>
                      </HvTypography>
                    </HvTableCell>
                    <HvTableCell>
                      <HvTypography
                        dangerouslySetInnerHTML={{
                          __html: propItem.description?.replace(
                            /`([^`]+)`/g,
                            "<code>$1</code>",
                          ),
                        }}
                      />
                    </HvTableCell>
                  </HvTableRow>
                );
              },
            )
          )}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const Props = () => {
  const { meta } = useData();

  const props = meta.docgen?.props || {};
  const subComponentsDocgen =
    meta.subComponentsDocgen ||
    ({} as Record<string, { props: Record<string, PropItem> }>);

  const [searchTerm, setSearchTerm] = useState("");

  const orderedMainProps = reorderProps(props);

  const orderedSubComponents = Object.entries(subComponentsDocgen).reduce(
    (acc, [subComponent, docgen]) => {
      const subComponentDocgen = docgen as { props: Record<string, PropItem> };
      acc[subComponent] = reorderProps(subComponentDocgen.props);
      return acc;
    },
    {} as Record<string, Record<string, PropItem>>,
  );

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => {
    setSearchTerm(value);
  };

  const filterProps = (propItems: Record<string, PropItem>, search: string) => {
    if (!search) return propItems;
    const filteredEntries = Object.entries(propItems).filter(([key]) =>
      key.toLowerCase().includes(search.toLowerCase()),
    );
    return Object.fromEntries(filteredEntries);
  };

  const filteredMainProps = filterProps(orderedMainProps, searchTerm);

  const filteredSubComponents = Object.entries(orderedSubComponents).reduce(
    (acc, [subComponent, propsItems]) => {
      acc[subComponent] = filterProps(propsItems, searchTerm);
      return acc;
    },
    {} as Record<string, Record<string, PropItem>>,
  );
  return (
    <div className={classes.root}>
      <HvInput
        type="search"
        placeholder="Search prop"
        onChange={handleSearch}
        className={classes.search}
      />
      <HvTypography variant="title2">
        {meta.docgen.displayName || meta.component} component props
      </HvTypography>
      <PropsTable propsObj={filteredMainProps} />

      {Object.entries(filteredSubComponents).map(
        ([subComponent, propItems]) => (
          <div key={subComponent} className={classes.root}>
            <HvTypography variant="title2">
              {meta.subComponentsDocgen[subComponent].displayName ||
                subComponent}{" "}
              component props
            </HvTypography>
            <PropsTable propsObj={propItems} />
          </div>
        ),
      )}
    </div>
  );
};

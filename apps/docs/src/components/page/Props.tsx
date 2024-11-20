import { useState } from "react";
import type { PropItem } from "react-docgen-typescript";
import { useData } from "nextra/hooks";
import {
  HvEmptyState,
  HvInput,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTypography,
  type HvTableColumnConfig,
} from "@hitachivantara/uikit-react-core";
import { Ban } from "@hitachivantara/uikit-react-icons";

type PropsTableProps = {
  propsObj: Record<string, PropItem>;
};

const classes = {
  root: "flex flex-col",
  row: "table-row border-b border-atmo3 !bg-transparent",
  emptyRow: "table-row border-b border-atmo3 justify-center",
};

const reorderProps = (props: Record<string, PropItem>) =>
  Object.fromEntries(
    Object.entries(props).sort(([keyA, a], [keyB, b]) =>
      a.required === b.required
        ? keyA.localeCompare(keyB)
        : a.required
          ? -1
          : 1,
    ),
  );

const columns: HvTableColumnConfig<PropItem, string>[] = [
  { Header: "Name", accessor: "name" },
  { Header: "Type", accessor: "type" },
  { Header: "Description", accessor: "description" },
];

const PropsTitle = ({ title }: { title: string }) => (
  <HvTypography variant="title3" className="mt-md mb-md">
    {`${title.slice(2)} props`}
  </HvTypography>
);

const EmptyStateRow = () => (
  <HvTableRow className={classes.row}>
    <HvTableCell colSpan={3} style={{ height: 64 }}>
      <HvEmptyState message="No data to display." icon={<Ban />} />
    </HvTableCell>
  </HvTableRow>
);

const PropsTable = ({ propsObj }: PropsTableProps): JSX.Element => (
  <HvTableContainer>
    <HvTable>
      <HvTableHead>
        <HvTableRow className={classes.row}>
          {columns.map((col, i) => (
            <HvTableHeader
              key={col.Header}
              className={`!bg-transparent ${i === 0 ? "!pl-1" : ""}`}
            >
              {col.Header}
            </HvTableHeader>
          ))}
        </HvTableRow>
      </HvTableHead>
      <HvTableBody>
        {Object.keys(propsObj).length === 0 ? (
          <EmptyStateRow />
        ) : (
          Object.entries(propsObj).map(([key, propItem]) => (
            <HvTableRow key={key} className={classes.row}>
              <HvTableCell className="!pl-1 w-[25%]">
                <HvTypography>
                  {key}
                  {propItem.required && "*"}
                </HvTypography>
              </HvTableCell>
              <HvTableCell className="w-[30%]">
                <HvTypography className="!text-[12px] !text-primary_80">
                  <pre className="whitespace-pre-wrap break-words">
                    {propItem.type?.name}
                  </pre>
                </HvTypography>
              </HvTableCell>
              <HvTableCell>
                <HvTypography>
                  {propItem.description
                    ?.split(/(`[^`]+`)/g)
                    .map((part) =>
                      part.startsWith("`") && part.endsWith("`") ? (
                        <code key={part}>{part.slice(1, -1)}</code>
                      ) : (
                        part
                      ),
                    )}
                </HvTypography>
              </HvTableCell>
            </HvTableRow>
          ))
        )}
      </HvTableBody>
    </HvTable>
  </HvTableContainer>
);

export const Props = () => {
  const { meta } = useData();
  const { docgen, subComponentsDocgen } = meta;
  const [searchTerm, setSearchTerm] = useState("");

  const orderedMainProps = reorderProps(docgen?.props || {});
  const orderedSubComponents = Object.fromEntries(
    Object.entries(subComponentsDocgen).map(
      ([subComponent, subComponentDocgen]) => [
        subComponent,
        reorderProps(
          (subComponentDocgen as { props: Record<string, PropItem> }).props,
        ),
      ],
    ),
  );

  const filterProps = (props: Record<string, PropItem>, search: string) =>
    Object.fromEntries(
      Object.entries(props).filter(([key]) =>
        key.toLowerCase().includes(search.toLowerCase()),
      ),
    );

  const filteredMainProps = filterProps(orderedMainProps, searchTerm);
  const filteredSubComponents = Object.fromEntries(
    Object.entries(orderedSubComponents).map(([subComponent, props]) => [
      subComponent,
      filterProps(props, searchTerm),
    ]),
  );

  return (
    <div className={classes.root}>
      <HvInput
        type="search"
        placeholder="Search prop"
        onChange={(_, value) => setSearchTerm(value)}
      />
      <PropsTitle title={meta.docgen.displayName || meta.component} />
      <PropsTable propsObj={filteredMainProps} />
      {Object.entries(filteredSubComponents).map(([subComponent, props]) => (
        <div key={subComponent} className={classes.root}>
          <PropsTitle
            title={
              subComponentsDocgen[subComponent]?.displayName || subComponent
            }
          />
          <PropsTable propsObj={props} />
        </div>
      ))}
    </div>
  );
};

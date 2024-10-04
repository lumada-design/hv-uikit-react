import { useState } from "react";
import { css } from "@emotion/css";
import { useData } from "nextra/hooks";
import {
  HvIconButton,
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
import { Copy } from "@hitachivantara/uikit-react-icons";

type ClassItem = {
  name: string;
  selector: string;
};

const classes = {
  root: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.space.md,
  }),
  search: css({
    marginTop: theme.space.md,
  }),
  import: css({
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
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
};

const columns: HvTableColumnConfig<any, string>[] = [
  {
    Header: "Selector",
    accessor: "name",
  },
  {
    Header: "Static selector",
    accessor: "selector",
  },
];

export const Classes = () => {
  const { meta } = useData();

  const [copyText, setCopyText] = useState("Copy code");

  const classesToShow: ClassItem[] = Object.entries(meta.classes).map(
    ([name, selector]) => ({
      name,
      selector: selector as string,
    }),
  );

  const classesImport = `import { ${meta.component.charAt(0).toLowerCase() + meta.component.slice(1)}Classes } from "@hitachivantara/uikit-react-core";`;

  return (
    <div className={classes.root}>
      <HvTypography variant="title2">{meta.component} selectors</HvTypography>

      <HvTypography>
        {meta.component} classes can be used to style the component. The
        selectors can be imported from the {meta.package} package:
      </HvTypography>
      <div className={classes.import}>
        <HvTypography>
          <pre>{classesImport}</pre>
        </HvTypography>
        <HvIconButton
          title={copyText}
          onClick={() => {
            navigator.clipboard.writeText(classesImport);
            setCopyText("Copied");
          }}
        >
          <Copy size="XS" />
        </HvIconButton>
      </div>
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
            {classesToShow.map((c: ClassItem) => (
              <HvTableRow key={c.name} className={classes.row}>
                <HvTableCell style={{ width: "25%" }}>
                  <HvTypography>{c.name}</HvTypography>
                </HvTableCell>
                <HvTableCell>
                  <HvTypography className={classes.type}>
                    <pre>.{c.selector}</pre>
                  </HvTypography>
                </HvTableCell>
              </HvTableRow>
            ))}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    </div>
  );
};

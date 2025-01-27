/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import { useMemo, useRef, useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableCellProps,
  HvTableContainer,
  HvTableHead,
  HvTableRow,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Close } from "@hitachivantara/uikit-react-icons";

// ID     Name                        Age Location    Occupation       Salary   Department    Email                     Phone
const baseData = `
10001  Lazarus      Stormcloak     30  New York    Engineer         70000    R&D           lazarus@example.com       123-456-7890
10002  Eleonora     Stormcloak     51  London      Manager          85000    HR            eleonora@example.com      234-567-8901
10003  Silvermoon   Shadowdancer   32  Portugal    Designer         65000    Design        silvermoon@example.com    345-678-9012
10004  Marigold     Winterfell     45  India       Developer        75000    IT            marigold@example.com      456-789-0123
10005  Cassian      Darkwater      39  France      Analyst          72000    Finance       cassian@example.com       567-890-1234
10006  Ophelia      Ravenshroud    48  Spain       Consultant       80000    Consulting    ophelia@example.com       678-901-2345
10007  Atticus      Withertom      29  London      Engineer         70000    R&D           atticus@example.com       789-012-3456
10008  Calliope     Riverstone     41  Portugal    Manager          85000    HR            calliope@example.com      890-123-4567
10009  Oberon       Frostwolf      46  India       Designer         65000    Design        oberon@example.com        901-234-5678
10010  Theodora     Moonshadow     57  France      Developer        75000    IT            theodora@example.com      012-345-6789
10011  Zephyrus     Nightshade     36  New York    Analyst          72000    Finance       zephyrus@example.com      123-456-7890
10012  Persephone   Wildwood       38  London      Consultant       80000    Consulting    persephone@example.com    234-567-8901
10013  Seraphim     Foxglove       44  Spain       Engineer         70000    R&D           seraphim@example.com      345-678-9012
10014  Orion        Thunderforge   60  India       Manager          85000    HR            orion@example.com         456-789-0123
`;

type Columns = Record<number, string>;

const initialColumn = -1;

export function Component() {
  const data = baseData.trimStart().repeat(4);
  const [columns, setColumns] = useState<Columns>({});

  console.log(columns);

  return (
    <MagicTable data={data} columns={columns} onColumnsChange={setColumns} />
  );
}

const boxShadow = `1px 0 1px 1px currentColor, -1px 0 1px currentColor`;

const classes = {
  crosshairContainer: css({
    position: "absolute",
    pointerEvents: "none",
    inset: 0,
    zIndex: 4,
    "& > *": {
      position: "absolute",
      height: "100%",
    },
  }),
  crosshairHover: css({
    width: 1,
    backgroundColor: theme.colors.neutral,
    color: theme.alpha(theme.colors.neutral, 0.2),
    boxShadow,
  }),
  crosshairColumn: css({
    pointerEvents: "auto",

    ":hover": {
      cursor: "pointer",
      "& > div": {
        backgroundColor: theme.colors.negative,
        color: theme.alpha("negative", 0.2),
        boxShadow,
      },
    },
    "& > div": {
      backgroundColor: theme.colors.pp.dividerDimmed, // `divider`is barely visible
    },
  }),
  headerCell: css({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
    padding: 0,
    minHeight: 48,

    backgroundColor: theme.colors.atmo2,
    paddingLeft: 1,

    "& button": {
      position: "absolute",
      top: 0,
      right: 0,
      cursor: "pointer",
    },
    ":not(:hover) button": {
      display: "none",
    },
  }),
};

function MagicTable({
  data,
  columns: columnsProp,
  onColumnsChange,
}: {
  data: string;
  columns: Columns;
  onColumnsChange: (columns: Columns) => void;
}) {
  const [hoverColumn, setHoverColumn] = useState(initialColumn);
  const [charWidth, setCharWidth] = useState(8);
  const tableRef = useRef<HTMLTableElement>(null);

  const getColumnName = useMemo(() => {
    let i = 1;
    return function getColumnName(index?: number) {
      return `Field ${index ?? i++}`;
    };
  }, []);

  const columns = useMemo(() => {
    return Object.keys(columnsProp).length > 0
      ? columnsProp
      : { 0: getColumnName(0) };
  }, [columnsProp, getColumnName]);

  /** adds the column on `index`, or removes when existing  */
  function handleColumnToggle(index: number) {
    if (index === 0) return;
    const newCols = { ...columns, [index]: getColumnName() };
    if (columns[index]) {
      delete newCols[index];
    }
    onColumnsChange(newCols);
  }

  function handleColumnRemove(index: number) {
    if (index === 0) return;
    const newCols = { ...columns };
    delete newCols[index];
    onColumnsChange(newCols);
  }

  return (
    <HvTableContainer className="relative max-h-420px font-mono">
      <div
        className="invisible h-0 absolute font-mono"
        ref={(el) => {
          if (!el) return;
          const { width } = el.getBoundingClientRect();
          setCharWidth(width); // get width of a character/column
        }}
      >
        0
      </div>
      <HvTable
        ref={tableRef}
        className="cursor-ns-resize"
        onClick={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          const rect = evt.currentTarget.getBoundingClientRect();
          const offsetX = evt.clientX - rect.left;
          const col = getColumn(offsetX, charWidth);
          handleColumnToggle?.(col);
        }}
        onMouseMove={(evt) => {
          const rect = evt.currentTarget.getBoundingClientRect();
          const offsetX = evt.clientX - rect.left;
          const col = getColumn(offsetX, charWidth);

          setHoverColumn(col);
        }}
        onMouseLeave={() => {
          setHoverColumn(initialColumn);
        }}
      >
        <HvTableHead stickyHeader>
          <HvTableRow className="flex">
            {Object.entries(columns).map(([index, name], i, cols) => (
              <MagicCell
                key={index}
                column={{ index: Number(index), name }}
                onColumnRemove={handleColumnRemove}
                style={{
                  flex:
                    i === cols.length - 1
                      ? "1 0 auto"
                      : `0 0 ${Number(cols[i + 1][0]) - Number(index)}ch`,
                }}
              />
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          <HvTableRow>
            <HvTableCell className="p-0">
              <pre>{data}</pre>
            </HvTableCell>
          </HvTableRow>
        </HvTableBody>
      </HvTable>
      <MagicOverlay
        hoverColumn={hoverColumn}
        height={tableRef.current?.clientHeight}
        columns={columns}
        onColumnRemove={handleColumnRemove}
      />
    </HvTableContainer>
  );
}

function MagicCell({
  column,
  onColumnRemove,
  ...others
}: {
  column: { index: number; name: string };
  onColumnRemove?: (index: number) => void;
} & HvTableCellProps) {
  return (
    <HvTableCell className={classes.headerCell} {...others}>
      <HvTypography
        variant="label"
        className="text-wrap break-all line-clamp-2"
      >
        {column.name}
      </HvTypography>
      {column.index > 0 && (
        <HvButton
          icon
          onClick={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            onColumnRemove?.(column.index);
          }}
        >
          <Close size="xs" className="size-20px" />
        </HvButton>
      )}
    </HvTableCell>
  );
}

/** table overlay line separators */
function MagicOverlay({
  height,
  hoverColumn,
  columns,
  onColumnRemove,
}: {
  height?: number;
  hoverColumn: number;
  columns: Columns;
  onColumnRemove: (index: number) => void;
}) {
  return (
    <div className={classes.crosshairContainer} style={{ height }}>
      {Object.keys(columns).map((index) => (
        <div
          key={index}
          className={classes.crosshairColumn}
          style={{ left: `calc(${index}ch - 4px)` }}
          onClick={() => onColumnRemove(Number(index))}
        >
          <div className="w-1px h-full mx-3px bg-current" />
        </div>
      ))}
      <div
        className={classes.crosshairHover}
        style={{ left: `${hoverColumn}ch` }}
      />
    </div>
  );
}

function getColumn(offsetX: number, charWidth: number) {
  return Math.round(offsetX / charWidth);
}

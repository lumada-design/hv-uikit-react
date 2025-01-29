/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import { useMemo, useRef, useState } from "react";
import { css } from "@emotion/css";
import { CaretDown, Trash } from "@phosphor-icons/react";
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
    width: 2,
    color: theme.colors.primary,
  }),
  crosshairColumn: css({
    pointerEvents: "auto",
    paddingRight: "0.5ch",

    color: theme.colors.pp.divider,

    ":hover": {
      cursor: "ew-resize",
      color: theme.colors.primary,
    },

    ":not(:hover)": {
      "& > button": {
        display: "none",
      },
      "& > div": {
        borderStyle: "solid",
      },
    },
  }),
  line: css({
    height: "100%",
    borderLeft: `2px dashed currentcolor`,
  }),
  headerCell: css({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
    padding: 0,
    minHeight: 48,

    backgroundColor: theme.colors.atmo2,
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
      : { 0: getColumnName(1) };
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
    <HvTableContainer className="relative font-mono w-fit max-h-420px">
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
        // className="cursor-ew-resize"
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
            <HvTableCell className="p-0 select-none">
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
        variant="captionLabel"
        className="pl-2px pr-1px text-wrap break-all line-clamp-2"
      >
        {column.name}
      </HvTypography>
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
        <MagicLine
          key={index}
          index={Number(index)}
          onColumnMove={() => {}}
          onColumnRemove={onColumnRemove}
        />
      ))}
      <div
        className={classes.crosshairHover}
        style={{ left: `${hoverColumn}ch` }}
      >
        <div className="relative size-16px -left-7px -top-4px">
          <CaretDown
            weight="fill"
            fontSize={16}
            style={{ color: theme.colors.negative }}
          />
        </div>
        <div className={classes.line} />
      </div>
    </div>
  );
}

function MagicLine({
  index,
  onColumnMove,
  onColumnRemove,
}: {
  index: number;
  onColumnMove: (index: number, newIndex: number) => void;
  onColumnRemove: (index: number) => void;
}) {
  const [state, setState] = useState<"idle" | "delete" | "drag">("idle");

  if (index === 0) return null; // never render first column's line

  return (
    <div
      key={index}
      className={classes.crosshairColumn}
      style={{ left: `calc(${index}ch - 1px)` }}
      onClick={() => onColumnRemove(Number(index))}
      onMouseDown={() => {
        setState("drag");
      }}
      onMouseUp={() => {
        if (state === "idle") return;
        if (state === "delete") {
          onColumnRemove(Number(index));
        } else if (state === "drag") {
          onColumnMove(index, 0 /* newIndex */);
        }
      }}
    >
      <HvButton
        icon
        variant="subtle"
        aria-label="Delete"
        className="relative float-right top-xs left-xxs"
      >
        <div className="p-4px">
          <Trash fontSize={16} />
        </div>
      </HvButton>
      <div className={classes.line} />
    </div>
  );
}

function getColumn(offsetX: number, charWidth: number) {
  return Math.round(offsetX / charWidth);
}

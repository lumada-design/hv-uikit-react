/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import { useRef, useState } from "react";
import { css } from "@emotion/css";
import { CaretDown } from "@phosphor-icons/react";
import {
  HvInlineEditor,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableRow,
  theme,
} from "@hitachivantara/uikit-react-core";

export type Columns = Record<number, string>;

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
    padding: "0 0.6ch",

    color: theme.colors.pp.divider,

    ":hover, &[data-state='drag']": {
      cursor: "ew-resize",
      color: theme.colors.primary,
    },
  }),
  line: css({
    height: "100%",
    borderLeft: `2px solid currentcolor`,
  }),
  headerCell: css({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    overflow: "hidden",
    height: "100%",
    padding: 0,
    minHeight: 48,

    backgroundColor: theme.colors.atmo2,
  }),
};

export function SplitterTable({
  data,
  columns,
  onColumnsChange,
}: {
  data: string;
  columns: Columns;
  onColumnsChange: (columns: Columns) => void;
}) {
  const [hoverColumn, setHoverColumn] = useState(-1);
  const [charWidth, setCharWidth] = useState(8);
  const tableRef = useRef<HTMLTableElement>(null);

  /** adds the column on `index`, or removes when existing  */
  function handleColumnToggle(index: number) {
    if (index === 0) return;
    const newCols = { ...columns, [index]: getName(columns) };
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

  function handleColumnMove(index: number, newIndex: number) {
    if (index === 0 || newIndex === 0) return;
    const newCols = { ...columns };
    const colName = newCols[index];
    delete newCols[index];
    newCols[newIndex] = colName;
    onColumnsChange(newCols);
  }

  const shouldHideHover =
    hoverColumn === -1 ||
    Object.keys(columns).some((idx) => hoverColumn === Number(idx));

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
        onClick={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          const { tagName } = evt.target as HTMLElement;
          if (tagName !== "PRE" && tagName !== "TD") return;
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
          setHoverColumn(-1);
        }}
      >
        <HvTableHead stickyHeader>
          <HvTableRow className="flex">
            {Object.entries(columns).map(([index, name], i, cols) => (
              <HvTableCell
                key={`${i}-${name}`}
                className={classes.headerCell}
                style={{
                  flex:
                    i === cols.length - 1
                      ? "1 0 auto"
                      : `0 0 ${Number(cols[i + 1][0]) - Number(index)}ch`,
                }}
              >
                <HvInlineEditor
                  variant="captionLabel"
                  disableClear
                  classes={{
                    root: "px-2px max-w-60px",
                    button: "p-0 bg-transparent hover:bg-transparent [&>*]:m-0",
                    input: "ml-2px mr-0",
                    icon: "hidden",
                  }}
                  onEnter={(evt) => evt.currentTarget.blur()}
                  defaultValue={name}
                  onBlur={(evt, newValue) => {
                    const newCols = { ...columns };
                    newCols[Number(index)] = newValue;
                    onColumnsChange(newCols);
                  }}
                />
              </HvTableCell>
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
      <div
        className={classes.crosshairContainer}
        style={{ height: tableRef.current?.clientHeight }}
      >
        {Object.entries(columns).map(([index, name], i) => (
          <ColumnSeparatorLine
            key={`${i}-${name}`}
            charWidth={charWidth}
            index={Number(index)}
            onColumnMove={handleColumnMove}
            onColumnRemove={handleColumnRemove}
          />
        ))}
        <div
          className={classes.crosshairHover}
          style={{
            left: `${hoverColumn}ch`,
            display: shouldHideHover ? "none" : undefined,
          }}
        >
          <div className="relative size-16px -left-7px -top-4px">
            <CaretDown
              weight="fill"
              fontSize={16}
              style={{ color: theme.colors.negative }}
            />
          </div>
          <div className={classes.line} style={{ borderStyle: "dashed" }} />
        </div>
      </div>
    </HvTableContainer>
  );
}

function ColumnSeparatorLine({
  index,
  charWidth,
  onColumnMove,
  onColumnRemove,
}: {
  index: number;
  charWidth: number;
  onColumnMove: (index: number, newIndex: number) => void;
  onColumnRemove: (index: number) => void;
}) {
  type State = "idle" | "delete" | "drag";
  const stateRef = useRef<State>("idle");
  const [state, setState] = useState<State>("idle");

  if (index === 0) return null; // never render first column's line

  function changeState(newState: State) {
    setState(newState);
    // keep a ref to use inside native eventHandlers
    stateRef.current = newState;
  }

  const color =
    (state === "delete" && theme.colors.negative) ||
    (state === "drag" && theme.colors.primary) ||
    "";

  return (
    <div
      data-state={state}
      className={classes.crosshairColumn}
      style={{ color, left: `calc(${index}ch - 0.5ch - 1px)` }}
      onMouseDown={(evt) => {
        const el = evt.currentTarget.parentElement?.parentElement;
        if (!el) return;

        el.style.userSelect = "none";
        changeState("delete");
        const abortController = new AbortController();

        el.addEventListener(
          "mousemove",
          (evt) => {
            changeState("drag");
            const { left } = el.getBoundingClientRect();
            const offsetX = evt.clientX - left;
            const col = getColumn(offsetX, charWidth);
            onColumnMove(index, col);
          },
          { signal: abortController.signal },
        );
        el.addEventListener(
          "mouseup",
          () => {
            el.style.userSelect = "";
            if (stateRef.current === "delete") {
              onColumnRemove(index);
            }
            changeState("idle");
            abortController.abort();
          },
          { signal: abortController.signal },
        );
      }}
    >
      <div className={classes.line} />
    </div>
  );
}

function getName(columns?: Columns) {
  const index = Object.values(columns || {})
    .map((v) => Number(v))
    .filter((v) => !Number.isNaN(v))
    .toSorted((a, b) => a - b)
    .at(-1);
  return `${(index ?? 0) + 1}`;
}

function getColumn(offsetX: number, charWidth: number) {
  return Math.round(offsetX / charWidth);
}

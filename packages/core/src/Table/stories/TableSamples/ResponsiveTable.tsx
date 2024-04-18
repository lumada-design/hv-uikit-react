import { useMemo } from "react";
import styled from "@emotion/styled";
import { Breakpoints as MuiBreakpoints, useTheme } from "@mui/material/styles";
import {
  HvOverflowTooltip,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  theme,
} from "@hitachivantara/uikit-react-core";

import { getColumns, makeData } from "../storiesUtils";

// #region Responsive table styled components
const StyledResponsiveTableContainer = styled(HvTableContainer)({
  minWidth: 200,
  maxHeight: 300,
});

const StyledResponsiveTable = styled(HvTable)({
  display: "flex",
  flexFlow: "column wrap",
});

const StyledResponsiveHead = styled(HvTableHead)<{
  $breakpoints: MuiBreakpoints;
}>(({ $breakpoints }) => ({
  display: "flex",
  flexFlow: "column wrap",
  height: "auto",

  [$breakpoints.only("md")]: {
    "&:first-of-type": {
      position: "sticky",
      top: -1,
      zIndex: 3,
    },
  },

  [$breakpoints.down("sm")]: {
    "&:first-of-type": {
      display: "none",
    },
  },
}));

const StyledResponsiveBody = styled(HvTableBody)<{
  $breakpoints: MuiBreakpoints;
}>(({ $breakpoints }) => ({
  display: "flex",
  flexFlow: "column wrap",

  [$breakpoints.only("md")]: {
    "&:first-of-type": {
      position: "sticky",
      top: -1,
      zIndex: 3,
    },
  },

  [$breakpoints.down("sm")]: {
    "&:first-of-type": {
      display: "none",
    },
  },
}));

const StyledResponsiveTableRow = styled(HvTableRow)(
  ({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
    display: "flex",
    flexFlow: "row wrap",

    "&>*": {
      width: "calc(100% / 7)",

      display: "flex",
      alignItems: "center",

      [$breakpoints.down("sm")]: {
        width: "100%",

        "&:first-of-type": {
          width: "100%",
          justifyContent: "center",
          backgroundColor: theme.colors.atmo1,
        },
      },
    },

    [$breakpoints.down("sm")]: {
      "& > div:not(:first-of-type)::before": {
        content: "attr(data-label) ",
        fontWeight: "bold",
        width: 150,
      },
    },
  }),
);

const StyledResponsiveTableHeader = styled(HvTableHeader)({
  display: "flex",
  alignItems: "start",
});
// #endregion Responsive table styled components

export const ResponsiveTable = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(20), []);
  const muiTheme = useTheme();

  return (
    <StyledResponsiveTableContainer>
      <StyledResponsiveTable component="div">
        <StyledResponsiveHead $breakpoints={muiTheme.breakpoints}>
          <StyledResponsiveTableRow $breakpoints={muiTheme.breakpoints}>
            {columns.map((el) => (
              <StyledResponsiveTableHeader key={el.Header}>
                <HvOverflowTooltip data={el.Header}>
                  {el.Header}
                </HvOverflowTooltip>
              </StyledResponsiveTableHeader>
            ))}
          </StyledResponsiveTableRow>
        </StyledResponsiveHead>
        <StyledResponsiveBody tabIndex={0} $breakpoints={muiTheme.breakpoints}>
          {data.map((row) => (
            <StyledResponsiveTableRow
              key={row.id}
              hover
              $breakpoints={muiTheme.breakpoints}
            >
              {Object.keys(row)
                .slice(1)
                .map((key, i) => (
                  <HvTableCell
                    key={`${row[key]}_${columns[i].Header}`}
                    data-label={columns[i].Header}
                  >
                    {row[key]}
                  </HvTableCell>
                ))}
            </StyledResponsiveTableRow>
          ))}
        </StyledResponsiveBody>
      </StyledResponsiveTable>
    </StyledResponsiveTableContainer>
  );
};

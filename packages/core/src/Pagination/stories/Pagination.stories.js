import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { HvPagination, HvTypography } from "../..";

export default {
  title: "Components/Pagination",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvPagination } from "@hitachivantara/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvPagination,
};

export const Main = () => {
  const pageSizeOptions = [4, 6, 12, 24, 48, 2000];
  const data = [...Array(64).keys()];

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[2]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "&>span": {
        width: "100px",
        padding: "8px 12px",
        margin: "12px",
        textAlign: "center",
        borderRadius: "4px",
        background: theme.hv.palette.atmosphere.atmo1,
      },
    },
  }));

  const classes = useStyles();

  const numPages = Math.ceil(data.length / pageSize);

  return (
    <>
      <div className={classes.root}>
        {data.slice(pageSize * page, pageSize * (page + 1)).map((i) => (
          <HvTypography key={i} component="span">
            {`Item ${i + 1}`}
          </HvTypography>
        ))}
      </div>
      <p />
      <HvPagination
        id="pagination"
        pages={numPages}
        page={page}
        canPrevious={page > 0}
        canNext={page < numPages - 1}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={(value) => setPage(value)}
        onPageSizeChange={(value) => setPageSize(value)}
        labels={{ pageSizeEntryName: "items" }}
      />
    </>
  );
};

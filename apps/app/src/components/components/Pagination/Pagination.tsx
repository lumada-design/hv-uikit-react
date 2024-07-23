import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvDotPagination,
  HvPagination,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

const styles = {
  container: css({ width: "100%", justifyContent: "center" }),
  page: css({ textAlign: "center" }),
  pagination: css({
    display: "flex",
    flexWrap: "wrap",
    "&>span": {
      width: "100px",
      padding: "8px 12px",
      margin: "12px",
      textAlign: "center",
      borderRadius: "4px",
      background: "white",
    },
  }),
};

export const Pagination = () => {
  const pageSizeOptions = [4, 6, 12, 24, 48, 2000];
  const data = [...Array(64).keys()];

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[2]);

  const numPages = Math.ceil(data.length / pageSize);

  return (
    <>
      <HvTypography className={styles.pagination}>
        {data.slice(pageSize * page, pageSize * (page + 1)).map((i) => (
          <HvTypography key={i} component="span">
            {`Item ${i + 1}`}
          </HvTypography>
        ))}
      </HvTypography>
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

export const DotPagination = () => {
  const [page, setPage] = useState<number>(0);
  const pages = [
    "This is page 1",
    "And this is page 2",
    "This is page 3",
    "This is page 4",
    "And finally, this is page 5",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <HvTypography>{pages[page]}</HvTypography>
      </div>
      <br />
      <HvDotPagination
        page={page}
        pages={pages.length}
        onPageChange={(_, value) => setPage(value)}
        getItemAriaLabel={(pageNumber) => {
          switch (pageNumber) {
            case 0:
              return "first page button aria-label";
            case 4:
              return "last page button aria-label";
            default:
              return `${pageNumber + 1} page aria-label`;
          }
        }}
        role="navigation"
        aria-label="Example Dot Navigation"
      />
    </div>
  );
};

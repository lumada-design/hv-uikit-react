import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Pagination from "@hv/uikit-react-core/dist/Pagination";
import Typography from "@hv/uikit-react-core/dist/Typography";

const data = [...Array(64).keys()];

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "&>span": {
      width: "100px",
      padding: "8px 12px",
      margin: "12px",
      textAlign: "center",
      borderRadius: "4px",
      background: theme.hv.palette.atmosphere.atmo1
    }
  }
});

const Container = withStyles(styles, { withTheme: true })(
  ({ classes, children }) => <div className={classes.root}>{children}</div>
);

const ControlledPagination = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);

  const numPages = Math.ceil(data.length / pageSize);

  return (
    <>
      <Container>
        {data.slice(pageSize * page, pageSize * (page + 1)).map(i => (
          <Typography key={i} component="span">
            {"Item " + (i + 1)}
          </Typography>
        ))}
      </Container>
      <p />
      <Pagination
        pages={numPages}
        page={page}
        canPrevious={page > 0}
        canNext={page < numPages - 1}
        pageSize={pageSize}
        pageSizeOptions={[3, 6, 12, 24, 48, 200]}
        onPageChange={page => setPage(page)}
        onPageSizeChange={pageSize => setPageSize(pageSize)}
        labels={{ labelEntryType: "items" }}
      />
    </>
  );
};

export default <ControlledPagination />;

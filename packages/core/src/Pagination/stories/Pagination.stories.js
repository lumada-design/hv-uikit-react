import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { HvPagination, HvTypography } from "../..";

export default {
  title: "Patterns/Pagination",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvPagination } from '@hv/uikit-react-core/dist'"
  },
  component: HvPagination
};

export const Main = () => {
  return <HvPagination />;
};

Main.story = {
  parameters: {
    v3: true
  }
};

export const ControlledSample = () => {
  const pageSizeOptions = [4, 6, 12, 24, 48, 2000];
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

  const Container = withStyles(styles)(({ classes, children }) => (
    <div className={classes.root}>{children}</div>
  ));

  const ControlledPagination = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(pageSizeOptions[2]);

    const numPages = Math.ceil(data.length / pageSize);

    return (
      <>
        <Container>
          {data.slice(pageSize * page, pageSize * (page + 1)).map(i => (
            <HvTypography key={i} component="span">
              {`Item ${i + 1}`}
            </HvTypography>
          ))}
        </Container>
        <p />
        <HvPagination
          id="pagination"
          pages={numPages}
          page={page}
          canPrevious={page > 0}
          canNext={page < numPages - 1}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageChange={value => setPage(value)}
          onPageSizeChange={value => setPageSize(value)}
          labels={{ pageSizeEntryName: "items" }}
        />
      </>
    );
  };

  return <ControlledPagination />;
};

ControlledSample.story = {
  parameters: {
    docs: {
      storyDescription: "Pagination controlling a list of elements"
    },
    v3: true
  }
};

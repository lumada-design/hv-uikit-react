import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvGrid from "@hv/uikit-react-core/dist/Grid";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

const Box = ({ text }) => (
  <div
    style={{
      backgroundColor: "indianred",
      height: "150px",
      width: "100%",
      border: "1px solid black"
    }}
  >
    <div
      style={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "center"
      }}
    >
      {text}
    </div>
  </div>
);

const GridExample = withStyles({}, { withTheme: true })(({ theme }) => {
  const findBreakpoint = () =>
    [...theme.breakpoints.keys].reverse().reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.only(key));

      return !output && matches ? key : output;
    }, null) || "xs";

  let breakpoint = findBreakpoint();

  let title = `breakpoint: ${breakpoint}`;

  return (
    <div>
      <HvTypography variant="xxsTitle">{title}</HvTypography>
      <div style={{ border: "1px solid" }}>
        <HvGrid container>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => (
            <HvGrid key={value} item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Box text={value.toString()} />
            </HvGrid>
          ))}
        </HvGrid>
      </div>
    </div>
  );
});

export default <GridExample />;

import React from "react";
import HvGrid from "@hv/uikit-react-core/dist/Grid";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import { useMediaQuery, withTheme } from "@material-ui/core";

const Box = ({ text }) => (
  <div
    style={{
      backgroundColor: "ivory",
      height: "150px",
      width: "100%",
      boxShadow: "2px 2px 5px grey"
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

const GridExample = withTheme(({ theme }) => {
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
      <div style={{ border: "1px solid", backgroundColor: "#F9F9F9" }}>
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

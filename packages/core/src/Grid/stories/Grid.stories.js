/* eslint-disable react/prop-types */
import React from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import HvGrid from "../Grid";
import HvTypography from "../../Typography";

export default {
  title: "Foundation/Grid",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvGrid } from '@hv/uikit-react-core/dist'"
  },
  component: HvGrid
};

const Box = ({ text }) => (
  <div
    style={{
      backgroundColor: "ivory",
      height: "150px",
      width: "100%",
      boxShadow: "0 2px 5px rgba(65,65,65,0.12)"
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

export const Main = () => {
  const theme = useTheme();
  const findBreakpoint = () =>
    [...theme.breakpoints.keys].reverse().reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.only(key));

      return !output && matches ? key : output;
    }, null) || "xs";

  const breakpoint = findBreakpoint();
  const title = `breakpoint: ${breakpoint}`;

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
};

export const Behaviour = () => {
  const theme = useTheme();
  const findBreakpoint = () =>
    [...theme.breakpoints.keys].reverse().reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.only(key));

      return !output && matches ? key : output;
    }, null) || "xs";

  const breakpoint = findBreakpoint();
  const title = `breakpoint: ${breakpoint}`;

  return (
    <div>
      <HvTypography variant="xxsTitle">{title}</HvTypography>
      <div style={{ border: "1px solid", backgroundColor: "#F9F9F9" }}>
        <HvGrid container>
          <HvGrid item xs={4} sm={8} md={8} lg={12} xl={12}>
            <Box text={"xs={4} sm={8} md={8} lg={12} xl={12}"} />
          </HvGrid>
          <HvGrid item xs={4} sm={4} md={4} lg={6} xl={6}>
            <Box text={"xs={4} sm={4} md={4} lg={6} xl={6}"} />
          </HvGrid>
          <HvGrid item xs={4} sm={4} md={4} lg={6} xl={6}>
            <Box text={"xs={4} sm={4} md={4} lg={6} xl={6}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
        </HvGrid>
      </div>
    </div>
  );
};

Behaviour.story = {
  parameters: {
    docs: {
      storyDescription:
        "Change the size of the window to see the grid behaviour. The box will adjust following the define breakpoints."
    }
  }
};

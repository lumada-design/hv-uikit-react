/* eslint-disable react/prop-types */
import React from "react";
import { Hidden, useTheme } from "@material-ui/core";
import { HvBox, HvGrid, HvContainer, HvTypography, useWidth } from "../..";

export default {
  title: "Foundation/Grid",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvGrid } from '@hv/uikit-react-core/dist'"
  },
  component: HvGrid
};

export const Main = () => {
  const width = useWidth();

  const Box = ({ children }) => (
    <HvBox
      display="flex"
      alignItems="center"
      p={2}
      height="150px"
      textAlign="center"
      bgcolor="sema7"
      color="base2"
    >
      <HvTypography variant="sText">{children}</HvTypography>
    </HvBox>
  );

  return (
    <div>
      <HvTypography variant="highlightText">{`Current width: ${width}`}</HvTypography>
      <HvBox bgcolor="atmo2" mt={2} flex={1}>
        <HvContainer>
          <HvGrid container>
            <HvGrid item xl={1} lg={1} md sm={3} xs={3}>
              <Box>xl=1 lg=1 md sm=3 xs=3</Box>
            </HvGrid>
            <HvGrid item xl={1} lg={1} md sm={3} xs={3}>
              <Box>xl=1 lg=1 md sm=3 xs=3</Box>
            </HvGrid>
            <HvGrid item xl={1} lg={1} md sm={3} xs={3}>
              <Box>xl=1 lg=1 md sm=3 xs=3</Box>
            </HvGrid>
            <HvGrid item xl={1} lg={1} md sm={3} xs={3}>
              <Box>xl=1 lg=1 md sm=3 xs=3</Box>
            </HvGrid>
            <Hidden smDown>
              <HvGrid item xl={1} lg={1} md>
                <Box>xl=1 lg=1 md sm=false xs=false</Box>
              </HvGrid>
              <HvGrid item xl={1} lg={1} md>
                <Box>xl=1 lg=1 md sm=false xs=false</Box>
              </HvGrid>
              <HvGrid item xl={1} lg={1} md>
                <Box>xl=1 lg=1 md sm=false xs=false</Box>
              </HvGrid>
              <HvGrid item xl={1} lg={1} md>
                <Box>xl=1 lg=1 md sm=false xs=false</Box>
              </HvGrid>
              <Hidden mdDown>
                <HvGrid item xl={1} lg={1}>
                  <Box>xl=1 lg=1 md sm=false xs=false</Box>
                </HvGrid>
                <HvGrid item xl={1} lg={1}>
                  <Box>xl=1 lg=1 md sm=false xs=false</Box>
                </HvGrid>
                <HvGrid item xl={1} lg={1}>
                  <Box>xl=1 lg=1 md sm=false xs=false</Box>
                </HvGrid>
                <HvGrid item xl={1} lg={1}>
                  <Box>xl=1 lg=1 md sm=false xs=false</Box>
                </HvGrid>
              </Hidden>
            </Hidden>
          </HvGrid>
        </HvContainer>
      </HvBox>
    </div>
  );
};

export const The12Columns = () => {
  const theme = useTheme();
  const breakpoint = useWidth();
  const title = `Breakpoint: ${breakpoint}`;

  const Box = ({ children }) => (
    <HvBox bgcolor="sema7" display="flex" height="150px" p="20px">
      <HvBox m="auto" textAlign="center" color="base2">
        <HvTypography variant="sText">{children}</HvTypography>
      </HvBox>
    </HvBox>
  );

  const styledContainer = {
    border: "1px solid",
    borderColor: theme.hv.palette.atmosphere.atmo5,
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    marginTop: theme.hv.spacing.xs
  };

  return (
    <div>
      <HvTypography variant="highlightText">{title}</HvTypography>
      <div style={styledContainer}>
        <HvGrid container>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => (
            <HvGrid key={value} item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Box>{value.toString()}</Box>
            </HvGrid>
          ))}
        </HvGrid>
      </div>
    </div>
  );
};

export const Behaviour = () => {
  const theme = useTheme();

  const breakpoint = useWidth();
  const title = `Breakpoint: ${breakpoint}`;

  const Box = ({ children }) => (
    <HvBox bgcolor="sema7" display="flex" height="150px" p="20px">
      <HvBox m="auto" textAlign="center" color="base2">
        <HvTypography variant="sText">{children}</HvTypography>
      </HvBox>
    </HvBox>
  );

  const styledContainer = {
    border: "1px solid",
    borderColor: theme.hv.palette.atmosphere.atmo5,
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    marginTop: theme.hv.spacing.xs
  };

  return (
    <div>
      <HvTypography variant="highlightText">{title}</HvTypography>
      <div style={styledContainer}>
        <HvGrid container>
          <HvGrid item xs={4} sm={8} md={8} lg={12} xl={12}>
            <Box>{"xs={4} sm={8} md={8} lg={12} xl={12}"}</Box>
          </HvGrid>
          <HvGrid item xs={4} sm={4} md={4} lg={6} xl={6}>
            <Box>{"xs={4} sm={4} md={4} lg={6} xl={6}"}</Box>
          </HvGrid>
          <HvGrid item xs={4} sm={4} md={4} lg={6} xl={6}>
            <Box>{"xs={4} sm={4} md={4} lg={6} xl={6}"}</Box>
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box>{"xs={1} sm={2} md={2} lg={3} xl={3}"}</Box>
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box>{"xs={1} sm={2} md={2} lg={3} xl={3}"}</Box>
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box>{"xs={1} sm={2} md={2} lg={3} xl={3}"}</Box>
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box>{"xs={1} sm={2} md={2} lg={3} xl={3}"}</Box>
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

/* eslint-disable react/prop-types */
import React from "react";
import { withStyles, withTheme } from "@material-ui/core";
import { HvGrid, HvTypography, useWidth } from "../..";

export default {
  title: "Foundation/Grid",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvGrid } from '@hv/uikit-react-core/dist'"
  },
  component: HvGrid
};

const Box = ({ text, classes }) => (
  <div className={classes.box}>
    <HvTypography variant="sText">{text}</HvTypography>
  </div>
);

const styles = theme => ({
  box: {
    backgroundColor: theme.hv.palette.semantic.sema7,
    display: "flex",
    height: "150px",
    width: "100%",
    padding: 20,
    "&>*": {
      margin: "auto",
      textAlign: "center",
      color: theme.hv.palette.base.base2
    }
  }
});

const StyledBox = withStyles(styles)(Box);

export const Main = () => {
  const Sample = withTheme(({ theme }) => {
    const breakpoint = useWidth();
    const title = `Breakpoint: ${breakpoint}`;

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
                <StyledBox text={value.toString()} />
              </HvGrid>
            ))}
          </HvGrid>
        </div>
      </div>
    );
  });
  return <Sample />;
};

export const Behaviour = () => {
  const Sample = withTheme(({ theme }) => {
    const breakpoint = useWidth();
    const title = `Breakpoint: ${breakpoint}`;

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
              <StyledBox text={"xs={4} sm={8} md={8} lg={12} xl={12}"} />
            </HvGrid>
            <HvGrid item xs={4} sm={4} md={4} lg={6} xl={6}>
              <StyledBox text={"xs={4} sm={4} md={4} lg={6} xl={6}"} />
            </HvGrid>
            <HvGrid item xs={4} sm={4} md={4} lg={6} xl={6}>
              <StyledBox text={"xs={4} sm={4} md={4} lg={6} xl={6}"} />
            </HvGrid>
            <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
              <StyledBox text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
            </HvGrid>
            <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
              <StyledBox text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
            </HvGrid>
            <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
              <StyledBox text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
            </HvGrid>
            <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
              <StyledBox text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
            </HvGrid>
          </HvGrid>
        </div>
      </div>
    );
  });
  return <Sample />;
};

Behaviour.story = {
  parameters: {
    docs: {
      storyDescription:
        "Change the size of the window to see the grid behaviour. The box will adjust following the define breakpoints."
    }
  }
};

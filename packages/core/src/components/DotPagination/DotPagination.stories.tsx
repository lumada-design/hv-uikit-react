import styled from "@emotion/styled";
import {
  CurrentStep,
  RadioButtonUnselected,
} from "@hitachivantara/uikit-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { Meta, StoryObj } from "@storybook/react";
import { HvTypography } from "components";
import { useState } from "react";
import { HvDotPagination, HvDotPaginationProps } from "./DotPagination";
import dotPaginationClasses from "./dotPaginationClasses";

const meta: Meta<typeof HvDotPagination> = {
  title: "Navigation/DotPagination",
  component: HvDotPagination,
};

export default meta;

export const Main: StoryObj<HvDotPaginationProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    const [page, setPage] = useState<number>(0);
    const pages = [
      "This is page 1",
      "And this is page 2",
      "This is page 3",
      "This is page 4",
      "And finally, this is page 5",
    ];

    const StyledRoot = styled("div")({
      width: "100%",
      justifyContent: "center",
    });

    const StyledPage = styled("div")({
      textAlign: "center",
    });

    return (
      <StyledRoot>
        <StyledPage>
          <HvTypography>{pages[page]}</HvTypography>
        </StyledPage>
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
      </StyledRoot>
    );
  },
};

export const CustomizedDotPagination: StoryObj<HvDotPaginationProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The `DotPagination` component was customized to be similar to the NEXT Design System 3 specifications. " +
          "Thus, the styling was overridden and the `unselectedIcon` and `selectedIcon` properties were provided.",
      },
    },
  },
  render: () => {
    const [page, setPage] = useState<number>(0);
    const pages = [
      "This is page 1",
      "And this is page 2",
      "Now you can see page 3",
      "Look, it's page 4",
      "And finally, this is page 5",
    ];

    const StyledRoot = styled("div")({
      width: "100%",
      justifyContent: "center",
    });

    const StyledPage = styled("div")({
      textAlign: "center",
    });

    const StyledDotPagination = styled(HvDotPagination)({
      [`& .${dotPaginationClasses.radioRoot}`]: {
        marginLeft: "0px",
      },

      [`& .${dotPaginationClasses.radio}`]: {
        height: "32px",

        "&:hover": {
          backgroundColor: theme.colors.atmo3,
          borderRadius: 0,
        },
      },
    });

    return (
      <StyledRoot>
        <StyledPage>
          <HvTypography>{pages[page]}</HvTypography>
        </StyledPage>
        <br />
        <StyledDotPagination
          unselectedIcon={<RadioButtonUnselected iconSize="XS" />}
          selectedIcon={<CurrentStep iconSize="XS" />}
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
      </StyledRoot>
    );
  },
};

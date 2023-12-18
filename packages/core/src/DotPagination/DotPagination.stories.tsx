import { useState } from "react";
import {
  CurrentStep,
  RadioButtonUnselected,
} from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvDotPagination,
  HvDotPaginationClasses,
  HvDotPaginationProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

const meta: Meta<typeof HvDotPagination> = {
  title: "Components/Pagination/Dot Pagination",
  component: HvDotPagination,
};

export default meta;

const styles = {
  container: css({ width: "100%", justifyContent: "center" }),
  page: css({ textAlign: "center" }),
};

export const Main: StoryObj<HvDotPaginationProps> = {
  argTypes: {
    classes: { control: { disable: true } },
    unselectedIcon: { control: { disable: true } },
    selectedIcon: { control: { disable: true } },
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

    const dotpaginationStyle: HvDotPaginationClasses = {
      radioRoot: css({
        marginLeft: 0,
      }),
      horizontal: css({
        "&>*:not(:first-of-type)": {
          marginLeft: 0,
        },
      }),
      radio: css({
        height: "32px",
        width: "32px",

        "&:hover": {
          backgroundColor: theme.colors.atmo3,
          borderRadius: 0,
        },
      }),
    };

    return (
      <div className={styles.container}>
        <div className={styles.page}>
          <HvTypography>{pages[page]}</HvTypography>
        </div>
        <br />
        <HvDotPagination
          classes={dotpaginationStyle}
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
      </div>
    );
  },
};

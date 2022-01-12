import { waitFor, screen, fireEvent } from "@storybook/testing-library";
import withStyles from "@material-ui/core/styles/withStyles";
import { Calendar, LineChart, Machine, Plane, User } from "@hitachivantara/uikit-react-icons";

import React from "react";
import { HvList, HvTypography } from "../..";

const styles = (theme) => ({
  wrapper: {
    display: "inline-block",
    minWidth: 200,
    maxWidth: 260,
    padding: theme.hv.spacing.sm,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
  },
});

const ListContainer = withStyles(styles)(({ classes, children }) => (
  <div className={classes.wrapper}>{children}</div>
));

export default {
  title: "Tests/List",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
  decorators: [(storyFn) => <ListContainer>{storyFn()}</ListContainer>],
};

export const Main = () => (
  <HvList
    id="list"
    condensed
    selectable={false}
    aria-label="Simple Non Selectable List Title"
    values={[
      { label: "Share", disabled: true },
      { label: "Edit" },
      { label: "Remove", path: "https://www.hitachivantara.com" },
      { label: "Delete" },
      { label: "Update", path: "https://www.hitachivantara.com" },
    ]}
  />
);

export const WithTitle = () => (
  <>
    <HvTypography variant="highlightText" style={{ margin: "0 10px 10px" }}>
      Options
    </HvTypography>
    <HvList
      id="list"
      condensed
      selectable={false}
      aria-label="Simple List With Title"
      values={[
        { label: "Share", disabled: true },
        { label: "Edit" },
        { label: "Remove", path: "https://www.hitachivantara.com" },
        { label: "Delete" },
        { label: "Update", path: "https://www.hitachivantara.com" },
      ]}
    />
  </>
);

export const WithNavigationIcons = () => (
  <HvList
    id="list-nav-icon"
    selectable={false}
    condensed
    aria-label="Simple List With Navigation Icons"
    values={[
      { label: "Today", showNavIcon: true },
      { label: "Yesterday" },
      { label: "Last week" },
      { label: "Last month" },
      { label: "Last year", showNavIcon: true },
    ]}
  />
);

export const SingleSelection = () => (
  <HvList
    id="list"
    hasTooltips
    condensed
    aria-label="Single Selection List Title"
    values={[
      { label: "Share", selected: true },
      { label: "Edit" },
      { label: "Remove" },
      { label: "Delete" },
      { label: "Updateaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    ]}
  />
);

export const SingleSelectionWithIcon = () => {
  /* eslint-disable no-nested-ternary */
  const ColoredIcon =
    (Icon) =>
    ({ isDisabled }) =>
      <Icon color={isDisabled ? "atmo5" : undefined} />;

  const data = [
    { label: "Advanced server DS120", iconCallback: ColoredIcon(User) },
    { label: "Advanced server DS122", iconCallback: ColoredIcon(Calendar) },
    { label: "Advanced server DS250", selected: true, iconCallback: ColoredIcon(Machine) },
    { label: "Advanced server DS530", disabled: true, iconCallback: ColoredIcon(Plane) },
    { label: "Advanced server DS555", iconCallback: ColoredIcon(LineChart) },
  ];

  return (
    <HvList
      id="list"
      style={{ marginLeft: -10 }}
      aria-label="Single Selection List with Left Icons Title"
      values={data}
    />
  );
};

export const SingleSelectionWithSelectors = () => (
  <HvList
    id="list"
    useSelector
    condensed
    hasTooltips
    aria-label="Single Selection List with radio"
    values={[
      { label: "98001, Store Manager" },
      { label: "98002, Store Manager", selected: true },
      { label: "98003, Store Manager of district" },
      { label: "98004, Store Manager", disabled: true },
      { label: "98005, Store Manager" },
    ]}
  />
);

SingleSelectionWithSelectors.parameters = {
  docs: {
    description: {
      story: "Selectable List that uses single-selection radio button selectors.",
    },
  },
};

export const MultiSelectionWithSelectors = () => (
  <HvList
    id="list"
    multiSelect
    useSelector
    condensed
    hasTooltips
    aria-label="Multi Selection List with Selectors Title"
    values={[
      { id: "1", label: "Arhauss is somewhere" },
      { id: "2", label: "Allentown is not are 51" },
      { id: "3", label: "Bergamo where you can eat whatever you want", selected: true },
      { id: "4", label: "Bergen city", disabled: true },
      { id: "5", label: "Boston of the Seven Seas" },
    ]}
  />
);

MultiSelectionWithSelectors.parameters = {
  docs: {
    description: {
      story: "Selectable List that uses multiple-selection checkboxes selectors.",
    },
  },
};

export const MultiSelectionWithSelectAll = () => (
  <HvList
    id="list"
    multiSelect
    showSelectAll
    useSelector
    condensed
    aria-label="Multi Selection List with Selectors and Select All Title"
    values={[
      { label: "Arhauss is somewhere", selected: false },
      { label: "Allentown is not are 51", selected: false },
      { label: "Bergamo where you can eat", selected: true },
      { label: "Bergen city", selected: false },
      { label: "Boston of the Seven Seas", selected: false },
    ]}
  />
);

MultiSelectionWithSelectAll.parameters = {
  docs: {
    description: {
      story: "List that has multi selection with selectors and a select all checkbox.",
    },
  },
};

// __________________________________
// Extended robot test scenarios

export const TestListNotSelected = () => (
  <>
    <button type="button" id="anchorButton" tabIndex={0}>
      Anchor
    </button>
    <HvList
      id="list"
      aria-label="Test List Not Selected"
      hasTooltips
      values={[
        { label: "Share" },
        { label: "Edit" },
        { label: "Remove" },
        { label: "Delete" },
        { label: "Updateaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
      ]}
    />
  </>
);

export const TestListFocusableSelection = () => (
  <>
    <button type="button" id="anchorButton" tabIndex={0}>
      Anchor
    </button>
    <HvList
      id="list"
      aria-label="Test List Focusable Selection"
      hasTooltips
      values={[
        { label: "Share" },
        { label: "Edit" },
        { label: "Remove", selected: true },
        { label: "Delete" },
        { label: "Updateaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
      ]}
    />
  </>
);

export const TestListSelectableDisabled = () => (
  <>
    <button type="button" id="anchorButton" tabIndex={0}>
      Anchor
    </button>
    <HvList
      id="list"
      selectable={false}
      values={[
        { label: "Share", disabled: true },
        { label: "Edit" },
        { label: "Remove", path: "https://www.hitachivantara.com" },
        { label: "Delete" },
        { label: "Update", path: "https://www.hitachivantara.com" },
      ]}
    />
  </>
);

// __________________________________
// Extended applitools test scenarios

// test scenario, Multi Selection With Select All selecting some items
export const IconsOpened = () => MultiSelectionWithSelectAll();

IconsOpened.parameters = {
  eyes: {
    runBefore() {
      fireEvent.click(screen.getByRole("checkbox", { name: /bergen city/i }));
      fireEvent.click(screen.getByText("Boston of the Seven Seas"));
      return waitFor(() => screen.getByRole("checkbox", { name: /3 of 5/i }));
    },
  },
};

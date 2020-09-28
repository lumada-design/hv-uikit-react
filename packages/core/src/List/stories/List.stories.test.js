// eslint-disable-next-line import/no-extraneous-dependencies
import { wait, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import withStyles from "@material-ui/core/styles/withStyles";

import React from "react";

import { HvList } from "../..";
import { MultiSelectionWithSelectAll } from "./List.stories";

const styles = (theme) => ({
  wrapper: {
    display: "inline-block",
    minWidth: 200,
    maxWidth: 260,
    padding: `${theme.hv.spacing.sm}px`,
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
      selectDefault
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

IconsOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("checkbox", { name: /bergen city/i }));
        fireEvent.click(screen.getByText("Boston of the Seven Seas"));
        return wait(() => screen.getByRole("checkbox", { name: /3 of 5/i }));
      },
    },
  },
};

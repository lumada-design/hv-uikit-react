import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Calendar, LineChart, Machine, Plane, User } from "@hv/uikit-react-icons/dist";
import HvList from "..";

const styles = theme => ({
  wrapper: {
    display: "inline-block",
    minWidth: 200,
    maxWidth: 260,
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

const ListContainer = withStyles(styles)(({ classes, children }) => (
  <div className={classes.wrapper}>{children}</div>
));

export default {
  title: "Components/List",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvList } from '@hv/uikit-react-core/dist'"
  },
  component: HvList,
  decorators: [storyFn => <ListContainer>{storyFn()}</ListContainer>]
};

export const Main = () => (
  <HvList
    id="simple-list"
    selectable={false}
    aria-label="Simple Non Selectable List Title"
    values={[
      { label: "Share", disabled: true },
      { label: "Edit" },
      { label: "Remove", path: "https://www.hitachivantara.com" },
      { label: "Delete" },
      { label: "Update", path: "https://www.hitachivantara.com" }
    ]}
  />
);

export const Condensed = () => (
  <HvList
    id="condensed-list"
    selectable={false}
    condensed
    aria-label="Simple Condensed List Title"
    values={[
      { label: "Share", disabled: true },
      { label: "Edit" },
      { label: "Remove", path: "https://www.hitachivantara.com" },
      { label: "Delete" },
      { label: "Update", path: "https://www.hitachivantara.com" }
    ]}
  />
);

Condensed.story = {
  parameters: {
    docs: {
      storyDescription: "List using the condensed property to reduce space between items."
    }
  }
};

export const WithNavigationIcons = () => (
  <HvList
    id="list-nav-icon"
    selectable={false}
    aria-label="Simple Condensed List Title"
    values={[
      { label: "Today", showNavIcon: true },
      { label: "Yesterday" },
      { label: "Last week" },
      { label: "Last month" },
      { label: "Last year", showNavIcon: true }
    ]}
  />
);

export const SingleSelection = () => (
  <HvList
    id="single-selection-list"
    selectDefault
    hasTooltips
    aria-label="Single Selection List Title"
    values={[
      { label: "Share" },
      { label: "Edit" },
      { label: "Remove" },
      { label: "Delete" },
      { label: "Updateaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }
    ]}
  />
);

export const SingleSelectionWithIcon = () => {
  /* eslint-disable no-nested-ternary */
  const ColoredIcon = Icon => ({ isSelected, isDisabled }) => (
    <Icon color={isSelected ? "atmo1" : isDisabled ? "atmo7" : undefined} />
  );

  const data = [
    { label: "Advanced server DS120", iconCallback: ColoredIcon(User) },
    { label: "Advanced server DS122", iconCallback: ColoredIcon(Calendar) },
    { label: "Advanced server DS250", selected: true, iconCallback: ColoredIcon(Machine) },
    { label: "Advanced server DS530", disabled: true, iconCallback: ColoredIcon(Plane) },
    { label: "Advanced server DS555", iconCallback: ColoredIcon(LineChart) }
  ];

  return (
    <HvList
      id="left-icon-list"
      selectDefault
      aria-label="Single Selection List with Left Icons Title"
      values={data}
    />
  );
};

export const SingleSelectionWithSelectors = () => (
  <HvList
    id="Radio-list"
    selectDefault
    useSelector
    aria-label="Single Selection List with radio"
    values={[
      { label: "98001, Store Manager" },
      { label: "98002, Store Manager" },
      { label: "98003, Store Manager" },
      { label: "98004, Store Manager", disabled: true },
      { label: "98005, Store Manager" }
    ]}
  />
);

SingleSelectionWithSelectors.story = {
  parameters: {
    docs: {
      storyDescription: "Selectable List that uses single-selection radio button selectors."
    }
  }
};

export const MultiSelectionWithSelectors = () => (
  <HvList
    id="multi-selection-selectors"
    multiSelect
    useSelector
    aria-label="Multi Selection List with Selectors Title"
    values={[
      { id: "1", label: "Arhauss is somewhere" },
      { id: "2", label: "Allentown is not are 51" },
      { id: "3", label: "Bergamo where you can eat", selected: true },
      { id: "4", label: "Bergen city", disabled: true },
      { id: "5", label: "Boston of the Seven Seas" }
    ]}
  />
);

MultiSelectionWithSelectors.story = {
  parameters: {
    docs: {
      storyDescription: "Selectable List that uses multiple-selection checkboxes selectors."
    }
  }
};

export const MultiSelectionWithSelectAll = () => (
  <HvList
    id="Select-all-list"
    multiSelect
    showSelectAll
    useSelector
    aria-label="Multi Selection List with Selectors and Select All Title"
    values={[
      { label: "Arhauss is somewhere", selected: false },
      { label: "Allentown is not are 51", selected: false },
      { label: "Bergamo where you can eat", selected: true },
      { label: "Bergen city", selected: false },
      { label: "Boston of the Seven Seas", selected: false }
    ]}
  />
);

MultiSelectionWithSelectAll.story = {
  parameters: {
    docs: {
      storyDescription: "List that has multi selection with selectors and a select all checkbox."
    }
  }
};

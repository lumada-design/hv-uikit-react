import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import parser from "html-react-parser";
import { makeStyles } from "@material-ui/core";
import { HvDropdown, HvInput } from "../../..";
import countryList from "../../Input/stories/countries";

export default {
  title: "Forms/Search Box",
};

export const Main = () => {
  const handleSearch = (_evt, val) => {
    console.log(val);
  };

  return (
    <HvInput
      type="search"
      aria-label="Select country"
      placeholder="Search"
      onEnter={handleSearch}
    />
  );
};

Main.story = {
  decorators: [
    (Story) => (
      <div style={{ width: 250, height: 40 }}>
        <Story />
      </div>
    ),
  ],
};

export const DynamicSearch = () => {
  const suggestions = countryList;

  const filterHighlighted = (val) =>
    suggestions
      .filter((v) => v.toUpperCase().startsWith(val.toUpperCase()))
      .map((v) => ({
        value: v,
        label: parser(`<b>${v.replace(new RegExp(val, "gi"), "</b>$&<b>")}</b>`),
      }));

  return (
    <HvInput
      type="search"
      label="Select country"
      placeholder="Insert country"
      onEnter={(_e, v) => console.log(v)}
      suggestionListCallback={filterHighlighted}
    />
  );
};

DynamicSearch.story = { decorators: [(storyFn) => <div style={{ height: 300 }}>{storyFn()}</div>] };

export const ScopedSearch = () => {
  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
    },

    root: {
      width: 120,
      minWidth: "unset",
      marginRight: 3,
    },
    width: {
      width: 120,
      minWidth: "unset",
    },

    inputRoot: {
      width: 260,
    },
  }));

  const classes = useStyles();

  const suggestions = countryList;
  const [filter, setFilter] = useState("All");

  const filterGroup = () => {
    switch (filter) {
      case "A-L":
        return suggestions.slice(0, 103);
      case "M-Z":
        return suggestions.slice(103);
      case "All":
      default:
        return suggestions;
    }
  };

  const filterHighlighted = (val) =>
    filterGroup()
      .filter((v) => v.toUpperCase().includes(val.toUpperCase()))
      .map((v) => ({
        value: v,
        label: parser(v.replace(new RegExp(val, "gi"), "<b>$&</b>")),
      }))
      .slice(0, 10);

  const values = [{ label: "All", selected: true }, { label: "A-L" }, { label: "M-Z" }];

  return (
    <div className={classes.container}>
      <HvDropdown
        aria-label="Filter country"
        classes={{
          root: classes.root,
          dropdown: classes.root,
          rootList: classes.width,
        }}
        onChange={(val) => {
          const newFilter = val?.label || "All";
          console.log("Filter:", newFilter);
          setFilter(newFilter);
        }}
        values={values}
      />
      <HvInput
        type="search"
        aria-label="Select country"
        placeholder="Insert country"
        onEnter={(_e, v) => console.log(v)}
        suggestionListCallback={filterHighlighted}
        classes={{
          root: classes.inputRoot,
        }}
      />
    </div>
  );
};

ScopedSearch.story = { decorators: [(storyFn) => <div style={{ height: 300 }}>{storyFn()}</div>] };

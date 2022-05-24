import React, { useState } from "react";
import parser from "html-react-parser";

import { makeStyles } from "@material-ui/core";

import { Fail } from "@hitachivantara/uikit-react-icons";

import DocsPage from "../../../../../.storybook/blocks/DocsPage";

import { HvDropdown, HvInput, HvPanel, HvTypography, HvEmptyState } from "../..";

import countryList, { continents, countries } from "./countries";

export default {
  title: "Forms/Search Box",
  parameters: {
    usage: 'import { HvInput } from "@hitachivantara/uikit-react-core"',
    componentSubtitle: null,
    dsVersion: "3.6.0",
    docs: {
      page: () => (
        <DocsPage
          descriptionSlot={() =>
            "A search box is a text input box with the dedicated function of accepting user input to be searched for in a database. Search boxes are commonly accompanied by a search button/icon to submit the query. However, the search button should be omitted in the filter as you type mode, where the trigger is automatic and related to the text string."
          }
        />
      ),
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 610, minWidth: 150 }}>
        <Story />
      </div>
    ),
  ],
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

Main.decorators = [
  (Story) => (
    <div style={{ width: 250, height: 40 }}>
      <Story />
    </div>
  ),
];

export const BasicSearch = () => {
  const useStyles = makeStyles((theme) => ({
    result: {
      marginTop: 5,
      padding: 5,
      color: theme.hv.palette.accent.acce1,
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
    },
  }));

  const classes = useStyles();

  const [results, setResults] = useState([]);

  const handleSearch = (_evt, val) => {
    setResults([
      `First result related with ${val}`,
      `Second result related with ${val}`,
      `Third result related with ${val}`,
    ]);
  };

  return (
    <>
      <HvInput
        type="search"
        aria-label="Search site content"
        placeholder="Search"
        onEnter={handleSearch}
      />
      {results.length > 0 && (
        <HvPanel maxWidth="610px" marginTop="20px" padding="5px">
          <HvTypography variant="highlightText">Results</HvTypography>
          {results.map((element, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className={classes.result}>
              {element}
            </div>
          ))}
        </HvPanel>
      )}
    </>
  );
};

BasicSearch.parameters = {
  docs: {
    description:
      "The Basic Search redirects the user to a <b>Search Results page</b> to show the correspondences to the search query. The user can either press <b>enter</b> or use the <b>search button</b>.",
  },
};

export const DynamicSearch = () => {
  const useStyles = makeStyles((theme) => ({
    result: {
      marginTop: 5,
      padding: 5,
      color: theme.hv.palette.accent.acce1,
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
    },
  }));

  const classes = useStyles();

  const [results, setResults] = useState(null);

  function handleSearch(_evt, val) {
    const newResults = [];

    countryList
      .filter((v) => v.toUpperCase().startsWith(val.toUpperCase()))
      .forEach((country) => {
        newResults.push(`${country}: Population`);
        newResults.push(`${country}: Economics`);
        newResults.push(`${country}: Health`);
      });

    setResults(newResults);
  }

  const filterHighlighted = (val) => {
    if (val == null || val.length === 0) {
      return null;
    }

    return countryList
      .filter((v) => v.toUpperCase().startsWith(val.toUpperCase()))
      .map((v) => ({
        value: v,
        label: parser(`<b>${v.replace(new RegExp(val, "gi"), "</b>$&<b>")}</b>`),
      }))
      .slice(0, 6);
  };

  return (
    <>
      <HvInput
        id="dynamic"
        type="search"
        label="Search country data"
        placeholder="Search"
        onEnter={handleSearch}
        suggestionListCallback={filterHighlighted}
      />
      {results != null && (
        <HvPanel maxWidth="610px" marginTop="20px" padding="5px">
          <HvTypography variant="highlightText">Results</HvTypography>
          {results.map((element, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className={classes.result}>
              {element}
            </div>
          ))}
          {results.length === 0 && (
            <HvEmptyState message="No data found" icon={<Fail iconSize="S" color="acce1" />} />
          )}
        </HvPanel>
      )}
    </>
  );
};

DynamicSearch.parameters = {
  docs: {
    description:
      "The Dynamic Search is similar to the Basic Search but <b>can handle displaying options in real time</b> given a partial search string. The user can still press <b>enter</b> or use the <b>search button</b>, but may also <b>select</b> any of the options displayed.",
  },
};

DynamicSearch.decorators = [(storyFn) => <div style={{ height: 300 }}>{storyFn()}</div>];

export const ScopedSearch = () => {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      maxWidth: 610,
    },

    root: {
      width: 160,
      minWidth: "unset",
      marginRight: 3,
    },
    dropdown: {
      width: "100%",
    },
    width: {
      width: 160,
      minWidth: "unset",
    },

    inputRoot: {
      width: "100%",
    },
    result: {
      marginTop: 5,
      padding: 5,
      color: theme.hv.palette.accent.acce1,
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
    },
  }));

  const classes = useStyles();

  const [results, setResults] = useState(null);

  const [filter, setFilter] = useState("All");

  const filterByContinent = () => {
    const index = continents.indexOf(filter);
    return index !== -1 ? countries[index] : countryList;
  };

  const filterHighlighted = (val) =>
    filterByContinent()
      .filter((v) => v.toUpperCase().includes(val.toUpperCase()))
      .map((v) => ({
        value: v,
        label: parser(v.replace(new RegExp(val, "gi"), "<b>$&</b>")),
      }))
      .slice(0, 6);

  const values = [
    { label: "All", selected: true },
    ...continents.map((c) => ({
      label: c,
    })),
  ];

  function handleSearch(_evt, val) {
    const newResults = [];

    filterByContinent()
      .filter((v) => v.toUpperCase().startsWith(val.toUpperCase()))
      .forEach((country) => {
        newResults.push(`${country}: Population`);
        newResults.push(`${country}: Economics`);
        newResults.push(`${country}: Health`);
      });

    setResults(newResults);
  }

  return (
    <>
      <div className={classes.container}>
        <HvDropdown
          aria-label="Filter country"
          classes={{
            root: classes.root,
            dropdown: classes.dropdown,
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
          aria-label="Search country data"
          placeholder="Search"
          onEnter={handleSearch}
          suggestionListCallback={filterHighlighted}
          classes={{
            root: classes.inputRoot,
          }}
        />
      </div>
      {results != null && (
        <HvPanel maxWidth="610px" height="250px" marginTop="20px" padding="5px">
          <HvTypography variant="highlightText">Results</HvTypography>
          {results.map((element, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className={classes.result}>
              {element}
            </div>
          ))}
          {results.length === 0 && (
            <HvEmptyState message="No data found" icon={<Fail iconSize="S" color="acce1" />} />
          )}
        </HvPanel>
      )}
    </>
  );
};

ScopedSearch.parameters = {
  docs: {
    description:
      "Use it when users might want to limit their search to a section of type of content.",
  },
};

ScopedSearch.decorators = [(storyFn) => <div style={{ height: 300 }}>{storyFn()}</div>];

export const SearchAsYouType = () => {
  const useStyles = makeStyles((theme) => ({
    result: {
      marginTop: 5,
      padding: 5,
      color: theme.hv.palette.accent.acce1,
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
    },
  }));

  const classes = useStyles();

  const data = countries[continents.indexOf("Europe")];

  const [results, setResults] = useState(data);

  function handleSearch(_evt, val) {
    const newResults = data
      .filter((v) => v.toUpperCase().includes(val.toUpperCase()))
      .map((v) => parser(v.replace(new RegExp(val, "gi"), "<b>$&</b>")));

    setResults(newResults);
  }

  return (
    <>
      <HvInput
        id="dynamic"
        type="search"
        label="Filter countries"
        placeholder="Search"
        onChange={handleSearch}
        inputProps={{ autoComplete: "off" }}
      />
      <HvPanel maxWidth="610px" height="230px" marginTop="20px" padding="5px">
        <HvTypography variant="highlightText">Countries of Europe</HvTypography>
        {results.map((element, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className={classes.result}>
            {element}
          </div>
        ))}
        {results.length === 0 && (
          <HvEmptyState message="No countries found" icon={<Fail iconSize="S" color="acce1" />} />
        )}
      </HvPanel>
    </>
  );
};

SearchAsYouType.parameters = {
  docs: {
    description:
      "Search-As-You-Type should be used to enable the user to narrow down a list according to the search query. The change is triggered on each keystroke.",
  },
};

SearchAsYouType.decorators = [(storyFn) => <div style={{ height: 300 }}>{storyFn()}</div>];

import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import parser from "html-react-parser";
import {
  HvEmptyState,
  HvInput,
  HvInputProps,
  HvInputSuggestion,
  HvOption,
  HvPanel,
  HvSelect,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Fail } from "@hitachivantara/uikit-react-icons";

import countryNamesArray, { continents, countries } from "./stories/countries";

const description = `
 A search box is a text input box with the dedicated function of accepting user input to be searched for in a database.
 Search boxes are commonly accompanied by a search button/icon to submit the query.
 However, the search button should be omitted in the filter as you type mode, where the trigger is automatic and related to the text string.`;

const meta: Meta<typeof HvInput> = {
  title: "Components/Input/Search Box",
  component: HvInput,
  parameters: {
    docs: { description: { component: description } },
  },
  decorators: [(Story) => <div style={{ height: "300px" }}>{Story()}</div>],
};

export default meta;

export const Main: StoryObj<HvInputProps> = {
  args: {
    placeholder: "Search",
  },
  render: (args) => {
    return (
      <HvInput
        type="search"
        aria-label="Select country"
        onEnter={(_, value) => console.log(value)}
        {...args}
      />
    );
  },
};

export const BasicSearch: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          "The basic search redirects the user to a <b>search results page</b> to show the correspondences to the search query. The user can either press <b>enter</b> or use the <b>search button</b>.",
      },
    },
  },
  render: () => {
    const [results, setResults] = useState<string[]>([]);

    const handleSearch: HvInputProps["onEnter"] = (_evt, val) => {
      setResults([
        `First result related with ${val}`,
        `Second result related with ${val}`,
        `Third result related with ${val}`,
      ]);
    };

    const classes = {
      result: css({
        marginTop: 5,
        padding: 5,
        color: theme.colors.text,
        backgroundColor: theme.colors.bgPage,
      }),
      panel: css({ maxWidth: "610px", marginTop: "20px", padding: "5px" }),
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
          <HvPanel className={classes.panel}>
            <HvTypography variant="label">Results</HvTypography>
            {results.map((element, i) => (
              <div key={i} className={classes.result}>
                {element}
              </div>
            ))}
          </HvPanel>
        )}
      </>
    );
  },
};

export const DynamicSearch: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          "The dynamic search is similar to the basic search but <b>can handle displaying options in real time</b> given a partial search string. The user can still press <b>enter</b> or use the <b>search button</b>, but may also <b>select</b> any of the options displayed.",
      },
    },
  },
  render: () => {
    const [results, setResults] = useState<string[] | null>(null);

    const classes = {
      result: css({
        marginTop: 5,
        padding: 5,
        color: theme.colors.text,
        backgroundColor: theme.colors.bgPage,
      }),
      panel: css({ maxWidth: "610px", marginTop: "20px", padding: "5px" }),
    };

    const handleSearch: HvInputProps["onEnter"] = (_, value) => {
      const newResults: string[] = [];

      countryNamesArray
        .filter((v) => v.toUpperCase().startsWith(value.toUpperCase()))
        .forEach((country) => {
          newResults.push(`${country}: Population`);
          newResults.push(`${country}: Economics`);
          newResults.push(`${country}: Health`);
        });

      setResults(newResults);
    };

    const filterHighlighted = (value: string): HvInputSuggestion[] | null => {
      if (value == null || value.length === 0) {
        return null;
      }

      return countryNamesArray
        .filter((v) => v.toUpperCase().startsWith(value.toUpperCase()))
        .map((v) => ({
          id: v,
          value: v,
          label: parser(
            `<b>${v.replace(new RegExp(value, "gi"), "</b>$&<b>")}</b>`,
          ) as string,
        }))
        .slice(0, 6);
    };

    return (
      <>
        <HvInput
          type="search"
          label="Search country data"
          placeholder="Search"
          onEnter={handleSearch}
          suggestionListCallback={filterHighlighted}
        />
        {results != null && (
          <HvPanel className={classes.panel}>
            <HvTypography variant="label">Results</HvTypography>
            {results.map((element, i) => (
              <div key={i} className={classes.result}>
                {element}
              </div>
            ))}
            {results.length === 0 && (
              <HvEmptyState
                message="No data found"
                icon={<Fail iconSize="S" color="text" />}
              />
            )}
          </HvPanel>
        )}
      </>
    );
  },
};

export const ScopedSearch: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          "Use it when users might want to limit their search to a section of type of content.",
      },
    },
  },
  render: () => {
    const [results, setResults] = useState<string[] | null>(null);
    const [filter, setFilter] = useState("All");

    const classes = {
      container: css({
        display: "flex",
        gap: theme.space.xs,
        maxWidth: 610,
      }),
      dropdown: css({
        width: 200,
      }),
      input: css({
        width: "100%",
      }),
      result: css({
        marginTop: 5,
        padding: 5,
        color: theme.colors.text,
        backgroundColor: theme.colors.bgPage,
      }),
      panel: css({
        maxWidth: "610px",
        height: "250px",
        marginTop: "20px",
        padding: "5px",
      }),
    };

    const filterByContinent = () => {
      const index = continents.indexOf(filter);
      return index !== -1 ? countries[index] : countryNamesArray;
    };

    const filterHighlighted = (value: string): HvInputSuggestion[] =>
      filterByContinent()
        .filter((v) => v.toUpperCase().includes(value.toUpperCase()))
        .map((v) => ({
          id: v,
          value: v,
          label: parser(
            v.replace(new RegExp(value, "gi"), "<b>$&</b>"),
          ) as string,
        }))
        .slice(0, 6);

    const values = useMemo(() => ["All", ...continents], []);

    const handleSearch: HvInputProps["onEnter"] = (_, value) => {
      const newResults: string[] = [];

      filterByContinent()
        .filter((v) => v.toUpperCase().startsWith(value.toUpperCase()))
        .forEach((country) => {
          newResults.push(`${country}: Population`);
          newResults.push(`${country}: Economics`);
          newResults.push(`${country}: Health`);
        });

      setResults(newResults);
    };

    return (
      <>
        <div className={classes.container}>
          <HvSelect
            className={classes.dropdown}
            defaultValue="All"
            aria-label="Filter country"
            onChange={(evt, val) => setFilter(val!)}
          >
            {values.map((val) => (
              <HvOption key={val} value={val}>
                {val}
              </HvOption>
            ))}
          </HvSelect>
          <HvInput
            type="search"
            aria-label="Search country data"
            placeholder="Search"
            onEnter={handleSearch}
            suggestionListCallback={filterHighlighted}
            className={classes.input}
          />
        </div>
        {results != null && (
          <HvPanel className={classes.panel}>
            <HvTypography variant="label">Results</HvTypography>
            {results.map((element, i) => (
              <div key={i} className={classes.result}>
                {element}
              </div>
            ))}
            {results.length === 0 && (
              <HvEmptyState
                message="No data found"
                icon={<Fail iconSize="S" color="text" />}
              />
            )}
          </HvPanel>
        )}
      </>
    );
  },
};

export const SearchAsYouType: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          "Search-As-You-Type should be used to enable the user to narrow down a list according to the search query. The change is triggered on each keystroke.",
      },
    },
  },
  render: () => {
    const data = countries[continents.indexOf("Europe")];

    const [results, setResults] = useState<string[]>(data);

    const classes = {
      result: css({
        marginTop: 5,
        padding: 5,
        color: theme.colors.text,
        backgroundColor: theme.colors.bgPage,
      }),
      panel: css({
        maxWidth: "610px",
        height: "230px",
        marginTop: "20px",
        padding: "5px",
      }),
    };

    const handleSearch: HvInputProps["onChange"] = (_, value) => {
      const newResults: string[] = data
        .filter((v) => v.toUpperCase().includes(value.toUpperCase()))
        .map(
          (v) =>
            parser(v.replace(new RegExp(value, "gi"), "<b>$&</b>")) as string,
        );

      setResults(newResults);
    };

    return (
      <>
        <HvInput
          type="search"
          label="Filter countries"
          placeholder="Search"
          onChange={handleSearch}
          inputProps={{ autoComplete: "off" }}
        />
        <HvPanel className={classes.panel} tabIndex={0}>
          <HvTypography variant="label">Countries of Europe</HvTypography>
          {results.map((element, i) => (
            <div key={i} className={classes.result}>
              {element}
            </div>
          ))}
          {results.length === 0 && (
            <HvEmptyState
              message="No countries found"
              icon={<Fail iconSize="S" color="text" />}
            />
          )}
        </HvPanel>
      </>
    );
  },
};

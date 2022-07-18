import React, { useState, useRef } from "react";
import parser from "html-react-parser";
import { useTheme } from "@mui/styles";

import {
  HvFormElement,
  HvLabel,
  HvBaseInput,
  HvButton,
  HvSuggestions,
  HvTypography,
} from "../../..";
import { KeyboardCodes, isKeypress } from "../../../utils";

import countryList from "../../../Input/stories/countries";

export default {
  title: "How To Guides/Forms/Form Element Blocks/Suggestions",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvSuggestions } from "@hitachivantara/uikit-react-core"',
  },
  component: HvSuggestions,
  decorators: [
    (Story) => (
      <div style={{ width: 500, height: 320 }}>
        <Story />
      </div>
    ),
  ],
};

const { Esc, Tab } = KeyboardCodes;

export const Main = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e, val) => {
    const matches = suggestions.filter((v) => v.toUpperCase().startsWith(val.toUpperCase()));
    const newList = val.length >= 1 ? matches : [];
    setSuggestionList(newList);
    setOpen(newList.length > 0);
    setValue(val);
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.label);
    inputRef?.current?.focus();
  };

  const handleSuggestionsKey = (evt) => {
    if (isKeypress(evt, Esc)) {
      inputRef?.current?.focus();
      setOpen(false);
    } else if (isKeypress(evt, Tab)) {
      if (evt.shiftKey) {
        setTimeout(() => inputRef?.current?.focus());
      } else {
        setOpen(false);
      }
    }
  };

  const values = suggestionList.map((label, id) => ({ id: String(id), label })).slice(0, 6);

  return (
    <HvFormElement>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput
          value={value}
          inputRef={inputRef}
          placeholder="Insert country"
          onChange={handleChange}
          inputProps={{ "aria-labelledby": "countries" }}
        />
        <HvSuggestions
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onKeyDown={handleSuggestionsKey}
          onSuggestionSelected={handleSelection}
          suggestionValues={values}
        />
      </HvLabel>
    </HvFormElement>
  );
};

export const ServerSideSuggestions = () => {
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  // Server-side mock function
  const fetchCountries = (input) =>
    new Promise((resolve) => {
      const countries = countryList
        .filter((c) => c.toUpperCase().includes(input.toUpperCase()))
        .slice(0, 8);

      setTimeout(() => resolve(countries), 300);
    });

  const handleChange = (e, val) => {
    setValue(val);
    setOpen(false);
    if (val.length < 1) return;
    fetchCountries(val).then((countries) => {
      setSuggestionList(countries);
      setOpen(countries.length >= 1);
    });
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.label);
    inputRef?.current?.focus();
  };

  const handleSuggestionsKey = (evt) => {
    if (isKeypress(evt, Esc)) {
      inputRef?.current?.focus();
      setOpen(false);
    } else if (isKeypress(evt, Tab)) {
      if (evt.shiftKey) {
        setTimeout(() => inputRef?.current?.focus());
      } else {
        setOpen(false);
      }
    }
  };

  const values = suggestionList.map((label, id) => ({ id: String(id), label })).slice(0, 6);

  return (
    <HvFormElement>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput
          value={value}
          inputRef={inputRef}
          placeholder="Insert country"
          onChange={handleChange}
          inputProps={{ "aria-labelledby": "countries" }}
        />
        <HvSuggestions
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onKeyDown={handleSuggestionsKey}
          onSuggestionSelected={handleSelection}
          suggestionValues={values}
        />
      </HvLabel>
    </HvFormElement>
  );
};

export const OpenWithDownArrow = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e, val) => {
    const matches = suggestions.filter((v) => v.toUpperCase().startsWith(val.toUpperCase()));
    const newList = val.length >= 1 ? matches : [];
    setSuggestionList(newList);
    setOpen(newList.length > 0);
    setValue(val);
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.label);
    inputRef?.current?.focus();
  };

  const handleKey = (e) => {
    if (isKeypress(e, KeyboardCodes.ArrowDown)) {
      setOpen(true);
      document.getElementById("suggestions-list-item-0")?.focus();
    }
  };

  const handleSuggestionsKey = (evt) => {
    if (isKeypress(evt, Esc)) {
      inputRef?.current?.focus();
      setOpen(false);
    } else if (isKeypress(evt, Tab)) {
      if (evt.shiftKey) {
        setTimeout(() => inputRef?.current?.focus());
      } else {
        setOpen(false);
      }
    }
  };

  const values = suggestionList.map((label, id) => ({ id: String(id), label })).slice(0, 6);

  return (
    <HvFormElement>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput
          value={value}
          inputRef={inputRef}
          placeholder="Insert country"
          onChange={handleChange}
          onKeyDown={handleKey}
          inputProps={{ "aria-labelledby": "countries" }}
        />
        <HvSuggestions
          id="suggestions"
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onKeyDown={handleSuggestionsKey}
          onSuggestionSelected={handleSelection}
          suggestionValues={values}
        />
      </HvLabel>
    </HvFormElement>
  );
};

export const WithHighlighter = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("auto-complete");
  const inputRef = useRef(null);
  const theme = useTheme();

  const filterHighlighter = (searchString) => {
    const reg = new RegExp(searchString, "gi");
    switch (mode) {
      case "auto-complete":
        return suggestions
          .filter((v) => v.toUpperCase().startsWith(searchString.toUpperCase()))
          .map((match) => ({
            value: match,
            label: parser(`${match.replace(reg, "<b>$&</b>")}`),
          }));

      case "auto-suggest":
        return suggestions
          .filter((v) => v.toUpperCase().includes(searchString.toUpperCase()))
          .map((match) => ({
            value: match,
            label: parser(`<b>${match.replace(reg, "</b>$&<b>")}</b>`),
          }));

      default:
        return searchString;
    }
  };

  const handleChange = (e, val) => {
    const newList = val.length >= 1 ? filterHighlighter(val) : [];
    setSuggestionList(newList);
    setOpen(newList.length > 0);
    setValue(val);
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.value);
    inputRef?.current?.focus();
  };

  const handleSuggestionsKey = (evt) => {
    if (isKeypress(evt, Esc)) {
      inputRef?.current?.focus();
      setOpen(false);
    } else if (isKeypress(evt, Tab)) {
      if (evt.shiftKey) {
        setTimeout(() => inputRef?.current?.focus());
      } else {
        setOpen(false);
      }
    }
  };

  const values = suggestionList
    .map((elem, id) => ({ id: String(id), label: elem.label, value: elem.value }))
    .slice(0, 4);

  return (
    <>
      <HvTypography>
        {`Current mode: `}
        <b>{mode}</b>
      </HvTypography>
      <HvButton
        style={{ margin: theme.hvSpacing("xs", 0, "md") }}
        onClick={() => setMode(mode === "auto-complete" ? "auto-suggest" : "auto-complete")}
      >
        Change mode
      </HvButton>
      <p />
      <HvFormElement>
        <HvLabel id="countries" label="Select country">
          <HvBaseInput
            value={value}
            inputRef={inputRef}
            placeholder="Insert country"
            onChange={handleChange}
            inputProps={{ "aria-labelledby": "countries" }}
          />
          <HvSuggestions
            expanded={open}
            anchorEl={inputRef.current?.parentElement}
            onClose={() => setOpen(false)}
            onKeyDown={handleSuggestionsKey}
            onSuggestionSelected={handleSelection}
            suggestionValues={values}
          />
        </HvLabel>
      </HvFormElement>
    </>
  );
};

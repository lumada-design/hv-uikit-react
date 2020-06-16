import React, { useState, useRef } from "react";
import { HvFormElement, HvLabel, HvBaseInput, HvSuggestions } from "../../..";
import { isKeypress, KeyboardCodes } from "../../../utils";
import countryList from "../../../Input/stories/countries";

export default {
  title: "Components/Forms/Suggestions",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvSuggestions } from '@hv/uikit-react-core/dist'"
  },
  component: HvSuggestions,
  decorators: [
    Story => (
      <div style={{ width: 500, height: 200 }}>
        <Story />
      </div>
    )
  ]
};

export const Main = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e, val) => {
    const matches = suggestions.filter(v => v.toUpperCase().startsWith(val.toUpperCase()));
    const newList = val.length >= 1 ? matches : [];
    setSuggestionList(newList);
    setOpen(newList.length > 0);
    setValue(val);
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.label);
  };

  return (
    <HvFormElement value={value}>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput inputRef={inputRef} placeholder="Insert country" onChange={handleChange} />
        <HvSuggestions
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onSuggestionSelected={handleSelection}
          suggestionValues={suggestionList.map((label, id) => ({ id: String(id), label }))}
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
  const fetchCountries = input =>
    new Promise(resolve => {
      const countries = countryList
        .filter(c => c.toUpperCase().includes(input.toUpperCase()))
        .slice(0, 8);

      setTimeout(() => resolve(countries), 300);
    });

  const handleChange = (e, val) => {
    setValue(val);
    setOpen(false);
    if (val.length < 1) return;
    fetchCountries(val).then(countries => {
      setSuggestionList(countries);
      setOpen(countries.length >= 1);
    });
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.label);
  };

  return (
    <HvFormElement value={value}>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput inputRef={inputRef} placeholder="Insert country" onChange={handleChange} />
        <HvSuggestions
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onSuggestionSelected={handleSelection}
          suggestionValues={suggestionList.map((label, id) => ({ id: String(id), label }))}
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
    const matches = suggestions.filter(v => v.toUpperCase().startsWith(val.toUpperCase()));
    const newList = val.length >= 1 ? matches : [];
    setSuggestionList(newList);
    setOpen(newList.length > 0);
    setValue(val);
  };

  const handleSelection = (e, val) => {
    console.log(val);
    setOpen(false);
    setValue(val.label);
  };

  const handleKey = e => {
    if (isKeypress(e, KeyboardCodes.ArrowDown)) {
      setOpen(true);
      document.getElementById("suggestions-list-item-0")?.focus();
    }
  };

  return (
    <HvFormElement value={value}>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput
          inputRef={inputRef}
          placeholder="Insert country"
          onChange={handleChange}
          onKeyDown={handleKey}
        />
        <HvSuggestions
          id="suggestions"
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onSuggestionSelected={handleSelection}
          suggestionValues={suggestionList.map((label, id) => ({ id: String(id), label }))}
        />
      </HvLabel>
    </HvFormElement>
  );
};

import React, { useState, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import parser from "html-react-parser";
import { makeStyles } from "@material-ui/core";
import { CloseXS, Search } from "@hv/uikit-react-icons";
import {
  HvAdornment,
  HvDropdown,
  HvFormElement,
  HvLabel,
  HvBaseInput,
  HvSuggestions
} from "../../..";
import { KeyboardCodes, isKeypress } from "../../utils";
import countryList from "../../Input/stories/countries";

export default {
  title: "Components/Forms/Search Box",
  decorators: [
    Story => (
      <div style={{ height: 300 }}>
        <Story />
      </div>
    )
  ]
};

const { Enter, Esc, Tab } = KeyboardCodes;

export const BasicSearch = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (evt, val) => {
    const matches = suggestions.filter(v => v.toUpperCase().startsWith(val.toUpperCase()));
    const newList = val.length >= 1 ? matches : [];
    setSuggestionList(newList.slice(0, 6));
    setValue(val);
  };

  const handleKey = evt => {
    if (isKeypress(evt, Enter) && suggestionList.length > 0) {
      setOpen(true);
    }
  };

  const handleSelection = (evt, val) => {
    setOpen(false);
    setValue(val.label);
    inputRef?.current?.focus();
  };

  const handleSuggestionsKey = evt => {
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

  const adornment = (
    <>
      <HvAdornment
        isVisible={value.length > 0}
        onClick={() => {
          setValue("");
          setTimeout(() => {
            inputRef.current?.focus();
          });
        }}
        icon={<CloseXS />}
        aria-label="clear button"
      />
      <HvAdornment onClick={() => setOpen(value.length > 0)} icon={<Search />} />
    </>
  );

  return (
    <HvFormElement value={value} style={{ width: 360 }}>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput
          inputRef={inputRef}
          placeholder="Insert country"
          onChange={handleChange}
          onKeyDown={handleKey}
          endAdornment={adornment}
        />
        <HvSuggestions
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onKeyDown={handleSuggestionsKey}
          onSuggestionSelected={handleSelection}
          suggestionValues={suggestionList.map((label, id) => ({ id: String(id), label }))}
        />
      </HvLabel>
    </HvFormElement>
  );
};

export const DynamicSearch = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const filterHighlighted = val =>
    suggestions
      .filter(v => v.toUpperCase().startsWith(val.toUpperCase()))
      .map(v => ({
        value: v,
        label: parser(`<b>${v.replace(new RegExp(val, "gi"), "</b>$&<b>")}</b>`)
      }));

  const handleChange = (evt, val) => {
    const newList = val.length >= 1 ? filterHighlighted(val) : [];
    setOpen(newList.length > 0);
    setSuggestionList(newList.slice(0, 6));
    setValue(val);
  };

  const handleSelection = (evt, val) => {
    setOpen(false);
    setValue(val.value);
    inputRef?.current?.focus();
  };

  const handleSuggestionsKey = evt => {
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

  const adornment = (
    <>
      <HvAdornment
        isVisible={value.length > 0}
        onClick={() => {
          setValue("");
          setTimeout(() => {
            inputRef.current?.focus();
          });
        }}
        icon={<CloseXS />}
        aria-label="clear button"
      />
      <HvAdornment onClick={() => setOpen(value.length > 0)} icon={<Search />} />
    </>
  );

  return (
    <HvFormElement value={value} style={{ width: 360 }}>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput
          inputRef={inputRef}
          placeholder="Insert country"
          onChange={handleChange}
          endAdornment={adornment}
        />
        <HvSuggestions
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onKeyDown={handleSuggestionsKey}
          onSuggestionSelected={handleSelection}
          suggestionValues={suggestionList.map((el, id) => ({ id: String(id), ...el }))}
        />
      </HvLabel>
    </HvFormElement>
  );
};

export const ScopedSearch = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

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

  const filterHighlighted = val =>
    filterGroup()
      .filter(v => v.toUpperCase().includes(val.toUpperCase()))
      .map(v => ({
        value: v,
        label: parser(v.replace(new RegExp(val, "gi"), "<b>$&</b>"))
      }));

  const handleChange = (evt, val) => {
    const matches = filterHighlighted(val);
    const newList = val.length >= 1 ? matches : [];
    setOpen(newList.length > 0);
    setSuggestionList(newList.slice(0, 6));
    setValue(val);
  };

  const handleSelection = (evt, val) => {
    setOpen(false);
    setValue(val.value);
    inputRef?.current?.focus();
  };

  const handleSuggestionsKey = evt => {
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

  const adornment = (
    <>
      <HvAdornment
        isVisible={value.length > 0}
        onClick={() => {
          setValue("");
          setTimeout(() => {
            inputRef.current?.focus();
          });
        }}
        icon={<CloseXS />}
        aria-label="clear button"
      />
      <HvAdornment onClick={() => setOpen(value.length > 0)} icon={<Search />} />
    </>
  );

  const useStyles = makeStyles(() => ({
    container: {
      display: "flex"
    },
    dropdown: {
      width: 120,
      minWidth: "unset",
      marginRight: 10
    },
    width: {
      width: 120,
      minWidth: "unset"
    }
  }));

  const classes = useStyles();

  return (
    <HvFormElement value={value}>
      <HvLabel id="countries" label="Select country">
        <div className={classes.container}>
          <HvDropdown
            onChange={val => {
              const newFilter = val?.label || "All";
              console.log("Filter:", newFilter);
              setFilter(newFilter);
            }}
            classes={{ root: classes.dropdown, rootList: classes.width, list: classes.width }}
            values={["All", "A-L", "M-Z"].map(el => ({ label: el }))}
          />
          <div>
            <HvBaseInput
              style={{ width: 260 }}
              inputRef={inputRef}
              placeholder="Insert country"
              onChange={handleChange}
              endAdornment={adornment}
            />
            <HvSuggestions
              expanded={open}
              anchorEl={inputRef.current?.parentElement}
              onClose={() => setOpen(false)}
              onKeyDown={handleSuggestionsKey}
              onSuggestionSelected={handleSelection}
              suggestionValues={suggestionList.map((el, id) => ({ id: String(id), ...el }))}
            />
          </div>
        </div>
      </HvLabel>
    </HvFormElement>
  );
};

import React, { useState, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import parser from "html-react-parser";
import { makeStyles, useTheme } from "@material-ui/core";
import { CloseXS, Search } from "@hv/uikit-react-icons";
import {
  HvAdornment,
  HvDropdown,
  HvFormElement,
  HvLabel,
  HvBaseInput,
  HvSuggestions,
} from "../../..";
import { KeyboardCodes, isKeypress } from "../../utils";
import countryList from "../../Input/stories/countries";

export default {
  title: "Forms/Search Box",
};

const { Esc, Tab } = KeyboardCodes;
export const Main = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (evt, val) => {
    setValue(val);
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
      <HvAdornment isVisible={value.length === 0} icon={<Search />} />
    </>
  );

  const useStyles = makeStyles(() => ({
    formWidth: {
      width: 250,
    },
  }));

  const classes = useStyles();

  return (
    <HvFormElement value={value} className={classes.formWidth}>
      <HvBaseInput
        ariaLabel="Select country"
        inputRef={inputRef}
        placeholder="Search"
        onChange={handleChange}
        endAdornment={adornment}
      />
    </HvFormElement>
  );
};

Main.story = { decorators: [(storyFn) => <div style={{ height: 40 }}>{storyFn()}</div>] };

export const DynamicSearch = () => {
  const suggestions = countryList;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const filterHighlighted = (val) =>
    suggestions
      .filter((v) => v.toUpperCase().startsWith(val.toUpperCase()))
      .map((v) => ({
        value: v,
        label: parser(`<b>${v.replace(new RegExp(val, "gi"), "</b>$&<b>")}</b>`),
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
      <HvAdornment
        isVisible={value.length === 0}
        onClick={() => setOpen(value.length > 0)}
        icon={<Search />}
      />
    </>
  );

  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    inputBorderContainer: { height: 0 },
    inputPadder: {
      height: 10,
      background: theme.hv.palette.atmosphere.atmo1,
    },
    formWidth: {
      width: 250,
    },
  }));

  const classes = useStyles();

  return (
    <HvFormElement value={value} className={classes.formWidth}>
      <HvLabel id="countries" label="Select country">
        <HvBaseInput
          inputRef={inputRef}
          placeholder="Insert country"
          onChange={handleChange}
          endAdornment={adornment}
          classes={{ inputBorderContainer: open && classes.inputBorderContainer }}
        />
        {open && <div className={classes.inputPadder} />}
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

DynamicSearch.story = { decorators: [(storyFn) => <div style={{ height: 300 }}>{storyFn()}</div>] };

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

  const filterHighlighted = (val) =>
    filterGroup()
      .filter((v) => v.toUpperCase().includes(val.toUpperCase()))
      .map((v) => ({
        value: v,
        label: parser(v.replace(new RegExp(val, "gi"), "<b>$&</b>")),
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
      <HvAdornment
        isVisible={value.length === 0}
        onClick={() => setOpen(value.length > 0)}
        icon={<Search />}
      />
    </>
  );

  const theme = useTheme();

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
    inputBorderContainer: { height: 0 },
    inputRoot: {
      width: 260,
    },
    inputPadder: {
      height: 10,
      background: theme.hv.palette.atmosphere.atmo1,
    },
  }));

  const classes = useStyles();

  const values = [{ label: "All", selected: true }, { label: "A-L" }, { label: "M-Z" }];

  return (
    <HvFormElement value={value}>
      <HvLabel id="countries" label="Select country">
        <div className={classes.container}>
          <HvDropdown
            classes={{
              root: classes.root,
              dropdown: classes.root,
              rootList: classes.width,
              list: classes.width,
            }}
            onChange={(val) => {
              const newFilter = val?.label || "All";
              console.log("Filter:", newFilter);
              setFilter(newFilter);
            }}
            values={values}
          />
          <div>
            <HvBaseInput
              inputRef={inputRef}
              placeholder="Insert country"
              onChange={handleChange}
              endAdornment={adornment}
              classes={{
                root: classes.inputRoot,
                inputBorderContainer: open && classes.inputBorderContainer,
              }}
            />
            {open && <div className={classes.inputPadder} />}
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

ScopedSearch.story = { decorators: [(storyFn) => <div style={{ height: 300 }}>{storyFn()}</div>] };

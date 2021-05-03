import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HvProvider, HvLabel, HvSuggestions } from "@hv/uikit-react-core";

import { HvTagInput } from "../..";
import { allCountries, fetchCountries } from "./data";

export default {
  title: "Components/TagInput",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTagInput } from '@hv/uikit-react-core'",
  },
  component: HvTagInput,
};

export const Main = () => <HvTagInput />;

export const WithSuggestions = () => {
  const defaultTags = [{ label: "some label" }, { label: "some label2" }];

  const useStyles = makeStyles({
    root: {
      padding: 20,
      width: 400,
      height: 400,
    },
  });

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState(allCountries);
  const [value, setValue] = useState();
  const inputRef = useRef(null);

  const handleChange = (e, val) => {
    setValue(val);

    fetchCountries(val).then((res) => {
      setSuggestionList(res);
      setOpen(!!res.length);
    });
  };

  const handleSuggestionsKey = (event) => {
    const isEsq = event.key === "Esq";
    const isTab = event.key === "Tab";

    if (isEsq) {
      inputRef?.current?.focus();
      setOpen(false);
    }

    if (isTab) {
      if (event.shiftKey) {
        setTimeout(() => inputRef?.current?.focus());
      } else {
        setOpen(false);
      }
    }
  };

  const handleSelection = (e, val) => {
    setOpen(false);
    setValue(val.label);
    inputRef?.current?.focus();
  };

  return (
    <div className={classes.root}>
      <HvLabel id="tags" label="Tag Input">
        <HvTagInput
          value={value}
          defaultTags={defaultTags}
          inputRef={inputRef}
          onChange={handleChange}
        />
        <HvSuggestions
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onKeyDown={handleSuggestionsKey}
          onSuggestionSelected={handleSelection}
          suggestionValues={suggestionList}
        />
      </HvLabel>
    </div>
  );
};

WithSuggestions.parameters = {
  docs: {
    description: { story: "With Suggestions description." },
  },
};

import { Meta, StoryObj } from "@storybook/react";
import {
  HvBaseInput,
  HvFormElement,
  HvLabel,
  HvSuggestions,
  HvSuggestionsProps,
} from "@core/components";
import { useRef, useState } from "react";
import { isKeypress, keyboardCodes } from "@core/utils";
import countryList from "../../Input/countries";

const { Esc, Tab } = keyboardCodes;

const meta: Meta<typeof HvSuggestions> = {
  title: "Guides/Forms/Form Element Blocks/Suggestions",
  component: HvSuggestions,
  decorators: [
    (Story) => <div style={{ width: 500, height: 320 }}>{Story()}</div>,
  ],
};
export default meta;

export const Main: StoryObj<HvSuggestionsProps> = {
  args: {
    expanded: true,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    const suggestions = countryList;
    const [open, setOpen] = useState(false);
    const [suggestionList, setSuggestionList] = useState<string[]>([]);
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLElement>(null);

    const handleChange = (e, val) => {
      const matches = suggestions.filter((v) =>
        v.toUpperCase().startsWith(val.toUpperCase())
      );
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

    const values = suggestionList
      .map((label, id) => ({ id: String(id), label }))
      .slice(0, 6);

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
  },
};

export const ServerSideSuggestions: StoryObj<HvSuggestionsProps> = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [suggestionList, setSuggestionList] = useState<string[]>([]);
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLElement>(null);

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
        setSuggestionList(countries as string[]);
        setOpen((countries as string[]).length >= 1);
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

    const values = suggestionList
      .map((label, id) => ({ id: String(id), label }))
      .slice(0, 6);

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
  },
};

export const OpenWithDownArrow: StoryObj<HvSuggestionsProps> = {
  render: () => {
    const suggestions = countryList;
    const [open, setOpen] = useState(false);
    const [suggestionList, setSuggestionList] = useState<string[]>([]);
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLElement>(null);

    const handleChange = (e, val) => {
      const matches = suggestions.filter((v) =>
        v.toUpperCase().startsWith(val.toUpperCase())
      );
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
      if (isKeypress(e, keyboardCodes.ArrowDown)) {
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

    const values = suggestionList
      .map((label, id) => ({ id: String(id), label }))
      .slice(0, 6);

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
  },
};

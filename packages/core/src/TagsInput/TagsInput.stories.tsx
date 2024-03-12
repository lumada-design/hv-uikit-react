import { useState } from "react";
import styled from "@emotion/styled";
import { CSSInterpolation, css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvTagsInput,
  HvTagsInputProps,
  HvTypography,
  HvTagProps,
  HvFormStatus,
  tagsInputClasses,
  theme,
} from "@hitachivantara/uikit-react-core";

import countryNamesArray from "./countries";

const StyledMultilineTagsInput = styled(HvTagsInput)({
  [`& .${tagsInputClasses.tagsList}`]: {
    width: 600,
    height: 100,
  },
});

const StyledSuggestionsTagsInput = styled(HvTagsInput)({
  [`& > .${tagsInputClasses.root}`]: {
    height: 400,
  },
});

const meta: Meta<typeof HvTagsInput> = {
  title: "Components/Tag/Tags Input",
  component: HvTagsInput,
  decorators: [
    (storyFn) => <div style={{ maxWidth: "600px" }}>{storyFn()}</div>,
  ],
  parameters: {
    eyes: { include: false },
  },
};
export default meta;

export const Main: StoryObj<HvTagsInputProps> = {
  args: {
    label: "Enter your tags",
    description: "This is where you enter your tags",
    placeholder: "Enter value",
    "aria-label": "The label",
    disabled: false,
    readOnly: false,
    required: false,
    multiline: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    inputProps: { control: { disable: true } },
    countCharProps: { control: { disable: true } },
    suggestionListCallback: { control: { disable: true } },
  },
  render: (args) => {
    return <HvTagsInput {...args}>Tags Input</HvTagsInput>;
  },
};

export const Variants: StoryObj<HvTagsInputProps> = {
  render: () => {
    const styles: { root: CSSInterpolation } = {
      root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
      },
    };

    return (
      <div className={css(styles.root)}>
        <HvTagsInput
          label="Required"
          aria-label="Required"
          placeholder="Enter value"
          required
          value={[{ label: "tag 1" }, { label: "tag 2" }, { label: "tag 3" }]}
        />
        <HvTagsInput
          label="Disabled"
          aria-label="Disabled"
          placeholder="Enter value"
          disabled
          value={[
            { label: "tag 4", disabled: true },
            { label: "tag 5", disabled: true },
            { label: "tag 6", disabled: true },
          ]}
        />
        <HvTagsInput
          label="Readonly"
          aria-label="Readonly"
          placeholder="Enter value"
          readOnly
          value={[{ label: "tag 7" }, { label: "tag 8" }, { label: "tag 9" }]}
        />
        <HvTagsInput
          label="Invalid"
          aria-label="Invalid"
          placeholder="Enter value"
          status="invalid"
          statusMessage="Oh no!"
          value={[
            { label: "tag 10" },
            { label: "tag 11" },
            { label: "tag 12" },
          ]}
        />
      </div>
    );
  },
};

export const ControlledStringArray: StoryObj<HvTagsInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Controlled Tags Input with string array.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const [currValueStr, setCurrValueStr] = useState<string[]>([
      "tag 1",
      "tag 2",
    ]);

    return (
      <>
        <HvTagsInput
          label="Controlled with array of strings"
          aria-label="Controlled with array of string"
          description="A list of strings will result in semantic tags"
          placeholder="Enter value"
          value={currValueStr}
          onChange={(event, value: any) => {
            setCurrValueStr(value);
          }}
        />
        <HvTypography variant="label">Current value:</HvTypography>
        <HvTypography>{JSON.stringify(currValueStr)}</HvTypography>
      </>
    );
  },
};
const StyledButtonWrapper = styled("div")({
  "& button": {
    marginRight: theme.space.xs,
    marginBottom: theme.spacing(4),
  },
});

export const ControlledTagArray = () => {
  const [currValueArr, setCurrValueArr] = useState<HvTagProps[]>([
    { label: "tag 1", color: "#7ed69e" },
    {
      label: "tag 2 - click me!",
      color: "#7eccd6",
      type: "categorical",
      onClick: () => alert("Hello"),
    },
    { label: "tag 3", color: "#eba000" },
  ]);

  return (
    <>
      <StyledButtonWrapper>
        <HvButton
          variant="secondarySubtle"
          onClick={() => {
            const newArray = [...currValueArr];
            newArray.push({
              label: `tag ${currValueArr.length + 1}`,
              type: currValueArr.length % 2 === 0 ? "categorical" : "semantic",
              color: currValueArr.length % 2 === 0 ? "#7eccd6" : "#eba000",
            });
            setCurrValueArr(newArray);
          }}
        >
          Add tags
        </HvButton>
        <HvButton variant="secondarySubtle" onClick={() => setCurrValueArr([])}>
          Clear tags
        </HvButton>
      </StyledButtonWrapper>

      <HvTagsInput
        label="Controlled with array of tags"
        aria-label="Controlled with array of tags"
        placeholder="Enter value"
        value={currValueArr}
        onChange={(event, value) => {
          setCurrValueArr(value);
        }}
      />
      <HvTypography variant="label">Current value:</HvTypography>
      <HvTypography>{JSON.stringify(currValueArr)}</HvTypography>
    </>
  );
};

ControlledTagArray.parameters = {
  docs: {
    description: {
      story: "Controlled Tags Input with Tags array",
    },
  },
  eyes: { include: false },
};

export const ControlledWithValidation: StoryObj<HvTagsInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Controlled Tags Input with validation.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const [currValueStr, setCurrValueStr] = useState<string[]>([
      "tag 1",
      "tag 2",
    ]);
    const [status, setStatus] = useState<HvFormStatus>("valid");
    const [statusMsg, setStatusMsg] = useState("");

    const isInvalidTag = (tag: any) => tag?.includes("-");

    return (
      <>
        <HvTagsInput
          label="Controlled with validation"
          aria-label="Controlled with validation"
          description="A tag with a dash (-) will be invalid"
          placeholder="Enter value"
          value={currValueStr}
          status={status}
          statusMessage={statusMsg}
          onAdd={(event, value) => {
            if (value && isInvalidTag(value.label)) {
              setStatus("invalid");
              setStatusMsg("Oops, that tag has a dash (-)");
            } else {
              setStatus("valid");
              setStatusMsg("");
              setCurrValueStr([...currValueStr, value.label as string]);
            }
          }}
          onDelete={(_, value) => {
            const newArr = currValueStr.filter((t) => t !== value);
            setCurrValueStr(newArr);
          }}
        />
        <HvTypography variant="label">Current value:</HvTypography>
        <HvTypography>{JSON.stringify(currValueStr)}</HvTypography>
      </>
    );
  },
};

export const AddTagOnBlur: StoryObj<HvTagsInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Sample showcasing how to add tags when the input is blurred.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const [currValueArr, setCurrValueArr] = useState<HvTagProps[]>([
      { label: "tag 1", color: "#7ed69e" },
      {
        label: "tag 2 - click me!",
        color: "#7eccd6",
        type: "categorical",
        onClick: () => alert("Hello"),
      },
      { label: "tag 3", color: "#eba000" },
    ]);

    return (
      <HvTagsInput
        label="Adding tags on blur"
        aria-label="Adding tags on blur"
        placeholder="Enter value"
        value={currValueArr}
        onChange={(event, value) => {
          setCurrValueArr(value);
        }}
        onBlur={(event, value) => {
          if (value === "") return;
          setCurrValueArr([...currValueArr, { label: value }]);
        }}
      />
    );
  },
};

export const Multiline: StoryObj<HvTagsInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Tags Input in multi line mode.",
      },
    },
  },
  render: () => {
    return (
      <StyledMultilineTagsInput
        label="MultiLine"
        aria-label="The label"
        placeholder="Enter value"
        multiline
      />
    );
  },
};

export const NotResizable: StoryObj<HvTagsInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Not resizable.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    return (
      <HvTagsInput
        label="Fixed size not resizable"
        aria-label="The label"
        placeholder="Enter value"
        multiline
        resizable={false}
      />
    );
  },
};

export const TagsCounterValidation: StoryObj<HvTagsInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Tags Input with tags counter.",
      },
    },
  },
  render: () => {
    const [tagsLength, setTagsLength] = useState(0);

    return (
      <HvTagsInput
        label="Tags"
        description="Maximum 3 tags"
        aria-label="The label"
        placeholder="Enter value"
        onChange={(event, value) => {
          console.log("in onChange callback. data: ", value);
          setTagsLength(value.length);
          return value;
        }}
        validationMessages={{
          maxCharError: "Too many tags",
        }}
        maxTagsQuantity={3}
        countCharProps={{
          "aria-label": `You have inserted ${tagsLength} tags`,
          role: "status",
        }}
      />
    );
  },
};

export const CustomCommitCharacter: StoryObj<HvTagsInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Custom commit character.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    return (
      <HvTagsInput
        label="Custom commit character"
        description="Will only add a tag when a space or comma is entered or when the user clicks outside the input box and there's text that's not been commited"
        aria-label="Custom commit character"
        placeholder="Enter value"
        commitTagOn={["Space", "Comma"]}
        commitOnBlur
      />
    );
  },
};

export const Suggestions: StoryObj<HvTagsInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "With a list of suggestions.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const [currValueStr, setCurrValueStr] = useState<HvTagProps[]>([]);
    const countries = countryNamesArray;

    const suggestionHandler = (val: string) => {
      if (typeof val !== "string" || !val) return null;
      const foundCountries = countries.filter((country) =>
        country.toUpperCase().startsWith(val.toUpperCase())
      );

      if (foundCountries.length === 0) return null;

      return foundCountries.map((country, idx) => ({
        id: `c_${idx}`,
        label: country,
      }));
    };

    return (
      <StyledSuggestionsTagsInput
        label="Suggestions"
        description="A list of suggestions is presented when text is entered."
        aria-label="Suggestions"
        placeholder="Enter value"
        onChange={(event, value) => {
          setCurrValueStr(value);
        }}
        value={currValueStr}
        suggestionListCallback={suggestionHandler}
      />
    );
  },
};

export const UnrestrictedSuggestions: StoryObj<HvTagsInputProps> = {
  parameters: {
    docs: {
      description: {
        story: `Typically when using a suggestions list the goal is to have the tags
        being selected from amongst the options in the list. But sometimes it
        might be useful to allow the user to enter a tag that is not in the
        list. In this case you can use the \`suggestionValidation\` callback to
        validate the tag. You should also set the \`suggestionsLoose\` property
        to \`true\`.`,
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const [options, setOptions] = useState([
      "Option 1.1",
      "Option 1.2",
      "Option 1.3",
      "Option 2.1",
      "Option 2.2",
      "Option 2.3",
    ]);
    const [currValueStr, setCurrValueStr] = useState<HvTagProps[]>([]);
    const [status, setStatus] = useState<HvFormStatus>("valid");
    const [statusMsg, setStatusMsg] = useState("");

    const suggestionHandler = (val: string) => {
      if (typeof val !== "string" || !val) return null;
      const foundOptions = options.filter((option) =>
        option.toUpperCase().startsWith(val.toUpperCase())
      );

      if (foundOptions.length === 0) return null;

      return foundOptions.map((option, idx) => ({
        id: `c_${idx}`,
        label: option,
      }));
    };

    const suggestionValidation = (val: string) => {
      if (typeof val !== "string" || !val) return false;

      if (!val.startsWith("Option")) {
        setStatus("invalid");
        setStatusMsg(
          "Oops, that's not an option. Your tag must start with 'Option'"
        );
        return false;
      }
      setOptions((prev) => [...prev, val]);
      setStatus("valid");
      setStatusMsg("");
      return true;
    };

    return (
      <StyledSuggestionsTagsInput
        label="Suggestions"
        description="Enter a tag starting with 'Option'."
        aria-label="Suggestions"
        placeholder="Enter value"
        onChange={(event, value) => {
          setCurrValueStr(value);
        }}
        value={currValueStr}
        suggestionListCallback={suggestionHandler}
        suggestionValidation={suggestionValidation}
        suggestionsLoose
        status={status}
        statusMessage={statusMsg}
      />
    );
  },
};

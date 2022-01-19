import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { HvTagsInput, HvTypography } from "../..";

export default {
  title: "Forms/Tags Input",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTagsInput } from "@hitachivantara/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.6.0",
  },
  component: HvTagsInput,
  decorators: [(storyFn) => <div style={{ width: "600px" }}>{storyFn()}</div>],
};

export const Main = () => {
  const useStyles = makeStyles(() => ({
    root: {
      height: 150,
      width: 400,
    },
  }));
  const classes = useStyles();

  return (
    <HvTagsInput
      id="tags-list-1"
      label="Main"
      aria-label="The label"
      placeholder="Enter value"
      classes={{
        root: classes.root,
      }}
    />
  );
};

export const ControlledStringArray = () => {
  const [currValueStr, setCurrValueStr] = useState(["tag 1", "tag 2"]);

  return (
    <>
      <HvTagsInput
        id="tags-list-2"
        label="Controlled with array of strings"
        aria-label="Controlled with array of string"
        description="A list of strings will result in semantic tags"
        placeholder="Enter value"
        value={currValueStr}
        onChange={(value) => {
          setCurrValueStr(value);
        }}
      />
      <HvTypography variant="highlightText">Current value:</HvTypography>
      <HvTypography>{JSON.stringify(currValueStr)}</HvTypography>
    </>
  );
};

ControlledStringArray.parameters = {
  docs: {
    description: { story: "Controlled Tags Input with string array" },
  },
};

export const ControlledTagArray = () => {
  const [currValueArr, setCurrValueArr] = useState([
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
      <HvTagsInput
        id="tags-list-4"
        label="Controlled with array of tags"
        aria-label="Controlled with array of tags"
        placeholder="Enter value"
        value={currValueArr}
        onChange={(value) => {
          setCurrValueArr(value);
        }}
      />
      <HvTypography variant="highlightText">Current value:</HvTypography>
      <HvTypography>{JSON.stringify(currValueArr)}</HvTypography>
    </>
  );
};

ControlledTagArray.parameters = {
  docs: {
    description: { story: "Controlled Tags Input with Tags array" },
  },
};

export const Disabled = () => {
  return (
    <HvTagsInput
      id="tags-list-5"
      label="Disabled with disabled tags"
      aria-label="The label"
      placeholder="Enter value"
      disabled
      value={[
        { label: "tag 1", disabled: true },
        { label: "tag 2", disabled: true },
        { label: "tag 3", disabled: true },
      ]}
    />
  );
};

Disabled.parameters = {
  docs: {
    description: { story: "Disabled Tags Input" },
  },
};

export const Readonly = () => {
  return (
    <HvTagsInput
      id="tags-list-6"
      label="Readonly"
      aria-label="The label"
      placeholder="Enter value"
      readOnly
      value={[{ label: "tag 1" }, { label: "tag 2" }, { label: "tag 3" }]}
    />
  );
};

Readonly.parameters = {
  docs: {
    description: { story: "Readonly Tags Input" },
  },
};

export const Multiline = () => {
  const useStyles = makeStyles(() => ({
    root: {
      width: 350,
      height: 100,
    },
  }));
  const classes = useStyles();
  return (
    <HvTagsInput
      id="tags-list-9"
      label="Single Line"
      aria-label="The label"
      placeholder="Enter value"
      multiline
      classes={{
        root: classes.root,
      }}
    />
  );
};

Multiline.parameters = {
  docs: {
    description: { story: "Tags Input in multi line mode." },
  },
};

export const NotResizable = () => {
  const useStyles = makeStyles(() => ({
    root: {
      height: 100,
      width: 400,
    },
  }));
  const classes = useStyles();
  return (
    <HvTagsInput
      id="tags-list-7"
      label="Fixed size not resizable"
      aria-label="The label"
      placeholder="Enter value"
      classes={{
        root: classes.root,
      }}
      multiline
      resizable={false}
    />
  );
};

NotResizable.parameters = {
  docs: {
    story: "Not resizable.",
  },
};

export const TagsCounterValidation = () => {
  const [tagsLength, setTagsLength] = useState(0);

  const setCounter = (data) => {
    setTagsLength(data.length);
    return data;
  };

  const useStyles = makeStyles(() => ({
    root: {
      width: 350,
      height: 100,
    },
  }));

  const classes = useStyles();

  return (
    <HvTagsInput
      id="tags-list-8"
      label="With tags counter validation"
      aria-label="The label"
      placeholder="Enter value"
      onChange={(value) => setCounter(value)}
      multiline
      classes={{
        root: classes.root,
      }}
      maxTagsQuantity={3}
      countCharProps={{ "aria-label": `You have inserted ${tagsLength} tags` }}
    />
  );
};

TagsCounterValidation.parameters = {
  docs: {
    description: { story: "Tags Input with tags counter." },
  },
};

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { HvTextAreaTags, HvTypography } from "../..";

export default {
  title: "Forms/Text Area Tags",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTextAreaTags } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvTextAreaTags,
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
    <HvTextAreaTags
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

export const Controlled = () => {
  const [currValueStr, setCurrValueStr] = useState(["tag 1", "tag 2"]);

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
      <HvTextAreaTags
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
      <br />
      <br />
      <HvTextAreaTags
        id="tags-list-3"
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

Controlled.parameters = {
  docs: {
    description: { story: "Text area tags controlled" },
  },
};

export const Disabled = () => {
  return (
    <HvTextAreaTags
      id="tags-list-4"
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
    description: { story: "Text area tags disabled" },
  },
};

export const Readonly = () => {
  return (
    <HvTextAreaTags
      id="tags-list-5"
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
    description: { story: "Text area tags readonly" },
  },
};

export const NotResizable = () => {
  const useStyles = makeStyles(() => ({
    root: {
      height: 150,
      width: 400,
    },
  }));
  const classes = useStyles();
  return (
    <>
      <br />
      <br />
      <HvTextAreaTags
        id="tags-list-6"
        label="Fixed size not resizable"
        aria-label="The label"
        placeholder="Enter value"
        classes={{
          root: classes.root,
        }}
        resizable={false}
      />
    </>
  );
};

NotResizable.parameters = {
  docs: {
    story: "Text area tags not resizable.",
  },
};

export const TagsCounterValidation = () => {
  const [tagsLength, setTagsLength] = useState(0);

  const setCounter = (data) => {
    setTagsLength(data.length);
    return data;
  };

  return (
    <HvTextAreaTags
      id="tags-list-4"
      label="With tags counter validation"
      aria-label="The label"
      placeholder="Enter value"
      onChange={(value) => setCounter(value)}
      maxTagsQuantity={3}
      countCharProps={{ "aria-label": `You have inserted ${tagsLength} tags` }}
    />
  );
};

TagsCounterValidation.parameters = {
  docs: {
    description: { story: "Text area tags with tags counter." },
  },
};

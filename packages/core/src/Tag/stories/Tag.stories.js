import React from "react";

import { makeStyles } from "@mui/styles";

import { HvTag, HvListContainer, HvListItem, HvOverflowTooltip } from "../..";

export default {
  title: "Display/Tag",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTag } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvTag,
};

export const Main = () => {
  return (
    <div
      style={{
        width: "600px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag label="Informational" />
      <HvTag color="sema8" label="Success" />
      <HvTag color="sema9" label="Warning" />
      <HvTag color="sema20" label="Error" />
    </div>
  );
};

export const LongLabelText = () => {
  const longText = "This is an example of a very long tag";

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <HvTag label={<HvOverflowTooltip data={longText} />} />
      <HvTag label={`${longText} with default overflow`} />
    </div>
  );
};

export const WithDeleteAction = () => {
  return (
    <div
      style={{
        width: "600px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag
        label="Informational"
        onDelete={() => {
          alert("On Delete Action");
        }}
      />
      <HvTag
        label="Success"
        color="sema8"
        onDelete={() => {
          alert("On Delete Action");
        }}
        deleteButtonProps={{
          tabIndex: -1, // tab navigation should skip this tag
        }}
      />
      <HvTag
        label="Warning"
        color="sema9"
        onDelete={() => {
          alert("On Delete Action");
        }}
        deleteButtonProps={{
          tabIndex: -1, // tab navigation should skip this tag
        }}
      />
      <HvTag
        label="Error"
        color="sema20"
        onDelete={() => {
          alert("On Delete Action");
        }}
      />
    </div>
  );
};

export const DisabledTags = () => {
  return (
    <div
      style={{
        width: "350px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag label="Informational" disabled deleteButtonProps={{ "aria-label": "Disabled tag" }} />
      <HvTag
        label="Success"
        disabled
        onDelete={() => {
          alert("On Delete Action");
        }}
        deleteButtonProps={{ "aria-label": "Disabled tag" }}
      />
    </div>
  );
};

export const CategoricalTags = () => {
  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag label="Feat" onClick={() => alert("Hello")} type="categorical" />
      <HvTag label="Docs" onClick={() => alert("Hello")} type="categorical" color="cviz2" />
      <HvTag label="Fix" onClick={() => alert("Hello")} type="categorical" color="cviz3" />
      <HvTag label="New" onClick={() => alert("Hello")} type="categorical" color="cviz4" />
      <HvTag label="Deprecated" onClick={() => alert("Hello")} type="categorical" color="cviz5" />
      <HvTag label="No Click" type="categorical" color="#22FF45" />
    </div>
  );
};

export const CategoricalTagsDisabled = () => {
  return (
    <div
      style={{
        width: "350px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag label="Feat" onClick={() => alert("Hello")} type="categorical" disabled />
      <HvTag
        label="Docs"
        onClick={() => alert("Hello")}
        type="categorical"
        color="cviz2"
        disabled
      />
      <HvTag label="Fix" onClick={() => alert("Hello")} type="categorical" color="cviz3" disabled />
      <HvTag label="New" onClick={() => alert("Hello")} type="categorical" color="cviz4" disabled />
      <HvTag
        label="Deprecated"
        onClick={() => alert("Hello")}
        type="categorical"
        color="cviz5"
        disabled
      />
    </div>
  );
};

export const TagArray = () => {
  const useStyles = makeStyles((theme) => ({
    tagList: {
      display: "flex",
      flexWrap: "wrap",
      alignContent: "flex-start",
    },
    tagListItem: {
      padding: `0 ${theme.hv.spacing.xs}px ${theme.hv.spacing.xs}px 0`,
      height: "auto",
      lineHeight: "16px",
    },
  }));

  const classes = useStyles();

  return (
    <HvListContainer condensed role="list" className={classes.tagList} style={{ maxWidth: 350 }}>
      <HvListItem className={classes.tagListItem}>
        <HvTag label="In progress" />
      </HvListItem>
      <HvListItem className={classes.tagListItem}>
        <HvTag label="To Do" />
      </HvListItem>
      <HvListItem className={classes.tagListItem}>
        <HvTag label="New" />
      </HvListItem>
      <HvListItem className={classes.tagListItem}>
        <HvTag label="Success" />
      </HvListItem>
      <HvListItem className={classes.tagListItem}>
        <HvTag label="Fixed" />
      </HvListItem>
      <HvListItem className={classes.tagListItem}>
        <HvTag label="Completed" />
      </HvListItem>
    </HvListContainer>
  );
};

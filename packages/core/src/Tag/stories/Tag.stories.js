import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

import { HvTag, HvTypography, HvTooltip } from "../..";

export default {
  title: "Components/Tag",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTag } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.5.0",
  },
  component: HvTag,
};

export const Main = () => {
  const textElement = (tagLabel) => {
    const TagText = <HvTypography variant="normalText">{tagLabel}</HvTypography>;

    return TagText;
  };

  return (
    <div
      style={{
        width: "600px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag label={textElement("Informational")} />
      <HvTag color="sema8" label={textElement("Success")} />
      <HvTag color="sema9" label={textElement("Warning")} />
      <HvTag color="sema20" label={textElement("Error")} />
    </div>
  );
};

export const LongLabelText = () => {
  const useStyles = makeStyles(() => ({
    titleOverflow: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  }));
  const classes = useStyles();

  const tooltipWrapper = (tagLabel, textComponent) => {
    const tooltipText = <HvTypography>{tagLabel}</HvTypography>;
    return <HvTooltip title={tooltipText}>{textComponent}</HvTooltip>;
  };

  const tagLength = 30;

  const textElement = (tagLabel) => {
    const isLongLabel = tagLabel.length > tagLength;

    const TagText = (
      <HvTypography
        className={clsx({
          [classes.titleOverflow]: isLongLabel,
        })}
        variant="normalText"
      >
        {tagLabel}
      </HvTypography>
    );

    return tagLabel.length > tagLength ? tooltipWrapper(tagLabel, TagText) : TagText;
  };

  const longText = "This is an example of a very long tag";

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag label={textElement(longText)} />
    </div>
  );
};

export const WithDeleteAction = () => {
  const textElement = (tagLabel) => {
    const TagText = <HvTypography variant="normalText">{tagLabel}</HvTypography>;

    return TagText;
  };

  return (
    <div
      style={{
        width: "600px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag
        label={textElement("Informational")}
        onDelete={() => {
          alert("On Delete Action");
        }}
      />
      <HvTag
        label={textElement("Success")}
        color="sema8"
        onDelete={() => {
          alert("On Delete Action");
        }}
        deleteButtonProps={{
          tabIndex: -1, // tab navigation should skip this tag
        }}
      />
      <HvTag
        label={textElement("Warning")}
        color="sema9"
        onDelete={() => {
          alert("On Delete Action");
        }}
        deleteButtonProps={{
          tabIndex: -1, // tab navigation should skip this tag
        }}
      />
      <HvTag
        label={textElement("Error")}
        color="sema20"
        onDelete={() => {
          alert("On Delete Action");
        }}
      />
    </div>
  );
};

export const DisabledTags = () => {
  const textElement = (tagLabel) => {
    const TagText = <HvTypography variant="normalText">{tagLabel}</HvTypography>;

    return TagText;
  };

  return (
    <div
      style={{
        width: "350px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag
        label={textElement("Informational")}
        disabled
        deleteButtonProps={{ "aria-label": "Disabled tag" }}
      />
      <HvTag
        label={textElement("Success")}
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
  const textElement = (tagLabel) => {
    const TagText = <HvTypography variant="normalText">{tagLabel}</HvTypography>;

    return TagText;
  };
  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag label={textElement("Feat")} onClick={() => alert("Hello")} type="categorical" />
      <HvTag
        label={textElement("Docs")}
        onClick={() => alert("Hello")}
        type="categorical"
        color="cviz2"
      />
      <HvTag
        label={textElement("Fix")}
        onClick={() => alert("Hello")}
        type="categorical"
        color="cviz3"
      />
      <HvTag
        label={textElement("New")}
        onClick={() => alert("Hello")}
        type="categorical"
        color="cviz4"
      />
      <HvTag
        label={textElement("Deprecated")}
        onClick={() => alert("Hello")}
        type="categorical"
        color="cviz5"
      />
      <HvTag label={textElement("No Click")} type="categorical" color="#22FF45" />
    </div>
  );
};

export const CategoricalTagsDisabled = () => {
  const textElement = (tagLabel) => {
    const TagText = <HvTypography variant="normalText">{tagLabel}</HvTypography>;

    return TagText;
  };
  return (
    <div
      style={{
        width: "350px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <HvTag
        label={textElement("Feat")}
        onClick={() => alert("Hello")}
        type="categorical"
        disabled
      />
      <HvTag
        label={textElement("Docs")}
        onClick={() => alert("Hello")}
        type="categorical"
        color="cviz2"
        disabled
      />
      <HvTag
        label={textElement("Fix")}
        onClick={() => alert("Hello")}
        type="categorical"
        color="cviz3"
        disabled
      />
      <HvTag
        label={textElement("New")}
        onClick={() => alert("Hello")}
        type="categorical"
        color="cviz4"
        disabled
      />
      <HvTag
        label={textElement("Deprecated")}
        onClick={() => alert("Hello")}
        type="categorical"
        color="cviz5"
        disabled
      />
    </div>
  );
};

export const TagArray = () => {
  const useStyles = makeStyles(() => ({
    tagsPlaceholder: {
      width: "350px",
      display: "flex",
      padding: "10px 10px 0px 10px",
      flexWrap: "wrap",
      "& > *": {
        margin: "0 10px 10px 0",
      },
    },
  }));

  const classes = useStyles();

  const textElement = (tagLabel) => {
    const TagText = <HvTypography variant="normalText">{tagLabel}</HvTypography>;

    return TagText;
  };

  return (
    <div className={classes.tagsPlaceholder}>
      <HvTag label={textElement("In progress")} />
      <HvTag label={textElement("To Do")} />
      <HvTag label={textElement("New")} />
      <HvTag label={textElement("Success")} />
      <HvTag label={textElement("Fixed")} />
      <HvTag label={textElement("Completed")} />
    </div>
  );
};

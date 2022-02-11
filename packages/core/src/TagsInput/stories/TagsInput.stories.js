import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import { HvTagsInput, HvTypography, HvInput, HvButton } from "../..";

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
        onChange={(event, value) => {
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

  const useStyles = makeStyles((theme) => ({
    buttonWrapper: {
      "& button": {
        marginRight: theme.hvSpacing("xs"),
        marginBottom: theme.hvSpacing("md"),
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div className={classes.buttonWrapper}>
        <HvButton
          category="secondary"
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
        <HvButton category="secondary" onClick={() => setCurrValueArr([])}>
          Clear tags
        </HvButton>
      </div>

      <HvTagsInput
        id="tags-list-4"
        label="Controlled with array of tags"
        aria-label="Controlled with array of tags"
        placeholder="Enter value"
        value={currValueArr}
        onChange={(event, value) => {
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

export const ControlledWithValidation = () => {
  const [currValueStr, setCurrValueStr] = useState(["tag 1", "tag 2"]);
  const [status, setStatus] = useState("valid");
  const [statusMsg, setStatusMsg] = useState("");

  const isInvalidTag = (tag) => tag?.includes("-");

  const useStyles = makeStyles(() => ({
    root: {
      width: 500,
    },
  }));
  const classes = useStyles();

  return (
    <>
      <HvTagsInput
        id="tags-list-10"
        label="Controlled with validation"
        aria-label="Controlled with validation"
        description="A tag with a dash (-) will be invalid"
        placeholder="Enter value"
        value={currValueStr}
        status={status}
        statusMessage={statusMsg}
        classes={{
          root: classes.root,
        }}
        onAdd={(event, value) => {
          if (value && isInvalidTag(value.label)) {
            setStatus("invalid");
            setStatusMsg("Oops, that tag has a dash (-)");
          } else {
            setStatus("valid");
            setStatusMsg("");
            setCurrValueStr([...currValueStr, value]);
          }
        }}
        onDelete={(event, value) => {
          const newArr = currValueStr.filter((t) => t !== value);
          setCurrValueStr(newArr);
        }}
      />
      <HvTypography variant="highlightText">Current value:</HvTypography>
      <HvTypography>{JSON.stringify(currValueStr)}</HvTypography>
    </>
  );
};

ControlledWithValidation.parameters = {
  docs: {
    description: { story: "Controlled Tags Input with validation" },
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
      label="MultiLine"
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
      width: 450,
    },
  }));

  const classes = useStyles();
  const validationMessages = {
    maxCharError: "Too many tags",
  };

  return (
    <HvTagsInput
      id="tags-list-8"
      label="Tags"
      description="Maximum 3 tags"
      aria-label="The label"
      placeholder="Enter value"
      onChange={(event, value) => setCounter(value)}
      classes={{
        root: classes.root,
      }}
      validationMessages={validationMessages}
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

export const InAForm = () => {
  const useStyles = makeStyles(() => ({
    root: {
      width: 350,
      height: 100,
    },
  }));

  const classes = useStyles();

  const onSubmit = (value) => {
    alert(JSON.stringify(value));
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    tags: yup.array().required("Tags is required").min(3),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        tags: undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(props) => {
        const { values, errors, touched, handleSubmit, setFieldValue, setFieldTouched } = props;

        const parseStatus = (name) => {
          return errors[name] && touched[name] ? "invalid" : "valid";
        };

        const parseStatusMessage = (name) => {
          return errors[name] && touched[name] ? errors[name] : "";
        };
        return (
          <div style={{ width: 350 }}>
            <form data-testid="create-project-form" onSubmit={handleSubmit} noValidate>
              <HvInput
                label="Name"
                aria-label="Name"
                value={values.name}
                required
                description="Required"
                status={parseStatus("name")}
                statusMessage={parseStatusMessage("name")}
                placeholder="Enter Value"
                onChange={(evt, value) => {
                  setFieldTouched("name");
                  setFieldValue("name", value);
                }}
              />
              <br />
              <HvTagsInput
                id="tags-list-9"
                label="Tags"
                aria-label="Tags"
                placeholder="Enter value"
                description="Should have at least 3 tags"
                required
                classes={{
                  root: classes.root,
                }}
                status={parseStatus("tags")}
                statusMessage={parseStatusMessage("tags")}
                onChange={(event, tagsValues) => {
                  event?.preventDefault();
                  const value = tagsValues;
                  setFieldTouched("tags");
                  setFieldValue("tags", value);
                }}
              />
              <br />
              <HvButton type="submit" category="secondary">
                Submit
              </HvButton>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

InAForm.parameters = {
  docs: {
    description: { story: "Tags Input in a form." },
  },
};

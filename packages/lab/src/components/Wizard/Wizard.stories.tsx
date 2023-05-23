import { Meta, StoryObj } from "@storybook/react";
import { useCallback, useContext, useState } from "react";
import {
  HvAccordion,
  HvButton,
  HvGrid,
  HvInput,
  HvListContainer,
  HvListItem,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import mockText from "./mockData";
import { HvWizard, HvWizardProps, HvWizardContext } from ".";
import { css } from "@emotion/css";

const meta: Meta<typeof HvWizard> = {
  title: "Lab/Wizard",
  component: HvWizard,
  subcomponents: {},
};
export default meta;

const RandomFormComponent = () => {
  const { context, setContext, tab } = useContext(HvWizardContext);
  const [formData, setFormData] = useState({});

  const [text, setText] = useState(context[tab]?.form.name ?? "");
  const [isValid, setIsValid] = useState(!!context[tab]?.valid);

  const parseStatus = () => {
    return isValid ? "valid" : "invalid";
  };

  const parseStatusMessage = () => {
    return isValid ? "" : "This field is required";
  };

  const toggleContextValid = useCallback(
    (valid) => setContext({ ...context, [tab]: { ...context[tab], valid } }),
    [context, setContext, tab]
  );

  const handleFieldValue = (fieldName, fieldValue) => {
    let valid = false;
    setText(fieldValue);

    if (fieldValue !== "") {
      valid = true;
      toggleContextValid(true);
    } else {
      toggleContextValid(false);
    }

    setIsValid(valid);
    setFormData((fd) => {
      const updatedForm = { ...fd, [fieldName]: fieldValue };
      return updatedForm;
    });
    setContext((c) => ({
      ...c,
      [tab]: {
        ...c[tab],
        form: { ...formData, [fieldName]: fieldValue },
        valid: valid,
      },
    }));
  };

  return (
    <form noValidate>
      <HvGrid container>
        <HvGrid item xs={12}>
          <HvInput
            inputProps={{ autoComplete: "off" }}
            label="Name"
            value={text}
            placeholder="Type the name"
            status={parseStatus()}
            statusMessage={parseStatusMessage()}
            onChange={(evt, value) => handleFieldValue("name", value)}
            required
          />
        </HvGrid>
      </HvGrid>
    </form>
  );
};

export const Main: StoryObj<HvWizardProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = "Cross browser test";
    const labels = {
      previous: "Go Back",
      next: "Go Forward",
    };
    const mockSubmit = useCallback((context) => {
      console.log("MainStory::mockSubmit", { context });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShow(false);
      }, 2000);
    }, []);

    return (
      <>
        <HvButton onClick={() => setShow(true)}>Show Wizard</HvButton>
        <HvWizard
          open={show}
          onClose={() => setShow(false)}
          skippable={false}
          title={title}
          hasSummary={false}
          labels={labels}
          fixedHeight
          loading={loading}
          handleSubmit={mockSubmit}
          // This will only appear if hasSummary is true
          summaryContent={<div>Small summary example</div>}
        >
          {/* @ts-ignore */}
          <div name="Review Model">
            <HvTypography variant="title2" component="h2">
              1. API details
            </HvTypography>
            <HvTypography variant="body" component="p">
              Some text explaining what this section is about. It can be
              multiline but 2 lines are the maximum recommended.
            </HvTypography>
          </div>
          {/* @ts-ignore */}
          <RandomFormComponent name="randomForm" mustValidate />
          {/* @ts-ignore */}
          <div name="Review Parameters">
            <HvTypography variant="title2" component="h2">
              2. Deployment details
            </HvTypography>
            <br />
            {mockText}
          </div>
          {/* @ts-ignore */}
          <div name="last">Last</div>
        </HvWizard>
      </>
    );
  },
};

export const Skippable = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = "Cross browser test";
  const labels = {
    previous: "Previous Step",
    next: "Next Step",
  };
  const mockSubmit = useCallback((context) => {
    console.log("MainStory::mockSubmit", { context });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShow(false);
    }, 2000);
  }, []);
  return (
    <>
      <HvButton onClick={() => setShow(true)}>Show Wizard</HvButton>
      <HvWizard
        open={show}
        onClose={() => setShow(false)}
        skippable
        title={title}
        hasSummary={false}
        labels={labels}
        fixedHeight={false}
        loading={loading}
        handleSubmit={mockSubmit}
      >
        {/* @ts-ignore */}
        <div name="Review Model">
          <HvTypography variant="mTitle" component="h2">
            1. API details
          </HvTypography>
          <HvTypography>
            Some text explaining what this section is about. It can be multiline
            but 2 lines are the maximum recommended.
          </HvTypography>
        </div>
        {/* @ts-ignore */}
        <RandomFormComponent name="randomForm" mustValidate />
        {/* @ts-ignore */}
        <div name="Review Parameters">
          <HvTypography variant="mTitle" component="h2">
            2. Deployment details
          </HvTypography>
          <br />
          {mockText}
        </div>
        {/* @ts-ignore */}
        <div name="last">Last</div>
      </HvWizard>
    </>
  );
};

export const ComponentBreakDown = () => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback((evt, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  }, []);

  const handleSubmit = useCallback((newContext) => {
    console.log(newContext);
    setOpen(false);
  }, []);

  const classes = {
    summaryContainer: css({
      padding: 16,
    }),
    accordionSpacing: css({
      "& > li": {
        paddingLeft: 32,
      },
    }),
  };

  const summaryContent = (
    <div className={classes.summaryContainer}>
      <HvAccordion id="item1" label="Basics" headingLevel={3}>
        <HvListContainer
          className={classes.accordionSpacing}
          interactive
          condensed
        >
          <HvListItem>Views</HvListItem>
          <HvListItem>Parameters</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion id="item1" label="Code Base" headingLevel={3}>
        <HvListContainer
          className={classes.accordionSpacing}
          interactive
          condensed
        >
          <HvListItem>Settings</HvListItem>
          <HvListItem>Network</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion id="item1" label="Execution" headingLevel={3}>
        <HvListContainer
          className={classes.accordionSpacing}
          interactive
          condensed
        >
          <HvListItem>
            <HvTypography variant="label" component="span">
              Status
            </HvTypography>{" "}
            Open
          </HvListItem>
          <HvListItem>
            <HvTypography variant="label" component="span">
              Date
            </HvTypography>{" "}
            12/08/2018
          </HvListItem>
          <HvListItem>
            <HvTypography variant="label" component="span">
              Assignee
            </HvTypography>{" "}
            Management
          </HvListItem>
        </HvListContainer>
      </HvAccordion>
      {mockText}
    </div>
  );

  return (
    <>
      <HvButton onClick={() => setOpen(true)}>Show Wizard</HvButton>
      <HvWizard
        open={open}
        hasSummary
        summaryContent={summaryContent}
        onClose={handleClose}
        handleSubmit={handleSubmit}
        title={"Super component"}
        customStep={{ width: { xs: 200, sm: 250, md: 420, lg: 650 } }}
      >
        <div>1. Content</div>
        <div>
          <h2>2. Description</h2>
          <p>{mockText}</p>
        </div>
      </HvWizard>
    </>
  );
};

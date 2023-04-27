import { Meta, StoryObj } from "@storybook/react";
import { HvWizard, HvWizardProps } from "./Wizard";
import { useCallback, useContext, useState } from "react";
import {
  HvButton,
  HvGrid,
  HvInput,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import mockText from "./mockData";
import { HvWizardContext } from "./WizardContext/WizardContext";

const meta: Meta<typeof HvWizard> = {
  title: "Lab/Wizard",
  component: HvWizard,
  subcomponents: {},
};
export default meta;

const RandomFormComponent = () => {
  const { context, updateContext, tab } = useContext(HvWizardContext);
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
    (valid) => updateContext({ ...context, [tab]: { ...context[tab], valid } }),
    [context, updateContext, tab]
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
    updateContext({
      ...context,
      [tab]: {
        ...context[tab],
        form: { ...formData, [fieldName]: fieldValue },
        valid: valid,
      },
    });
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
          <HvTypography variant="normalText" component="p">
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

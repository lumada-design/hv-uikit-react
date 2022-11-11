import {
  HvButton,
  HvGrid,
  HvInput,
  HvTypography,
  HvTextArea,
  HvAccordion,
  HvListContainer,
  HvListItem,
} from "@hitachivantara/uikit-react-core";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@mui/styles";

import mockText from "./mockData";
import { HvWizard } from "../..";
import {
  HvWizardContext,
  HvWizardContainer,
  HvWizardTitle,
  HvWizardContent,
  HvWizardActions,
} from "..";

export default {
  title: "Lab/Wizard",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvWizard } from '@hitachivantara/uikit-react-lab'",
  },
  component: HvWizard,
};

const RandomFormComponent = ({ tab }) => {
  const [formData, setFormData] = React.useState({});
  const formDataTimeout = React.useRef(null);
  const { context, setContext } = React.useContext(HvWizardContext);
  const validationSchema = React.useMemo(
    () =>
      yup.object({
        name: yup.string().trim().max(20, "Max 20 chars").required(),
        description: yup.string().max(50, "Max 50 chars"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      name: context[tab].form.name ?? "",
      description: context[tab].form.description ?? "",
    },
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const toggleContextValid = React.useCallback(
    (valid) => setContext({ ...context, [tab]: { ...context[tab], valid } }),
    [context, setContext, tab]
  );

  React.useEffect(() => {
    if (context[tab].valid !== formik.isValid) {
      toggleContextValid(formik.isValid);
    }
  }, [context, formik.isValid, tab, toggleContextValid]);

  React.useEffect(() => {
    return () => {
      setContext((c) => ({
        ...c,
        [tab]: { ...c[tab], form: formData },
      }));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFieldValue = (fieldName, fieldValue) => {
    clearTimeout(formDataTimeout.current);
    formik.setFieldTouched(fieldName, true, false);
    formik.setFieldValue(fieldName, fieldValue);

    setFormData((fd) => {
      const updatedForm = { ...fd, [fieldName]: fieldValue };
      formDataTimeout.current = setTimeout(() => {
        setContext((c) => ({
          ...c,
          [tab]: { ...c[tab], form: updatedForm },
        }));
      }, 500);

      return updatedForm;
    });
  };

  const parseStatus = (name, pErrors) => (pErrors[name] ? "invalid" : "valid");
  const parseStatusMessage = (name, pErrors) => {
    const obj = pErrors[name] ? pErrors[name] : "";
    return Array.isArray(obj)
      ? obj.reduce((acc, o) => (o?.value ? `${acc}\n${o?.value}` : acc), "")
      : obj;
  };

  return (
    <form noValidate>
      <HvGrid container>
        <HvGrid item xs={12}>
          <HvInput
            inputProps={{ autoComplete: "off" }}
            label="Name"
            value={formik.values.name}
            placeholder="Type the name"
            status={parseStatus("name", formik.errors)}
            statusMessage={parseStatusMessage("name", formik.errors)}
            onChange={(evt, value) => handleFieldValue("name", value)}
            required
          />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvTextArea
            name="description"
            label="Description"
            placeholder="Type the description"
            rows={4}
            maxCharQuantity={50}
            value={formik.values.description}
            status={parseStatus("description", formik.errors)}
            statusMessage={parseStatusMessage("description", formik.errors)}
            onBlur={() => formik.setFieldTouched("description")}
            onChange={(evt, value) => handleFieldValue("description", value)}
          />
        </HvGrid>
      </HvGrid>
    </form>
  );
};

export const Main = () => {
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const title = "Cross browser test";
  const labels = {
    previous: "Go Back",
    next: "Go Forward",
  };
  const mockSubmit = React.useCallback((context) => {
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
        <div name="Review Model">
          <HvTypography variant="mTitle" component="h2">
            1. API details
          </HvTypography>
          <HvTypography variant="normalText" component="p">
            Some text explaining what this section is about. It can be multiline but 2 lines are the
            maximum recommended.
          </HvTypography>
        </div>
        <RandomFormComponent name="randomForm" mustValidate />
        <div name="Review Parameters">
          <HvTypography variant="mTitle" component="h2">
            2. Deployment details
          </HvTypography>
          <br />
          {mockText}
        </div>
        <div name="last">Last</div>
      </HvWizard>
    </>
  );
};

export const Skippable = () => {
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const title = "Cross browser test";
  const labels = {
    previous: "Previous Step",
    next: "Next Step",
  };
  const mockSubmit = React.useCallback((context) => {
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
        <div name="Review Model">
          <HvTypography variant="mTitle" component="h2">
            1. API details
          </HvTypography>
          <HvTypography variant="normalText" component="p">
            Some text explaining what this section is about. It can be multiline but 2 lines are the
            maximum recommended.
          </HvTypography>
        </div>
        <RandomFormComponent name="randomForm" mustValidate />
        <div name="Review Parameters">
          <HvTypography variant="mTitle" component="h2">
            2. Deployment details
          </HvTypography>
          <br />
          {mockText}
        </div>
        <div name="last">Last</div>
      </HvWizard>
    </>
  );
};

const useStyles = makeStyles(() => ({
  summaryContainer: {
    padding: 16,
  },
  accordionSpacing: {
    "& > li": {
      paddingLeft: 32,
    },
  },
}));

export const ComponentBreakDown = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [context, setContext] = React.useState({});
  const [summary, setSummary] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({
      context,
      setContext,
      summary,
      setSummary,
    }),
    [context, summary]
  );

  const handleClose = React.useCallback((evt, reason) => {
    if (reason !== "backdropClick") {
      setTab(0);
      setOpen(false);
    }
  }, []);

  const summaryContent = (
    <div className={classes.summaryContainer}>
      <HvAccordion id="item1" label="Basics" headingLevel={3}>
        <HvListContainer className={classes.accordionSpacing} interactive condensed>
          <HvListItem>Views</HvListItem>
          <HvListItem>Parameters</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion id="item1" label="Code Base" headingLevel={3}>
        <HvListContainer className={classes.accordionSpacing} interactive condensed>
          <HvListItem>Settings</HvListItem>
          <HvListItem>Network</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion id="item1" label="Execution" headingLevel={3}>
        <HvListContainer className={classes.accordionSpacing} interactive condensed>
          <HvListItem>
            <HvTypography variant="highlightText" component="span">
              Status
            </HvTypography>{" "}
            Open
          </HvListItem>
          <HvListItem>
            <HvTypography variant="highlightText" component="span">
              Date
            </HvTypography>{" "}
            12/08/2018
          </HvListItem>
          <HvListItem>
            <HvTypography variant="highlightText" component="span">
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
      <HvWizardContext.Provider value={contextValue}>
        <HvWizardContainer open={open} handleClose={handleClose}>
          <HvWizardTitle
            title="Super component"
            tab={tab}
            changeTab={setTab}
            hasSummary
            customStep={{ width: { xs: 200, sm: 250, md: 420, lg: 650 } }}
          />
          <HvWizardContent tab={tab} summaryContent={summaryContent}>
            <div>1. Content</div>
            <div>
              <h2>2. Description</h2>
              <p>{mockText}</p>
            </div>
          </HvWizardContent>
          <HvWizardActions
            tab={tab}
            changeTab={setTab}
            handleClose={handleClose}
            handleSubmit={handleClose}
          />
        </HvWizardContainer>
      </HvWizardContext.Provider>
    </>
  );
};

const useFullscreenStyles = makeStyles(() => ({
  customHeaderContainer: {
    backgroundColor: "gray",
    "& h6": {
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: 2,
    },
  },
  customContainer: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 20px)",
  },
  customTitle: {
    padding: 20,
    height: 200,
  },
  customContent: {
    flex: 1,
    overflowY: "auto",
  },
  customActions: {
    backgroundColor: "gray",
    height: 200,
  },
}));

export const FullScreenWizard = () => {
  const classes = useFullscreenStyles();
  const [tab, setTab] = React.useState(0);
  const [context, setContext] = React.useState({});
  const [summary, setSummary] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({
      context,
      setContext,
      summary,
      setSummary,
    }),
    [context, summary]
  );

  const handleClose = React.useCallback((evt, reason) => {
    if (reason !== "backdropClick") {
      setTab(0);
    }
  }, []);

  return (
    <HvWizardContext.Provider value={contextValue}>
      <HvWizardContainer
        className={classes.customContainer}
        open
        handleClose={handleClose}
        fullscreen
      >
        <HvWizardTitle
          className={classes.customTitle}
          classes={{ headerContainer: classes.customHeaderContainer }}
          title="Super component"
          tab={tab}
          changeTab={setTab}
          hasSummary
          customStep={{ width: { xs: 200, sm: 250, md: 420, lg: 650 } }}
        />
        <HvWizardContent
          className={classes.customContent}
          tab={tab}
          summaryContent={<div>Simple Summary</div>}
        >
          <div>1. Content</div>
          <div>
            <h2>2. Description</h2>
            <p>{mockText}</p>
          </div>
        </HvWizardContent>
        <HvWizardActions
          className={classes.customActions}
          tab={tab}
          changeTab={setTab}
          handleClose={handleClose}
          handleSubmit={handleClose}
        />
      </HvWizardContainer>
    </HvWizardContext.Provider>
  );
};

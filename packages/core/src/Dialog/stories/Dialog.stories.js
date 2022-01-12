/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react";
import { withStyles, useTheme } from "@material-ui/core";
import { Ungroup } from "@hitachivantara/uikit-react-icons";

import {
  HvButton,
  HvInput,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvTable,
  HvTextArea,
  HvTypography,
} from "../..";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Dialog",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvDialog } from "@hitachivantara/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvDialog,
  subcomponents: { HvDialogTitle, HvDialogContent, HvDialogActions },
};

const SimpleDialog = ({ buttonMessage, title, content, classes, indentContent = false }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton id={buttonMessage} style={{ width: "120px" }} onClick={() => setOpen(true)}>
        {buttonMessage}
      </HvButton>
      <HvDialog
        disableBackdropClick
        id="test"
        classes={classes}
        open={open}
        onClose={() => setOpen(false)}
      >
        {title}

        {content || (
          <HvDialogContent indentContent={indentContent}>
            Switching to model view will clear all the fields in your visualization. You will need
            to re-select your fields.
          </HvDialogContent>
        )}
        <HvDialogActions>
          <HvButton id="apply" category="ghost">
            Apply
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

export const Main = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton id="openDialog" style={{ width: "120px" }} onClick={() => setOpen(true)}>
        Open Dialog
      </HvButton>
      <HvDialog
        disableBackdropClick
        id="test"
        open={open}
        onClose={() => setOpen(false)}
        firstFocusable="test-close"
      >
        <HvDialogTitle variant="warning">Switch model view?</HvDialogTitle>
        <HvDialogContent indentContent>
          Switching to model view will clear all the fields in your visualization. You will need to
          re-select your fields.
        </HvDialogContent>
        <HvDialogActions>
          <HvButton id="apply" category="ghost">
            Apply
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

export const TextAndSemantic = () => {
  return (
    <>
      <SimpleDialog
        buttonMessage="No icon"
        title={<HvDialogTitle showIcon={false}>Are you sure?</HvDialogTitle>}
        content={
          <HvDialogContent>
            Switching to model view will clear all the fields in your visualization. You will need
            to re-select your fields.
          </HvDialogContent>
        }
      />
      <p />
      <SimpleDialog
        buttonMessage="Warning"
        title={<HvDialogTitle variant="warning">Are you sure?</HvDialogTitle>}
        indentContent
      />
      <p />
      <SimpleDialog
        buttonMessage="Info"
        title={<HvDialogTitle variant="info">Are you sure?</HvDialogTitle>}
        indentContent
      />
      <p />
      <SimpleDialog
        buttonMessage="Error"
        title={<HvDialogTitle variant="error">Are you sure?</HvDialogTitle>}
        indentContent
      />
    </>
  );
};

TextAndSemantic.parameters = {
  docs: {
    description: {
      story: "The modal allow the definition of variants, that alters the presented icon.",
    },
  },
};

export const CustomIcon = () => (
  <SimpleDialog
    buttonMessage="Custom icon"
    title={<HvDialogTitle customIcon={<Ungroup iconSize="S" />}>Are you sure?</HvDialogTitle>}
    indentContent
  />
);

CustomIcon.parameters = {
  docs: {
    description: {
      story:
        "The standard icon can be replaced by a custom or just removed. The firstFocusable is set to the Switch Away button.",
    },
  },
};

export const Accessibility = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton style={{ width: "120px" }} onClick={() => setOpen(true)}>
        Open Dialog
      </HvButton>
      <HvDialog
        disableBackdropClick
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="hv-dialog-title"
        aria-describedby="hv-dialog-description"
      >
        <HvDialogTitle id="hv-dialog-title" variant="warning">
          Switch model view?
        </HvDialogTitle>
        <HvDialogContent id="hv-dialog-description" indentContent>
          Switching to model view will clear all the fields in your visualization. You will need to
          re-select your fields.
        </HvDialogContent>
        <HvDialogActions>
          <HvButton category="ghost">Apply</HvButton>
          <HvButton category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

Accessibility.parameters = {
  docs: {
    description: {
      story:
        "Modals should have an `aria-labelledby` linking to the most appropriate element, as well as an optional `aria-describedby` pointing to the main content.",
    },
  },
};

export const CustomContent = () => {
  const contentStyles = {
    paper: {
      width: "100%",
    },
  };

  const DialogWithStyles = withStyles(contentStyles)(SimpleDialog);
  const theme = useTheme();

  return (
    <>
      <DialogWithStyles
        buttonMessage="Table"
        disableBackdropClick
        title={
          <HvDialogTitle showIcon={false}>
            <div>
              <HvTypography variant="xxsTitle">LHR-HDIFS-03</HvTypography>
              <HvTypography>HDI</HvTypography>
            </div>
          </HvDialogTitle>
        }
        content={
          <HvDialogContent>
            <HvTable
              data={[
                { id: 1, customer: "Blauer See Auto, Co.", dealSize: "Small" },
                { id: 2, customer: "Blauer See Auto, Co.", dealSize: "Small" },
                { id: 3, customer: "Blauer See Auto, Co.", dealSize: "Medium" },
                { id: 4, customer: "Online Diecast Creation", dealSize: "Medium" },
                { id: 5, customer: "Vitachrome Inc.", dealSize: "Small" },
              ]}
              columns={[
                {
                  headerText: "Customer",
                  accessor: "customer",
                  cellType: "alpha-numeric",
                  sortable: false,
                  width: "150px",
                },
                {
                  headerText: "Dealsize",
                  accessor: "dealSize",
                  cellType: "alpha-numeric",
                  sortable: false,
                  width: "150px",
                },
              ]}
              showPagination={false}
            />
          </HvDialogContent>
        }
      />
      <p />
      <SimpleDialog
        buttonMessage="Inputs"
        disableBackdropClick
        title={<HvDialogTitle showIcon={false}>Work request</HvDialogTitle>}
        content={
          <HvDialogContent>
            <HvInput
              id="input-simple-sample"
              label="Title"
              placeholder="Enter text"
              style={{ marginBottom: theme.hv.spacing.md }}
            />
            <HvTextArea
              id="main"
              label="Description"
              placeholder="Enter text"
              rows={3}
              style={{ width: "560px" }}
            />
          </HvDialogContent>
        }
      />
    </>
  );
};

CustomContent.parameters = {
  docs: {
    description: { story: "It is possible to insert any component in the modal." },
  },
};

export const RemoveSchedule = () => {
  const [open, setOpen] = useState(false);

  const styledString = () => (
    <div>
      The
      <b>
        {"\u00A0"}Generate Search Index{"\u00A0"}
      </b>
      schedule will be permanently removed.
    </div>
  );

  return (
    <div>
      <HvButton id="openDialog" style={{ width: "120px" }} onClick={() => setOpen(true)}>
        Open dialog
      </HvButton>
      <HvDialog
        disableBackdropClick
        id="test"
        open={open}
        onClose={() => setOpen(false)}
        firstFocusable="test-close"
      >
        <HvDialogTitle variant="warning">Remove schedule?</HvDialogTitle>
        <HvDialogContent indentContent>{styledString()}</HvDialogContent>
        <HvDialogActions>
          <HvButton id="remove" category="ghost">
            Remove
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

export const DeleteConfirmation = () => {
  const [open, setOpen] = useState(false);

  const styledString = () => (
    <div>
      This Execution and all its dependencies will be deleted permanently.
      <br />
      Confirm by typing
      <b>
        {"\u00A0"}Cleanse Raw Retail Store Date{"\u00A0"}
      </b>
      below.
      <br />
    </div>
  );

  return (
    <div>
      <HvButton id="openDialog" style={{ width: "120px" }} onClick={() => setOpen(true)}>
        Open dialog
      </HvButton>
      <HvDialog
        disableBackdropClick
        id="test"
        open={open}
        onClose={() => setOpen(false)}
        firstFocusable="test-close"
      >
        <HvDialogTitle variant="warning">Delete Confirmation</HvDialogTitle>
        <HvDialogContent indentContent>
          {styledString()}
          <div style={{ marginTop: 20 }}>
            <HvInput id="input-simple-sample" placeholder="Enter text" />
          </div>
        </HvDialogContent>
        <HvDialogActions>
          <HvButton id="remove" category="ghost">
            Delete Forever
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

export const NoRename = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton id="openDialog" style={{ width: "120px" }} onClick={() => setOpen(true)}>
        Open dialog
      </HvButton>
      <HvDialog
        disableBackdropClick
        id="test"
        open={open}
        onClose={() => setOpen(false)}
        firstFocusable="test-close"
      >
        <HvDialogTitle variant="warning">Cannot rename</HvDialogTitle>
        <HvDialogContent indentContent>
          A file with the same name already exists. You can replace existing file or specify another
          name.
        </HvDialogContent>
        <HvDialogActions>
          <HvButton id="remove" category="ghost">
            Specify another name
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

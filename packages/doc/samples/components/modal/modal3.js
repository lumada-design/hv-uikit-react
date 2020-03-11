import React, { useState } from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";
import { Success } from "@hv/uikit-react-icons/dist";
import { HvModal, HvModalTitle, HvModalContent, HvModalActions } from "@hv/uikit-react-core/dist";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import HvTable from "@hv/uikit-react-core/dist/Table";
import TextArea from "@hv/uikit-react-core/dist/TextArea";
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@hv/uikit-react-core/dist/Input";

const btnStyle = {
  width: "120px",
  height: "32px",
  marginRight: 20
};

const SimpleModal = ({ buttonMessage, title, content, classes }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton style={btnStyle} onClick={() => setOpen(true)}>
        {buttonMessage}
      </HvButton>
      <HvModal classes={classes} open={open} onClose={() => setOpen(false)} id="test">
        {title}
        {content || (
          <HvModalContent>
            Switching to model view will clear all the fields in your visualization. You will need
            to re-select your fields.
          </HvModalContent>
        )}
        <HvModalActions>
          <HvButton category="ghost">Apply</HvButton>
          <HvButton category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvModalActions>
      </HvModal>
    </div>
  );
};

const getColumns = () => [
  {
    headerText: "Customer",
    accessor: "customer",
    cellType: "alpha-numeric",
    sortable: false,
    width: "150px"
  },
  {
    headerText: "Dealsize",
    accessor: "dealSize",
    cellType: "alpha-numeric",
    sortable: false,
    width: "150px"
  }
];

const dataTypicalExample = [
  {
    id: 1,
    customer: "Blauer See Auto, Co.",
    dealSize: "Small"
  },
  {
    id: 2,
    customer: "Blauer See Auto, Co.",
    dealSize: "Small"
  },
  {
    id: 3,
    customer: "Blauer See Auto, Co.",
    dealSize: "Medium"
  },
  {
    id: 4,
    customer: "Online Diecast Creation",
    dealSize: "Medium"
  },
  {
    id: 5,
    customer: "Vitachrome Inc.",
    dealSize: "Small"
  }
];

const SimpleTable = () => (
  <HvTable data={dataTypicalExample} columns={getColumns()} showPagination={false} />
);

const containerStyle = {
  display: "flex"
};

const styles = () => ({
  container: {
    width: 555
  },
  label: {
    paddingTop: 0,
    paddingBottom: "10px",
    display: "block"
  },
  infoText: {
    paddingBottom: 20
  }
});

const textAreaStyles = () => ({
  container: {
    width: 555
  },
  textAreaContainer: {
    paddingTop: 30
  }
});

const contentStyles = () => ({
  paper: {
    width: 555
  }
});

const InputWithStyles = withStyles(styles)(Input);
const TextAreaWithStyles = withStyles(textAreaStyles)(TextArea);
const ModalWithStyles = withStyles(contentStyles)(SimpleModal);

export default (
  <div style={containerStyle}>
    <ModalWithStyles
      buttonMessage="Table"
      title={
        <HvModalTitle customIcon={<Success semantic="sema1" iconSize="M" />}>
          <div>
            <HvTypography variant="xxsTitle">LHR-HDIFS-03</HvTypography>
            <HvTypography variant="normalText">HDI</HvTypography>
          </div>
        </HvModalTitle>
      }
      content={
        <HvModalContent>
          <SimpleTable />
        </HvModalContent>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="Inputs"
      title={<HvModalTitle showIcon={false}>Work Request</HvModalTitle>}
      content={
        <HvModalContent>
          <InputWithStyles
            labels={{
              placeholder: "Enter text",
              inputLabel: "Title"
            }}
            fullWidth
            showInfo={false}
          />
          <TextAreaWithStyles
            disabled
            id="outlined-with-placeholder"
            labels={{
              placeholder: "Enter work Order Description",
              inputLabel: "Description"
            }}
            multiline
            rows={3}
            value="This is an example"
          />
        </HvModalContent>
      }
    />
  </div>
);

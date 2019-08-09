import React, { useState } from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";
import {
  HvModal,
  HvModalTitle,
  HvModalContent,
  HvModalActions
} from "@hv/uikit-react-core/dist";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import HvTable from "@hv/uikit-react-core/dist/Table";
import TextArea from "@hv/uikit-react-core/dist/TextArea";
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@hv/uikit-react-core/dist/Input";

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
  <HvTable
    data={dataTypicalExample}
    columns={getColumns()}
    showPagination={false}
  />
);

const SimpleModal = ({ buttonMessage, title, content, actions }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <HvButton onClick={() => setOpen(true)}>{buttonMessage}</HvButton>
      <HvModal open={open} onClose={() => setOpen(false)}>
        {title}
        {content}
        {actions}
      </HvModal>
    </div>
  );
};

const styles = theme => ({
  label: {
    paddingTop: 0,
    paddingBottom: "10px",
    display: "block"
  }
});

const InputWithStyles = withStyles(styles, { withTheme: true })(Input);

export default (
  <div>
    <SimpleModal
      buttonMessage="table"
      title={
        <HvModalTitle variant="default">
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
      buttonMessage="inputs"
      title={<HvModalTitle showIcon={false}>Work Request</HvModalTitle>}
      content={
        <HvModalContent>
          <InputWithStyles
            inputTextConfiguration={{
              placeholder: "Enter work Order Description",
              inputLabel: "Title"
            }}
            fullWidth
            validate={false}
          />
          <TextArea
            disabled
            id="outlined-with-placeholder"
            inputTextConfiguration={{
              placeholder: "Enter work Order Description",
              inputLabel: "Description"
            }}
            multiline
            rows="3"
            value="This is an example"
          />
        </HvModalContent>
      }
      actions={
        <HvModalActions>
          <HvButton category="secondary" onClick={() => {}}>
            Cancel
          </HvButton>
          <HvButton>Send Work Request</HvButton>
        </HvModalActions>
      }
    />
  </div>
);

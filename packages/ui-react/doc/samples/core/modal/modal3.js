import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions
} from "@hv-ui/react/core/Modal";
import { Typography } from "@material-ui/core";
import HvTable from "@hv-ui/react/core/Table";
import TextArea from "@hv-ui/react/core/TextArea";
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@hv-ui/react/core/Input";

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
      <Button onClick={() => setOpen(true)}>{buttonMessage}</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {title}
        {content}
        {actions}
      </Modal>
    </div>
  );
};

const styles = theme => ({
  label: {
    paddingTop: 0,
    paddingBottom: "10px",
    display: "block",
    fontWeight: theme.typography.subtitle2.fontWeight,
    letterSpacing: theme.typography.subtitle2.letterSpacing,
    color: theme.typography.subtitle2.color,
    fontSize: theme.typography.subtitle2.fontSize,
    lineHeight: theme.typography.subtitle2.lineHeight
  }
});

const InputWithStyles = withStyles(styles, { withTheme: true })(Input);

export default (
  <div>
    <SimpleModal
      buttonMessage="table"
      title={
        <ModalTitle variant="default">
          <div>
            <Typography variant="h6">LHR-HDIFS-03</Typography>
            <Typography variant="body1">HDI</Typography>
          </div>
        </ModalTitle>
      }
      content={
        <ModalContent>
          <SimpleTable />
        </ModalContent>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="inputs"
      title={<ModalTitle showIcon={false}>Work Request</ModalTitle>}
      content={
        <ModalContent>
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
        </ModalContent>
      }
      actions={
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Send Work Request</Button>
        </ModalActions>
      }
    />
  </div>
);

/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import {
  HvModal,
  HvModalTitle,
  HvModalContent,
  HvModalActions
} from "@hv/uikit-react-core";
import { Typography } from "@material-ui/core";
import HvTable from "@hv/uikit-react-core/Table";
import TextArea from "@hv/uikit-react-core/TextArea";
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@hv/uikit-react-core/Input";

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
      title={(
        <HvModalTitle variant="default">
          <div>
            <Typography variant="h6">LHR-HDIFS-03</Typography>
            <Typography variant="body1">HDI</Typography>
          </div>
        </HvModalTitle>
)}
      content={(
        <HvModalContent>
          <SimpleTable />
        </HvModalContent>
)}
    />
    <p />
    <SimpleModal
      buttonMessage="inputs"
      title={<HvModalTitle showIcon={false}>Work Request</HvModalTitle>}
      content={(
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
)}
      actions={(
        <HvModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Send Work Request</Button>
        </HvModalActions>
)}
    />
  </div>
);

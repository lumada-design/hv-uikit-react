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
  HvModalActions,
  HvModalContent,
  HvModalTitle
} from "@hv/uikit-react-core";

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

export default (
  <div>
    <SimpleModal
      buttonMessage="default"
      title={<HvModalTitle variant="default">Are you sure?</HvModalTitle>}
      content={(
        <HvModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </HvModalContent>
)}
      actions={(
        <HvModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </HvModalActions>
)}
    />
    <p />
    <SimpleModal
      buttonMessage="info"
      title={<HvModalTitle variant="info">Are you sure?</HvModalTitle>}
      content={(
        <HvModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </HvModalContent>
)}
      actions={(
        <HvModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </HvModalActions>
)}
    />
    <p />
    <SimpleModal
      buttonMessage="success"
      title={<HvModalTitle variant="success">Are you sure?</HvModalTitle>}
      content={(
        <HvModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </HvModalContent>
)}
      actions={(
        <HvModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </HvModalActions>
)}
    />
    <p />
    <SimpleModal
      buttonMessage="warning"
      title={<HvModalTitle variant="warning">Are you sure?</HvModalTitle>}
      content={(
        <HvModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </HvModalContent>
)}
      actions={(
        <HvModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </HvModalActions>
)}
    />
    <p />
    <SimpleModal
      buttonMessage="error"
      title={<HvModalTitle variant="error">Are you sure?</HvModalTitle>}
      content={(
        <HvModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </HvModalContent>
)}
      actions={(
        <HvModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </HvModalActions>
)}
    />
  </div>
);

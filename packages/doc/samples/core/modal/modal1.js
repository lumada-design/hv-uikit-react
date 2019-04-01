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
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle
} from "@hv/uikit-react-core/dist/Modal";

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

export default (
  <div>
    <SimpleModal
      buttonMessage="default"
      title={<ModalTitle variant="default">Are you sure?</ModalTitle>}
      content={(
        <ModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </ModalContent>
)}
      actions={(
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </ModalActions>
)}
    />
    <p />
    <SimpleModal
      buttonMessage="info"
      title={<ModalTitle variant="info">Are you sure?</ModalTitle>}
      content={(
        <ModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </ModalContent>
)}
      actions={(
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </ModalActions>
)}
    />
    <p />
    <SimpleModal
      buttonMessage="success"
      title={<ModalTitle variant="success">Are you sure?</ModalTitle>}
      content={(
        <ModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </ModalContent>
)}
      actions={(
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </ModalActions>
)}
    />
    <p />
    <SimpleModal
      buttonMessage="warning"
      title={<ModalTitle variant="warning">Are you sure?</ModalTitle>}
      content={(
        <ModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </ModalContent>
)}
      actions={(
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </ModalActions>
)}
    />
    <p />
    <SimpleModal
      buttonMessage="error"
      title={<ModalTitle variant="error">Are you sure?</ModalTitle>}
      content={(
        <ModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </ModalContent>
)}
      actions={(
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </ModalActions>
)}
    />
  </div>
);

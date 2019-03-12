import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle
} from "@hv-ui/react/core/Modal";

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
      content={
        <ModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </ModalContent>
      }
      actions={
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </ModalActions>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="info"
      title={<ModalTitle variant="info">Are you sure?</ModalTitle>}
      content={
        <ModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </ModalContent>
      }
      actions={
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </ModalActions>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="success"
      title={<ModalTitle variant="success">Are you sure?</ModalTitle>}
      content={
        <ModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </ModalContent>
      }
      actions={
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </ModalActions>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="warning"
      title={<ModalTitle variant="warning">Are you sure?</ModalTitle>}
      content={
        <ModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </ModalContent>
      }
      actions={
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </ModalActions>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="error"
      title={<ModalTitle variant="error">Are you sure?</ModalTitle>}
      content={
        <ModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </ModalContent>
      }
      actions={
        <ModalActions>
          <Button colorType="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Switch anyway</Button>
        </ModalActions>
      }
    />
  </div>
);

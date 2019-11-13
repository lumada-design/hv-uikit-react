import React, { useState } from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";
import {
  HvModal,
  HvModalActions,
  HvModalContent,
  HvModalTitle
} from "@hv/uikit-react-core/dist";


const containerStyle = {
  display:"flex"
}

const btnStyle = {
  width: "120px",
  height: "32px",
  marginRight: 20
};

const SimpleModal = ({ buttonMessage, title, content, actions }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton style={btnStyle} onClick={() => setOpen(true)}>{buttonMessage}</HvButton>
      <HvModal open={open} onClose={() => setOpen(false)} id="test">
        {title}
        {content}
        {actions}
      </HvModal>
    </div>
  );
};

export default (
  <div style={containerStyle}>
    <SimpleModal
      buttonMessage="success"
      title={<HvModalTitle variant="success">Are you sure?</HvModalTitle>}
      content={
        <HvModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </HvModalContent>
      }
      actions={
        <HvModalActions>
          <HvButton category="ghost">Switch anyway</HvButton>
          <HvButton category="ghost" onClick={() => {}}>
            Cancel
          </HvButton>
        </HvModalActions>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="warning"
      title={<HvModalTitle variant="warning">Are you sure?</HvModalTitle>}
      content={
        <HvModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </HvModalContent>
      }
      actions={
        <HvModalActions>
          <HvButton category="ghost">Switch anyway</HvButton>
          <HvButton category="ghost" onClick={() => {}}>
            Cancel
          </HvButton>
        </HvModalActions>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="error"
      title={<HvModalTitle variant="error">Are you sure?</HvModalTitle>}
      content={
        <HvModalContent>
          Switching to model view will clear all the fields in your
          visualization. You will need to re-select your fields.
        </HvModalContent>
      }
      actions={
        <HvModalActions>
          <HvButton category="ghost">Switch anyway</HvButton>
          <HvButton category="ghost" onClick={() => {}}>
            Cancel
          </HvButton>
        </HvModalActions>
      }
    />
  </div>
);

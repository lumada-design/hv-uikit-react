import React, { useState } from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";
import { Caution, Fail, Success } from "@hv/uikit-react-icons/dist";
import { HvModal, HvModalActions, HvModalContent, HvModalTitle } from "@hv/uikit-react-core/dist";

const containerStyle = {
  display: "flex"
};

const btnStyle = {
  width: "120px",
  height: "32px",
  marginRight: 20
};

const SimpleModal = ({ buttonMessage, title, content, classes }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton id={buttonMessage} style={btnStyle} onClick={() => setOpen(true)}>
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
          <HvButton id="switchAnyway" category="ghost">
            Switch anyway
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvModalActions>
      </HvModal>
    </div>
  );
};

export default (
  <div style={containerStyle}>
    <SimpleModal
      buttonMessage="Success"
      title={
        <HvModalTitle customIcon={<Success semantic="sema1" iconSize="M" />}>
          Are you sure?
        </HvModalTitle>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="Warning"
      title={
        <HvModalTitle customIcon={<Caution semantic="sema3" iconSize="M" />}>
          Are you sure?
        </HvModalTitle>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="Error"
      title={
        <HvModalTitle customIcon={<Fail semantic="sema4" iconSize="M" />}>
          Are you sure?
        </HvModalTitle>
      }
    />
  </div>
);

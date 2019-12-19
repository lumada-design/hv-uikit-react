import React, { useState } from "react";
import Unlock from "@hv/uikit-react-icons/dist/Generic/Unlock";

import {
  HvModal,
  HvModalActions,
  HvModalContent,
  HvModalTitle
} from "@hv/uikit-react-core/dist";
import HvButton from "@hv/uikit-react-core/dist/Button";

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
      <HvModal
        classes={classes}
        open={open}
        onClose={() => setOpen(false)}
        id="test"
      >
        {title}
        {content ? (
          content
        ) : (
          <HvModalContent>
            Switching to model view will clear all the fields in your
            visualization. You will need to re-select your fields.
          </HvModalContent>
        )}
        <HvModalActions>
          <HvButton category="ghost">Switch anyway</HvButton>
          <HvButton category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvModalActions>
      </HvModal>
    </div>
  );
};

export default (
  <SimpleModal
    buttonMessage="Custom icon"
    title={
      <HvModalTitle customIcon={<Unlock iconSize="M" />}>
        Are you sure?
      </HvModalTitle>
    }
  />
);

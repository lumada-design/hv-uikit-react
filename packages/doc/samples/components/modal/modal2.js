import React, { useState } from "react";
import Ungroup from "@hv/uikit-react-icons/dist/Generic/Ungroup";

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
      <HvButton id="modalButton" style={btnStyle} onClick={() => setOpen(true)}>
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
          <HvButton id="apply" category="ghost">
            Apply
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
  <SimpleModal
    buttonMessage="Custom icon"
    title={
      <HvModalTitle customIcon={<Ungroup iconSize="M" />}>
        Switch model view?
      </HvModalTitle>
    }
  />
);

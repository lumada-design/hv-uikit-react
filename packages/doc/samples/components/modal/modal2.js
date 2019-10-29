import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvButton from "@hv/uikit-react-core/dist/Button";
import Unlock from "@hv/uikit-react-icons/dist/Generic/Unlock";
import {
  HvModal,
  HvModalActions,
  HvModalContent,
  HvModalTitle
} from "@hv/uikit-react-core/dist";

const StyledUnlock = () => (<Unlock style={{padding: "11px"}} />);

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

export default (
  <SimpleModal
    buttonMessage="Custom icon"
    title={<HvModalTitle customIcon={<StyledUnlock iconSize="M" width="26px" height="26px" />}>Are you sure?</HvModalTitle>}
    content={(
      <HvModalContent>
        Switching to model view will clear all the fields in your visualization.
        You will need to re-select your fields.
      </HvModalContent>
)}
    actions={(
      <HvModalActions>
        <HvButton category="secondary" onClick={() => {}}>
          Cancel
        </HvButton>
        <HvButton>Switch anyway</HvButton>
      </HvModalActions>
)}
  />
);

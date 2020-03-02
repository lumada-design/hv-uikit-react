import React, { useState } from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";
import Success from "@hv/uikit-react-icons/dist/Success";
import Warning from "@hv/uikit-react-icons/dist/Caution";
import Fail from "@hv/uikit-react-icons/dist/Fail";
import {
  HvModal,
  HvModalActions,
  HvModalContent,
  HvModalTitle
} from "@hv/uikit-react-core/dist";
import withStyles from "@material-ui/core/styles/withStyles";

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
      <HvButton
        id={buttonMessage}
        style={btnStyle}
        onClick={() => setOpen(true)}
      >
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
          <HvButton id="switchAnyway" category="ghost">Switch anyway</HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvModalActions>
      </HvModal>
    </div>
  );
};

const iconWrapper = (Icon, sema, props) => {
  const GeneratedIcon = withStyles({}, { withTheme: true })(Icon);
  return () => <GeneratedIcon semantic={sema} {...props} />;
};

const generalIconProps = { iconSize: "M" };

export default (
  <div style={containerStyle}>
    <SimpleModal
      buttonMessage="Success"
      title={
        <HvModalTitle
          customIcon={iconWrapper(Success, "sema1", generalIconProps)()}
        >
          Are you sure?
        </HvModalTitle>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="Warning"
      title={
        <HvModalTitle
          customIcon={iconWrapper(Warning, "sema3", generalIconProps)()}
        >
          Are you sure?
        </HvModalTitle>
      }
    />
    <p />
    <SimpleModal
      buttonMessage="Error"
      title={
        <HvModalTitle
          customIcon={iconWrapper(Fail, "sema4", generalIconProps)()}
        >
          Are you sure?
        </HvModalTitle>
      }
    />
  </div>
);

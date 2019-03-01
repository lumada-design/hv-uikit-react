import React from "react";
import { storiesOf } from "@storybook/react";

import { Typography } from "@material-ui/core";
import Unlock from "@hv-ui/icons/core/S-icons/Unlock16";
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "../src/Modal/Main";
import ModalTitle from "../src/Modal/ModalTitle";
import ModalContent from "../src/Modal/ModalContent";
import ModalActions from "../src/Modal/ModalActions";
import TextArea from "../src/TextArea";
import Input from "../src/Input";
import Button from "../src/Button";
import SimpleTable from "./modal/SimpleTable";
import SimpleModal from "./modal/SimpleModal";

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

storiesOf("Modals", module)
  .add("with Inputs", () => (
    <Modal open onClose={() => {}}>
      <ModalTitle showIcon={false}>Work Request</ModalTitle>
      <ModalContent>
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
      </ModalContent>
      <ModalActions>
        <Button colorType="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button>Send Work Request</Button>
      </ModalActions>
    </Modal>
  ))
  .add("with Text", () => (
    <Modal open onClose={() => {}}>
      <ModalTitle variant="info">Are you sure?</ModalTitle>
      <ModalContent>
        Switching to model view will clear all the fields in your visualization.
        You will need to re-select your fields.
      </ModalContent>
      <ModalActions>
        <Button colorType="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button>Switch anyway</Button>
      </ModalActions>
    </Modal>
  ))
  .add("with Text and custom icon", () => (
    <Modal open onClose={() => {}}>
      <ModalTitle customIcon={<Unlock />}>Are you sure?</ModalTitle>
      <ModalContent>
        Switching to model view will clear all the fields in your visualization.
        You will need to re-select your fields.
      </ModalContent>
      <ModalActions>
        <Button colorType="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button>Switch anyway</Button>
      </ModalActions>
    </Modal>
  ))
  .add("with Table", () => (
    <Modal open onClose={() => {}}>
      <ModalTitle variant="default">
        <div>
          <Typography variant="h6">LHR-HDIFS-03</Typography>
          <Typography variant="body1">HDI</Typography>
        </div>
      </ModalTitle>
      <ModalContent>
        <SimpleTable />
      </ModalContent>
    </Modal>
  ))
  .add("working example", () => (
    <>
      <SimpleModal
        ModalTitle={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <ModalTitle variant="default">
            <div>
              <Typography variant="h6">LHR-HDIFS-03</Typography>
              <Typography variant="body1">HDI</Typography>
            </div>
          </ModalTitle>
        }
        ModalContent={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <ModalContent>
            <SimpleTable />
          </ModalContent>
        }
      />
    </>
  ));

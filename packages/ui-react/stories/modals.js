import React from "react";
import { storiesOf } from "@storybook/react";

import Modal from "../src/Modal/Main";
import ModalTitle from "../src/Modal/ModalTitle";
import ModalContent from "../src/Modal/ModalContent";
import ModalActions from "../src/Modal/ModalActions";
import TextArea from "../src/TextArea";
import Input from "../src/Input";
import Button from "../src/Button";

storiesOf("Modals", module).add("Work Orders", () => (
  <Modal open onClose={() => {}}>
    <ModalTitle>Work Request</ModalTitle>
    <ModalContent>
      <Input
        inputTextConfiguration={{
          placeholder: "Enter work Order Description",
          inputLabel: "Description"
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
        value={"dsfdsafsdfadsdfsda"}
      />
    </ModalContent>
    <ModalActions>
      <Button colorType="secondary" onClick={() => {}}>
        Cancel
      </Button>
      <Button>Send Work Request</Button>
    </ModalActions>
  </Modal>
));

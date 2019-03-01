/* eslint-disable react/prop-types */
import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "../../src/Modal/Main";

class SimpleModal extends React.Component {
  state = {
    open: false
  };

  handleChange = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const { ModalTitle, ModalContent, ModalActions } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Button onClick={this.handleChange}>Open Modal</Button>
        <Modal open={open} onClose={this.handleChange}>
          {ModalTitle}
          {ModalContent}
          {ModalActions}
        </Modal>
      </div>
    );
  }
}

export default SimpleModal;

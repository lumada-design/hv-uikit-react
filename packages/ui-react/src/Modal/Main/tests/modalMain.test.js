/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";

import Backdrop from "@material-ui/core/Backdrop";

import HvProvider from "../../../Provider";
import Button from "../../../Button";

import ModalWithStyles from "../index";
import Modal from "../Main";

describe("Modal withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <ModalWithStyles>Modal Content</ModalWithStyles>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Modal Component", () => {
  let wrapper;
  const onCloseMock = jest.fn();
  const open = true;

  beforeEach(async () => {
    wrapper = shallow(
      <Modal classes={{}} open={open} onClose={onCloseMock}>
        Modal Content
      </Modal>
    );
    onCloseMock.mockClear();
  });

  it("should render correctly if opened", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly if closed", () => {
    wrapper = shallow(
      <Modal classes={{}} open={false} onClose={onCloseMock}>
        Modal Content
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external props to be added", () => {
    wrapper = shallow(
      <Modal
        classes={{}}
        open={open}
        onClose={onCloseMock}
        disableBackdropClick
        disableEscapeKeyDown
      >
        Modal Content
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
      <Modal
        classes={{
          root: "testClassRoot",
          paper: "testClassPaper",
          background: "testClassBackground",
          closeButton: "testClassCloseButton"
        }}
        open={open}
        onClose={onCloseMock}
      >
        Modal Content
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("onClose should be called when close button is clicked", () => {
    const button = wrapper.find(Button);
    button.at(0).simulate("click");
    expect(onCloseMock).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it("onClose should be called when close is triggered in the dialog", () => {
    wrapper = mount(
      <HvProvider>
        <Modal classes={{}} open={open} onClose={onCloseMock}>
          Modal Content
        </Modal>
      </HvProvider>
    );

    const backdrop = wrapper.find(Backdrop);
    backdrop.at(0).simulate("click");
    expect(onCloseMock).toHaveBeenCalled();
  });
});

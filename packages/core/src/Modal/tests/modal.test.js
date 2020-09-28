/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import { Backdrop } from "@material-ui/core";

import HvProvider from "../../Provider";
import Modal from "..";

describe("[v3] Modal withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <Modal>Modal Content</Modal>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(Modal)).toMatchSnapshot();
  });
});

describe("[v3] Modal Component", () => {
  let wrapper;
  const onCloseMock = jest.fn();
  const open = true;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <Modal open={open} onClose={onCloseMock}>
          Modal Content
        </Modal>
      </HvProvider>
    );
    onCloseMock.mockClear();
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(Modal)).toMatchSnapshot();
  });

  it("should render correctly if closed", () => {
    wrapper = shallow(
      <HvProvider>
        <Modal open={false} onClose={onCloseMock}>
          Modal Content
        </Modal>
      </HvProvider>
    );
    expect(wrapper.find(Modal)).toMatchSnapshot();
  });

  it("allows external props to be added", () => {
    wrapper = shallow(
      <HvProvider>
        <Modal open={open} onClose={onCloseMock} disableBackdropClick disableEscapeKeyDown>
          Modal Content
        </Modal>
      </HvProvider>
    );
    expect(wrapper.find(Modal)).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
      <HvProvider>
        <Modal
          classes={{
            root: "testClassRoot",
            paper: "testClassPaper",
            background: "testClassBackground",
            closeButton: "testClassCloseButton",
          }}
          open={open}
        >
          Modal Content
        </Modal>
      </HvProvider>
    );
    expect(wrapper.find(Modal)).toMatchSnapshot();
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

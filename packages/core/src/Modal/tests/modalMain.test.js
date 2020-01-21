/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import { axe, toHaveNoViolations } from "jest-axe";
import Backdrop from "@material-ui/core/Backdrop";

import HvProvider from "../../Provider";
import Button from "../../Button";

import ModalWithStyles from "../index";
import Modal from "../Modal";

expect.extend(toHaveNoViolations);

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

  it("default state", async () => {
    wrapper = mount(
      <HvProvider>
        <ModalWithStyles open={open} onClose={onCloseMock}>
          Modal Content
        </ModalWithStyles>
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);
    expect(results).toHaveNoViolations();
  });
});

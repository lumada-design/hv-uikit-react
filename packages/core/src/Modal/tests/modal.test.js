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
import { Backdrop } from "@material-ui/core";

import HvProvider from "../../Provider";
import Modal from "..";

describe("Modal withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <Modal>Modal Content</Modal>
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
      <HvProvider>
        <Modal open={open} onClose={onCloseMock}>
          Modal Content
        </Modal>
      </HvProvider>
    );
    onCloseMock.mockClear();
  });

  it("should render correctly if opened", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly if closed", () => {
    wrapper = shallow(
      <HvProvider>
        <Modal open={false} onClose={onCloseMock}>
          Modal Content
        </Modal>
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external props to be added", () => {
    wrapper = shallow(
      <HvProvider>
        <Modal
          open={open}
          onClose={onCloseMock}
          disableBackdropClick
          disableEscapeKeyDown
        >
          Modal Content
        </Modal>
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
      <HvProvider>
        <Modal
          classes={{
            root: "testClassRoot",
            paper: "testClassPaper",
            background: "testClassBackground",
            closeButton: "testClassCloseButton"
          }}
          open={open}
        >
          Modal Content
        </Modal>
      </HvProvider>
    );
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

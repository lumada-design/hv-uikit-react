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
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";

import ModalTitleWithStyles from "../index";
import ModalTitle from "../ModalTitle";

describe("ModalContent withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <ModalTitleWithStyles>Modal Content</ModalTitleWithStyles>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ModalTitle Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <ModalTitle classes={{}}>Modal Content</ModalTitle>
      </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external props to be added", () => {
    wrapper = shallow(
      <HvProvider>
        <ModalTitle classes={{}} disableTypography>
          Modal Title
        </ModalTitle>
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
      <HvProvider>
        <ModalTitle
          classes={{
            root: "testClassRoot"
          }}
        >
          Modal Content
        </ModalTitle>
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

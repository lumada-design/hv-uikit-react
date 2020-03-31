/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";
import ModalContent from "..";

describe("ModalContent withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
        <HvProvider>
          <ModalContent>Modal Content</ModalContent>
        </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ModalContent Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
        <HvProvider>
          <ModalContent>Modal Content</ModalContent>
        </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

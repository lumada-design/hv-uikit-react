/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";
import ModalTitle from "..";

describe("[v3] ModalContent withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <ModalTitle>Modal Content</ModalTitle>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(ModalTitle)).toMatchSnapshot();
  });
});

describe("[v3] ModalTitle Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <ModalTitle>Modal Content</ModalTitle>
      </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(ModalTitle)).toMatchSnapshot();
  });
});

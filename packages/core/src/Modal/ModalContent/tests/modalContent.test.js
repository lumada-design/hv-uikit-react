/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";
import ModalContent from "..";

describe("[v3] ModalContent withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <ModalContent>Modal Content</ModalContent>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(ModalContent)).toMatchSnapshot();
  });
});

describe("[v3] ModalContent Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <ModalContent>Modal Content</ModalContent>
      </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(ModalContent)).toMatchSnapshot();
  });
});

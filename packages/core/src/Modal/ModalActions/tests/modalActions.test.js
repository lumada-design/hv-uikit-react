/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";
import ModalActions from "..";

describe("ModalActions withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
        <HvProvider>
          <ModalActions>Modal Content</ModalActions>
        </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("ModalActions Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
        <HvProvider>
          <ModalActions>Modal Content</ModalActions>
        </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external props to be added", () => {
    wrapper = shallow(
        <HvProvider>
          <ModalActions disableActionSpacing>Modal Content</ModalActions>
        </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
        <HvProvider>
          <ModalActions
              classes={{
                root: "testClassRoot",
                action: "testClassAction"
              }}
          >
            Modal Content
          </ModalActions>
        </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";
import DialogContent from "..";

describe("DialogContent withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <DialogContent>Dialog Content</DialogContent>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(DialogContent)).toMatchSnapshot();
  });
});

describe("DialogContent Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <DialogContent>Dialog Content</DialogContent>
      </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(DialogContent)).toMatchSnapshot();
  });
});

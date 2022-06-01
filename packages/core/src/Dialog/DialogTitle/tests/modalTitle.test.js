/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";
import DialogTitle from "..";

describe("DialogContent withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <DialogTitle>Dialog Content</DialogTitle>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(DialogTitle)).toMatchSnapshot();
  });
});

describe("DialogTitle Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <DialogTitle>Dialog Content</DialogTitle>
      </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(DialogTitle)).toMatchSnapshot();
  });
});

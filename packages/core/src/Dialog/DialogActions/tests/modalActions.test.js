/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";
import DialogActions from "..";

describe("DialogActions withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <DialogActions>Dialog Content</DialogActions>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(DialogActions)).toMatchSnapshot();
  });
});

describe("DialogActions Component", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <DialogActions>Dialog Content</DialogActions>
      </HvProvider>
    );
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(DialogActions)).toMatchSnapshot();
  });

  it("allows external props to be added", () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <DialogActions disableActionSpacing>Dialog Content</DialogActions>
      </HvProvider>
    );
    expect(wrapper.find(DialogActions)).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <DialogActions
          classes={{
            root: "testClassRoot",
            action: "testClassAction",
          }}
        >
          Dialog Content
        </DialogActions>
      </HvProvider>
    );
    expect(wrapper.find(DialogActions)).toMatchSnapshot();
  });
});

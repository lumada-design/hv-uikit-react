/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import { Backdrop } from "@mui/material";

import { HvProvider } from "@hitachivantara/uikit-react-core";
import HvDrawer from "..";

describe("HvDrawer withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <HvDrawer>Drawer Content</HvDrawer>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvDrawer)).toMatchSnapshot();
  });
});

describe("HvDrawer Component", () => {
  let wrapper;
  const onCloseMock = jest.fn();
  const open = true;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <HvDrawer open={open} onClose={onCloseMock}>
          HvDrawer Content
        </HvDrawer>
      </HvProvider>
    );
    onCloseMock.mockClear();
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(HvDrawer)).toMatchSnapshot();
  });

  it("should render correctly if closed", () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <HvDrawer open={false} onClose={onCloseMock}>
          HvDrawer Content
        </HvDrawer>
      </HvProvider>
    );
    expect(wrapper.find(HvDrawer)).toMatchSnapshot();
  });

  it("allows external props to be added", () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <HvDrawer
          open={open}
          onClose={onCloseMock}
          disableBackdropClick={false}
          disableEscapeKeyDown
        >
          HvDrawer Content
        </HvDrawer>
      </HvProvider>
    );
    expect(wrapper.find(HvDrawer)).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <HvDrawer
          classes={{
            root: "testClassRoot",
            paper: "testClassPaper",
            background: "testClassBackground",
            closeButton: "testClassCloseButton",
          }}
          open={open}
        >
          HvDrawer Content
        </HvDrawer>
      </HvProvider>
    );
    expect(wrapper.find(HvDrawer)).toMatchSnapshot();
  });

  it("onClose should be called when close is triggered in the HvDrawer", () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <HvDrawer classes={{}} open={open} onClose={onCloseMock}>
          HvDrawer Content
        </HvDrawer>
      </HvProvider>
    );

    const backdrop = wrapper.find(Backdrop);
    backdrop.at(0).simulate("click");
    expect(onCloseMock).toHaveBeenCalled();
  });
});

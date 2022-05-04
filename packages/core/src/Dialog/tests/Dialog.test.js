/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import { Backdrop } from "@mui/material";

import HvProvider from "../../Provider";
import Dialog from "..";

describe("Dialog withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <Dialog>Dialog Content</Dialog>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(Dialog)).toMatchSnapshot();
  });
});

describe("Dialog Component", () => {
  let wrapper;
  const onCloseMock = jest.fn();
  const open = true;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <Dialog open={open} onClose={onCloseMock}>
          Dialog Content
        </Dialog>
      </HvProvider>
    );
    onCloseMock.mockClear();
  });

  it("should render correctly if opened", () => {
    expect(wrapper.find(Dialog)).toMatchSnapshot();
  });

  it("should render correctly if closed", () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <Dialog open={false} onClose={onCloseMock}>
          Dialog Content
        </Dialog>
      </HvProvider>
    );
    expect(wrapper.find(Dialog)).toMatchSnapshot();
  });

  it("allows external props to be added", () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <Dialog open={open} onClose={onCloseMock} disableBackdropClick disableEscapeKeyDown>
          Dialog Content
        </Dialog>
      </HvProvider>
    );
    expect(wrapper.find(Dialog)).toMatchSnapshot();
  });

  it("allows external styles to be added", () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <Dialog
          classes={{
            root: "testClassRoot",
            paper: "testClassPaper",
            background: "testClassBackground",
            closeButton: "testClassCloseButton",
          }}
          open={open}
        >
          Dialog Content
        </Dialog>
      </HvProvider>
    );
    expect(wrapper.find(Dialog)).toMatchSnapshot();
  });

  it("onClose should be called when close is triggered in the dialog", () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <Dialog classes={{}} open={open} onClose={onCloseMock}>
          Dialog Content
        </Dialog>
      </HvProvider>
    );

    const backdrop = wrapper.find(Backdrop);
    backdrop.at(0).simulate("click");
    expect(onCloseMock).toHaveBeenCalled();
  });
});

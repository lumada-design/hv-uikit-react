/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

// import { mount } from "enzyme";
import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../../Provider";
import ActionsWrapper from "../index";
import Actions from "../Actions";
import HvButton from "../../../Button/Main/Button";

const mockData = [
  {
    label: "Value 1"
  },
  {
    label: "Value 2"
  },
  {
    label: "Value 3"
  }
];

describe("<Actions />", () => {
  let wrapper;
  let actionsComponent;
  const onCancelMock = jest.fn();
  const onApplyMock = jest.fn();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <ActionsWrapper onCancel={onCancelMock()} onApply={onApplyMock()} />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("onCancel is triggered", () => {
    actionsComponent = wrapper.find(Actions);

    actionsComponent
      .find(HvButton)
      .at(0)
      .simulate("click", {
        preventDefault() {}
      });

    expect(onCancelMock).toBeCalled();
  });

  it("onApply is triggered", () => {
    actionsComponent = wrapper.find(Actions);

    actionsComponent
      .find(HvButton)
      .at(1)
      .simulate("click", {
        preventDefault() {}
      });

    expect(onApplyMock).toBeCalled();
  });
});

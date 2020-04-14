import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../../Provider";
import HvButton from "../../../Button";

import Actions from "..";

describe("<Actions />", () => {
  let wrapper;
  let actionsComponent;
  const onCancelMock = jest.fn();
  const onApplyMock = jest.fn();

  const mockLabels = {
    applyLabel: "Apply Mock",
    cancelLabel: "Cancel Mock"
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Actions id="id" onCancel={onCancelMock()} onApply={onApplyMock()} labels={mockLabels} />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(Actions)).toMatchSnapshot();
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

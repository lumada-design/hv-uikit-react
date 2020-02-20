/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../../Provider";
import HvButton from "../../../Button";

import ActionsWrapper from "../index";
import Actions from "../Actions";

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
        <ActionsWrapper
          id="id"
          onCancel={onCancelMock()}
          onApply={onApplyMock()}
          labels={mockLabels}
        />
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

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import Play from "@hv/uikit-react-icons/dist/Generic/Play";
import Stop from "@hv/uikit-react-icons/dist/Generic/Stop";

import HvProvider from "../../../Provider";
import Actions, { Action } from "../index";

describe("Actions", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider>
        <Actions>
          <Action label="Action 1" icon={<Play />} />
          <Action label="Action 2" />
          <Action label="Action 3" icon={<Stop />} />
        </Actions>
      </HvProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});

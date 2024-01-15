/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Play, Stop } from "@hitachivantara/uikit-react-icons";
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

    expect(wrapper.find(Actions).length).toBe(1);
  });
});

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Play, Stop } from "@hitachivantara/uikit-react-icons";
import HvProvider from "../../../Provider";
import Options, { Option } from "../index";

describe("Options", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider>
        <Options>
          <Option label="Action 1" icon={<Play />} />
          <Option label="Action 2" />
          <Option label="Action 3" icon={<Stop />} />
        </Options>
      </HvProvider>
    );

    expect(wrapper.find(Options).length).toBe(1);
    expect(wrapper.find(Option).length).toBe(3);
  });

  it("should propagate onClick into the Options", () => {
    const mockFn = jest.fn();

    wrapper = mount(
      <HvProvider>
        <Options onClick={mockFn}>
          <Option label="Action 1" id="a1" icon={<Play />} />
          <Option label="Action 2" id="a2" />
          <Option label="Action 3" id="a3" icon={<Stop />} />
        </Options>
      </HvProvider>
    );

    wrapper.find('div[id="a1"]').simulate("click");
    wrapper.find('div[id="a2"]').simulate("click");
    wrapper.find('div[id="a3"]').simulate("click");
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
});

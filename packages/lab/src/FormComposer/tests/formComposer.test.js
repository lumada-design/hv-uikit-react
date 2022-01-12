/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import FormComposer from "..";

describe("FormComposer", () => {
  let wrapper;

  const groups = [
    {
      title: "Group1",
      children: [<input name="input1" onChange={(value) => value} />, <input name="input2" />],
    },
  ];

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <FormComposer groups={groups} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(FormComposer)).toMatchSnapshot();
  });

  it("should render the Button component", () => {
    const formComposerComponent = wrapper.find(FormComposer);
    expect(formComposerComponent.length).toBe(1);
  });
});

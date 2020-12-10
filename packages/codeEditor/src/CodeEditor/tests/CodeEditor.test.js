/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";
import HvProvider from "../../Provider";
import HvCodeEditor from "..";

import { Main } from "../stories/CodeEditor.stories";

describe("CodeEditor", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <Main />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Header component", () => {
    const component = wrapper.find("Main").dive().find("Header").at(0);
    expect(component.length).toBe(1);
  });

  it("should render the Code Editor component", () => {
    const component = wrapper.find("Main").dive().find(HvCodeEditor).at(0);
    expect(component.length).toBe(1);
  });
});

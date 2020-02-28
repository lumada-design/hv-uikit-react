/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import Actions from "../../../Actions";
import Footer from "..";

const myActions = [
  {
    id: "view",
    label: "View"
  },
  {
    id: "delete",
    label: "Delete"
  },
  {
    id: "update",
    label: "Update",
    disabled: true
  }
];

describe("Footer", () => {
  let wrapper;

  it("should render the actions and the dropdown accordingly", () => {
    wrapper = mount(
      <HvProvider>
        <Footer maxVisibleActions={1} actions={myActions} onChange={() => {}} />
      </HvProvider>
    );

    expect(wrapper.find(Actions)).toMatchSnapshot();

    wrapper = mount(
      <HvProvider>
        <Footer maxVisibleActions={0} actions={myActions} onChange={() => {}} />
      </HvProvider>
    );

    expect(wrapper.find(Actions)).toMatchSnapshot();

    wrapper = mount(
      <HvProvider>
        <Footer maxVisibleActions={2} actions={myActions} onChange={() => {}} />
      </HvProvider>
    );

    expect(wrapper.find(Actions)).toMatchSnapshot();
  });
});

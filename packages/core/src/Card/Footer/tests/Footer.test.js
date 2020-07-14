/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import ActionsGeneric from "../../../ActionsGeneric";
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
        <Footer id="id" maxVisibleActions={1} actions={myActions} onChange={() => {}} />
      </HvProvider>
    );

    expect(wrapper.find(ActionsGeneric)).toMatchSnapshot();

    wrapper = mount(
      <HvProvider>
        <Footer id="id" maxVisibleActions={0} actions={myActions} onChange={() => {}} />
      </HvProvider>
    );

    expect(wrapper.find(ActionsGeneric)).toMatchSnapshot();

    wrapper = mount(
      <HvProvider>
        <Footer id="id" maxVisibleActions={2} actions={myActions} onChange={() => {}} />
      </HvProvider>
    );

    expect(wrapper.find(ActionsGeneric)).toMatchSnapshot();
  });
});

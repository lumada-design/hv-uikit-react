/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";
import Card from "..";

const configuration = {
  title: "title",
  subtitle: "subtitle",
  content: <div />,
  actions: "actions",
  icon: "icon"
};

describe("Card withStyles", () => {
  let wrapper;

  it("should be able to render with every property defined", () => {
    wrapper = mount(
      <HvProvider>
        <Card
          icon={configuration.icon}
          headerTitle={configuration.title}
          subheader={configuration.subtitle}
          innerCardContent={configuration.content}
          actions={configuration.actions}
          mediaPath="path"
          isSelectable
          checkBoxProps={{
            value: "value"
          }}
        />
      </HvProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should select when clicking on the card", () => {
    const onClickM = jest.fn();
    const onChangeM = jest.fn();
    wrapper = mount(
      <HvProvider>
        <Card
          icon={configuration.icon}
          headerTitle={configuration.title}
          subheader={configuration.subtitle}
          innerCardContent={configuration.content}
          actions={configuration.actions}
          mediaPath="path"
          isSelectable
          selectOnClickAction
          onClick={onClickM}
          onChange={onChangeM}
          checkBoxProps={{
            value: "value"
          }}
        />
      </HvProvider>
    );
    wrapper.find({ role: "checkbox" }).simulate("click");
    expect(onClickM.mock.calls.length).toBe(1);
    expect(onChangeM.mock.calls.length).toBe(1);
  });

  it("should not select when clicking on the card", () => {
    const onClickM = jest.fn();
    const onChangeM = jest.fn();
    wrapper = mount(
      <HvProvider>
        <Card
          icon={configuration.icon}
          headerTitle={configuration.title}
          subheader={configuration.subtitle}
          innerCardContent={configuration.content}
          actions={configuration.actions}
          mediaPath="path"
          isSelectable
          onClick={onClickM}
          onChange={onChangeM}
          checkBoxProps={{
            value: "value"
          }}
        />
      </HvProvider>
    );
    wrapper.find({ role: "checkbox" }).simulate("click");
    expect(onClickM.mock.calls.length).toBe(1);
    expect(onChangeM.mock.calls.length).toBe(0);
  });
});

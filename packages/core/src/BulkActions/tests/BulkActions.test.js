/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Main, WithActions } from "../stories/BulkActions.stories";
import { HvActionsGeneric, HvProvider, HvBulkActions, HvDropDownMenu, HvCheckBox } from "../..";

describe("BulkActions", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <Main />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvBulkActions)).toMatchSnapshot();
  });

  it("should render the BulkActions", () => {
    const component = wrapper.find(HvBulkActions);
    expect(component.length).toBe(1);
  });

  it("should render a HvCheckbox component", () => {
    const component = wrapper.find(HvBulkActions).find(HvCheckBox).find("input");
    expect(component.length).toBe(1);
  });

  it("should render a Actions component", () => {
    const component = wrapper.find(HvActionsGeneric);
    expect(component.length).toBe(1);
  });
});

describe("BulkActions controlled with actions", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <WithActions />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvBulkActions)).toMatchSnapshot();
  });

  it("should render the HvBulkActions component", () => {
    const component = wrapper.find(HvBulkActions);
    expect(component.length).toBe(1);
  });

  it("should render the Actions component", () => {
    const component = wrapper.find(HvActionsGeneric);
    expect(component.length).toBe(1);
  });

  it("should render the HvDropDownMenu component", () => {
    const component = wrapper.find(HvDropDownMenu);
    expect(component.length).toBe(1);
  });
});

describe("BulkActions with selection", () => {
  let wrapper;
  const onSelectAllMock = jest.fn();
  const onSelectAllPagesMock = jest.fn();
  const labels = {
    selectAll: "All mock",
    selectAllPages: "All Pages mock",
  };

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <HvBulkActions
          numTotal={5}
          numSelected={3}
          labels={labels}
          onSelectAll={onSelectAllMock}
          onSelectAllPages={onSelectAllPagesMock}
        />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvBulkActions)).toMatchSnapshot();
  });

  it("should render the BulkActions", () => {
    const component = wrapper.find(HvBulkActions);
    expect(component.length).toBe(1);
  });

  it("should display select all pages", () => {
    expect(wrapper.text().includes(labels.selectAllPages)).toBe(false);
  });

  it("should call select all correctly", () => {
    const element = wrapper.find(HvCheckBox).find("input");
    element.simulate("change");
    expect(onSelectAllMock).toHaveBeenCalledTimes(1);
  });

  /*
  it("should call select all pages correctly", () => {
    const element = wrapper.find(HvButton);
    element.simulate("click");
    expect(onSelectAllPagesMock).toHaveBeenCalledTimes(1);
  });
  */
});

describe("BulkActions with custom label", () => {
  let wrapper;
  const labelMock = "MockLabel";

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <HvBulkActions numTotal={5} numSelected={0} selectAllLabel={labelMock} />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvBulkActions)).toMatchSnapshot();
  });

  it("should render the BulkActions", () => {
    const component = wrapper.find(HvBulkActions);
    expect(component.length).toBe(1);
  });

  it("should render the custom Label", () => {
    expect(wrapper.text().includes(labelMock)).toBe(true);
  });
});

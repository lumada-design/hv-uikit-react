/* eslint-env jest */

import React from "react";
import { mount, shallow } from "enzyme";

import { HvProvider, HvListItem } from "@hitachivantara/uikit-react-core";

import NavigationAnchors from "..";

describe("User withStyles", () => {
  let wrapper;

  const options = [
    {
      label: "Option1",
      value: "Value1",
    },
    {
      label: "Option2",
      value: "Value2",
    },
    {
      label: "Option3",
      value: "Value3",
    },
  ];

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider disableCssBaseline>
        <NavigationAnchors options={options} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(NavigationAnchors)).toMatchSnapshot();
  });

  it("should render correctly with props", () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <NavigationAnchors options={options} />
      </HvProvider>
    );
    expect(wrapper.find(NavigationAnchors)).toMatchSnapshot();
  });

  it("should handle click action correctly", () => {
    const onClick = jest.fn();
    const onClickCallback = () => onClick();

    wrapper = mount(
      <HvProvider disableCssBaseline>
        <NavigationAnchors options={options} onClick={onClickCallback} />
      </HvProvider>
    );
    expect(wrapper.find(NavigationAnchors)).toMatchSnapshot();

    const listItems = wrapper.find(HvListItem);
    listItems.first().simulate("click");
    expect(onClick).not.toHaveBeenCalled();
  });
});

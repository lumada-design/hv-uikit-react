/* eslint-env jest */

import React from "react";
import { mount, shallow } from "enzyme";

import ListItem from "@material-ui/core/ListItem";
import HvProvider from "@hv/uikit-react-core/dist/Provider";

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
      <HvProvider>
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
      <HvProvider>
        <NavigationAnchors options={options} />
      </HvProvider>
    );
    expect(wrapper.find(NavigationAnchors)).toMatchSnapshot();
  });

  it("should handle click action correctly", () => {
    const onClick = jest.fn();
    const onClickCallback = () => onClick();
    let listItems;

    wrapper = mount(
      <HvProvider>
        <NavigationAnchors options={options} onClick={onClickCallback} />
      </HvProvider>
    );
    expect(wrapper.find(NavigationAnchors)).toMatchSnapshot();

    listItems = wrapper.find(ListItem);
    listItems.first().simulate("click");
    expect(onClick).not.toHaveBeenCalled();
  });
});

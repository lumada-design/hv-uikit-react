/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import ListItem from "@material-ui/core/ListItem";
import HvProvider from "@hv/uikit-react-core/dist/Provider";

import NavigationAnchorsWithStyles from "../index";
import NavigationAnchors from "../NavigationAnchors";

describe("User withStyles", () => {
  let wrapper;

  const options = [
    {
      label: "Option1",
      value: "Value1"
    },
    {
      label: "Option2",
      value: "Value2"
    },
    {
      label: "Option3",
      value: "Value3"
    }
  ];

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <NavigationAnchorsWithStyles classes={{}} options={options} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render correctly with props", () => {
    wrapper = mount(
      <HvProvider>
        <NavigationAnchors classes={{}} options={options} />
      </HvProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should handle click action correctly", () => {
    const onClick = jest.fn();
    const onClickCallback = () => onClick();
    let listItems;

    wrapper = mount(
      <HvProvider>
        <NavigationAnchors classes={{}} options={options} onClick={onClickCallback} />
      </HvProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();

    listItems = wrapper.find(ListItem);
    listItems.first().simulate("click");
    expect(onClick).not.toHaveBeenCalled();

    wrapper = mount(
      <NavigationAnchors classes={{}} href={false} options={options} onClick={onClickCallback} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();

    listItems = wrapper.find(ListItem);
    listItems.first().simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});

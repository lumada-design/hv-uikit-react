/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import toJson from 'enzyme-to-json';

import ListItem from "@material-ui/core/ListItem";

import NavigationAnchorsWithStyles from "../index";
import NavigationAnchors from "../NavigationAnchors";

describe("User withStyles", () => {
  let wrapper;

  const options = [{
    label: "Option1",
    value: "Value1"
  }, {
    label: "Option2",
    value: "Value2"
  }, {
    label: "Option3",
    value: "Value3"
  }];

  beforeEach(async () => {
    wrapper = shallow(<NavigationAnchorsWithStyles classes={{}} options={options} /> );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render correctly with props", () => {
    wrapper = mount(<NavigationAnchors classes={{}} options={options} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should handle click action correctly", () => {
    const onClick = jest.fn();
    const onClickCallback = () => onClick();
    let listItems;

    wrapper = mount(<NavigationAnchors classes={{}} options={options} onClick={onClickCallback} />);
    expect(toJson(wrapper)).toMatchSnapshot();

    listItems = wrapper.find(ListItem);
    listItems.first().simulate("click");
    expect(onClick).not.toHaveBeenCalled();

    wrapper = mount(<NavigationAnchors classes={{}} href={false} options={options} onClick={onClickCallback} />);
    expect(toJson(wrapper)).toMatchSnapshot();

    listItems = wrapper.find(ListItem);
    listItems.first().simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

});

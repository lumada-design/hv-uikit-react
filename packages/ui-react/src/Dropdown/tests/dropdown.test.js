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

import { shallow, mount } from "enzyme";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { components } from "react-select";

import Dropdown from "../index";
import DropdownComponent from "../Dropdown";

describe("Dropdown", () => {
  let wrapper;

  describe("index", () => {
    beforeEach(async () => {
      wrapper = shallow(<Dropdown options={[]} />);
    });

    it("styles are injected correctly and mandatory properties too", () => {
      const dropDown = wrapper.find(DropdownComponent);
      const dropDownProps = dropDown.props();

      expect(dropDownProps.theme).toBeDefined();
      expect(dropDownProps.classes).toBeDefined();
      expect(dropDownProps.classes.selectRoot).toBeDefined();
      expect(dropDownProps.classes.selectGridLabel).toBeDefined();
      expect(dropDownProps.classes.selectGridLabelText).toBeDefined();
      expect(dropDownProps.classes.selectGridContent).toBeDefined();
      expect(dropDownProps.classes.selectGridContentElement).toBeDefined();
    });
  });

  describe("is rendered correctly and behaves as expected", () => {
    beforeEach(() => {
      wrapper = shallow(<DropdownComponent classes={{}} options={[]} />);
    });

    it("and if label is available it is rendered", () => {
      const labelText = "Test";
      wrapper = shallow(
        <DropdownComponent label={labelText} classes={{}} options={[]} />
      );

      const typographyElement = wrapper.find(Typography);
      expect(typographyElement).toHaveLength(1);
      expect(typographyElement.contains(labelText)).toBeTruthy();
      expect(typographyElement.props().variant).toEqual("subtitle2");
    });

    it("and if no label is passed as prop it is not rendered", () => {
      expect(wrapper.find(Typography)).toHaveLength(0);
    });

    it("with options rendered correctly", () => {
      const options = [
        { value: "open", label: "New" },
        { value: "fixed", label: "Fixed" },
        { value: "dismissed", label: "Dismissed" }
      ];

      wrapper = mount(<DropdownComponent classes={{}} options={[]} />);

      expect(wrapper.state().dropdownExpanded).toBeFalsy();
      expect(wrapper.find(components.Option)).toHaveLength(0);
      wrapper.setState({ dropdownExpanded: true });
      expect(wrapper.find(components.Option)).toHaveLength(0);

      wrapper.setState({ dropdownExpanded: false });
      wrapper.setProps({ options });
      expect(wrapper.find(components.Option)).toHaveLength(0);
      wrapper.setState({ dropdownExpanded: true });
      expect(wrapper.find(components.Option)).toHaveLength(3);
    });

    it("always starts closed", () => {
      const options = [
        { value: "open", label: "New" },
        { value: "fixed", label: "Fixed" },
        { value: "dismissed", label: "Dismissed" }
      ];

      wrapper = mount(<DropdownComponent classes={{}} options={options} />);
      expect(wrapper.state().dropdownExpanded).toBeFalsy();
      expect(wrapper.find(components.Option)).toHaveLength(0);
    });

    it("calls the onChange on value change", () => {
      // TODO: need to find a way to trigger the menu open and then select a value
      /* const options = [
        { value: "open", label: "New" },
        { value: "fixed", label: "Fixed" },
        { value: "dismissed", label: "Dismissed" }
      ];

      const onChange = jest.fn();
      const onChangeFunc = () => onChange();

      wrapper = mount(
        <DropdownComponent
          classes={{}}
          options={options}
          onChange={onChangeFunc}
        />
      );

      wrapper.find(components.SelectContainer).simulate("click");
      wrapper.find(components.Option).simulate("click");
      expect(onChange).toBeCalled(); */
    });
  });
});

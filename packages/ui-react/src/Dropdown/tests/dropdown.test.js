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

import { mount } from "enzyme";
import React from "react";
import HvProvider from "../../Provider";
import DropdownWithStyles from "../index";
import Dropdown from "../Dropdown";

describe("Dropdown", () => {
  
  let wrapper;

  const data = [
    { id: 1, label: "980969 Bribie" },
    { id: 2, label: "980969 Gatton" },
    { id: 3, label: "980969 Perkes" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
    { id: 6, label: "6" },
    { id: 7, label: "7" },
    { id: 8, label: "8" },
    { id: 9, label: "9" },
    { id: 10, label: "10" },
    { id: 11, label: "11" },
    { id: 12, label: "12" }
  ];
  
  const values = [
    { id: 4, label: "4" },
    { id: 5, label: "5" },
  ];

  let selections;
  let temporarySelection;
  

  const getDropdownProps = (ParentElement) => ParentElement.children().children().props();
  const getDropdown = (ParentElement) => ParentElement.children().children().children().instance();

  const testState = (selectedItems , items, dropdownExpanded, temporarySelections, instance) => {
    expect(instance.state.dropdownExpanded).toBe(dropdownExpanded);
    expect(instance.state.items).toBe(items);
    expect(instance.state.selectedItems).toEqual(selectedItems);
    expect(instance.state.temporarySelection).toEqual(temporarySelections);
  }

  const inputTextConfiguration = {
    searchPlaceholder: "Search...",
    noItemsMessage: "No Items...",
    noneSelectedMessage: "None Selected",
    selectedMessage: "delected",
    selectAllMessage: "Select All",
    clearAllMessage: "Clear All",
    applyButtonText: "Apply",
    cancelButtonText: "Cancel",
    defaultTextValue: "All",
    multipleSelectionConjuctionMessage: "of",
    dropdownLabel: "label"
  }
  
  describe("smoke test", () => {
    beforeEach(async () => {
      wrapper = mount(<HvProvider><DropdownWithStyles messages={inputTextConfiguration} /></HvProvider>);
    });
  
    it("should be defined", () => {
      expect(wrapper).toBeDefined();
    });
  
    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  
    it("should render the dropdown component", () => {
      const inputComponent = wrapper.find(Dropdown);
      expect(inputComponent.length).toBe(1);
    });
  })

  describe("functional test", () => {

    beforeEach(() => {
     selections = [
        { id: 1, label: "980969 Bribie", isChecked: false },
        { id: 2, label: "980969 Gatton", isChecked: false },
        { id: 3, label: "980969 Perkes", isChecked: false },
        { id: 4, label: "4", isChecked: true },
        { id: 5, label: "5", isChecked: true },
        { id: 6, label: "6", isChecked: false },
        { id: 7, label: "7", isChecked: false },
        { id: 8, label: "8", isChecked: false },
        { id: 9, label: "9", isChecked: false },
        { id: 10, label: "10", isChecked: false },
        { id: 11, label: "11", isChecked: false },
        { id: 12, label: "12", isChecked: false }
      ];

      temporarySelection = [
        { id: 1, label: "980969 Bribie", isChecked: false },
        { id: 2, label: "980969 Gatton", isChecked: false },
        { id: 3, label: "980969 Perkes", isChecked: false },
        { id: 4, label: "4", isChecked: true },
        { id: 5, label: "5", isChecked: true },
        { id: 6, label: "6", isChecked: false },
        { id: 7, label: "7", isChecked: false },
        { id: 8, label: "8", isChecked: false },
        { id: 9, label: "9", isChecked: false },
        { id: 10, label: "10", isChecked: false },
        { id: 11, label: "11", isChecked: false },
        { id: 12, label: "12", isChecked: false }
      ];
    });
    
    it("should pass the values on change", () => {
      const onChange = value => {
        expect(value[0]).toBe(values);
      }
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            values={values}
            options={data}
            onChange={onChange}
            messages={inputTextConfiguration}
          />
        </HvProvider>
      );
      const inputInstance = getDropdown(wrapper);
      inputInstance.onChange(values);
    });

    it("should apply the values if single selection", () => {
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            values={values}
            options={data}
            messages={inputTextConfiguration}
            dropdownExpanded
          />
        </HvProvider>
      );
      const dropdownInstance = getDropdown(wrapper);
      selections[4].isChecked = false;
      temporarySelection[4].isChecked = false;

      testState(selections,data, true,temporarySelection, dropdownInstance);
      dropdownInstance.onSimpleSelectionClick(data[0]);
      selections[0].isChecked = true;
      selections[3].isChecked = false;
      temporarySelection[0].isChecked = true;
      temporarySelection[3].isChecked = false;

      testState(selections, data, false, temporarySelection, dropdownInstance);
    });

    it("should apply the values if multiselection", () => {
      const onApply = value => {
        expect(value).toEqual([
          { id: 1, label: "980969 Bribie", isChecked: true },
          { id: 4, label: "4", isChecked: true },
          { id: 5, label: "5", isChecked: true },
        ]);
      }
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            options={data}
            messages={inputTextConfiguration}
            onApply={onApply}
            values={values}
            multiSelect
            dropdownExpanded
            showSearch
          />
        </HvProvider>
      );
      const dropdownInstance = getDropdown(wrapper);
      dropdownInstance.onMultipleSelection(data[0]);
      temporarySelection[0].isChecked = true;
      testState(selections, data, true, temporarySelection, dropdownInstance);
      dropdownInstance.onApplySelection();
      selections[0].isChecked = true;
      testState(selections, data, false, temporarySelection, dropdownInstance);
    });

    it("should cancel the values if multiselection", () => {
      const onCancel = value => {
        expect(value).toEqual([
          { id: 4, label: "4", isChecked: true },
          { id: 5, label: "5", isChecked: true },
        ]);
      }
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            options={data}
            messages={inputTextConfiguration}
            onCancel={onCancel}
            values={values}
            multiSelect
            dropdownExpanded
            showSearch
          />
        </HvProvider>
      );
      const dropdownInstance = getDropdown(wrapper);
      dropdownInstance.onMultipleSelection(data[0]);
      temporarySelection[0].isChecked = true;
      testState(selections, data, true, temporarySelection, dropdownInstance);
      temporarySelection[0].isChecked = false;
      dropdownInstance.onCancelSelection();
      testState(selections, data, false, temporarySelection, dropdownInstance);
    });

    it("should select all the values if multiselection", () => {
      const allSelected = [
        { id: 1, label: "980969 Bribie", isChecked: true },
        { id: 2, label: "980969 Gatton", isChecked: true },
        { id: 3, label: "980969 Perkes", isChecked: true },
        { id: 4, label: "4", isChecked: true },
        { id: 5, label: "5", isChecked: true },
        { id: 6, label: "6", isChecked: true },
        { id: 7, label: "7", isChecked: true },
        { id: 8, label: "8", isChecked: true },
        { id: 9, label: "9", isChecked: true },
        { id: 10, label: "10", isChecked: true },
        { id: 11, label: "11", isChecked: true },
        { id: 12, label: "12", isChecked: true }
      ]
      const onSelectAll = value => {
        expect(value).toEqual(undefined);
      }
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            options={data}
            messages={inputTextConfiguration}
            onSelectAll={onSelectAll}
            values={values}
            multiSelect
            dropdownExpanded
          />
        </HvProvider>
      );
      const dropdownInstance = getDropdown(wrapper);
      dropdownInstance.onMultipleSelection(data[0]);
      temporarySelection[0].isChecked = true;
      testState(selections, data, true, temporarySelection, dropdownInstance);
      temporarySelection[0].isChecked = false;
      dropdownInstance.onSelectAll();
      testState(selections, data, true, allSelected, dropdownInstance);
    });

    it("should deselect all the values if multiselection", () => {
      const allSelected = [
        { id: 1, label: "980969 Bribie", isChecked: true },
        { id: 2, label: "980969 Gatton", isChecked: true },
        { id: 3, label: "980969 Perkes", isChecked: true },
        { id: 4, label: "4", isChecked: true },
        { id: 5, label: "5", isChecked: true },
        { id: 6, label: "6", isChecked: true },
        { id: 7, label: "7", isChecked: true },
        { id: 8, label: "8", isChecked: true },
        { id: 9, label: "9", isChecked: true },
        { id: 10, label: "10", isChecked: true },
        { id: 11, label: "11", isChecked: true },
        { id: 12, label: "12", isChecked: true }
      ]
      const onSelectAll = value => {
        expect(value).toEqual(undefined);
      }
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            options={data}
            messages={inputTextConfiguration}
            onSelectAll={onSelectAll}
            values={values}
            multiSelect
            dropdownExpanded
          />
        </HvProvider>
      );
      const dropdownInstance = getDropdown(wrapper);
      dropdownInstance.onMultipleSelection(data[0]);
      temporarySelection[0].isChecked = true;
      testState(selections, data, true, temporarySelection, dropdownInstance);
      temporarySelection[0].isChecked = false;
      dropdownInstance.onSelectAll();
      testState(selections, data, true, allSelected, dropdownInstance);
      temporarySelection[3].isChecked = false;
      temporarySelection[4].isChecked = false;
      dropdownInstance.onSelectAll();
      testState(selections, data, true, temporarySelection, dropdownInstance);
    });

    it("should expand when toggle", () => {
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            options={data}
            messages={inputTextConfiguration}
            values={values}
            multiSelect
          />
        </HvProvider>
      );
      const event = {
        key: 13
      }
      const dropdownInstance = getDropdown(wrapper);
      testState(selections, data, false, temporarySelection, dropdownInstance);
      dropdownInstance.toggleDropdown(event);
      testState(selections, data, true, temporarySelection, dropdownInstance);
    });

    it("it should not expand when disabled", () => {
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            options={data}
            messages={inputTextConfiguration}
            values={values}
            multiSelect
            disabled
            dropdownExpanded
          />
        </HvProvider>
      );
      const event = {
        key: 13
      }
      const dropdownInstance = getDropdown(wrapper);
      testState(selections, data, false, temporarySelection, dropdownInstance);
      dropdownInstance.toggleDropdown(event);
      testState(selections, data, false, temporarySelection, dropdownInstance);
    });

    it("it should not expand when disabled", () => {
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            options={data}
            messages={inputTextConfiguration}
            values={values}
            multiSelect
            disabled
            dropdownExpanded
          />
        </HvProvider>
      );
      const subprops = {
        item: values[0],
        onKeyDown: () => {}
      }
      const dropdownInstance = getDropdown(wrapper);
      const item = dropdownInstance.generateItemRenderer(subprops);
      expect(item).toBeDefined();
    });

  })

});

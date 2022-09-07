/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Play, Stop } from "@hitachivantara/uikit-react-icons";
import HvProvider from "../../../Provider";

import { TreeView, TreeViewItem } from "..";

describe("<TreeView />", () => {
  const onChangeMock = jest.fn();
  const consoleSpy = jest.fn();
  // eslint-disable-next-line no-console
  const originalError = console.error;

  let wrapper;

  beforeEach(async () => {
    // eslint-disable-next-line no-console
    console.error = consoleSpy;
  });

  afterEach(async () => {
    // eslint-disable-next-line no-console
    console.error = originalError;
  });

  describe("navigation tree", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider cssBaseline={false}>
          <TreeView selected="4" onChange={onChangeMock} mode="navigation">
            <TreeViewItem icon={<Play />} nodeId="1" label="System">
              <TreeViewItem nodeId="2" label="SCPodF">
                <TreeViewItem nodeId="3" label="Compute" disabled />
                <TreeViewItem nodeId="4" label="Storage" />
                <TreeViewItem nodeId="5" label="Ethernet" selectable={false} />
                <TreeViewItem
                  nodeId="6"
                  label="Fiber Channel"
                  payload={{ path: "/hello/world", params: { a: 2, b: "3" } }}
                />
              </TreeViewItem>
            </TreeViewItem>

            <TreeViewItem icon={<Stop />} nodeId="7" label="Administration">
              <TreeViewItem nodeId="8" label="Rest API" />
              <TreeViewItem nodeId="9" label="License" />
              <TreeViewItem nodeId="10" label="Log Bundle" />
            </TreeViewItem>
          </TreeView>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper.find(TreeView)).toMatchSnapshot();
    });

    it("should unmount without crashing", () => {
      wrapper.unmount();
    });
  });

  describe("treeview", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider cssBaseline={false}>
          <TreeView selected="4" onChange={onChangeMock}>
            <TreeViewItem icon={<Play />} nodeId="1" label="System">
              <TreeViewItem nodeId="2" label="SCPodF">
                <TreeViewItem nodeId="3" label="Compute" disabled />
                <TreeViewItem nodeId="4" label="Storage" />
                <TreeViewItem nodeId="5" label="Ethernet" selectable={false} />
                <TreeViewItem
                  nodeId="6"
                  label="Fiber Channel"
                  payload={{ path: "/hello/world", params: { a: 2, b: "3" } }}
                />
              </TreeViewItem>
            </TreeViewItem>

            <TreeViewItem icon={<Stop />} nodeId="7" label="Administration">
              <TreeViewItem nodeId="8" label="Rest API" />
              <TreeViewItem nodeId="9" label="License" />
              <TreeViewItem nodeId="10" label="Log Bundle" />
            </TreeViewItem>
          </TreeView>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper.find(TreeView)).toMatchSnapshot();
    });
  });
});

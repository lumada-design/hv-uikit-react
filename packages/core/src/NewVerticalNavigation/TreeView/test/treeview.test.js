/*
 * Copyright 2020 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import Play from "@hv/uikit-react-icons/dist/Generic/Play";
import Stop from "@hv/uikit-react-icons/dist/Generic/Stop";
import HvProvider from "../../../Provider";

import TreeView, { TreeViewItem } from "../index";

describe("<TreeView />", () => {
  const onChangeMock = jest.fn();

  let wrapper;

  describe("navigation tree", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
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
      expect(wrapper).toMatchSnapshot();
    });

    it("should unmount without crashing", () => {
      wrapper.unmount();
    });
  });

  describe("treeview", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
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
      expect(wrapper).toMatchSnapshot();
    });
  });
});

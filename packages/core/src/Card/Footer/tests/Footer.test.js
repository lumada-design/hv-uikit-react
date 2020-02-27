/*
 * Copyright 2019 Hitachi Vantara Corporation
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

import HvProvider from "../../../Provider";
import Footer from "../Footer";
import Actions from "../../../Actions";

const myActions = [
  {
    id: "view",
    label: "View"
  },
  {
    id: "delete",
    label: "Delete"
  },
  {
    id: "update",
    label: "Update",
    disabled: true
  }
];

describe("Footer", () => {
  let wrapper;

  it("should render the actions and the dropdown accordingly", () => {
    wrapper = mount(
      <HvProvider>
        <Footer
          classes={{}}
          maxVisibleActions={1}
          actions={myActions}
          isSelectable={false}
          onChange={() => {}}
        />
      </HvProvider>
    );

    expect(
      wrapper
        .find(Actions)
    ).toMatchSnapshot();

    wrapper = mount(
      <HvProvider>
        <Footer
          classes={{}}
          maxVisibleActions={0}
          actions={myActions}
          isSelectable={false}
          onChange={() => {}}
        />
      </HvProvider>
    );

    expect(
      wrapper
        .find(Actions)
    ).toMatchSnapshot();

    wrapper = mount(
      <HvProvider>
        <Footer
          classes={{}}
          maxVisibleActions={2}
          actions={myActions}
          isSelectable={false}
          onChange={() => {}}
        />
      </HvProvider>
    );

    expect(
      wrapper
        .find(Actions)
    ).toMatchSnapshot();
  });
});

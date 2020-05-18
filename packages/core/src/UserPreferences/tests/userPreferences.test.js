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
import { shallow, mount } from "enzyme";
import { LogOut, People, User } from "@hv/uikit-react-icons/dist/Generic";
import HvProvider from "../../Provider";
import UserPreferences, {
  Action,
  Actions,
  Group,
  Label,
  Option,
  Options
} from "..";

const setupComponent = (props = { isOpen: true }) => (
  <HvProvider>
    <UserPreferences id="test" {...props}>
      <Actions>
        <Action label="Logout" icon={<LogOut />} />
      </Actions>
      <Options>
        <Group label="Group label">
          <Option label="Personal Information" icon={<User />} />
          <Option label="Manage Groups" icon={<People />} />
        </Group>
        <Group>
          <Label>Label</Label>
          <Option label="Manage Groups2" />
        </Group>
      </Options>
    </UserPreferences>
  </HvProvider>
);
describe("UserPreferences withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(setupComponent());
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    wrapper = mount(setupComponent());
    expect(wrapper.find(UserPreferences).length).toBe(1);
    expect(wrapper.find(Actions).length).toBe(1);
    expect(wrapper.find(Action).length).toBe(1);
    expect(wrapper.find(Options).length).toBe(1);
    expect(wrapper.find(Group).length).toBe(2);
    expect(wrapper.find(Option).length).toBe(3);
  });

  it("should close on escape", () => {
    wrapper = mount(setupComponent({ isOpen: true, closeOnExit: true }));

    let component = wrapper.find(".HvUserPreferences-contentContainer");

    expect(component.length).toBe(1);

    component.simulate("keydown", { key: "Esc", keyCode: 27 });

    component = wrapper.find("#test-container");

    expect(component.length).toBe(0);
  });
});

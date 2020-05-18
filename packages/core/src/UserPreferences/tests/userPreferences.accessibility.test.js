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
import { toHaveNoViolations } from "jest-axe";
import { LogOut, People, User } from "@hv/uikit-react-icons/dist/Generic";
import axe from "../../../config/axe-config";
import HvProvider from "../../Provider";
import UserPreferences, {
  Action,
  Actions,
  Group,
  Label,
  Option,
  Options
} from "..";

expect.extend(toHaveNoViolations);

const setupComponent = (
  <HvProvider>
    <UserPreferences id="test" isOpen>
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

describe("UserPreferencesA11Y", () => {
  let wrapper;

  it("default state", async () => {
    wrapper = mount(setupComponent);
    const results = await axe(wrapper.getDOMNode());

    expect(results).toHaveNoViolations();
  });
});

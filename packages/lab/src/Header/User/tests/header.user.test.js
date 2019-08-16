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
import { mount, shallow } from "enzyme";

import Help16 from "@hv/uikit-react-icons/dist/Help.S";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import UserWithStyles from "../index";
import User from "../User";

describe("User withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <UserWithStyles />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render User component", () => {
    wrapper = mount(
      <HvProvider>
        <UserWithStyles labels={{}} userData={{ name: "UserName", role: "UserRole" }} />
      </HvProvider>
    );
    const userComponent = wrapper.find(User);
    expect(userComponent.length).toBe(1);
  });

  it("should render User component with Props", () => {
    wrapper = shallow(
      <HvProvider>
        <UserWithStyles labels={{}} userData={{ name: "UserName", role: "UserRole" }} />
      </HvProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should render text properly", () => {
    const typographies = mount(
      <HvProvider>
        <UserWithStyles labels={{}} userData={{ name: "UserName", role: "UserRole" }} />
      </HvProvider>
    ).find("Typography");

    expect(typographies.length).toBe(2);
  });

  it("should render name text properly", () => {
    const typographies = mount(
      <HvProvider>
        <UserWithStyles labels={{}} userData={{ name: "UserName" }} />
      </HvProvider>
    ).find("Typography");

    expect(typographies.length).toBe(1);
  });

  it("should render role text properly", () => {
    const typographies = mount(
      <HvProvider>
        <UserWithStyles labels={{}} userData={{ role: "UserRole" }} />
      </HvProvider>
    ).find("Typography");

    expect(typographies.length).toBe(1);
  });

  it("should render logo", () => {
    const img = mount(
      <HvProvider>
        <UserWithStyles userIcon={<Help16 />} />
      </HvProvider>
    ).find(Help16);
    expect(img.length).toBe(1);
  });
});

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

// import { mount } from "enzyme";
import React from "react";
import { mount } from "enzyme";
import Download from "@hv/uikit-react-icons/dist/Generic/Download";
import HvProvider from "../../Provider";
import materialButtonConfiguration from "../materialButtonConfiguration";
import HvButton from "..";

describe("Button", () => {
  let wrapper;

  const getMaterialButtonProps = ParentElement =>
    ParentElement.children()
      .children()
      .props();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvButton>Click!</HvButton>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Button component", () => {
    const buttonComponent = wrapper.find(HvButton);
    expect(buttonComponent.length).toBe(1);
  });

  it("should correctly map the primary type to the material ui configurations", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvButton category="primary">Click!</HvButton>
      </HvProvider>
    ).find(HvButton);

    expect(getMaterialButtonProps(mountWrapper).color).toEqual(
      materialButtonConfiguration.color.primary
    );
    expect(getMaterialButtonProps(mountWrapper).variant).toEqual(
      materialButtonConfiguration.variant.contained
    );
  });

  it("should correctly map the secondary type to the material ui configurations", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvButton category="secondary">Click!</HvButton>
      </HvProvider>
    ).find(HvButton);
    expect(getMaterialButtonProps(mountWrapper).color).toEqual(
      materialButtonConfiguration.color.primary
    );
    expect(getMaterialButtonProps(mountWrapper).variant).toEqual(
      materialButtonConfiguration.variant.outlined
    );
  });

  it("should correctly map the link type to the material ui configurations", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvButton category="ghost">Click!</HvButton>
      </HvProvider>
    ).find(HvButton);
    expect(getMaterialButtonProps(mountWrapper).color).toEqual(
      materialButtonConfiguration.color.primary
    );
    expect(getMaterialButtonProps(mountWrapper).variant).toEqual(
      materialButtonConfiguration.variant.text
    );
  });

  it("should correctly map the secondary category to the material ui configurations", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvButton category="secondary">Click!</HvButton>
      </HvProvider>
    ).find(HvButton);
    expect(getMaterialButtonProps(mountWrapper).color).toEqual(
      materialButtonConfiguration.color.primary
    );
    expect(getMaterialButtonProps(mountWrapper).variant).toEqual(
      materialButtonConfiguration.variant.outlined
    );
  });

  it("should correctly map the secondary type to the material ui configurations", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvButton category="ghost">Click!</HvButton>
      </HvProvider>
    ).find(HvButton);
    expect(getMaterialButtonProps(mountWrapper).color).toEqual(
      materialButtonConfiguration.color.primary
    );
    expect(getMaterialButtonProps(mountWrapper).variant).toEqual(
      materialButtonConfiguration.variant.text
    );
  });

  it("should correctly map the secondary type to the material ui configurations", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvButton category="ghostSecondary">Click!</HvButton>
      </HvProvider>
    ).find(HvButton);
    expect(getMaterialButtonProps(mountWrapper).color).toEqual(
      materialButtonConfiguration.color.primary
    );
    expect(getMaterialButtonProps(mountWrapper).variant).toEqual(
      materialButtonConfiguration.variant.text
    );
  });
});

describe("Button with Icon", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvButton category="primary" startIcon={<Download />}>
          Click!
        </HvButton>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Button component", () => {
    expect(wrapper.find(HvButton).length).toBe(1);
  });

  it("should render the icon component", () => {
    expect(wrapper.find(Download).length).toBe(1);
  });
});

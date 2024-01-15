/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Download } from "@hitachivantara/uikit-react-icons";
import { HvButton, HvProvider } from "../..";
import materialButtonConfiguration from "../materialButtonConfiguration";

describe("Button", () => {
  let wrapper;

  const getMaterialButtonProps = (ParentElement) => ParentElement.children().children().props();

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
    expect(wrapper.find(HvButton)).toMatchSnapshot();
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

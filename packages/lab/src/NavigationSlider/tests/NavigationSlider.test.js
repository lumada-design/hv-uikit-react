import React from "react";
import { create, act } from "react-test-renderer";

import { HvProvider, HvTypography } from "@hitachivantara/uikit-react-core";

import Header from "../Header";
import Navigation from "../Navigation";

import NavigationSlider from "..";

let renderer;

describe("<NavigationSlider />", () => {
  beforeAll(() => {
    renderer = create(
      <HvProvider>
        <NavigationSlider onNavigationChange={jest.fn} data={[]} title="DummyTitle" />
      </HvProvider>
    );
  });

  it("should have 2 sections", async () => {
    const header = await renderer.root.findByType(Header);
    const navigation = await renderer.root.findByType(Navigation);

    expect(header).toBeDefined();
    expect(navigation).toBeDefined();
  });
});

describe("<NavigationSlider /> navigation", () => {
  beforeAll(() => {
    const root = {
      id: "1",
      label: "Menu1",
      parent: undefined,
      icon: undefined,
      path: "/path1",
      data: [],
    };

    const child = {
      id: "2",
      label: "Menu2",
      parent: {
        id: "1",
        label: "Menu1",
        path: "/path1",
      },
      icon: undefined,
      path: "/path2",
    };
    child.parent = root;
    root.data = [child];

    const navigationData = [root];

    renderer = create(
      <HvProvider>
        <NavigationSlider
          onNavigationChange={jest.fn}
          data={navigationData}
          title="DummyTitle"
          selected="2"
        />
      </HvProvider>
    );
  });

  it("should display the title with the parent element label", async () => {
    const header = await renderer.root.findByType(Header);
    const typography = await header.findByType(HvTypography);
    const title = await typography.findByType("p");

    expect(title.children[0]).toBe("Menu1");
  });

  it("should display the title with the main title label when in the root level", async () => {
    const header = await renderer.root.findByType(Header);

    act(() => {
      header.props.onBackButtonClick();
    });

    const typography = await header.findByType(HvTypography);
    const title = await typography.findByType("p");

    expect(title.children[0]).toBe("DummyTitle");
  });
});

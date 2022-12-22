import React from "react";

import { create } from "react-test-renderer";

import { HvProvider, HvListContainer, HvListItem } from "@hitachivantara/uikit-react-core";

import Navigation from "..";

describe("<Navigation />", () => {
  let renderer;
  let instance;

  beforeAll(() => {
    const navigationData = [
      {
        id: "1",
        label: "Menu1",
        parent: undefined,
        icon: undefined,
        path: "/path1",
        data: [],
      },
    ];

    renderer = create(
      <HvProvider>
        <Navigation
          data={navigationData}
          selected="1"
          onNavigateToTarget={jest.fn}
          onNavigateToChild={jest.fn}
        />
      </HvProvider>
    );

    instance = renderer.root;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should match the snapshot", () => {
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it("should be defined", () => {
    expect(renderer).toBeDefined();
  });

  it("should have a `HvListContainer` component present", async () => {
    const listContainers = await instance.findAllByType(HvListContainer);

    expect(listContainers.length).toBe(1);
  });

  it("should have a `HvListItem` component present", async () => {
    const listItems = await instance.findAllByType(HvListItem);

    expect(listItems.length).toBe(1);
  });
});

describe("<Navigation /> with different number of navigation items", () => {
  let renderer;
  let instance;
  beforeAll(() => {
    const navigationData = Array.from({ length: 10 }, (_, index) => {
      return {
        id: `${index + 1}`,
        label: `Menu${index}`,
        parent: undefined,
        icon: undefined,
        path: `/path${index}`,
        data: [],
      };
    });

    renderer = create(
      <HvProvider>
        <Navigation
          data={navigationData}
          selected="1"
          onNavigateToTarget={jest.fn}
          onNavigateToChild={jest.fn}
        />
      </HvProvider>
    );

    instance = renderer.root;
  });

  it("should have 10 HvListItem when there is 10 item in the Navigation data array", async () => {
    const listItems = await instance.findAllByType(HvListItem);

    expect(listItems.length).toBe(10);
  });
});

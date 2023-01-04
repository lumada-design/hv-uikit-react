import { create } from "react-test-renderer";

import {
  HvVerticalNavigation,
  HvVerticalNavigationTree,
  HvButton,
  HvProvider,
} from "@hitachivantara/uikit-react-core";

import VerticalNavigation from "..";

describe("<VerticalNavigation /> with empty values", () => {
  let renderer;

  beforeAll(() => {
    renderer = create(
      <HvProvider>
        <VerticalNavigation data={[]} />
      </HvProvider>
    );
  });

  it("should match the snapshot", () => {
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it("should be defined", () => {
    expect(renderer).toBeDefined();
  });
});

describe("<VerticalNavigation /> with navigation data", () => {
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
        data: [
          {
            id: "2",
            label: "Menu2",
            parent: undefined,
            icon: undefined,
            path: "/path2",
          },
        ],
      },
    ];

    renderer = create(
      <HvProvider>
        <VerticalNavigation data={navigationData} />
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

  it("should have a `HvVerticalNavigation` component present", async () => {
    const verticalNavigation = await instance.findAllByType(HvVerticalNavigation);
    expect(verticalNavigation.length).toBe(1);
  });

  it("should have a `HvVerticalNavigationTree` component present", async () => {
    const verticalNavigationTree = await instance.findAllByType(HvVerticalNavigationTree);
    expect(verticalNavigationTree.length).toBe(1);
  });

  it("should have a `HvButton` component present with the `Collapse` text", async () => {
    const buttonElements = await instance.findAllByType(HvButton);

    expect(buttonElements.length).toBe(1);

    const textSpan = await buttonElements[0].findAllByType("span");

    expect(textSpan[1].props.children).toBe("Collapse");
  });
});

describe("<VerticalNavigation /> with custom collapse label", () => {
  let renderer;
  let instance;
  const collapseLabel = "Close";

  beforeAll(() => {
    const navigationData = [
      {
        id: "1",
        label: "Menu1",
        parent: undefined,
        icon: undefined,
        path: "/path1",
        data: [
          {
            id: "2",
            label: "Menu2",
            parent: undefined,
            icon: undefined,
            path: "/path2",
          },
        ],
      },
    ];

    renderer = create(
      <HvProvider>
        <VerticalNavigation data={navigationData} collapseLabel={collapseLabel} />
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

  it("should have a `HvVerticalNavigation` component present", async () => {
    const verticalNavigation = await instance.findAllByType(HvVerticalNavigation);
    expect(verticalNavigation.length).toBe(1);
  });

  it("should have a `HvVerticalNavigationTree` component present", async () => {
    const verticalNavigationTree = await instance.findAllByType(HvVerticalNavigationTree);
    expect(verticalNavigationTree.length).toBe(1);
  });

  it("should have a `HvButton` component present with the `Collapse` text", async () => {
    const buttonElements = await instance.findAllByType(HvButton);

    expect(buttonElements.length).toBe(1);

    const textSpan = await buttonElements[0].findAllByType("span");

    expect(textSpan[1].props.children).toBe(collapseLabel);
  });
});

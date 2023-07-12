import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import {
  HvVerticalNavigationTreeView,
  HvVerticalNavigationTreeViewItem,
} from "@core/components";
import { Play, Stop } from "@hitachivantara/uikit-react-icons";

const Sample = () => (
  <HvVerticalNavigationTreeView selected="4" mode="navigation">
    <HvVerticalNavigationTreeViewItem icon={<Play />} nodeId="1" label="System">
      <HvVerticalNavigationTreeViewItem nodeId="2" label="SCPodF">
        <HvVerticalNavigationTreeViewItem nodeId="3" label="Compute" disabled />
        <HvVerticalNavigationTreeViewItem nodeId="4" label="Storage" />
        <HvVerticalNavigationTreeViewItem
          nodeId="5"
          label="Ethernet"
          selectable={false}
        />
        <HvVerticalNavigationTreeViewItem
          nodeId="6"
          label="Fiber Channel"
          payload={{ path: "/hello/world", params: { a: 2, b: "3" } }}
        />
      </HvVerticalNavigationTreeViewItem>
    </HvVerticalNavigationTreeViewItem>

    <HvVerticalNavigationTreeViewItem
      icon={<Stop />}
      nodeId="7"
      label="Administration"
    >
      <HvVerticalNavigationTreeViewItem nodeId="8" label="Rest API" />
      <HvVerticalNavigationTreeViewItem nodeId="9" label="License" />
      <HvVerticalNavigationTreeViewItem nodeId="10" label="Log Bundle" />
    </HvVerticalNavigationTreeViewItem>
  </HvVerticalNavigationTreeView>
);

describe("VerticalNavigation - Actions", () => {
  it("should be defined", () => {
    const { container } = render(<Sample />);
    expect(container).toBeDefined();
  });
});

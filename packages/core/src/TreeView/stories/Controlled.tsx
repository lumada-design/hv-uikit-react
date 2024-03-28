import { useState } from "react";
import {
  HvButton,
  HvPanel,
  HvTreeItem,
  HvTreeView,
} from "@hitachivantara/uikit-react-core";

export const Controlled = () => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const allIds = "12345".split("");

  return (
    <div>
      <HvButton
        variant="secondaryGhost"
        disabled={expanded.length === 0}
        onClick={() => setExpanded([])}
      >
        Collapse All
      </HvButton>
      <HvButton
        variant="secondaryGhost"
        disabled={expanded.length >= allIds.length}
        onClick={() => setExpanded(allIds)}
      >
        Expand All
      </HvButton>
      <HvButton
        variant="secondaryGhost"
        disabled={selected.length === 0}
        onClick={() => setSelected([])}
      >
        Unselect All
      </HvButton>
      <HvButton
        variant="secondaryGhost"
        disabled={selected.length >= allIds.length}
        onClick={() => setSelected(allIds)}
      >
        Select All
      </HvButton>
      <HvPanel style={{ width: 400, marginTop: 8 }}>
        <HvTreeView
          multiSelect
          aria-label="file system navigator"
          expanded={expanded}
          selected={selected}
          onNodeSelect={(evt, nodeIds) => setSelected(nodeIds)}
          onNodeToggle={(evt, nodeIds) => setExpanded(nodeIds)}
        >
          <HvTreeItem nodeId="1" label="Applications">
            <HvTreeItem nodeId="2" label="Calendar.app" />
          </HvTreeItem>
          <HvTreeItem nodeId="3" label="Documents">
            <HvTreeItem nodeId="4" label="secret.txt" />
            <HvTreeItem nodeId="5" label="index.js" />
          </HvTreeItem>
        </HvTreeView>
      </HvPanel>
    </div>
  );
};

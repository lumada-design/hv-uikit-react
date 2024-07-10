import { HvTreeItem, HvTreeView } from "@hitachivantara/uikit-react-core";

export const TreeView = () => {
  return (
    <HvTreeView aria-label="file system navigator">
      <HvTreeItem nodeId="1" label="Applications">
        <HvTreeItem nodeId="10" label="Calendar.app" />
        <HvTreeItem nodeId="11" label="Code.app" />
        <HvTreeItem nodeId="12" label="Firefox.app" />
      </HvTreeItem>
      <HvTreeItem nodeId="2" label="Documents">
        <HvTreeItem nodeId="20" label="private">
          <HvTreeItem nodeId="200" disabled label="secret.txt" />
        </HvTreeItem>
        <HvTreeItem nodeId="21" label="index.js" />
      </HvTreeItem>
    </HvTreeView>
  );
};

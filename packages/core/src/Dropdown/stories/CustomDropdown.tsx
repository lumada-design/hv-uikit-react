import { forwardRef, useState } from "react";
import { css } from "@emotion/css";
import {
  HvIconButton,
  HvInput,
  HvSimpleGrid,
  HvTreeItem,
  HvTreeItemProps,
  HvTreeView,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Doc, Folders, Plant } from "@hitachivantara/uikit-react-icons";

import { HvBaseDropdown } from "../../BaseDropdown";
import { HvPanel } from "../../Panel";

type TreeData = { id: string; label: string; children?: TreeData[] };

const treeDataObject = {
  id: "user",
  label: "User",
  children: [
    {
      id: "Applications",
      label: "Applications",
      children: [
        { id: "Code", label: "Code.app" },
        { id: "Chrome", label: "Chrome.app" },
        { id: "Firefox", label: "Firefox.app" },
      ],
    },
    {
      id: "Documents",
      label: "Documents",
      children: [{ id: "secret", label: "secret.txt" }],
    },
    {
      id: "git",
      label: "git",
      children: [
        {
          id: "uikit-react",
          label: "uikit-react",
          children: [{ id: "uikit-pkg", label: "package.json" }],
        },
        {
          id: "app-shell",
          label: "app-shell",
          children: [{ id: "as-pkg", label: "package.json" }],
        },
      ],
    },
  ],
} satisfies TreeData;

const SimpleTreeItem = forwardRef<HTMLLIElement, HvTreeItemProps>(
  (props, ref) => {
    const { children, nodeId, label, ...others } = props;
    const Icon = children ? Folders : Doc;

    return (
      <HvTreeItem
        ref={ref}
        nodeId={nodeId}
        label={
          <div className={css({ display: "flex", alignItems: "center" })}>
            <Icon />
            <span style={{ flex: 1 }}>{label}</span>
          </div>
        }
        {...others}
      >
        {children}
      </HvTreeItem>
    );
  },
);

/** Render tree view items */
const renderItem = ({ id, label, children }: TreeData) => (
  <SimpleTreeItem key={id} nodeId={id} label={label}>
    {children?.map(renderItem)}
  </SimpleTreeItem>
);

export const CustomDropdown = () => {
  const [results, setResults] = useState<TreeData | undefined>(treeDataObject);

  const search = (data: TreeData, searchTerm: string): TreeData | undefined => {
    let newChildren: TreeData[] = [];
    if (data.label.includes(searchTerm)) {
      return data;
    }
    if (data.children) {
      data.children.forEach((item) => {
        const result = search(item, searchTerm);
        if (result !== undefined) newChildren = [...newChildren, result];
      });
      return newChildren.length > 0
        ? { ...data, children: [...newChildren] }
        : undefined;
    }
    return undefined;
  };

  return (
    <HvSimpleGrid cols={2} style={{ width: 500 }}>
      <HvBaseDropdown
        adornment={<Plant />}
        placeholder="Check out this Tree view"
        variableWidth
        aria-label="custom dropdown sample"
      >
        <HvPanel style={{ width: 300 }}>
          <HvInput
            aria-label="Search Folder"
            placeholder="Search"
            type="search"
            classes={{ root: css({ paddingBottom: theme.space.xs }) }}
            onChange={(_, value) => setResults(search(treeDataObject, value))}
          />
          <HvTreeView aria-label="file system navigator">
            {results && renderItem(results)}
          </HvTreeView>
        </HvPanel>
      </HvBaseDropdown>
      <HvBaseDropdown
        component={
          <HvIconButton title="Check out this Tree view">
            <Plant />
          </HvIconButton>
        }
        variableWidth
      >
        <HvPanel style={{ width: 300 }}>
          <HvInput
            aria-label="Search Folder"
            placeholder="Search"
            type="search"
            classes={{ root: css({ paddingBottom: theme.space.xs }) }}
          />
          <HvTreeView aria-label="file system navigator">
            {results && renderItem(results)}
          </HvTreeView>
        </HvPanel>
      </HvBaseDropdown>
    </HvSimpleGrid>
  );
};

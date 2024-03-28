import { forwardRef, useState } from "react";
import { css } from "@emotion/css";
import {
  HvLoading,
  HvPanel,
  HvTreeItem,
  HvTreeItemProps,
  HvTreeView,
  useHvTreeItem,
} from "@hitachivantara/uikit-react-core";
import { Doc, Folders } from "@hitachivantara/uikit-react-icons";

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

type MyTreeData = { id: string; label: string; children?: MyTreeData[] };

interface CustomTreeItemProps extends HvTreeItemProps {
  /** Triggered when the tree item is expanded */
  onOpen?: HvTreeItemProps["onClick"];
}

const LoadingItem = forwardRef<HTMLLIElement, CustomTreeItemProps>(
  (props, ref) => {
    const { children, nodeId, label, onOpen, onClick, ...others } = props;
    const { expanded, disabled } = useHvTreeItem(nodeId);
    const Icon = children ? Folders : Doc;

    const [isLoading, setIsLoading] = useState(false);

    const handleLoadData = async () => {
      setIsLoading(true);
      await delay(2000);
      setIsLoading(false);
    };

    return (
      <HvTreeItem
        ref={ref}
        nodeId={nodeId}
        style={{ pointerEvents: disabled ? "none" : undefined }}
        onClick={(evt) => {
          if (children && !expanded) {
            handleLoadData();
          }
          onClick?.(evt);
        }}
        label={
          <div className={css({ display: "flex", alignItems: "center" })}>
            <Icon />
            <span style={{ flex: 1 }}>{label}</span>
          </div>
        }
        {...others}
      >
        {isLoading ? <HvLoading small style={{ padding: 8 }} /> : children}
      </HvTreeItem>
    );
  },
);

const dataObject = {
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
} satisfies MyTreeData;

/** Render tree view items */
const renderItem = ({ id, label, children }: MyTreeData) => (
  <LoadingItem key={id} nodeId={id} label={label}>
    {children?.map(renderItem)}
  </LoadingItem>
);

export const AsyncLoading = () => {
  return (
    <HvPanel style={{ width: 400 }}>
      <HvTreeView aria-label="file system navigator">
        {renderItem(dataObject)}
      </HvTreeView>
    </HvPanel>
  );
};

import { forwardRef, useMemo, useState } from "react";

import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { SourceProps } from "@storybook/blocks";
import { css } from "@emotion/css";

import { theme } from "@hitachivantara/uikit-styles";
import { Doc, DropDownXS, Folders } from "@hitachivantara/uikit-react-icons";
import {
  HvButton,
  HvLoading,
  HvPanel,
  HvTypography,
  HvTreeView,
  HvTreeViewProps,
  HvTreeItem,
  HvTreeItemProps,
  useHvTreeItem,
  NavigationData,
} from "@hitachivantara/uikit-react-core";

const sourceTransform: SourceProps["transform"] = (code, storyContext) => {
  return storyContext.moduleExport.parameters.docs.source.originalSource;
};

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default {
  title: "Components/Tree View",
  subtitle: "Blah",
  // @ts-expect-error
  component: "HvTreeView",
  argTypes: {
    children: {
      description: "HvTreeView content. Typically `HvTreeItem` elements.",
      table: {
        type: { summary: "ReactNode", disable: true },
      },
    },
    classes: {
      description:
        "A Jss Object used to override or extend the styles applied.",
      table: {
        type: { summary: "HvTreeViewClasses" },
      },
      control: { disable: true },
    },
    multiSelect: {
      description: "Whether the tree view allows multiple selection.",
      defaultValue: { summary: false },
      table: {
        type: { summary: "boolean" },
      },
    },
    expanded: {
      description: "Expanded node ids, when expansion is controlled.",
    },
    defaultExpanded: {
      description: "Expanded node ids, when expansion is uncontrolled.",
    },
    selected: {
      description:
        "Selected node ids when controlled. Array of ids when multiSelect, else just the id string",
    },
    defaultSelected: {
      description:
        "Selected node ids when uncontrolled. Array of ids when multiSelect, else just the id string",
    },
    onNodeSelect: {
      description: "Callback fired when tree items are selected/unselected.",
    },
    onNodeToggle: {
      description: "Callback fired when tree items are expanded/collapsed.",
    },
    onNodeFocus: {
      description: "Callback fired when tree items are focused.",
    },
  },
  // @ts-expect-error
  subcomponents: { HvTreeItem },
} satisfies Meta<typeof HvTreeView>;

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
  }
);

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
  }
);

const NavItem = forwardRef<HTMLLIElement, CustomTreeItemProps>((props, ref) => {
  const { children, nodeId, label, onOpen, onClick, ...others } = props;
  const { disabled, expanded } = useHvTreeItem(nodeId);

  const level = nodeId.split("-").length - 1;

  return (
    <HvTreeItem
      ref={ref}
      nodeId={nodeId}
      style={{ pointerEvents: disabled ? "none" : undefined }}
      classes={{
        group: css({ marginLeft: 0 }),
        content: css({ paddingLeft: 16 * level }),
        selected: css({
          borderLeft: `4px solid ${theme.colors.secondary}`,
          backgroundColor: theme.colors.atmo3,
        }),
      }}
      icon="" // remove left nav icon
      label={
        <div className={css({ display: "flex", alignItems: "center" })}>
          <HvTypography
            variant={children ? "label" : "body"}
            style={{ flex: 1 }}
          >
            {label}
          </HvTypography>
          {children && (
            <DropDownXS
              style={{ transform: `rotate(${expanded ? 180 : 0}deg)` }}
            />
          )}
        </div>
      }
      {...others}
    >
      {children}
    </HvTreeItem>
  );
});

type MyTreeData = { id: string; label: string; children?: MyTreeData[] };

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

export const Main: StoryObj<HvTreeViewProps<false>> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      source: { transform: sourceTransform },
    },
  },
  render: () => {
    return (
      <HvPanel style={{ width: 300 }}>
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
      </HvPanel>
    );
  },
};

export const Controlled: StoryFn<HvTreeViewProps<true>> = () => {
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

Controlled.parameters = {
  docs: {
    source: { transform: sourceTransform },
    description: {
      story:
        "The tree view can be controlled by passing in `expanded`/`onNodeToggle` and `selected`/`onNodeSelect` props to control expansion and selection state respectively. <br /> When using `multiSelect`, the values and callbacks are of type `string[]`, and `string` otherwise.",
    },
  },
};

export const DataObject: StoryFn<HvTreeViewProps<false>> = () => {
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

  /** Render tree view items */
  const renderItem = ({ id, label, children }: TreeData) => (
    <SimpleTreeItem key={id} nodeId={id} label={label}>
      {children?.map(renderItem)}
    </SimpleTreeItem>
  );

  return (
    <HvPanel style={{ width: 400 }}>
      <HvTreeView aria-label="file system navigator">
        {renderItem(treeDataObject)}
      </HvTreeView>
    </HvPanel>
  );
};

DataObject.parameters = {
  docs: {
    source: { transform: sourceTransform },
    description: {
      story:
        "Sometimes the tree data is in an object shape. These can be easily converted to `HvTreeItem` nodes using a recursive `renderItem` function.",
    },
  },
};

export const AsyncLoading: StoryFn<HvTreeViewProps<true>> = () => {
  /** Render tree view items */
  const renderItem = ({ id, label, children }: MyTreeData) => (
    <LoadingItem key={id} nodeId={id} label={label}>
      {children?.map(renderItem)}
    </LoadingItem>
  );

  return (
    <HvPanel style={{ width: 400 }}>
      <HvTreeView aria-label="file system navigator">
        {renderItem(dataObject)}
      </HvTreeView>
    </HvPanel>
  );
};

AsyncLoading.parameters = {
  docs: {
    source: { transform: sourceTransform },
    description: {
      story:
        "Sometimes the full tree data is unknown or paginated. This sample showcases how a custom `LoadingItem` can be used to handle server-side tree data.",
    },
  },
};

export const VerticalNavigation: StoryFn<HvTreeViewProps<false>> = () => {
  const [selected, setSelected] = useState("-1");

  const navData = useMemo<NavigationData[]>(
    () => [
      { id: "00", label: "Overview" },
      { id: "01", label: "Analytics" },
      {
        id: "02",
        label: "Storage",
        data: [
          {
            id: "02-01",
            label: "Cloud",
            data: [
              { id: "02-01-01", label: "Servers" },
              { id: "02-01-02", label: "HCP Anywhere" },
              { id: "02-01-03", label: "This Computer", disabled: true },
            ],
          },
        ],
      },
      {
        id: "03",
        label: "Administration",
        data: [
          {
            id: "03-01",
            label: "Rest API",
            data: [{ id: "03-01-01", label: "Log Bundle" }],
          },
        ],
      },
    ],
    []
  );

  /** Render tree view items */
  const renderItem = ({ id, label, data }: NavigationData) => (
    <NavItem key={id} nodeId={id} label={label}>
      {data?.map(renderItem)}
    </NavItem>
  );

  return (
    <HvPanel style={{ width: 300 }}>
      <HvTreeView
        aria-label="site navigation"
        selected={selected}
        onNodeSelect={(evt, nodeId) => setSelected(nodeId)}
      >
        {navData.map(renderItem)}
      </HvTreeView>
    </HvPanel>
  );
};

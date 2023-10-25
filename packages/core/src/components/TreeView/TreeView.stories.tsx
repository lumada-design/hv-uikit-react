import { ElementType, HTMLAttributes, forwardRef, useState } from "react";

import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { SourceProps } from "@storybook/blocks";
import { css } from "@emotion/css";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useForkRef } from "@mui/material";

import { theme } from "@hitachivantara/uikit-styles";
import {
  Add,
  Doc,
  Drag,
  DropDownXS,
  DropRightXS,
  Folders,
  Remove,
} from "@hitachivantara/uikit-react-icons";
import {
  HvButton,
  HvDropDownMenu,
  HvLoading,
  HvPanel,
  HvRadio,
  HvOverflowTooltip,
  HvTypography,
  HvTreeView,
  HvTreeViewProps,
  HvTreeItem,
  HvTreeItemProps,
  HvColorAny,
  useHvTreeItem,
} from "@hitachivantara/uikit-react-core";

const sourceTransform: SourceProps["transform"] = (code, storyContext) => {
  return storyContext.moduleExport.parameters.docs.source.originalSource;
};

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const meta: Meta<HvTreeViewProps<false>> = {
  title: "Components/Tree View",
  component: HvTreeView,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvTreeItem },
};
export default meta;

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

const Separator = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    role="separator"
    className={css({
      width: 1,
      height: "100%",
      borderLeft: `1px solid ${theme.colors.atmo4}`,
      margin: theme.spacing(0, 1),
    })}
    {...props}
  />
);

/** Complex custom tree item */
const CustomTreeItem = forwardRef<HTMLLIElement, HvTreeItemProps>(
  (props, ref) => {
    const { children, nodeId, label, ...others } = props;
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: nodeId });
    const forkedRef = useForkRef(ref, setNodeRef);

    const border = `1px solid ${theme.colors.atmo4}`;
    const height = 8 * 7;

    return (
      <HvTreeItem
        ref={forkedRef}
        nodeId={nodeId}
        style={{ transition, transform: CSS.Transform.toString(transform) }}
        classes={{
          group: css({
            borderLeft: border,
            // marginLeft: theme.space.md,
          }),
          content: css({
            height,
            paddingRight: 0,
            marginBottom: theme.space.xs,
          }),
          label: css({
            height,
            backgroundColor: theme.colors.atmo1,
            display: "flex",
            alignItems: "center",
            border,
            borderRadius: theme.radii.round,
            "&&": {
              paddingLeft: 0,
            },
          }),
          iconContainer: css({
            marginLeft: -6,
            width: "32px !important",
            border,
            borderRadius: "50%",
            "&:empty": {
              border: "none",
            },
          }),
        }}
        label={
          <>
            <Drag {...attributes} {...listeners} />
            <Separator style={{ marginLeft: 0 }} />
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                flex: 1,
              })}
            >
              <HvTypography variant="label">{label}</HvTypography>
              <HvTypography variant="caption2">
                This is a description
              </HvTypography>
            </div>
            <HvTypography variant="caption2">Optional Info</HvTypography>
            <Separator style={{ marginRight: 0 }} />
            <div
              className={css({
                display: "flex",
                height: "100%",
                alignItems: "center",
                borderTopRightRadius: theme.radii.round,
                borderBottomRightRadius: theme.radii.round,
                backgroundColor: theme.colors.atmo2,
              })}
            >
              <HvButton icon>
                <Add iconSize="XS" role="none" />
              </HvButton>
              <HvButton icon>
                <Remove iconSize="XS" role="none" />
              </HvButton>
            </div>
          </>
        }
        {...others}
      >
        {children}
      </HvTreeItem>
    );
  }
);

const IconContainer = ({ icon: Icon }: { icon: ElementType }) => {
  return <Icon role="none" />;
};

interface CustomTreeItemProps extends HvTreeItemProps {
  /** Triggered when the tree item is expanded */
  onOpen?: HvTreeItemProps["onClick"];
}

const CustomItem = forwardRef<HTMLLIElement, CustomTreeItemProps>(
  (props, ref) => {
    const { children, nodeId, label, onOpen, onClick, ...others } = props;
    const { selected, expanded, disabled, handleSelection } =
      useHvTreeItem(nodeId);
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
            <HvRadio
              checked={selected}
              onClick={(evt) => {
                evt.stopPropagation();
                handleSelection(evt as any);
              }}
            />
            <Icon />
            <span style={{ flex: 1 }}>{label}</span>
            <HvDropDownMenu
              aria-label="Options"
              dataList={["Delete", "Copy"].map((id) => ({ id, label: id }))}
              onToggle={(evt) => {
                evt.stopPropagation();
              }}
              onClick={(evt, value) => {
                evt.stopPropagation();
                console.log(value);
              }}
            />
          </div>
        }
        {...others}
      >
        {isLoading ? <HvLoading small style={{ padding: 8 }} /> : children}
      </HvTreeItem>
    );
  }
);

type MyTreeData = { id: string; label: string; children?: MyTreeData[] };

interface MyCustomTreeData
  extends Omit<HvTreeItemProps, "id" | "nodeId" | "label" | "children"> {
  color?: HvColorAny;
  id: string;
  label: string;
  children?: MyCustomTreeData[];
}

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
        <HvTreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<DropDownXS />}
          defaultExpandIcon={<DropRightXS />}
        >
          <HvTreeItem nodeId="1" label="Applications">
            <HvTreeItem nodeId="10" label="Calendar.app" />
            <HvTreeItem nodeId="11" label="Code.app" />
            <HvTreeItem nodeId="12" label="Firefox.app" />
          </HvTreeItem>
          <HvTreeItem nodeId="2" label="Documents">
            <HvTreeItem nodeId="20" label="private">
              <HvTreeItem
                nodeId="200"
                label={<HvOverflowTooltip data="very_long_secret_value.txt" />}
              />
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
          defaultCollapseIcon={<DropDownXS />}
          defaultExpandIcon={<DropRightXS />}
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

export const DataObject: StoryFn<HvTreeViewProps<false>> = () => {
  const data = {
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
    <SimpleTreeItem key={id} nodeId={id} label={label}>
      {children?.map(renderItem)}
    </SimpleTreeItem>
  );

  return (
    <HvPanel style={{ width: 400 }}>
      <HvTreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<DropDownXS />}
        defaultExpandIcon={<DropRightXS />}
      >
        {renderItem(data)}
      </HvTreeView>
    </HvPanel>
  );
};

DataObject.parameters = {
  docs: {
    description: {
      story:
        "Sometimes the tree data is in an object shape. These can be easily converted to `HvTreeItem` nodes using a recursive `renderItem` function.",
    },
  },
};

DataObject.parameters = {
  docs: {
    source: { transform: sourceTransform },
  },
};

export const AsyncLoading: StoryFn<HvTreeViewProps<true>> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadData = async () => {
    setIsLoading(true);
    await delay(2000);
    setIsLoading(false);
  };

  return (
    <HvPanel style={{ width: 400 }}>
      <HvTreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<DropDownXS />}
        defaultExpandIcon={<DropRightXS />}
      >
        <CustomItem
          nodeId="1"
          label="Applications"
          disabled={isLoading}
          onOpen={handleLoadData}
        >
          <CustomItem nodeId="11" label="Calendar" />
        </CustomItem>
        <CustomItem nodeId="2" label="Documents" onOpen={handleLoadData}>
          <CustomItem nodeId="20" label="secrets">
            <CustomItem disabled nodeId="201" label="secret.txt" />
          </CustomItem>
          <CustomItem nodeId="21" label="code.js" />
          <CustomItem nodeId="22" label="index.js" />
        </CustomItem>
      </HvTreeView>
    </HvPanel>
  );
};

AsyncLoading.parameters = {
  docs: {
    source: { transform: sourceTransform },
  },
};

export const Custom: StoryFn<HvTreeViewProps<false>> = () => {
  /** Render tree view items */
  const renderItem = ({ id, label, children }: MyTreeData) => {
    const childIds = children?.map((child) => child.id) ?? [];

    return (
      <CustomTreeItem key={id} nodeId={id} label={label}>
        {Array.isArray(children) && (
          <SortableContext
            items={childIds}
            strategy={verticalListSortingStrategy}
          >
            {children.map(renderItem)}
          </SortableContext>
        )}
      </CustomTreeItem>
    );
  };

  const data = {
    id: "0",
    label: "Files",
    children: [
      {
        id: "1",
        label: "Applications",
        children: [
          { id: "10", label: "Calendar.app" },
          { id: "11", label: "Code.app" },
          { id: "12", label: "Firefox.app" },
        ],
      },
      {
        id: "2",
        label: "Documents",
        children: [{ id: "20", label: "secret.txt" }],
      },
      {
        id: "3",
        label: "git",
        children: [
          {
            id: "30",
            label: "uikit-react",
            children: [{ id: "300", label: "package.json" }],
          },
          {
            id: "31",
            label: "app-shell",
            children: [{ id: "310", label: "package.json" }],
          },
        ],
      },
    ],
  } satisfies MyCustomTreeData;

  return (
    <div style={{ width: 400 }}>
      <DndContext>
        <HvTreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<IconContainer icon={DropDownXS} />}
          defaultExpandIcon={<IconContainer icon={DropRightXS} />}
          defaultExpanded={["0", "2"]}
        >
          {renderItem(data)}
        </HvTreeView>
      </DndContext>
    </div>
  );
};

Custom.parameters = {
  docs: {
    source: { transform: sourceTransform },
    description: {
      story:
        "A sample with a custom `HvTreeItem` styles that includes sibling drag & drop  using [`dnd-kit`](https://docs.dndkit.com/presets/sortable).",
    },
  },
};

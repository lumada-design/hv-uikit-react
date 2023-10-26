import { ReactNode, Ref, forwardRef } from "react";
import { useSlotProps } from "@mui/base/utils";
import { DropDownXS, DropRightXS } from "@hitachivantara/uikit-react-icons";

import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import {
  HV_TREE_VIEW_PLUGINS,
  HvTreeViewPluginParameters,
  TreeViewProvider,
  useTreeView,
} from "./internals";
import { staticClasses, useClasses } from "./TreeView.styles";

export { staticClasses as treeView2Classes }; // TODO: remove old `treeViewClasses`

export type HvTreeViewClasses = ExtractNames<typeof useClasses>;

export interface HvTreeViewProps<Multiple extends boolean | undefined>
  extends HvBaseProps<HTMLUListElement>,
    HvTreeViewPluginParameters<Multiple> {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvTreeViewClasses;
  /** Tree View children. Usually a `HvTreeItem` instance, or a custom variation of it */
  children?: ReactNode;
}

type HvTreeViewComponent = <Multiple extends boolean | undefined = undefined>(
  props: HvTreeViewProps<Multiple>
) => React.JSX.Element;

/* eslint-disable prefer-arrow-callback */
/**
 * A Tree View displays hierarchical structures.
 * It also facilitates the exploration of categorical levels and their content.
 *
 * Tree structures are built through composing the `HvTreeItem` component,
 * or a custom variation of it.
 *
 * It is based on MUI's [TreeView](https://mui.com/x/react-tree-view) component.
 *
 * @example
 * ```tsx
 * <HvTreeView>
 *   <HvTreeItem nodeId="1" label="File1" />
 * </HvTreeView>
 * ```
 */
const HvTreeView = forwardRef(function HvTreeView<
  Multiple extends boolean | undefined
>(props: HvTreeViewProps<Multiple>, ref: Ref<HTMLUListElement>) {
  const {
    id,
    children,
    classes: classesProp,
    className,

    disabledItemsFocusable,
    multiSelect,
    expanded,
    defaultExpanded,
    selected,
    defaultSelected,
    disableSelection,
    defaultCollapseIcon = <DropDownXS role="none" />,
    defaultExpandIcon = <DropRightXS role="none" />,
    defaultEndIcon,
    defaultParentIcon,
    onNodeSelect,
    onNodeToggle,
    onNodeFocus,
    ...others
  } = useDefaultProps("HvTreeView", props);
  const { classes, cx } = useClasses(classesProp);

  const { getRootProps, contextValue } = useTreeView({
    disabledItemsFocusable,
    expanded,
    defaultExpanded,
    onNodeToggle,
    onNodeFocus,
    disableSelection,
    defaultSelected,
    selected,
    multiSelect,
    onNodeSelect: onNodeSelect as HvTreeViewProps<any>["onNodeSelect"],
    id,
    defaultCollapseIcon,
    defaultEndIcon,
    defaultExpandIcon,
    defaultParentIcon,
    plugins: HV_TREE_VIEW_PLUGINS,
    rootRef: ref,
  });

  const rootProps = useSlotProps({
    elementType: "ul",
    externalSlotProps: {},
    externalForwardedProps: others,
    className: classes.root,
    getSlotProps: getRootProps,
    ownerState: props,
  });

  return (
    <TreeViewProvider value={contextValue}>
      <ul className={cx(classes.root, className)} {...rootProps} {...others}>
        {children}
      </ul>
    </TreeViewProvider>
  );
}) as HvTreeViewComponent;

export { HvTreeView };

import { Ref, forwardRef } from "react";
import { useSlotProps } from "@mui/base/utils";
import { DropDownXS, DropRightXS } from "@hitachivantara/uikit-react-icons";

import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import {
  DEFAULT_TREE_VIEW_PLUGINS,
  DefaultTreeViewPluginParameters,
  TreeViewProvider,
  useTreeView,
} from "./internals";
import { staticClasses, useClasses } from "./TreeView.styles";

export { staticClasses as treeViewClasses };

const TREE_VIEW_PLUGINS = [...DEFAULT_TREE_VIEW_PLUGINS] as const;

export type HvTreeViewClasses = ExtractNames<typeof useClasses>;

export interface HvTreeViewProps<Multiple extends boolean | undefined>
  extends HvBaseProps<HTMLUListElement>,
    DefaultTreeViewPluginParameters<Multiple> {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvTreeViewClasses;
}

/* eslint-disable prefer-arrow-callback */

/** HvTreeView does some amazing stuff */
export const HvTreeView = forwardRef(function HvTreeView<
  Multiple extends boolean | undefined
>(props: HvTreeViewProps<Multiple>, ref: Ref<HTMLUListElement>) {
  const {
    disabledItemsFocusable,
    expanded,
    defaultExpanded,
    onNodeToggle,
    onNodeFocus,
    disableSelection,
    defaultSelected,
    selected,
    multiSelect,
    onNodeSelect,
    defaultCollapseIcon = <DropDownXS role="none" />,
    defaultExpandIcon = <DropRightXS role="none" />,
    defaultEndIcon,
    defaultParentIcon,

    id,
    children,
    classes: classesProp,
    className,
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
    plugins: TREE_VIEW_PLUGINS,
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
});

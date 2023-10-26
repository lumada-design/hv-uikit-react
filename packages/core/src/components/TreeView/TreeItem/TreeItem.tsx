import {
  FocusEvent,
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Collapse } from "@mui/material";
import type { TreeItemContentProps, TreeItemProps } from "@mui/x-tree-view";

import { ExtractNames } from "@core/utils/classes";
import { useForkRef } from "@core/hooks/useForkRef";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import {
  HvTreeViewPlugins,
  DescendantProvider,
  TreeItemDescendant,
  useDescendant,
  useTreeViewContext,
} from "../internals";
import { staticClasses, useClasses } from "./TreeItem.styles";
import { DefaultContent } from "./DefaultContent";

export { staticClasses as treeItemClasses };

export type HvTreeItemClasses = ExtractNames<typeof useClasses>;

export interface HvTreeContentProps extends TreeItemContentProps {}

export interface HvTreeItemProps extends TreeItemProps {
  classes?: HvTreeItemClasses;
  disabled?: boolean;
  icon?: ReactNode;
  ContentComponent?: React.JSXElementConstructor<HvTreeContentProps>;
}

export const HvTreeItem = forwardRef<HTMLLIElement, HvTreeItemProps>(
  (props, ref) => {
    const {
      id: idProp,
      nodeId,
      children,
      classes: classesProp,
      className,
      label,
      disabled: disabledProp,
      icon,
      endIcon,
      expandIcon,
      collapseIcon,
      ContentComponent: Component = DefaultContent,
      TransitionProps: transitionProps,
      ContentProps: contentProps,
      ...others
    } = useDefaultProps("HvTreeItem", props);
    const { classes, cx } = useClasses(classesProp);

    const {
      instance,
      multiSelect,
      disabledItemsFocusable,
      treeId,
      icons: contextIcons,
    } = useTreeViewContext<HvTreeViewPlugins>();

    const id =
      idProp || (treeId && nodeId && `${treeId}-${nodeId}`) || undefined;

    const [treeItemElement, setTreeItemElement] =
      useState<HTMLLIElement | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(setTreeItemElement, ref);

    const descendant = useMemo<TreeItemDescendant>(
      () => ({ element: treeItemElement!, id: nodeId }),
      [nodeId, treeItemElement]
    );

    const { index, parentId } = useDescendant(descendant);

    const expandable = !!(Array.isArray(children) ? children.length : children);
    const expanded = instance ? instance.isNodeExpanded(nodeId) : false;
    const focused = instance ? instance.isNodeFocused(nodeId) : false;
    const selected = instance ? instance.isNodeSelected(nodeId) : false;
    const disabled = instance ? instance.isNodeDisabled(nodeId) : false;

    const expansionIcon = !expanded
      ? expandIcon || contextIcons.defaultExpandIcon
      : collapseIcon || contextIcons.defaultCollapseIcon;

    const displayIcon = expandable
      ? contextIcons.defaultParentIcon
      : endIcon || contextIcons.defaultEndIcon;

    useEffect(() => {
      // On the first render a node's index will be -1. We want to wait for the real index.
      if (instance && index !== -1) {
        instance.updateNode({
          id: nodeId,
          idAttribute: id,
          index,
          parentId,
          expandable,
          disabled: disabledProp,
        });

        return () => instance.removeNode(nodeId);
      }

      return undefined;
    }, [instance, parentId, index, nodeId, expandable, disabledProp, id]);

    useEffect(() => {
      if (instance && label) {
        return instance.mapFirstChar(
          nodeId,
          (contentRef.current?.textContent ?? "").substring(0, 1).toLowerCase()
        );
      }
      return undefined;
    }, [instance, nodeId, label]);

    const handleFocus = (event: FocusEvent<HTMLLIElement, any>) => {
      // DOM focus stays on the tree which manages focus with aria-activedescendant
      if (event.target === event.currentTarget) {
        const rootElement: any =
          typeof event.target.getRootNode === "function"
            ? event.target.getRootNode()
            : event.target.ownerDocument || document;

        rootElement.getElementById(treeId).focus({ preventScroll: true });
      }

      const unfocusable = !disabledItemsFocusable && disabled;
      const canFocus =
        instance &&
        !focused &&
        !disabled &&
        !unfocusable &&
        event.currentTarget === event.target;

      if (canFocus) {
        instance.focusNode(event, nodeId);
      }
    };

    return (
      <li
        id={id}
        ref={handleRef}
        role="treeitem"
        aria-expanded={expandable ? expanded : undefined}
        aria-selected={(multiSelect && selected) || selected || undefined}
        aria-disabled={disabled || undefined}
        className={cx(classes.root, className)}
        // @ts-ignore
        onFocus={handleFocus}
        tabIndex={-1}
        {...others}
      >
        <Component
          ref={contentRef}
          nodeId={nodeId}
          classes={{
            root: classes.content,
            expanded: classes.expanded,
            selected: classes.selected,
            focused: classes.focused,
            disabled: classes.disabled,
            label: classes.label,
            iconContainer: classes.iconContainer,
          }}
          label={label}
          icon={icon}
          expansionIcon={expandable && expansionIcon}
          displayIcon={displayIcon}
          {...contentProps}
        />
        {children && (
          <DescendantProvider id={nodeId}>
            <Collapse
              component="ul"
              role="group"
              unmountOnExit
              className={classes.group}
              in={expanded}
              {...transitionProps}
            >
              {children}
            </Collapse>
          </DescendantProvider>
        )}
      </li>
    );
  }
);

import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { DropDownXS, DropUpXS } from "@hitachivantara/uikit-react-icons";
import { useForkRef } from "~/hooks";
import { setId } from "~/utils";
import treeViewItemClasses, {
  HvVerticalNavigationTreeViewItemClasses,
} from "./treeViewItemClasses";
import { StyledContent, StyledGroup, StyledNode } from "./TreeViewItem.styles";
import { DescendantProvider, useDescendant } from "./descendants";
import {
  TreeViewControlContext,
  TreeViewStateContext,
} from "./TreeViewContext";
import { HvAvatar } from "~/components";
import { VerticalNavigationContext } from "../VerticalNavigationContext";

export type HvVerticalNavigationTreeViewItemProps = {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied to the Radio button.
   */
  classes?: HvVerticalNavigationTreeViewItemClasses;
  /**
   * Is the node disabled.
   */
  disabled?: boolean;
  /**
   * Can the node be selected.
   */
  selectable?: boolean;
  /**
   * The id of the node.
   */
  nodeId?: string;
  /**
   * The icon to display next to the node's label.
   */
  icon?: React.ReactNode;
  /**
   * The item label.
   */
  label?: React.ReactNode;
  /**
   * The url for the link.
   */
  href?: string;
  /**
   * The behavior when opening a link.
   */
  target?: string;
  /**
   * The node payload.
   */
  payload?: any;
  /**
   * @ignore
   */
  onClick?: any;
  /**
   * @ignore
   */
  onMouseDown?: any;
  /**
   * @ignore
   */
  onFocus?: any;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
};

const preventSelection = (event, disabled) => {
  if (event.shiftKey || event.ctrlKey || event.metaKey || disabled) {
    // Prevent text selection
    event.preventDefault();
  }
};

export const HvVerticalNavigationTreeViewItem = forwardRef(
  (props: HvVerticalNavigationTreeViewItemProps, ref) => {
    const {
      id: idProp,
      className,
      classes,

      disabled: disabledProp = false,

      selectable: selectableProp,

      nodeId,
      icon = null,
      label,
      href,
      target,
      payload,

      onClick,
      onMouseDown,
      onFocus,

      children,

      ...others
    } = props;

    const treeViewControlContext = useContext(TreeViewControlContext);
    const { isExpanded, isSelected, isFocused, isDisabled, isChildSelected } =
      useContext(TreeViewStateContext);

    const {
      treeId,
      mode,
      collapsible,
      toggleExpansion,
      multiSelect,
      selectNode,
      selectRange,
      disabledItemsFocusable,
      registerNode,
      unregisterNode,
      mapFirstChar,
      unMapFirstChar,
      focus,
    } = treeViewControlContext;

    const treeviewMode = mode === "treeview";

    let id: string | null = null;

    if (idProp != null) {
      id = idProp;
    } else if (treeId && nodeId) {
      id = `${treeId}-${nodeId}`;
    }

    const [treeitemElement, setTreeitemElement] = useState(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(setTreeitemElement, ref);

    const descendant = useMemo(
      () => ({
        element: treeitemElement,
        id: nodeId,
      }),
      [nodeId, treeitemElement]
    );

    const { isOpen, collapsedMode } = useContext(VerticalNavigationContext);

    const { index, parentId, level } = useDescendant(descendant);

    const expandable = collapsible && Array.isArray(children);
    const expanded = isExpanded ? isExpanded(nodeId) : false;
    const focused = isFocused ? isFocused(nodeId) : false;
    const selected = isSelected ? isSelected(nodeId) : false;
    const disabled = isDisabled ? isDisabled(nodeId) : false;

    const selectable =
      selectableProp != null ? selectableProp : !collapsible || !expandable;

    useEffect(() => {
      // On the first render a node's index will be -1. We want to wait for the real index.
      if (registerNode && unregisterNode && index !== -1) {
        registerNode({
          id: nodeId,
          idAttribute: id,
          index,
          parentId,
          selectable,
          expandable,
          disabled: disabledProp,
          onFocus,
          payload,
        });

        return () => {
          unregisterNode(nodeId);
        };
      }

      return undefined;
    }, [
      registerNode,
      unregisterNode,
      parentId,
      index,
      nodeId,
      expandable,
      disabledProp,
      id,
      selectable,
      onFocus,
      payload,
    ]);

    useEffect(() => {
      if (
        mapFirstChar &&
        unMapFirstChar &&
        label &&
        contentRef.current?.textContent
      ) {
        mapFirstChar(
          nodeId,
          contentRef.current?.textContent.substring(0, 1).toLowerCase()
        );

        return () => {
          unMapFirstChar(nodeId);
        };
      }
      return undefined;
    }, [mapFirstChar, unMapFirstChar, nodeId, label]);

    let ariaSelected;
    if (multiSelect) {
      ariaSelected = selected;
    } else if (selected) {
      /* single-selection trees unset aria-selected on un-selected items.
       *
       * If the tree does not support multiple selection, aria-selected
       * is set to true for the selected node and it is not present on any other node in the tree.
       * Source: https://www.w3.org/TR/wai-aria-practices/#TreeView
       */
      ariaSelected = true;
    }

    const handleFocus = useCallback(
      (event) => {
        // DOM focus stays on the tree which manages focus with aria-activedescendant
        if (event.target === event.currentTarget) {
          (event.target.ownerDocument || document)
            .getElementById(treeId)
            .focus({ preventScroll: true });
        }

        const unfocusable = !disabledItemsFocusable && disabled;
        if (
          !focused &&
          event.currentTarget === event.target &&
          !unfocusable &&
          focus
        ) {
          focus(event, nodeId);
        }
      },
      [disabled, disabledItemsFocusable, focus, focused, nodeId, treeId]
    );

    const handleExpansion = useCallback(
      (event) => {
        if (!disabled) {
          if (treeviewMode && !focused && focus) {
            focus(event, nodeId);
          }

          const multiple =
            multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

          // If already expanded and trying to toggle selection don't close
          if (expandable && !(multiple && isExpanded && isExpanded(nodeId))) {
            if (toggleExpansion) toggleExpansion(event, nodeId);
          }
        }
      },
      [
        disabled,
        expandable,
        focus,
        focused,
        isExpanded,
        multiSelect,
        nodeId,
        toggleExpansion,
        treeviewMode,
      ]
    );

    const handleSelection = useCallback(
      (event) => {
        if (selectable && !disabled) {
          if (treeviewMode && !focused && focus) {
            focus(event, nodeId);
          }

          const multiple =
            multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

          if (multiple) {
            if (event.shiftKey) {
              if (selectRange) return selectRange(event, { end: nodeId });
            } else {
              if (selectNode) return selectNode(event, nodeId, true);
            }
          } else {
            if (selectNode) return selectNode(event, nodeId);
          }
        } else {
          return false;
        }
      },
      [
        disabled,
        focus,
        focused,
        multiSelect,
        nodeId,
        selectNode,
        selectRange,
        selectable,
        treeviewMode,
      ]
    );

    const handleMouseDown = useCallback(
      (event) => {
        preventSelection(event, disabled);

        if (onMouseDown) {
          onMouseDown(event);
        }
      },
      [disabled, onMouseDown]
    );

    const handleClick = useCallback(
      (event) => {
        if (!disabled) {
          if (expandable) {
            handleExpansion(event);
          }

          if (selectable) {
            handleSelection(event);
          }
        }

        if (onClick) {
          onClick(event);
        }
      },
      [
        disabled,
        expandable,
        handleExpansion,
        handleSelection,
        onClick,
        selectable,
      ]
    );

    const handleKeyDown = useCallback(
      (event) => {
        let isEventHandled = false;
        const { key } = event;

        if (
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.currentTarget !== event.target
        ) {
          return;
        }
        if (contentRef.current === event.currentTarget) {
          if (key === "Enter" || key === " ") {
            if (expandable) {
              isEventHandled = handleExpansion(event) as unknown as boolean;
            }

            if (selectable) {
              isEventHandled = handleSelection(event) as boolean;
            }
          }

          if (isEventHandled) {
            event.preventDefault();
            event.stopPropagation();
          }
        }
      },
      [expandable, handleExpansion, handleSelection, selectable]
    );

    const renderedContent = useMemo(
      () => (
        <StyledContent
          id={setId(id, "button")}
          component={href ? "a" : "div"}
          href={href}
          target={target}
          ref={contentRef}
          className={clsx(
            treeViewItemClasses.content,
            classes?.content,
            href != null && clsx(treeViewItemClasses.link, classes?.link),
            !isOpen && clsx(treeViewItemClasses.minimized, classes?.minimized)
          )}
          variant={disabled ? "placeholderText" : "body"}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          style={{
            paddingLeft:
              (expandable || icon != null ? 0 : 10) +
              level * (collapsible ? 32 : 10),
          }}
          {...(treeviewMode
            ? {
                role: "button",
                tabIndex: -1,
                onFocus: handleFocus,
              }
            : {
                role: "button",
                tabIndex: selectable || expandable ? 0 : -1,
                onKeyDown: handleKeyDown,
                "aria-current": selectable && selected ? "page" : undefined,
                "aria-expanded": expandable ? expanded : undefined,
                "aria-controls": expandable ? setId(id, "group") : undefined,
              })}
        >
          {isOpen && expandable && (expanded ? <DropUpXS /> : <DropDownXS />)}
          {!icon &&
          level === 0 &&
          !isOpen &&
          collapsedMode === "icon" &&
          contentRef.current?.textContent ? (
            <HvAvatar
              variant="square"
              size="xs"
              backgroundColor="secondary_80"
              style={{ fontSize: "15px" }}
            >
              {contentRef.current?.textContent.substring(0, 1)}
            </HvAvatar>
          ) : (
            icon
          )}
          {isOpen && label}
        </StyledContent>
      ),
      [
        id,
        href,
        target,
        classes?.content,
        treeViewItemClasses.content,
        classes?.link,
        treeViewItemClasses.link,
        classes?.minimized,
        treeViewItemClasses.minimized,
        disabled,
        handleClick,
        handleMouseDown,
        expandable,
        icon,
        level,
        collapsible,
        treeviewMode,
        handleFocus,
        selectable,
        handleKeyDown,
        selected,
        expanded,
        label,
      ]
    );

    const renderedChildren = useMemo(
      () =>
        children && (
          <StyledGroup
            id={setId(id, "group")}
            className={clsx(treeViewItemClasses.group, classes?.group)}
            role={treeviewMode ? "group" : undefined}
          >
            {children}
          </StyledGroup>
        ),
      [children, treeViewItemClasses.group, classes?.group, id, treeviewMode]
    );

    return (
      <StyledNode
        ref={handleRef}
        id={id ?? undefined}
        className={clsx(
          treeViewItemClasses?.node,
          classes?.node,
          className,
          disabled && clsx(treeViewItemClasses.disabled, classes?.disabled),
          expandable &&
            clsx(treeViewItemClasses.expandable, classes?.expandable),
          expandable &&
            !expanded &&
            clsx(treeViewItemClasses.collapsed, classes?.collapsed),
          expandable &&
            expanded &&
            clsx(treeViewItemClasses.expanded, classes?.expanded),
          selectable &&
            !disabled &&
            clsx(treeViewItemClasses.selectable, classes?.selectable),
          !disabled &&
            !selectable &&
            clsx(treeViewItemClasses.unselectable, classes?.unselectable),
          !disabled &&
            selectable &&
            selected &&
            clsx(treeViewItemClasses.selected, classes?.selected),
          !disabled &&
            selectable &&
            !selected &&
            clsx(treeViewItemClasses.unselected, classes?.unselected),
          focused && clsx(treeViewItemClasses.focused, classes?.focused),
          !isOpen &&
            collapsedMode == "simple" &&
            clsx(treeViewItemClasses.hide, classes?.hide),
          !isOpen &&
            collapsedMode == "icon" &&
            isChildSelected &&
            isChildSelected(nodeId) &&
            clsx(treeViewItemClasses.selected, classes?.selected)
        )}
        data-hasicon={icon != null ? true : undefined}
        {...(mode === "treeview" && {
          role: "treeitem",
          "aria-selected": ariaSelected,
          "aria-expanded": expandable ? expanded : undefined,
          "aria-disabled": disabled ? true : undefined,
        })}
        {...others}
      >
        {renderedContent}
        {isOpen && (
          <DescendantProvider id={nodeId} level={level + 1}>
            {renderedChildren}
          </DescendantProvider>
        )}
      </StyledNode>
    );
  }
);

import {
  useCallback,
  useMemo,
  useContext,
  useEffect,
  useState,
  ComponentProps,
} from "react";
import { clsx } from "clsx";
import { uniqueId } from "lodash";
import { setId, wrapperTooltip } from "@core/utils";
import { useControlled } from "@core/hooks";
import { HvBaseProps } from "@core/types";
import {
  HvVerticalNavigationTreeView,
  HvVerticalNavigationTreeViewItem,
} from "../TreeView";
import verticalNavigationTreeClasses, {
  HvVerticalNavigationTreeClasses,
} from "./navigationClasses";
import { StyledNav } from "./Navigation.styles";
import { HvVerticalNavigationSlider } from "..";
import { VerticalNavigationContext } from "../VerticalNavigationContext";
import { HvVerticalNavigationPopup } from "../NavigationPopup/NavigationPopup";
import { getParentItemById } from "../NavigationSlider/utils/NavigationSlider.utils";

export type NavigationData<T extends React.ElementType = "a"> =
  ComponentProps<T> &
    Record<string, any> & {
      /** The id to be applied to the root element. */
      id: string;
      /** The label to be rendered on the menu item. */
      label: string;
      /** The icon to be rendered. */
      icon?: React.ReactNode;
      /** The Data children subset. */
      data?: NavigationData<T>[];
      /** Whether the item is disabled and not interactive. */
      disabled?: boolean;
      /** Whether the item has a selected state. */
      selectable?: boolean;
    };

const createListHierarchy = (
  items,
  id,
  classes?: HvVerticalNavigationTreeClasses,
  mouseEnterHandler?: (event, item) => void,
  disableTooltip = false
) =>
  items.map((item) => {
    const {
      id: itemId,
      label: itemLabel,
      icon,
      data: children,
      selectable,
      disabled,
      href,
      target,
    } = item;

    const ItemText = wrapperTooltip(true, itemLabel, itemLabel);

    const itemMouseEnterHandler = (event) => {
      mouseEnterHandler?.(event, item);
    };

    return (
      <HvVerticalNavigationTreeViewItem
        id={setId(id, itemId)}
        className={classes?.listItem}
        href={href}
        target={target}
        key={itemId}
        nodeId={itemId}
        label={<ItemText />}
        icon={icon}
        payload={item}
        selectable={selectable}
        disabled={disabled}
        onMouseEnter={itemMouseEnterHandler}
        disableTooltip={disableTooltip}
      >
        {children
          ? createListHierarchy(
              children,
              id,
              classes,
              mouseEnterHandler,
              disableTooltip
            )
          : undefined}
      </HvVerticalNavigationTreeViewItem>
    );
  });

const getAllParents = (items) => {
  const parents = items.filter(
    (item) => item.data != null && item.data.length > 0
  );
  const childParents = parents.flatMap((item) => getAllParents(item.data));

  return [...parents, ...childParents];
};

function pathToElement(data, targetId) {
  const path: string[] = [];

  if (data != null && data.length > 0) {
    for (let i = 0; i !== data.length; ++i) {
      const item = data[i];
      if (item.id === targetId) {
        path.push(item.id);
        break;
      }

      const subPaths = pathToElement(item.data, targetId);
      if (subPaths.length > 0) {
        path.push(item.id);
        path.push(...subPaths);
        break;
      }
    }
  }

  return path;
}

export const HvVerticalNavigationTree = ({
  id,

  className,
  classes,

  data,

  mode = "navigation",

  collapsible = false,
  expanded: expandedProp,
  defaultExpanded,
  onToggle,

  selected: selectedProp,
  defaultSelected,
  onChange,

  ...others
}: HvVerticalNavigationTreeProps) => {
  const [selected, setSelected] = useControlled(selectedProp, defaultSelected);
  const [expanded, setExpanded] = useControlled(expandedProp, () => {
    if (defaultExpanded === true) {
      // all parent nodes will be expanded by default
      return getAllParents(data).map((item) => item.id);
    }

    if (defaultExpanded === false) {
      // all parent nodes will be collapsed by default
      return [];
    }

    if (defaultExpanded == null) {
      if (selected != null) {
        // the path to the selected node will be expanded (default behaviour)
        const path = pathToElement(data, selected);
        return path.slice(0, -1);
      }

      // nothing is expanded
      return [];
    }

    return defaultExpanded;
  });

  const {
    isOpen,
    useIcons,
    slider,

    parentItem,
    setParentItem,
    withParentData,
    navigateToChildHandler,

    setParentData,
    setParentSelected,
  } = useContext(VerticalNavigationContext);

  const [navigationPopup, setNavigationPopup] = useState<{
    // This value is needed to guarantee that the NavigationPopup is fully re-rendered with keeping any previous values
    uniqueKey: string;
    anchorEl: HTMLButtonElement | null;
    fixedMode: boolean;
    data: NavigationData[];
  } | null>(null);

  const handleChange = useCallback(
    (event, selectedId, selectedItem) => {
      if (useIcons && !isOpen && selectedItem.data) {
        const currentEventTarget = event.currentTarget;
        setNavigationPopup((prevState) => {
          // We want to close the popup in case the clicked element is the same as the previous one
          return prevState?.anchorEl === currentEventTarget
            ? null
            : {
                uniqueKey: uniqueId(),
                anchorEl: currentEventTarget,
                fixedMode: true,
                data: selectedItem.data,
              };
        });

        // We need this stopPropagation or else the Popup will close due to the clickaway being triggered
        event.stopPropagation();
      } else {
        setSelected(selectedId);
        setExpanded((prevState) => {
          if (!isOpen) {
            return [...prevState, ...pathToElement(data, selectedId)];
          }
          return [...prevState];
        });
        setNavigationPopup(null);
        if (onChange) {
          onChange(event, selectedItem);
        }
      }
    },
    [onChange, setSelected]
  );

  const treeViewItemMouseEnterHandler = (event, item) => {
    const isCollapsed = useIcons && !isOpen;

    if (isCollapsed && item.data && !navigationPopup?.fixedMode) {
      const currentEventTarget = event.currentTarget;

      setNavigationPopup?.({
        uniqueKey: uniqueId(),
        anchorEl: currentEventTarget,
        fixedMode: false,
        data: item.data,
      });
    } else if (isCollapsed && !item.data && !navigationPopup?.fixedMode) {
      setNavigationPopup(null);
    }
  };

  const handleToggle = useCallback(
    (event, newExpanded) => {
      setExpanded(newExpanded);

      if (onToggle) {
        onToggle(event, newExpanded);
      }
    },
    [onToggle, setExpanded]
  );

  const children = useMemo(
    () =>
      data &&
      createListHierarchy(
        data,
        id,
        classes,
        treeViewItemMouseEnterHandler,
        navigationPopup?.fixedMode
      ),
    [classes, data, id, navigationPopup, isOpen]
  );

  useEffect(() => {
    if (!isOpen) {
      setNavigationPopup?.(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (setParentSelected) setParentSelected(selected);
  }, [selected, setSelected]);

  useEffect(() => {
    if (setParentData) setParentData(data);
  }, [data]);

  useEffect(() => {
    if (
      withParentData &&
      selected &&
      setParentItem &&
      getParentItemById(withParentData, selected)
    ) {
      setParentItem(getParentItemById(withParentData, selected));
    }
  }, [withParentData]);

  // navigation slider
  const navigateToTargetHandler = (event, selectedItem) => {
    handleChange(event, selectedItem.id, selectedItem);
  };

  const handleNavigationPopupClose = () => {
    setNavigationPopup(null);
  };

  const handleStyledNavMouseLeave = () => {
    if (useIcons && !isOpen && !navigationPopup?.fixedMode) {
      setNavigationPopup(null);
    }
  };

  return (
    <StyledNav
      id={id}
      className={clsx(
        className,
        verticalNavigationTreeClasses.root,
        classes?.root,
        !isOpen &&
          !useIcons &&
          clsx(verticalNavigationTreeClasses.collapsed, classes?.collapsed)
      )}
      onMouseLeave={handleStyledNavMouseLeave}
      {...others}
    >
      {slider ? (
        <HvVerticalNavigationSlider
          data={parentItem.data || withParentData}
          selected={selected}
          onNavigateToTarget={navigateToTargetHandler}
          onNavigateToChild={navigateToChildHandler}
        />
      ) : (
        <HvVerticalNavigationTreeView
          id={setId(id, "tree")}
          className={clsx(verticalNavigationTreeClasses.list, classes?.list)}
          selectable
          mode={mode}
          collapsible={collapsible}
          selected={selected}
          onChange={handleChange}
          expanded={expanded}
          onToggle={handleToggle}
        >
          {useIcons && !isOpen && navigationPopup && (
            <HvVerticalNavigationPopup
              id={setId(id, "navigation-popup")}
              key={navigationPopup.uniqueKey}
              anchorEl={navigationPopup.anchorEl}
              selected={selected}
              fixedMode={navigationPopup.fixedMode}
              data={navigationPopup.data}
              onClose={handleNavigationPopupClose}
              onChange={handleChange}
              className={clsx(
                verticalNavigationTreeClasses.navigationPopup,
                classes?.navigationPopup
              )}
            />
          )}
          {children}
        </HvVerticalNavigationTreeView>
      )}
    </StyledNav>
  );
};

export interface HvVerticalNavigationTreeProps
  extends HvBaseProps<HTMLDivElement, "onChange"> {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvVerticalNavigationTreeClasses;
  /**
   * Modus operandi (role) of the widget instance.
   */
  mode?: NavigationMode;
  /**
   * Can non-leaf nodes be collapsed / expanded.
   */
  collapsible?: boolean;
  /**
   * The ID of the selected page.
   */
  selected?: string;
  /**
   * When uncontrolled, defines the initial selected page ID.
   */
  defaultSelected?: string;
  /**
   * Callback fired when a navigation item is selected.
   *
   * @param {object} event The event source of the callback.
   * @param {object} page The data of the selected page.
   */
  onChange?: (event, page) => void;
  /**
   * Expanded nodes' ids.
   */
  expanded?: string[];
  /**
   * When uncontrolled, defines the initial expanded nodes' ids.
   *
   * It also supports `true` for starting with all nodes expanded.
   * With `false` all nodes will be collapsed.
   *
   * By default it expands the needed nodes to display the current selection, if any.
   */
  defaultExpanded?: string[] | boolean;
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes (old and new).
   */
  onToggle?: (event, nodeIds) => void;
  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   * data - sub-menu items
   * href - the url used for navigation.
   * target - the behavior when opening an url.
   */
  data?: NavigationData[];
}

export type NavigationMode = "treeview" | "navigation" | "slider";

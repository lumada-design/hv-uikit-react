import { useCallback, useMemo } from "react";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Popper } from "@mui/base/Popper";
import { Info } from "@hitachivantara/uikit-react-icons";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvActionBar } from "../ActionBar";
import { HvBulkActions, HvBulkActionsProps } from "../BulkActions";
import { HvEmptyState } from "../EmptyState";
import { useControlled } from "../hooks/useControlled";
import { HvListContainer, HvListItem } from "../ListContainer";
import { HvSearchInput } from "../SearchInput";
import { HvBaseProps } from "../types/generic";
import { HvPopperMenuGroup as HvPopperMenuGroupComponent } from "./Group";
import { staticClasses, useClasses } from "./PopperMenu.styles";
import {
  renderCheckBoxGroup,
  renderRadioGroup,
  renderSwitchGroup,
} from "./renderers";
import type { HvPopperMenuGroup, HvPopperMenuItems } from "./types";
import { filterGroups, normalizeGroups } from "./utils";

export { staticClasses as PopperMenuClasses };

export type HvPopperMenuClasses = ExtractNames<typeof useClasses>;

export interface HvPopperMenuProps
  extends HvBaseProps<HTMLDivElement, "onChange"> {
  anchorEl?: HTMLElement | null;
  open?: boolean;
  onClose?: () => void;
  items?: HvPopperMenuItems;
  onChange?: (selectedIds: string[]) => void;
  showSearch?: boolean;
  showSelection?: boolean;
  // controlled
  selected?: string[];
  defaultSelected?: string[];
  search?: string;
  onSearchChange?: (search: string) => void;
  actions?: React.ReactNode;
  classes?: any;
}

export const HvPopperMenu = (props: HvPopperMenuProps) => {
  const {
    className,
    classes: classesProp,
    open = false,
    onClose,
    anchorEl,
    items = [],
    onChange,
    showSearch = false,
    showSelection = false,
    selected: selectedProp,
    defaultSelected,
    children,
    search: searchProp,
    onSearchChange,
    actions,
    ...others
  } = useDefaultProps("HvPopperMenu", props);

  const { classes, cx } = useClasses(classesProp);

  const [search, setSearch] = useControlled<string>(searchProp, "");
  const [selected, setSelected] = useControlled<string[]>(
    selectedProp,
    defaultSelected ?? [],
  );

  const handleSelectionChange = useCallback(
    (newSelected: string[]) => {
      setSelected(newSelected);
      onChange?.(newSelected);
    },
    [setSelected, onChange],
  );

  const handleSearchChange = useCallback(
    (newSearch: string) => {
      setSearch(newSearch);
      onSearchChange?.(newSearch);
    },
    [setSearch, onSearchChange],
  );

  // Normalize items to always be groups
  const normalizedGroups = useMemo(() => normalizeGroups(items), [items]);

  const filteredGroups = useMemo(
    () => filterGroups(search, searchProp, normalizedGroups),
    [normalizedGroups, search, searchProp],
  );

  const handleSelectAll: HvBulkActionsProps["onSelectAll"] = (_, checked) => {
    if (checked) {
      const allIds = normalizedGroups
        .filter((g) => g.type && g.type !== "radio" && g.type !== "default")
        .flatMap((g) => g.items.map((i) => i.id));
      handleSelectionChange(allIds);
    } else {
      handleSelectionChange([]);
    }
  };

  const renderGroup = useCallback(
    (group: HvPopperMenuGroup) => {
      switch (group.type) {
        case "checkbox":
          return renderCheckBoxGroup(
            group,
            selected,
            handleSelectionChange,
            classes,
          );
        case "radio":
          return renderRadioGroup(group, selected, handleSelectionChange);
        case "switch":
          return renderSwitchGroup(group, selected, handleSelectionChange);
        default:
          return (
            <HvListContainer interactive>
              {group.items.map((item) => (
                <HvListItem
                  key={item.id}
                  onClick={(event) => item.onClick?.(event, item.id)}
                  className={classes.listItem}
                  disabled={!!item.disabled}
                >
                  {item.icon}
                  {item.label}
                </HvListItem>
              ))}
            </HvListContainer>
          );
      }
    },
    [selected, classes, handleSelectionChange],
  );

  const hasSelectableGroups = normalizedGroups.some((g) => g.type !== "radio");

  return (
    <div className={cx(classes.root, className)} {...others}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        disablePortal
        className={classes.popper}
      >
        <ClickAwayListener onClickAway={() => onClose?.()}>
          <div>
            {children ? (
              children
            ) : (
              <>
                {showSearch && (
                  <HvSearchInput
                    value={search}
                    onChange={(_, val) => handleSearchChange(val)}
                    className={classes.search}
                  />
                )}

                {showSelection && hasSelectableGroups && (
                  <HvBulkActions
                    numSelected={selected.length}
                    numTotal={normalizedGroups.flatMap((g) => g.items).length}
                    className={classes.bulkActions}
                    onSelectAll={handleSelectAll}
                  />
                )}

                {filteredGroups.length === 0 && (
                  <HvEmptyState
                    title="No results found"
                    message="Try adjusting your search."
                    icon={<Info />}
                    className={classes.empty}
                  />
                )}
                {filteredGroups.length > 0 &&
                  filteredGroups.map((group) => {
                    const hasSearchItems = group.items.length > 0;
                    if (!hasSearchItems) return null;

                    return (
                      <HvPopperMenuGroupComponent
                        key={group.title}
                        title={group.title}
                      >
                        {renderGroup(group)}
                      </HvPopperMenuGroupComponent>
                    );
                  })}

                {actions && (
                  <HvActionBar className={classes.actions}>
                    {actions}
                  </HvActionBar>
                )}
              </>
            )}
          </div>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

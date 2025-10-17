import { useCallback, useMemo } from "react";
import { Popper } from "@mui/base/Popper";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBulkActions, HvBulkActionsProps } from "../BulkActions";
import { HvCheckBox } from "../CheckBox";
import { HvCheckBoxGroup } from "../CheckBoxGroup";
import { useControlled } from "../hooks/useControlled";
import { HvListContainer, HvListItem } from "../ListContainer";
import { HvRadio } from "../Radio";
import { HvRadioGroup } from "../RadioGroup";
import { HvSearchInput } from "../SearchInput";
import { HvSwitch } from "../Switch";
import { HvBaseProps } from "../types/generic";
import { staticClasses, useClasses } from "./PopperMenu.styles";
import { HvPopperMenuGroup } from "./PopperMenuGroup";

export { staticClasses as PopperMenuClasses };

export type HvPopperMenuClasses = ExtractNames<typeof useClasses>;

export interface HvPopperMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface HvPopperMenuGroup {
  title?: string;
  items: HvPopperMenuItem[];
  type?: "default" | "checkbox" | "radio" | "switch";
}

export type HvPopperMenuItems = HvPopperMenuGroup[] | HvPopperMenuItem[];

export interface HvPopperMenuProps
  extends HvBaseProps<HTMLDivElement, "onChange"> {
  anchorEl?: HTMLElement | null;
  open?: boolean;
  items?: HvPopperMenuItems;
  onChange?: (selectedIds: string[]) => void;
  showSearch?: boolean;
  showSelection?: boolean;
  // controlled
  selected?: string[];
  defaultSelected?: string[];
  search?: string;
  onSearchChange?: (search: string) => void;

  classes?: any;
}

export const HvPopperMenu = (props: HvPopperMenuProps) => {
  const {
    className,
    classes: classesProp,
    open = false,
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
    ...others
  } = useDefaultProps("HvPopperMenu", props);

  const { classes, cx } = useClasses(classesProp);

  // const [search, setSearch] = useState("");
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
  const normalizedGroups: HvPopperMenuGroup[] = useMemo(() => {
    if (!items?.length) return [];
    const isFlatList = !("items" in (items[0] as HvPopperMenuGroup));
    if (isFlatList) {
      return [{ title: undefined, items: items as HvPopperMenuItem[] }];
    }
    return items as HvPopperMenuGroup[];
  }, [items]);

  const filteredGroups = useMemo(() => {
    if (!search) return normalizedGroups;
    if (searchProp !== undefined) return normalizedGroups;

    return normalizedGroups.map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      ),
    }));
  }, [normalizedGroups, search, searchProp]);

  const handleItemSelect = useCallback(
    (id: string) => {
      handleSelectionChange(
        selected.includes(id)
          ? selected.filter((x) => x !== id)
          : [...selected, id],
      );
    },
    [selected, handleSelectionChange],
  );

  const handleSelectAll: HvBulkActionsProps["onSelectAll"] = (_, checked) => {
    if (checked) {
      const allIds = normalizedGroups
        .filter((g) => g.type !== "radio")
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
          return (
            <HvCheckBoxGroup
              value={selected.filter((id) =>
                group.items.some((i) => i.id === id),
              )}
              onChange={(_, checkedIds: string[]) => {
                const others = selected.filter(
                  (id) => !group.items.some((i) => i.id === id),
                );
                handleSelectionChange([...others, ...checkedIds]);
              }}
            >
              {group.items.map((item) => (
                <HvCheckBox
                  key={item.id}
                  value={item.id}
                  checked={selected.includes(item.id)}
                  label={item.label}
                />
              ))}
            </HvCheckBoxGroup>
          );
        case "radio":
          return (
            <HvRadioGroup
              value={
                group.items.find((i) => selected.includes(i.id))?.id ?? null
              }
              onChange={(_, checkedId: string | null) => {
                const others = selected.filter(
                  (id) => !group.items.some((i) => i.id === id),
                );
                const newSelected =
                  checkedId != null ? [...others, checkedId] : others;
                handleSelectionChange(newSelected);
              }}
            >
              {group.items.map((item) => {
                return (
                  <HvRadio
                    key={item.id}
                    label={item.label}
                    value={item.id}
                    checked={selected.includes(item.id)}
                  />
                );
              })}
            </HvRadioGroup>
          );
        case "switch":
          return (
            <>
              {group.items.map((item) => (
                <HvSwitch
                  labelPosition="left"
                  key={item.id}
                  checked={selected.includes(item.id)}
                  label={item.label}
                  onChange={(_, checked) => {
                    if (checked) {
                      handleSelectionChange([...selected, item.id]);
                    } else {
                      handleSelectionChange(
                        selected.filter((id) => id !== item.id),
                      );
                    }
                  }}
                />
              ))}
            </>
          );
        default:
          return (
            <HvListContainer selectable interactive>
              {group.items.map((item) => (
                <HvListItem
                  key={item.id}
                  selected={selected.includes(item.id)}
                  onClick={() => handleItemSelect(item.id)}
                  className={classes.listItem}
                >
                  {item.icon && (
                    <span style={{ marginRight: 4 }}>{item.icon}</span>
                  )}
                  {item.label}
                </HvListItem>
              ))}
            </HvListContainer>
          );
      }
    },
    [selected, classes.listItem, handleItemSelect, handleSelectionChange],
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

        {filteredGroups.map((group) => {
          const hasSearchItems = group.items.length > 0;
          if (!hasSearchItems) return null;

          return (
            <HvPopperMenuGroup key={group.title} title={group.title}>
              {renderGroup(group)}
            </HvPopperMenuGroup>
          );
        })}
      </Popper>
    </div>
  );
};

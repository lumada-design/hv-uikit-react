import { clsx } from "clsx";
import { useState, useEffect, ChangeEvent } from "react";
import { HvInput, HvAccordion } from "@hitachivantara/uikit-react-core";
import { DragOverlay, useDndMonitor } from "@dnd-kit/core";

import { Loading, Draggable } from "components/common";
import { ListItem } from "./ListItem";
import classes from "./styles";

interface PanelListProps {
  items: any;
  loading: boolean;
  showSearch?: boolean;
  groupItems?: boolean;
  layout?: "grid" | "list";
}

export const PanelList = ({
  items,
  loading,
  showSearch = true,
  groupItems = true,
  layout = "grid",
}: PanelListProps) => {
  const [listItems, setListItems] = useState({});
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setListItems(items);
  }, [items]);

  useDndMonitor({
    onDragStart({ active }) {
      setSelectedItem(active.id as string);
    },
    onDragEnd() {
      setSelectedItem(undefined);
    },
  });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const { value } = event.currentTarget;
    const filtered = {};

    Object.keys(listItems).forEach((group) => {
      filtered[group] = listItems[group].filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    });

    setListItems(value.length ? filtered : items);
  };

  const renderItems = (group, items) => {
    return (
      <div
        key={group}
        className={clsx({
          [classes.grid]: layout === "grid",
          [classes.list]: layout === "list",
        })}
      >
        {items?.map((item) => (
          <Draggable key={item.name} id={item.name} data={item}>
            <ListItem
              label={item.name}
              selected={selectedItem === item}
              layout={layout}
            />
          </Draggable>
        ))}
      </div>
    );
  };

  return loading ? (
    <Loading loadingLabel="Loading Components" />
  ) : (
    <>
      {showSearch && (
        <HvInput
          className={classes.search}
          classes={{ inputRoot: classes.inputRoot }}
          aria-label="search components"
          placeholder="Search"
          onChange={handleSearch}
        />
      )}

      {listItems &&
        Object.keys(listItems).map((group) => {
          return groupItems ? (
            <HvAccordion
              key={group}
              label={group}
              classes={{
                root: classes.accordionRoot,
                label: classes.accordionLabel,
              }}
              defaultExpanded
            >
              {renderItems(group, listItems[group])}
            </HvAccordion>
          ) : (
            renderItems(group, listItems[group])
          );
        })}

      <DragOverlay dropAnimation={null}>
        {selectedItem ? (
          <ListItem label={selectedItem} layout={layout} />
        ) : null}
      </DragOverlay>
    </>
  );
};

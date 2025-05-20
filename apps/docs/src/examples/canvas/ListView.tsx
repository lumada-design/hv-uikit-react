import { forwardRef, useRef, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import {
  HvInput,
  HvInputProps,
  HvListContainer,
  HvListItem,
  HvListItemProps,
  HvTypography,
  useForkRef,
  useUniqueId,
} from "@hitachivantara/uikit-react-core";
import { Drag } from "@hitachivantara/uikit-react-icons";

import { NodeData } from "./Node";
import { iconsMapping, iconsMappingKeys } from "./utils";

const items = iconsMappingKeys.map((key, index) => ({
  id: `item${index + 1}`,
  title: `Item ${index + 1}`,
  subtitle: `Description ${index + 1}`,
  icon: key,
}));

interface ItemProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface ItemCardProps
  extends Omit<HvListItemProps, "title">,
    Omit<ItemProps, "id"> {
  isDragging?: boolean;
}

const ItemCard = forwardRef<HTMLLIElement, ItemCardProps>(
  ({ icon, title, subtitle, isDragging, ...others }, ref) => {
    return (
      <HvListItem
        ref={ref}
        classes={{
          root: `flex, justify-between items-center border-1 border-bgPageSecondary border-rounded-round bg-bgContainer p-xs h-unset ${isDragging ? "border-2px border-primary_80" : ""}`,
        }}
        {...others}
      >
        <div className="flex items-center gap-xs">
          <div className="border-rounded-round bg-cat6_60">
            {iconsMapping[icon as keyof typeof iconsMapping]}
          </div>
          <HvTypography variant="label">{title}</HvTypography>
        </div>
        <Drag />
      </HvListItem>
    );
  },
);

const DraggableItemCard = ({ icon, title, id, subtitle }: ItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null);

  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id,
      data: {
        // Data needed to be dropped in HvFlow
        hvFlow: {
          // HvFlow will use this value to populate the node's data.nodeLabel
          label: title,
          // Node type from nodeTypes property provided to HvFlow
          type: "node",
          // Item position: used by HvFlow to position the node when dropped
          x: itemRef.current?.getBoundingClientRect().x,
          y: itemRef.current?.getBoundingClientRect().y,
          // Values to be added to the node's data
          data: {
            subtitle,
            color: "cat6_60",
            icon,
            output: {
              id: "data",
              label: "Data",
            },
            input: {
              id: "data",
              label: "Data",
            },
          } satisfies NodeData,
        },
        // Data needed for the DragOverlay component
        dragOverlay: {
          component: (
            <ItemCard
              icon={icon}
              title={title}
              subtitle={subtitle}
              isDragging
            />
          ),
        },
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const forkedRef = useForkRef(itemRef, setNodeRef);

  return (
    <ItemCard
      ref={forkedRef}
      style={style}
      icon={icon}
      title={title}
      subtitle={subtitle}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    />
  );
};

export const ListView = () => {
  const [listItems, setListItems] = useState(items);

  const listId = useUniqueId();

  const handleSearch: HvInputProps["onChange"] = (event, value) => {
    if (value) {
      setListItems(
        items.filter((item) =>
          item.title.toLowerCase().trim().includes(value.toLowerCase().trim()),
        ),
      );
    } else {
      setListItems(items);
    }
  };

  return (
    <div className="flex flex-col gap-sm">
      <HvInput
        type="search"
        placeholder="Search for a node..."
        aria-controls={listId}
        aria-owns={listId}
        onChange={handleSearch}
        inputProps={{ autoComplete: "off" }}
      />
      <HvListContainer id={listId}>
        {listItems.map((item) => (
          <DraggableItemCard key={item.id} {...item} />
        ))}
      </HvListContainer>
    </div>
  );
};

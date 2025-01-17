import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@emotion/css";
import {
  HvBaseDropdown,
  HvIconButton,
  HvPanel,
  HvTypography,
  theme,
  useUniqueId,
} from "@hitachivantara/uikit-react-core";
import {
  Drag,
  Pin,
  Preview,
  PreviewOff,
  Settings,
} from "@hitachivantara/uikit-react-icons";

export type Group = {
  id: string;
  title: string;
};

export type Item = {
  id: string;
  title: string;
};

const Item = ({ item }: { item: Item }) => {};

const Group = ({ group }: { group: Group }) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: group.id,
      data: {
        type: "Group",
        group,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} className="border rounded-round">
      <div {...attributes} {...listeners} className="gap-xs">
        <HvTypography variant="label">{group.title}</HvTypography>
      </div>
    </div>
  );
};

interface SettingsDialogProps {
  columns: Item[];
}

const SettingsDialog = ({ columns }: SettingsDialogProps) => {
  const [groups, setGroups] = useState<Group[]>([
    { id: "fixed", title: "Fixed" },
    { id: "visible", title: "Visible" },
    { id: "hidden", title: "Hidden" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(KeyboardSensor, {}),
  );

  const columnsId = useMemo(() => groups.map((col) => col.id), [groups]);

  const onDragStart = (event: DragStartEvent) => {};

  const onDragEnd = (event: DragEndEvent) => {};

  const onDragOver = (event: DragOverEvent) => {};

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex flex-col gap-sm">
        <SortableContext items={columnsId}>
          {groups.map((column) => (
            <Group
              key={column.id}
              group={column}
              // columns={columns.filter((item) => item.groupId === column.id)}
              // total={columns.length}
            />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {/* {activeGroup && (
          <Group
            group={activeGroup}
            columns={columns.filter((item) => item.groupId === activeGroup.id)}
          />
        )}
        {activeColumn && <ColuItemnItem item={activeColumn} />} */}
      </DragOverlay>
    </DndContext>
  );
};

export const DragAndDrop = () => {
  const [popperOpen, setPopperOpen] = useState(false);
  const settingsPanelId = useUniqueId("settingsPanel");
  const columns = useMemo(
    () => [
      { id: "1", groupId: "fixed", title: "name 1" },
      { id: "2", groupId: "visible", title: "name 2" },
    ],
    [],
  );

  return (
    <HvBaseDropdown
      expanded={true}
      onToggle={() => setPopperOpen((p) => !p)}
      component={
        <HvIconButton title="Settings">
          <Settings />
        </HvIconButton>
      }
      variableWidth
      aria-label="Table Settings"
    >
      <HvPanel style={{ width: "200px" }} id={settingsPanelId}>
        <SettingsDialog
          columns={columns}
          // onOrderChange={handleOrderChange}
          // onColumnHide={handleHideColumn}
          // setFixedColumns={setFixedColumns}
          // settingsPanelId={settingsPanelId}
          // fixedColumns={fixedColumns}
          // hiddenColumns={hiddenColumns}
          // columnOrder={columnOrder}
        />
      </HvPanel>
    </HvBaseDropdown>
  );
};

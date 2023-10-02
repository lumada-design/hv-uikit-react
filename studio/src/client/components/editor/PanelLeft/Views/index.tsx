import { Add } from "@hitachivantara/uikit-react-icons";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

import { IconButton, Panel } from "components/common";
import { useViewsStore } from "lib/hooks/useViewsStore";
import { useEditorStore } from "lib/hooks/useEditorStore";
import { PageItem } from "./PageItem";

export const Views = () => {
  const { views, selectedView, setViews, addView, setSelectedView } =
    useViewsStore();
  const {
    leftPanel: { selected },
  } = useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = views.findIndex((item) => item.id === active.id);
      const newIndex = views.findIndex((item) => item.id === over.id);

      setViews(arrayMove(views, oldIndex, newIndex));
    }
  };

  const handleNewPage = () => {
    addView({
      id: "new-page",
      label: "New page",
    });
  };

  return (
    <Panel
      label={selected}
      actions={[
        <IconButton key="addView" title="Add page" onClick={handleNewPage}>
          <Add iconSize="XS" />
        </IconButton>,
      ]}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      >
        <SortableContext items={views} strategy={verticalListSortingStrategy}>
          {views.map(({ id, label }) => (
            <PageItem
              key={id}
              id={id}
              label={label}
              onClick={() => setSelectedView(id)}
              selected={selectedView === id}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Panel>
  );
};

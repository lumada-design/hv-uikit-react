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
import useAppStore from "lib/store/useAppStore";
import useEditorStore from "lib/store/useEditorStore";
import { PageItem } from "./PageItem";

export const Pages = () => {
  const { pages, selectedPage, setPages, addPage, setSelectedPage } =
    useAppStore();
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
      const oldIndex = pages.findIndex((item) => item.id === active.id);
      const newIndex = pages.findIndex((item) => item.id === over.id);

      setPages(arrayMove(pages, oldIndex, newIndex));
    }
  };

  const handleNewPage = () => {
    addPage({
      id: "new-page",
      label: "New page",
    });
  };

  return (
    <Panel
      label={selected}
      actions={[
        <IconButton key="addPage" title="Add page" onClick={handleNewPage}>
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
        <SortableContext items={pages} strategy={verticalListSortingStrategy}>
          {pages.map(({ id, label }) => (
            <PageItem
              key={id}
              id={id}
              label={label}
              onClick={() => setSelectedPage(id)}
              selected={selectedPage === id}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Panel>
  );
};

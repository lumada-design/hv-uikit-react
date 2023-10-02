import { DndContext } from "@dnd-kit/core";

import { Header } from "components/common";
import { Canvas, PanelLeft, PanelRight } from "components/editor";
import { useViewsStore } from "lib/hooks/useViewsStore";
import classes from "./styles";

const Editor = () => {
  const { addComponent } = useViewsStore();

  const handleDragStart = (evt) => {
    const { active } = evt;
  };

  const handleDragOver = (evt) => {
    const { active, over } = evt;
  };

  const handleDragEnd = (evt) => {
    const { active } = evt;

    addComponent(active.data.current);
  };

  return (
    <div className={classes.root}>
      <Header />
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        autoScroll
      >
        <PanelLeft />
        <Canvas />
        <PanelRight />
      </DndContext>
    </div>
  );
};

export default Editor;

import {
  DndContext,
} from "@dnd-kit/core";

import { Header, PanelLeft, Canvas, PanelRight } from "components";

import classes from "./styles";

const Editor = () => {
  return (
    <div className={classes.root}>
      <Header />
      <DndContext>
        <PanelLeft />
        <Canvas />
        <PanelRight />
      </DndContext>
    </div>
  );
};

export default Editor;

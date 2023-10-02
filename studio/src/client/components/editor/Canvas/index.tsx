import { clsx } from "clsx";
import JsxParser from "react-jsx-parser";
import { useDroppable } from "@dnd-kit/core";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useEditorStore } from "lib/hooks/useEditorStore";
import { useViewsStore } from "lib/hooks/useViewsStore";
import { Sortable } from "components/common";

import classes from "./styles";

const Parser: any = JsxParser;

const CanvasItem = (props) => {
  const { component, overlay, ...rest } = props;

  return (
    <div
      className={clsx(classes.field, {
        [classes.overlay]: overlay,
      })}
    >
      <Parser jsx={component.src} />
    </div>
  );
};

export const Canvas = () => {
  const { canvas } = useEditorStore();
  const { views, selectedView } = useViewsStore();

  const view = views.find((view) => view.id === selectedView);
  const layout = view?.layout || [];

  const { setNodeRef } = useDroppable({ id: "canvas" });

  const renderComponents = () => {
    return (
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={layout.map((component) => component.id)}
      >
        {layout.map((component) => (
          <Sortable key={component.id} id={component.id}>
            <CanvasItem component={component} />
          </Sortable>
        ))}
      </SortableContext>
    );
  };

  const renderEmpty = () => {
    return (
      <HvTypography variant="caption1" className={classes.empty}>
        {`${view?.label} has no components yet.`}
        <br />
        Drag components from the sidebar and drop here.
      </HvTypography>
    );
  };

  return (
    <section className={classes.root}>
      <div
        ref={setNodeRef}
        className={clsx(classes.canvas, {
          [classes.desktop]: canvas.mode === "desktop",
          [classes.mobile]: canvas.mode === "mobile",
        })}
      >
        {layout.length ? renderComponents() : renderEmpty()}
      </div>
    </section>
  );
};

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

export const createEditorStore = (
  initState: EditorState,
  components: Component[]
) => {
  return create(
    immer<EditorStore>((set) => ({
      ...initState,
      components: components.map((c) => ({ ...c, id: c.id || uuidv4() })),
      setLeftPanelSelected: (panel) =>
        set((state) => {
          state.leftPanel.selected = panel;
        }),
      setLeftPanelPinned: (pined) =>
        set((state) => {
          state.leftPanel.pined = pined;
        }),
      setCanvasMode: (mode) =>
        set((state) => {
          state.canvas.mode = mode;
        }),
    }))
  );
};

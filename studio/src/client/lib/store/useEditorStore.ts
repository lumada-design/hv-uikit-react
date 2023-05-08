import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import editorState from "./editorState";

const useEditorStore = create(
  immer<EditorStore>((set) => ({
    ...editorState,
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

export default useEditorStore;

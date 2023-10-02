import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

export const createViewsStore = (initState: ViewsState) => {
  return create(
    immer<ViewsStore>((set) => ({
      ...initState,
      addView: (view) =>
        set((state) => {
          state.views?.push(view);
        }),
      setViews: (views) =>
        set((state) => {
          state.views = views;
        }),
      setSelectedView: (view) =>
        set((state) => {
          state.selectedView = view;
        }),
      addComponent: (component) =>
        set((state) => {
          const view = state.views?.find((v) => v.id === state.selectedView);
          view?.layout?.push({ ...component, id: uuidv4() });
        }),
      removeComponent: (id) =>
        set((state) => {
          const view = state.views?.find((v) => v.id === state.selectedView);
          view?.layout?.filter((c) => c.id !== id);
        }),
    }))
  );
};

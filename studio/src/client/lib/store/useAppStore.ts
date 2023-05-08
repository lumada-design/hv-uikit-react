import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

import appState from "./appState";

const useAppStore = create(
  immer<AppStore>((set) => ({
    ...appState,
    addPage: (page) =>
      set((state) => {
        state.pages = [...state.pages, page];
      }),
    setPages: (pages) =>
      set((state) => {
        state.pages = pages;
      }),
    setSelectedPage: (page) =>
      set((state) => {
        state.selectedPage = page;
      }),
    addComponent: (component, parent) =>
      set((state) => {
        state.components = [
          ...state.components,
          { ...component, id: uuidv4(), parent },
        ];
      }),
    removeComponent: (id) =>
      set((state) => {
        state.components = state.components.filter((c) => c.id !== id);
      }),
    setComponents: (components) =>
      set((state) => {
        state.components = components;
      }),
    setSelectedComponent: (page) =>
      set((state) => {
        state.selectedComponent = page;
      }),
  }))
);

export default useAppStore;

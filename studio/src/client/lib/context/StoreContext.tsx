import { useMemo, createContext } from "react";
import { StoreApi } from "zustand";

import { createEditorStore } from "lib/store/editorStore";
import { createViewsStore } from "lib/store/viewsStore";

interface Config {
  editorComponents: Component[];
  editorConfig: EditorState;
  viewsConfig: ViewsState;
}

interface StoreProviderProps {
  config: Config;
  children: React.ReactNode;
}

interface StoreContextValue {
  editorStore: StoreApi<EditorStore>;
  viewsStore: StoreApi<ViewsStore>;
}

export const StoreContext = createContext<StoreContextValue>({
  editorStore: {} as StoreApi<EditorStore>,
  viewsStore: {} as StoreApi<ViewsStore>,
});

export const StoreProvider = ({
  config: { editorComponents, editorConfig, viewsConfig },
  children,
}: StoreProviderProps) => {
  const editorStore = createEditorStore(editorConfig, editorComponents);
  const viewsStore = createViewsStore(viewsConfig);

  const value = useMemo(
    () => ({
      editorStore,
      viewsStore,
    }),
    [editorStore, viewsStore]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

import { useContext } from "react";
import { useStore } from "zustand";

import { StoreContext } from "lib/context/StoreContext";

export const useEditorStore = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing  StoreContext.Provider in the tree");
  return useStore(store.editorStore);
};

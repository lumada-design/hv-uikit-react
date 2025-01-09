import { createContext, useContext } from "react";

export const DialogContext = createContext({ fullScreen: false });

export const useDialogContext = () => useContext(DialogContext);

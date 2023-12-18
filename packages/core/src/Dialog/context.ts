import { createContext, useContext } from "react";

export const DialogContext = createContext({ fullscreen: false });

export const useDialogContext = () => useContext(DialogContext);

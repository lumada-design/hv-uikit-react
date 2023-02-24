import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HvProvider } from "@hitachivantara/uikit-react-core";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HvProvider rootElementId="root">
      <App />
    </HvProvider>
  </React.StrictMode>
);

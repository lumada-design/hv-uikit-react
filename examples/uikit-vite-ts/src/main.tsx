import React from "react";
import ReactDOM from "react-dom/client";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HvProvider>
      <App />
    </HvProvider>
  </React.StrictMode>
);

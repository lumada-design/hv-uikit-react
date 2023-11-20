import React from "react";
import ReactDOM from "react-dom/client";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import { Container } from "./Container";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HvProvider>
      <Container>
        <App />
      </Container>
    </HvProvider>
  </React.StrictMode>
);

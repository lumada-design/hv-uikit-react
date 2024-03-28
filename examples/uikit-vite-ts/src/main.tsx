import React from "react";
import ReactDOM from "react-dom/client";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import { App } from "./App";
import { Container } from "./Container";

import "virtual:uno.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HvProvider>
      <Container>
        <App />
      </Container>
    </HvProvider>
  </React.StrictMode>,
);

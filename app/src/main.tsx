import { Suspense } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "virtual:uno.css";

const root = createRoot(document.getElementById("hv-root")!);

root.render(
  <Suspense fallback>
    <App />
  </Suspense>
);

import { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("hv-root") as HTMLElement
);

root.render(
  <Suspense fallback>
    <App />
  </Suspense>
);

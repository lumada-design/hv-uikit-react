import { createBrowserRouter, RouterProvider } from "react-router";
import {
  ds5,
  ds6,
  HvProvider,
  pentahoPlus,
} from "@hitachivantara/uikit-react-core";

import { routes } from "./routes";

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

const App = () => {
  return (
    <HvProvider
      themes={[ds5, ds6, pentahoPlus]}
      theme="ds6"
      rootElementId="hv-root"
      cssTheme="scoped"
    >
      <RouterProvider router={router} />
    </HvProvider>
  );
};

export default App;

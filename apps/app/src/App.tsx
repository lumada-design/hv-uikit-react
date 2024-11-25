import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ds3,
  ds5,
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
      themes={[ds3, ds5, pentahoPlus]}
      theme="pentahoPlus"
      rootElementId="hv-root"
      cssTheme="scoped"
    >
      <RouterProvider router={router} />
    </HvProvider>
  );
};

export default App;

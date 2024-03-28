import { RouterProvider } from "react-router-dom";
import {
  ds3,
  ds5,
  HvProvider,
  pentahoPlus,
} from "@hitachivantara/uikit-react-core";

import { router } from "~/lib/routes";

import "~/lib/i18n";

const App = () => {
  return (
    <HvProvider
      themes={[ds3, ds5, pentahoPlus]}
      theme="ds5"
      rootElementId="hv-root"
      cssTheme="scoped"
    >
      <RouterProvider router={router} />
    </HvProvider>
  );
};

export default App;

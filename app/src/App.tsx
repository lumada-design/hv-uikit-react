import { RouterProvider } from "react-router-dom";
import { ds3, ds5, HvProvider } from "@hitachivantara/uikit-react-core";

import "~/lib/i18n";
import { router } from "~/lib/routes";

const App = () => {
  return (
    <HvProvider
      themes={[ds3, ds5]}
      theme="ds5"
      rootElementId="hv-root"
      cssTheme="scoped"
    >
      <RouterProvider router={router} />
    </HvProvider>
  );
};

export default App;

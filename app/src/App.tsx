import { RouterProvider } from "react-router-dom";
import { ds3, ds5, HvProvider } from "@hitachivantara/uikit-react-core";

import "~/lib/i18n";
import { router } from "~/lib/routes";
import Sidebar from "~/generator/Sidebar";
import GeneratorProvider from "~/generator/GeneratorContext";

const App = () => {
  return (
    <div className="flex flex-row rounded-circle">
      <HvProvider
        themes={[ds3, ds5]}
        theme="ds5"
        rootElementId="hv-root"
        cssTheme="scoped"
      >
        <GeneratorProvider>
          <div className="flex-1 overflow-y-auto">
            <RouterProvider router={router} />
          </div>
          <Sidebar />
        </GeneratorProvider>
      </HvProvider>
    </div>
  );
};

export default App;

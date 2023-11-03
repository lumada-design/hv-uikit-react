import { ds3, ds5, HvProvider, theme } from "@hitachivantara/uikit-react-core";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";

import "~/lib/i18n";
import Content from "~/generator/Content";
import Sidebar from "~/generator/Sidebar";
import GeneratorProvider from "~/generator/GeneratorContext";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        borderRadius: theme.radii.circle,
      }}
    >
      <HvProvider
        themes={[ds3, ds5]}
        theme="ds5"
        rootElementId="hv-root"
        cssTheme="scoped"
      >
        <HvVizProvider>
          <GeneratorProvider>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
              }}
            >
              <Content />
            </div>
            <Sidebar />
          </GeneratorProvider>
        </HvVizProvider>
      </HvProvider>
    </div>
  );
};

export default App;

import { ds3, ds5, HvProvider, theme } from "@hitachivantara/uikit-react-core";
import "lib/i18n";
import Content from "generator/Content";
import { Sidebar } from "generator/Sidebar";
import GeneratorProvider from "generator/GeneratorContext";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        borderRadius: theme.radii.circle,
      }}
    >
      <HvProvider themes={[ds3, ds5]} theme="ds5">
        <GeneratorProvider>
          <div style={{ flexGrow: 1 }}>
            <Content />
          </div>
          <Sidebar />
        </GeneratorProvider>
      </HvProvider>
    </div>
  );
};

export default App;

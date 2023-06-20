import { HvAppShell } from "@hitachivantara/app-shell";

const App = () => {
  return (
    <HvAppShell
      configUrl={`${window.location.origin}${APP_BASE_PATH}app-shell.config.json`}
    />
  );
};

export default App;

import { BrowserRouter as Router } from "react-router-dom";
import { HvProvider, useTheme } from "@hitachivantara/uikit-react-core";
import { Container } from "components/common";
import { NavigationProvider } from "lib/context/NavigationContext";
import navigation from "lib/navigation";
import Routes from "lib/routes";
import { GeneratorContext } from "./GeneratorContext";
import { useContext } from "react";

const Content = () => {
  const { selectedMode } = useTheme();
  const { customTheme } = useContext(GeneratorContext);

  return (
    <div id="gen-root">
      <Router>
        <HvProvider
          rootElementId="gen-root"
          themes={[customTheme]}
          colorMode={selectedMode}
        >
          <NavigationProvider navigation={navigation}>
            <Container maxWidth="xl">
              <Routes />
            </Container>
          </NavigationProvider>
        </HvProvider>
      </Router>
    </div>
  );
};

export default Content;

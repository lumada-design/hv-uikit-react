import { BrowserRouter as Router } from "react-router-dom";
import { HvProvider, useTheme } from "@hitachivantara/uikit-react-core";
import { Container } from "components/common";
import { NavigationProvider } from "lib/context/NavigationContext";
import navigation from "lib/navigation";
import Routes from "lib/routes";
import { useContext } from "react";
import { Tutorial } from "pages/Instructions/Tutorial";
import { GeneratorContext } from "./GeneratorContext";

const Content = () => {
  const { selectedMode } = useTheme();
  const {
    customTheme,
    open,
    tutorialOpen,
    setTutorialOpen,
    currentStep,
    setCurrentStep,
  } = useContext(GeneratorContext);

  return (
    <div
      id="gen-root"
      style={{
        width: open ? "calc(100% - 390px)" : "100%",
        backgroundColor:
          customTheme?.colors?.modes[selectedMode]?.backgroundColor,
      }}
    >
      <Router>
        <HvProvider
          classNameKey="gen-root"
          rootElementId="gen-root"
          cssTheme="scoped"
          themes={[customTheme]}
          colorMode={selectedMode}
          cssBaseline="none" // the main provider already applies the baseline styles globally
        >
          <NavigationProvider navigation={navigation}>
            {tutorialOpen && (
              <Tutorial
                setTutorialOpen={setTutorialOpen}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            )}
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

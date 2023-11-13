import { Outlet } from "react-router-dom";
import { HvProvider, useTheme } from "@hitachivantara/uikit-react-core";

import { Container } from "~/components/common/Container";
import { Tutorial } from "~/components/common/Tutorial";
import { useGeneratorContext } from "~/generator/GeneratorContext";
import { NavigationProvider } from "~/lib/context/NavigationContext";
import navigation from "~/lib/navigation";

const Content = () => {
  const { selectedMode } = useTheme();
  const {
    customTheme,
    open,
    tutorialOpen,
    setTutorialOpen,
    currentStep,
    setCurrentStep,
  } = useGeneratorContext();

  return (
    <div
      id="gen-root"
      style={{
        width: open ? "calc(100% - 390px)" : "100%",
        backgroundColor:
          customTheme?.colors?.modes?.[selectedMode]?.backgroundColor,
      }}
    >
      <div>
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
              <Outlet />
            </Container>
          </NavigationProvider>
        </HvProvider>
      </div>
    </div>
  );
};

export default Content;

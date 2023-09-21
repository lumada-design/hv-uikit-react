import { Outlet, useLocation } from "react-router-dom";
import { HvProvider, useTheme } from "@hitachivantara/uikit-react-core";

import { Header } from "~/components/common/Header";
import { Container } from "~/components/common/Container";
import { Tutorial } from "~/components/common/Tutorial";
import { useGeneratorContext } from "~/generator/GeneratorContext";
import { NavigationProvider } from "~/lib/context/NavigationContext";
import navigation from "~/lib/navigation";

const Content = () => {
  const { selectedMode } = useTheme();
  const { pathname } = useLocation();

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
      className={`bg-default ${open ? "w-[calc(100%_-_390px)]" : "w-full"}`}
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
              {pathname !== "/dashboard-preview" && <Header />}
              <Outlet />
            </Container>
          </NavigationProvider>
        </HvProvider>
      </div>
    </div>
  );
};

export default Content;

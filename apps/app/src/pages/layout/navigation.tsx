import { Outlet } from "react-router-dom";
import { HvProvider, useTheme } from "@hitachivantara/uikit-react-core";

import { Header } from "~/components/common/Header";
import { Container } from "~/components/common/Container";
import { Tutorial } from "~/components/common/Tutorial";
import GeneratorProvider, {
  useGeneratorContext,
} from "~/generator/GeneratorContext";
import Sidebar from "~/generator/Sidebar";
import { NavigationProvider } from "~/lib/context/navigation";
import navigation from "~/lib/navigation";

/** Navigation layout & provider */
const Navigation = () => {
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
      className={`bg-default ${open ? "w-[calc(100%_-_390px)]" : "w-full"}`}
    >
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
          <Header />
          <Container maxWidth="xl" component="main">
            <Outlet />
          </Container>
        </NavigationProvider>
      </HvProvider>
    </div>
  );
};

/** Navigation + Theme Generator layout & providers */
export const Component = () => (
  <div className="flex flex-row rounded-circle">
    <GeneratorProvider>
      <div className="flex-1 overflow-y-auto">
        <Navigation />
      </div>
      <Sidebar />
    </GeneratorProvider>
  </div>
);

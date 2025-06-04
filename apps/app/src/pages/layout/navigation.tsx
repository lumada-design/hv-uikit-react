import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router";
import { HvProvider, useTheme } from "@hitachivantara/uikit-react-core";

import { Container } from "~/components/Container";
import { Header } from "~/components/Header";
import { Tutorial } from "~/components/Tutorial";
import { NavigationProvider } from "~/context/navigation";
import GeneratorProvider, {
  useGeneratorContext,
} from "~/generator/GeneratorContext";
import Sidebar from "~/generator/Sidebar";

const useRootRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const dashboard = searchParams.get("dashboard");
    if (dashboard != null) {
      navigate(`/dashboard-preview?id=${dashboard}`, { replace: true });
    }
  }, [searchParams, navigate]);
};

/** Navigation layout & provider */
const Navigation = () => {
  const { selectedMode } = useTheme();
  useRootRedirect();

  const { customTheme, open, tutorialOpen } = useGeneratorContext();

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
        <NavigationProvider>
          {tutorialOpen && <Tutorial />}
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

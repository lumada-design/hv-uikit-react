import { Suspense, type ComponentType, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import ServiceManagerProvider from "@hitachivantara/app-shell-services";
import { HvAppShellServicesConfig } from "@hitachivantara/app-shell-shared";

import CustomHooksInitializer from "../../components/CustomHooksInitializer";
import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import { BannerProvider } from "../../providers/BannerProvider";
import { NavigationProvider } from "../../providers/NavigationProvider";
import CombinedProviders from "../../utils/CombinedProviders";
import GenericError from "../GenericError";
import LoadingPage from "../LoadingPage";

interface RootProps {
  providers?: Array<{
    component: ComponentType<{
      children: ReactNode;
    }>;
    config?: Record<string, unknown>;
  }>;
  services?: HvAppShellServicesConfig;
}

const Root = ({ providers, services }: RootProps) => (
  <ErrorBoundary fallback={<GenericError fullPage />}>
    <ServiceManagerProvider config={{ services }}>
      <CombinedProviders providers={providers}>
        <NavigationProvider>
          <BannerProvider>
            <CustomHooksInitializer />
            <Header />
            <Main>
              <Suspense fallback={<LoadingPage />}>
                <Outlet />
              </Suspense>
            </Main>
          </BannerProvider>
        </NavigationProvider>
      </CombinedProviders>
    </ServiceManagerProvider>
  </ErrorBoundary>
);

export default Root;

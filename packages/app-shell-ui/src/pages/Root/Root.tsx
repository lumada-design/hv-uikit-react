import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import CustomHooksInitializer from "../../components/CustomHooksInitializer";
import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import CombinedProviders from "../../lib/utils/CombinedProviders";
import BannerProvider from "../../providers/BannerProvider";
import NavigationProvider from "../../providers/NavigationProvider";
import GenericError from "../GenericError";
import LoadingPage from "../LoadingPage";

interface RootProps {
  providers?: React.ComponentType<{
    children: React.ReactNode;
  }>[];
}

const Root = ({ providers }: RootProps) => (
  <ErrorBoundary fallback={<GenericError fullPage />}>
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
  </ErrorBoundary>
);

export default Root;

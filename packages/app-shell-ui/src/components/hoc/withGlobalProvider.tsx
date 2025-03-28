import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import createI18Next from "../../lib/i18n";
import GenericError from "../../pages/GenericError";
import LayoutProvider from "../../providers/LayoutProvider";
import AppShellProvider from "../AppShellProvider/AppShellProvider";
import GlobalStyles from "../GlobalStyles";
import SnackbarProvider from "../SnackbarProvider";

type WrappedComponentProps<T extends React.ElementType> = React.ComponentType<
  React.ComponentProps<T>
>;

const withGlobalProvider = <T extends React.ElementType>(
  WrappedComponent: WrappedComponentProps<T>,
) => {
  const displayName = WrappedComponent.displayName ?? WrappedComponent.name;

  const { i18n } = createI18Next();

  const ComponentWithGlobalProvider = ({
    ...wrappedProps
  }: React.ComponentProps<T>) => {
    return (
      <HelmetProvider>
        <HvProvider>
          <GlobalStyles />
          <I18nextProvider i18n={i18n}>
            <ErrorBoundary
              key="general"
              fallback={<GenericError fullPage includeFooter={false} />}
            >
              <AppShellProvider
                config={wrappedProps.config}
                configUrl={wrappedProps.configUrl}
              >
                <LayoutProvider>
                  <SnackbarProvider>
                    <WrappedComponent {...wrappedProps} />
                  </SnackbarProvider>
                </LayoutProvider>
              </AppShellProvider>
            </ErrorBoundary>
          </I18nextProvider>
        </HvProvider>
      </HelmetProvider>
    );
  };

  ComponentWithGlobalProvider.displayName = `withGlobalProvider(${displayName})`;

  return ComponentWithGlobalProvider;
};

export default withGlobalProvider;

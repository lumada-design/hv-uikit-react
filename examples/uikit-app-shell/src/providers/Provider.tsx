import React, { Suspense } from "react";
import { I18nextProvider } from "react-i18next";

import useI18nInstance from "lib/i18n";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  const i18n = useI18nInstance();

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export function withProvider<T extends ProviderProps = ProviderProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithProvider = (props: Omit<T, keyof ProviderProps>) => {
    return (
      <Provider>
        <Suspense fallback={null}>
          <WrappedComponent {...(props as T)} />
        </Suspense>
      </Provider>
    );
  };

  ComponentWithProvider.displayName = `withProvider(${displayName})`;

  return ComponentWithProvider;
}

export default Provider;

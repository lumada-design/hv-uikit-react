import React, { Suspense } from "react";

import { HvVizProvider } from "@hitachivantara/uikit-react-viz";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return <HvVizProvider>{children}</HvVizProvider>;
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

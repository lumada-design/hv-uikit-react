import React, { Suspense } from "react";

type ProviderProps = {
  children: React.ReactNode;
};

export function withProvider<T extends ProviderProps = ProviderProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithProvider = (props: Omit<T, keyof ProviderProps>) => {
    return (
      <Suspense fallback={null}>
        <WrappedComponent {...(props as T)} />
      </Suspense>
    );
  };

  ComponentWithProvider.displayName = `withProvider(${displayName})`;

  return ComponentWithProvider;
}

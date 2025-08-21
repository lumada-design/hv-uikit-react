import { ComponentType, ReactElement, ReactNode, useCallback } from "react";

type CombinedProvidersProps = {
  providers:
    | Array<{
        component: ComponentType<{ children: ReactNode }>;
        config?: Record<string, unknown>;
      }>
    | undefined;
  children: ReactNode;
};

const CombinedProviders = ({
  providers,
  children: mainChildren,
}: CombinedProvidersProps) => {
  const Combined = useCallback(
    ({ children }: { children: ReactNode }) => {
      let result = children;

      if (providers && providers.length > 0) {
        result = providers.reduceRight((Acc, { component: Curr, config }) => {
          return <Curr {...config}>{Acc}</Curr>;
        }, children);
      }

      return result as ReactElement;
    },
    [providers],
  );
  return <Combined>{mainChildren}</Combined>;
};

export default CombinedProviders;

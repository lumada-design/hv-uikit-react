import { ComponentType, ReactElement, ReactNode, useCallback } from "react";

type CombinedProvidersProps = {
  providers: ComponentType<{ children: ReactNode }>[] | undefined;
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
        result = providers.reduceRight((Acc, Curr) => {
          return <Curr>{Acc}</Curr>;
        }, children);
      }

      return result as ReactElement;
    },
    [providers],
  );
  return <Combined>{mainChildren}</Combined>;
};

export default CombinedProviders;

import React from "react";

export function useLabels<T>(defaultLabels: Partial<T>, labels: T): T {
  const merged = React.useMemo(() => {
    return { ...defaultLabels, ...labels };
  }, [defaultLabels, labels]);

  return merged;
}

import { useMemo } from "react";

export function useLabels<T>(defaultLabels: T, labels?: Partial<T>): T {
  return useMemo(() => {
    return { ...defaultLabels, ...labels };
  }, [defaultLabels, labels]);
}

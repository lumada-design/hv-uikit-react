/**
 * Async condition HOOK that returns FALSE after a delay
 * Demonstrates async conditions with proper pending state
 * Returns UseConditionResult discriminated union
 */

import { useEffect, useState } from "react";
import type { UseConditionResult } from "@hitachivantara/app-shell-shared";

const useAsyncFalse = (): UseConditionResult => {
  const [isPending, setIsPending] = useState(true);
  const [result, setResult] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setResult(false);
      setIsPending(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Return discriminated union based on state
  if (isPending) {
    return {
      isPending: true,
      error: null,
      result: undefined,
    };
  }

  return {
    isPending: false,
    error: null,
    result: result ?? false,
  };
};

export default useAsyncFalse;

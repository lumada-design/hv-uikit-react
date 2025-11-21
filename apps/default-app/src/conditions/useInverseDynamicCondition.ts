/**
 * Inverse dynamic condition HOOK that changes from TRUE to FALSE after 10 seconds
 * Returns UseConditionResult discriminated union (pending/error/success)
 */

import { useEffect, useState } from "react";
import type { UseConditionResult } from "@hitachivantara/app-shell-shared";

const FLIP_DURATION = 10000; // 10 seconds

// Shared start time across all hook instances
let sharedStartTime: number | null = null;

const useInverseDynamicCondition = (): UseConditionResult => {
  const [isPending, setIsPending] = useState(true);
  const [result, setResult] = useState<boolean>(true);

  useEffect(() => {
    // Initialize shared start time on first mount
    sharedStartTime ??= Date.now();

    // We're no longer pending after initialization
    setIsPending(false);

    // Check if we should flip based on elapsed time
    const checkFlip = () => {
      if (sharedStartTime === null) return;

      const elapsed = Date.now() - sharedStartTime;
      const shouldFlip = elapsed >= FLIP_DURATION;

      if (shouldFlip && result) {
        setResult(false);
      }
    };

    // Check immediately
    checkFlip();

    // Set up interval to check periodically
    const interval = setInterval(checkFlip, 500);

    return () => clearInterval(interval);
  }, [result]);

  // Return discriminated union
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
    result,
  };
};

export default useInverseDynamicCondition;

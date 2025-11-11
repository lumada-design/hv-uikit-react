/**
 * Simple sync condition HOOK that always returns TRUE
 * Returns UseConditionResult discriminated union
 */

import type { UseConditionResult } from "@hitachivantara/app-shell-shared";

const useAlwaysTrue = (): UseConditionResult => {
  return {
    isPending: false,
    error: null,
    result: true,
  };
};

export default useAlwaysTrue;

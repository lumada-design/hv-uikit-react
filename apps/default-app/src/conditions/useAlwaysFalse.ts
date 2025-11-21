/**
 * Simple sync condition HOOK that always returns FALSE
 * Returns UseConditionResult discriminated union
 */

import type { UseConditionResult } from "@hitachivantara/app-shell-shared";

const useAlwaysFalse = (): UseConditionResult => {
  return {
    isPending: false,
    error: null,
    result: false,
  };
};

export default useAlwaysFalse;

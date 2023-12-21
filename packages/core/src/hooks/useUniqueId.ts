import * as React from "react"; // this can be optimized when react 17 support is dropped

import uniqueId from "lodash/uniqueId";

/** Credit: https://github.com/radix-ui/primitives/blob/main/packages/react/id/src/id.tsx
 *  Modified slightly to suit our purposes.
 */
// We `toString()` to prevent bundlers from trying to `import { useId } from 'react';`
const useReactId = (React as any)["useId".toString()] || (() => undefined);

export const useUniqueId = (
  deterministicId?: string,
  idPrefix?: string
): string => {
  const [id, setId] = React.useState<string | undefined>(useReactId());

  React.useMemo(
    () => {
      if (!id) setId(uniqueId(idPrefix));
    }, // loadash unique id can be removed when react 17 support is dropped
    [id, idPrefix]
  );

  return deterministicId || (idPrefix ? idPrefix + id : id ?? "");
};

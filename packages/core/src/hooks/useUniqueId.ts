import * as React from "react"; // this can be optimized when react 17 support is dropped

/** Credit: https://github.com/radix-ui/primitives/blob/main/packages/react/id/src/id.tsx
 *  Modified slightly to suit our purposes.
 */
// We `toString()` to prevent bundlers from trying to `import { useId } from 'react';`
const useReactId = (React as any)["useId".toString()] || (() => undefined);
let count = 0;

export const useUniqueId = (
  deterministicId?: string,
  idPrefix?: string
): string => {
  const [id, setId] = React.useState<string | undefined>(useReactId());

  React.useLayoutEffect(() => {
    // eslint-disable-next-line no-plusplus
    if (!deterministicId) setId((reactId) => reactId ?? String(count++));
  }, [deterministicId, idPrefix]);

  return deterministicId || (idPrefix ? idPrefix + id : id ?? "");
};

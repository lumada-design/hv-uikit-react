import { useMemo } from "react";
import uniqueId from "lodash/uniqueId";

export default (id?: string, idPrefix?: string) =>
  useMemo(() => id || uniqueId(idPrefix), [id, idPrefix]);

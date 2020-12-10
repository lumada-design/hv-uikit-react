import { useState } from "react";
import uniqueId from "lodash/uniqueId";

export default (id, idPrefix) => useState(id || uniqueId(idPrefix))[0];

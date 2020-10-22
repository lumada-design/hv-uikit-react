/* eslint-disable no-console, react-hooks/exhaustive-deps */
import { useEffect } from "react";

const useDeprecated = (name, message = "") => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`${name} is deprecated.`, message);
    }
  }, []);
};

export default useDeprecated;

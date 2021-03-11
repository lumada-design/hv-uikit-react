import { useCallback, useState } from "react";

export const setColor = (condition) => (condition ? "atmo5" : undefined);

export const getSafePage = (inPage, page, pages) =>
  Number.isNaN(inPage) ? page : Math.min(Math.max(inPage, 0), pages - 1);

export const usePageInput = (initialPage) => {
  const [page, setPage] = useState(initialPage + 1);

  const handleChange = useCallback((evt, newPage) => setPage(newPage), []);

  return [page, handleChange];
};

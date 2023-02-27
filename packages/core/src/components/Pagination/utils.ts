import { useCallback, useState } from "react";

export const setColor = (condition: boolean): string | undefined =>
  condition ? "atmo5" : undefined;

export const getSafePage = (
  inPage: number,
  page: number,
  pages: number
): number =>
  Number.isNaN(inPage) ? page : Math.min(Math.max(inPage, 0), pages - 1);

export const usePageInput = (initialPage: number) => {
  const [page, setPage] = useState<number>(initialPage + 1);

  const handleChange = useCallback(
    (evt, newPage: number) => setPage(newPage),
    []
  );

  return [page, handleChange] as const;
};

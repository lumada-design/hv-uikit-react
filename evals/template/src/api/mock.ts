/** Helpers for the in-memory mock APIs in this folder. */

export interface PageParams {
  /** Zero-based page index. */
  page?: number;
  pageSize?: number;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export const delay = (ms = 250) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function paginate<T>(
  all: T[],
  { page = 0, pageSize = 10 }: PageParams,
): Page<T> {
  return {
    items: all.slice(page * pageSize, (page + 1) * pageSize),
    total: all.length,
    page,
    pageSize,
  };
}

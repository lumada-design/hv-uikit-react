import { useEffect, useState } from "react";

import {
  ErrorBase,
  UseAsyncErrorResult,
  UseAsyncPendingResult,
  UseAsyncResult,
  UseAsyncSuccessResult,
} from "../types/async";

type UseAsyncOptions<
  TData,
  TDataProp extends string,
  TPending extends TData | undefined,
> = {
  dataProp?: TDataProp;
  pendingData?: TPending;
};

/**
 * Generic hook that runs an async factory and returns a discriminated result.
 *
 * Responsibilities:
 *  - Invoke the provided `promiseFactory` when mounted (and when it changes).
 *  - Track pending state, resolved data and typed error.
 *  - Prevent state updates after unmount to avoid memory leaks (see {@link https://reactjs.org/docs/hooks-effect.html | React's useEffect}).
 *
 * Returns a {@link UseAsyncResult} which is a discriminated union:
 *  - {@link UseAsyncPendingResult} — pending: `isPending: true`, `error: null`, and the pending data property.
 *  - {@link UseAsyncSuccessResult} — success: `isPending: false`, `error: null`, and the resolved data property.
 *  - {@link UseAsyncErrorResult} — error: `isPending: false`, `error: TError`, and the data property set to `undefined`.
 *
 * Type references:
 *  - Error type: {@link ErrorBase}
 *  - Result shapes: {@link UseAsyncResult}, {@link UseAsyncPendingResult}, {@link UseAsyncSuccessResult}, {@link UseAsyncErrorResult}
 *
 * Defaults:
 *  - `dataProp` = `"data"`
 *  - `pendingData` = `undefined`
 *
 * Example:
 *  - `useAsync(() => fetchServices(), { pendingData: [] })`
 */
export function useAsync<
  TData,
  TError extends ErrorBase = Error,
  TDataProp extends string = "data",
  TPending extends TData | undefined = undefined,
>(
  promiseFactory: () => Promise<TData>,
  options?: UseAsyncOptions<TData, TDataProp, TPending>,
): UseAsyncResult<TData, TError, TDataProp, TPending> {
  const dataProp = (options?.dataProp ?? "data") as TDataProp;
  const pendingData = options?.pendingData as TPending;

  const [data, setData] = useState<TData | undefined>(
    pendingData as TData | undefined,
  );
  const [error, setError] = useState<TError | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    let isMounted = true;

    promiseFactory()
      .then((result) => {
        if (isMounted) {
          setData(() => result);
          setError(null);
          setIsPending(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err as TError);
          setData(undefined);
          setIsPending(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [promiseFactory]);

  if (error) {
    return {
      isPending: false,
      error,
      [dataProp]: undefined,
    } as UseAsyncErrorResult<TData, TError, TDataProp, TPending>;
  }

  if (isPending) {
    return {
      isPending: true,
      error: null,
      [dataProp]: pendingData,
    } as UseAsyncPendingResult<TData, TError, TDataProp, TPending>;
  }

  return {
    isPending: false,
    error: null,
    [dataProp]: data,
  } as UseAsyncSuccessResult<TData, TError, TDataProp, TPending>;
}

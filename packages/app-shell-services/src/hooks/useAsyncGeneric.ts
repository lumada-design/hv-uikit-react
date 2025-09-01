import { useEffect, useRef, useState } from "react";

import {
  ErrorBase,
  UseAsyncErrorResult,
  UseAsyncPendingResult,
  UseAsyncResult,
  UseAsyncSuccessResult,
} from "../types/async";

/**
 * Generic async hook with full control over data property name and pending data.
 * TODO ideally called useAsync, but making optional arguments and defaults work with generics is tricky...
 *
 * @param promiseFactory Function that returns a Promise
 * @param dataProp Custom property name for the data
 * @param pendingData Initial data while pending
 * @returns UseAsyncResult with custom data property name
 */
export function useAsyncGeneric<
  TData,
  TError extends ErrorBase = Error,
  TDataProp extends string = "data",
  TDataPending extends TData | undefined = undefined,
>(
  promiseFactory: () => Promise<TData>,
  dataProp: TDataProp,
  pendingData: TDataPending,
): UseAsyncResult<TData, TError, TDataProp, TDataPending> {
  const [data, setData] = useState<TData | undefined>(pendingData);
  const [error, setError] = useState<TError | null>(null);
  const [isPending, setIsPending] = useState(true);

  const promiseFactoryRef = useRef(promiseFactory);
  const pendingDataRef = useRef(pendingData);

  useEffect(() => {
    let isMounted = true;

    // Reset state when starting a new async operation
    setError(null);
    setIsPending(true);
    setData(pendingDataRef.current);

    promiseFactoryRef
      .current()
      .then((result) => {
        if (isMounted) {
          setData(result);
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
  }, []);

  if (error) {
    return {
      isPending: false,
      error,
      [dataProp]: undefined,
    } as UseAsyncErrorResult<TData, TError, TDataProp, TDataPending>;
  }

  if (isPending) {
    return {
      isPending: true,
      error: null,
      [dataProp]: pendingData,
    } as UseAsyncPendingResult<TData, TError, TDataProp, TDataPending>;
  }

  return {
    isPending: false,
    error: null,
    [dataProp]: data,
  } as UseAsyncSuccessResult<TData, TError, TDataProp, TDataPending>;
}

/**
 * Convenience hook for async data fetching with "data" property.
 *
 * @param promiseFactory Function that returns a Promise
 * @param initialData Initial data while pending
 * @returns UseAsyncResult with "data" property
 */
export function useAsyncData<TData, TError extends ErrorBase = Error>(
  promiseFactory: () => Promise<TData>,
  initialData?: TData,
): UseAsyncResult<TData, TError, "data", TData | undefined> {
  return useAsyncGeneric(promiseFactory, "data", initialData);
}

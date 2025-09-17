export type PropertyWithName<K extends string, T> = {
  [P in K]: T;
};

export type ErrorBase = NonNullable<unknown>;

export type UseAsyncBaseResult<
  TData,
  TError extends ErrorBase = Error,
  TDataProp extends string = "data",
  TDataPending extends TData | undefined = undefined,
> = {
  isPending: boolean;
  error: TError | null;
} & PropertyWithName<TDataProp, TDataPending>;

export type UseAsyncResult<
  TData,
  TError extends ErrorBase = Error,
  TDataProp extends string = "data",
  TDataPending extends TData | undefined = undefined,
> =
  | UseAsyncPendingResult<TData, TError, TDataProp, TDataPending>
  | UseAsyncErrorResult<TData, TError, TDataProp, TDataPending>
  | UseAsyncSuccessResult<TData, TError, TDataProp, TDataPending>;

export type UseAsyncPendingResult<
  TData,
  TError extends ErrorBase = Error,
  TDataProp extends string = "data",
  TDataPending extends TData | undefined = undefined,
> = UseAsyncBaseResult<TData, TError, TDataProp> & {
  isPending: true;
  error: null;
} & {
  [P in TDataProp]: TDataPending;
};

export type UseAsyncErrorResult<
  TData,
  TError extends ErrorBase = Error,
  TDataProp extends string = "data",
  TDataPending extends TData | undefined = undefined,
> = UseAsyncBaseResult<TData, TError, TDataProp, TDataPending> & {
  isPending: false;
  error: TError;
} & {
  [P in TDataProp]: undefined;
};

export type UseAsyncSuccessResult<
  TData,
  TError extends ErrorBase = Error,
  TDataProp extends string = "data",
  TDataPending extends TData | undefined = undefined,
> = UseAsyncBaseResult<TData, TError, TDataProp, TDataPending> & {
  isPending: false;
  error: null;
} & {
  [P in TDataProp]: TData;
};

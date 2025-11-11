export type ConditionElementType =
  | "view"
  | "menu"
  | "headerAction"
  | "provider"
  | "service";

export type HvAppShellConditionConfig = {
  bundle: string;
  config?: Record<string, unknown>;
};

export type ConditionErrorBase = NonNullable<unknown>;

export type UseConditionBaseResult<TError extends ConditionErrorBase = Error> =
  {
    isPending: boolean;
    error: TError | null;
    result: boolean | undefined;
  };

export type UseConditionResult<TError extends ConditionErrorBase = Error> =
  | UseConditionPendingResult<TError>
  | UseConditionErrorResult<TError>
  | UseConditionSuccessResult<TError>;

export type UseConditionPendingResult<
  _TError extends ConditionErrorBase = Error,
> = {
  isPending: true;
  error: null;
  result: undefined;
};

export type UseConditionErrorResult<TError extends ConditionErrorBase = Error> =
  {
    isPending: false;
    error: TError;
    result: false;
  };

export type UseConditionSuccessResult<
  _TError extends ConditionErrorBase = Error,
> = {
  isPending: false;
  error: null;
  result: boolean;
};

/**
 * Metadata for a condition in the config
 * Used to track condition locations and associate them with stable hook indices
 */
export type ConditionMetadata = {
  /** Stable index for this condition across all evaluations */
  hookIndex: number;
  /** Path to the condition in config (e.g., "views[0].conditions[0]") - for debugging */
  path: string;
  /** Bundle path for the condition hook module */
  bundle: string;
  /** Type of element this condition belongs to */
  elementType: ConditionElementType;
  /** Path to the element containing this condition (e.g., "views[0]") - for debugging */
  elementPath: string;
  /** Unique key of the element ($key property) for fast lookup */
  elementKey: string | number;
};

import { useEffect, useMemo, useRef } from "react";

export interface DynamicHooksEvaluatorProps<
  THook extends (...args: any[]) => any,
  TResult,
> {
  /** Array of hook functions to call */
  hooks: THook[];
  /** Callback invoked with the results after hooks are evaluated */
  onEvaluate: (results: TResult[]) => void;
  /** Parameters to pass to each hook */
  params?: Parameters<THook>;
  /** Optional children to render (evaluator can be invisible) */
  children?: React.ReactNode;
}

const DynamicHooksEvaluatorInner = <
  THook extends (...args: any[]) => any,
  TResult,
>({
  hooks,
  onEvaluate,
  params = [] as any,
  children,
}: DynamicHooksEvaluatorProps<THook, TResult>) => {
  const results: TResult[] = [];

  for (const hook of hooks) {
    const result = hook(...params) as TResult;
    results.push(result);
  }

  const hasNotifiedRef = useRef(false);

  // Notify parent with the results (only once per mount)
  useEffect(() => {
    if (!hasNotifiedRef.current) {
      hasNotifiedRef.current = true;
      onEvaluate(results);
    }
  });

  return children ? <>{children}</> : null;
};

export const DynamicHooksEvaluator = <
  THook extends (...args: any[]) => any,
  TResult = ReturnType<THook>,
>({
  hooks,
  params,
  onEvaluate,
  children,
}: DynamicHooksEvaluatorProps<THook, TResult>) => {
  const componentKey = useMemo(
    () => `hooks-${hooks.length}-${Date.now()}`,
    [hooks],
  );

  return (
    <DynamicHooksEvaluatorInner
      key={componentKey}
      hooks={hooks}
      params={params}
      onEvaluate={onEvaluate}
    >
      {children}
    </DynamicHooksEvaluatorInner>
  );
};

export default DynamicHooksEvaluator;

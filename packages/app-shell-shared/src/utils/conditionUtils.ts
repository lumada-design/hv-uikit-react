import type {
  ConditionMetadata,
  HvAppShellConditionConfig,
} from "../types/condition";

export const processElementConditions = (
  conditions: HvAppShellConditionConfig[] | undefined,
  elementPath: string,
  elementType: ConditionMetadata["elementType"],
  elementKey: string | number,
  hookIndexRef: { current: number },
  metadata: ConditionMetadata[],
): void => {
  if (!conditions) {
    return;
  }

  for (let condIdx = 0; condIdx < conditions.length; condIdx++) {
    const cond = conditions[condIdx];
    metadata.push({
      hookIndex: hookIndexRef.current++,
      path: `${elementPath}.conditions[${condIdx}]`,
      bundle: cond.bundle,
      elementType,
      elementPath,
      elementKey,
    });
  }
};

/**
 * Reconcile filtered configs to preserve object references when content hasn't changed
 * This optimization reduces React re-renders by maintaining referential equality
 */
export const reconcileFilteredConfig = <T>(
  newFiltered: T,
  prevFiltered: T | undefined,
): T => {
  if (!prevFiltered) {
    return newFiltered;
  }

  // Primitive values or null - return new if different
  if (
    newFiltered === null ||
    prevFiltered === null ||
    typeof newFiltered !== "object" ||
    typeof prevFiltered !== "object"
  ) {
    return newFiltered === prevFiltered ? prevFiltered : newFiltered;
  }

  if (Array.isArray(newFiltered) && Array.isArray(prevFiltered)) {
    return reconcileArrays(newFiltered, prevFiltered) as T;
  }

  return reconcileObjects(newFiltered, prevFiltered) as T;
};

/**
 * Reconcile arrays, preserving references where elements are deeply equal
 */
const reconcileArrays = <T>(newArr: T[], prevArr: T[]): T[] => {
  if (newArr.length !== prevArr.length) {
    return newArr;
  }

  // Early return if same reference
  if (newArr === prevArr) {
    return prevArr;
  }

  let hasChanges = false;

  // First pass: detect if any changes exist
  for (let i = 0; i < newArr.length; i++) {
    const reconciledItem = reconcileFilteredConfig(newArr[i], prevArr[i]);
    if (reconciledItem !== prevArr[i]) {
      hasChanges = true;
      break; // Early exit
    }
  }

  if (!hasChanges) {
    return prevArr;
  }

  // Second pass: build reconciled array
  const reconciledArr: T[] = [];
  for (let i = 0; i < newArr.length; i++) {
    reconciledArr.push(reconcileFilteredConfig(newArr[i], prevArr[i]));
  }

  return reconciledArr;
};

/**
 * Reconcile objects, preserving references where properties are deeply equal
 */
const reconcileObjects = <T extends Record<string, any>>(
  newObj: T,
  prevObj: T,
): T => {
  const newKeys = Object.keys(newObj);
  const prevKeys = Object.keys(prevObj);

  if (newKeys.length !== prevKeys.length) {
    return newObj;
  }

  // Check if all keys match
  const keysMatch = newKeys.every((key) => key in prevObj);
  if (!keysMatch) {
    return newObj;
  }

  // Early return if same reference
  if (newObj === prevObj) {
    return prevObj;
  }

  let hasChanges = false;

  // First pass: detect if any changes exist
  for (const key of newKeys) {
    const reconciledValue = reconcileFilteredConfig(newObj[key], prevObj[key]);
    if (reconciledValue !== prevObj[key]) {
      hasChanges = true;
      break; // Early exit
    }
  }

  if (!hasChanges) {
    return prevObj;
  }

  // Second pass: build reconciled object
  const reconciledObj: Record<string, any> = {};
  for (const key of newKeys) {
    reconciledObj[key] = reconcileFilteredConfig(newObj[key], prevObj[key]);
  }

  return reconciledObj as T;
};

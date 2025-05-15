function stripNullish<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      if (value != null && value !== "" && value !== false) {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );
}

/**
 * Utility that merges the `style` prop (`styleProp`) with an external `style` object.
 *
 * The external object accepts CSS vars (`--var`) and removes empty style entries.
 */
export const mergeStyles = (
  styleProp: React.CSSProperties | undefined,
  styles: Record<string, any>,
): React.CSSProperties => ({ ...stripNullish(styles), ...styleProp });

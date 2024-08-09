// TODO: remove
export {
  createClasses,
  type ExtractNames,
} from "@hitachivantara/uikit-react-shared";

function stripNullish<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      if (value != null && value !== "") {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );
}

/** @internal */
export const mergeStyles = (
  styleProp: React.CSSProperties | undefined,
  styles: Record<string, any>,
): React.CSSProperties => ({ ...stripNullish(styles), ...styleProp });

// This type allows to pass undetermined extra props to components
export type HvExtraProps = { [key: string]: any };

// This type allows to pass undetermined extra props to components recursively
export type HvExtraDeepProps<T> = {
  [P in keyof T]: T[P] & HvExtraProps;
} & HvExtraProps;

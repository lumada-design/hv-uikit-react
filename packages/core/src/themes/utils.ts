import type { CSSObject } from "@emotion/serialize";

export type CSSClasses<Props> = Partial<Omit<Props, "classes">> & {
  classes?: Props extends { classes?: Record<string, any> }
    ? { [K in keyof NonNullable<Props["classes"]>]: CSSObject }
    : never;
};

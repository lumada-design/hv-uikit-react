
export function hvStringFallback(value: string | undefined | null): string;
export function hvNumberFallback(value: number | undefined | null): number | "—";
export function hvNodeFallback(
  value: React.ReactNode | undefined | null | "—"
): NonNullable<React.ReactNode>;

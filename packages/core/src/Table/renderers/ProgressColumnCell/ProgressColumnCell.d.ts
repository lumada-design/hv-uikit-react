export interface HvProgressColumnCellProps {
  /**
   * Current value of the bar.
   */
  partial: number;
  /**
   * Maximum value of the bar.
   */
  total: number;
  /**
   * The color of the bar.
   */
  color?: "primary" | "secondary";
}

export function normalizeProgressBar(value: number, max: number): number;

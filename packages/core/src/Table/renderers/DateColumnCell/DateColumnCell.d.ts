export interface HvDateColumnCellProp {
  /**
   * The date's text representation format.
   */
  dateFormat?: string;
  /**
   * Date to render.
   */
  date?: string;
}

export default function HvDateColumnCellProp(props: HvDateColumnCellProp): JSX.Element | null;

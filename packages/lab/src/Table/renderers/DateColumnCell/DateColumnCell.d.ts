export interface HvDateColumnCellProp {
  /**
   * Date to render.
   */
  dateFormat?: string;
  /**
   * The timezone used to format the date.
   */
  date: string;
}

export default function HvDateColumnCellProp(props: HvDateColumnCellProp): JSX.Element | null;

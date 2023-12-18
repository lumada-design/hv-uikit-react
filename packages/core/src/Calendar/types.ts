export interface DateRangeProp {
  startDate: Date;
  endDate?: Date;
}

export type VisibilitySelectorActions =
  | "previous_month"
  | "next_month"
  | "previous_year"
  | "next_year"
  | "month"
  | "month_year";

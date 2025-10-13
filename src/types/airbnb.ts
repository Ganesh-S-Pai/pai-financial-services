export interface DateInfo {
  type: "single" | "range";
  start?: string; // only for range
  end: string;
}

export interface Statement {
  id: string;
  transaction: "Expense" | "Booking";
  type: string;
  date_info: DateInfo;
  nights: number;
  amount: number | string;
  remark: string;
  created_user: string;
  updated_user: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseSummary {
  electricity: number;
  house_keeping: number;
  internet: number;
  miscellaneous: number;
  rent: number;
  total: number;
  water: number;
}

export interface BookingSummary {
  airbnb_total: number;
  direct_total: number;
  total: number;
}

export interface Summary {
  bookings: BookingSummary;
  expenses: ExpenseSummary;
  net_balance: number;
}

export interface Airbnb {
  items: Statement[];
  limit: number;
  page: number;
  summary: Summary;
  total: number;
  total_pages: number;
}

export enum AirbnbPanels {
    Total,
    Bookings,
    Expenses
}

export enum AirbnbTabs {
    Overview,
    Statement
}
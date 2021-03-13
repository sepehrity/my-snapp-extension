import type { Rides } from './Rides';

export type SummaryKeys = keyof Rides['_summary'];

export type RateObject = {
  count: number;
  sum: number;
};

export type SummaryItemType = {
  description?: string;
  message: number | string;
  unit: string;
};

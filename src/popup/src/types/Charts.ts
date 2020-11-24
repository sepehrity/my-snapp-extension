import type { Rides, CountPriceObject, CountPrice } from './Rides';
import type { PickByValue } from './helpers';

export type BarChartsObject = PickByValue<
  Omit<Rides, '_cars'>,
  CountPriceObject
>;

export type BarChartTypes = keyof BarChartsObject | '_cars' | '_years';

export type BarDataType = {
  [key in keyof BarChartsObject]?: string;
};

export type BarChartData = BarDataType & CountPrice;

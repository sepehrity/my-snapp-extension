import type { BarChartTypes } from 'types/Charts';
import type { RidesInfo } from 'types/Rides';

import {
  convertDistanceToTehranShomal,
  convertHoursToDay,
  formattedNumber,
  getPrice,
} from './number';

const SNAPP_BIKE = 'اسنپ بایک';

const isSnappBike = (name: string) => name === SNAPP_BIKE;

const formatCarName = (name: string) => `ماشین ${name}`;

const getRidesCount = (count: React.ReactText) => {
  return `${count} سفر`;
};

const getTypeFormat: {
  [type in BarChartTypes]: { format: (value: string) => string };
} = {
  _hours: { format: (value) => `ساعت ${value}` },
  _weeks: { format: (value) => `${value}` },
  _days: { format: (value) => `روز ${value}ام` },
  _months: { format: (value) => `${value} ماه` },
  _years: { format: (value) => `سال ${value}` },
  _cars: {
    format: (value) => {
      return isSnappBike(value) ? SNAPP_BIKE : formatCarName(value);
    },
  },
};

const equaltsToTehranShomal = (value: number) => {
  return `معادل با پیمودن ${value} بار مسیر تهران-شمال`;
};

const equalsToDay = (value: number) => {
  return `معادل با ${value} روز`;
};

export const getTotalInfoFormat: {
  [type in RidesInfo]: {
    format: (
      value: number
    ) => { description: string; message: number | string; unit: string };
  };
} = {
  count: {
    format: (value) => {
      return { description: '', message: formattedNumber(value), unit: 'سفر' };
    },
  },
  prices: {
    format: (value) => {
      return {
        description: '',
        message: getPrice(Number(value), false),
        unit: 'تومان',
      };
    },
  },
  durations: {
    format: (value) => {
      return {
        description: `${equalsToDay(convertHoursToDay(Number(value)))}`,
        message: formattedNumber(value, 2),
        unit: 'ساعت',
      };
    },
  },
  distances: {
    format: (value) => {
      return {
        description: `${equaltsToTehranShomal(
          convertDistanceToTehranShomal(Number(value))
        )}`,
        message: formattedNumber(value),
        unit: 'کیلومتر',
      };
    },
  },
};

export const getTooltipMessage = (
  count: React.ReactText,
  price: number,
  value: string,
  type: BarChartTypes
) => {
  return `${getTypeFormat[type].format(value)} | ${getPrice(
    price
  )} (${getRidesCount(count)})`;
};

export const getInfoMessage = (value: number, type: RidesInfo) => {
  return getTotalInfoFormat[type].format(value);
};

export const getStartAndEndDate = (start: string, end: string) =>
  `${start}   تا   ${end}`;

export const mapToPersian: { [type in BarChartTypes]: string } = {
  _hours: 'ساعت‌های شبانه‌روز',
  _weeks: 'روزهای هفته',
  _days: 'روزهای ماه',
  _months: 'ماه‌های سال',
  _years: 'سال',
  _cars: 'مدل ماشین',
};

export const getAnalyzeText = (hasMapboxToken: boolean) =>
  hasMapboxToken ? 'بزن بریم (با نقشه)' : 'بزن بریم (بدون نقشه)';

export const getExportName: { [type in BarChartTypes]: string } = {
  _hours: 'Hours',
  _weeks: 'Weeks',
  _days: 'Days',
  _months: 'Months',
  _years: 'Years',
  _cars: 'Cars',
};

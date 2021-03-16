import type { BarChartTypes } from 'types/Charts';
import type { RateObject, SummaryItemType, SummaryKeys } from 'types/Summary';

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

type GetTypeFormatType = { format: (value: string) => string };

const getTypeFormat: {
  [type in BarChartTypes]: GetTypeFormatType;
} = {
  _hours: { format: (value) => `ساعت ${value}` },
  _weeks: { format: (value) => `${value}` },
  _days: { format: (value) => `روز ${value}ام` },
  _months: { format: (value) => `${value} ماه` },
  _years: { format: (value) => `سال ${value}` },
  _types: { format: (value) => `${value}` },
  _rates: { format: (value) => `${value} امتیاز` },
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

const getFormattedSummary: {
  [type in SummaryKeys]: {
    format: (value: number) => SummaryItemType;
  };
} = {
  count: {
    format: (value) => {
      return { message: formattedNumber(value), unit: 'سفر' };
    },
  },
  prices: {
    format: (value) => {
      return {
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

export const getSummaryItemMessage = (value: number, type: SummaryKeys) => {
  return getFormattedSummary[type].format(value);
};

export const getRateSummaryMessage = ({
  count,
  sum,
}: RateObject): SummaryItemType => {
  return {
    description: `${count} سفر`,
    message: formattedNumber(sum / count, 2),
    unit: 'امتیاز',
  };
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
  _rates: 'امتیاز سفر',
  _types: 'نوع سرویس',
};

export const getExportName: { [type in BarChartTypes]: string } = {
  _hours: 'Hours',
  _weeks: 'Weeks',
  _days: 'Days',
  _months: 'Months',
  _years: 'Years',
  _cars: 'Cars',
  _rates: 'Rates',
  _types: 'ServiceTypes',
};

export const getErrorMessage: { [statusCode: string]: string } = {
  401: 'خیلی وقته بهم سر نزدی! باید دوباره وارد حساب اسنپت بشی.',
};

export const getLastRideDateMessage = (lastEndRange: string) => {
  return `تاریخ آخرین سفر: ${lastEndRange}`;
};

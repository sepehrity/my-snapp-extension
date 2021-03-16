import type { SummaryKeys } from 'types/Summary';

export const week_pattern = [
  'شنبه',
  'یک‌شنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنج‌شنبه',
  'جمعه',
];

const MONTHS = {
  فروردین: 'Farvardin',
  اردیبهشت: 'Ordibehesht',
  خرداد: 'Khordad',
  تیر: 'Tir',
  مرداد: 'Mordad',
  شهریور: 'Shahrivar',
  مهر: 'Mehr',
  آبان: 'Aban',
  آذر: 'Azar',
  دی: 'Dey',
  بهمن: 'Bahman',
  اسفند: 'Esfand',
};

export const data_pattern = ['total'];

export const summary_pattern: SummaryKeys[] = ['count', 'prices'];

export const month_pattern = Object.keys(MONTHS);

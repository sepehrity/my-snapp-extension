import type { RideTimeDate } from 'types/RideTimeDate';

import { englishNumber } from 'utils/number';

export const isCanceledRide = (title: string) => title.includes('لغو');

const MORNING = 'صبح ';
const DAY_BREAK = 'بامداد';
const DAY_PATTERN = new RegExp(/(صبح |بامداد)/, 'g');

const REPLACED = {
  [DAY_BREAK]: '',
  [MORNING]: '',
};

export const getWeekDay = (title: string) => {
  const replaced = title.replace(
    DAY_PATTERN,
    (m) => REPLACED[m as keyof typeof REPLACED]
  );
  return replaced.split(' ')[1];
};

const PRIDDE = 'پراید';
const PRIDE_PATTERN = new RegExp(/(پراید|پرايد)/, 'i');

const DATE_OF_RIDE = 'تاریخ سفر';
const START_TIME_OF_RIDE = 'زمان شروع سفر';
const BIKE = 'اسنپ بایک';

export const getCarName = (vehicle: string) => {
  if (PRIDE_PATTERN.test(vehicle)) {
    return PRIDDE;
  }
  if (vehicle === 'Bike') {
    return BIKE;
  }
  return vehicle;
};

export const getTimeAndDateOfRide = (
  rows: Array<{ title: string; description: string }>
) => {
  return rows.reduce(
    (tmp: RideTimeDate, { title, description }) => {
      // calculate hour
      if (title === START_TIME_OF_RIDE) {
        const [hour] = englishNumber(description).split(':');
        tmp.hour = parseInt(hour);
      }

      // calculate date
      if (title === DATE_OF_RIDE) {
        const [day, month, year] = description.split(' ');

        tmp.day = englishNumber(day);
        tmp.month = month;
        tmp.year = englishNumber(year);
        tmp.rideTime = `${day} ${month} ${year}`;
      }

      return tmp;
    },
    {
      hour: 0,
      day: '',
      month: '',
      year: '',
      rideTime: '',
    }
  );
};

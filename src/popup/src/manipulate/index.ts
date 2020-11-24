import get from 'lodash.get';
import set from 'lodash.set';
import setWith from 'lodash.setwith';

import type { RidesData } from 'types/Rides';
import type { RideHistoryResponse } from 'types/RideHistoryResponse';

import {
  getCarName,
  getTimeAndDateOfRide,
  getWeekDay,
  isCanceledRide,
} from './helpers';

export const convertedData = (response: RideHistoryResponse[]) => {
  return response.reduce(
    (
      tmp: RidesData,
      { destination, final_price, origin, rows, title, vehicle_model }
    ) => {
      // check cancelled rides
      if (isCanceledRide(title)) {
        return tmp;
      }

      const { year, rideTime, ...dates } = getTimeAndDateOfRide(rows);

      // calculate count of rides
      set(
        tmp,
        ['total', '_summary', 'count'],
        get(tmp, ['total', '_summary', 'count'], 0) + 1
      );
      set(
        tmp,
        [year, '_summary', 'count'],
        get(tmp, [year, '_summary', 'count'], 0) + 1
      );

      // calculate prices (Toman)
      const price = final_price / 10;
      set(
        tmp,
        ['total', '_summary', 'prices'],
        get(tmp, ['total', '_summary', 'prices'], 0) + price
      );
      set(
        tmp,
        [year, '_summary', 'prices'],
        get(tmp, [year, '_summary', 'prices'], 0) + price
      );

      /* 
      // calculate durations (hour) [not the exact time of ride duration]
      const duration = getDuration(created_at, updated_at);
      set(
        tmp,
        ["total", "_summary", "durations"],
        get(tmp, ["total", "_summary", "durations"], 0) + duration
      );
      set(
        tmp,
        [year, "_summary", "durations"],
        get(tmp, [year, "_summary", "durations"], 0) + duration
      );
      */

      /* 
      // calculate durations (hour) [deprecated due Snapp API changes] ¯\_(ツ)_/¯
      const duration = Number(real_duration) / 60;
      set(
        tmp,
        ["total", "_summary", "durations"],
        get(tmp, ["total", "_summary", "durations"], 0) + duration
      );
      set(
        tmp,
        [year, "_summary", "durations"],
        get(tmp, [year, "_summary", "durations"], 0) + duration
      );
      */

      /*
      // calculate distances (KM) [deprecated due Snapp API changes] ¯\_(ツ)_/¯
      const distance = estimated_distance / 1000;
      set(
        tmp,
        ["total", "_summary", "distances"],
        get(tmp, ["total", "_summary", "distances"], 0) + distance
      );
      set(
        tmp,
        [year, "_summary", "distances"],
        get(tmp, [year, "_summary", "distances"], 0) + distance
      );
      */

      // calculate startTime
      set(tmp, ['total', '_ranges', 'start'], rideTime);
      set(tmp, [year, '_ranges', 'start'], rideTime);

      // calculate endTime
      if (get(tmp, ['total', '_ranges', 'end']) === undefined) {
        set(tmp, ['total', '_ranges', 'end'], rideTime);
      }
      if (get(tmp, [year, '_ranges', 'end']) === undefined) {
        set(tmp, [year, '_ranges', 'end'], rideTime);
      }

      // calculate cars
      const car = getCarName(vehicle_model);
      set(
        tmp,
        ['total', '_cars', car, 'count'],
        get(tmp, ['total', '_cars', car, 'count'], 0) + 1
      );
      set(
        tmp,
        ['total', '_cars', car, 'price'],
        get(tmp, ['total', '_cars', car, 'price'], 0) + price
      );
      set(
        tmp,
        [year, '_cars', car, 'count'],
        get(tmp, [year, '_cars', car, 'count'], 0) + 1
      );
      set(
        tmp,
        [year, '_cars', car, 'price'],
        get(tmp, [year, '_cars', car, 'price'], 0) + price
      );

      // calculate weeks
      const week = getWeekDay(title);
      set(
        tmp,
        ['total', '_weeks', week, 'count'],
        get(tmp, ['total', '_weeks', week, 'count'], 0) + 1
      );
      set(
        tmp,
        ['total', '_weeks', week, 'price'],
        get(tmp, ['total', '_weeks', week, 'price'], 0) + price
      );
      set(
        tmp,
        [year, '_weeks', week, 'count'],
        get(tmp, [year, '_weeks', week, 'count'], 0) + 1
      );
      set(
        tmp,
        [year, '_weeks', week, 'price'],
        get(tmp, [year, '_weeks', week, 'price'], 0) + price
      );

      // calculate each date range with total price
      Object.keys(dates).forEach((key) => {
        const k = `_${key}s`;
        const v = dates[key];
        setWith(
          tmp,
          ['total', k, v, 'count'],
          get(tmp, ['total', k, v, 'count'], 0) + 1,
          Object
        );
        setWith(
          tmp,
          ['total', k, v, 'price'],
          get(tmp, ['total', k, v, 'price'], 0) + price,
          Object
        );
        setWith(
          tmp,
          [year, k, v, 'count'],
          get(tmp, [year, k, v, 'count'], 0) + 1,
          Object
        );
        setWith(
          tmp,
          [year, k, v, 'price'],
          get(tmp, [year, k, v, 'price'], 0) + price,
          Object
        );
      });

      // calculate points
      if (tmp.total._points === undefined) {
        set(tmp, ['total', '_points'], { origin: [], destination: [] });
      }
      tmp.total._points.origin.push({
        lat: origin.lat,
        lng: origin.lng,
      });
      tmp.total._points.destination.push({
        lat: destination.lat,
        lng: destination.lng,
      });

      if (tmp[year]._points === undefined) {
        set(tmp, [year, '_points'], { origin: [], destination: [] });
      }
      tmp[year]._points.origin.push({
        lat: origin.lat,
        lng: origin.lng,
      });
      tmp[year]._points.destination.push({
        lat: destination.lat,
        lng: destination.lng,
      });

      return tmp;
    },
    {}
  );
};

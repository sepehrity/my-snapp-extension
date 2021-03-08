import React, { useMemo } from 'react';

import type { CountPriceObject, Rides } from 'types/Rides';
import type { BarChartsObject, BarChartTypes } from 'types/Charts';

import { colors, carColors } from 'utils/colors';
import { getCarsChunks, getSortedPattern } from 'utils/helpers';
import { week_pattern, month_pattern } from 'utils/patterns';

import BarChart from 'components/BarChart';

interface Props {
  data: Rides;
}

const Charts = ({
  data: { _hours, _days, _weeks, _months, _years, _cars, _types },
}: Props) => {
  const BarCharts: BarChartsObject = useMemo(() => {
    return {
      _hours,
      _days,
      _weeks: getSortedPattern(_weeks, week_pattern),
      _months: getSortedPattern(_months, month_pattern),
      _types,
      ...(_years && { _years }),
    };
  }, [_hours, _days, _weeks, _months, _types, _years]);

  const CarCharts: CountPriceObject[] = useMemo(
    () => getCarsChunks(getSortedPattern(_cars, [], 'count')),
    [_cars]
  );

  return (
    <>
      {Object.keys(BarCharts).map((type, index) => {
        const chart_data = BarCharts[type];
        return (
          <BarChart
            key={type}
            color={colors[index]}
            type={type}
            data={Object.keys(chart_data).map((key) => {
              const { count, price } = chart_data[key];
              return {
                [type]: key,
                count,
                price,
              };
            })}
          />
        );
      })}
      {CarCharts.map((chart_data, index) => {
        const type: BarChartTypes = '_cars';
        return (
          <BarChart
            key={`${type}_${index}`}
            color={carColors[index]}
            type={type}
            data={Object.keys(chart_data).map((key) => {
              const { count, price } = chart_data[key];
              return {
                [type]: key,
                count,
                price,
              };
            })}
          />
        );
      })}
    </>
  );
};

export default Charts;

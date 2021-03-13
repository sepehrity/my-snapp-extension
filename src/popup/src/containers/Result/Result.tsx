import React, { ReactText, useCallback, useMemo, useState } from 'react';
import setWith from 'lodash.setwith';

import type { Rides, RidesData } from 'types/Rides';

import constants from 'utils/constants';
import { data_pattern } from 'utils/patterns';

import Charts from 'components/Charts';
import Heatmap from 'components/Heatmap';
import Illustration from 'components/Illustration';
import Link from 'components/Link';
import Summary from 'components/Summary';
import styles from './Result.module.css';

interface Props {
  data: RidesData;
  mapboxToken: string | undefined;
}

const Result = ({ mapboxToken, data }: Props) => {
  const options = useMemo(
    () =>
      Object.keys(data).sort((a, b) => {
        return (
          data_pattern.indexOf(b as string) - data_pattern.indexOf(a as string)
        );
      }),
    [data]
  );
  const [year, setYear] = useState<ReactText>(options[0]);

  const handleSelectYear = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.target instanceof HTMLElement) {
        const year = event.target.dataset.year as string;
        setYear(year);
      }
    },
    []
  );

  const getTotal = useMemo(() => {
    const _years = Object.keys(data).reduce((tmp, year) => {
      if (year === 'total') {
        return tmp;
      }

      const { _summary } = data[year] as Required<Rides>;

      // add _years chart
      setWith(tmp, [year], {
        count: _summary.count,
        price: _summary.prices,
      });

      return tmp;
    }, {});

    data['total']._years = _years;

    return data['total'];
  }, [data]);

  const currentData = useMemo(
    () => (year === 'total' ? getTotal : data[year]),
    [data, year, getTotal]
  );

  return (
    <div className={styles.result}>
      <Summary
        active={year}
        onSelectYear={handleSelectYear}
        ranges={currentData._ranges}
        rates={currentData._rates}
        summary={currentData._summary}
        years={options}
      />
      <Charts data={currentData} />
      {mapboxToken ? (
        <Heatmap accessToken={mapboxToken} points={currentData._points} />
      ) : (
        <div className={styles.placeholder}>
          <Link url="mapboxToken" className={styles.mapboxToken}>
            <span className={styles.hintSetToken}>
              {constants.setMapboxToken}
            </span>
          </Link>
          <Illustration className={styles.blooming} name="blooming" />
        </div>
      )}
    </div>
  );
};

export default Result;

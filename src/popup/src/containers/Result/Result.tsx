import { ReactText, useCallback, useMemo, useState, MouseEvent } from 'react';
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
  rides: RidesData;
  mapboxToken: string | undefined;
}

const Result = ({ mapboxToken, rides }: Props) => {
  const options = useMemo(
    () =>
      Object.keys(rides).sort((a, b) => {
        return (
          data_pattern.indexOf(b as string) - data_pattern.indexOf(a as string)
        );
      }),
    [rides]
  );
  const [year, setYear] = useState<ReactText>(options[0]);

  const handleSelectYear = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement) {
      const year = event.target.dataset.year as string;
      setYear(year);
    }
  }, []);

  const getTotal = useMemo(() => {
    const _years = Object.keys(rides).reduce((tmp, year) => {
      if (year === 'total') {
        return tmp;
      }

      const { _summary } = rides[year] as Required<Rides>;

      // add _years chart
      setWith(tmp, [year], {
        count: _summary.count,
        price: _summary.prices,
      });

      return tmp;
    }, {});

    rides['total']._years = _years;

    return rides['total'];
  }, [rides]);

  const currentData = useMemo(
    () => (year === 'total' ? getTotal : rides[year]),
    [rides, year, getTotal]
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

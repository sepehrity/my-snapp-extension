import { HTMLAttributes, memo, ReactText, MouseEvent } from 'react';

import constants from 'utils/constants';

import styles from './YearSelector.module.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  active: ReactText;
  onSelectYear: (event: MouseEvent<HTMLDivElement>) => void;
  years: ReactText[];
}

const YearSelector = ({ active, onSelectYear, years, ...rest }: Props) => {
  return (
    <div className={styles.yearSelector} {...rest}>
      {years.map((y) => (
        <div
          key={y}
          className={`${styles.item} ${active === y ? styles.itemActive : ''}`}
          data-year={y}
          onClick={onSelectYear}
        >
          {y === 'total' ? constants.total : y}
        </div>
      ))}
    </div>
  );
};

export default memo(YearSelector);

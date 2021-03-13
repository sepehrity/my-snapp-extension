import React, { memo } from 'react';

import type { IconNames } from 'types/IconNames';
import type { SummaryItemType, SummaryKeys } from 'types/Summary';

import Icon from 'components/Icon';
import styles from './SummaryItem.module.css';

type ExtraKeys = 'rate';
type Type = SummaryKeys | ExtraKeys;

type Props = {
  type: Type;
  value: SummaryItemType;
};

const getIconType: { [type in Type]: IconNames } = {
  count: 'car',
  prices: 'money',
  durations: 'clock',
  distances: 'location',
  rate: 'star',
};

const SummaryItem = ({
  type,
  value: { message, unit, description },
}: Props) => {
  return (
    <div className={styles.summaryItem}>
      <div className={styles.icon}>
        <Icon type={getIconType[type]} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <span>{message}</span>
          <span>{unit}</span>
        </div>
        {description && (
          <span className={styles.description}>({description})</span>
        )}
      </div>
    </div>
  );
};

export default memo(SummaryItem);

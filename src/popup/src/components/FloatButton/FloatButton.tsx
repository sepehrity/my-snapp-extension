import React, { memo } from 'react';

import type { IconNames } from 'types/IconNames';

import styles from './FloatButton.module.css';

import Icon from 'components/Icon';

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
  text: string;
  type: IconNames;
};

const FloatButton = ({ text, type, ...rest }: Props) => {
  return (
    <div className={styles.float} {...rest}>
      <Icon
        className={styles.floatIcon}
        color="#fff"
        height="20"
        strokeWidth="2"
        type={type}
        width="20"
      />
      <span className={styles.floatText}>{text}</span>
    </div>
  );
};

export default memo(FloatButton);

import React, { memo } from 'react';

import styles from './ScrollDown.module.css';

const ScrollDown = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.chevron} />
      <span className={styles.chevron} />
      <span className={styles.chevron} />
    </div>
  );
};

export default memo(ScrollDown);

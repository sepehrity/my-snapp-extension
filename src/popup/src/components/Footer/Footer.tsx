import Link from 'components/Link';

import constants from 'utils/constants';

import React, { memo } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Link className={styles.link} url="snappHome">
        {constants.snapp}
      </Link>
      <Link className={styles.link} url="github">
        {constants.github}
      </Link>
      <Link className={styles.link} url="sepehrity">
        {constants.creator}
      </Link>
    </div>
  );
};

export default memo(Footer);

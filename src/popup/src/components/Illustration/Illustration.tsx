import React, { memo } from 'react';

import type { SVGProps } from 'types/SVGProps';
import type { IllustrationNames } from 'types/IllustrationNames';

import Air from './Air';
import Blooming from './Blooming';
import Elements from './Elements';
import styles from './Illustration.module.css';

/*
  source: undraw.co
*/

interface Props extends SVGProps {
  name: IllustrationNames;
}

const getSVG: {
  [icon in IllustrationNames]: React.FunctionComponent<SVGProps>;
} = {
  air: Air,
  blooming: Blooming,
  elements: Elements,
};

const Illustration = ({ name, className, ...rest }: Props) => {
  const SVGElement = getSVG[name];
  return (
    <SVGElement
      className={`${styles.illustration} ${className ? className : ''}`}
      {...rest}
    />
  );
};

export default memo(Illustration);

import React, { memo } from 'react';

import type { IconNames } from 'types/IconNames';
import type { SVGProps } from 'types/SVGProps';

import Calendar from './Calendar';
import Car from './Car';
import Clock from './Clock';
import Download from './Download';
import Location from './Location';
import Money from './Money';
import Token from './Token';
import Twitter from './Twitter';

/*
  color: #00d16f
  source: icons8.com
*/

interface Props extends SVGProps {
  type: IconNames;
}

const getIcon: { [icon in IconNames]: React.FunctionComponent<SVGProps> } = {
  calendar: Calendar,
  car: Car,
  clock: Clock,
  download: Download,
  location: Location,
  money: Money,
  token: Token,
  twitter: Twitter,
};

const Icon = ({ type, className, ...rest }: Props) => {
  const SVGIcon = getIcon[type];
  return <SVGIcon className={className} {...rest} />;
};

export default memo(Icon);

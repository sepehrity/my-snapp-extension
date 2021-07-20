import { DetailedHTMLProps, InputHTMLAttributes, memo } from 'react';

import type { IconNames } from 'types/IconNames';

import Icon from 'components/Icon';
import styles from './Input.module.css';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  icon: IconNames;
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  label?: string;
}

const Input = ({ id, icon, type, label, ...rest }: Props) => {
  return (
    <div className={styles.input}>
      {label && <label htmlFor={id}>{label}</label>}
      <input className={styles.input} id={id} type={type} {...rest} />
      <Icon className={styles.svgIcon} type={icon} />
    </div>
  );
};

export default memo(Input);

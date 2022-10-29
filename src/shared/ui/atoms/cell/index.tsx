import { ButtonHTMLAttributes, ReactElement } from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';

interface CellProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  cover: ReactElement;
  icon: ReactElement;
  active: boolean;
}

export const Cell = ({ cover, icon, active, ...props }: CellProps) => {
  return (
    <button
      {...props}
      className={classNames(styles.cell, active && styles.active)}
    >
      <div className={styles.front}>{cover}</div>
      <div className={styles.back}>{icon}</div>
    </button>
  );
};

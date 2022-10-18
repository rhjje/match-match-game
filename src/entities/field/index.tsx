import classNames from 'classnames';
import { useState } from 'react';
import { Christmas } from '@shared/ui';
import { Cell } from '@shared/ui';
import styles from './styles.module.scss';

interface FieldProps {
  size: 16 | 20 | 24 | 30 | 36;
}

export const Field = ({ size }: FieldProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className={classNames(styles.field, styles[`size${size}`])}>
      <Cell
        onClick={() => setActive((prev) => !prev)}
        cover={<Christmas.House />}
        icon={<Christmas.Bird />}
        active={active}
      />
    </div>
  );
};

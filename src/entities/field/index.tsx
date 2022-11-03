import classNames from 'classnames';
import { useStore, useGate } from 'effector-react';

import { Cell, Covers } from '@shared/ui';

import { fieldModel } from '@model';

import styles from './styles.module.scss';

interface FieldProps {
  size: 16 | 25 | 36;
}

export const Field = ({ size }: FieldProps) => {
  useGate(fieldModel.FieldGate, { size });

  const fieldElements = useStore(fieldModel.$fieldElements);

  return (
    <div className={classNames(styles.field, styles[`size${size}`])}>
      {fieldElements.map(({ id, icon, open, disabled }) => {
        if (!icon) {
          return <div key={id} />;
        }

        const Icon = icon;
        return (
          <Cell
            key={id}
            onClick={() => fieldModel.toggleCellState(id)}
            cover={disabled ? <Icon /> : <Covers.Question />}
            icon={<Icon />}
            active={open}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};

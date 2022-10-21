import classNames from 'classnames';
import { Christmas, Covers } from '@shared/ui';
import { Cell } from '@shared/ui';
import { useUnit } from 'effector-react';
import { useGate } from 'effector-react';
import { fieldModel } from '@model';
import styles from './styles.module.scss';

interface FieldProps {
  size: 16 | 20 | 24 | 30 | 36;
}

export const Field = ({ size }: FieldProps) => {
  useGate(fieldModel.FieldGate, { size });

  const fieldElements = useUnit(fieldModel.$fieldElements);

  return (
    <div className={classNames(styles.field, styles[`size${size}`])}>
      {fieldElements.map(({ id, icon, state }) => {
        const Icon = icon;
        return (
          <Cell
            key={id}
            onClick={() => fieldModel.toggleCellState(id)}
            cover={<Covers.Question />}
            icon={<Icon />}
            active={state}
          />
        );
      })}
    </div>
  );
};

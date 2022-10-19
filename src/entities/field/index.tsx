import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { Christmas, IconProps } from '@shared/ui';
import { Cell } from '@shared/ui';
import styles from './styles.module.scss';

interface FieldProps {
  size: 16 | 20 | 24 | 30 | 36;
}

export const Field = ({ size }: FieldProps) => {
  const [active, setActive] = useState(false);
  const [elements, setElements] = useState<
    (({ size, ...props }: IconProps) => JSX.Element)[]
  >([]);

  useEffect(() => {
    const values = Object.values(Christmas);
    const arrayField: (({ size, ...props }: IconProps) => JSX.Element)[] =
      Array(size);
    const arrayOfIndexes = Array(size)
      .fill(null)
      .map((_, i) => i);

    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * arrayOfIndexes.length);
      arrayField[arrayOfIndexes[randomIndex]] = values[Math.floor(i / 2)];

      arrayOfIndexes.splice(randomIndex, 1);
    }

    setElements(arrayField);
  }, [size]);

  return (
    <div className={classNames(styles.field, styles[`size${size}`])}>
      {elements.map((item) => {
        const Icon = item;
        return (
          <Cell
            onClick={() => setActive((prev) => !prev)}
            cover={<Christmas.House />}
            icon={<Icon />}
            active={active}
          />
        );
      })}
    </div>
  );
};

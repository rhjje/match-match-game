import { useState } from 'react';

import { useUnit } from 'effector-react';

import { InfoCard } from '@entities/info-card';
import { Field } from '@entities/field';

import { Button, MultiButton } from '@shared/ui';

import { fieldModel } from '@model';

import styles from './styles.module.scss';

const options = [
  { label: '4x4', value: 16 },
  { label: '5x5', value: 25 },
  { label: '6x6', value: 36 },
];

export const GamePage = () => {
  const [fieldSize, setFieldSize] = useState(options[0].value);

  const pairsMatched = useUnit(fieldModel.$matchedPairs);
  const totalMoves = useUnit(fieldModel.$totalMoves);

  return (
    <div className={styles.game}>
      <div className={styles.info}>
        <InfoCard
          title="Pairs matched"
          currentCount={pairsMatched}
          endCounter={Math.floor(fieldSize / 2)}
        />
        <InfoCard title="Total moves" currentCount={totalMoves} />
      </div>

      <div className={styles.fieldWrapper}>
        <Field size={fieldSize} />
      </div>

      <div className={styles.controls}>
        <Button
          className={styles.button}
          onClick={() => fieldModel.startNewGame()}
        >
          New Game
        </Button>

        <MultiButton
          title="Click to change the size of the field"
          options={options}
          onChangeValue={({ value }) => setFieldSize(value)}
        >
          5x5
        </MultiButton>
      </div>
    </div>
  );
};

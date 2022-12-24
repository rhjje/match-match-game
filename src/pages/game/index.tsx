import { useUnit } from 'effector-react';

import { InfoCard } from '@entities/info-card';
import { Field } from '@entities/field';

import { useLocalStorage } from '@shared/lib/hooks';
import { Button, MultiButton, MultiButtonOption } from '@shared/ui';

import { fieldModel } from '@model';

import styles from './styles.module.scss';

const options = [
  { label: '4x4', value: 16 },
  { label: '5x5', value: 25 },
  { label: '6x6', value: 36 },
];

export const GamePage = () => {
  const [fieldSize, setFieldSize] = useLocalStorage<MultiButtonOption>(
    'field-size',
    options[0],
  );

  const pairsMatched = useUnit(fieldModel.$matchedPairs);
  const totalMoves = useUnit(fieldModel.$totalMoves);

  return (
    <div className={styles.game}>
      <div className={styles.info}>
        <InfoCard
          title="Pairs matched"
          currentCount={pairsMatched}
          endCounter={Math.floor(fieldSize.value / 2)}
        />
        <InfoCard title="Total moves" currentCount={totalMoves} />
      </div>

      <div className={styles.fieldWrapper}>
        <Field size={fieldSize.value} />
      </div>

      <div className={styles.controls}>
        <Button
          className={styles.button}
          onClick={() => fieldModel.startNewGame()}
          disabled={!totalMoves}
        >
          New Game
        </Button>

        <MultiButton
          title="Click to change the size of the field"
          options={options}
          defaultOption={fieldSize}
          onChangeValue={(value) => setFieldSize(value)}
        >
          5x5
        </MultiButton>
      </div>
    </div>
  );
};

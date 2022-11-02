import { useUnit } from 'effector-react';

import { InfoCard } from '@entities/info-card';
import { Field } from '@entities/field';

import { Button } from '@shared/ui';

import { fieldModel } from '@model';

import styles from './styles.module.scss';

export const GamePage = () => {
  const pairsMatched = useUnit(fieldModel.$matchedPairs);
  const totalMoves = useUnit(fieldModel.$totalMoves);

  return (
    <div className={styles.game}>
      <div className={styles.info}>
        <InfoCard
          title="Pairs matched"
          currentCount={pairsMatched}
          endCounter={16 / 2}
        />
        <InfoCard title="Total moves" currentCount={totalMoves} />
      </div>

      <div className={styles.fieldWrapper}>
        <Field size={16} />
      </div>

      <Button
        className={styles.button}
        onClick={() => fieldModel.startNewGame()}
      >
        New Game
      </Button>
    </div>
  );
};

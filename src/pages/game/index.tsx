import { useUnit } from 'effector-react';

import { Field } from '@entities/field';

import { Button } from '@shared/ui';

import { fieldModel } from '@model';

import styles from './styles.module.scss';

export const GamePage = () => {
  const pairsMatched = useUnit(fieldModel.$pairsMatched);
  const totalMoves = useUnit(fieldModel.$totalMoves);

  return (
    <div className={styles.game}>
      <div className={styles.info}>
        <div className={styles.column}>
          Pairs matched {pairsMatched}/{16 / 2}
        </div>
        <div className={styles.column}>Total moves {totalMoves}</div>
        <div className={styles.column}></div>
      </div>
      <Field size={16} />
      <div className={styles.buttons}>
        <Button onClick={() => fieldModel.startNewGame()}>New Game</Button>
      </div>
    </div>
  );
};

import { useUnit } from 'effector-react';

import { InfoCard } from '@entities/info-card';
import { Field } from '@entities/field';

import { useLocalStorage } from '@shared/lib/hooks';
import { Button, Select, SelectOption } from '@shared/ui';
import { food, thanksgivingDay } from '@shared/lib/assets';

import { fieldModel } from '@model';

import styles from './styles.module.scss';

const optionsFieldSize = [
  { label: '4x4', value: 16 },
  { label: '5x5', value: 25 },
  { label: '6x6', value: 36 },
];

const optionsImages = [
  { label: 'Food', value: food },
  { label: 'Thanksgiving Day', value: thanksgivingDay },
];

export const GamePage = () => {
  const [fieldSize, setFieldSize] = useLocalStorage<SelectOption<number>>(
    'field-size',
    optionsFieldSize[0],
  );
  const [images, setImages] = useLocalStorage<
    SelectOption<Record<string, string>>
  >('images', optionsImages[0]);

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
        <Field size={fieldSize.value} images={images.value} />
      </div>

      <div className={styles.controls}>
        <Button
          title="Start a new game"
          className={styles.button}
          onClick={() => fieldModel.startNewGame()}
          disabled={!totalMoves}
        >
          New Game
        </Button>

        <div className={styles.rightColumn}>
          <Select
            title="Change images"
            options={optionsImages}
            defaultOption={images}
            onChangeValue={(value) => setImages(value)}
          />

          <Select
            title="Change the size of the field"
            options={optionsFieldSize}
            defaultOption={fieldSize}
            onChangeValue={(value) => setFieldSize(value)}
          />
        </div>
      </div>
    </div>
  );
};

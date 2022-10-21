import { createEvent, createStore, sample } from 'effector';
import { Christmas, IconProps } from '@shared/ui';
import { createGate } from 'effector-react';
import { v4 as uuidv4 } from 'uuid';

interface FieldGateProps {
  size: number;
}

interface FieldElementsI {
  id: string;
  icon: ({ size, ...props }: IconProps) => JSX.Element;
  state: boolean;
}

const FieldGate = createGate<FieldGateProps>();

const toggleCellState = createEvent<string>();

const $fieldElements = createStore<FieldElementsI[]>([]);

sample({
  clock: FieldGate.open,
  fn: ({ size }) => {
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

    return arrayField.map((icon) => ({
      id: uuidv4(),
      icon,
      state: false,
    }));
  },
  target: $fieldElements,
});

sample({
  source: $fieldElements,
  clock: toggleCellState,
  fn: (source, clock) =>
    source.map((item) =>
      item.id === clock ? { ...item, state: !item.state } : item,
    ),
  target: $fieldElements,
});

export const model = {
  FieldGate,
  toggleCellState,
  $fieldElements,
};

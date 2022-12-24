import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { debounce, reset } from 'patronum';
import { v4 as uuidv4 } from 'uuid';

import { food } from '@shared/lib/assets';

interface FieldGateProps {
  size: number;
}

interface FieldElementsI {
  id: string;
  title: string;
  icon: string | null;
  open: boolean;
  disabled: boolean;
}

const FieldGate = createGate<FieldGateProps>();

const toggleCellState = createEvent<string>();
const resetOpenCells = createEvent();
const startNewGame = createEvent();

const $fieldElements = createStore<FieldElementsI[]>([]);
const $matchedPairs = createStore(0);
const $totalMoves = createStore(0);

const debouncedResetOpenCells = debounce({
  source: resetOpenCells,
  timeout: 1500,
});

/**
 * Set new game
 */
sample({
  source: FieldGate.state,
  clock: [FieldGate.state, startNewGame],
  filter: ({ size }) => Boolean(size),
  fn: ({ size }) => {
    const finalSize = size - (size % 2);

    const arrayOfIcons = Object.keys(food)
      .map((key) => ({
        title: key,
        icon: food[key as keyof typeof food],
      }))
      .sort(() => Math.random() - 0.5);

    const field: Pick<FieldElementsI, 'title' | 'icon'>[] = Array(finalSize);

    const arrayOfIndexes = Array(finalSize)
      .fill(null)
      .map((_, i) => i);

    for (let i = 0; i < finalSize; i++) {
      const randomIndex = Math.floor(Math.random() * arrayOfIndexes.length);
      field[arrayOfIndexes[randomIndex]] = arrayOfIcons[Math.floor(i / 2)];

      arrayOfIndexes.splice(randomIndex, 1);
    }

    const fieldElements = field.map((icon) => ({
      ...icon,
      id: uuidv4(),
      disabled: false,
      open: false,
    }));

    if (size % 2) {
      fieldElements.splice(Math.floor(size / 2), 0, {
        title: 'empty',
        icon: null,
        id: uuidv4(),
        disabled: false,
        open: false,
      });
    }

    return fieldElements;
  },
  target: $fieldElements,
});

/**
 * Toggle cell state
 */
sample({
  source: $fieldElements,
  clock: toggleCellState,
  filter: (source) => source.filter((item) => item.open).length < 2,
  fn: (source, clock) => {
    return source.map((item) =>
      item.id === clock ? { ...item, open: true } : item,
    );
  },
  target: $fieldElements,
});

/**
 * Reset open cells
 */
sample({
  clock: $fieldElements,
  filter: (source) => source.filter((item) => item.open).length === 2,
  target: resetOpenCells,
});

sample({
  source: $fieldElements,
  clock: debouncedResetOpenCells,
  fn: (source) => {
    const openCells = source.filter((cell) => cell.open);

    return openCells[0].title === openCells[1].title
      ? source.map((cell) =>
          cell.open ? { ...cell, open: false, disabled: true } : cell,
        )
      : source.map((cell) => (cell.open ? { ...cell, open: false } : cell));
  },
  target: $fieldElements,
});

/**
 * Set $matchedPairs
 */
sample({
  clock: $fieldElements,
  filter: (clock) => !(clock.filter((cell) => cell.disabled).length % 2),
  fn: (clock) => clock.filter((cell) => cell.disabled).length / 2,
  target: $matchedPairs,
});

/**
 * Set $totalMoves
 */
sample({
  source: $totalMoves,
  clock: debouncedResetOpenCells,
  fn: (source) => source + 1,
  target: $totalMoves,
});

/**
 * Reset stores when starting a new game
 */
reset({
  clock: startNewGame,
  target: $totalMoves,
});

export const model = {
  FieldGate,
  toggleCellState,
  startNewGame,
  $fieldElements,
  $matchedPairs,
  $totalMoves,
};

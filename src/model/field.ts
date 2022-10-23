import { createEvent, createStore, sample } from 'effector';
import { Christmas, IconProps } from '@shared/ui';
import { createGate } from 'effector-react';
import { debounce, reset } from 'patronum';
import { v4 as uuidv4 } from 'uuid';

interface FieldGateProps {
  size: number;
}

interface FieldElementsI {
  id: string;
  title: string;
  icon: ({ size, ...props }: IconProps) => JSX.Element;
  open: boolean;
  disabled: boolean;
}

const FieldGate = createGate<FieldGateProps>();

const toggleCellState = createEvent<string>();
const resetOpenCells = createEvent();
const startNewGame = createEvent();
const addMove = createEvent();

const $fieldElements = createStore<FieldElementsI[]>([]);
const $pairsMatched = createStore(0);
const $totalMoves = createStore(0);

const debouncedResetOpenCells = debounce({
  source: resetOpenCells,
  timeout: 1500,
});

sample({
  source: FieldGate.state,
  clock: [FieldGate.open, startNewGame],
  fn: ({ size }) => {
    const arrayOfIcons = Object.keys(Christmas)
      .map((key) => ({
        title: key,
        icon: Christmas[key as keyof typeof Christmas],
      }))
      .sort(() => Math.random() - 0.5);

    const field: Pick<FieldElementsI, 'title' | 'icon'>[] = Array(size);

    const arrayOfIndexes = Array(size)
      .fill(null)
      .map((_, i) => i);

    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * arrayOfIndexes.length);
      field[arrayOfIndexes[randomIndex]] = arrayOfIcons[Math.floor(i / 2)];

      arrayOfIndexes.splice(randomIndex, 1);
    }

    return field.map((icon) => ({
      ...icon,
      id: uuidv4(),
      disabled: false,
      open: false,
    }));
  },
  target: $fieldElements,
});

sample({
  source: $fieldElements,
  clock: toggleCellState,
  filter: (source) => source.filter((item) => item.open).length < 2,
  fn: (source, clock) => {
    return source.map((item) =>
      item.id === clock ? { ...item, open: !item.open } : item,
    );
  },
  target: $fieldElements,
});

sample({
  clock: $fieldElements,
  filter: (source) => source.filter((item) => item.open).length === 2,
  target: [resetOpenCells, addMove],
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

sample({
  clock: $fieldElements,
  filter: (clock) => !(clock.filter((cell) => cell.disabled).length % 2),
  fn: (clock) => clock.filter((cell) => cell.disabled).length / 2,
  target: $pairsMatched,
});

sample({
  source: $totalMoves,
  clock: addMove,
  fn: (source) => source + 1,
  target: $totalMoves,
});

reset({
  clock: startNewGame,
  target: $totalMoves,
});

export const model = {
  FieldGate,
  toggleCellState,
  startNewGame,
  $fieldElements,
  $pairsMatched,
  $totalMoves,
};
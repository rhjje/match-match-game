import { useState } from 'react';

import { Button, ButtonProps } from '@shared/ui/atoms';

export interface MultiButtonOption<T> {
  label: string;
  value: T;
}

interface MultiButtonProps<T> extends Omit<ButtonProps, 'children'> {
  options: MultiButtonOption<T>[];
  defaultOption: MultiButtonOption<T>;
  onChangeValue: (value: MultiButtonOption<T>) => void;
}

export const MultiButton = <T,>({
  options,
  defaultOption,
  onChangeValue,
  ...props
}: MultiButtonProps<T>) => {
  const [currentOption, setCurrentOption] =
    useState<MultiButtonOption<T>>(defaultOption);

  const handleChangeValue = () => {
    const currentIndex = options.findIndex(
      (option) => option.value === currentOption.value,
    );

    const nextOption =
      currentIndex + 1 < options.length
        ? options[currentIndex + 1]
        : options[0];

    setCurrentOption(nextOption);
    onChangeValue(nextOption);
  };

  return (
    <Button {...props} onClick={handleChangeValue}>
      {currentOption.label}
    </Button>
  );
};

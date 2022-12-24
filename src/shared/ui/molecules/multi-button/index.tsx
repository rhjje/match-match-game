import { useState } from 'react';

import { Button, ButtonProps } from '@shared/ui/atoms';

export interface MultiButtonOption {
  label: string;
  value: number;
}

interface MultiButtonProps extends ButtonProps {
  options: MultiButtonOption[];
  defaultOption: MultiButtonOption;
  onChangeValue: (value: MultiButtonOption) => void;
}

export const MultiButton = ({
  options,
  defaultOption,
  onChangeValue,
  ...props
}: MultiButtonProps) => {
  const [currentOption, setCurrentOption] =
    useState<MultiButtonOption>(defaultOption);

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

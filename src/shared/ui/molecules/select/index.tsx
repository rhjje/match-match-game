import { useState, useRef } from 'react';

import classNames from 'classnames';

import { textStyles } from '@shared/lib/styles-modules';
import { Icons } from '@shared/ui/icons';
import { Button, ButtonProps } from '@shared/ui/atoms';
import { useOutsideClick } from '@shared/lib/hooks';

import styles from './styles.module.scss';

export interface SelectOption<T> {
  label: string;
  value: T;
}

interface SelectProps<T> extends Omit<ButtonProps, 'children'> {
  options: SelectOption<T>[];
  defaultOption: SelectOption<T>;
  onChangeValue: (value: SelectOption<T>) => void;
}

export const Select = <T,>({
  options,
  defaultOption,
  onChangeValue,
  className,
  ...props
}: SelectProps<T>) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const [currentOption, setCurrentOption] =
    useState<SelectOption<T>>(defaultOption);

  const handleChangeValue = (option: SelectOption<T>) => {
    setCurrentOption(option);
    onChangeValue(option);
    setOpen(false);
  };

  useOutsideClick(selectRef, () => setOpen(false));

  return (
    <div ref={selectRef} className={classNames(styles.select, className)}>
      <Button
        {...props}
        className={styles.button}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{currentOption.label}</span>
        <Icons.Arrow
          className={classNames(styles.arrow, open && styles.arrowUp)}
        />
      </Button>

      {open && (
        <ul className={styles.selectList} data-cy="select-options">
          {options.map((option) => (
            <li
              className={styles.selectListItem}
              key={option.label}
              data-cy={`select-option-value-${option.value}`}
            >
              <button
                className={classNames(styles.label, textStyles.text13Regular)}
                onClick={() => handleChangeValue(option)}
              >
                <span>{option.label}</span>
                {currentOption.label === option.label && (
                  <Icons.Check className={styles.check} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

import { useState, useRef } from 'react';

import classNames from 'classnames';

import { Icons } from '@shared/ui/icons';
import { Button, ButtonProps } from '@shared/ui/atoms';
import { useOutsideClick } from '@shared/lib/hooks';

import styles from './styles.module.scss';

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
  className,
  ...props
}: MultiButtonProps<T>) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const [currentOption, setCurrentOption] =
    useState<MultiButtonOption<T>>(defaultOption);

  const handleChangeValue = (option: MultiButtonOption<T>) => {
    setCurrentOption(option);
    onChangeValue(option);
    setOpen(false);
  };

  useOutsideClick(selectRef, () => setOpen(false));

  return (
    <div ref={selectRef} className={styles.select}>
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
        <ul className={styles.selectList}>
          {options.map((option) => (
            <li className={styles.selectListItem} key={option.label}>
              <button
                className={styles.label}
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

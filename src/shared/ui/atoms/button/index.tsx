import { ButtonHTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';

import { textStyles } from '@shared/lib/styles-modules';

import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(styles.button, textStyles.text13Regular, className)}
      type="button"
    >
      {children}
    </button>
  );
};

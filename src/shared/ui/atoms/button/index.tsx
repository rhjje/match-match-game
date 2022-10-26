import { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { textStyles } from '@shared/lib/styles-modules';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(styles.button, textStyles.buttonText)}
      type="button"
    >
      {children}
    </button>
  );
};

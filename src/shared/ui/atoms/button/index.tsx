import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.button} type="button">
      {children}
    </button>
  );
};

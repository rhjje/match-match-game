import { memo } from 'react';

import classNames from 'classnames';

import { textStyles } from '@shared/lib/styles-modules';

import styles from './styles.module.scss';

interface InfoCardProps {
  title: string;
  currentCount: number;
  endCounter?: number;
}

export const InfoCard = memo(
  ({ title, currentCount, endCounter }: InfoCardProps) => {
    return (
      <div className={styles.infoCard} data-cy="info-card">
        {endCounter && (
          <div
            className={classNames(
              styles.progressBar,
              currentCount === endCounter && styles.completeProgressBar,
            )}
            style={{ width: `${(currentCount / endCounter) * 100}%` }}
            data-cy="info-card-progress-bar"
          />
        )}
        <div
          className={classNames(styles.title, textStyles.text16Regular)}
          data-cy="info-card-title"
        >
          {title}
        </div>
        <div className={styles.info} data-cy="info-card-info">
          <span
            className={classNames(
              styles.currentNumber,
              textStyles.text22Regular,
            )}
          >
            {currentCount}
          </span>
          {endCounter && (
            <span
              className={classNames(
                styles.totalNumber,
                textStyles.text16Regular,
              )}
            >
              /{endCounter}
            </span>
          )}
        </div>
      </div>
    );
  },
);

InfoCard.displayName = 'InfoCard';

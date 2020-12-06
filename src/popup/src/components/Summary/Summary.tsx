import React, { memo, useMemo } from 'react';

import type { IconNames } from 'types/IconNames';
import type { Rides, RidesInfo } from 'types/Rides';
import type { Props as YearSelectorProps } from 'components/YearSelector';

import { getInfoMessage, getStartAndEndDate } from 'utils/messages';
import { summary_pattern } from 'utils/patterns';
import constants from 'utils/constants';
import useDownload from 'hooks/useDownload';
import useTweet from 'hooks/useTweet';

import Icon from 'components/Icon';
import Illustration from 'components/Illustration';
import ScrollDown from 'components/ScrollDown';
import YearSelector from 'components/YearSelector';
import styles from './Summary.module.css';

interface Props extends YearSelectorProps {
  ranges: Rides['_ranges'];
  summary: Rides['_summary'];
}

const getIconType: { [type in RidesInfo]: IconNames } = {
  count: 'car',
  prices: 'money',
  durations: 'clock',
  distances: 'location',
};

const Summary = ({ active, onSelectYear, ranges, summary, years }: Props) => {
  const {
    downloadRef,
    wrapperStyle,
    DownloadButton,
    buttonStyle,
    downloadButtonProps,
  } = useDownload({
    size: { width: 500, height: 500 },
    exportName: 'MySnapp',
  });

  const { TweetButton, tweetButtonProps } = useTweet({
    hashtags: constants.hashtag,
  });

  const keys = useMemo(
    () =>
      Object.keys(summary).sort(
        (a, b) => summary_pattern.indexOf(a) - summary_pattern.indexOf(b)
      ),
    [summary]
  );

  return (
    <div className={styles.summary} ref={downloadRef}>
      <Illustration
        name="elements"
        className={styles.elements}
        width={280}
        height={200}
      />
      <ScrollDown />
      <YearSelector
        active={active}
        style={buttonStyle}
        onSelectYear={onSelectYear}
        years={years}
      />
      <div className={styles.box} style={wrapperStyle}>
        <div className={styles.buttonWrapper}>
          <DownloadButton {...downloadButtonProps} />
          <TweetButton style={buttonStyle} {...tweetButtonProps} />
        </div>
        {keys.map((key) => {
          const { message, unit, description } = getInfoMessage(
            summary[key],
            key
          );
          return (
            <div key={key} className={styles.row}>
              <div className={styles.icon}>
                <Icon type={getIconType[key]} />
              </div>
              <div className={styles.wrapper}>
                <div className={styles.content}>
                  <span>{message}</span>
                  <span>{unit}</span>
                </div>
                {description && (
                  <span className={styles.description}>({description})</span>
                )}
              </div>
            </div>
          );
        })}
        <div className={styles.date}>
          {getStartAndEndDate(ranges.start, ranges.end)}
        </div>
      </div>
    </div>
  );
};

export default memo(Summary);

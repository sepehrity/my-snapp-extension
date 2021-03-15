import React, { memo, useMemo } from 'react';

import type { Rides } from 'types/Rides';
import type { RateObject } from 'types/Summary';
import type { Props as YearSelectorProps } from 'components/YearSelector';

import {
  getSummaryItemMessage,
  getRateSummaryMessage,
  getStartAndEndDate,
} from 'utils/messages';
import { summary_pattern } from 'utils/patterns';
import constants from 'utils/constants';
import useDownload from 'hooks/useDownload';
import useTweet from 'hooks/useTweet';

import Illustration from 'components/Illustration';
import ScrollDown from 'components/ScrollDown';
import SummaryItem from 'components/SummaryItem';
import YearSelector from 'components/YearSelector';
import styles from './Summary.module.css';

interface Props extends YearSelectorProps {
  rates: Rides['_rates'];
  ranges: Rides['_ranges'];
  summary: Rides['_summary'];
}

const Summary = ({
  active,
  onSelectYear,
  ranges,
  rates,
  summary,
  years,
}: Props) => {
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

  const rate = useMemo<RateObject>(() => {
    return Object.entries(rates).reduce(
      (acc: { count: number; sum: number }, [rate, { count }]) => {
        acc.sum += count * Number(rate);
        acc.count += count;
        return acc;
      },
      { count: 0, sum: 0 }
    );
  }, [rates]);

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
          const value = getSummaryItemMessage(summary[key], key);
          return <SummaryItem key={key} type={key} value={value} />;
        })}
        <SummaryItem type="rate" value={getRateSummaryMessage(rate)} />
        <div className={styles.date}>
          {getStartAndEndDate(ranges.start, ranges.end)}
        </div>
      </div>
    </div>
  );
};

export default memo(Summary);

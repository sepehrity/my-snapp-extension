import React, { useCallback } from 'react';

import type { ComponentProps } from 'react';

import constants from 'utils/constants';

import FloatButton from 'components/FloatButton';

type Props = {
  hashtags: string;
};

type ButtonProps = ComponentProps<typeof FloatButton>;

const useTweet = ({ hashtags }: Props) => {
  const onTweet = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      // const _title = "pic.twitter.com/URL"; // TODO: add shareurl
      const twitterURL = `https://twitter.com/share?ref_src=twsrc%5Etfw/&hashtags=${hashtags}`;
      window.open(twitterURL, 'twitter');
    },
    [hashtags]
  );

  const tweetButtonProps: ButtonProps = {
    onClick: onTweet,
    text: constants.tweet,
    title: constants.twitter,
    type: 'twitter',
  };

  return { TweetButton: FloatButton, tweetButtonProps };
};

export default useTweet;

import React, { createRef, useCallback, useMemo, useState } from 'react';
import domToImage from 'dom-to-image';

import type { ComponentProps } from 'react';
import type { DownloadConfig } from 'types/DownloadConfig';

import { downloadBox } from 'utils/styles';
import constants from 'utils/constants';

import FloatButton from 'components/FloatButton';

const sound = require('assests/capture.mp3');

type ButtonProps = ComponentProps<typeof FloatButton>;

const useDownload = ({ exportName, size, style }: DownloadConfig) => {
  const downloadRef = createRef<HTMLDivElement>();
  const [downloading, setDownloading] = useState<boolean>(false);

  const captureSound = new Audio(sound);
  captureSound.volume = 0.2;

  const buttonStyle: React.CSSProperties = useMemo(
    () =>
      downloading
        ? { visibility: 'hidden', opacity: 0, ...style }
        : style || {},
    [downloading, style]
  );

  const wrapperStyle = useMemo(
    () => ({
      transition: 'opacity 0.3s',
      opacity: downloading ? 0.4 : 1,
    }),
    [downloading]
  );

  const onDownload = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      if (downloadRef.current) {
        setDownloading(true);
        domToImage
          .toPng(downloadRef.current, {
            ...size,
            style: downloadBox,
          })
          .then((dataUrl) => {
            captureSound.play();
            const link = document.createElement('a');
            link.download = `${exportName}.png`;
            link.href = dataUrl;
            link.click();
            setDownloading(false);
          })
          .catch((err) => {
            setDownloading(false);
            console.log(err);
          });
      }
    },
    [captureSound, downloadRef, exportName, size]
  );

  const downloadButtonProps: ButtonProps = {
    onClick: onDownload,
    style: buttonStyle,
    text: constants.download,
    title: constants.saveData,
    type: 'download',
  };

  return {
    buttonStyle,
    DownloadButton: FloatButton,
    downloadButtonProps,
    downloadRef,
    wrapperStyle,
  };
};

export default useDownload;

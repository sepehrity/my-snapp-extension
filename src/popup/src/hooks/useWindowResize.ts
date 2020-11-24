import { useState, useEffect } from 'react';

import type { DownloadConfig } from 'types/DownloadConfig';

type Size = Partial<DownloadConfig['size']>;

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize as Required<Size>;
};

export default useWindowSize;

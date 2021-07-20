import { memo } from 'react';
import { ResponsiveBar } from '@nivo/bar';

import type { LabelFormatter } from '@nivo/bar';
import type { BarChartTypes, BarChartData } from 'types/Charts';
import type { CountPrice } from 'types/Rides';

import { barChartDownloadButton, BarChartStyles } from 'utils/styles';
import { getPrice } from 'utils/number';
import { mapToPersian, getTooltipMessage, getExportName } from 'utils/messages';
import constants from 'utils/constants';
import useDownload from 'hooks/useDownload';
import useWindowSize from 'hooks/useWindowResize';

import styles from './BarChart.module.css';

type Props = {
  color: string;
  data: BarChartData[];
  type: BarChartTypes;
};

const BarChart = ({ color, data, type }: Props) => {
  const size = useWindowSize();
  const { downloadRef, wrapperStyle, DownloadButton, downloadButtonProps } =
    useDownload({
      size,
      style: barChartDownloadButton,
      exportName: getExportName[type],
    });

  return (
    <div className={styles.barContainer}>
      <DownloadButton title={constants.saveChart} {...downloadButtonProps} />
      <div ref={downloadRef} className={styles.barBody} style={wrapperStyle}>
        <ResponsiveBar
          animate={false}
          borderColor={color}
          borderRadius={4}
          colors={color}
          data={data}
          indexBy={type}
          keys={['price']}
          label={({ data }) => `${(data as unknown as CountPrice).count}`}
          labelFormat={
            ((value: string) => (
              <tspan y={-15}>{value}</tspan>
            )) as unknown as LabelFormatter
          }
          labelSkipWidth={16}
          margin={{ top: 60, right: 10, bottom: 130, left: 150 }}
          padding={0.3}
          theme={BarChartStyles}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: mapToPersian[type],
            legendPosition: 'middle',
            legendOffset: 80,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 60,
            format: (price) => getPrice(price as number, false),
            tickRotation: 0,
            legend: constants.price,
            legendPosition: 'middle',
            legendOffset: -115,
          }}
          tooltip={({ data }) => {
            const { count, price } = data;
            const value = data[type];
            return (
              <span>
                {getTooltipMessage(
                  count,
                  price as number,
                  value as string,
                  type
                )}
              </span>
            );
          }}
        />
      </div>
    </div>
  );
};

export default memo(BarChart);

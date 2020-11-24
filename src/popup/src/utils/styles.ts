import type { Theme } from '@nivo/core';

export const downloadBox: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: '#f2f5f7',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
};

export const barChartDownloadButton: React.CSSProperties = {
  left: '1rem',
  position: 'absolute',
  top: '2rem',
};

export const BarChartStyles: Theme = {
  background: 'rgb(240, 253, 242, 0.4)',
  axis: {
    ticks: {
      text: {
        fontSize: '16px',
        fontFamily: 'Sahel',
        fontWeight: 'bold',
      },
    },
    legend: {
      text: {
        fontSize: '22px',
        fontFamily: 'Sahel',
        fontWeight: 'bold',
      },
    },
  },
  labels: {
    text: { fontFamily: 'Sahel', fontSize: '16px', fontWeight: 'bold' },
  },
};

import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

import type { LocationPoint } from 'types/Rides';

import constants from 'utils/constants';
import { destinationPaint, originPaint } from './config';

import Coordinates from 'components/Coordinates';
import styles from './Heatmap.module.css';

const mapStyle: React.CSSProperties = {
  borderRadius: '4px',
  boxShadow: 'rgba(0, 209, 111, 0.5) 4px 4px 25px',
  flex: 1,
};

interface Props {
  accessToken: string;
  points: LocationPoint;
}

const Heatmap = ({ accessToken, points }: Props) => {
  const center = [53.688, 32.4279] as [number, number];

  const Mapbox = React.useMemo(() => ReactMapboxGl({ accessToken }), [
    accessToken,
  ]);

  const { destination, origin } = points;

  return (
    <div className={styles.heatmap}>
      <div className={styles.mapbox}>
        <Mapbox
          center={center}
          containerStyle={mapStyle}
          style={`mapbox://styles/mapbox/dark-v9`}
          zoom={[5]}
        >
          <Coordinates paint={originPaint} points={origin} />
          <Coordinates paint={destinationPaint} points={destination} />
        </Mapbox>
        <span className={styles.title}>{constants.heatmapTitle}</span>
      </div>
    </div>
  );
};

export default Heatmap;

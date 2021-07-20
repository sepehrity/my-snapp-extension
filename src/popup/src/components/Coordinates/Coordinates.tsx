import { Feature, Layer } from 'react-mapbox-gl';

import type { Coordinate } from 'types/Rides';

type Props = {
  paint: Record<string, unknown>;
  points: Coordinate[];
};

const Coordinates = ({ paint, points }: Props) => {
  return (
    <Layer type="heatmap" paint={paint}>
      {points.map((point, index: number) => (
        <Feature
          key={index}
          coordinates={[Number(point.lng), Number(point.lat)]}
          properties={point}
        />
      ))}
    </Layer>
  );
};

export default Coordinates;

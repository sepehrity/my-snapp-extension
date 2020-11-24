export const destinationPaint = {
  'heatmap-weight': {
    property: 'dbh',
    type: 'exponential',
    stops: [
      [1, 0],
      [62, 1],
    ],
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  'heatmap-intensity': {
    stops: [
      [11, 1],
      [15, 3],
    ],
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(0,209,111,0)',
    0.2,
    'rgb(0,209,111)',
    0.4,
    'rgb(0,209,111)',
    0.6,
    'rgb(0,209,111)',
    0.8,
    'rgb(0,209,111)',
  ],
  // Adjust the heatmap radius by zoom level
  'heatmap-radius': {
    stops: [
      [11, 16],
      [15, 14],
      [18, 10],
    ],
  },
};

export const originPaint = {
  'heatmap-weight': {
    property: 'dbh',
    type: 'exponential',
    stops: [
      [1, 0],
      [62, 1],
    ],
  },
  'heatmap-intensity': {
    stops: [
      [11, 1],
      [15, 3],
    ],
  },
  'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(66,100,251,0)',
    0.2,
    'rgb(66,100,251)',
    0.4,
    'rgb(66,100,251)',
    0.6,
    'rgb(66,100,251)',
    0.8,
    'rgb(66,100,251)',
  ],
  'heatmap-radius': {
    stops: [
      [11, 16],
      [15, 14],
      [18, 10],
    ],
  },
};

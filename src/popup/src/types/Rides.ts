export type CountPrice = {
  count: number;
  price: number;
};

export type CountPriceObject = { [name: string]: CountPrice };

export type Coordinate = {
  lat: string | number;
  lng: string | number;
};

export type LocationPoint = {
  origin: Coordinate[];
  destination: Coordinate[];
};

export type Rides = {
  _summary: {
    count: number;
    prices: number; // Tomans
  };
  _ranges: {
    start: string; // start time
    end: string; // end time
  };
  _cars: CountPriceObject;
  _days: CountPriceObject;
  _hours: CountPriceObject;
  _months: CountPriceObject;
  _points: LocationPoint;
  _rates: CountPriceObject;
  _types: CountPriceObject;
  _weeks: CountPriceObject;
  _years?: CountPriceObject;
};

export type RidesData = { [year: string]: Rides };

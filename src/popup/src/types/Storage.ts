import type { ArrayElement } from './helpers';
import type { RidesData } from './Rides';

export const DATA_VERSIONS = ['1'] as const;

export type VersionsKeys = ArrayElement<typeof DATA_VERSIONS>;

export type VersionObject = {
  forceUpdate: boolean;
};

export type MetaData = {
  lastRideId: string;
  version: VersionsKeys;
} & Pick<VersionObject, 'forceUpdate'>;

export type DataStorage = {
  rides: RidesData;
  meta: MetaData;
};

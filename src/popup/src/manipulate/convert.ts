import { RidesData } from 'types/Rides';
import {
  DataStorage,
  VersionObject,
  VersionsKeys,
  DATA_VERSIONS,
  MetaData,
} from 'types/Storage';

const convertFunctions: {
  [version in VersionsKeys]: VersionObject;
} = {
  '1': { forceUpdate: true },
};

export const getLastVersionNumber = () =>
  DATA_VERSIONS[DATA_VERSIONS.length - 1];

export const convertToLastVersion = (data: DataStorage) => {
  const hasVersion = !!(data as DataStorage)?.meta?.version;

  // get available versions
  const versions = Object.keys(convertFunctions);

  const newRides = versions.reduce(
    (tmp: DataStorage, version, index) => {
      const { forceUpdate } = convertFunctions[version];

      const meta: MetaData = {
        version,
        forceUpdate,
        lastRideId: data?.meta?.lastRideId || '',
      };

      // init version
      if (!hasVersion) {
        tmp.rides = data as unknown as RidesData;
        tmp.meta = meta;
        return tmp;
      }

      // apply new version changes
      if (Number(data.meta.version) < Number(version)) {
        tmp.rides = { ...tmp.rides };
        tmp.meta = meta;
        return tmp;
      }

      // check an invalid version
      if (index + 1 === versions.length) {
        const isInvalidVersion = versions.some((v) => data.meta.version !== v);
        if (isInvalidVersion) {
          data.meta.version = version;
        }
      }

      // no changes required
      data.meta.forceUpdate = false;
      return data as DataStorage;
    },
    {
      rides: {},
      meta: { version: '1', lastRideId: '', forceUpdate: false },
    }
  );
  return newRides;
};

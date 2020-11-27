import type { CountPrice, CountPriceObject } from 'types/Rides';

export const arrayIntoChunks = <T>(arr: T[], chunkSize: number) => {
  const chunks: T[][] = [];
  while (arr.length) {
    chunks.push(arr.splice(0, chunkSize));
  }
  return chunks;
};

const compareFn = (a: string, b: string, pattern: string[]) => {
  return pattern.indexOf(a) - pattern.indexOf(b);
};

export const getSortedPattern = <T extends CountPriceObject>(
  obj: T,
  pattern: string[],
  property?: keyof CountPrice
): T => {
  return Object.entries(obj)
    .sort(
      ([key1, val1], [key2, val2]) =>
        property
          ? val2[property] - val1[property] // sort based on values
          : compareFn(key1, key2, pattern) // sort based on keys
    )
    .reduce((tmp, [key, val]) => ({ ...tmp, [key]: val }), {}) as T;
};

export const getBucket = (number: number): Array<number> => {
  // TODO: check other scenarios
  const size = Math.ceil(number / 9);
  const fill = Math.ceil(number / size);
  const diffFromMax = fill * size - number;
  const bucket: Array<number> = new Array(size).fill(fill);
  for (let i = 0; i < diffFromMax; i++) {
    bucket[size - i - 1]--;
  }
  return bucket;
};

export const getCarsChunks = <T extends CountPriceObject>(obj: T) => {
  const buckets = getBucket(Object.keys(obj).length);
  const arr = Object.entries(obj);
  const size = buckets[0];
  let to = 0;
  return buckets.reduce((tmp: T[], bucket, index) => {
    to += bucket;
    const chunk = arr
      .slice(index * size, to)
      .reduce((tmp, [key, val]) => ({ ...tmp, [key]: val }), {}) as T;
    tmp.push(getSortedPattern(chunk, [], 'count'));
    return tmp;
  }, []);
};

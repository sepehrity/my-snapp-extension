type ObjectKeys<T> = T extends Record<keyof T, unknown>
  ? Array<keyof T>
  : T extends number
  ? []
  : T extends Array<unknown> | string
  ? string[]
  : never;

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}

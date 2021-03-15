export type PickByValue<T, ValueType> = Pick<
  T,
  {
    [key in keyof T]-?: [ValueType] extends [T[key]]
      ? [T[key]] extends [ValueType]
        ? key
        : never
      : never;
  }[keyof T]
>;

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

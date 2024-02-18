type Nullable<T> = T | null;

type Primitive = boolean | number | bigint | string;


type Obj = {
  [k: string]: unknown;
};

type PlainObject = Indexed;

type ArrayOrObject = [] | PlainObject;

type RecObj<T = unknown> = Record<string, T>;


type Indexed<T = unknown> = {
  [k in string]: T;
};


type NumIndexed<T = unknown> = {
  [k in number]: T;
};


type Readonly<T extends Indexed | NumIndexed> = {
  readonly [P in keyof T]: T[P];
};


type DeepReadonly<T> = {
  readonly [P in keyof T]:
  T[P] extends (infer U)[] ? DeepReadonly<U>[] :
  T[P] extends object ? DeepReadonly<T[P]> :
  T[P];
};


type ReturnType<T> =
  T extends ((...args: unknown[]) => infer R) ?
  R :
  never;


type NameSpace = {
  [k: string]: NameSpace;
};



export {
  Nullable, Primitive,
  Obj, PlainObject, RecObj,
  Indexed, NumIndexed, ArrayOrObject,
  NameSpace, ReturnType, Readonly, DeepReadonly
};


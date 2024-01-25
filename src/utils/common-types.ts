type Nullable<T> = T | null;


type Obj = {
  [k: string]: unknown;
};

type PlainObject = Indexed;

type ArrayOrObject = [] | PlainObject;

type RecObj<T = unknown> = Record<string, T>;


type Indexed<T = unknown> = {
  [k in string]: T;
};


type NameSpace = { [k: string]: NameSpace; };


export {
  Nullable,
  Obj, PlainObject, RecObj,
  Indexed, ArrayOrObject,
  NameSpace,
};


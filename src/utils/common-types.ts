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


type StringIndexed = Record<string, any>;


type NameSpace = { [k: string]: NameSpace; };


export {
  Nullable, Primitive,
  Obj, PlainObject, RecObj,
  Indexed, ArrayOrObject, StringIndexed,
  NameSpace,
};


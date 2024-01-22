type Nullable<T> = T | null;

type Obj = { [k: string]: unknown; };
type RecObj<T> = Record<string, T>;

type NameSpace = { [k: string]: NameSpace; };


export {
  Nullable,
  Obj, RecObj,
  NameSpace,
};


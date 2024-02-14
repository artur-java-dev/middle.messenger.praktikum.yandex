function cloneDeep<T extends object = object>(obj: T): T {

  type Property =
    T |
    Property[] |
    Date |
    Set<unknown> | Map<unknown, unknown> |
    unknown;

  function _cloneDeep(item: Property): Property {

    if (item === null || typeof item !== "object") {

      return item;

    }

    if (item instanceof Date) {

      return new Date(item.valueOf());

    }

    if (item instanceof Array) {

      const copy: Property[] = [];

      item.forEach((_, i) => {

        copy[i] = _cloneDeep(_);

      });

      return copy;

    }

    if (item instanceof Set) {

      const copy = new Set();

      item.forEach(v => copy.add(_cloneDeep(v)));

      return copy;

    }

    if (item instanceof Map) {

      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;

    }

    if (item instanceof Object) {

      const copy: Record<symbol | string, Property> = {};

      Object.getOwnPropertySymbols(item).forEach(s => {

        copy[s] = _cloneDeep(item[s as keyof Property]);

      }
      );

      Object.keys(item).forEach(k => {

        copy[k] = _cloneDeep(item[k as keyof Property]);

      }
      );

      return copy;

    }

    throw new Error(`Невозможно выполнить глубокое клонирование объекта: ${item}`);

  }

  return _cloneDeep(obj) as T;

}

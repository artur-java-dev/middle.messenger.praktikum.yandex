type FormObj = {
  [k: string]: FormDataEntryValue
};


function collectValuesToObj(form: HTMLFormElement): object {
  const data = new FormData(form);
  const obj: FormObj = {};

  data.forEach((val, key) => {
    obj[key] = val;
  });

  return obj;
}


function toFormData(obj: FormObj): FormData {
  const data = new FormData();

  Object.entries(obj).forEach(([k, v]) => {
    data.append(k, v);
  });

  return data;
}


function objToFormData(obj: object): FormData {
  const data = new FormData();

  Object.entries(obj).forEach(([k, v]) => {
    data.append(k, v);
  });

  return data;
}


function objWithNestedToFormData(obj: object): FormData {
  const data = new FormData();
  buildFormData(data, obj);
  return data;
}


const buildFormData = (formData: FormData, obj: object, parentKey = "") => {

  if (obj == null) {
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach(_ => buildFormData(formData, _, parentKey));
    return;
  }

  if (typeof obj === 'object' && !(obj instanceof File)) {
    Object.keys(obj).forEach(key => {
      const k = <keyof typeof obj>key;
      const pkey = parentKey ? `${parentKey}.${key}` : key;
      buildFormData(formData, obj[k], pkey);
    });
    return;
  }

  const value =
    (typeof obj === 'number') || (typeof obj === 'boolean') ?
      String(obj) : obj;

  formData.append(parentKey, value);
};


export {
  FormObj,
  collectValuesToObj,
  toFormData, objToFormData, objWithNestedToFormData
};

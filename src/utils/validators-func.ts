import { beginsWithUpperCase, containsUpperCase, removeChars } from "./str-utils";

const isEmpty = (str: string) => str.trim().length === 0;

function lengthMinMax(str: string, min: number, max: number) {

  const s = str.trim();
  return s.length >= min
    && s.length <= max;

}

function lengthMin(str: string, min: number) {

  return str.trim().length >= min;

}

function lengthMax(str: string, max: number) {

  return str.trim().length <= max;

}

const isLatin = (str: string) => /^[A-Z]+$/i.test(str);
const isCyrillic = (str: string) => /^[А-ЯЁ]+$/i.test(str);
const isLatinOrCyrillic = (str: string) => isLatin(str) || isCyrillic(str);

const isLatinWithDigits = (str: string) => /^[A-Z\d]+$/i.test(str);
const isOnlyDigits = (str: string) => /^\d+$/.test(str);
const isLatinWithOptionalDigits = (str: string) => isLatinWithDigits(str) && !isOnlyDigits(str);

const isUpperFirstLetter = (str: string) => beginsWithUpperCase(str);
const hasUpperLetter = (str: string) => containsUpperCase(str);

const hasSpaces = (str: string) => /\s/g.test(str);
const noSpaces = (str: string) => !hasSpaces(str);

const hasDigits = (str: string) => /\d/g.test(str);
const noDigits = (str: string) => !hasDigits(str);

const noSpacesAndDigits = (str: string) => noSpaces(str) && noDigits(str);

const hasSpecialChars = (str: string) => /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/g.test(str);
const noSpecialChars = (str: string) => !hasSpecialChars(str);

const hasSpecialExcludeDash = (str: string) => /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/g.test(str);
const noSpecialExcludeDash = (str: string) => !hasSpecialExcludeDash(str);

function hasDash(str: string) {

  return /-/g.test(str);

}

const hasSpecialExcludeDashUnderlining = (str: string) => /[`!@#$%^&*()+=[\]{};':"\\|,.<>/?~]/g.test(str);

const noSpecialExcludeDashUnderlining = (str: string) => !hasSpecialExcludeDashUnderlining(str);

function hasUnderlining(str: string) {

  return /_/g.test(str);

}

const SpecialChecks = {

  isValidFirstName(s: string): [boolean, string] {

    return isValidName(s);

  },

  isValidSecondName(s: string): [boolean, string] {

    return isValidName(s);

  },

  isValidLogin(s: string): [boolean, string] {

    const result = lengthMinMax(s, 3, 20)
      && isLatinWithOptionalDigits(removeChars(s, "-_"))
      && noSpaces(s)
      && noSpecialExcludeDashUnderlining(s);
    return [
      result,
      `длина от 3 до 20 символов
      должен содержать латинские буквы, без пробелов и спецсимволов
      может содержать цифры, дефис и подчёркивание`,
    ];

  },

  isValidEmail(s: string): [boolean, string] {

    const result = isLatinWithOptionalDigits(removeChars(s, "-_" + doggieChar + dot)) && isEmail(s);
    return [
      result,
      `латиница, должен включать @ и точку после неё
       может включать цифры и спецсимволы вроде дефиса и подчёркивания`,
    ];

  },

  isValidPassword(s: string): [boolean, string] {

    const result = lengthMinMax(s, 8, 40) && hasUpperLetter(s) && hasDigits(s);
    return [
      result,
      `длина от 8 до 40 символов
      должен содержать хотя бы одну заглавную букву и цифру`,
    ];

  },

  isValidPhone(s: string): [boolean, string] {

    const result = lengthMinMax(s, 10, 15) && isOnlyDigits(removeChars(s, "+"));
    return [
      result,
      `длина от 10 до 15 символов
       состоит из цифр, может начинаться с плюса`,
    ];

  },

  isValidMessage(s: string): [boolean, string] {

    return [
      !isEmpty(s),
      "не должно быть пустым"];

  },

};

function isValidName(s: string): [boolean, string] {

  const res = isLatinOrCyrillic(removeChars(s, "-"))
    && isUpperFirstLetter(s)
    && noSpacesAndDigits(s)
    && noSpecialExcludeDash(s);
  return [
    res,
    `латиница или кириллица, без пробелов, цифр и спецсимволов (может содержать дефис)
    первая буква должна быть заглавной`,
  ];

}

const doggieChar = "@";
const dot = ".";

function isEmail(s: string) {

  const idxDC = s.indexOf(doggieChar);
  const idxD = s.indexOf(dot);
  return idxDC > 0
    && idxDC === s.lastIndexOf(doggieChar)
    && idxD > 0
    && idxDC < idxD && idxD < s.length - 1
    && hasLetters(s.substring(idxDC, idxD));

}

function hasLetters(s: string) {

  return /[a-zA-Z]/g.test(s);

}

export {
  isEmpty, lengthMinMax, lengthMin, lengthMax,
  isLatin, isCyrillic, isLatinOrCyrillic, isLatinWithDigits,
  isUpperFirstLetter,
  hasSpaces, noSpaces, hasDigits, noDigits, isOnlyDigits, noSpacesAndDigits,
  hasSpecialChars, noSpecialChars, hasDash, hasUnderlining,
  noSpecialExcludeDash, noSpecialExcludeDashUnderlining,
  SpecialChecks,
};

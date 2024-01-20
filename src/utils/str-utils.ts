function getChar(s: string, idx: number) {
  return Array.from(s)[idx];
}

function isUpperCase(s: string) {
  return s !== s.toLowerCase();
}

function beginsWithUpperCase(s: string) {
  return isUpperCase(getChar(s, 0));
}

function containsUpperCase(s: string) {
  return Array.from(s).some(x => isUpperCase(x));
}

function removeSpaces(s: string) {
  return s.replace(/\s+/g, "");
}

function removeChars(s: string, chars: string) {
  let res = s;
  for (let ch of chars)
    res = res.replaceAll(ch, "");
  return res;
}


export {
  getChar, isUpperCase, beginsWithUpperCase,
  removeSpaces, removeChars, containsUpperCase
};

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

function trim(s: string, chars: string = " ") {

  if (chars === " ")
    return s.trim();

  const escaped = chars.replace(/\W/g, "\\$&");
  const beg = new RegExp(`^[${escaped}]+`);
  const end = new RegExp(`[${escaped}]+$`);

  return s.replace(beg, "").replace(end, "");

}

function removeChars(s: string, chars: string) {

  let res = s;
  for (const ch of chars)
    res = res.replaceAll(ch, "");
  return res;

}

function isEqual(lhs: string, rhs: string) {

  return lhs === rhs;

}


const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;"
};

function escapeHtml(unsafe: string) {

  return unsafe.replaceAll("&", htmlEscapes["&"])
    .replaceAll("<", htmlEscapes["<"])
    .replaceAll(">", htmlEscapes[">"])
    .replaceAll("\"", htmlEscapes["\""])
    .replaceAll("'", htmlEscapes["'"]);

}


function pad(s: string, maxLength: number) {
  const count = s.length;
  const pad = (maxLength - count) / 2 + count;
  return s.padStart(pad).padEnd(maxLength);
}


export {
  getChar, isUpperCase,
  beginsWithUpperCase, containsUpperCase,
  removeSpaces, removeChars, trim,
  isEqual, escapeHtml, pad
};

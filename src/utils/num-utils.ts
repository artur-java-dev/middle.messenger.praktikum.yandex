/* eslint max-params: ["error",4] */

type StepFn = (val: number) => number | StepFn;

function add(val?: number): number | StepFn {

  if (!val)
    return 0;

  let currentSum = val;

  const f: StepFn = (b) => {

    if (!b)
      return currentSum;
    currentSum += b;
    return f;

  };

  return f;

}


function gcd(...args: number[]): number {

  const notNat = args.some(x => x < 0);

  if (notNat)
    throw Error("аргументы должны быть натуральными числами");

  const euclid = (a: number, b: number): number =>
    (b === 0 ? Math.abs(a) : euclid(b, a % b));

  return args.reduce((acc, num) =>
    euclid(acc, num));

}


function rangeRight(start: number, end: number, step?: number) {

  return range(start, end, step, true);

}


function range(start: number, end: number, step = (start < end ? 1 : -1), isRight = false) {

  if (start > end && step > 0)
    return [];

  if (start < end && step < 0)
    return [];

  if (start === end)
    return [start];

  if (step === 0)
    return genRangeStepZero(start, end, isRight);

  return genRange(start, end, step, isRight);

}


function genRangeStepZero(start: number, end: number, isRight: boolean) {

  const arr: number[] = [];

  const [s, e] = [
    Math.min(start, end),
    Math.max(start, end)
  ];

  for (let i = s; i < e; i++)
    arr.push(isRight ? end : start);

  return arr;

}

function genRange(start: number, end: number, step: number, isRight: boolean) {

  const arr: number[] = [];

  if (isRight) {

    const s = Math.abs(step);
    if (start > end)
      for (let i = end + s; i <= start; i -= step) arr.push(i);
    else
      for (let i = end - s; i >= start; i -= step) arr.push(i);
    return arr;

  }

  if (start > end)
    for (let i = start; i > end; i += step) arr.push(i);
  else
    for (let i = start; i < end; i += step) arr.push(i);

  return arr;

}


export { gcd, add, range, rangeRight };

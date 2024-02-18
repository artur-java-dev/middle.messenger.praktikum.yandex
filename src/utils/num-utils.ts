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
  }

  return f;
}



function gcd(...args: number[]): number {

  const notNat = args.some(x => x < 0);

  if (notNat)
    throw "аргументы должны быть натуральными числами";

  const euclid = (a: number, b: number): number =>
    b === 0 ? Math.abs(a) : euclid(b, a % b);

  return args.reduce((acc, num) =>
    euclid(acc, num));
}


export { gcd, add };

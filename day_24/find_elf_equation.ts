/**
 * Find the equation used for Elf Numbers.
 */

import * as math from "npm:mathjs@12";

/**
 * A round function that is curry-able.
 */
function round(decimals: number, x: number): number {
  return math.round(x, decimals);
}

/**
 * Returns if a number is an Elf Number.
 *
 * @param n The number to check
 * @param map An array of the mapping of the first 10 numbers put through an elf equation
 */
function elf_number(n: number, map: number[]): boolean {
  const visited = new Set();
  while (!visited.has(n)) {
    visited.add(n);

    n = n
      .toString()
      .split("")
      .map(Number)
      .reduce((acc, d) => acc + map[d], 0);
  }

  return n === 0;
}

/** Performs polynomial regression. Returns the coefficients for the best fit equation and the R^2 value. */
function poly_regression(xValues: number[], yValues: number[], degree = 1) {
  if (xValues.length !== yValues.length) {
    throw new Error("The input arrays should have the same length.");
  }

  if (degree < 1 || !Number.isSafeInteger(degree)) {
    throw new Error("The degree must be an integer >= 1.");
  }

  // Create matrices for the linear system
  const A = math.matrix(
    xValues.map((x) =>
      Array(degree + 1)
        .fill(0)
        .map((_, i) => x ** i)
    )
  );
  const y = math.matrix(yValues);

  // Solve for the coefficients using the normal equations: (A^T * A) * a = (A^T * y)
  const AT = math.transpose(A);
  const ATA = math.multiply(AT, A);
  const ATy = math.multiply(AT, y);
  const coefficients = math.lusolve(ATA, ATy);

  // Calculate the coefficient of determination (R^2)
  const yMean = math.mean(yValues);
  const ssTot = math.sum(yValues.map((yi) => (yi - yMean) ** 2));
  const yFitted = math.multiply(A, coefficients).toArray().flat() as number[];
  const ssRes = math.sum(yValues.map((yi, i) => (yi - yFitted[i]) ** 2));
  const rSquared = 1 - ssRes / ssTot;

  return {
    equation: coefficients.toArray().flat() as number[],
    rSquared,
  };
}

/**
 * Find and print possible equations to use for Elf Numbers.
 * Look at the console for results and pick a nice looking one.
 */
function main() {
  const digits = Array(10)
    .fill(0)
    .map((_, i) => i);

  // Brute forces all possible equations that fit the first 4 x values to every possible y value from 0-9
  for (const y0 of digits) {
    for (const y1 of digits) {
      for (const y2 of digits) {
        for (const y3 of digits) {
          const equation = poly_regression([0, 1, 2, 3], [y0, y1, y2, y3], 3)
            .equation.reverse()
            .map(round.bind(null, 4));

          // must actually be a cubic function
          if (equation[0] === 0) {
            continue;
          }

          const f = math.compile(
            `${equation[0]}*x^3 + ${equation[1]}*x^2 + ${equation[2]}*x + ${equation[3]}`
          );

          // find y for x in 0-9 for this equation
          const ys = digits
            .map((x) =>
              f.evaluate({
                x,
              })
            )
            .map(round.bind(null, 4));

          // nothing can be negative and must have at least 1 y value as zero.
          // subjective criteria: it should have at least 2 zeros, but not more than 8
          const zeros = ys.filter((y) => y === 0).length;
          if (ys.some((y) => y < 0) || zeros < 2 || zeros > 8) {
            continue;
          }

          // determine how many numbers from 0-9 are Elf Numbers.
          // subjective criteria: there should not be too many or too little. Settled on exactly 5
          const first_elf_nums = digits.map((n) => elf_number(n, ys));
          const elf_nums = first_elf_nums.filter((y) => y).length;
          if (elf_nums != 5) {
            continue;
          }

          console.log(
            `e(n) = ${equation[0]}*n^3 + ${equation[1]}*n^2 + ${equation[2]}*n + ${equation[3]}`
          );
          for (const [x, y] of ys.entries()) {
            console.log(
              `e(${x}) = ${y.toString().padEnd(5, " ")} (${first_elf_nums[x]})`
            );
          }
          console.log();
        }
      }
    }
  }
}

main();

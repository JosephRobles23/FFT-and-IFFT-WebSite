import { ComplexNumber } from '../types/math';

const EPSILON = 1e-10;

const roundValue = (value: number): number =>
  Math.abs(value) < EPSILON ? 0 : value;

// Modificar operaciones complejas:
export const complexAdd = (
  a: ComplexNumber,
  b: ComplexNumber
): ComplexNumber => ({
  re: roundValue(a.re + b.re),
  im: roundValue(a.im + b.im),
});

export const complexSubtract = (
  a: ComplexNumber,
  b: ComplexNumber
): ComplexNumber => ({
  re: roundValue(a.re - b.re),
  im: roundValue(a.im - b.im),
});

// Multiplicación de dos números complejos
export const complexMultiply = (
  a: ComplexNumber,
  b: ComplexNumber
): ComplexNumber => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});

// Exponenciación de un número complejo para calcular el factor de twiddle
export const complexExp = (theta: number): ComplexNumber => {
  const re = Math.cos(theta);
  const im = Math.sin(theta);
  return {
    re: roundValue(re),
    im: roundValue(im),
  };
};

// Escalado de un número complejo por un escalar
export const complexScale = (
  a: ComplexNumber,
  scalar: number
): ComplexNumber => ({
  re: roundValue(a.re * scalar),
  im: roundValue(a.im * scalar),
});

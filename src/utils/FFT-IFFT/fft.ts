import { ComplexNumber } from '../../types/math';
import {
  complexAdd,
  complexSubtract,
  complexMultiply,
  complexExp,
  complexScale,
} from './complexMath';

const isPowerOfTwo = (n: number): boolean => {
  return (n & (n - 1)) === 0;
};

const bitReverse = (n: number, bits: number): number => {
  let reversed = 0;
  for (let i = 0; i < bits; i++) {
    reversed = (reversed << 1) | (n & 1);
    n >>= 1;
  }
  return reversed;
};

const padToPowerOfTwo = (signal: ComplexNumber[]): ComplexNumber[] => {
  const nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(signal.length)));
  const padded = [...signal];
  while (padded.length < nextPowerOfTwo) {
    padded.push({ re: 0, im: 0 });
  }
  return padded;
};

// **FFT Function**
export const computeFFT = (signal: ComplexNumber[]): ComplexNumber[] => {
  let paddedSignal = padToPowerOfTwo(signal);
  const N = paddedSignal.length;

  if (!isPowerOfTwo(N)) {
    throw new Error('Signal length must be a power of 2');
  }

  const bits = Math.log2(N);
  const output = new Array(N).fill(null).map(() => ({ re: 0, im: 0 }));

  // Copia de bits invertidos
  for (let i = 0; i < N; i++) {
    output[bitReverse(i, bits)] = paddedSignal[i];
  }

  // Cooley-Tukey FFT
  for (let size = 2; size <= N; size *= 2) {
    const halfSize = size / 2;
    const angle = (-2 * Math.PI) / size; // FFT usa angulo negativo

    for (let i = 0; i < N; i += size) {
      for (let j = 0; j < halfSize; j++) {
        const twiddle = complexMultiply(
          output[i + j + halfSize],
          complexExp(angle * j)
        );

        const even = output[i + j];
        const odd = twiddle;

        // Operación de la Mariposa
        output[i + j] = complexAdd(even, odd);
        output[i + j + halfSize] = complexSubtract(even, odd);
      }
    }
  }

  return output;
};


// **IFFT Function**
export const computeIFFT = (signal: ComplexNumber[]): ComplexNumber[] => {
  let paddedSignal = padToPowerOfTwo(signal);
  const N = paddedSignal.length;

  if (!isPowerOfTwo(N)) {
    throw new Error('Signal length must be a power of 2');
  }

  const bits = Math.log2(N);
  const output = new Array(N).fill(null).map(() => ({ re: 0, im: 0 }));

  // Copia de bits invertidos
  for (let i = 0; i < N; i++) {
    const reversedIndex = bitReverse(i, bits);
    output[reversedIndex] = paddedSignal[i];
    console.log(`Bit-reverse: Index ${i} -> ${reversedIndex}`);
  }

  // Cooley-Tukey IFFT
  for (let size = 2; size <= N; size *= 2) {
    const halfSize = size / 2;
    const angle = (2 * Math.PI) / size; // IFFT usa ángulo positivo

    for (let i = 0; i < N; i += size) {
      for (let j = 0; j < halfSize; j++) {
        const twiddle = complexMultiply(
          output[i + j + halfSize],
          complexExp(angle * j) // Twiddle factor
        );

        const even = output[i + j];
        const odd = twiddle;

        // Imprimir valores de cada paso para depuración
        console.log(
          `Butterfly [i=${i}, j=${j}]: even=${even.re}+${even.im}i, ` +
            `twiddle=${twiddle.re}+${twiddle.im}i, odd=${odd.re}+${odd.im}i`
        );

        // Butterfly operation
        output[i + j] = complexAdd(even, odd);
        output[i + j + halfSize] = complexSubtract(even, odd);
      }
    }
  }

  // Escalar el resultado por 1/N
  for (let i = 0; i < N; i++) {
    output[i] = complexScale(output[i], 1 / N);
    console.log(`Scaling Output [${i}]: ${output[i].re} + ${output[i].im}i`);
  }

  const roundOutput = (signal: ComplexNumber[]): ComplexNumber[] =>
    signal.map((num) => ({
      re: Math.abs(num.re) < 1e-5 ? 0 : parseFloat(num.re.toFixed(6)),
      im: Math.abs(num.im) < 1e-5 ? 0 : parseFloat(num.im.toFixed(6)),
    }));

  return roundOutput(output);
};

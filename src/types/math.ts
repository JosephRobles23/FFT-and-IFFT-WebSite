export interface ComplexNumber {
  re: number;
  im: number;
}

export type OperationType = 'DFT' | 'IDFT';

export interface IrrationalValue {
  type: 'pi' | 'e' | 'phi' | 'sqrt2' | 'sqrt3' | 'custom';
  multiplier: number;
  custom?: string;
}
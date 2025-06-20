import { DiscreteSignal, trimSignalToRelevantRange } from './signalFunctions';

// Función para calcular la convolución discreta de dos secuencias simples
export const discreteConvolution = (f: number[], g: number[]): number[] => {
  const N = f.length;
  const M = g.length;
  const resultLength = N + M - 1;
  const result: number[] = new Array(resultLength).fill(0);

  // Implementación de la convolución discreta
  // y[n] = sum_{k=0}^{N-1} f[k] * g[n-k]
  for (let n = 0; n < resultLength; n++) {
    for (let k = 0; k < N; k++) {
      const gIndex = n - k;
      if (gIndex >= 0 && gIndex < M) {
        result[n] += f[k] * g[gIndex];
      }
    }
  }

  return result;
};

// Función mejorada para calcular la convolución de señales discretas con índices
export const discreteConvolutionWithIndices = (fSignal: DiscreteSignal, gSignal: DiscreteSignal): DiscreteSignal => {
  const f = fSignal.values;
  const g = gSignal.values;
  const fStart = fSignal.startIndex;
  const gStart = gSignal.startIndex;
  
  const N = f.length;
  const M = g.length;
  const resultLength = N + M - 1;
  const result: number[] = new Array(resultLength).fill(0);
  
  // El índice de inicio del resultado es la suma de los índices de inicio
  const resultStartIndex = fStart + gStart;

  // Implementación de la convolución discreta
  for (let n = 0; n < resultLength; n++) {
    for (let k = 0; k < N; k++) {
      const gIndex = n - k;
      if (gIndex >= 0 && gIndex < M) {
        result[n] += f[k] * g[gIndex];
      }
    }
  }

  return {
    values: result,
    startIndex: resultStartIndex
  };
};

// Función para generar los índices de salida para la gráfica (versión simple)
export const generateConvolutionIndices = (fLength: number, gLength: number): number[] => {
  const resultLength = fLength + gLength - 1;
  return Array.from({ length: resultLength }, (_, i) => i);
};

// Función para generar los índices con consideración de índices de inicio
export const generateConvolutionIndicesWithStart = (fSignal: DiscreteSignal, gSignal: DiscreteSignal): number[] => {
  const resultLength = fSignal.values.length + gSignal.values.length - 1;
  const startIndex = fSignal.startIndex + gSignal.startIndex;
  return Array.from({ length: resultLength }, (_, i) => startIndex + i);
};

// Función para calcular convolución con rango automático y recorte inteligente
export const discreteConvolutionAutoRange = (fSignal: DiscreteSignal, gSignal: DiscreteSignal): { result: DiscreteSignal, indices: number[] } => {
  // Calcular convolución normal
  const convolutionResult = discreteConvolutionWithIndices(fSignal, gSignal);
  
  // Recortar a la región relevante
  const trimmedResult = trimSignalToRelevantRange(convolutionResult, 3);
  
  // Generar índices correspondientes
  const indices = trimmedResult.values.map((_, i) => trimmedResult.startIndex + i);
  
  return {
    result: trimmedResult,
    indices
  };
};

// Función para calcular convolución con rango personalizado
export const discreteConvolutionWithCustomRange = (
  fSignal: DiscreteSignal, 
  gSignal: DiscreteSignal, 
  outputRange: { start: number, end: number }
): { result: DiscreteSignal, indices: number[] } => {
  // Calcular convolución normal
  const convolutionResult = discreteConvolutionWithIndices(fSignal, gSignal);
  
  // Aplicar el rango personalizado a la salida
  const startOffset = outputRange.start - convolutionResult.startIndex;
  const endOffset = outputRange.end - convolutionResult.startIndex;
  
  const clampedStart = Math.max(0, startOffset);
  const clampedEnd = Math.min(convolutionResult.values.length - 1, endOffset);
  
  if (clampedStart > clampedEnd) {
    // Si el rango está fuera de los datos, devolver array vacío
    return {
      result: { values: [0], startIndex: outputRange.start },
      indices: [outputRange.start]
    };
  }
  
  // Extraer la porción del resultado que está en el rango
  const rangeLength = outputRange.end - outputRange.start + 1;
  const rangeValues = new Array(rangeLength).fill(0);
  
  // Copiar los valores que están dentro del rango
  for (let i = clampedStart; i <= clampedEnd; i++) {
    const outputIndex = i - startOffset;
    if (outputIndex >= 0 && outputIndex < rangeLength) {
      rangeValues[outputIndex] = convolutionResult.values[i];
    }
  }
  
  const result: DiscreteSignal = {
    values: rangeValues,
    startIndex: outputRange.start
  };
  
  // Generar índices correspondientes
  const indices = result.values.map((_, i) => result.startIndex + i);
  
  return {
    result,
    indices
  };
}; 
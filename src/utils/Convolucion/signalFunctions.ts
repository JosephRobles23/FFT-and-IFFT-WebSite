// Funciones para generar señales discretas básicas

export interface DiscreteSignal {
  values: number[];
  startIndex: number; // Índice donde empieza la secuencia
}

// Genera un impulso discreto δ[n-n0] con amplitud A
export const generateImpulse = (amplitude: number, delay: number, range: { start: number, end: number }): DiscreteSignal => {
  const length = range.end - range.start + 1;
  const values = new Array(length).fill(0);
  
  // Posición del impulso en el array
  const impulsePosition = delay - range.start;
  
  if (impulsePosition >= 0 && impulsePosition < length) {
    values[impulsePosition] = amplitude;
  }
  
  return {
    values,
    startIndex: range.start
  };
};

// Genera un escalón unitario u[n-n0] con amplitud A
export const generateUnitStep = (amplitude: number, delay: number, range: { start: number, end: number }): DiscreteSignal => {
  const length = range.end - range.start + 1;
  const values = new Array(length).fill(0);
  
  // Llenar con la amplitud desde el punto de inicio del escalón
  for (let i = 0; i < length; i++) {
    const currentIndex = range.start + i;
    if (currentIndex >= delay) {
      values[i] = amplitude;
    }
  }
  
  return {
    values,
    startIndex: range.start
  };
};

// Combina múltiples señales discretas
export const combineSignals = (signals: DiscreteSignal[]): DiscreteSignal => {
  if (signals.length === 0) {
    return { values: [], startIndex: 0 };
  }
  
  // Encontrar el rango total
  const allIndices = signals.flatMap(signal => 
    signal.values.map((_, i) => signal.startIndex + i)
  );
  const minIndex = Math.min(...allIndices);
  const maxIndex = Math.max(...allIndices);
  
  const totalLength = maxIndex - minIndex + 1;
  const combinedValues = new Array(totalLength).fill(0);
  
  // Sumar todas las señales
  signals.forEach(signal => {
    signal.values.forEach((value, i) => {
      const globalIndex = signal.startIndex + i - minIndex;
      combinedValues[globalIndex] += value;
    });
  });
  
  return {
    values: combinedValues,
    startIndex: minIndex
  };
};

// Determina el rango automático necesario para una expresión
export const determineExpressionRange = (expression: string): { start: number, end: number } => {
  const expr = expression.trim().replace(/\s+/g, '');
  
  // Si es solo números, el rango es desde 0
  if (!expr.includes('δ') && !expr.includes('u[') && !expr.includes('delta')) {
    const values = expr.split(',').map(val => parseFloat(val.trim())).filter(val => !isNaN(val));
    return { start: 0, end: Math.max(0, values.length - 1) };
  }
  
  let minIndex = 0;
  let maxIndex = 10; // Default para escalones
  
  // Dividir la expresión en términos
  // Mejorar la regex para manejar mejor el primer término
  const processedTerms: string[] = [];
  let currentTerm = '';
  let isFirstTerm = true;
  
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if ((char === '+' || char === '-') && !isFirstTerm && currentTerm.length > 0) {
      processedTerms.push(currentTerm);
      currentTerm = char;
    } else {
      currentTerm += char;
      if (char !== '+' && char !== '-') {
        isFirstTerm = false;
      }
    }
  }
  
  if (currentTerm.length > 0) {
    processedTerms.push(currentTerm);
  }
  
  const terms = processedTerms;
  
  for (let term of terms) {
    term = term.trim();
    if (term === '') continue;
    
    // Limpiar signo y amplitud
    term = term.replace(/^[+-]/, '').replace(/^\d*\.?\d*\*/, '');
    
    // Parsear impulso δ[n-delay] o delta[n-delay]
    const impulseMatch = term.match(/(?:δ|delta)\[n([+-]\d+)?\]/);
    if (impulseMatch) {
      let delay = 0;
      if (impulseMatch[1]) {
        // Para δ[n-2], impulseMatch[1] = "-2", queremos delay = 2
        // Para δ[n+1], impulseMatch[1] = "+1", queremos delay = -1
        const value = parseInt(impulseMatch[1].replace(/[+-]/, ''));
        delay = impulseMatch[1].startsWith('-') ? value : -value;
      }
      minIndex = Math.min(minIndex, delay);
      maxIndex = Math.max(maxIndex, delay);
      continue;
    }
    
    // Parsear escalón u[n-delay]
    const stepMatch = term.match(/u\[n([+-]\d+)?\]/);
    if (stepMatch) {
      let delay = 0;
      if (stepMatch[1]) {
        // Para u[n-3], stepMatch[1] = "-3", queremos delay = 3
        // Para u[n+2], stepMatch[1] = "+2", queremos delay = -2
        const value = parseInt(stepMatch[1].replace(/[+-]/, ''));
        delay = stepMatch[1].startsWith('-') ? value : -value;
      }
      minIndex = Math.min(minIndex, delay);
      maxIndex = Math.max(maxIndex, delay + 10); // Extender rango para escalones
      continue;
    }
  }
  
  // Agregar padding para visualización
  return { 
    start: minIndex - 2, 
    end: maxIndex + 2 
  };
};

// Función auxiliar para parsear un término individual
const parseTerm = (inputTerm: string, range: { start: number, end: number }): DiscreteSignal | null => {
  let workingTerm = inputTerm.trim();
  if (workingTerm === '') return null;
  
  let amplitude = 1;
  
  // Manejar signo
  if (workingTerm.startsWith('+')) {
    workingTerm = workingTerm.substring(1);
  } else if (workingTerm.startsWith('-')) {
    amplitude = -1;
    workingTerm = workingTerm.substring(1);
  }
  
  // Extraer amplitud si existe
  const amplitudeMatch = workingTerm.match(/^(\d*\.?\d*)\*/);
  if (amplitudeMatch && amplitudeMatch[1]) {
    amplitude *= parseFloat(amplitudeMatch[1]);
    workingTerm = workingTerm.replace(/^(\d*\.?\d*)\*/, '');
  }
  
  // Parsear impulso δ[n] o δ[n±offset]
  const impulseMatch = workingTerm.match(/(?:δ|delta)\[n([+-]\d+)?\]/);
  if (impulseMatch) {
    let delay = 0;
    if (impulseMatch[1]) {
      // Para δ[n-2], impulseMatch[1] = "-2", queremos delay = 2
      // Para δ[n+2], impulseMatch[1] = "+2", queremos delay = -2
      const value = parseInt(impulseMatch[1].replace(/[+-]/, ''));
      delay = impulseMatch[1].startsWith('-') ? value : -value;
    }
    return generateImpulse(amplitude, delay, range);
  }
  
  // Parsear escalón u[n] o u[n±offset]
  const stepMatch = workingTerm.match(/u\[n([+-]\d+)?\]/);
  if (stepMatch) {
    let delay = 0;
    if (stepMatch[1]) {
      // Para u[n-3], stepMatch[1] = "-3", queremos delay = 3
      // Para u[n+2], stepMatch[1] = "+2", queremos delay = -2
      const value = parseInt(stepMatch[1].replace(/[+-]/, ''));
      delay = stepMatch[1].startsWith('-') ? value : -value;
    }
    return generateUnitStep(amplitude, delay, range);
  }
  
  return null;
};

// Función simple para dividir expresiones matemáticas
const splitExpression = (expr: string): string[] => {
  const terms: string[] = [];
  let currentTerm = '';
  let inBrackets = false;
  
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    
    if (char === '[') {
      inBrackets = true;
      currentTerm += char;
    } else if (char === ']') {
      inBrackets = false;
      currentTerm += char;
    } else if ((char === '+' || char === '-') && !inBrackets && currentTerm.length > 0) {
      terms.push(currentTerm);
      currentTerm = char;
    } else {
      currentTerm += char;
    }
  }
  
  if (currentTerm.length > 0) {
    terms.push(currentTerm);
  }
  
  return terms;
};

// Parsea una expresión de señal discreta con rango automático
export const parseSignalExpression = (expression: string, customRange?: { start: number, end: number }): DiscreteSignal => {
  const expr = expression.trim().replace(/\s+/g, '');
  
  // Determinar rango automáticamente o usar el proporcionado
  const range = customRange || determineExpressionRange(expression);
  
  // Si es solo números separados por comas (formato original)
  if (!expr.includes('δ') && !expr.includes('u[') && !expr.includes('delta')) {
    const values = expr.split(',').map(val => parseFloat(val.trim())).filter(val => !isNaN(val));
    return {
      values,
      startIndex: 0
    };
  }
  
  const signals: DiscreteSignal[] = [];
  
  // Dividir la expresión en términos
  const terms = splitExpression(expr);
  
  for (let term of terms) {
    const signal = parseTerm(term, range);
    if (signal) {
      signals.push(signal);
    }
  }
  
  return combineSignals(signals);
};

// Recorta una señal para mostrar solo la región relevante (no-ceros con padding)
export const trimSignalToRelevantRange = (signal: DiscreteSignal, padding: number = 2): DiscreteSignal => {
  const values = signal.values;
  const startIndex = signal.startIndex;
  
  // Encontrar primer y último valor no-cero
  let firstNonZero = -1;
  let lastNonZero = -1;
  
  for (let i = 0; i < values.length; i++) {
    if (Math.abs(values[i]) > 1e-10) {
      if (firstNonZero === -1) firstNonZero = i;
      lastNonZero = i;
    }
  }
  
  // Si no hay valores no-cero, devolver señal vacía
  if (firstNonZero === -1) {
    return { values: [0], startIndex: 0 };
  }
  
  // Aplicar padding
  const trimStart = Math.max(0, firstNonZero - padding);
  const trimEnd = Math.min(values.length - 1, lastNonZero + padding);
  
  const trimmedValues = values.slice(trimStart, trimEnd + 1);
  const newStartIndex = startIndex + trimStart;
  
  return {
    values: trimmedValues,
    startIndex: newStartIndex
  };
};

// Convierte DiscreteSignal a array simple para compatibilidad
export const signalToArray = (signal: DiscreteSignal): number[] => {
  return signal.values;
};

// Obtiene los índices correspondientes a una señal
export const getSignalIndices = (signal: DiscreteSignal): number[] => {
  return signal.values.map((_, i) => signal.startIndex + i);
}; 
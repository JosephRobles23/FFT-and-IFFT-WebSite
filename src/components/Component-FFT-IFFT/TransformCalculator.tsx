import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ComplexNumber } from '../../types/math';
import { computeFFT, computeIFFT } from '../../utils/FFT-IFFT/fft';
import { ComplexNumberInput } from './ComplexNumberInput';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  operation: 'DFT' | 'IDFT'; // Especifica el tipo de transformación a realizar.
}

const parseComplexNumber = (str: string): ComplexNumber => {
  str = str.trim().replace(/\s/g, '');

  // Manejar números puros reales
  if (!str.includes('i')) return { re: parseFloat(str), im: 0 };
  
  // Manejar números imaginarios puros
  if (str === 'i') return { re: 0, im: 1 };
  if (str === '-i') return { re: 0, im: -1 };
  if (str === '+i') return { re: 0, im: 1 };

  // Casos especiales para números imaginarios con coeficientes
  if (str.endsWith('i') && !str.includes('+') && !str.includes('-', 1)) {
    // Casos como '2i', '-3i', '0.5i'
    const coefficient = str.slice(0, -1);
    if (coefficient === '' || coefficient === '+') return { re: 0, im: 1 };
    if (coefficient === '-') return { re: 0, im: -1 };
    return { re: 0, im: parseFloat(coefficient) };
  }

  // Analizar números complejos completos en la forma a+bi o a-bi
  let re = 0, im = 0;
  
  // Usar regex más robusta para separar parte real e imaginaria
  const complexRegex = /^([+-]?\d*\.?\d*)?([+-]?\d*\.?\d*)?i$/;
  const match = str.match(complexRegex);
  
  if (match) {
    // Si coincide con el patrón completo a+bi
    const realPart = match[1];
    const imagPart = match[2];
    
    if (realPart && realPart !== '') re = parseFloat(realPart);
    if (imagPart && imagPart !== '') {
      im = imagPart === '+' || imagPart === '' ? 1 : 
          imagPart === '-' ? -1 : parseFloat(imagPart);
    }
  } else {
    // Fallback: usar el método de split mejorado
    const parts = str.replace(/([+-])/g, '|$1').split('|').filter(p => p !== '');
    
    parts.forEach((part) => {
      if (part.includes('i')) {
        const num = part.replace('i', '');
        if (num === '' || num === '+') im = 1;
        else if (num === '-') im = -1;
        else im = parseFloat(num);
      } else if (part !== '+' && part !== '-' && part !== '') {
        re = parseFloat(part);
      }
    });
  }

  return { re, im };
};

export const TransformCalculator: React.FC<Props> = ({ operation }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ComplexNumber[]>([]);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      setError('');
      const values = input.split(',').map(parseComplexNumber);

      // Utiliza la función adecuada según la operación.
      const transformResult =
        operation === 'DFT' ? computeFFT(values) : computeIFFT(values);
      setResult(transformResult);
    } catch (err) {
      setError((err as Error).message);
      setResult([]);
    }
  };

  const handleReset = () => {
    setInput('');
    setResult([]);
    setError('');
  };

  const chartData = {
    labels: result.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'Parte real',
        data: result.map((num) => num.re),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Parte Imaginaria',
        data: result.map((num) => num.im),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: operation === 'DFT' ? 'FFT Result' : 'IFFT Result',
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">
        {operation === 'DFT'
          ? 'Transformada rápida de Fourier (FFT)'
          : 'Transformada rápida de Fourier inversa (IFFT)'}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ingrese números complejos o haga clic en + para constantes (por
          ejemplo, 1+2i, 3+4i, π)
        </label>
        <ComplexNumberInput value={input} onChange={setInput} />
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleCalculate}
          className="px-4 py-2 bg-rose-900 text-white rounded-md hover:bg-rose-700 transition-colors"
        >
          Calcular
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Resetear
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {result.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Resultados:</h3>
          <div className="mb-4 overflow-x-auto">
            {result.map((value, index) => (
              <div key={index} className="mb-1">
                x[{index}] = {value.re.toFixed(4)} {value.im >= 0 ? '+' : ''}{' '}
                {value.im.toFixed(4)}i
              </div>
            ))}
          </div>
          <div className="mt-6 h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

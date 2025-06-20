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
import { discreteConvolutionWithCustomRange } from '../../utils/Convolucion/convolution';
import { parseSignalExpression, DiscreteSignal } from '../../utils/Convolucion/signalFunctions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ConvolutionCalculator: React.FC = () => {
  const [fInput, setFInput] = useState('');
  const [gInput, setGInput] = useState('');
  const [rangeStart, setRangeStart] = useState(-10);
  const [rangeEnd, setRangeEnd] = useState(10);
  const [fSignal, setFSignal] = useState<DiscreteSignal | null>(null);
  const [gSignal, setGSignal] = useState<DiscreteSignal | null>(null);
  const [result, setResult] = useState<number[]>([]);
  const [indices, setIndices] = useState<number[]>([]);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      setError('');
      
      // Parsear las expresiones de señales con rango personalizado
      const customRange = { start: rangeStart, end: rangeEnd };
      const parsedFSignal: DiscreteSignal = parseSignalExpression(fInput, customRange);
      const parsedGSignal: DiscreteSignal = parseSignalExpression(gInput, customRange);
      


      if (parsedFSignal.values.length === 0 || parsedGSignal.values.length === 0) {
        throw new Error('Por favor ingrese secuencias válidas para f[n] y g[n]');
      }

      // Guardar las señales de entrada para mostrar sus gráficas
      setFSignal(parsedFSignal);
      setGSignal(parsedGSignal);

      // Calcular convolución con rango personalizado
      const { result: convolutionResult, indices: resultIndices } = discreteConvolutionWithCustomRange(
        parsedFSignal, 
        parsedGSignal, 
        customRange
      );
      
      setResult(convolutionResult.values);
      setIndices(resultIndices);
    } catch (err) {
      setError((err as Error).message);
      setFSignal(null);
      setGSignal(null);
      setResult([]);
      setIndices([]);
    }
  };

  const handleReset = () => {
    setFInput('');
    setGInput('');
    setRangeStart(-10);
    setRangeEnd(10);
    setFSignal(null);
    setGSignal(null);
    setResult([]);
    setIndices([]);
    setError('');
  };

  const chartData = {
    labels: indices.map(index => index.toString()),
    datasets: [
      {
        label: 'f[n] * g[n]',
        data: result,
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.6)',
        tension: 0,
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Resultado de la Convolución Discreta',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'n',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amplitud',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Convolución Discreta
      </h2>
      
      <p className="text-gray-600 mb-4">
        Calcule la convolución discreta de dos secuencias f[n] y g[n]. El resultado será f[n] * g[n].
        <br />
        <strong className="text-blue-600">Control de rango:</strong> Defina el rango de valores de n donde desea evaluar las señales para mayor control sobre la visualización.
      </p>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">📝 Notaciones Soportadas:</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p><strong>Números:</strong> 1, 2, 3, 4 (separados por comas, desde n=0)</p>
          <p><strong>Impulso discreto:</strong> δ[n] o delta[n] (impulso en n=0)</p>
          <p><strong>Impulso desplazado:</strong> δ[n-2] (impulso en n=2), δ[n+1] (impulso en n=-1)</p>
          <p><strong>Escalón unitario:</strong> u[n] (escalón desde n=0)</p>
          <p><strong>Escalón desplazado:</strong> u[n-3] (escalón desde n=3), u[n+2] (escalón desde n=-2)</p>
          <p><strong>Con amplitud:</strong> 2*δ[n-1], 3*u[n-2]</p>
          <p><strong>Combinaciones:</strong> δ[n] + 2*δ[n-1] - u[n-2]</p>
          <p><strong className="text-blue-600">🎯 Ajuste el rango de n para controlar la región de visualización</strong></p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secuencia f[n]
          </label>
          <input
            type="text"
            value={fInput}
            onChange={(e) => setFInput(e.target.value)}
            placeholder="Ej: δ[n] + 2*δ[n-1] o 1, 2, 3, 4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secuencia g[n]
          </label>
          <input
            type="text"
            value={gInput}
            onChange={(e) => setGInput(e.target.value)}
            placeholder="Ej: u[n] - u[n-3] o 1, 0, -1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rango inicio (n)
          </label>
          <input
            type="number"
            value={rangeStart}
            onChange={(e) => setRangeStart(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rango final (n)
          </label>
          <input
            type="number"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>



      <div className="flex gap-4 mb-4">
        <button
          onClick={handleCalculate}
          className="px-4 py-2 bg-rose-900 text-white rounded-md hover:bg-rose-700 transition-colors"
        >
          Calcular Convolución
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

      {(fSignal || gSignal) && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Señales y Resultados:</h3>
          
          {/* Gráficas de las señales de entrada */}
          {(fSignal && gSignal) && (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Gráfica de f[n] */}
              <div>
                <h4 className="text-md font-medium mb-2 text-blue-600">Señal f[n]</h4>
                <div className="h-[250px]">
                  <Line 
                    data={{
                      labels: fSignal.values.map((_, i) => (fSignal.startIndex + i).toString()),
                      datasets: [{
                        label: 'f[n]',
                        data: fSignal.values,
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.6)',
                        tension: 0,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        showLine: false,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'top' as const },
                        title: { display: true, text: 'Señal de Entrada f[n]' }
                      },
                      scales: {
                        x: { title: { display: true, text: 'n' } },
                        y: { title: { display: true, text: 'Amplitud' } }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Gráfica de g[n] */}
              <div>
                <h4 className="text-md font-medium mb-2 text-green-600">Señal g[n]</h4>
                <div className="h-[250px]">
                  <Line 
                    data={{
                      labels: gSignal.values.map((_, i) => (gSignal.startIndex + i).toString()),
                      datasets: [{
                        label: 'g[n]',
                        data: gSignal.values,
                        borderColor: 'rgb(34, 197, 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.6)',
                        tension: 0,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        showLine: false,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'top' as const },
                        title: { display: true, text: 'Señal de Entrada g[n]' }
                      },
                      scales: {
                        x: { title: { display: true, text: 'n' } },
                        y: { title: { display: true, text: 'Amplitud' } }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Gráfica del resultado de la convolución */}
          {result.length > 0 && (
            <div>
              <h4 className="text-md font-medium mb-2 text-purple-600">Convolución f[n] * g[n]</h4>
              
              {/* Valores numéricos */}
              <div className="mb-4 overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {result.map((value, index) => (
                    <div key={index} className="p-2 bg-purple-50 rounded text-center">
                      y[{indices[index]}] = {value.toFixed(4)}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Gráfica del resultado */}
              <div className="h-[300px]">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 
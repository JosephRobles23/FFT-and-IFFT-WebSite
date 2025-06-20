import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { IrrationalValue } from '../../types/math';
import { IrrationalValueSelector } from './IrrationalValueSelector';
import { MATHEMATICAL_CONSTANTS } from '../../utils/FFT-IFFT/constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ComplexNumberInput: React.FC<Props> = ({ value, onChange }) => {
  const [showIrrationalSelector, setShowIrrationalSelector] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función de validación
  const validateInput = (input: string): boolean => {
    const regex =
      /^(\d+|\d*\+?\d*i|\d*-?\d*i)(,\s*(\d+|\d*\+?\d*i|\d*-?\d*i))*$/;
    return regex.test(input.trim());
  };

  // Validar entrada al perder foco o al presionar Enter
  const handleValidation = () => {
    if (validateInput(value) || value === '') {
      setError(null);
    } else {
      setError(
        'Formato inválido. Usa números reales o complejos separados por comas.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Permite escribir libremente
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleValidation();
    }
  };

  const handleIrrationalSelect = (irrational: IrrationalValue) => {
    const newValue = (() => {
      switch (irrational.type) {
        case 'pi':
          return `${MATHEMATICAL_CONSTANTS.PI}`;
        case 'e':
          return `${MATHEMATICAL_CONSTANTS.E}`;
        case 'phi':
          return `${MATHEMATICAL_CONSTANTS.PHI}`;
        case 'sqrt2':
          return `${MATHEMATICAL_CONSTANTS.SQRT2}`;
        case 'sqrt3':
          return `${MATHEMATICAL_CONSTANTS.SQRT3}`;
        default:
          return '';
      }
    })();

    const updatedValue = value ? `${value},${newValue}` : newValue;
    onChange(updatedValue);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleValidation} // Validar al perder foco
        onKeyPress={handleKeyPress} // Validar al presionar Enter
        className="w-full p-2 pr-10 border rounded-md"
        placeholder="Ejemplo: 1,0,2+i,1"
      />
      <button
        onClick={() => setShowIrrationalSelector(true)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <PlusCircle className="w-6 h-6 text-rose-900 hover:text-blue-600" />
      </button>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {showIrrationalSelector && (
        <IrrationalValueSelector
          onSelect={handleIrrationalSelect}
          onClose={() => setShowIrrationalSelector(false)}
        />
      )}
    </div>
  );
};

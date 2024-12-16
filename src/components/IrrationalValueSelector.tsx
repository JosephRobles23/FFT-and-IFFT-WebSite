import React from 'react';
import { MATHEMATICAL_CONSTANTS } from '../utils/constants';
import { IrrationalValue } from '../types/math';

interface Props {
  onSelect: (value: IrrationalValue) => void;
  onClose: () => void;
}

export const IrrationalValueSelector: React.FC<Props> = ({
  onSelect,
  onClose,
}) => {
  const handleSelect = (type: IrrationalValue['type']) => {
    onSelect({ type, multiplier: 1 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">
          Seleccione un número irracional
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSelect('pi')}
            className="p-3 border rounded-md hover:bg-gray-50"
          >
            π (Pi) = {MATHEMATICAL_CONSTANTS.PI.toFixed(6)}
          </button>

          <button
            onClick={() => handleSelect('e')}
            className="p-3 border rounded-md hover:bg-gray-50"
          >
            e = {MATHEMATICAL_CONSTANTS.E.toFixed(6)}
          </button>

          <button
            onClick={() => handleSelect('phi')}
            className="p-3 border rounded-md hover:bg-gray-50"
          >
            φ (Phi) = {MATHEMATICAL_CONSTANTS.PHI.toFixed(6)}
          </button>

          <button
            onClick={() => handleSelect('sqrt2')}
            className="p-3 border rounded-md hover:bg-gray-50"
          >
            √2 = {MATHEMATICAL_CONSTANTS.SQRT2.toFixed(6)}
          </button>

          <button
            onClick={() => handleSelect('sqrt3')}
            className="p-3 border rounded-md hover:bg-gray-50"
          >
            √3 = {MATHEMATICAL_CONSTANTS.SQRT3.toFixed(6)}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full p-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

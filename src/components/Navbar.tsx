import React from 'react';

interface NavbarProps {
  activeSection: 'fft' | 'convolution';
  onSectionChange: (section: 'fft' | 'convolution') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <nav className="bg-rose-900 text-white py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center gap-8">
          <button
            onClick={() => onSectionChange('fft')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeSection === 'fft'
                ? 'bg-rose-700 text-white'
                : 'text-rose-200 hover:text-white hover:bg-rose-800'
            }`}
          >
            FFT / IFFT
          </button>
          <button
            onClick={() => onSectionChange('convolution')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeSection === 'convolution'
                ? 'bg-rose-700 text-white'
                : 'text-rose-200 hover:text-white hover:bg-rose-800'
            }`}
          >
            Convolución Discreta
          </button>
        </div>
      </div>
    </nav>
  );
}; 
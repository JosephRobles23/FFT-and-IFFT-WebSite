import React from 'react';

interface HeaderProps {
  activeSection: 'fft' | 'convolution';
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const getHeaderContent = () => {
    if (activeSection === 'fft') {
      return {
        title: 'Transformada Discreta\nde Fourier',
        description: 'La Transformada Discreta de Fourier (TDF) es una herramienta matemática que transforma una señal discreta en el tiempo en una representación en frecuencia. Permite analizar las componentes frecuenciales de señales periódicas y no periódicas, facilitando su estudio en dominios como el procesamiento de señales, comunicaciones y análisis de sistemas.'
      };
    } else {
      return {
        title: 'Convolución\nDiscreta',
        description: 'La convolución discreta es una operación matemática fundamental en el procesamiento de señales que combina dos secuencias para producir una tercera. Es esencial en el análisis de sistemas lineales, filtrado digital y caracterización de respuestas de sistemas.'
      };
    }
  };

  const { title, description } = getHeaderContent();

  return (
    <header className="bg-rose-950 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-12 mb-6">
          <img
            src="https://i.postimg.cc/j28V0XHB/Uni-logo-transparente-granate.png"
            alt="Universidad logo"
            className="w-27 h-28 rounded-md hidden md:flex "
          />
          <h1 className="text-4xl font-bold text-center whitespace-pre-line">
            {title}
          </h1>
          <img
            src="https://i.postimg.cc/Y072qbm9/Joseph-Fourier.jpg"
            alt="Fourier bust"
            className="w-24 h-24 rounded-lg hidden md:flex "
          />
        </div>
        <p className="text-center max-w-3xl mx-auto text-lg">
          {description}
        </p>
      </div>
    </header>
  );
};

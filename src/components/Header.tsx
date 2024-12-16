import React from 'react';

export const Header = () => {
  return (
    <header className="bg-rose-950 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-12 mb-6">
          <img
            src="https://i.postimg.cc/j28V0XHB/Uni-logo-transparente-granate.png"
            alt="Fourier bust"
            className="w-27 h-28 rounded-md "
          />
          <h1 className="text-4xl font-bold text-center">
            Transformada Discreta
            <br />
            de Fourier
          </h1>
          <img
            src="https://i.postimg.cc/Y072qbm9/Joseph-Fourier.jpg"
            alt="Fourier bust"
            className="w-24 h-24 rounded-lg "
          />
        </div>
        <p className="text-center max-w-3xl mx-auto text-lg">
          La Transformada Discreta de Fourier (TDF) es una herramienta
          matemática que transforma una señal discreta en el tiempo en una
          representación en frecuencia. Permite analizar las componentes
          frecuenciales de señales periódicas y no periódicas, facilitando su
          estudio en dominios como el procesamiento de señales, comunicaciones y
          análisis de sistemas.
        </p>
      </div>
    </header>
  );
};

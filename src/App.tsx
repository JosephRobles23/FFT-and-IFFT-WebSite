import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { TransformCalculator } from './components/Component-FFT-IFFT/TransformCalculator';
import { ConvolutionCalculator } from './components/Convolution/ConvolutionCalculator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

function App() {
  const [activeSection, setActiveSection] = useState<'fft' | 'convolution'>('fft');

  const renderMainContent = () => {
    if (activeSection === 'fft') {
      return (
        <>
          <TransformCalculator operation="DFT" />
          <TransformCalculator operation="IDFT" />
        </>
      );
    } else {
      return <ConvolutionCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header activeSection={activeSection} />
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto">
          {renderMainContent()}
          <Analytics />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

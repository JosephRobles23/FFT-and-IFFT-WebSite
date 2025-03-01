import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { TransformCalculator } from './components/TransformCalculator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto">
          <TransformCalculator operation="DFT" />
          <TransformCalculator operation="IDFT" />
          <Analytics />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

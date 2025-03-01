import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-4 mt-8">
      <div className="max-w-4xl mx-auto text-center">
        <p>
          Página web creada por{" "}
          <a
            href="https://www.linkedin.com/in/joseph-chuquipiondo-robles-230733256/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Joseph Chuquipiondo Robles
          </a>{" "}
          y{" "}
          <a
            href="https://www.linkedin.com/in/ismael-rojas-carlos-918153265/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Ismael Rojas
          </a>{" "}
          para el curso de EE410 de la FIEE-UNI a cargo del catedrático Daniel Victor Rojas.
        </p>
      </div>
    </footer>
  );
};

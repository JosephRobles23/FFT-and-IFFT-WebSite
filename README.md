# FFT-and-IFFT-WebSite

Este repositorio contiene el código fuente de una aplicación web desarrollada para realizar cálculos de FFT (Transformada Rápida de Fourier), IFFT (Transformada Inversa Rápida de Fourier) y **Convolución Discreta**. Este proyecto fue desarrollado como parte del curso **Análisis de Señales y Sistemas** en la **Universidad Nacional de Ingeniería**.

## Características principales

- **Cálculos de FFT e IFFT**: Herramienta interactiva para analizar señales mediante transformadas de Fourier.
- **Convolución Discreta**: Calculadora avanzada para convolución de señales discretas con soporte para notaciones matemáticas.
- **Interfaz amigable**: Diseñada con un enfoque simple e intuitivo con navegación entre herramientas.
- **Tecnologías modernas**: Desarrollado con Vite, React, TypeScript y TailwindCSS para garantizar una experiencia de usuario rápida y eficiente.
- **Implementación gráfica**: Contiene gráficos interactivos para la visualización de señales de entrada y salida.
- **Notaciones matemáticas avanzadas**: Soporte para impulsos discretos (δ[n]), escalones unitarios (u[n]) y combinaciones complejas.

## Enlace a la web

Puedes visitar la aplicación desplegada en el siguiente enlace: [fft-and-ifft-web-site.vercel.app](https://fft-and-ifft-web-site.vercel.app)

## Tecnologías utilizadas

Este proyecto utiliza las siguientes tecnologías:

- **Vite**: Entorno de desarrollo rápido para aplicaciones web modernas.
- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **TailwindCSS**: Framework de CSS para diseñar interfaces estilizadas y responsivas.
- **Chart.js**: Librería para la generación de gráficos interactivos y responsivos.

## Interfaz 

![image](https://github.com/user-attachments/assets/cd0e1622-ea8f-44e3-99ff-7539509b2e48)

![image](https://github.com/user-attachments/assets/3bf25862-2cc1-4b5c-9949-3b812fe28bfa)

## Herramientas disponibles

### 🌊 FFT / IFFT (Transformadas de Fourier)
- **Transformada Rápida de Fourier (FFT)**: Convierte señales del dominio temporal al frecuencial
- **Transformada Inversa (IFFT)**: Convierte señales del dominio frecuencial al temporal
- **Entrada**: Números complejos y constantes matemáticas (π, e, φ, etc.)
- **Salida**: Valores complejos con visualización separada de parte real e imaginaria

### ⚡ Convolución Discreta
- **Operación**: Calcula la convolución f[n] * g[n] de dos señales discretas
- **Notaciones soportadas**:
  - Números simples: `1, 2, 3, 4`
  - Impulso discreto: `δ[n]`, `δ[n-2]`, `δ[n+1]`
  - Escalón unitario: `u[n]`, `u[n-3]`, `u[n+2]`
  - Amplitudes: `2*δ[n-1]`, `3*u[n-2]`
  - Combinaciones: `δ[n] + 2*δ[n-1] - u[n-2]`
- **Visualización**: Gráficas separadas para f[n], g[n] y el resultado f[n]*g[n]
- **Control de rango**: Definir manualmente el rango de evaluación (inicio y final)
- **Aplicaciones**: Análisis de sistemas lineales, filtrado digital, respuesta impulsional

### 🎯 Características Avanzadas
- **Navegación intuitiva**: Cambio fluido entre herramientas mediante navbar
- **Gráficos interactivos**: Visualización con puntos discretos y etiquetas descriptivas
- **Rango personalizable**: Control total sobre la región de análisis
- **Responsive design**: Adaptable a diferentes tamaños de pantalla
- **Validación en tiempo real**: Detección automática de errores en las entradas

## Instalación y uso

Si deseas clonar el proyecto y ejecutarlo localmente, sigue estos pasos:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/JosephRobles23/FFT-and-IFFT-WebSite.git
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd FFT-and-IFFT-WebSite
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre tu navegador y visita `http://localhost:5173` para ver la aplicación.

## Estructura del proyecto

- `src/`:
  - **components/**: Componentes reutilizables de la interfaz
    - `TransformCalculator.tsx`: Calculadora de FFT/IFFT
    - `ConvolutionCalculator.tsx`: Calculadora de convolución discreta
    - `ComplexNumberInput.tsx`: Input especializado para números complejos
    - `Header.tsx`: Encabezado dinámico de la aplicación
    - `Navbar.tsx`: Barra de navegación entre herramientas
    - `Footer.tsx`: Pie de página
  - **utils/**: Funciones auxiliares para cálculos matemáticos
    - `fft.ts`: Implementación de algoritmos FFT/IFFT
    - `convolution.ts`: Algoritmos de convolución discreta
    - `signalFunctions.ts`: Generación y parsing de señales discretas
    - `complexMath.ts`: Operaciones con números complejos
  - **types/**: Definiciones de tipos TypeScript
    - `math.ts`: Tipos para números complejos y operaciones


## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir, por favor:

1. Haz un fork de este repositorio.
2. Crea una rama para tu feature o corrección:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza tus cambios y realiza un commit:

   ```bash
   git commit -m "Añadida nueva funcionalidad"
   ```
4. Envía un pull request.

## Ejemplos de uso

### FFT/IFFT
```
Entrada FFT: 1+2i, 3+4i, -i, π
Salida: Transformada de Fourier de la secuencia
```

### Convolución Discreta
```
f[n]: δ[n] + δ[n-2]        (dos impulsos)
g[n]: u[n] - u[n-3]        (ventana rectangular)
Resultado: Convolución que muestra el efecto del filtro
```

```
f[n]: 1, 2, 1              (secuencia numérica)
g[n]: 1, 0, -1             (filtro diferenciador)
Resultado: Señal filtrada
```

### Casos de estudio comunes
- **Respuesta impulsional**: Usa δ[n] como entrada para caracterizar sistemas
- **Filtrado**: Aplica ventanas y filtros a señales de prueba
- **Análisis de sistemas**: Combina escalones y impulsos para estudiar comportamiento

## Extra : Script de FFT eh IFFT en TI-BASIC (Calculadora Texas Instruments TI-Nspire CX)
1. Ingresa al siguiente link y descarga el script en tu ordenador: https://drive.google.com/drive/folders/16sKaea5lO7K4v4Ur_IF_S58xLFjuq4Pj?usp=sharing 
2. Conecta tu Calculadora Texas y abre el emulador o aplicación(TI-Nspire CX CAS Student Software)
3. Arrastra el script desde donde lo guardaste y guardalo en los documentos de tu calculadora Texas dentro del software
   
![Imagen de WhatsApp 2025-03-01 a las 11 50 27_40852efa](https://github.com/user-attachments/assets/a4ca8b38-687b-4045-b0b6-40eafaa53f36)

### Pasos para usarlo: 
1. Ingresa 'fft()' si quieres realizar un cálculo de Transformada de Fourier o 'ifft()' si quieres realizar un cálculo de Transformada Inversa de Fourier.
   
![Imagen de WhatsApp 2025-03-01 a las 11 35 28_83915269](https://github.com/user-attachments/assets/d5b3466a-9693-416b-8bf0-6506d2cb3611)

2. Ingresa la cantidad de entradas de tu operación:
    
![Imagen de WhatsApp 2025-03-01 a las 11 36 02_9e2c7727](https://github.com/user-attachments/assets/9c15f29d-f9c7-41fd-b7d5-da22750743e2)

3. Ingresa cada uno de los parámetros de entrada:
   
![Imagen de WhatsApp 2025-03-01 a las 11 36 57_efb67d15](https://github.com/user-attachments/assets/0566cbcd-64ef-4bfc-bc60-dcc8a4d9f966)

4. ¡Y ya está! Obtienes las salidas de la transformada.
   
![Imagen de WhatsApp 2025-03-01 a las 11 38 10_1e292473](https://github.com/user-attachments/assets/98c04493-caab-44c6-ad9f-6cc79b1a9705)


## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

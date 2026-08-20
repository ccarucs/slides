/**
 * svg-loader.js
 * Cargador automático y modular de gráficos SVG para múltiples páginas.
 */

/**
 * Carga un archivo SVG mediante fetch e inserta su contenido en un elemento HTML.
 * @param {string} url - Ruta hacia el archivo .svg
 * @param {HTMLElement} element - Elemento contenedor donde se inyectará el SVG
 */
async function loadSVGElement(url, element) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Estado HTTP ${response.status}: No se pudo descargar el archivo.`);
    }

    const svgData = await response.text();
    element.innerHTML = svgData;
  } catch (error) {
    console.error(`[SVG Loader Error] Falló la carga de "${url}":`, error);
  }
}

/**
 * Escanea el documento en busca de todos los elementos con el atributo [data-svg]
 * e inyecta las imágenes correspondientes.
 */
function initSVGLoader() {
  // Busca todos los elementos que contengan el atributo data-svg
  const containers = document.querySelectorAll('[data-svg]');

  containers.forEach(container => {
    const svgPath = container.getAttribute('data-svg');
    if (svgPath) {
      loadSVGElement(svgPath, container);
    }
  });
}

// Ejecutar automáticamente cuando la estructura del HTML (DOM) esté lista
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSVGLoader);
} else {
  initSVGLoader();
}
// Lógica Interactiva para la presentación de Compiladores (Clase 1)

function init() {
  buildNavigationMenu();
  initTheme();
  initQuiz();
  initSimulator();
  initVideos();
  checkPrintMode();

  if (window.Reveal) {
    // Cada vez que cambia la diapositiva, actualizar el menú activo
    Reveal.on('slidechanged', (event) => {
      updateActiveMenu(event.indexh);
      // Pausar videos que queden en diapositivas anteriores
      pauseAllVideos();
    });
    
    // Sincronizar el estado del menú actual inicial
    updateActiveMenu(Reveal.getIndices().h);
  }

  // NUEVA COMPROBACIÓN ASÍNCRONA PARA EL PLUGIN DE MARKDOWN
if (window.Reveal) {
  if (Reveal.isReady()) {
    init;
  } else {
    // Esperamos específicamente a que Reveal termine de cargar el Markdown externo
    Reveal.on('ready', init);
  }
} else {
  document.addEventListener('DOMContentLoaded', init);
}
}

// Inicialización segura considerando estados de carga y eventos ya disparados
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  if (window.Reveal && Reveal.isReady()) {
    init();
  } else if (window.Reveal) {
    Reveal.on('ready', init);
  } else {
    setTimeout(init, 100);
  }
} else {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.Reveal && Reveal.isReady()) {
      init();
    } else if (window.Reveal) {
      Reveal.on('ready', init);
    } else {
      init();
    }
  });
}

/* --- 1. Control de Menú de Navegación (Índice) --- */
function buildNavigationMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const closeMenu = document.getElementById('close-menu');
  const overlay = document.getElementById('menu-overlay');
  const menuList = document.getElementById('menu-list');
  
  if (!menuToggle) return;

  // Toggle Menú
  menuToggle.addEventListener('click', () => {
    document.body.classList.add('index-open');
  });

  // Cerrar Menú
  const closeActions = [closeMenu, overlay];
  closeActions.forEach(el => {
    if (el) {
      el.addEventListener('click', () => {
        document.body.classList.remove('index-open');
      });
    }
  });

  // Generar items dinámicamente según las diapositivas
  const sections = document.querySelectorAll('.reveal .slides > section');
  menuList.innerHTML = ''; // Limpiar

  sections.forEach((sec, idx) => {
    // Intentar obtener el título del atributo data-menu-title, o del primer H2/H3
    let title = sec.getAttribute('data-menu-title');
    if (!title) {
      const heading = sec.querySelector('h2, h3, h1');
      title = heading ? heading.innerText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim() : `Diapositiva ${idx + 1}`;
    }

    // Saltar slides que sean vacías o duplicados sin título útil
    if (title.toLowerCase().includes('portada') || idx === 0) {
      title = "Inicio / Portada";
    }

    const li = document.createElement('li');
    li.setAttribute('data-slide-index', idx);
    
    const a = document.createElement('a');
    a.href = '#';
    a.innerText = `${idx + 1}. ${title}`;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      Reveal.slide(idx, 0);
      document.body.classList.remove('index-open');
    });

    li.appendChild(a);
    menuList.appendChild(li);
  });

  updateActiveMenu(0);
}

function updateActiveMenu(slideIdx) {
  const items = document.querySelectorAll('#menu-list li');
  items.forEach(item => {
    const idx = parseInt(item.getAttribute('data-slide-index'), 10);
    if (idx === slideIdx) {
      item.classList.add('active');
      // Scroll automático suave hacia el elemento activo en el drawer
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      item.classList.remove('active');
    }
  });
}

/* --- 2. Control de Tema (Claro / Oscuro) --- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Cargar preferencia anterior o por defecto oscuro
  const savedTheme = localStorage.getItem('compiler-theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeIcon('light');
  } else {
    document.body.classList.remove('light-theme');
    updateThemeIcon('dark');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    const newTheme = isLight ? 'light' : 'dark';
    localStorage.setItem('compiler-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-moon'; // Para volver a oscuro
    icon.title = 'Cambiar a Modo Oscuro';
  } else {
    icon.className = 'fas fa-sun'; // Para volver a claro
    icon.title = 'Cambiar a Modo Claro';
  }
}

/* --- 3. Modal de Ayuda --- */
const helpToggle = document.getElementById('help-toggle');
const closeHelp = document.getElementById('close-help');
const helpModal = document.getElementById('help-modal');

if (helpToggle && helpModal) {
  helpToggle.addEventListener('click', () => {
    document.body.classList.add('help-open');
  });

  if (closeHelp) {
    closeHelp.addEventListener('click', () => {
      document.body.classList.remove('help-open');
    });
  }

  // Cerrar al hacer clic fuera del modal
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('help-open')) {
      if (!helpModal.contains(e.target) && e.target !== helpToggle && !helpToggle.contains(e.target)) {
        document.body.classList.remove('help-open');
      }
    }
  });
}

/* --- 4. Control de Impresión a PDF --- */
function checkPrintMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const printBanner = document.getElementById('print-banner');
  
  if (urlParams.has('print-pdf')) {
    if (printBanner) {
      printBanner.style.display = 'flex';
    }
    // Añadir botón de cierre de impresión
    const exitPrintBtn = document.getElementById('exit-print');
    if (exitPrintBtn) {
      exitPrintBtn.addEventListener('click', () => {
        urlParams.delete('print-pdf');
        window.location.search = urlParams.toString();
      });
    }
  }

  const printBtn = document.getElementById('print-slides');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      if (urlParams.has('print-pdf')) {
        window.print();
      } else {
        urlParams.set('print-pdf', 'true');
        window.location.search = urlParams.toString();
      }
    });
  }
}

/* --- 5. Interacción de Preguntas (Quizzes) --- */
function initQuiz() {
  const quizzes = document.querySelectorAll('.quiz-container');
  
  quizzes.forEach(quiz => {
    const options = quiz.querySelectorAll('.quiz-option');
    const feedback = quiz.nextElementSibling; // El div .quiz-feedback
    
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        // Remover selecciones anteriores de esta diapositiva
        options.forEach(o => {
          o.classList.remove('correct', 'incorrect');
        });
        
        const isCorrect = opt.getAttribute('data-correct') === 'true';
        if (isCorrect) {
          opt.classList.add('correct');
          if (feedback) {
            feedback.innerHTML = `<strong>¡Correcto!</strong> ${feedback.getAttribute('data-correct-explain') || '¡Muy bien pensado!'}`;
            feedback.style.color = '#10b981';
            feedback.classList.add('show');
          }
        } else {
          opt.classList.add('incorrect');
          if (feedback) {
            feedback.innerHTML = `<strong>Incorrecto.</strong> ${feedback.getAttribute('data-incorrect-explain') || 'Intenta de nuevo.'}`;
            feedback.style.color = '#ef4444';
            feedback.classList.add('show');
          }
        }
      });
    });
  });
}

/* --- 6. Simulador Interactivo de Fases de Compilación --- */
const simData = [
  {
    title: "0. Estado Inicial (Flujo de Entrada)",
    expr: "posicion := inicial + velocidad * 60",
    desc: "El compilador recibe la sentencia original escrita por el programador en lenguaje de alto nivel. Aún es solo una secuencia plana de caracteres.",
    out: "<strong>Entrada:</strong> Cadena de caracteres<br><pre><code class='language-javascript'>\"posicion := inicial + velocidad * 60\"</code></pre>"
  },
  {
    title: "1. Análisis Léxico (Scanner / Tokenizer)",
    expr: "<span style='color:var(--accent-color)'>posicion</span> <span style='color:var(--accent-secondary)'>:=</span> <span style='color:var(--accent-color)'>inicial</span> <span style='color:var(--accent-success)'>+</span> <span style='color:var(--accent-color)'>velocidad</span> <span style='color:var(--accent-warning)'>*</span> <span style='color:var(--accent-danger)'>60</span>",
    desc: "El analizador léxico procesa carácter por carácter y agrupa secuencias de caracteres con significado propio (lexemas) en <strong>tokens</strong> (componentes léxicos), descartando comentarios y espacios.",
    out: "<strong>Fila de Tokens:</strong><br>1. <span style='color:var(--accent-color)'>id1</span> (referencia a 'posicion' en la Tabla de Símbolos)<br>2. <span style='color:var(--accent-secondary)'>ASSIGN</span> (:=)<br>3. <span style='color:var(--accent-color)'>id2</span> (referencia a 'inicial')<br>4. <span style='color:var(--accent-success)'>PLUS</span> (+)<br>5. <span style='color:var(--accent-color)'>id3</span> (referencia a 'velocidad')<br>6. <span style='color:var(--accent-warning)'>MULT</span> (*)<br>7. <span style='color:var(--accent-danger)'>NUM</span> (60)"
  },
  {
    title: "2. Análisis Sintáctico (Parser)",
    expr: "posicion := inicial + (velocidad * 60)",
    desc: "El analizador sintáctico comprueba la gramática del flujo de tokens y construye un <strong>Árbol de Sintaxis Abstracta (AST)</strong> que determina el orden lógico de las operaciones, respetando la precedencia del operador * sobre el +.",
    out: "<strong>Estructura Jerárquica (AST):</strong><br><pre><code>      := (asignación)\n     /  \\\n   id1   + (suma)\n        /  \\\n     id2    * (multiplicación)\n           /  \\\n        id3    60</code></pre>"
  },
  {
    title: "3. Análisis Semántico",
    expr: "posicion := inicial + (velocidad * <span style='color:var(--accent-color)'>ent_a_real(60)</span>)",
    desc: "Verifica la coherencia semántica: que las variables existan y sus tipos sean válidos para las operaciones. Aquí, detecta que 60 es un entero y que la operación requiere reales, por lo que <strong>inserta una conversión explícita</strong> en el árbol.",
    out: "<strong>AST Anotado (con Tipos):</strong><br><pre><code>      := (tipo: real)\n     /  \\\n   id1   + (tipo: real)\n        /  \\\n     id2    * (tipo: real)\n           /  \\\n        id3    ent_a_real (tipo: real)\n                 |\n                60</code></pre>"
  },
  {
    title: "4. Generación de Código Intermedio",
    expr: "Representación lineal en código de tres direcciones (TAC)",
    desc: "El compilador genera un código intermedio independiente del procesador final. Esto simplifica la traducción y permite optimizaciones genéricas. El formato más usado es el de <strong>tres direcciones</strong>.",
    out: "<strong>Código de Tres Direcciones:</strong><br><pre><code class='language-python'>temp1 = ent_a_real(60)\ntemp2 = id3 * temp1\ntemp3 = id2 + temp2\nid1 = temp3</code></pre>"
  },
  {
    title: "5. Optimización de Código",
    expr: "Reducción y simplificación de las instrucciones",
    desc: "Analiza el código intermedio para hacerlo más rápido y eficiente. En este caso, convierte el entero 60 a real en tiempo de compilación (60.0), eliminando la instrucción redundante `ent_a_real` en tiempo de ejecución.",
    out: "<strong>Código Optimizado:</strong><br><pre><code class='language-python'>temp1 = id3 * 60.0\nid1 = id2 + temp1</code></pre>"
  },
  {
    title: "6. Generación de Código Final",
    expr: "Traducción a lenguaje ensamblador / máquina real",
    desc: "La fase final traduce el código optimizado a instrucciones nativas para el procesador específico. Se encarga de la <strong>asignación de registros</strong> limitados de la CPU (R1, R2, etc.).",
    out: "<strong>Código Ensamblador Destino:</strong><br><pre><code class='language-x86asm'>MOV  id3, R2\nMUL  #60.0, R2\nMOV  id2, R1\nADD  R2, R1\nMOV  R1, id1</code></pre>"
  }
];

let simCurrentIndex = 0;

function initSimulator() {
  const stepsContainer = document.getElementById('sim-steps');
  const simExpr = document.getElementById('sim-expr');
  const simDesc = document.getElementById('sim-desc');
  const simOutput = document.getElementById('sim-output');
  const prevBtn = document.getElementById('sim-prev');
  const nextBtn = document.getElementById('sim-next');
  const infoEl = document.getElementById('sim-info');

  if (!stepsContainer || !simExpr) return;

  // Limpiar y poblar los botones laterales
  stepsContainer.innerHTML = '';
  simData.forEach((step, idx) => {
    const btn = document.createElement('button');
    btn.className = `sim-step-btn ${idx === 0 ? 'active' : ''}`;
    // Extraer solo la palabra inicial como nombre corto
    const shortName = step.title.split(' ')[1] || step.title;
    btn.innerText = `${idx}. ${shortName}`;
    btn.addEventListener('click', () => {
      goToSimStep(idx);
    });
    stepsContainer.appendChild(btn);
  });

  // Eventos de Navegación inferior
  prevBtn.addEventListener('click', () => {
    if (simCurrentIndex > 0) goToSimStep(simCurrentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (simCurrentIndex < simData.length - 1) goToSimStep(simCurrentIndex + 1);
  });

  // Mostrar el paso inicial
  goToSimStep(0);
}

function goToSimStep(index) {
  simCurrentIndex = index;
  const data = simData[index];

  // Actualizar textos
  document.getElementById('sim-expr').innerHTML = data.expr;
  document.getElementById('sim-desc').innerText = data.desc;
  document.getElementById('sim-output').innerHTML = data.out;
  document.getElementById('sim-info').innerText = `Paso ${index + 1} de ${simData.length}`;

  // Actualizar botones activos
  const buttons = document.querySelectorAll('#sim-steps .sim-step-btn');
  buttons.forEach((btn, idx) => {
    if (idx === index) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  // Habilitar/deshabilitar botones
  document.getElementById('sim-prev').disabled = index === 0;
  document.getElementById('sim-next').disabled = index === simData.length - 1;
}

/* --- 7. Control de Videos y Modo Teatro --- */
function initVideos() {
  const videos = document.querySelectorAll('.video-player-wrapper video');
  
  videos.forEach(vid => {
    vid.addEventListener('play', () => {
      document.body.classList.add('video-active');
    });

    vid.addEventListener('pause', () => {
      // Solo quitar si no hay otros videos reproduciéndose
      checkActiveVideoPlayback();
    });

    vid.addEventListener('ended', () => {
      checkActiveVideoPlayback();
    });
  });
}

function checkActiveVideoPlayback() {
  const videos = document.querySelectorAll('.video-player-wrapper video');
  let anyPlaying = false;
  videos.forEach(v => {
    if (!v.paused && !v.ended) {
      anyPlaying = true;
    }
  });
  if (!anyPlaying) {
    document.body.classList.remove('video-active');
  }
}

function pauseAllVideos() {
  const videos = document.querySelectorAll('.video-player-wrapper video');
  videos.forEach(v => {
    v.pause();
  });
  document.body.classList.remove('video-active');
}

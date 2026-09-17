// Lógica Interactiva para la presentación de Compiladores 

function init() {
  buildNavigationMenu();
  initTheme();
  initQuiz();
  initSimulator();
  initVideos();
  initFooter();          
  checkPrintMode();

  if (window.Reveal) {
    // Cada vez que cambia la diapositiva, actualizar el menú activo
    Reveal.on('slidechanged', (event) => {
      updateActiveMenu(event.indexh);
      // Pausar videos que queden en diapositivas anteriores
      pauseAllVideos();
      initSimulator();
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


/* --- 1.b Pie de página dinámico (materia + tema) --- */
function initFooter() {
  const footer = document.getElementById('slide-footer');
  const footerTema = document.getElementById('footer-tema');
  if (!footer || !window.Reveal) return;

  function updateFooter(event) {
    const indexh = (event && typeof event.indexh === 'number')
      ? event.indexh
      : Reveal.getIndices().h;

    // Ocultar solo en la portada (primera slide horizontal)
    if (indexh === 0) {
      footer.style.display = 'none';
      return;
    }
    footer.style.display = 'flex';
    footerTema.innerText = window.temaClaseActual || '';
  }

  Reveal.on('slidechanged', updateFooter);
  updateFooter({ indexh: Reveal.getIndices().h });
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
            feedback.innerHTML = `😀 <strong> ¡Correcto! </strong> ${feedback.getAttribute('data-correct-explain') || '¡Muy bien pensado!'}`;
            feedback.style.color = '#10b981';
            feedback.classList.add('show');
          }
        } else {
          opt.classList.add('incorrect');
          if (feedback) {
            feedback.innerHTML = `🙁 <strong> Incorrecto. </strong> ${feedback.getAttribute('data-incorrect-explain') || 'Intenta de nuevo.'}`;
            feedback.style.color = '#ef4444';
            feedback.classList.add('show');
          }
        }
        
        // Re-renderizar fórmulas matemáticas (KaTeX) en el feedback,
        // ya que este HTML se inyecta después de que RevealMath ya
        // procesó la diapositiva y no lo detecta automáticamente.
        if (feedback && window.renderMathInElement) {
          renderMathInElement(feedback, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '\\[', right: '\\]', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false }
            ],
            throwOnError: false
          });
        }
      });
    });
  });
}

/* --- 6. Simuladores Interactivos --- */
const simDataClase01 = [
  {
    title: "Estado Inicial (Flujo de Entrada)",
    expr: "posicion := inicial + velocidad * 60",
    desc: "El compilador recibe la sentencia original escrita por el programador en lenguaje de alto nivel. Aún es solo una secuencia plana de caracteres.",
    out: "<strong>Entrada:</strong> Cadena de caracteres<br><pre><code class='language-javascript'>\"posicion := inicial + velocidad * 60\"</code></pre>"
  },
  {
    title: "Análisis Léxico",
    expr: "<span style='color:var(--accent-color)'>posicion</span> <span style='color:var(--accent-secondary)'>:=</span> <span style='color:var(--accent-color)'>inicial</span> <span style='color:var(--accent-success)'>+</span> <span style='color:var(--accent-color)'>velocidad</span> <span style='color:var(--accent-warning)'>*</span> <span style='color:var(--accent-danger)'>60</span>",
    desc: "El analizador léxico procesa carácter por carácter y agrupa secuencias de caracteres con significado propio en <strong>tokens</strong> (componentes léxicos), descartando comentarios y espacios.",
    out: "<strong>Fila de Tokens:</strong><br>1. <span style='color:var(--accent-color)'>id1</span> (referencia a 'posicion' en la Tabla de Símbolos)<br>2. <span style='color:var(--accent-secondary)'>ASSIGN</span> (:=)<br>3. <span style='color:var(--accent-color)'>id2</span> (referencia a 'inicial')<br>4. <span style='color:var(--accent-success)'>PLUS</span> (+)<br>5. <span style='color:var(--accent-color)'>id3</span> (referencia a 'velocidad')<br>6. <span style='color:var(--accent-warning)'>MULT</span> (*)<br>7. <span style='color:var(--accent-danger)'>NUM</span> (60)"
  },
  {
    title: "Análisis Sintáctico",
    expr: "posicion := inicial + (velocidad * 60)",
    desc: "El analizador sintáctico comprueba la gramática del flujo de tokens y construye un <strong>Árbol de Sintaxis Abstracta (AST)</strong> que determina el orden lógico de las operaciones, respetando la precedencia del operador * sobre el +.",
    out: "<strong>Estructura Jerárquica (AST):</strong><br><pre><code>      := (asignación)\n     /  \\\n   id1   + (suma)\n        /  \\\n     id2    * (multiplicación)\n           /  \\\n        id3    60</code></pre>"
  },
  {
    title: "Análisis Semántico",
    expr: "posicion := inicial + (velocidad * <span style='color:var(--accent-color)'>ent_a_real(60)</span>)",
    desc: "Verifica la coherencia semántica: que las variables existan y sus tipos sean válidos para las operaciones. Aquí, detecta que 60 es un entero y que la operación requiere reales, por lo que <strong>inserta una conversión explícita</strong> en el árbol.",
    out: "<strong>AST Anotado (con Tipos):</strong><br><pre><code>      := (tipo: real)\n     /  \\\n   id1   + (tipo: real)\n        /  \\\n     id2    * (tipo: real)\n           /  \\\n        id3    ent_a_real (tipo: real)\n                 |\n                60</code></pre>"
  },
  {
    title: "Generación de Código Intermedio",
    expr: "Representación lineal en código de tres direcciones",
    desc: "El compilador genera un código intermedio independiente del procesador final. Esto simplifica la traducción y permite optimizaciones genéricas. El formato más usado es el de <strong>tres direcciones</strong>.",
    out: "<strong>Código de Tres Direcciones:</strong><br><pre><code class='language-python'>temp1 = ent_a_real(60)\ntemp2 = id3 * temp1\ntemp3 = id2 + temp2\nid1 = temp3</code></pre>"
  },
  {
    title: "Optimización de Código",
    expr: "Reducción y simplificación de las instrucciones",
    desc: "Analiza el código intermedio para hacerlo más rápido y eficiente. En este caso, convierte el entero 60 a real en tiempo de compilación (60.0), eliminando la instrucción redundante `ent_a_real` en tiempo de ejecución.",
    out: "<strong>Código Optimizado:</strong><br><pre><code class='language-python'>temp1 = id3 * 60.0\nid1 = id2 + temp1</code></pre>"
  },
  {
    title: "Generación de Código Final",
    expr: "Traducción a lenguaje ensamblador / máquina real",
    desc: "La fase final traduce el código optimizado a instrucciones nativas para el procesador específico. Se encarga de la <strong>asignación de registros</strong> limitados de la CPU (R1, R2, etc.).",
    out: "<strong>Código Ensamblador Destino:</strong><br><pre><code class='language-x86asm'>MOV  id3, R2\nMUL  #60.0, R2\nMOV  id2, R1\nADD  R2, R1\nMOV  R1, id1</code></pre>"
  }
];

// Data para el Ejercicio Guiado de GIC (Clase 07_2)
const simDataClase07_2 = [
  {
    title: "¿Cuál es el Símbolo Inicial?",
    expr: "Símbolo Inicial: <span style='color:var(--accent-color); font-weight:bold;'>S</span> &nbsp;&in;&nbsp; N",
    desc: "El <strong>símbolo inicial</strong> es el símbolo No Terminal distinguido desde el cual comienza toda derivación en la gramática.",
    out: "<div style='font-size:0.85rem; line-height:1.6;'>" +
         "<strong>Símbolo Inicial:</strong> <span style='color:var(--accent-color); font-weight:bold; font-size:1.1rem;'>S</span><br><br>" +
         "• Es el punto de partida único definido en la cuádrupla \\(G = (N, T, S, P)\\).<br>" +
         "• Toda derivación de una cadena inicia aplicando una regla con lado izquierdo <strong>S</strong>." +
         "</div>"
  },
  {
    title: "¿Cuáles son los No Terminales?",
    expr: "N = \\{ S, L \\}",
    desc: "Los <strong>No Terminales</strong> son variables sintácticas que representan componentes jerárquicos y se reemplazan mediante reglas de producción.",
    out: "<div style='font-size:0.85rem; line-height:1.6;'>" +
         "<strong>Conjunto de No Terminales (N):</strong><br><br>" +
         "• <span style='color:var(--accent-color); font-weight:bold;'>S:</span> Representa una expresión o elemento (o encerrado entre paréntesis).<br>" +
         "• <span style='color:var(--accent-color); font-weight:bold;'>L:</span> Representa una lista de elementos separados por comas.<br><br>" +
         "<em>Formulación matemática:</em> \\(N = \\{S, L\\}\\)" +
         "</div>"
  },
  {
    title: "¿Cuáles son los Terminales?",
    expr: "T = \\{ a, '(', ')', ',' \\}",
    desc: "Los <strong>Terminales</strong> son los símbolos finales (tokens del lenguaje) que componen la cadena generada. No pueden reemplazarse por reglas.",
    out: "<div style='font-size:0.85rem; line-height:1.6;'>" +
         "<strong>Conjunto de Terminales (T):</strong><br><br>" +
         "• <span style='color:var(--accent-color); font-weight:bold;'>a</span> &nbsp;&nbsp; <br>" +
         "• <span style='color:var(--accent-color); font-weight:bold;'>(</span> y <span style='color:var(--accent-color); font-weight:bold;'>)</span> &nbsp;&nbsp; <br>" +
         "• <span style='color:var(--accent-color); font-weight:bold;'>,</span> &nbsp;&nbsp; </br><br>" +
         "<em>Propiedad:</em> \\(N \\cap T = \\emptyset\\) (conjuntos disjuntos)." +
         "</div>"
  },
  {
    title: "Derivación por Izquierda, cadena (a,a)",
    expr: "\\(S \\Rightarrow_L (L) \\Rightarrow_L (L, S) \\Rightarrow_L (S, S) \\Rightarrow_L (a, S) \\Rightarrow_L (a, a)\\)",
    desc: "En la <strong>derivación por izquierda</strong> (\\(\\Rightarrow_L\\)), en cada paso de reemplazo se elige siempre el símbolo No Terminal ubicado <strong>más a la izquierda</strong>.",
    out: "<div style='font-size:0.85rem; line-height:1.5;'>" +
         "<strong>Pasos de Derivación por Izquierda:</strong><br>" +
         "<ol style='margin-left:20px; margin-top:5px; line-height:1.6;'>" +
         "<li>\\(S \\Rightarrow (L)\\) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:var(--text-muted); font-size:0.8em;'>Regla 1: \\(S \\rightarrow (L)\\)</span></li>" +
         "<li>\\((L) \\Rightarrow (L, S)\\) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:var(--text-muted); font-size:0.8em;'>Regla 2: \\(L \\rightarrow L, S\\)</span></li>" +
         "<li>\\((L, S) \\Rightarrow (S, S)\\) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:var(--text-muted); font-size:0.8em;'>Reemplaza L más a la izq por \\(S \\rightarrow S\\)</span></li>" +
         "<li>\\((S, S) \\Rightarrow (a, S)\\) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:var(--text-muted); font-size:0.8em;'>Reemplaza S más a la izq por \\(a \\rightarrow S \\rightarrow a\\)</span></li>" +
         "<li>\\((a, S) \\Rightarrow (a, a)\\) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:var(--text-muted); font-size:0.8em;'>Reemplaza el S restante por \\(a \\rightarrow S \\rightarrow a\\)</span></li>" +
         "</ol>" +
         "</div>"
  },
  {
    title: "Derivación por Derecha, cadena (a,a)",
    expr: "\\(S \\Rightarrow_R (L) \\Rightarrow_R (L, S) \\Rightarrow_R (L, a) \\Rightarrow_R (S, a) \\Rightarrow_R (a, a)\\)",
    desc: "En la <strong>derivación por derecha</strong> (\\(\\Rightarrow_R\\)), en cada paso de reemplazo se elige siempre el símbolo No Terminal ubicado <strong>más a la derecha</strong>.",
    out: "<div style='font-size:0.80rem; line-height:1.5;'>" +
         "<strong>Pasos de Derivación por Derecha:</strong><br>" +
         "<ol style='margin-left:20px; margin-top:5px; line-height:1.6;'>" +
         "<li>\\(S \\Rightarrow (L)\\) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:var(--text-muted); font-size:0.8em;'>Regla 1: \\(S \\rightarrow (L)\\)</span></li>" +
         "<li>\\((L) \\Rightarrow (L, S)\\) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:var(--text-muted); font-size:0.8em;'>Regla 2: \\(L \\rightarrow L, S\\)</span></li>" +
         "<li>\\((L, S) \\Rightarrow (L, a)\\) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:var(--text-muted); font-size:0.8em;'>Reemplaza S más a la der por \\(a \\rightarrow S \\rightarrow a\\)</span></li>" +
         "<li>\\((L, a) \\Rightarrow (S, a)\\) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:var(--text-muted); font-size:0.8em;'>Reemplaza L por \\(S \\rightarrow L \\rightarrow S\\)</span></li>" +
         "<li>\\((S, a) \\Rightarrow (a, a)\\) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:var(--text-muted); font-size:0.8em;'>Reemplaza S por \\(a \\rightarrow S \\rightarrow a\\)</span></li>" +
         "</ol>" +
         "</div>"
  }
];

function initSimulator() {
  if (document.getElementById('sim-steps')) {
    createSimulatorInstance({
      stepsEl: document.getElementById('sim-steps'),
      exprEl: document.getElementById('sim-expr'),
      descEl: document.getElementById('sim-desc'),
      outputEl: document.getElementById('sim-output'),
      prevEl: document.getElementById('sim-prev'),
      nextEl: document.getElementById('sim-next'),
      infoEl: document.getElementById('sim-info'),
      data: simDataClase01
    });
  }

  if (document.getElementById('sim-steps-c07')) {
    createSimulatorInstance({
      stepsEl: document.getElementById('sim-steps-c07'),
      exprEl: document.getElementById('sim-expr-c07'),
      descEl: document.getElementById('sim-desc-c07'),
      outputEl: document.getElementById('sim-output-c07'),
      prevEl: document.getElementById('sim-prev-c07'),
      nextEl: document.getElementById('sim-next-c07'),
      infoEl: document.getElementById('sim-info-c07'),
      data: simDataClase07_2
    });
  }
}

function createSimulatorInstance(config) {
  const { stepsEl, exprEl, descEl, outputEl, prevEl, nextEl, infoEl, data } = config;
  if (!stepsEl || !data || data.length === 0) return;
  if (stepsEl.dataset.initialized === "true") return;
  stepsEl.dataset.initialized = "true";

  let currentIndex = 0;

  function goToStep(index) {
    currentIndex = index;
    const item = data[index];

    if (exprEl) exprEl.innerHTML = item.expr;
    if (descEl) descEl.innerHTML = item.desc;
    if (outputEl) outputEl.innerHTML = item.out;
    if (infoEl) infoEl.innerText = `Paso ${index + 1} de ${data.length}`;

    const buttons = stepsEl.querySelectorAll('.sim-step-btn');
    buttons.forEach((btn, idx) => {
      if (idx === index) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    if (prevEl) prevEl.disabled = index === 0;
    if (nextEl) nextEl.disabled = index === data.length - 1;

    const parentContainer = stepsEl.closest('.simulator-container');
    if (parentContainer && window.renderMathInElement) {
      try {
        renderMathInElement(parentContainer, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.error("Error rendering math in simulator:", e);
      }
    }
  }

  stepsEl.innerHTML = '';
  data.forEach((step, idx) => {
    const btn = document.createElement('button');
    btn.className = `sim-step-btn ${idx === 0 ? 'active' : ''}`;
    btn.innerText = `${idx + 1}. ${step.title}`;
    btn.addEventListener('click', () => goToStep(idx));
    stepsEl.appendChild(btn);
  });

  if (prevEl) {
    prevEl.onclick = () => {
      if (currentIndex > 0) goToStep(currentIndex - 1);
    };
  }

  if (nextEl) {
    nextEl.onclick = () => {
      if (currentIndex < data.length - 1) goToStep(currentIndex + 1);
    };
  }

  goToStep(0);
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
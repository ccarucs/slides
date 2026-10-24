<!-- HOJA DE RUTA --->
<h2>¿Qué aprendemos en esta clase?</h2>

<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 10px !important;">
  <h4><i class="fas fa-brain"></i> Análisis Semántico y Definiciones Dirigidas por la Sintaxis</h4>
  <p>Un programa puede ser <strong>sintácticamente perfecto</strong> y aun así <strong>no tener sentido</strong>. En esta clase le damos significado al árbol de análisis sintáctico agregándole <strong>atributos</strong> y <strong>reglas semánticas</strong>.</p>
</div>

<div class="two-col-flex ratio-40-60">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta</span>    
      <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; ">
        <li>Objetivos del análisis semántico</li>
        <li>Gramáticas con atributos y Definiciones Dirigidas por la Sintaxis</li>
        <li>Atributos sintetizados</li>
        <li>Atributos heredados</li>
        <li>Evaluación de atributos durante el análisis ascendente LR</li>
      </ul>       
  </div>  
  <div>
    <!-- CLIP: video original U4 análisis semántico, 00:11 – 02:12 (intro, sintaxis vs semántica, árbol decorado) -->
    <div class="video-player-wrapper" style="margin-top: 10px; width:100%">
      <video src="videos/c12/asem_intro.mp4" poster="img/fases_ASem.png" controls></video>
    </div>
  </div>  
</div>

Note:
Bienvenidos a la clase 12. Hasta aquí el compilador reconoció los tokens del programa fuente y verificó que su estructura sea sintácticamente correcta, construyendo el árbol de análisis sintáctico. Pero que una sentencia sea sintácticamente correcta no garantiza que tenga sentido. En esta clase iniciamos la Unidad 4: veremos qué hace el analizador semántico y cuál es la herramienta formal principal para estructurarlo, las gramáticas con atributos o definiciones dirigidas por la sintaxis.

---

## ¿Correcto sintácticamente = correcto?

<div class="two-col-equal">
  <div class="col">
    <div class="card" style="padding:12px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-bug"></i> Un fragmento en C</h4>
<pre style="font-size:0.75rem; margin:6px 0;"><code class="language-c">int x;
x = "hola";   // ¿error?</code></pre>
      <p style="font-size:0.75rem; line-height:1.5; margin-top:20px">
        La estructura <code style="color:var(--accent-success)">id = expresión;</code> es <strong>perfectamente válida</strong> para la gramática. Sin embargo, estamos asignando una cadena a una variable entera.
      </p>
      <div class="flipped-callout-bis" style="margin-top:8px; padding:8px;">
        <p style="font-size:0.75rem; margin:0;"><i class="fas fa-exclamation-triangle"></i> Es un <strong>error semántico</strong>: detectarlo es tarea del analizador semántico.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:12px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-tasks"></i> Responsabilidades del Analizador Semántico</h4>
      <p style="font-size:0.75rem;">Recibe el <strong>árbol de análisis sintáctico</strong> y lo revisa para:</p>
      <ul style="font-size:0.75rem; line-height:1.6;">
        <li>Detectar <strong>errores semánticos</strong>: tipos incompatibles, variables no declaradas, cantidad incorrecta de argumentos, etc.</li>
        <li>Reunir la <strong>información sobre tipos</strong> (y en algunos casos verificarlos).</li>
        <li>Construir / poblar la <strong>tabla de símbolos</strong>.</li>
        <li>Preparar la <strong>generación de código</strong>.</li>
      </ul>
    </div>
  </div>
</div>

<!-- PROMPT PARA GENERAR IMAGEN (opcional, para reemplazar el poster de la hoja de ruta):
Diagrama horizontal del pipeline de un compilador: Analizador Léxico → Analizador Sintáctico → Analizador Semántico → Generador de Código Intermedio → Optimizador → Generador de Código. Las fases anteriores en gris, el Analizador Semántico resaltado en rojo/cian brillante. Debajo, la Tabla de Símbolos y el Manejador de Errores conectados a todas las fases. Estilo vectorial técnico sobre fondo oscuro, coherente con las demás clases. Nombre sugerido: img/c12_pipeline_semantico.png
-->

Note:
Este ejemplo ancla la motivación de la unidad. La gramática acepta la asignación porque su forma es correcta; lo que falla es el significado. La fase de análisis semántico utiliza la estructura jerárquica determinada por el análisis sintáctico, es decir, el árbol, para identificar operadores y operandos de expresiones y sentencias y controlar que tengan sentido.

---

## Sintaxis vs. Semántica

<div class="two-col-equal">
  <div class="col">
    <div class="card" style="padding:12px;">
      <h4 class="card-title" style="font-size:0.9rem; color:var(--accent-color);"><i class="fas fa-project-diagram"></i> Sintaxis = la <em>forma</em></h4>
      <ul style="font-size:0.75rem; line-height:1.6;">
        <li>Estructura del programa: tokens permitidos y orden de las construcciones.</li>
        <li>Se define <strong>con precisión</strong> mediante una gramática independiente del contexto.</li>
        <li>Hay algoritmos bien estudiados para analizarla: <strong>LL(k), LR(k)</strong>.</li>
        <li>Existen herramientas estándar: <strong>LEX</strong> y <strong>YACC</strong>.</li>
      </ul>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:12px;">
      <h4 class="card-title" style="font-size:0.9rem; color:var(--accent-secondary);"><i class="fas fa-lightbulb"></i> Semántica = el <em>significado</em></h4>
      <ul style="font-size:0.75rem; line-height:1.6;">
        <li>Qué hace cada construcción cuando se ejecuta.</li>
        <li>Es <strong>difícil de definir con precisión</strong>: depende de cada lenguaje (tipado, alcance, conversiones implícitas…).</li>
        <li>No hay un formalismo único ni métodos estándar: los procesos son más <strong>ad-hoc</strong>.</li>
        <li>No hay herramientas equivalentes a LEX y YACC para esta fase.</li>
      </ul>
    </div>
  </div>
</div>

<div class="flipped-callout" style="margin-top:10px; padding:8px;">
  <p style="font-size:0.8rem; margin:0; text-align:center;">
    <i class="fas fa-question-circle"></i> Entonces, ¿cómo se aborda el análisis semántico? Con un método formal muy usado: las <strong>gramáticas con atributos</strong>.
  </p>
</div>

Note:
Recordemos qué herramienta formal usamos en cada fase: expresiones regulares para el analizador léxico, gramáticas independientes del contexto para el sintáctico. Para el análisis semántico, estas no alcanzan: usamos gramáticas con atributos.

---

## Análisis semántico

<p>El analizador léxico reconoció los tokens del programa fuente y el analizador sintáctico verificó que su estructura sea sintácticamente correcta, construyendo el árbol de análisis sintáctico. Pero que una sentencia sea sintácticamente correcta no garantiza que tenga sentido. El analizador semántico, mediante las gramáticas con atributos o definiciones dirigidas por la sintaxis, se encarga de eso.</p>

<div class="video-player-wrapper" style="margin-top:8px; width:80%">
  <video src="videos/c12/gds.mp4" poster="img/gds.png" controls></video>
</div>

---

## Gramáticas con Atributos

<div class="video-player-wrapper" style="margin-top: 0px; width:70%">
      <video src="videos/c12/componentes.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-shoe-prints"></i> Dos pasos</h4>
      <ol style="font-size:0.7rem; line-height:1.5; margin-left:15px;">
        <li><strong>Identificar atributos:</strong> propiedades de las entidades del lenguaje que hay que calcular (tipo de una variable, valor de una expresión, ubicación en memoria…).</li>
        <li><strong>Escribir reglas semánticas</strong> (ecuaciones de atributos) asociadas a cada producción, que calculan los atributos de los símbolos que aparecen en ella.</li>
      </ol>
    </div>
  </div>
  <div class="col">
    <div class="flipped-callout-bis" style="margin-top:15px; padding:8px;">
      <p style="font-size:0.8rem; margin:0; text-align:center;">
        <strong>Gramática independiente del contexto</strong><br>+<br><strong>Reglas semánticas</strong><br>=<br><strong>Definición Dirigida por la Sintaxis</strong>
      </p>
    </div>
  </div>
</div>
<!--
<p style="font-size:0.65rem; color:var(--text-muted); text-align:center; margin-top:6px;">
  <i class="fas fa-info-circle"></i> En el apunte de cátedra, <em>gramática con atributos</em> y <em>definición dirigida por la sintaxis</em> se usan como sinónimos (hay pequeñas diferencias formales que exceden el alcance de la materia).
</p>-->

Note:
La denominación "dirigida por la sintaxis" proviene justamente de que las ecuaciones de atributos están asociadas con las producciones de la gramática que usamos para el análisis sintáctico. A cada símbolo de la gramática le asociamos un conjunto de atributos y a cada producción un conjunto de reglas semánticas.

---

## Árbol decorado

<p>Conceptualmente: se analiza la cadena de componentes léxicos, se construye el árbol de análisis sintáctico y luego se lo recorre evaluando las reglas semánticas en sus nodos. </p>
<div class="video-player-wrapper" style="margin-top:8px; width:75%">
  <video src="videos/c12/arbol_decorado.mp4" poster="img/miraestevideo.png" controls></video>
</div>

---

## Notación: la Regla Semántica

<div class="card" style="padding:12px;">
  <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-square-root-alt"></i> Forma general</h4>
  <p style="font-size:0.8rem;">Si \(X\) es un símbolo de la gramática y \(a\) un atributo, \(X.a\) es el valor del atributo \(a\) asociado a \(X\). Dada una producción:</p>
  <p style="text-align:center; font-size:0.95rem;">\(X_0 \rightarrow X_1 X_2 \dots X_n \quad\) con \(X_0 \in NT,\; X_1 \dots X_n \in T \cup NT\)</p>
  <p style="font-size:0.8rem;">una <strong>regla semántica</strong> (o ecuación de atributos) tiene la forma:</p>
  <p style="text-align:center; font-size:0.95rem;">\(X_i.a_j = f_{ij}(X_0.a_1, \dots, X_0.a_k,\; X_1.a_1, \dots, X_1.a_k,\; \dots,\; X_n.a_1, \dots, X_n.a_k)\)</p>
</div>

<div class="two-col-equal" style="margin-top:10px;">
  <div class="flipped-callout" style="padding:8px;">
    <p style="font-size:0.75rem; margin:0;"><i class="fas fa-feather-alt"></i> En la práctica las funciones son <strong>muy simples</strong> (sumas, comparaciones, asignaciones de constantes) y dependen de pocos atributos. Se presentan en una <strong>tabla</strong>: producción ↔ reglas semánticas.</p>
  </div>
  <div class="flipped-callout-bis" style="padding:8px;">
    <p style="font-size:0.75rem; margin:0;"><i class="fas fa-tree"></i> <strong>Árbol decorado</strong> (o con anotaciones): árbol de análisis sintáctico con el valor de los atributos en cada nodo. Es la salida del analizador semántico hacia el generador de código intermedio.</p>
  </div>
</div>

Note:
Conceptualmente: se analiza la cadena de componentes léxicos, se construye el árbol de análisis sintáctico y luego se lo recorre evaluando las reglas semánticas en sus nodos. En la práctica, por eficiencia, muchos compiladores hacen todo en una sola pasada: los controles semánticos se realizan a la vez que se valida la estructura sintáctica. Lo veremos al final de la clase con el analizador LR.

---

## ¿Cuándo se calcula un atributo?

<div class="two-col-equal">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-success);"><i class="fas fa-lock"></i> Static binding</h4>
      <p style="font-size:0.75rem;">El valor se fija <strong>durante la compilación</strong>. El compilador lo calcula.</p>
      <p style="font-size:0.7rem; color:var(--text-muted);">Ej.: el tipo de una variable en Pascal o C.</p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-warning);"><i class="fas fa-running"></i> Dynamic binding</h4>
      <p style="font-size:0.75rem;">El valor se conoce recién <strong>en tiempo de ejecución</strong>. El compilador genera código que lo calculará.</p>
      <p style="font-size:0.7rem; color:var(--text-muted);">Ej.: el valor de una variable <code>x</code>.</p>
    </div>
  </div>
</div>

<table class="compare-table" style="font-size:1rem; width:100%; margin-top:8px;">
  <thead><tr><th>Atributo</th><th>¿Estático o dinámico?</th></tr></thead>
  <tbody>
    <tr><td><strong>Tipo de una variable</strong></td><td>Estático en C y Pascal; dinámico en Lisp.</td></tr>
    <tr><td><strong>Valor de una expresión</strong></td><td>Normalmente dinámico. Si solo hay constantes se calcula al compilar (<em>constant folding</em>): <code>3 * 8 + 2</code> → <code>26</code>.</td></tr>
    <tr><td><strong>Ubicación en memoria</strong></td><td>Estática en Fortran; mixta en C y Pascal (<code>malloc</code>).</td></tr>
    <tr><td><strong>Código de un procedimiento</strong></td><td>Estático: lo genera el generador de código.</td></tr>
  </tbody>
</table>

Note:
Estos valores se van almacenando en la tabla de símbolos, la estructura de datos central que conecta al analizador semántico con las fases posteriores. El verificador de tipos es la parte del analizador semántico que calcula el atributo tipo de todas las entidades y lo verifica según las reglas del lenguaje.

---

## Ejemplo 1

<h5>El valor de un número</h5>
<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-sort-numeric-up"></i> Gramática</h4>
      <p style="font-size:0.85rem; text-align:left;">\(N \rightarrow N\,D \mid D\)<br>\(D \rightarrow 0 \mid 1 \mid \dots \mid 9\)</p>
      <table class="compare-table" style="font-size:0.9rem; width:100%;">
        <thead><tr><th>Producción</th><th>Regla semántica</th></tr></thead>
        <tbody>
          <tr><td>\(D \rightarrow 0\)</td><td>\(D.val = 0\)</td></tr>
          <tr><td>…</td><td>…</td></tr>
          <tr><td>\(D \rightarrow 9\)</td><td>\(D.val = 9\)</td></tr>
          <tr><td>\(N \rightarrow D\)</td><td>\(N.val = D.val\)</td></tr>
          <tr><td>\(N_1 \rightarrow N_2\,D\)</td><td>\(N_1.val = N_2.val \times 10 + D.val\)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="col">
    <!-- CLIP: video original U4 análisis semántico, 05:42 – 08:39 (gramática de números, ejemplos 32 y 345) -->
    <div class="video-player-wrapper" style="margin-top: 5px;">
      <video src="videos/c12/ejemplo1.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
    <div class="flipped-callout" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.72rem; margin:0;"><i class="fas fa-subscript"></i> Cuando un no terminal aparece <strong>en ambos lados</strong> de la producción se usan <strong>subíndices</strong> (\(N_1\), \(N_2\)): son nodos distintos del árbol y tienen valores distintos.</p>
    </div>
  </div>
</div>

<p style="font-size:0.65rem; color:var(--text-muted); text-align:center;">Atención: Calcular el valor de un número es, en realidad, tarea del analizador léxico. Lo usamos aquí solo por ser un ejemplo sencillo.</p>

Note:
El atributo más significativo de un número es su valor; lo llamamos val. Cada dígito tiene un valor directamente computable. Si el número tiene un solo dígito, su valor es el de ese dígito. Si tiene más de uno, se deriva con N → N D y su valor es el del número de la izquierda multiplicado por 10 más el último dígito.

---

### Árbol decorado para <code>345</code>

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Árbol de análisis sintáctico decorado para la cadena "345" con la gramática N → N D | D, D → 0..9. Raíz N (val = 34×10+5 = 345) con hijos N (val = 3×10+4 = 34) y D (val = 5); ese N tiene hijos N (val = 3) y D (val = 4); el N inferior tiene hijo D (val = 3); hojas 3, 4 y 5. Cada nodo con su etiqueta val en un recuadro de color; flechas punteadas cian desde los hijos hacia el padre indicando el sentido ascendente del cálculo. Estilo diagrama técnico limpio sobre fondo oscuro, tipografía monoespaciada. Nombre sugerido: img/c12_arbol_345.png
    -->
    <div class="card" style="padding:6px; text-align:center;">
      <img src="img/arbol_345.png" style="width:85%;"></img>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-shoe-prints"></i> Evaluación paso a paso</h4>
      <ol style="font-size:0.7rem; line-height:1.6; margin-left:15px;">
        <li>Hoja <code>3</code>: \(D.val = 3\)</li>
        <li>\(N \rightarrow D\): \(N.val = 3\)</li>
        <li>Hoja <code>4</code>: \(D.val = 4\)</li>
        <li>\(N_1 \rightarrow N_2 D\): \(N_1.val = 3 \times 10 + 4 = 34\)</li>
        <li>Hoja <code>5</code>: \(D.val = 5\)</li>
        <li>\(N_1 \rightarrow N_2 D\): \(N_1.val = 34 \times 10 + 5 = 345\)</li>
      </ol>
    </div>
    <div class="flipped-callout-bis" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.72rem; margin:0;"><i class="fas fa-arrow-up"></i> Todos los valores se calcularon <strong>a partir de los hijos</strong>, de abajo hacia arriba.</p>
    </div>
  </div>
</div>

Note:
Observen el orden en que se recorrió el árbol: siempre desde las hojas hacia la raíz. Esa observación nos lleva a la primera clasificación de los atributos: los atributos sintetizados.

---

## Atributos Sintetizados

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:12px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-level-up-alt"></i> Definición</h4>
      <p style="font-size:0.75rem; line-height:1.5;">Un atributo es <strong>sintetizado</strong> si su valor se calcula a partir de los atributos de los <strong>nodos hijos</strong> en el árbol de análisis sintáctico.</p>
      <p style="font-size:0.75rem;">Dada la regla \(A \rightarrow X_1 X_2 \dots X_n\), \(A.a\) es sintetizado si:</p>
      <p style="font-size:0.85rem; text-align:center;">\(A.a = f(X_1.a_1, \dots, X_n.a_k)\)</p>
    </div>
    <div class="flipped-callout" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.72rem; margin:0;"><i class="fas fa-bolt"></i> <strong>Ventaja:</strong> se calculan en un <strong>único recorrido ascendente</strong> del árbol, que es exactamente el orden en que un analizador <strong>LR</strong> genera los nodos.</p>
    </div>
  </div>
  <div class="col">
    <!-- CLIP: video original U4 análisis semántico, 08:39 – 10:32 (clasificación de atributos, sintetizados, expresiones aritméticas) -->
    <div class="video-player-wrapper" style="margin-top: 5px;">
      <video src="videos/c12/atr_sintetizados.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
</div>

Note:
La evaluación de atributos depende de un recorrido explícito o implícito del árbol. El tipo de recorrido depende del tipo de dependencia entre atributos; por eso los clasificamos en sintetizados y heredados. Los sintetizados son el caso más simple de manejar.

---

## Ejemplo 2

<h5> Expresiones Aritméticas</h5>
<div class="two-col-flex ratio-30-70">
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-calculator"></i> Gramática</h4>
      <p style="font-size:0.75rem; line-height:1.7;">
        \(L \rightarrow E\)<br>
        \(E_1 \rightarrow E_2 + T\)<br>
        \(E_1 \rightarrow E_2 - T\)<br>
        \(E \rightarrow T\)<br>
        \(T_1 \rightarrow T_2 * F\)<br>
        \(T \rightarrow F\)<br>
        \(F \rightarrow (E)\)<br>
        \(F \rightarrow \mathbf{numero}\)
      </p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:8px;">
      <table class="compare-table" style="font-size:0.95rem; width:100%;">
        <thead><tr><th>Producción</th><th>Regla semántica</th></tr></thead>
        <tbody>
          <tr><td>\(L \rightarrow E\)</td><td>\(print(E.val)\)</td></tr>
          <tr><td>\(E_1 \rightarrow E_2 + T\)</td><td>\(E_1.val = E_2.val + T.val\)</td></tr>
          <tr><td>\(E_1 \rightarrow E_2 - T\)</td><td>\(E_1.val = E_2.val - T.val\)</td></tr>
          <tr><td>\(E \rightarrow T\)</td><td>\(E.val = T.val\)</td></tr>
          <tr><td>\(T_1 \rightarrow T_2 * F\)</td><td>\(T_1.val = T_2.val \times F.val\)</td></tr>
          <tr><td>\(T \rightarrow F\)</td><td>\(T.val = F.val\)</td></tr>
          <tr><td>\(F \rightarrow (E)\)</td><td>\(F.val = E.val\)</td></tr>
          <tr><td>\(F \rightarrow \mathbf{numero}\)</td><td>\(F.val = \mathbf{numero}.val\)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="two-col-equal" style="margin-top:8px;">
  <div class="flipped-callout" style="padding:8px;">
    <p style="font-size:0.72rem; margin:0;"><i class="fas fa-search"></i> <code>numero.val</code> viene del <strong>analizador léxico</strong>: es el valor léxico del token, que el scanner ya reconoció y almacenó.</p>
  </div>
  <div class="flipped-callout-bis" style="padding:8px;">
    <p style="font-size:0.72rem; margin:0;"><i class="fas fa-print"></i> La regla de \(L \rightarrow E\) tiene un <strong>efecto colateral</strong>: imprime el resultado.</p>
  </div>
</div>

Note:
Estas ecuaciones expresan la relación entre la sintaxis de las expresiones y la semántica de los cálculos aritméticos. Noten la diferencia entre el símbolo sintáctico + de la producción, que es un token, y el operador aritmético + de la ecuación, que es la operación de suma.

---

### Árbol decorado para <br><code>(34-4)*42</code>

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Árbol de análisis sintáctico decorado para la expresión (34 - 4) * 42 con la gramática L → E, E → E - T | T, T → T * F | F, F → (E) | numero. Raíz L (print 1260); E (val 1260); T (val = 30 × 42 = 1260) con hijos T (val 30), '*', F (val 42 → numero 42). El T izquierdo → F (val 30) → '(' E (val = 34 - 4 = 30) ')'. Ese E con hijos E (val 34 → T 34 → F 34 → numero 34), '-', T (val 4 → F 4 → numero 4). Cada nodo con su val anotado en un recuadro de color; flechas punteadas de abajo hacia arriba. Estilo técnico limpio, fondo oscuro, tipografía monoespaciada. Nombre sugerido: img/c12_arbol_expr.png
    -->
    <div class="card" style="padding:6px; text-align:center;">
      <img src="img/arbol_34_4.png" style="width:90%;"></img>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-shoe-prints"></i> De las hojas a la raíz</h4>
      <ol style="font-size:0.7rem; line-height:1.6; margin-left:15px;">
        <li>\(F.val = 34,\; T.val = 34,\; E.val = 34\)</li>
        <li>\(F.val = 4,\; T.val = 4\)</li>
        <li>Resta: \(E.val = 34 - 4 = 30\)</li>
        <li>Paréntesis: \(F.val = 30,\; T.val = 30\)</li>
        <li>\(F.val = 42\)</li>
        <li>Producto: \(T_1.val = 30 \times 42 = 1260\)</li>
        <li>\(E.val = 1260\) → <code>print(1260)</code></li>
      </ol>
    </div>
  </div>
</div>

Note:
Es fácil ver el orden en que se evalúan los atributos: el valor total de la expresión queda en la raíz y todos los nodos se calcularon a partir de sus hijos. Por lo tanto, todos los atributos de esta DDS son sintetizados.


---

## Ejercicio guiado

<h5> ¿de qué tipo es la expresión?</h5>

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-pencil-alt"></i> Consigna</h4>
      <p style="font-size:0.85rem; text-align:left;">\(E \rightarrow E + T \mid T\)<br>\(T \rightarrow \mathbf{num} \mid \mathbf{numreal}\)</p>
      <p style="font-size:0.72rem; line-height:1.5;">Si se suman dos enteros el resultado es entero; si no, es real. Escribir una DDS que determine el <strong>tipo</strong> de cada subexpresión.</p>
      <p style="font-size:0.68rem; color:var(--text-muted);">Ej.: <br><code>2+3</code> → entero; <br><code>2+3+4.3</code> → real.</p>
    </div>
  </div>
  <div class="col">
    <!-- CLIP: video original U4 análisis semántico, 10:32 – 12:55 (ejercicio tipo entero/real y su solución) -->
    <div class="video-player-wrapper" style="margin-top: 5px;">
      <video src="videos/c12/ej_tipo.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Este ejercicio es un primer acercamiento a la verificación de tipos, que retomaremos en la Unidad 5. La solución está en la diapositiva siguiente.

---

## Solución: atributo <code>tipo</code>

<table class="compare-table" style="font-size:1rem; width:80%; margin:20px">
  <thead><tr><th style="width:30%">Producción</th><th>Regla semántica</th></tr></thead>
  <tbody>
    <tr><td>\(E_1 \rightarrow E_2 + T\)</td><td><code>E₁.tipo = if (E₂.tipo = entero) and (T.tipo = entero) then entero else real</code></td></tr>
    <tr><td>\(E \rightarrow T\)</td><td>\(E.tipo = T.tipo\)</td></tr>
    <tr><td>\(T \rightarrow \mathbf{num}\)</td><td>\(T.tipo = entero\)</td></tr>
    <tr><td>\(T \rightarrow \mathbf{numreal}\)</td><td>\(T.tipo = real\)</td></tr>
  </tbody>
</table>
<div class="two-col-equal" style="margin-top:0px;">
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.78rem;"><i class="fas fa-route"></i> Para <code>2 + 3 + 4.3</code></h4>
    <ul style="font-size:0.7rem; line-height:1.6;">
      <li><code>2</code>, <code>3</code> → \(T.tipo = entero\)</li>
      <li><code>2 + 3</code> → \(E.tipo = entero\)</li>
      <li><code>4.3</code> → \(T.tipo = real\)</li>
      <li><code>(2 + 3) + 4.3</code> → \(E.tipo = real\)</li>
    </ul>
  </div>
  <div class="flipped-callout-bis" style="padding:8px;">
    <p style="font-size:0.72rem; margin:0;"><i class="fas fa-code-branch"></i> Las reglas semánticas pueden incluir <strong>condicionales</strong> (<code>if-then-else</code>), como cualquier programa. Y el atributo <code>tipo</code> también es <strong>sintetizado</strong>.</p>
  </div>
</div>

Note:
En la regla 1 diferenciamos los dos no terminales E con subíndices. Si el tipo de E2 y el de T son enteros, la suma es entera; en cualquier otro caso es real.

---

## Atributos Heredados

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:12px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-question"></i> ¿Cómo sabe <code>x</code> que es real?</h4>
<pre style="font-size:0.85rem; margin:6px 0;"><code>var x, y : real;</code></pre>
      <p style="font-size:0.72rem; line-height:1.5;">La cadena se lee de izquierda a derecha: el parser encuentra primero <code>x</code>, luego <code>y</code>, y <strong>recién al final</strong> <code>real</code>.</p>
      <p style="font-size:0.72rem; line-height:1.5;">Hay que pasar información <strong>hacia abajo</strong> (o de costado) en el árbol: desde el nodo que conoce el tipo hacia los nodos que lo necesitan.</p>
    </div>
  </div>
  <div class="col">
    <!-- CLIP: video original U4 análisis semántico, 12:55 – 15:11 (atributos heredados, declaración de variables, árbol con pasos 1 a 5) -->
    <div class="video-player-wrapper" style="margin-top: 5px;">
      <video src="videos/c12/atr_heredados.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
</div>

<div class="flipped-callout" style="margin-top:8px; padding:8px;">
  <p style="font-size:0.78rem; margin:0; text-align:center;"><i class="fas fa-level-down-alt"></i> Un atributo es <strong>heredado</strong> si su valor se calcula a partir de los atributos del <strong>padre</strong> o de los <strong>hermanos</strong> del nodo en el árbol de análisis sintáctico.</p>
</div>

Note:
Los atributos sintetizados no alcanzan para modelar todas las situaciones de un lenguaje real. Los heredados sirven para expresar la dependencia de una construcción respecto del contexto en que aparece; el ejemplo paradigmático es la propagación del tipo en una lista de declaraciones.

---

## Sintetizados vs. Heredados

<!-- PROMPT PARA GENERAR IMAGEN:
Dos árboles pequeños lado a lado sobre fondo oscuro. Izquierda, título "Sintetizados": nodo padre A con hijos X1, X2, X3; flechas cian que SUBEN desde los hijos al padre, etiqueta "la información sube". Derecha, título "Heredados": nodo padre A con hijos X1, X2, X3; flechas magenta que BAJAN del padre a los hijos y una flecha horizontal de X3 hacia X1 (entre hermanos), etiqueta "la información baja o fluye lateralmente". Estilo vectorial técnico y minimalista. Nombre sugerido: img/c12_sint_vs_her.png
-->
<div class="card" style="padding:6px; text-align:center;">
  <img src="img/sint_vs_her.jpeg" style="width:50%;"></img>
</div>

<div class="two-col-equal" style="margin-top:8px;">
  <div class="card" style="padding:10px;">
    <h4 class="card-title" style="font-size:0.82rem; color:var(--accent-color);"><i class="fas fa-arrow-up"></i> Sintetizados</h4>
    <ul style="font-size:0.72rem; line-height:1.5;">
      <li>Dependen de los <strong>hijos</strong>: la información sube.</li>
      <li>Un único recorrido <strong>ascendente</strong>.</li>
      <li>Integración natural con el parser <strong>LR</strong>.</li>
    </ul>
  </div>
  <div class="card" style="padding:10px;">
    <h4 class="card-title" style="font-size:0.82rem; color:var(--accent-secondary);"><i class="fas fa-arrow-down"></i> Heredados</h4>
    <ul style="font-size:0.72rem; line-height:1.5;">
      <li>Dependen del <strong>padre</strong> o de los <strong>hermanos</strong>: la información baja o fluye lateralmente.</li>
      <li>El recorrido depende de las ecuaciones (descendente o mixto).</li>
      <li>Su integración con el parser LR es más compleja.</li>
    </ul>
  </div>
</div>

Note:
Esta diferencia tiene consecuencias importantes en la implementación: mientras los sintetizados se calculan en un único recorrido ascendente, los heredados obligan a recorrer el árbol de otra manera, según las ecuaciones particulares.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> En la regla <span class="math-lang">\(N_1 \rightarrow N_2\,D\)</span> con <span class="math-lang">\(N_1.val = N_2.val \times 10 + D.val\)</span>, ¿qué tipo de atributo es <span class="math-lang">\(val\)</span> y en qué orden se evalúa?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Heredado: el valor baja desde la raíz hacia los dígitos.</div>
  <div class="quiz-option" data-correct="true">Sintetizado: se calcula a partir de los hijos, en un recorrido ascendente del árbol.</div>
  <div class="quiz-option" data-correct="false">Sintetizado, pero requiere un recorrido descendente (de la raíz a las hojas).</div>
  <div class="quiz-option" data-correct="false">Ninguno de los dos: es un valor léxico que entrega el scanner.</div>
</div>

<div class="quiz-feedback"
     data-correct-explain="N₁.val depende solo de N₂.val y D.val, que son hijos de N₁ en el árbol. Por eso es sintetizado y se calcula de las hojas hacia la raíz."
     data-incorrect-explain="Mirá de qué depende N₁.val: de N₂.val y D.val, ambos hijos de N₁. Un atributo calculado a partir de los hijos es sintetizado, y se evalúa en un recorrido ascendente."></div>

Note:
Pregunta de autocontrol para fijar la definición de atributo sintetizado antes de pasar al ejercicio.


---

## Ejemplo 3

<h5> Declaración de Variables</h5>
<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-file-code"></i> Gramática (estilo Pascal)</h4>
<pre style="font-size:0.62rem; margin:4px 0;"><code>decl       → var listavars : tipo ;
listavars  → id
listavars₁ → listavars₂ , id
tipo       → integer
tipo       → real</code></pre>
    </div>
    
  </div>
  <div class="col">
    <div class="flipped-callout-bis" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.7rem; margin:0;"><i class="fas fa-sitemap"></i> El nodo <code>tipo</code>, que "sabe" que el tipo es <code>real</code>, es <strong>hermano</strong> de <code>listavars</code>, no su padre. Y el tipo se necesita en las <strong>hojas</strong> <code>id</code>.</p>
    </div>
  </div>
</div>
<div class="card" style="padding:8px;">
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead><tr><th>Producción</th><th>Reglas semánticas</th></tr></thead>
        <tbody>
          <tr><td><code>decl → var listavars : tipo ;</code></td><td><code>listavars.t = tipo.t</code></td></tr>
          <tr><td><code>listavars → id</code></td><td><code>id.t = listavars.t</code></td></tr>
          <tr><td><code>listavars₁ → listavars₂ , id</code></td><td><code>id.t = listavars₁.t ;</code><br><code>listavars₂.t = listavars₁.t</code></td></tr>
          <tr><td><code>tipo → integer</code></td><td><code>tipo.t = entero</code></td></tr>
          <tr><td><code>tipo → real</code></td><td><code>tipo.t = real</code></td></tr>
        </tbody>
      </table>
    </div>
Note:
El atributo t viaja desde tipo hacia listavars, y de ahí hacia cada id. Es un atributo heredado: la información viene del padre o de un hermano.

---

### Reglas Semánticas con Efectos Colaterales
<!--
<div class="two-col-flex ratio-60-40">
  <div class="col"> -->
<div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.82rem;"><i class="fas fa-database"></i> Conexión con la Tabla de Símbolos</h4>
      <p style="font-size:0.72rem;">Al asignar el tipo a un identificador, lo natural es registrarlo en la tabla de símbolos:</p>
<pre style="font-size:0.62rem; margin:4px 0;"><code>id.t = listavars.t ;  añadeTipo(id, listavars.t)</code></pre>
      <p style="font-size:0.72rem;">O, verificando declaraciones duplicadas:</p>
<pre style="font-size:0.62rem; margin:4px 0;"><code>if lookup(id) then error
else añadeVariable(id, listavars.t)</code></pre>
    </div>
  </div>
 <!-- <div class="col">-->
    <div class="card" style="padding:20px;">
      <h4 class="card-title" style="font-size:0.82rem;"><i class="fas fa-puzzle-piece"></i> Una regla semántica puede…</h4>
      <ul style="font-size:0.72rem; line-height:1.6;">
        <li>Calcular valores de atributos.</li>
        <li>Incluir condicionales (<code>if-then-else</code>).</li>
        <li>Invocar procedimientos: <code>print(E.val)</code>.</li>
        <li>Guardar información en la <strong>tabla de símbolos</strong>.</li>
        <li>Emitir mensajes de <strong>error</strong>.</li>
        <li>Generar código.</li>
      </ul>
    </div>
<!--  </div>
</div> -->

Note:
Esta es la conexión directa entre el análisis semántico y la tabla de símbolos, que estudiaremos en detalle en la próxima clase.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> En la DDS de <span class="math-lang"><code>var x, y : real;</code></span>, ¿por qué no alcanza con atributos sintetizados para asignar el tipo a cada variable?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Porque los atributos sintetizados no pueden tomar valores como <code>real</code> o <code>entero</code>.</div>
  <div class="quiz-option" data-correct="false">Porque el analizador léxico no reconoce el tipo de las variables.</div>
  <div class="quiz-option" data-correct="true">Porque el tipo está en el nodo <code>tipo</code>, hermano de <code>listavars</code>, y debe bajar hasta las hojas <code>id</code>; un atributo sintetizado solo puede subir.</div>
  <div class="quiz-option" data-correct="false">Porque la gramática es ambigua y no se puede construir un árbol único.</div>
</div>

<div class="quiz-feedback"
     data-correct-explain="id(x) e id(y) son hojas que están 'por encima' de tipo en el orden de lectura. La información tiene que fluir lateralmente (de tipo a listavars) y hacia abajo (hasta los id): eso solo lo permiten los atributos heredados."
     data-incorrect-explain="Pensá en el árbol: ¿dónde se conoce el tipo y dónde se necesita? Un atributo sintetizado solo sube de hijos a padre; acá la información tiene que ir de un hermano a otro y luego bajar hasta las hojas."></div>

Note:
Pregunta reflexiva: invita a pensar antes de seguir, en línea con la modalidad de aula invertida.

---

## Ejemplo 4

<h5> Nivel de Anidamiento de Paréntesis</h5>
<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:8px;">
      <p style="font-size:0.75rem; margin:0 0 6px 0;">Dada <br>\(S \rightarrow (\,) \mid (S) \mid (\,)S \mid (S)S\) <br>calcular el <strong>nivel máximo de anidamiento</strong> (atributo <code>paran</code>).</p>
      <p style="font-size:0.68rem; color:var(--text-muted);">Ej. <br><code>()()</code> → 1 <br><code>(()())</code> → 2 <br> <code>(()()(()))</code> → 3</p>      
    </div>
  </div>
  <div class="col">    
    <!-- CLIP: video original U4 análisis semántico, 15:11 – 18:15 (ejercicio de paréntesis anidados y árbol decorado para (()(()))) -->
    <div class="video-player-wrapper" style="margin-top: 5px;">
      <video src="videos/c12/ej_paren.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>
<div>
<table class="compare-table" style="font-size:0.9rem; width:80%;">
  <thead><tr><th>Producción</th><th>Regla semántica</th></tr></thead>
  <tbody>
    <tr><td>\(S \rightarrow (\,)\)</td><td>\(S.paran = 1\)</td></tr>
    <tr><td>\(S_1 \rightarrow (S_2)\)</td><td>\(S_1.paran = S_2.paran + 1\)</td></tr>
    <tr><td>\(S_1 \rightarrow (\,)S_2\)</td><td>\(S_1.paran = \max(S_2.paran, 1)\)</td></tr>
    <tr><td>\(S_1 \rightarrow (S_2)S_3\)</td><td>\(S_1.paran = \max(S_2.paran + 1, S_3.paran)\)</td></tr>
  </tbody>
</table>
</div>

Note:
En la regla 3 el nivel de la cadena () es 1, pero no sabemos cuántos paréntesis tiene S2: por eso tomamos el máximo. En la regla 4, el máximo entre el anidamiento de S2 más uno y el de S3. Al final del video queda planteada la pregunta: el atributo paran, ¿es heredado o sintetizado? Respondela en la siguiente diapositiva.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> En la DDS de paréntesis anidados, ¿el atributo <span class="math-lang"><code>paran</code></span> es heredado o sintetizado?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="true">Sintetizado: \(S_1.paran\) se calcula siempre con los atributos de \(S_2\) y \(S_3\), que son hijos de \(S_1\).</div>
  <div class="quiz-option" data-correct="false">Heredado: el nivel de anidamiento se propaga desde la raíz hacia las hojas.</div>
  <div class="quiz-option" data-correct="false">Heredado, porque \(S_2\) y \(S_3\) son hermanos entre sí.</div>
  <div class="quiz-option" data-correct="false">Ninguno: como usa la función max no es un atributo.</div>
</div>

<div class="quiz-feedback"
     data-correct-explain="En todas las reglas el atributo del lado izquierdo (el padre) se calcula a partir de los atributos de los símbolos del lado derecho (los hijos). Que S₂ y S₃ sean hermanos no importa: ninguno toma su valor del otro."
     data-incorrect-explain="Revisá cada regla: ¿qué atributo se calcula? Siempre S₁.paran, el del padre, usando valores de sus hijos. Eso lo convierte en un atributo sintetizado, evaluable de abajo hacia arriba."></div>

Note:
La función max es simplemente una función dentro de la regla semántica; no cambia la clasificación del atributo.

---

## Ejemplo 5

<h5> ¿Cuántas variables, cuántos tipos?</h5>

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:8px;">
      <p style="font-size:0.7rem; margin:0 0 4px 0;">Declaraciones con una lista de variables y una lista de tipos. Verificar que <strong>ambas tengan la misma cantidad de elementos</strong>.</p>
<pre style="font-size:0.58rem; margin:4px 0;"><code>var
  aux1, aux2 : entero, entero;
  x, y, z    : entero, real, logico;</code></pre>
          </div>
  </div>
  <div class="col">
    <div class="flipped-callout" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.7rem; margin:0;"><i class="fas fa-tags"></i> Dos atributos: <code>long</code> (numérico) cuenta elementos; <code>bool</code> (booleano) indica si la declaración es correcta.</p>
    </div>
  </div>
</div>
<div style="margin-top:20px">
<table class="compare-table" style="font-size:0.9rem; width:100%;">
        <thead><tr><th>Producción</th><th>Regla semántica</th></tr></thead>
        <tbody>
          <tr><td>\(S \rightarrow \mathbf{var}\ A\)</td><td>\(S.bool = A.bool;\ print(A.bool)\)</td></tr>
          <tr><td>\(A \rightarrow \varepsilon\)</td><td>\(A.bool = true\)</td></tr>
          <tr><td>\(A_1 \rightarrow L\,A_2\)</td><td>\(A_1.bool = L.bool \wedge A_2.bool\)</td></tr>
          <tr><td>\(L \rightarrow V : T ;\)</td><td>\(L.bool = (V.long = T.long)\)</td></tr>
          <tr><td>\(V_1 \rightarrow \mathbf{id} , V_2\)</td><td>\(V_1.long = V_2.long + 1\)</td></tr>
          <tr><td>\(V \rightarrow \mathbf{id}\)</td><td>\(V.long = 1\)</td></tr>
          <tr><td>\(T_1 \rightarrow \mathbf{tipo} , T_2\)</td><td>\(T_1.long = T_2.long + 1\)</td></tr>
          <tr><td>\(T \rightarrow \mathbf{tipo}\)</td><td>\(T.long = 1\)</td></tr>
        </tbody>
      </table>
</div>

Note:
Es una de varias gramáticas posibles para este lenguaje. En las reglas de T y de V, el atributo long cuenta la cantidad de tipos y de variables; en L se comparan; y en A se combinan los resultados de todas las listas con un AND.

---

### Evaluación Ascendente con la Pila LR

<div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.82rem;"><i class="fas fa-layer-group"></i> La idea</h4>
      <p style="font-size:0.65rem; line-height:1.5;">Los atributos sintetizados se evalúan con el analizador <strong>LR</strong> <strong>al mismo tiempo</strong> que se analiza la entrada: la pila se extiende para guardar, junto a cada símbolo, el <strong>valor de sus atributos</strong>.</p>
      <p style="font-size:0.65rem; line-height:1.5;">Al <strong>reducir</strong> por \(A \rightarrow XYZ\), los atributos de \(X, Y, Z\) ya están en la pila: se aplica \(A.a = f(X.x, Y.y, Z.z)\), se desapilan \(X, Y, Z\) y se apila \(A\) con \(A.a\).</p>
    </div>
<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div  style=" text-align:center; margin-top:8px;">
  <img src="img/pila_reduccion.jpeg" style="height: 100%; width: auto; object-fit: cover;"></img>
</div>
  </div>
  <div class="col">
    <!-- CLIP: video original U4 análisis semántico, 21:01 – 22:14 (evaluación ascendente: pila con atributos, reducción A → XYZ) -->
    <div class="video-player-wrapper" style="margin-top: 5px;">
      <video src="videos/c12/eval_ascendente.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

<!-- PROMPT PARA GENERAR IMAGEN:
Esquema de dos pilas verticales lado a lado, antes y después de una reducción por A → XYZ. Antes: pila de análisis con X, Y, Z en el tope y pila de valores con X.x, Y.y, Z.z alineados. Flecha central "reducir A → XYZ / A.a = f(X.x, Y.y, Z.z)". Después: pila de análisis con A en el tope y pila de valores con A.a. Colores: símbolos en cian, valores en dorado. Estilo técnico, fondo oscuro. Nombre sugerido: img/c12_pila_reduccion.png
-->


Note:
Recuerden la operación de reducción de la clase anterior: cuando el analizador encuentra en el tope de la pila el lado derecho de una producción, lo saca y apila el lado izquierdo. En ese mismo momento los atributos de los símbolos que se desapilan ya están disponibles, así que se aplica la regla semántica y el resultado se apila junto con el no terminal.

---

## Ejemplo 

<div class="col">
    <!-- CLIP: video original U4 análisis semántico, 22:14 – 26:51 (traza completa con pila de análisis y pila de valores) -->
    <div class="video-player-wrapper" style="margin-top: 5px;">
      <video src="videos/c12/ejemplo_traza.mp4" poster="img/ejemplo.jpeg" controls></video>
    </div>
    <div class="flipped-callout" style="margin-top:8px; padding:6px;">
      <p style="font-size:0.62rem; margin:0;"><i class="fas fa-table"></i> Se usan la gramática y la <strong>tabla LR de la clase anterior</strong>. El subíndice de cada <code>id</code> es su valor; <code>$</code> marca el fondo de la pila de valores.</p>
    </div>
  </div>

---

### Traza: <code>a * b + c</code> 

<span>Con <code style="font-size:1.6rem">a=3, b=5, c=4</code></span>

<div class="card" style="padding:6px; overflow-x:auto;">
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead><tr><th>Pila de análisis</th><th>Pila de valores</th><th>Entrada</th><th>Acción</th></tr></thead>
        <tbody>
          <tr><td><code>0</code></td><td><code>$</code></td><td><code>id₃ * id₅ + id₄ $</code></td><td>desplazar d5</td></tr>
          <tr><td><code>0 id 5</code></td><td><code>$ 3</code></td><td><code>* id₅ + id₄ $</code></td><td>reducir \(F \rightarrow id\); \(F.val = 3\)</td></tr>
          <tr><td><code>0 F 3</code></td><td><code>$ 3</code></td><td><code>* id₅ + id₄ $</code></td><td>reducir \(T \rightarrow F\); \(T.val = 3\)</td></tr>
          <tr><td><code>0 T 2</code></td><td><code>$ 3</code></td><td><code>* id₅ + id₄ $</code></td><td>desplazar d7</td></tr>
          <tr><td><code>0 T 2 * 7</code></td><td><code>$ 3 *</code></td><td><code>id₅ + id₄ $</code></td><td>desplazar d5</td></tr>
          <tr><td><code>0 T 2 * 7 id 5</code></td><td><code>$ 3 * 5</code></td><td><code>+ id₄ $</code></td><td>reducir \(F \rightarrow id\); \(F.val = 5\)</td></tr>
          <tr style="background:rgba(255,200,0,0.12);"><td><code>0 T 2 * 7 F 10</code></td><td><code>$ 3 * 5</code></td><td><code>+ id₄ $</code></td><td><strong>reducir \(T \rightarrow T * F\); \(T.val = 3 \times 5 = 15\)</strong></td></tr>
          <tr><td><code>0 T 2</code></td><td><code>$ 15</code></td><td><code>+ id₄ $</code></td><td>reducir \(E \rightarrow T\); \(E.val = 15\)</td></tr>
          <tr><td><code>0 E 1</code></td><td><code>$ 15</code></td><td><code>+ id₄ $</code></td><td>desplazar d6</td></tr>
          <tr><td><code>0 E 1 + 6</code></td><td><code>$ 15 +</code></td><td><code>id₄ $</code></td><td>desplazar d5</td></tr>
          <tr><td><code>0 E 1 + 6 id 5</code></td><td><code>$ 15 + 4</code></td><td><code>$</code></td><td>reducir \(F \rightarrow id\); \(F.val = 4\)</td></tr>
          <tr><td><code>0 E 1 + 6 F 3</code></td><td><code>$ 15 + 4</code></td><td><code>$</code></td><td>reducir \(T \rightarrow F\); \(T.val = 4\)</td></tr>
          <tr style="background:rgba(255,200,0,0.12);"><td><code>0 E 1 + 6 T 9</code></td><td><code>$ 15 + 4</code></td><td><code>$</code></td><td><strong>reducir \(E \rightarrow E + T\); \(E.val = 15 + 4 = 19\)</strong></td></tr>
          <tr><td><code>0 E 1</code></td><td><code>$ 19</code></td><td><code>$</code></td><td><strong>aceptar</strong> (\(L \rightarrow E\)): <code>print(19)</code> ✓</td></tr>
        </tbody>
      </table>
    </div>

Note:
Mantenemos dos pilas en paralelo: la de análisis, con símbolos y estados, y la de valores, con los atributos. Cuando se desplaza un id también se apila su valor, que proporciona el analizador léxico. Las filas resaltadas son las reducciones donde se aplica una operación aritmética. La producción L → E cumple el papel de la producción de la gramática aumentada: al aceptar se ejecuta su regla semántica e imprime 19.


---

## Ejercicios Propuestos

<div class="card">
  <h4 class="card-title"><i class="fas fa-pencil-alt"></i> Ejercicios de Análisis Semántico</h4>
  <table class="compare-table" style="font-size:1.1rem;">
    <thead>
      <tr>
        <th>N°</th>
        <th>Consigna</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1</strong></td>
        <td>
          A partir de la gramática del <strong>Ejemplo 5</strong> (cantidad de variables y de tipos), construya el árbol decorado para la cadena <code>var x, y, z : entero, real, logico;</code>
        </td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td>
          Modifique las reglas semánticas de la gramática del <strong>Ejemplo 1</strong> (\(N \rightarrow N D \mid D\)) para que indiquen si el número generado es <strong>par o impar</strong>. ¿El atributo que usó es sintetizado o heredado?
        </td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td>
          Usando la gramática y la tabla LR de la clase anterior, desarrolle la traza con <strong>pila de análisis y pila de valores</strong> para <code>( a + b ) * c</code>, con <code>a = 2, b = 3, c = 4</code>, indicando la regla semántica aplicada en cada reducción.
        </td>
      </tr>
    </tbody>
  </table>
</div>

Note:
Estos ejercicios se trabajarán en el encuentro presencial. Los dos primeros provienen del material de la cátedra; el tercero integra esta clase con la traza LR de la clase anterior.

---

<!-- SLIDE: Resumen de la Clase -->
<h2 class="text-gradient">Resumen de la Clase</h2> 

<div class="grid">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos hoy</h4>
    <ul style="font-size:0.8rem; line-height:1.5;">
      <li>El <strong>analizador semántico</strong> revisa el árbol de análisis sintáctico para detectar errores de significado, reunir información de tipos y preparar la generación de código.</li>
      <li>Una <strong>Definición Dirigida por la Sintaxis</strong> (gramática con atributos) es una GIC más <strong>reglas semánticas</strong> asociadas a cada producción; su resultado es el <strong>árbol decorado</strong>.</li>
      <li>Los atributos <strong>sintetizados</strong> se calculan a partir de los hijos (la información sube); los <strong>heredados</strong>, a partir del padre o los hermanos (la información baja o fluye lateralmente).</li>
      <li>Los sintetizados se evalúan durante el análisis <strong>LR</strong> extendiendo la pila con los valores: cada reducción dispara su regla semántica.</li>
    </ul>
  </div>   
      
  <div class="card" style="margin-top:10px">
    <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección</h4>
    <p style="margin-top:12px; text-align:center; color:var(--text-muted); font-size:0.85rem;">
      ¿Dónde guarda el compilador todo lo que descubren las reglas semánticas, como el tipo de <code>x</code> e <code>y</code>? En la <strong>Tabla de Símbolos</strong>: nombres, tipos, alcance y ubicación en memoria de cada identificador del programa.
    </p>
  </div>    
</div>

<div class="flipped-callout" style="text-align: center; margin-top:10px;">
  <p style="font-size:0.8rem; margin:0;"><strong>⚠️ Recordatorio:</strong> Completar el cuestionario de autoevaluación sobre análisis semántico en la plataforma virtual antes del próximo encuentro presencial.</p>
</div>

Note:
Hemos completado los fundamentos del análisis semántico basado en definiciones dirigidas por la sintaxis. Vimos que reglas como añadeTipo o lookup escriben y consultan una estructura central del compilador. En la próxima clase estudiaremos en detalle esa estructura: la tabla de símbolos. ¡Nos vemos!

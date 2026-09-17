<!-- HOJA DE RUTA --->
## En esta clase

<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 15px !important;">
  <h4><i class="fas fa-lightbulb"></i> Unidad 3: La base formal del Análisis Sintáctico</h4>
  <p>En la primera parte estudiamos los autómatas con pila como reconocedores. Ahora estudiamos su equivalente generador: las <strong>Gramáticas Libres del Contexto (GIC)</strong>, el lenguaje estándar con el que se especifica la sintaxis de los lenguajes de programación reales.</p>
</div>
<div class="two-col">  
  <div class="col card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta de la clase (Parte 2) </span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; font-weight: bold;">
      <li>Las Gramáticas Libres del Contexto</li>
      <li>Derivaciones por izquierda y por derecha</li>
      <li>Árbol de análisis sintáctico</li>
      <li>Teorema de equivalencia entre GIC y AP</li>
      <li>Construcción de un AP a partir de una GIC</li>
      <li>El problema de la ambigüedad en sintaxis</li>
    </ul>       
  </div>  
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 5px;">
      <video src="videos/c07/glc_intro.mp4"  controls></video>
    </div>
  </div>  
</div>


Note:
En el video anterior vimos los autómatas con pila: máquinas que pueden reconocer lenguajes más complejos que los autómatas finitos. Ahora vamos a conocer la otra cara de esa moneda: las gramáticas que generan exactamente esos mismos lenguajes. Al terminar esta lección van a entender qué es una GIC, cómo se define formalmente, qué son las derivaciones, cómo se construye el árbol sintáctico, por qué son equivalentes a los AP y cómo solucionar el problema de la ambigüedad.

---

## La Jerarquía de Chomsky y GIC

<table class="compare-table" style="font-size:1rem; width:100%;">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Gramática</th>
          <th>Forma de Producción</th>
          <th>Mecanismo Reconocedor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tipo 3</td>
          <td>Regulares</td>
          <td>\(A \rightarrow x\) &nbsp;ó&nbsp; \(A \rightarrow xB\)</td>
          <td>Autómata Finito (AF)</td>
        </tr>
        <tr style="background-color:rgba(76, 175, 80, 0.2); font-weight:bold;">
          <td>Tipo 2</td>
          <td>Libres del Contexto (GIC)</td>
          <td>\(A \rightarrow \alpha \quad (\alpha \in (T \cup N)^*)\)</td>
          <td>Autómata con Pila (AP)</td>
        </tr>
        <tr>
          <td>Tipo 1</td>
          <td>Dependientes del Contexto</td>
          <td>\(\alpha A \beta \rightarrow \alpha \gamma \beta\)</td>
          <td>Autómata Linealmente Acotado</td>
        </tr>
      </tbody>
    </table> 
<!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama de capas concéntricas de la Jerarquía de Chomsky en colores vibrantes, resaltando el nivel Tipo 2 'Gramáticas Libres del Contexto' con una lupa o resplandor verde. Al costado, un bloque de código mostrando bloques anidados if/while.
    -->
    <div class="video-player-wrapper" style="height:90%">
      <video src="videos/c07/glc_chomsky.mp4" poster="img/jerarquia_gramaticas.png" controls></video>
    </div>
Note:
Recordemos la Jerarquía de Chomsky. En la Unidad 2 vimos que las gramáticas regulares (Tipo 3) sirven para describir los tokens de un lenguaje. Pero la sintaxis completa de un lenguaje de programación, con sus estructuras anidadas, requiere un nivel más: las gramáticas de Tipo 2, que llamamos gramáticas independientes o libres del contexto. En una GIC, la regla de producción tiene siempre un único no terminal del lado izquierdo, y del lado derecho puede haber cualquier combinación de terminales y no terminales.

---

## Definición Formal de GIC

<p style="font-size:0.9rem; text-align:center; margin-top:0px">Una Gramática Libre del Contexto se define formalmente como una <strong>cuádrupla</strong>:</p>

<div style="text-align: center; font-weight: bold; font-size: 1.4rem; color: var(--accent-color); margin: 15px 0;">
  \(G = (N, T, S, P)\)
</div>

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <table class="compare-table" style="font-size:1rem;">
      <tr>
        <th>Componente</th>
        <th>Descripción</th>
      </tr>
      <tr>
        <td>\(N\)</br>
        No Terminales</td>
        <td>Conjunto finito de símbolos sintácticos (mayúsculas o <code>&lt;etiquetas&gt;</code>).</td>
      </tr>
      <tr>
        <td>\(T\)</br>Terminales</td>
        <td>Conjunto finito de símbolos del lenguaje (los tokens finales). \(N \cap T = \emptyset\).</td>
      </tr>
      <tr>
        <td>\(S \in N\)</br>Símbolo Inicial</td>
        <td>El no terminal distinguido desde el cual inicia toda derivación.</td>
      </tr>
      <tr>
        <td>\(P\)</br>Producciones</td>
        <td>Conjunto de reglas de la forma \(A \rightarrow \alpha\), con \(A \in N\) y \(\alpha \in (T \cup N)^*\).</td>
      </tr>
    </table>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 10px;">
      <video src="videos/c07/glc_definicion.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>
<div class="flipped-callout-bis" style="margin-top:10px;">
      <p style="font-size:0.8rem; margin:0;">
        <strong>"Independiente del contexto"</strong> significa que el reemplazo de \(A\) por \(\alpha\) se aplica siempre, sin importar qué símbolos rodeen a \(A\).
      </p>
    </div>

Note:
Formalmente, una gramática independiente del contexto G es una cuádrupla G = (N, T, S, P). N son los no terminales, T los terminales, S el símbolo inicial y P las producciones. Noten que en el ejemplo de expresiones aritméticas, E aparece en el lado derecho de sus propias reglas: eso es recursividad, lo que permite generar expresiones arbitrariamente largas como id + nro * (id + nro).

---


## Ejemplo GIC

<div style="text-align: center; font-weight: bold; font-size: 1.4rem; color: var(--accent-color); margin: 15px 0;">
  \(G = (N, T, S, P)\)
</div>
<div class="two-col">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title"><i class="fas fa-code-branch"></i> Expresiones Aritméticas</h4>
      <ul style="font-size:0.75rem; line-height:1.5; margin-left:15px;">
        <li>\(E \rightarrow E + E\)</li>
        <li>\(E \rightarrow E \times E\)</li>
        <li>\(E \rightarrow (E)\)</li>
        <li>\(E \rightarrow V\)</li>
        <li>\(V \rightarrow \text{id} \mid \text{nro}\)</li>
      </ul>      
    </div>
  </div>
  <div class="col card">
  <p style="font-size:0.75rem; color:var(--text-muted); margin-top:5px; text-align:left">
        \(N = \{E, V\}\) </br>\(T = \{+, \times, (, ), \text{id}, \text{nro}\}\) </br>\(S = E\)
      </p>
  </div>
</div>

Note:
Formalmente, una gramática independiente del contexto G es una cuádrupla G = (N, T, S, P). N son los no terminales, T los terminales, S el símbolo inicial y P las producciones. Noten que en el ejemplo de expresiones aritméticas, E aparece en el lado derecho de sus propias reglas: eso es recursividad, lo que permite generar expresiones arbitrariamente largas como id + nro * (id + nro).

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> En la producción <span class="math-lang"><code>A → α</code></span> de una Gramática Libre del Contexto, ¿qué restricción fundamental cumple el lado izquierdo <span class="math-lang"><code>A</code></span>?</span>
</div>
<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Debe ser una secuencia compuesta por al menos un terminal y un no terminal.</div>
  <div class="quiz-option" data-correct="true">Debe ser exactamente un único símbolo No Terminal (A ∈ N).</div>
  <div class="quiz-option" data-correct="false">Debe ser la cadena vacía (ε).</div>
  <div class="quiz-option" data-correct="false">Debe contener la lista de todas las variables globales del compilador.</div>
</div>
<div class="quiz-feedback"
     data-correct-explain="La clave de una GIC (Tipo 2) es que del lado izquierdo sólo aparece un único símbolo No Terminal A, lo que permite reemplazarlo sin importar su contexto."
     data-incorrect-explain="Recuerda que si el lado izquierdo requiriera símbolos alrededor de A (como αAβ), la gramática sería Dependiente del Contexto (Tipo 1). En las GIC, el lado izquierdo es siempre un solo no terminal."></div>

Note:
Verificar que la definición del lado izquierdo de las producciones GIC haya quedado clara antes de profundizar en derivaciones.

---

## Derivaciones Canónicas

<p style="font-size:0.85rem; margin-top:0px">Una <strong>derivación</strong> es la secuencia de reemplazos de no terminales aplicando reglas de producción desde el no terminal inicial hasta obtener una cadena pura de terminales.</p>
<p style="text-align:left; margin-top:0px">En las GIC, el lado derecho de una regla puede contener varios no terminales. Por eso pueden existir distintas secuencias de reemplazo. Para evitar ambigüedades en el proceso se definen la derivación por izquierda y por derecha. Ambas llegan a la misma cadena final.</p>
<div class="two-col" style="margin-top:1px;">
  <div class="col">
    <div class="flipped-callout-bis">
      <h4 class="card-title"><span class="icon"><i class="fas fa-arrow-left"></i></span> Derivación por Izquierda (\(\Rightarrow_L\))</h4>
      <p style="font-size:0.8rem;">En cada paso se reemplaza siempre el no terminal posicionado <strong>más a la izquierda</strong>.</p>
    </div>
  </div>
  <div class="col">
    <div class="flipped-callout-bis">
      <h4 class="card-title"><span class="icon"><i class="fas fa-arrow-right"></i></span> Derivación por Derecha (\(\Rightarrow_R\))</h4>
      <p style="font-size:0.8rem;">En cada paso se reemplaza siempre el no terminal posicionado <strong>más a la derecha</strong>.</p>
    </div>
  </div>
</div>

<div class="card" style="margin-top:1px; padding:10px;">
  <h4 class="card-title"><i class="fas fa-stream"></i> Ejemplo: Gramática con reglas \(S \rightarrow zMNz, M \rightarrow aMa \mid z, N \rightarrow bNb \mid z\)</h4>
  <p style="font-size:0.8rem; margin:5px 0;">Para generar la cadena <code>zazabzbz</code>:</p>
  <ul style="font-size:0.75rem; line-height:1.5;">
    <li><strong>Derivación por Izquierda (\(\Rightarrow_L\)):</strong><br>
    \(S \Rightarrow_L zMNz \Rightarrow_L zaMaNz \Rightarrow_L zazaNz \Rightarrow_L zazabNbz \Rightarrow_L zazabzbz\)</li>
    <li><strong>Derivación por Derecha (\(\Rightarrow_R\)):</strong><br>
    \(S \Rightarrow_R zMNz \Rightarrow_R zMbNbz \Rightarrow_R zMbzbz \Rightarrow_R zaMabzbz \Rightarrow_R zazabzbz\)</li>
  </ul>
</div>


Note:
En las GIC, el lado derecho de una regla puede contener varios no terminales. Por eso pueden existir distintas secuencias de reemplazo. Para evitar ambigüedades en el proceso se definen la derivación por izquierda (que siempre reemplaza el no terminal más a la izquierda) y por derecha (que siempre reemplaza el más a la derecha). Ambas llegan a la misma cadena final.

---

## Árbol de Análisis Sintáctico 

<p style="font-size:0.85rem;">El <strong>árbol de análisis sintáctico</strong> es una representación gráfica que abstrae el orden de los pasos de derivación y muestra la <strong>estructura jerárquica</strong> de la cadena:</p>
<div class="two-col-flex ratio-60-40">
  <div class="col">    
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-sitemap"></i> Propiedades del Árbol</h4>
      <ul style="font-size:0.75rem; line-height:1.4;">
        <li><strong>Raíz:</strong> Contiene el símbolo inicial \(S\).</li>
        <li><strong>Nodos Interiores:</strong> Símbolos No Terminales (\(N\)).</li>
        <li><strong>Hojas:</strong> Símbolos Terminales (\(T\)) o \(\epsilon\), leídos de izquierda a derecha.</li>
        <li><strong>Ramas (Hijos):</strong> Corresponden a los símbolos del lado derecho de la producción aplicada (\(A \rightarrow X_1 X_2 \dots X_n\)).</li>
      </ul>
    </div>    
  </div>
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama de un árbol de derivación (Parse Tree) limpio para la cadena 'aaaab' partiendo del nodo raíz S, con nodos no terminales X e Y y hojas verdes terminales. Estilo esquemático limpio tipo gráfico con fondo oscuro.
    -->
    <div class="video-player-wrapper" style="margin-top: 10px;">
      <video src="videos/c07/glc_arbolsintactico.mp4" poster="img/arbol_sintactico.png" controls></video>
    </div>
  </div>
</div>
<div class="flipped-callout-bis" style="margin-top:10px;">
      <p style="font-size:0.8rem; margin:0;">
        <i class="fas fa-check-circle"></i> Tanto la derivación por izquierda como por derecha corresponden al <strong>mismo árbol sintáctico</strong>.
      </p>
    </div>

Note:
Como en las GIC pueden existir varias derivaciones equivalentes para la misma cadena, necesitamos una representación que capture la estructura de la derivación sin importar el orden en que se aplicaron las reglas: el árbol de análisis sintáctico o parse tree. La raíz es el símbolo inicial, los nodos internos son no terminales y las hojas son los terminales que forman la cadena.

---

## Ejercicio Guiado

<p style="font-size:0.85rem;  margin-top:-5px; margin-bottom:10px;">
  Dada la gramática: &nbsp; </br>
  <code>S → (L) | a</code> &nbsp;&nbsp;&nbsp;</br> 
  <code> L → L, S | S</code> &nbsp;&nbsp;&nbsp; 
</p>

<div class="simulator-container" id="sim-container-c07">
  <div class="simulator-steps" id="sim-steps-c07"></div>
  <div class="simulator-content">
    <p id="sim-desc-c07" style="font-size: 0.85rem !important; margin-bottom: 8px !important;"></p>
    <div class="sim-output-box" id="sim-output-c07"></div>
    <div class="sim-nav">
      <button class="sim-nav-btn" id="sim-prev-c07"><i class="fas fa-chevron-left"></i> Anterior</button>
      <span class="sim-nav-info" id="sim-info-c07"></span>
      <button class="sim-nav-btn" id="sim-next-c07">Siguiente <i class="fas fa-chevron-right"></i></button>
    </div>
  </div>
</div>

Note:
Observen la diferencia entre ambas derivaciones: en la derivación por izquierda se reemplazó primero el L más a la izquierda; en la derivación por derecha se reemplazó primero el S más a la derecha. Sin embargo, ambas corresponden al mismo árbol. Esto nos dice que para esta cadena existe un único árbol sintáctico.

---

## Equivalencia: GIC ≡ APND

<div class="card" style="border-left: 4px solid var(--accent-color); padding:12px;">
      <h3 style="margin-top:0; font-size:1.1rem; color:var(--accent-color);">
        <i class="fas fa-balance-scale"></i> Teorema Fundamental
      </h3>
      <p style="font-size:0.85rem; line-height:1.5;">
        La clase de lenguajes generados por las <strong>Gramáticas Libres del Contexto (GIC)</strong> es <strong>exactamente idéntica</strong> a la clase de lenguajes aceptados por los <strong>Autómatas con Pila No Deterministas (APND)</strong>.
      </p>
      <div style="text-align:center; font-weight:bold; font-size:1.2rem; margin-top:10px;">
        \(L(G) = L(M)\)
      </div>
    </div>
<div class="two-col-flex ratio-60-40">
  <div class="col">    
    <div class="flipped-callout" style="margin-top:12px;">
      <h4><i class="fas fa-cogs"></i> Relevancia Práctica en Compiladores</h4>
      <p style="font-size:0.8rem;">
        • La <strong>GIC</strong> es la especificación humana y clara de la sintaxis del lenguaje.<br>
        • El <strong>AP</strong> es el motor algorítmico que implementa el analizador sintáctico (parser).
      </p>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 10px;">
      <video src="videos/c07/glc_equivalencia_ap.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Este teorema es uno de los resultados más importantes de la teoría de lenguajes formales: los lenguajes generados por GIC son exactamente los mismos que los aceptados por APND. En la práctica, la sintaxis del lenguaje se especifica con una GIC y el compilador la ejecuta mediante un AP. El teorema garantiza que siempre es posible pasar de una representación a la otra.

---

## Construcción de un AP desde una GIC

<p style="font-size:0.85rem;">Dada una GIC \(G = (N, T, S, P)\), construimos un APND equivalente \(M\) con <strong>4 estados</strong>: \(\{i, p, q, f\}\)</p>

<table class="compare-table" style="width:100%; margin-top:10px;">
  <thead>
    <tr>
      <th>Paso</th>
      <th>Transición Formal</th>
      <th>Descripción de la Acción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Inicialización</strong></td>
      <td>\((i, \epsilon, \epsilon ; p, \#)\)</td>
      <td>De \(i\) a \(p\): Apila el marcador de fondo <code>#</code> sin leer entrada.</td>
    </tr>
    <tr>
      <td><strong>2. Símbolo Inicial</strong></td>
      <td>\((p, \epsilon, \epsilon ; q, S)\)</td>
      <td>De \(p\) a \(q\): Apila el símbolo inicial \(S\) de la gramática.</td>
    </tr>
    <tr>
      <td><strong>3. Producciones</strong></td>
      <td>\((q, \epsilon, A ; q, w)\) &nbsp; \(\forall (A \rightarrow w) \in P\)</td>
      <td>En \(q\): Si el tope de la pila es \(A\), lo reemplaza por la cadena \(w\) (apilada de derecha a izquierda).</td>
    </tr>
    <tr>
      <td><strong>4a. Coincidencia Terminal</strong></td>
      <td>\((q, x, x ; q, \epsilon)\) &nbsp; \(\forall x \in T\)</td>
      <td>En \(q\): Si el terminal de entrada coincide con el tope de pila \(x\), se consumen ambos.</td>
    </tr>
    <tr>
      <td><strong>4b. Aceptación Final</strong></td>
      <td>\((q, \epsilon, \# ; f, \epsilon)\)</td>
      <td>De \(q\) a \(f\): Si el tope es <code>#</code>, vacía la pila y finaliza en el estado de aceptación \(f\).</td>
    </tr>
  </tbody>
</table>


Note:
Dada una GIC, el AP equivalente se construye siguiendo un procedimiento sistemático de 4 estados: i, p, q y f. La idea intuitiva es que el AP simula una derivación por izquierda de la gramática. Si el tope es un no terminal, aplica una regla de producción. Si el tope es un terminal, lo contrasta con la entrada.

---

## Ejemplo: construcción del AP

<p style="font-size:0.85rem;">Construyamos el AP para la gramática: &nbsp; <code>S → zMNz</code> &nbsp;|&nbsp; <code>M → aMa | z</code> &nbsp;|&nbsp; <code>N → bNb | z</code></p>

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <table class="compare-table" style="font-size:1rem;">
      <thead>
        <tr>
          <th>Regla / Origen</th>
          <th>Transición del AP</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Paso 1 (Inicio)</td><td>\((i, \epsilon, \epsilon ; p, \#)\)</td></tr>
        <tr><td>Paso 2 (Símbolo S)</td><td>\((p, \epsilon, \epsilon ; q, S)\)</td></tr>
        <tr><td>Regla 1: \(S \rightarrow zMNz\)</td><td>\((q, \epsilon, S ; q, zMNz)\)</td></tr>
        <tr><td>Reglas 2 y 3: \(M\)</td><td>\((q, \epsilon, M ; q, aMa)\) &nbsp;y&nbsp; \((q, \epsilon, M ; q, z)\)</td></tr>
        <tr><td>Reglas 4 y 5: \(N\)</td><td>\((q, \epsilon, N ; q, bNb)\) &nbsp;y&nbsp; \((q, \epsilon, N ; q, z)\)</td></tr>
        <tr><td>Match Terminales</td><td>\((q, z, z ; q, \epsilon)\), \((q, a, a ; q, \epsilon)\), \((q, b, b ; q, \epsilon)\)</td></tr>
        <tr><td>Paso 4b (Fin)</td><td>\((q, \epsilon, \# ; f, \epsilon)\)</td></tr>
      </tbody>
    </table>
  </div>
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama de 4 estados (i, p, q, f) donde el estado q presenta múltiples bucles alrededor de sí mismo correspondientes a las reglas de la GIC y coincidencias de terminales.
    -->
        <div class="video-player-wrapper">
      <video src="videos/c07/ejemplo_glc_ap.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Observen que desde el estado q existen dos transiciones posibles cuando el tope de la pila es M: se puede aplicar M -> aMa o M -> z. Eso es el no determinismo en acción: el AP prueba ambas posibilidades y acepta si alguna conduce al éxito.

---

## Traza del AP para la cadena <code>zazabzbz</code>

<table class="compare-table" style=" width:100%; margin-top:-5px">
  <thead>
    <tr>
      <th>Pila (Cima a la izq.)</th>
      <th>Entrada restante</th>
      <th>Transición aplicada</th>
      <th>Acción</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>\(\epsilon\)</td><td><code>zazabzbz</code></td><td>\((i, \epsilon, \epsilon ; p, \#)\)</td><td>Inicializa con #</td></tr>
    <tr><td><code>#</code></td><td><code>zazabzbz</code></td><td>\((p, \epsilon, \epsilon ; q, S)\)</td><td>Apila S</td></tr>
    <tr><td><code>S #</code></td><td><code>zazabzbz</code></td><td>\((q, \epsilon, S ; q, zMNz)\)</td><td>Regla 1: Reemplaza S</td></tr>
    <tr><td><code>zMNz #</code></td><td><code>zazabzbz</code></td><td>\((q, z, z ; q, \epsilon)\)</td><td>Consume terminal z</td></tr>
    <tr><td><code>MNz #</code></td><td><code>azabzbz</code></td><td>\((q, \epsilon, M ; q, aMa)\)</td><td>Regla 2: Reemplaza M por aMa</td></tr>
    <tr><td><code>aMaNz #</code></td><td><code>azabzbz</code></td><td>\((q, a, a ; q, \epsilon)\)</td><td>Consume terminal a</td></tr>
    <tr><td><code>MaNz #</code></td><td><code>zabzbz</code></td><td>\((q, \epsilon, M ; q, z)\)</td><td>Regla 3: Reemplaza M por z</td></tr>
    <tr><td><code>zaNz #</code></td><td><code>zabzbz</code></td><td>\((q, z, z ; q, \epsilon)\)</td><td>Consume terminal z</td></tr>
    <tr><td><code>...</code></td><td><code>...</code></td><td><code>...</code></td><td>...</td></tr>
    <tr style="background-color:rgba(76, 175, 80, 0.2); font-weight:bold;"><td colspan="4" style="text-align:center;">¡Entrada totalmente leída, pila vacía y arribo al estado final f! (ACEPTADO)</td></tr>
  </tbody>
</table>

Note:
La traza muestra cómo el autómata con pila simula paso a paso la derivación por izquierda de la cadena zazabzbz.

---

## Ambigüedad en Gramáticas

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="flipped-callout recordar">
      <h4><i class="fas fa-exclamation-triangle"></i> Definición de Ambigüedad</h4>
      <p style="font-size:0.85rem;">
        Una gramática es <strong>ambigua</strong> si existe al menos una cadena en su lenguaje para la cual se pueden construir <strong>dos o más ÁRBOLES de análisis sintáctico DISTINTOS</strong>.
      </p>
    </div>
    <div class="card" style="margin-top:10px; padding:10px; background-color:rgba(244, 67, 54, 0.1);">
      <h4 class="card-title" style="margin-top:0; color:#f44336;"><i class="fas fa-times-circle"></i> ¡Atención! Error Frecuente</h4>
      <p style="font-size:0.75rem; margin:0;">
        Tener dos derivaciones distintas (una por izquierda y una por derecha) <strong>NO es ambigüedad</strong>. La ambigüedad requiere <strong>diferencia estructural en los árboles</strong>.
      </p>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 10px;">
      <video src="videos/c07/ambiguedad.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Decimos que una gramática es ambigua cuando existe al menos una cadena del lenguaje que tiene más de un árbol de análisis sintáctico distinto. ¿Por qué es un problema? Porque el árbol de análisis sintáctico determina el significado de la sentencia. Si hay dos árboles, el compilador puede generar código diferente según cuál elija.

---

## Ambigüedad 1: Precedencia Aritmética

<p style="font-size:0.85rem; margin-top:-5px">Dada la gramática: &nbsp; <code>E → E + E | E × E | (E) | nro</code> &nbsp;&nbsp; demostramos que es ambigua.</p>

<div class="two-col" style="margin-top:10px;">
  <div class="col">
    <div class="card" style="text-align:center; padding:10px;">
      <h4 class="card-title" style="margin-top:0; color:var(--accent-color);">Árbol 1: Evaluará como \(5 \times (2 + 9)\)</h4>
      <img src="img/arbol_ambiguo_1.png" style="align:center; height:20%"></img>
      <p style="font-size:0.9rem; font-weight:bold; color:var(--accent-danger);">Resultado = 55</p>
      <p style="font-size:0.75rem; color:var(--text-muted);">La suma queda en un nivel inferior en el árbol (se evalúa primero).</p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="text-align:center; padding:10px;">
      <h4 class="card-title" style="margin-top:0; color:var(--accent-color);">Árbol 2: Evaluará como \((5 \times 2) + 9\)</h4>
      <img src="img/arbol_ambiguo_2.png" style="align:center; height:20%"></img>
      <p style="font-size:0.9rem; font-weight:bold; color:var(--accent-success);">Resultado = 19 (Correcto)</p>
      <p style="font-size:0.75rem; color:var(--text-muted);">La multiplicación queda en un nivel inferior (se evalúa primero).</p>
    </div>
  </div>
</div>
<div class="card" style="margin-top:10px; padding:10px;">
  <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-brain"></i> ¿Cómo podemos evitar la ambiguüedad en esta gramática?</h4>
</div>

Note:
Para la cadena 5 * 2 + 9 es posible construir dos árboles distintos: uno interpreta 5 * (2 + 9) = 55 y el otro (5 * 2) + 9 = 19. Para resolverlo, reescribimos la gramática con niveles de no terminales (E, T, F) que fuerzan la precedencia correcta.

---

## Ambigüedad 2: El *Dangling Else* 

<p style="font-size:0.8rem; text-align:left; margin-top:-5px">Dada la gramática de condicionales:</br>
      <code>S → if c then S</code></br>
      <code>S → if c then S else S</code></br>
      <code>S → a</code>
    </p>
<div class="two-col-flex ratio-60-40" style="margin-top:0px">
  <div class="col">    
    <p style="font-size:0.8rem;">Para la cadena <code style="color:var(--accent-success)">if c1 then if c2 then a1 else a2</code> surgen 2 interpretaciones:</p>
    <div class="card" style="padding:8px; font-size:1rem; margin-top:5px;">
      <strong>Interpretación A:</strong> El <code>else</code> pertenece al segundo <code>if</code>.<br>
      <code style="color:var(--accent-success)">if c1 then (if c2 then a1 else a2)</code>
    </div>
    <div class="card" style="padding:8px; font-size:1rem; margin-top:5px;">
      <strong>Interpretación B:</strong> El <code>else</code> pertenece al primer <code>if</code>.<br>
      <code style="color:var(--accent-success)">if c1 then (if c2 then a1) else a2</code>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="width:100%">
    <video src="videos/c07/ambiguedad_ejemplo.mp4" poster="img/arboles_ambiguos.png" controls></video>
  </div>
  </div>
</div>

<div class="flipped-callout-bis" style="margin-top:10px;">
  <p style="font-size:0.8rem; margin:0;">
    <i class="fas fa-lightbulb"></i> En lenguajes como C/C++, la ambigüedad se resuelve por regla del compilador (asociar al <code>if</code> más cercano). Lenguajes como Python (por indentación) o Ruby/Lua (palabra clave <code>end</code>) la eliminan desde su diseño sintáctico.
  </p>
</div>

Note:
El problema del else colgante aparece en lenguajes como C o Java. La solución en la práctica es asociar el else al if más cercano o usar sintaxis explícita con bloques (como llaves o end).

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Por qué la ambigüedad en una gramática es inaceptable para un compilador real?</span>
</div>
<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Porque hace que la gramática tenga un número infinito de símbolos terminales.</div>
  <div class="quiz-option" data-correct="true">Porque una misma cadena genera múltiples árboles sintácticos, provocando que el compilador compute o genere código intermedio impredecible.</div>
  <div class="quiz-option" data-correct="false">Porque impide que el analizador léxico genere los tokens.</div>
  <div class="quiz-option" data-correct="false">Porque transforma la gramática Tipo 2 en una gramática Tipo 3.</div>
</div>
<div class="quiz-feedback"
     data-correct-explain="El árbol sintáctico es la estructura sobre la cual se realiza el análisis semántico y la generación de código. Dos árboles distintos implican dos comportamientos del programa totalmente diferentes."
     data-incorrect-explain="Recordá que el árbol sintáctico determina el significado (semántica) de la instrucción. Si hay más de un árbol, el programa podría ejecutar cálculos distintos según cuál elija el parser."></div>

Note:
Asegurarse de que se entienda el impacto de la ambigüedad en las fases sintáctica y semántica del compilador.

---

## Ejercicios Propuestos 

<div class="flipped-callout-bis" style="margin-top:15px; text-align:center;">
  <p style="font-size:0.85rem; margin:0;">
    <i class="fas fa-arrow-right"></i> <strong>Resolvé los siguientes ejercicios y los revisaremos en la clase presencial.
  </p>
</div>
<div class="card">
  <ol>
    <li>Escribir una GIC que genere el lenguaje \(L_1 = \{x^n y^n \mid n \ge 0\}\). Obtener el árbol y derivaciones para <code>x²y²</code>.</li>
    <li>Escribir una GIC que genere el lenguaje \(L_2 = \{x^n y^m \mid n, m \in \mathbb{N} \text{ y } n \ge m\}\).</li>
    <li>Dada la GIC del ejercicio 1, aplicar el algoritmo de 4 estados para construir el APND equivalente.</li>
    <li>Reescribir la gramática de expresiones aritméticas para eliminar la ambigüedad y respetar precedencia estándar (\(\times\) antes que \(+\)).</li>
  </ol>  
</div>

Note:
Resuelvan los ejercicios 1a, 1b, 2 y 3 para trabajar en equipo durante nuestro próximo taller presencial. En los siguientes videos veremos cómo se implementan los analizadores sintácticos en la práctica (LL y LR).

---

<!-- SLIDE: Resumen de la Clase -->
  <h2 class="text-gradient">Resumen de la Clase</h2> 
  <div class="grid-2">
    <div class="card">
      <h4 class="card-title" ><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos</h4>
      <ul>
        <li>Las GIC modelan la sintaxis mediante reglas A → α aplicables sin importar el contexto.</li>
        <li>El árbol sintáctico representa la estructura independientemente del orden de derivación </li>
        <li>Dada una GIC es posible construir un APND equivalente</li>
        <li>Se elimina la ambigüedad reescribiendo la gramática con jerarquías de No Terminales para forzar la precedencia correcta</li>
        </ul>
    </div>          
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección</h4>
      <p style="margin-top:15px; text-align:center; color:var(--text-muted);">Análisis sintáctico descendente recursivo</p>
    </div>    
  </div>
  <div class="flipped-callout" style="text-align: center;">
    <p><strong>⚠️ Recordatorio:</strong> Asegúrate de completar el cuestionario de autoevaluación en la plataforma antes de asistir a la clase presencial.</p>
  </div>
  
Note:
En resumen: completamos la base teórica de las GIC, su relación directa con los autómatas con pila y el impacto de la ambigüedad en el diseño de compiladores.

<!-- HOJA DE RUTA --->
<h2>¿Qué vamos a aprender en esta clase?</h2>
<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 15px !important;">
  <h4><i class="fas fa-lightbulb"></i> Bienvenidos a la Unidad 3: Análisis Sintáctico</h4>
  <p>En las clases anteriores construimos el analizador léxico usando AF y ER. Hoy damos el salto hacia modelos más potentes para analizar la <strong>estructura sintáctica</strong> de un lenguaje de programación.</p>
</div>
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta de la clase </span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; font-weight: bold;">
      <li>Límites de los AF</li>
      <li>Autómata con Pila (\(\text{AF} + \text{Pila} = \text{AP}\))</li>
      <li>Aceptación de una cadena</li>
      <li>AP Deterministas vs. AP No Deterministas</li>
      <li>Definición y notación de transiciones</li>
      <li>Traza de ejecución</li>
      <li>Conexión con el analizador sintáctico</li>
    </ul>       
  </div>  
  <div>
    <div class="video-player-wrapper" style="margin-top: 15px;">
      <video src="videos/c07/ap_intro.mp4" poster="img/ap_intro.jpeg" controls></video>
    </div>
  </div>  
</div>

Note:
Hasta ahora, en la Unidad 2, trabajamos con autómatas finitos y expresiones regulares para construir el analizador léxico. Esos modelos son poderosos para reconocer tokens —identificadores, números, palabras clave— pero tienen una limitación importante. En esta lección inauguramos la Unidad 3: Análisis Sintáctico, y presentamos el autómata con pila (AP), el modelo teórico capaz de recordar y procesar estructuras anidadas como los paréntesis de una expresión.

---

## El límite de los Autómatas Finitos

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <p>Pensá en una estructura tan cotidiana en cualquier lenguaje de programación como los <strong>paréntesis anidados</strong>:</p>
    <div class="sim-expression" style="text-align:center; font-size:1.4rem; margin: 15px 0; font-family: monospace; color:var(--accent-success)">
      ((a + b) * (c - d))
    </div>
    <p style="font-size: 0.85rem;">Para saber si esta expresión es <strong>sintácticamente correcta</strong>, la máquina debe <span style="color:var(--accent-success)">recordar</span> <strong>cuántos paréntesis abrió</strong> para verificar que se cierren exactamente la misma cantidad.</p>
    <div class="flipped-callout recordar">
      <h4><i class="fas fa-exclamation-triangle"></i> La limitación de la memoria finita</h4>
      <p>Un autómata finito (AF) solo puede recordar en qué estado se encuentra. No posee una memoria secundaria para llevar la cuenta de un anidamiento arbitrario. Por eso, lenguajes como \(L = \{x^n y^n \mid n \ge 0\}\) <strong>no son reconocibles por un AF</strong>.</p>
    </div>
  </div>
  <div class="col">
    <img src="img/limite_af.jpeg" alt="Límite del autómata finito sin memoria para contar" style="width:90%; border-radius:10px; border:1px solid var(--border-color); display:block; margin:0 auto;">
  </div>
</div>

Note:
Pensemos en algo tan común en cualquier lenguaje de programación como los paréntesis anidados. Una expresión como ((a + b) * (c - d)) exige que el compilador recuerde cuántos paréntesis abrió para saber cuántos debe cerrar. Y un autómata finito no puede hacer eso: no tiene memoria para contar. Este es exactamente el límite de los lenguajes regulares: no pueden describir estructuras con anidamiento arbitrario. Para reconocer este tipo de estructuras, necesitamos un modelo más potente.

---

## La Solución: Autómata con Pila (AP)

<div class="two-col-flex ratio-50-50">
  <div class="col">
    <div class="flipped-callout-bis" style="text-align:center; padding:15px; margin-bottom:15px;">
      <h3 style="margin:0; font-size:1.4rem; color:var(--accent-color);">
        <i class="fas fa-microchip"></i> AF + Pila = AP
      </h3>
      <p style="font-size:0.85rem; margin-top:5px;">Incorporamos una memoria de acceso <strong>LIFO</strong> (Last In, First Out) al autómata finito.</p>
    </div>
    <div class="card">
      <h4 class="card-title"><span class="icon"><i class="fas fa-layer-group"></i></span>¿Cómo opera la memoria Pila?</h4>
      <ul style="font-size: 0.85rem; line-height: 1.6;">
        <li>Permite <strong>apilar (push)</strong> y <strong>desapilar (pop)</strong> símbolos sin límite de tamaño.</li>
        <li>Provee "memoria para contar" y rastrear estructuras anidadas.</li>
        <li>En cada paso, el AP lee la entrada, examina el tope de la pila y decide el siguiente movimiento.</li>
      </ul>
    </div>
  </div>
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama animado o esquemático que muestra una cinta de entrada a la izquierda, un control de estados al centro y una estructura vertical de pila (stack LIFO) a la derecha. Flechas que representan las operaciones de Push y Pop con símbolos. Estilo limpia infografía técnica.
    -->
    <div class="video-player-wrapper" style="margin-top: 15px;">
      <video src="videos/c07/ap_1ra_def.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
</div>

Note:
La solución es incorporar una memoria en forma de pila al autómata finito. Eso es, exactamente, un autómata con pila. La pila funciona como una estructura LIFO: el último elemento que se apila es el primero en salir. A diferencia del autómata finito, que solo puede recordar en qué estado está, el autómata con pila puede almacenar y recuperar información de la pila en cada paso. Esto le da memoria para contar, para recordar cuántas cosas procesó, y para verificar que las estructuras anidadas estén correctamente cerradas.

---

## Las 4 acciones de cada transición

<p style="font-size:0.9rem; text-align:center;">En cada paso de cómputo, una transición de un autómata con pila realiza <strong>cuatro acciones simultáneas</strong>:</p>

<div class="grid-2" style="margin-top:15px;">
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-arrow-right"></i></span> 1. Leer Entrada</div>
    <p style="font-size: 0.85rem;">Lee un símbolo del alfabeto de entrada \(\Sigma\), o no consume nada usando la cadena vacía (\(\epsilon\)).</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-upload"></i></span> 2. Extraer del Tope</div>
    <p style="font-size: 0.85rem;">Extrae el símbolo que está en la cima o tope de la pila (operación <em>Pop</em>), o no desapila nada (\(\epsilon\)).</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-download"></i></span> 3. Apilar Símbolos</div>
    <p style="font-size: 0.85rem;">Inserta uno o más símbolos en la cima de la pila (operación <em>Push</em>), o no inserta nada (\(\epsilon\)).</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-exchange-alt"></i></span> 4. Cambiar de Estado</div>
    <p style="font-size: 0.85rem;">Transiciona desde el estado actual a un nuevo estado en el conjunto de estados \(Q\).</p>
  </div>
</div>

<div class="flipped-callout-bis" style="margin-top:15px;">
  <p style="font-size:0.85rem; margin:0; text-align:center;">
    <i class="fas fa-info-circle"></i> Gracias al uso de \(\epsilon\), el AP puede operar sobre la pila sin avanzar la cinta de entrada, o cambiar de estado sin alterar la pila.
  </p>
</div>

Note:
En cada paso, la transición de un autómata con pila hace cuatro cosas:
1. Lee un símbolo de la entrada —o no lee nada, usando épsilon—.
2. Extrae el símbolo que está en el tope de la pila —o no saca nada—.
3. Inserta un nuevo símbolo en la pila —o no inserta nada—.
4. Pasa a un nuevo estado.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Por qué un Autómata Finito no puede reconocer el lenguaje <span class="math-lang"> \(L = \{x^n y^n \mid n \ge 0\}\)</span>?</span>
</div>
<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Porque el alfabeto no contiene suficientes símbolos.</div>
  <div class="quiz-option" data-correct="true">Porque requiere contar un número indeterminado de 'x' para comparar con las 'y', y su memoria de estados es finita.</div>
  <div class="quiz-option" data-correct="false">Porque las expresiones regulares no admiten la letra 'y'.</div>
  <div class="quiz-option" data-correct="false">Porque solo los autómatas no deterministas pueden leer cadenas infinitas.</div>
</div>
<div class="quiz-feedback"
     data-correct-explain="Un AF tiene un número finito de estados fijo. Para recordar 'n' apariciones de 'x' cuando 'n' puede ser arbitrariamente grande, se necesita una memoria secundaria no acotada como la pila."
     data-incorrect-explain="Recordá que la limitación clave del AF es la falta de memoria secundaria: solo cuenta con una cantidad finita de estados internos, por lo que no puede almacenar un contador arbitrario 'n'."></div>

Note:
Verificar que haya quedado clara la motivación del uso de la pila antes de definir las condiciones formales de aceptación.

---

## ¿Cuándo se acepta una cadena?

<p style="font-size:0.9rem; text-align:center;">Para que un Autómata con Pila acepte una cadena de entrada, deben cumplirse <strong>tres condiciones simultáneamente</strong> al finalizar el procesamiento:</p>

<div class="grid-3" style="margin-top:20px;">
  <div class="card" style="text-align:center;">
    <div class="card-title" style="justify-content:center;"><span class="icon"><i class="fas fa-check-circle" style="color:var(--accent-success);"></i></span> 1. Entrada Agotada</div>
    <p style="font-size: 0.85rem;">Se leyó la cadena de entrada en su totalidad (no quedan caracteres por consumir en la cinta).</p>
  </div>
  <div class="card" style="text-align:center;">
    <div class="card-title" style="justify-content:center;"><span class="icon"><i class="fas fa-flag-checkered" style="color:var(--accent-success);"></i></span> 2. Estado Final</div>
    <p style="font-size: 0.85rem;">El autómata se encuentra en un estado de aceptación (\(q \in F\)).</p>
  </div>
  <div class="card" style="text-align:center;">
    <div class="card-title" style="justify-content:center;"><span class="icon"><i class="fas fa-inbox" style="color:var(--accent-success);"></i></span> 3. Pila Vacía</div>
    <p style="font-size: 0.85rem;">La pila ha quedado completamente vacía (o solo con el marcador de vaciado definido).</p>
  </div>
</div>

<div class="flipped-callout recordar" style="margin-top:15px;">
  <h4><i class="fas fa-exclamation-circle"></i> Regla de Aceptación Triple</h4>
  <p>Si la entrada se agota pero la pila no está vacía, la cadena es <strong>rechazada</strong>. Si se llega a un estado final pero queda entrada por leer, también es <strong>rechazada</strong>. Las tres condiciones deben ser verdaderas a la vez.</p>
</div>

Note:
Un autómata con pila acepta una cadena si, partiendo de la pila vacía y del estado inicial, logra llegar a un estado final al mismo tiempo que termina de leer toda la cadena de entrada y la pila queda vacía. Las tres condiciones deben cumplirse al mismo tiempo. Si el autómata termina de leer la entrada pero la pila no está vacía, la cadena no se acepta. Si llega a un estado final pero todavía le queda entrada por leer, tampoco. Las tres juntas: estado final, entrada agotada, pila vacía.


---

## APD vs. APND

<div class="two-col">
  <div class="col">
    <div class="flipped-callout">
      <h4><i class="fas fa-star"></i> Enfocados en APND</h4>
      <p style="color:var(--text-muted);">Los APND (AP No Deterministas) constituyen la base formal para comprender la gramática de los lenguajes de programación y el análisis sintáctico.</p>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="width:100%">
      <video src="videos/c07/apnd.mp4" poster="img/miraestevideo_2.png" controls></video>
    </div>
  </div>
</div>
<table class="compare-table" style="width:100%; font-size:1.1rem">
  <thead>
    <tr>
      <th>Modelo</th>
      <th>AF (Autómatas Finitos)</th>
      <th>AP (Autómatas con Pila)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Relación Determinismo vs. No Determinismo</strong></td>
      <td>\(\text{AFD} \equiv \text{AFND}\)<br>(Mismo poder expresivo)</td>
      <td style="background-color: rgba(255, 193, 7, 0.15); font-weight:bold;">\(\text{APD} \subset \text{APND}\)<br>(¡Distinto poder expresivo!)</td>
    </tr>
    <tr>
      <td><strong>Equivalencia de clases</strong></td>
      <td>Todo AFND se puede convertir a un AFD equivalente.</td>
      <td>Existen lenguajes reconocidos por APND que <strong>ningún APD</strong> puede reconocer.</td>
    </tr>
  </tbody>
</table>


Note:
Al igual que los autómatas finitos, los autómatas con pila pueden ser deterministas o no deterministas. En el caso de los autómatas finitos, demostramos que ambas variantes reconocen exactamente los mismos lenguajes. Pero en los autómatas con pila, esto NO ocurre. Existen lenguajes que pueden ser reconocidos por un autómata con pila no determinista pero que ningún autómata con pila determinista puede reconocer. Es una diferencia fundamental. En este curso trabajaremos principalmente con autómatas con pila no deterministas, que son los relevantes para el análisis sintáctico de lenguajes de programación.

---

## Definición Formal de AP

<p style="font-size:0.95rem; text-align:center;">Un Autómata con Pila No Determinista se define formalmente como una <strong>séxtupla</strong>:</p>

<div style="text-align: center; font-weight: bold; font-size: 1.4rem; color: var(--accent-color); margin: 15px 0;">
  \(M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)\)
</div>
<div class="two-col">
  <div class="col">
    <table class="compare-table" style="font-size:1rem" >
      <tr>
        <th>Componente</th>
        <th>Descripción</th>
      </tr>
      <tr>
        <td>\(Q\)</td>
        <td>Conjunto finito de <strong>estados</strong>.</td>
      </tr>
      <tr>
        <td>\(\Sigma\)</td>
        <td><strong>Alfabeto de entrada</strong> (símbolos que lee la cinta).</td>
      </tr>
      <tr>
        <td>\(\Gamma\)</td>
        <td><strong>Alfabeto de la pila</strong> (símbolos que se pueden apilar).</td>
      </tr>
      <tr>
        <td>\(\delta\)</td>
        <td><strong>Función de transición</strong>: \(\delta : Q \times (\Sigma \cup \{\epsilon\}) \times \Gamma \rightarrow \mathcal{P}(Q \times \Gamma^*)\)</td>
      </tr>
      <tr>
        <td>\(q_0 \in Q\)</td>
        <td><strong>Estado inicial</strong>.</td>
      </tr>
      <tr>
        <td>\(z \in \Gamma\)</td>
        <td>Símbolo <strong>inicial de la pila</strong> (marca el fondo de la pila, ej. <code>#</code>).</td>
      </tr>
      <tr>
        <td>\(F \subseteq Q\)</td>
        <td>Conjunto de <strong>estados finales</strong> o de aceptación.</td>
      </tr>
    </table>
  </div>
  <div class="col">
    <div class="video-player-wrapper">
      <video src="videos/c07/ap_def_formal.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Formalmente, un autómata con pila no determinista se define como una séxtupla: M = (Q, Sigma, Gamma, delta, q0, z, F). Los primeros cuatro componentes (Q, Sigma, q0, F) ya los conocemos del autómata finito. Los nuevos son Gamma (el alfabeto de la pila), z (el símbolo inicial que marca el fondo de la pila) y la función de transición delta, que ahora también considera el tope de la pila. La función delta toma el estado actual, el símbolo de entrada y el tope de la pila, y devuelve un conjunto de pares: (nuevo estado, cadena a apilar).

---

### Transiciones y Notación

<p style="font-size:0.9rem;">Para representar visualmente los arcos entre estados en un AP se utiliza la notación:</p>
  <div class="three-col-flex ratio-wide-right">
    <div class="col card" style="font-size:1.4rem; font-weight:bold; color:var(--accent-color); text-align:center; height:70%"></br>
    \((p, x, d ; q, a)\) &nbsp; 
    </div> 
    <div class="col card" style="height:80%"> <img src="img/ap_transiciones.png" style="align:center; width:100%"></img> </div>
    <div class="col">
      <p style="font-size:0.85rem; margin-top:10px;">
        <strong>Interpretación:</strong> Estando en el estado \(p\), si se lee \(x\) de la entrada y el tope de la pila es \(d\), se extrae \(d\) de la pila, se apila la cadena \(a\), y se conmuta al estado \(q\).
      </p>
    </div>
  </div>
<!-- PROMPT PARA GENERAR IMAGEN:
Diagrama de dos nodos de estado p y q conectados por un arco con la etiqueta '(p, x, d ; q, a)'. Debajo, flechas explicativas tipo callout que apuntan a cada componente: x (entrada), d (desapilar), a (apilar) y el cambio de estado de p a q. Diseño vectorial técnico y claro.
-->
<div class="two-col" style="margin-top:15px;">
  <div class="col">
     <div class="flipped-callout">
      <h4><i class="fas fa-sliders-h"></i> Variaciones con \(\epsilon\)</h4>
      <ul style="font-size:0.8rem; line-height:1.5;">
        <li><code>(p, ε, ε ; q, ε)</code>: Cambia de estado sin leer entrada ni tocar la pila.</li>
        <li><code>(p, ε, s ; q, ε)</code>: Desapila <code>s</code> y cambia de estado sin consumir entrada.</li>
        <li><code>(p, x, ε ; q, a)</code>: Lee <code>x</code> y apila <code>a</code> sin extraer nada de la pila.</li>
      </ul>
      </div>
  </div>
  <div class="col">
    <div class="flipped-callout-bis">
      <h4><i class="fas fa-lightbulb"></i> Flexibilidad en las transiciones</h4>
      <p style="font-size:0.8rem;">La inclusión de \(\epsilon\) permite manipular la pila de forma independiente a la lectura de la cinta de entrada.</p>
    </div>
  </div>
</div>

Note:
Para representar visualmente un AP se usa un diagrama de transiciones similar al de los autómatas finitos, pero con etiquetas en los arcos que tienen tres partes: (p, x, d ; q, a). Esto se lee: estando en el estado p, si el símbolo actual de la entrada es x y el símbolo en el tope de la pila es d, entonces se saca d de la pila, se apila a, y se pasa al estado q. Cuando aparece épsilon en alguna posición, esa acción no se realiza.

---

## Apilado Múltiple de Símbolos

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <p style="font-size:0.85rem;">En una sola transición, un AP puede insertar <strong>múltiples símbolos</strong> en la pila:</p>
    <div class="card" style="padding:12px;">
      <div style="font-size:1.1rem; font-weight:bold; color:var(--accent-color); text-align:center;">
        \((p, a, s ; q, xyz)\)
      </div>
      <p style="font-size:0.8rem; margin-top:8px;">
        Significa: Se extrae \(s\) de la cima y se apila la cadena <strong>\(xyz\)</strong>.
      </p>
    </div>
    <div class="flipped-callout recordar" style="margin-top:15px;">
      <h4><i class="fas fa-sort-amount-down"></i> Orden de Apilado LIFO</h4>
      <p style="font-size:0.8rem;">
        La cadena \(xyz\) se escribe de izquierda a derecha en la notación, pero <strong>se apila de derecha a izquierda</strong>: primero se inserta \(z\), luego \(y\), y finalmente \(x\).
      </p>
      <p style="font-size:0.85rem; font-weight:bold; color:var(--accent-color); margin-top:5px; text-align:center;">
        \(\rightarrow\) ¡El primer símbolo (\(x\)) queda en el tope de la pila!
      </p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="text-align:center; background:var(--bg-secondary);">
      <h6 style="margin-top:0;">Estado de la Pila</h6>
      <div style="border: 2px solid var(--accent-color); border-top:none; width:80px; margin:0 auto; padding:5px; background:var(--card-bg); font-size: 1.4rem">
        <div style="border:1px solid #444; margin:2px; padding:4px; font-weight:bold; background:rgba(76, 175, 80, 0.3); font-size: 1.4rem">x (Tope)</div>
        <div style="border:1px solid #444; margin:2px; padding:4px; font-size: 1.4rem">y</div>
        <div style="border:1px solid #444; margin:2px; padding:4px; font-size: 1.4rem">z</div>
        <div style="border:1px solid #444; margin:2px; padding:4px; color:var(--text-muted); font-size: 1.4rem">...</div>
        <div style="border:1px solid #444; margin:2px; padding:4px; background:rgba(255, 193, 7, 0.2); font-size: 1.4rem"># (Fondo)</div>
      </div>
    </div>
  </div>
</div>

Note:
También es posible que una transición apile más de un símbolo en un solo paso. En ese caso, la cadena se escribe de izquierda a derecha pero se apila de derecha a izquierda: el primer símbolo escrito queda en el tope. Por ejemplo, en (p, a, s ; q, xyz), se extrae s, y se apilan primero z, luego y, luego x. El resultado es que x queda en la cima de la pila.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> Dada la transición <span class="math-lang"><code>(q1, 'y', 'x' ; q2, ε)</code></span>, ¿cuál es su efecto exacto durante el procesamiento?</span>
</div>
<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Lee 'y' de la entrada, desapila 'x' de la pila y apila épsilon en el estado q1.</div>
  <div class="quiz-option" data-correct="true">Lee 'y' de la entrada, verifica que 'x' esté en el tope y lo desapila, no apila nada nuevo y pasa al estado q2.</div>
  <div class="quiz-option" data-correct="false">Sin consumir nada de la entrada, cambia 'x' por 'y' en la pila y transiciona a q2.</div>
  <div class="quiz-option" data-correct="false">Apila 'y' y 'x' simultáneamente mientras pasa del estado q1 al q2.</div>
</div>
<div class="quiz-feedback"
     data-correct-explain="El símbolo de entrada es 'y', el tope a desapilar es 'x', el elemento a apilar es 'ε' (nada) y el nuevo estado es q2."
     data-incorrect-explain="Recordá el orden de la tupla: (estado_origen, entrada, desapila ; estado_destino, apila). 'y' se lee de la cinta, 'x' se desapila del tope, no se apila nada (ε) y se avanza a q2."></div>

Note:
Verificar la correcta comprensión de la notación de las transiciones antes de pasar a los ejemplos de simulación completos.

---

## Ejemplo 1

<p style="font-size:0.85rem; margin-top:0px">Diseñemos un AP para reconocer cadenas formadas por \(n\) letras \(x\) seguidas de exactamente \(n\) letras \(y\): el lenguaje \(L = \{x^n y^n \mid n \ge 0\}\)</p>

<div class="two-col-flex ratio-50-50">
  <div class="col">
    <div class="card">
      <h4 class="card-title"><i class="fas fa-cogs"></i> Especificación del Autómata</h4>
      <ul style="font-size:0.8rem; line-height:1.5;">
        <li>\(\Sigma = \{x, y\}\) &nbsp;|&nbsp; \(\Gamma = \{x, \#\}\)</li>
        <li>\(q_0\): Estado inicial &nbsp;|&nbsp; \(q_3\): Estado final</li>
        <li>#: Marcador inicial del fondo de la pila</li>
      </ul>
    </div>
    <div class="flipped-callout">
      <h4><i class="fas fa-lightbulb"></i> Estrategia de Diseño</h4>
      <p style="font-size:0.8rem;">
        1. Al iniciar, apilar <code>#</code>.<br>
        2. Por cada <code>x</code> leída, <strong>apilar <code>x</code></strong>.<br>
        3. Por cada <code>y</code> leída, <strong>desapilar <code>x</code></strong>.<br>
        4. Al encontrar <code>#</code> sin entrada restante, pasar a estado final \(q_3\).
      </p>
    </div>
  </div>
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama de transiciones de un Autómata con Pila con 4 estados circulares: q0, q1, q2 y q3 (q0 inicial, q3 final con doble borde). Arcos etiquetados con: (q0, ε, ε ; q1, #), (q1, x, ε ; q1, x), (q1, y, x ; q2, ε), (q2, y, x ; q2, ε), (q2, ε, # ; q3, ε). Estilo limpio sobre fondo oscuro.
    -->
    <div class="video-player-wrapper" style="margin-top:10px;">
      <video src="videos/c07/ap_ejemplo1.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
</div>

Note:
Empecemos con el lenguaje clásico que usamos para mostrar los límites de los autómatas finitos: cadenas formadas por n letras x seguidas de exactamente n letras y. La intuición es simple: usamos la pila para contar. Por cada x que se lee, se apila un símbolo. Por cada y que se lee, se desapila uno. Si al terminar de leer la entrada la pila quedó vacía —solo con el marcador de fondo—, entonces las cantidades coincidieron y la cadena pertenece al lenguaje.

---

## Paso a Paso
<p style="margin-top:0px">Simulación para w = <code>xxxyyy</code></p>
<div class="timeline" style="font-size:0.8rem;">
  <div class="timeline-item">
    <div class="timeline-badge"></div>
    <p class="timeline-title">Inicio en \(q_0\) con pila \(\epsilon\)</p>
    <p class="timeline-desc">Transición \((q_0, \epsilon, \epsilon ; q_1, \#)\) \(\rightarrow\) Apila <code>#</code> y pasa a \(q_1\). Pila: <code>[#]</code></p>
  </div>
  <div class="timeline-item">
    <div class="timeline-badge"></div>
    <p class="timeline-title">Lectura de 'x', 'x', 'x' en \(q_1\)</p>
    <p class="timeline-desc">Por cada <code>x</code> aplica \((q_1, x, \epsilon ; q_1, x)\) \(\rightarrow\) Pila resultante: <code>[x, x, x, #]</code></p>
  </div>
  <div class="timeline-item">
    <div class="timeline-badge"></div>
    <p class="timeline-title">Primera 'y' transiciona a \(q_2\)</p>
    <p class="timeline-desc">Aplica \((q_1, y, x ; q_2, \epsilon)\) \(\rightarrow\) Desapila una <code>x</code> y pasa a \(q_2\). Pila: <code>[x, x, #]</code></p>
  </div>
  <div class="timeline-item">
    <div class="timeline-badge"></div>
    <p class="timeline-title">Segunda y tercera 'y' en \(q_2\)</p>
    <p class="timeline-desc">Por cada <code>y</code> desapila <code>x</code> mediante \((q_2, y, x ; q_2, \epsilon)\). Pila final: <code>[#]</code></p>
  </div>
  <div class="timeline-item">
    <div class="timeline-badge"></div>
    <p class="timeline-title">Fin de entrada y vaciado final</p>
    <p class="timeline-desc">Aplica \((q_2, \epsilon, \# ; q_3, \epsilon)\) \(\rightarrow\) Desapila <code>#</code>, alcanza el estado final \(q_3\). <strong>¡ACEPTADO!</strong></p>
  </div>
</div>

<div class="flipped-callout-bis" style="margin-top:10px;">
  <p style="font-size:0.8rem; margin:0; text-align:center;">
    <span style="color:var(--accent-success); font-weight:bold;"><i class="fas fa-check"></i> Resultado:</span> Las 3 condiciones se cumplieron: entrada vacía, estado final \(q_3\) alcanzado y pila vacía.
  </p>
</div>

Note:
Sigamos la ejecución paso a paso con la cadena xxxyyy. En q0 apilamos # para marcar el fondo. Luego en q1 leemos las tres x y apilamos tres x. Al leer la primera y desapilamos una x y pasamos a q2. En q2 leemos las dos y restantes desapilando las dos x. Al finalizar la entrada, el tope es #, aplicamos la transición épsilon hacia q3 desapilando #. La cadena queda aceptada.

---

## La Traza de Ejecución del Autómata

<p style="font-size:0.85rem;">La <strong>traza de ejecución</strong> es una tabla formal que documenta el comportamiento del AP paso a paso. Consta de tres columnas clave:</p>

<table class="compare-table" style="font-size:1.1rem; width:100%; margin-top:10px;">
  <thead>
    <tr>
      <th>Pila (Cima a la izq.)</th>
      <th>Entrada restante</th>
      <th>Transición aplicada</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>\(\epsilon\)</td><td><code>xxxyyy</code></td><td>\((q_0, \epsilon, \epsilon ; q_1, \#)\)</td></tr>
    <tr><td><code>#</code></td><td><code>xxxyyy</code></td><td>\((q_1, x, \epsilon ; q_1, x)\) &nbsp;— apila x</td></tr>
    <tr><td><code>x #</code></td><td><code>xxyyy</code></td><td>\((q_1, x, \epsilon ; q_1, x)\) &nbsp;— apila x</td></tr>
    <tr><td><code>xx #</code></td><td><code>xyyy</code></td><td>\((q_1, x, \epsilon ; q_1, x)\) &nbsp;— apila x</td></tr>
    <tr><td><code>xxx #</code></td><td><code>yyy</code></td><td>\((q_1, y, x ; q_2, \epsilon)\) &nbsp;— desapila x</td></tr>
    <tr><td><code>xx #</code></td><td><code>yy</code></td><td>\((q_2, y, x ; q_2, \epsilon)\) &nbsp;— desapila x</td></tr>
    <tr><td><code>x #</code></td><td><code>y</code></td><td>\((q_2, y, x ; q_2, \epsilon)\) &nbsp;— desapila x</td></tr>
    <tr><td><code>#</code></td><td>\(\epsilon\)</td><td>\((q_2, \epsilon, \# ; q_3, \epsilon)\) &nbsp;— vacía y acepta</td></tr>
    <tr style="background-color:rgba(76, 175, 80, 0.2); font-weight:bold;"><td>\(\epsilon\)</td><td>\(\epsilon\)</td><td><strong>ACEPTADA (Estado \(q_3\))</strong></td></tr>
  </tbody>
</table>

Note:
Para documentar y verificar la ejecución de un AP se usa una herramienta muy práctica: la traza de ejecución. La traza es una tabla que registra, en cada paso, tres cosas: el contenido de la pila, lo que falta por leer de la entrada, y la transición que se aplica. Es la herramienta que van a usar en los trabajos prácticos para verificar si una cadena es aceptada o rechazada.

---

## Ejemplo 2

<p style="font-size:0.85rem; margin-top:0px">Analicemos un lenguaje donde la cantidad de \(x\) iniciales debe ser igual a las \(x\) finales, con cualquier cantidad de \(y\) intermedias: lenguaje \(L = \{x^n y^m x^n \mid m, n \in \mathbb{N}\}\)</p>

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card">
      <h4 class="card-title"><i class="fas fa-project-diagram"></i> Estrategia de Diseño</h4>
      <ol style="font-size:0.75rem; line-height:1.5; margin-left:15px;">
        <li>Apilar las primeras \(x\).</li>
        <li>Leer las \(y\) intermedias sin alterar la pila.</li>
        <li>Desapilar las \(x\) finales para verificar coincidencia.</li>
      </ol>
    </div>
    <div class="flipped-callout recordar" style="margin-top:10px;">
      <h4><i class="fas fa-random"></i> El Punto de No Determinismo</h4>
      <p style="font-size:0.75rem;">
        ¿Cómo sabe el AP cuándo la cadena de entrada pasa de la primera tanda de \(x\) a la segunda si \(m=0\)? El autómata debe explorar las opciones no determinísticamente.
      </p>
    </div>
  </div>
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama de transiciones de AP con 5 estados para el lenguaje L = { x^n y^m x^n }. Se aprecian arcos para apilar x, leer y sin tocar pila, y desapilar x al final. Estilo vectorial esquemático con resaltado en los arcos no deterministas.
    -->
    <div class="video-player-wrapper" style="margin-top:10px;">
      <video src="videos/c07/ap_ejemplo2.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
</div>

Note:
El segundo ejemplo es un lenguaje un poco más interesante. Se trata de cadenas que empiezan con n letras x, siguen con cualquier cantidad de letras y —incluyendo cero— y terminan con exactamente n letras x. La idea central del diseño es: durante la primera parte de la cadena se apilan las x. En el medio se leen las y sin tocar la pila. Al llegar a la segunda parte de x, se desapilan para verificar que la cantidad sea la misma.

---

## Traza de muestra para <code>w = xxyxx</code>

<p style="font-size:0.85rem; margin-top:0px">Comprobemos la ejecución del segundo ejemplo sobre la cadena <code>xxyxx</code> (\(n=2, m=1\)):</p>
<div class="two-col-flex ratio-40-60">
  <div class="col">
    <table class="compare-table" style="width:100%;">
      <thead>
        <tr>
          <th>Pila</th>
          <th>Entrada restante</th>
          <th>Transición aplicada</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>\(\epsilon\)</td><td><code>xxyxx</code></td><td>\((1, \epsilon, \epsilon ; 2, \#)\)</td><td>Inicializa con #</td></tr>
        <tr><td><code>#</code></td><td><code>xxyxx</code></td><td>\((2, x, \epsilon ; 2, x)\)</td><td>Apila primera x</td></tr>
        <tr><td><code>x #</code></td><td><code>xyxx</code></td><td>\((2, x, \epsilon ; 2, x)\)</td><td>Apila segunda x</td></tr>
        <tr><td><code>xx #</code></td><td><code>yxx</code></td><td>\((2, y, \epsilon ; 3, \epsilon)\)</td><td>Lee 'y' e ingresa a fase central</td></tr>
        <tr><td><code>xx #</code></td><td><code>xx</code></td><td>\((3, x, x ; 4, \epsilon)\)</td><td>Lee 'x' final y desapila x</td></tr>
        <tr><td><code>x #</code></td><td><code>x</code></td><td>\((4, x, x ; 4, \epsilon)\)</td><td>Lee 'x' final y desapila x</td></tr>
        <tr><td><code>#</code></td><td>\(\epsilon\)</td><td>\((4, \epsilon, \# ; 5, \epsilon)\)</td><td>Pila vacía a estado final 5</td></tr>
        <tr style="background-color:rgba(76, 175, 80, 0.2); font-weight:bold;"><td colspan="4" style="text-align:center;">¡CADENA ACEPTADA EN ESTADO 5!</td></tr>
      </tbody>
    </table>
  </div>
  <div class="col">
    <div class="video-player-wrapper">
      <video src="videos/c07/ap_traza_ej2.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
La traza muestra cómo se apilan dos x en el estado 2, luego se consume la y pasando al estado 3 sin tocar la pila, y finalmente en el estado 4 se desapilan las dos x al leer la segunda parte de la cadena, terminando en la aceptación en el estado 5.



---


<!-- SLIDE: Resumen de la Clase -->
<!--<section data-menu-title="Resumen" data-transition="slide-in fade-out"> -->
## Resumen de la clase

  <div class="two-col-flex ratio-60-40">
    <div class="card">
      <h4 class="card-title" ><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos</h4>
      <ul>
        <li>El Autómata con Pila extiende al autómata finito dotándolo de una memoria infinita LIFO para procesar estructuras anidadas</li>
        <li>Acepta si y solo si: 1) Entrada totalmente leída, 2) Estado final alcanzado, y 3) Pila totalmente vacía</li>
        <li>Los Autómatas con Pila No Deterministas son estrictamente más potentes que los deterministas y son el foco principal en compiladores</li>
        <li>La traza de ejecución registra (Pila, Entrada restante, Transición) en cada paso de simulación</li>
        </ul>
    </div>          
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección</h4>
      <p style="margin-top:15px; text-align:center; color:var(--text-muted);">Veremos que los Autómatas con Pila reconocen exactamente la clase de los Lenguajes Libres del Contexto (GIC). Esta equivalencia es la piedra angular teórica de los analizadores sintácticos (parsers) en todos los compiladores reales.</p>
    </div>    
  </div>

  <div class="flipped-callout" style="text-align: center;">
    <p><strong>⚠️ Recordatorio:</strong> Asegúrate de completar el cuestionario de autoevaluación en la plataforma antes de asistir a la clase presencial.</p>
  </div>
<!-- </section> -->
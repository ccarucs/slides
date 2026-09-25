<!-- HOJA DE RUTA --->
<h2>En esta clase...</h2>

<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 15px !important;">
  <p>Llegamos al modelo computacional más potente y general que se conoce: la <strong>Máquina de Turing</strong>. Capaz no solo de reconocer lenguajes complejos que escapan a las pilas, sino también de definir matemáticamente qué es un <strong>algoritmo</strong> y qué funciones son <strong>computables</strong>.</p>
</div>
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta</span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px;">
      <li>Límites de los autómatas con pila</li>
      <li>Componentes de una máquina de Turing</li>      
      <li>Criterios de parada, aceptación y rechazo</li>
      <li>Descripciones Instantáneas</li>
      <li>La MT como Transductora</li>
      <li>Composición modular de MTs y la Tesis de Turing</li>
      <li>Computabilidad, Decidibilidad y el Problema de la Parada</li>
    </ul>       
  </div>  
  <div>
    <!-- PROMPT PARA GENERAR IMAGEN:
    Ilustración conceptual y futurista de una Máquina de Turing histórica y moderna a la vez: una cinta de memoria infinita con celdas binarias y de código, una cabeza de lectura/escritura metálica con resplandor láser, y un retrato artístico sutil de Alan Turing en marcas de agua o circuitos. Estilo tecnológico con azul oscuro, dorado y cian.
    -->
    <div class="video-player-wrapper" style="margin-top: 15px;">
      <video src="videos/c08/mt_intro.mp4" poster="img/turing_intro.jpeg" controls></video>
    </div>
  </div>  
</div>


Note:
Hasta aquí en el curso aprendimos que los lenguajes regulares son reconocidos por autómatas finitos y los independientes del contexto por autómatas con pila. Pero hay lenguajes como aⁿbⁿcⁿ o ww que no pueden ser reconocidos por un autómata con pila. Para superarlo, Alan Turing propuso en 1936 el modelo abstracto más general de la computación: la Máquina de Turing. En esta clase estudiaremos su funcionamiento como reconocedora, como transductora de funciones y los límites infranqueables de la computación.

---

## ¿Por qué necesitamos una Máquina de Turing?

<div class="two-col">
  <div class="col">
    <p style="font-size:0.85rem;">En la Jerarquía de Chomsky, cada autómata añade capacidad mediante su <strong>almacenamiento auxiliar</strong>:</p>
    <table class="compare-table" style="font-size:0.9rem; width:100%;">
      <thead>
        <tr>
          <th>Modelo</th>
          <th>Memoria Auxiliar</th>
          <th>Acceso</th>
          <th>Lenguaje Ejemplo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Autómata Finito (AF)</strong></td>
          <td>Ninguna (Solo estados)</td>
          <td>N/A</td>
          <td>\(a^* b^*\) (Regular)</td>
        </tr>
        <tr>
          <td><strong>Autómata con Pila (AP)</strong></td>
          <td>Pila LIFO</td>
          <td>Únicamente Cima</td>
          <td>\(a^n b^n\) (Libre del Contexto)</td>
        </tr>
        <tr style="background-color:rgba(76, 175, 80, 0.2); font-weight:bold;">
          <td><strong>Máquina de Turing (MT)</strong></td>
          <td>Cinta bidireccional ilimitada</td>
          <td>Lectura / Escritura libre</td>
          <td>\(a^n b^n c^n\), \(w w\) (Sensibles al Contexto)</td>
        </tr>
      </tbody>
    </table>
    
  </div>
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama de capas jerárquicas mostrando Autómatas Finitos < Autómatas con Pila < Máquinas de Turing. En el anillo externo de las MT se destacan las cadenas complejas a^n b^n c^n y w w con un destello brillante.
    -->
    <div class="video-player-wrapper" style="width:100%">
    <video src="videos/c08/chomsky_maquinas.mp4" poster="img/chomsky_maquinas.png" controls></video>
  </div>
  </div>
</div>
<div class="flipped-callout recordar" style="margin-top:10px;">
  <p style="font-size:0.7rem;"><i class="fas fa-lightbulb"></i> 
    Al reemplazar la pila restrictiva por una <strong>cinta ilimitada de lectura y escritura bidireccional</strong>, la MT adquiere la capacidad de procesar cualquier algoritmo calculable por una computadora moderna.
  </p>
</div>

Note:
La clave para entender la jerarquía está en el almacenamiento temporal. Un autómata finito no tiene memoria auxiliar; un autómata con pila usa una pila LIFO; pero lenguajes como aⁿbⁿcⁿ o ww (una cadena repetida) no se pueden contar con una sola pila. La solución de Alan Turing fue dotar a la máquina de una cinta infinita donde se puede leer, escribir y moverse en ambas direcciones.

---

## Alan Turing: El Padre de la Informática

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Ilustración gráfica de tributo a Alan Turing (1912-1954), rodeado de engranajes de la máquina Enigma, cintas de papel perforado y códigos matemáticos. Estilo académico elegante en tonos sobrios.
    -->
    <img src="img/alan_turing_header.jpg" alt="Alan Turing (1912 - 1954)" style="width:90%; border-radius:10px; display:block; margin:0 auto;">
  </div>
  <div class="col">
    <div class="card" style="padding:12px;">
      <h3 style="margin-top:0; font-size:1.1rem; color:var(--accent-color);">
        <i class="fas fa-user-astronaut"></i> Alan Mathison Turing (1912–1954)
      </h3>
      <ul style="font-size:0.8rem; line-height:1.6;">
        <li><strong>1936:</strong> Propuso la <em>Máquina de Turing</em>, formalizando matemáticamente los conceptos de <strong>algoritmo</strong> y <strong>computabilidad</strong>.</li>
        <li><strong>Segunda Guerra Mundial:</strong> Lideró el equipo en Bletchley Park que descifró la máquina <em>Enigma</em> utilizada por los nazis.</li>
        <li><strong>Inteligencia Artificial:</strong> Ideó el célebre <em>Test de Turing</em> para determinar si una máquina exhibe comportamiento inteligente.</li>
      </ul>
    </div>
    <div class="flipped-callout-bis" style="margin-top:10px;">
      <p style="font-size:0.8rem; margin:0;">
        <i class="fas fa-quote-left"></i> Su modelo de 1936 sigue siendo, hasta hoy, el marco teórico estándar para definir los límites de lo que las computadoras pueden o no calcular.
      </p>
    </div>
  </div>
</div>

Note:
Alan Turing fue uno de los fundadores de la ciencia de la computación. Además de formalizar el concepto de algoritmo, trabajó en descifrar los códigos nazis durante la Segunda Guerra Mundial y definió el Test de Turing. En 1936 propuso su modelo abstracto de computación, el cual resultó ser el modelo más general que se conoce para describir qué es computable.

---

## Máquina de Turing Estándar

<p style="font-size:0.85rem; margin-top:0px">La Máquina de Turing (MT) consta de <strong>tres componentes fundamentales</strong>:</p>

<div class="grid-3" style="margin-top:5px;">
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-tape"></i></span> 1. La Cinta</div>
    <p style="font-size:0.75rem;">Infinita hacia la derecha, dividida en celdas. Contiene la cadena de entrada delimitada por el símbolo <strong>blanco (\(\square\))</strong> en las celdas vacías.</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-eye"></i></span> 2. Cabeza Lectura/Escritura</div>
    <p style="font-size:0.75rem;">Lee el símbolo actual, escribe un nuevo símbolo en esa celda y se desplaza una celda a la <strong>Izquierda (L)</strong> o <strong>Derecha (R)</strong>.</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-cogs"></i></span> 3. Unidad de Control</div>
    <p style="font-size:0.75rem;">Mantiene el estado actual de la máquina y aplica la función de transición \(\delta\) para dictar cada movimiento.</p>
  </div>
</div>

<!-- PROMPT PARA GENERAR IMAGEN:
Esquema técnico animado de una Máquina de Turing: cinta horizontal dividida en casilleros con símbolos 'a, b, c, square', la cabeza de lectura-escritura señalando un casillero con una flecha vertical, y la unidad de control marcando el estado actual q0.
-->
<img src="img/maquina_turing.png" alt="Componentes de la Máquina de Turing (Cinta, Cabeza L/E, Unidad de Control)" style="height:35%; border-radius:8px; display:block; margin:15px auto 0 auto;">


Note:
Una Máquina de Turing tiene tres componentes principales: una cinta infinita hacia la derecha dividida en celdas con símbolos y blancos; una cabeza de lectura y escritura que lee, escribe y se mueve a la izquierda o derecha; y una unidad de control con estados.

---

## Definición Formal

<p style="font-size:0.9rem; text-align:center;">Una Máquina de Turing determinista se define como una <strong>séptupla</strong>:</p>

<div style="text-align: center; font-weight: bold; font-size: 1.2rem; color: var(--accent-color); margin: 15px 0;">
  \(M = (Q, \Sigma, \Gamma, \delta, q_0, \square, F)\)
</div>

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <table class="compare-table" style="font-size:1rem;">
      <tr><th>Componente</th><th>Descripción</th></tr>
      <tr><td>\(Q\)</td><td>Conjunto finito de <strong>estados</strong>.</td></tr>
      <tr><td>\(\Sigma\)</td><td><strong>Alfabeto de entrada</strong> (\(\square \notin \Sigma\)).</td></tr>
      <tr><td>\(\Gamma\)</td><td><strong>Alfabeto de la cinta</strong> (\(\Sigma \subset \Gamma\), incluye a \(\square\)).</td></tr>
      <tr><td>\(q_0 \in Q\)</td><td><strong>Estado inicial</strong>.</td></tr>
      <tr><td>\(\square \in \Gamma\)</td><td>Símbolo <strong>blanco</strong> (indica celda vacía/delimitador).</td></tr>
      <tr><td>\(F \subseteq Q\)</td><td>Conjunto de <strong>estados finales</strong> o de aceptación.</td></tr>
      <tr><td>\(\delta\)</td><td><strong>Función de transición</strong>: \(\delta : Q \times \Gamma \rightarrow Q \times \Gamma \times \{L, R\}\)</td></tr>
    </table>
  </div>
  <div class="col">
    <div class="card" style="padding:10px; text-align:center;">
      <h4 class="card-title" style="margin-top:0; "><i class="fas fa-exchange-alt"></i> Interpretación de \(\delta\)</h4>
      <div style="font-size:1.1rem; font-weight:bold; color:var(--accent-color); margin:8px 0;">
        \(\delta(q_1, a) = (q_2, b, R)\)
      </div>
      <p style="font-size:0.75rem;">
        Estando en estado \(q_1\) y leyendo \(a\): pasa al estado \(q_2\), escribe \(b\) en lugar de \(a\), y mueve la cabeza hacia la <strong>Derecha (R)</strong>.
      </p>
    </div>
    <div class="flipped-callout-bis" style="margin-top:10px;">
      <p style="font-size:0.75rem; margin:0;">
        En los diagramas se nota sobre los arcos como: &nbsp; <code>a, b, R</code> &nbsp; (Leído, Escrito, Movimiento).
      </p>
    </div>
  </div>
</div>

Note:
Formalmente, una MT se define con siete elementos: Q (estados), Sigma (alfabeto entrada), Gamma (alfabeto cinta con blanco), delta (función de transición), q0 (estado inicial), blanco, y F (estados finales). La función delta indica: nuevo estado, símbolo que se escribe y dirección de movimiento (Left o Right).

---

## ¿Qué hace la MT? 

<div style="text-align: center; font-weight: bold; font-size: 1.2rem; color: var(--accent-color); margin: 15px 0;">
  \(M = (Q, \Sigma, \Gamma, \delta, q_0, \square, F)\)
</div>
<div class="video-player-wrapper" style="width:80%">
  <video src="videos/c08/mt_definicion.mp4" poster="img/u0_02_play_video.png" controls></video>
</div>
<div class="flipped-callout-bis" style="margin-top:10px;">
  <p style="font-size:0.75rem; margin:0;">
    A diferencia de los autómatas que estudiamos en otras lecciones, la máquina de Turing tiene la capacidad de avanzar y retroceder leyendo símbolos y escribiendo (o no) la cinta.
  </p>
</div>

---

## Ejemplo de MT

<div class="video-player-wrapper" style="width:90%; margin:0 0.5rem">
  <video src="videos/c08/mt_ejemplo2.mp4" poster="img/u0_02_play_video.png" controls></video>
</div>
<div class="flipped-callout" style="margin-top:10px;">
  <p style="font-size:0.75rem; margin:0;">
    La MT del ejemplo acepta la cadena <code>aa</code>. Aceptaría la cadena <code>bb</code>?
  </p>
</div>

---


## Criterios de Parada, Aceptación y Rechazo

<div class="two-col">
  <div class="col">
    <div class="card" style="border-left:4px solid var(--accent-success); padding:10px;">
      <h4 class="card-title" style="color:var(--accent-success);"><i class="fas fa-check-circle"></i> Aceptación de la Cadena</h4>
      <p style="font-size:0.8rem;">
        La MT se detiene al alcanzar un estado perteneciente al conjunto de estados finales (\(q \in F\)).
      </p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="border-left:4px solid var(--accent-danger); padding:10px;">
      <h4 class="card-title" style="color:var(--accent-danger);"><i class="fas fa-times-circle"></i> Rechazo de la Cadena</h4>
      <p style="font-size:0.8rem;">
        Ocurre si la máquina se detiene en un estado no final (\(q \notin F\)) por falta de transición definida, <strong>o si entra en un bucle infinito</strong>.
      </p>
    </div>
  </div>
</div>

<div class="two-col">
  <div class="col">
    <div class="video-player-wrapper" style="width:95%">
    <video src="videos/c08/mt_parada.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
  <div class="col">
    <div class="flipped-callout recordar" style="margin-top:15px;">
    <h4><i class="fas fa-redo"></i> El Peligro del Bucle Infinito</h4>
    <p style="font-size:0.8rem;">
      A diferencia de los AF y AP, una Máquina de Turing puede entrar en un bucle donde jamás se detiene. Si una entrada causa un bucle infinito, la cadena queda <strong>rechazada implícitamente</strong>, pero el usuario/computador nunca recibe una notificación de parada.
    </p>
    </div>
  </div>
</div>


Note:
Una MT para cuando llega a una configuración para la cual delta no está definida (o al llegar a un estado final, desde donde no se definen salidas). Una MT acepta si para en un estado final. Rechaza si para en un estado no final o si entra en un bucle infinito.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Qué ocurre con la aceptación de una cadena si la Máquina de Turing entra en un bucle infinito durante su procesamiento?</span>
</div>
<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">La cadena es aceptada automáticamente por desbordamiento de memoria.</div>
  <div class="quiz-option" data-correct="true">La cadena es rechazada, aunque la máquina nunca se detendrá para informar el resultado.</div>
  <div class="quiz-option" data-correct="false">La máquina retrocede a q0 y borra la cinta.</div>
  <div class="quiz-option" data-correct="false">La función de transición conmuta a un estado de error predefinido.</div>
</div>
<div class="quiz-feedback"
     data-correct-explain="Si entra en un bucle infinito, la cadena no es aceptada (es rechazada por no detenerse jamás en un estado final)."
     data-incorrect-explain="Recuerda que para que una cadena sea aceptada, la MT debe detenerse explícitamente en un estado final q ∈ F. El bucle infinito es una forma de no-aceptación/rechazo."></div>

Note:
Comprobar la comprensión de la diferencia entre detenerse en estado de rechazo versus no detenerse (bucle infinito).

---

## Ejemplo

<h4> Reconocimiento del Lenguaje L = {aⁿ bⁿ | n ≥ 1} </h4>

<p style="font-size:0.85rem;">En lugar de usar una pila, la MT utiliza la <strong>cinta como memoria marcando símbolos</strong>:</p>

<div class="two-col-flex ratio-50-50">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title"><i class="fas fa-play"></i> Estrategia de Algoritmo de Cinta</h4>
      <ol style="font-size:0.75rem; line-height:1.4; margin-left:15px;">
        <li>Lee la primera <code>a</code> no marcada y la reemplaza por <code>x</code>.</li>
        <li>Avanza hacia la derecha ignorando <code>a</code> e <code>y</code> hasta encontrar la primera <code>b</code>.</li>
        <li>Reemplaza esa <code>b</code> por <code>y</code>.</li>
        <li>Retrocede a la izquierda hasta hallar la última <code>x</code> marcada.</li>
        <li>Repite el proceso. Al no haber más <code>a</code>, verifica que solo queden <code>y</code> y alcanza el estado final \(q_5\).</li>
      </ol>
    </div>
  </div>
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama de transiciones completo para la MT que reconoce a^n b^n con 5 estados q1 a q5. Arcos marcados con transiciones de marcado (a, x, R), (b, y, L), etc.
    -->
     <div class="video-player-wrapper" style="margin-top:10px;">
      <video src="videos/c08/mt_ejemplo3.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
</div>

Note:
La estrategia para reconocer aⁿbⁿ con una MT es usar la cinta para marcar símbolos. Se marca la primera 'a' como 'x', se busca la correspondiente 'b' a la derecha y se marca como 'y', y se retrocede para buscar la siguiente 'a'. Cuando ya no quedan 'a' sin marcar, se verifica que no queden 'b' sin marcar y se acepta.

---

## Descripciones Instantáneas

<p style="font-size:0.85rem;">Una <strong>Descripción Instantánea (DI)</strong> representa el estado completo de la computación en un instante de tiempo:</p>

<div class="card" style="text-align:center; padding:12px; margin:10px 0;">
  <div style="font-size:1.3rem; font-weight:bold; color:var(--accent-color);">
    \(x_1 x_2 \dots x_{k-1} \; q \; x_k x_{k+1} \dots x_n\)
  </div>
  <p style="font-size:0.8rem; margin-top:8px;">
    <strong>Lectura:</strong> La máquina está en el estado <strong>\(q\)</strong>, la cinta contiene la cadena \(x_1 \dots x_n\), y la cabeza L/E se encuentra apuntando sobre el símbolo <strong>\(x_k\)</strong> (el que sigue al estado).
  </p>
</div>

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <h4 style="font-size:0.85rem;"><i class="fas fa-step-forward"></i> Operadores de Paso</h4>
    <ul style="font-size:0.75rem; line-height:1.4;">
      <li>\(\vdash\): Representa un único paso de transición entre configuraciones.</li>
      <li>\(\vdash^*\): Representa cero, uno o múltiples pasos de transición de cómputo.</li>
    </ul>
    <div class="flipped-callout-bis" style="margin-top:8px;">
      <p style="font-size:0.75rem; margin:0;">
        Ejemplo para la cadena <code>aa</code> en la MT que reemplaza por <code>b</code>:<br>
        \(q_0 aa \vdash b q_0 a \vdash bb q_0 \square \vdash bb q_1 \square\) &nbsp; (o resumido: \(q_0 aa \vdash^* bb q_1 \square\))
      </p>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper">
      <video src="videos/c08/mt_instantaneas.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Para describir el estado completo de una MT en un momento dado se usa la descripción instantánea: se escribe el contenido de la cinta situando el estado q justo antes del símbolo sobre el que está posicionado el cabezal. Las transiciones entre pasos se indican con el símbolo de trinquete ⊢.

---

## Máquina de Turing como Transductora

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <p style="font-size:0.85rem;">Además de reconocer lenguajes ("sí/no"), la MT puede operar como un <strong>procesador/calculador</strong> que transforma una entrada en una salida:</p>
    <div class="card" style="padding:10px;">
      <p style="font-size:0.8rem;"><i class="fas fa-calculator"></i>       
        La cinta recibe la entrada inicial \(w\). Tras procesar y detenerse en estado final \(q_f\), el contenido que permanece en la cinta es el resultado <strong>\(f(w)\)</strong>.
      </p>
      <div style="text-align:center; font-weight:bold; font-size:1.1rem; color:var(--accent-color); margin-top:5px;">
        \(q_0 w \vdash^* q_f f(w) \quad (q_f \in F)\)
      </div>
    </div>    
  </div>
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama funcional de una Máquina de Turing Transductora: Entrada w -> [Máquina de Turing M] -> Salida f(w). Estilo de bloques lógico con íconos de entrada y salida digital.
    -->
    <div class="video-player-wrapper" style="margin-top:10px;">
      <video src="videos/c08/mt_tipos.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>
<div class="flipped-callout" style="margin-top:10px;">
      <h4><i class="fas fa-function"></i> Funciones Turing-Computables</h4>
      <p style="font-size:0.75rem;">
        Una función \(f\) con dominio \(D\) es <strong>Turing-computable</strong> si existe una MT que, para toda entrada \(w \in D\), termina escribiendo el valor correcto \(f(w)\).
      </p>
    </div>

Note:
En el modo transductor, lo que importa es qué quedó escrito en la cinta cuando la máquina para. Una función f es Turing-computable si existe una MT que, dada cualquier entrada w de su dominio, se detiene dejando f(w) en la cinta. Esto constituye la definición matemática estricta de lo que es un algoritmo.

---

## Otros ejemplos 

<p style="font-size:0.85rem;"><strong>Suma Unaria f(x, y) = x + y</strong>. En notación unaria, un número \(n\) se representa con \(n\) unos (ej. \(3 = 111\), \(2 = 11\)). La entrada es <code>111 0 11</code> (\(x=3, y=2\)):</p>

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-plus"></i> Estrategia de Suma por Desplazamiento</h4>
      <ol style="font-size:0.75rem; line-height:1.4; margin-left:15px;">
        <li>Avanza sobre los unos de \(x\) hasta hallar el cero separador <code>0</code>.</li>
        <li>Reemplaza el <code>0</code> por <code>1</code> (concatenando ambas cadenas de unos).</li>
        <li>Avanza hasta el extremo derecho hasta el blanco \(\square\).</li>
        <li>Retrocede una celda y convierte el último <code>1</code> en <code>0</code> (para corregir el 1 extra agregado al eliminar el separador).</li>
        <li>Resultado en cinta: <code>111110</code> (\(x+y=5\) con el delimitador <code>0</code> al final).</li>
      </ol>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px; font-size:0.9rem;">
      <h5 style="margin-top:0; color:var(--accent-success);">Traza de Descripciones Instantáneas</h5>
      <code>q0 111011 ⊢ 1q0 11011 ⊢ 11q0 1011</code><br>
      <code>⊢ 111q0 011 ⊢ 1111q1 11 ⊢ 11111q1 1</code><br>
      <code>⊢ 111111q1 □ ⊢ 11111q2 1 ⊢ 1111q3 10</code><br>
      <code>⊢ ... ⊢ q3 □ 111110 ⊢ q4 111110</code>
    </div>
    <div class="video-player-wrapper" style="margin-top:10px;">
      <video src="videos/c08/mt_ejemplos_transductores.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
</div>

Note:
Para sumar dos números en notación unaria x0y, la estrategia es reemplazar el 0 separador por un 1, concatenando los bloques de 1s, y luego transformar el 1 final en 0 para mantener la cantidad exacta x+y de unos.

---

## Composición Modular y la Tesis de Turing

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="border-left:4px solid var(--accent-color); padding:10px;">
      <h3 style="margin-top:0; font-size:1.1rem; color:var(--accent-color);">
        <i class="fas fa-university"></i> La Tesis de Turing (Church-Turing)
      </h3>
      <p style="font-size:1rem; font-style:italic; margin:5px 0;">
        "Cualquier computación que pueda llevarse a cabo por medios mecánicos puede ser realizada por una Máquina de Turing."
      </p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="border-left:4px solid var(--accent-color); padding:10px;">
      <h3 style="margin-top:0; font-size:1.1rem; color:var(--accent-color);"><i class="fas fa-exclamation-circle"></i> Naturaleza de la Tesis</h3>
      <p style="font-size:0.75rem;">
        <strong>No es un teorema demostrable</strong>, sino una conjetura/definición matemática ampliamente aceptada. Equivale a definir que un problema es <em>algorítmicamente resoluble</em> si y solo si existe una MT que lo resuelve.
      </p>
    </div>
  </div>
</div>
<div class="two-col-flex ratio-40-60" style="padding:15px;">
  <div class="col">
    <div class="card" style="padding:15px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-cubes"></i> Composición Modular de MTs</h4>
      <p style="font-size:0.75rem;">
        Podemos conectar Máquinas de Turing sencillas como <strong>subrutinas</strong> para resolver algoritmos complejos.
      </p>
      <!-- PROMPT PARA GENERAR IMAGEN:
      Diagrama de bloques modular mostrando tres MTs conectadas secuencialmente como subrutinas (Comparador -> Sumador -> Borrador), representando la programación modular en Máquinas de Turing.
      -->
    </div>
  </div>
  <div class="col">  
    <div class="video-player-wrapper" style="margin-top:10px;">
      <video src="videos/c08/mt_tesis.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
La Tesis de Turing establece que todo lo que entendemos como "algoritmo" o "computación mecánica" puede ser realizado por una MT. Aunque no es un teorema matemáticamente demostrable, todos los modelos de computación propuestos (como el Cálculo Lambda de Church) resultan ser equivalentes a la MT.

---

## Computabilidad, Decidibilidad y el Problema de la Parada

<div class="two-col">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-balance-scale-left"></i> Decidibilidad</h4>
      <p style="font-size:0.75rem;">
        Un problema es <strong>Decidible</strong> si existe una MT que para cualquier entrada responde "Sí" o "No" y <strong>siempre se detiene</strong>. Si no existe tal MT, es <strong>Indecidible</strong>.
      </p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px; border-left:4px solid var(--accent-danger);">
      <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-danger);"><i class="fas fa-ban"></i> El Problema de la Parada (Halting Problem)</h4>
      <p style="font-size:0.75rem;">
        Demostrado por Turing (1936): <strong>No existe ninguna MT universal que pueda determinar si una MT arbitraria \(M\) se detendrá o entrará en bucle infinito sobre una entrada \(w\).</strong>
      </p>
    </div>
  </div>
</div>

<div class="flipped-callout recordar" style="margin-top:12px;">
  <h4><i class="fas fa-bug"></i> Consecuencia Directa en Compiladores</h4>
  <p style="font-size:0.8rem;">
    Debido a la indecidibilidad del Problema de la Parada, <strong>es matemáticamente imposible construir un compilador perfecto</strong> que detecte de forma general si cualquier programa arbitrario de entrada contiene un bucle infinito.
  </p>
</div>


Note:
El Problema de la Parada busca una MT capaz de predecir si cualquier otra MT se detendrá con su entrada. Alan Turing demostró por contradicción que esa máquina universal no existe. Para los compiladores, esto significa que no existe un algoritmo general que pueda detectar si un programa colgará en un bucle infinito.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Qué implicancia tiene el Problema de la Parada en el desarrollo de compiladores reales?</span>
</div>
<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Hace imposible la optimización de código en lenguajes como C y C++.</div>
  <div class="quiz-option" data-correct="false">Impide que los compiladores traduzcan el código fuente a código máquina.</div>
  <div class="quiz-option" data-correct="false">Obliga a que todos los lenguajes de programación utilicen únicamente autómatas finitos.</div>
  <div class="quiz-option" data-correct="true">Demuestra que es imposible construir un compilador que analice cualquier programa y garantice si entrará en un bucle infinito.</div>
</div>
<div class="quiz-feedback"
     data-correct-explain="El Problema de la Parada establece un límite matemático infranqueable: ningún algoritmo/compilador puede decidir con 100% de certeza si un programa arbitrario se colgará."
     data-incorrect-explain="Recuerda que la indecidibilidad del Problema de la Parada no impide compilar o optimizar, pero demuestra que la detección general de bucles infinitos en código arbitrario es matemáticamente imposible."></div>

Note:
Evaluar el entendimiento de las implicaciones prácticas de la indecidibilidad en las herramientas de desarrollo e IDEs.


---

## Ejercicios Propuestos

<div class="card">
  <h4 class="card-title"><i class="fas fa-pencil-alt"></i> Resolver:</h4>
  <table class="compare-table" style="font-size:1.1rem;">
    <thead>
      <tr>
        <th>Ejercicio</th>
        <th>Consigna</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1</strong></td>
        <td>Diseñar una Máquina de Turing que reconozca el lenguaje \(L = \{x^n y^{n+2} \mid n > 0\}\).</td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td>Diseñar una MT transductora que calcule la función \(f(x) = 2 \cdot x\), donde \(x\) está expresado en notación unaria.</td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td>Escribir la secuencia de Descripciones Instantáneas (\(\vdash\)) para la suma de \(111\) y \(11\) (notación unaria) usando la MT definida en esta presentación.</td>
      </tr>
    </tbody>
  </table>
</div>


Note:
Resuelvan los ejercicios 1, 2 y 3 para trabajar sobre las trazas y diagramas durante nuestra clase práctica. Con esto concluimos el bloque de teoría formal de autómatas y nos preparamos para la construcción del parser sintáctico.

---


<!-- SLIDE: Resumen de la Clase -->
<!--<section data-menu-title="Resumen" data-transition="slide-in fade-out"> -->
  <h2 class="text-gradient">Resumen de la Clase</h2> 
  <div class="grid">
    <div class="card">
      <h4 class="card-title" ><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos</h4>
      <ul>
        <li>Una MT es un autómata con cinta infinita, L/E bidireccional y séptupla \(M=(Q,\Sigma,\Gamma,\delta,q_0,\square,F)\)</li>
        <li>Reconoce cadenas (aceptación en \(F\)) y computa funciones produciendo resultados en la cinta (\(q_0 w \vdash^* q_f f(w)\)).</li>
        <li>La Tesis de Turing establece que todo algoritmo computable por medios mecánicos equivale a la ejecución de una MT.</li>
        <li>El Problema de la Parada demuestra la existencia de problemas que ninguna computadora/compilador podrá resolver jamás.</li>
        </ul>
    </div>   
    </br>       
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección</h4>
      <p style="margin-top:15px; text-align:left; color:var(--text-muted);">Estudiaremos un tipo de <strong>Análisis sintáctico.</strong> </p>
    </div>    
  </div>
  <div class="flipped-callout" style="text-align: center;">
    <p><strong>⚠️ Recordatorio:</strong> Asegúrate de completar el cuestionario de autoevaluación en la plataforma antes de asistir a la clase presencial.</p>
  </div>
<!-- </section> -->

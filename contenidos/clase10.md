<!-- HOJA DE RUTA --->
<h2>¿Qué aprendemos en esta clase?</h2>

<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 10px !important;">
  <h4><i class="fas fa-table"></i> Análisis Sintáctico Descendente NO Recursivo</h4>
  <p>Con la gramática ya limpia y transformada, en esta clase construimos el <strong>Parser Predictivo LL(1)</strong></p>
</div>
<div class="two-col-flex ratio-40-60">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta</span>    
      <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; ">
        <li>Arquitectura del Parser Predictivo LL(1)</li>
        <li>Cálculo del conjunto PRIMERO</li>
        <li>Cálculo del conjunto SIGUIENTE</li>
        <li>Construcción algorítmica de la Tabla de Análisis \(M[A, a]\)</li>
        <li>Traza de ejecución</li>
        <li>Propiedades de las gramáticas LL(1)</li>
      </ul>       
  </div>  
  <div>
    <!-- PROMPT PARA GENERAR IMAGEN:
    Ilustración conceptual y tecnológica de una gramática siendo procesada y optimizada: a la izquierda producciones gramaticales complejas pasan por un filtro o prisma brillante cian y se transforman a la derecha en una matriz o tabla de análisis sintáctico (LL1 Table) limpia y estructurada con destellos de luz.
    -->
    <div class="video-player-wrapper" style="margin-top: 10px; width:100%">
      <video src="videos/c10/ll1_intro.mp4"  poster="img/fases_AS.png" controls></video>
    </div>
  </div>  
</div>

Note:
Bienvenidos a la clase 10. En las lecciones anteriores aprendimos a transformar gramáticas: limpiarlas, eliminar la recursividad a la izquierda y factorizar. Hoy damos el paso final: cómo calcular formalmente los conjuntos PRIMERO y SIGUIENTE, y cómo construir la Tabla de Análisis LL(1) para operar un parser determinista, lineal y sin retroceso utilizando una pila explícita.

---

## Análisis sintáctico descendente no recursivo

<div class="video-player-wrapper" style="margin-top: 10px;">
  <video src="videos/c10/ll1_noformal.mp4"  poster="img/asd_norecursivo.jpeg" controls></video>
</div>

---
## ¿Cómo funciona el analizador?

<div class="video-player-wrapper" style="margin-top: -5px; width:65%">
    <video src="videos/c10/ll1_funcionamiento.mp4"  poster="img/u0_02_play_video.png" controls></video>
</div>
<div class="two-col-equal"  style="margin-top: 15px">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-microchip"></i> Los 4 Componentes del Analizador</h4>
      <ul style="font-size:0.75rem; line-height:1.6; margin-left:10px;">
        <li><strong><i class="fas fa-scroll"></i> Cinta de entrada:</strong> Secuencia de tokens del programa fuente, delimitada por <code>$</code> al final.</li>
        <li><strong><i class="fas fa-layer-group"></i> Pila explícita:</strong> Almacena los símbolos pendientes de procesar. Siempre inicia con <code>$ S</code> (el símbolo inicial sobre <code>$</code>).</li>
      </ul>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"></h4>
      <ul style="font-size:0.75rem; line-height:1.6; margin-left:10px;">
            <li><strong><i class="fas fa-table"></i> Tabla de análisis M[A, a]:</strong> Matriz bidimensional indexada por No Terminales y terminales. Cada celda indica qué producción aplicar.</li>
            <li><strong><i class="fas fa-cogs"></i> Programa de control:</strong> Algoritmo, en cada paso compara la <em>cima de la pila</em> con el <em>token actual</em> y decide la acción (expandir, hacer match o reportar error).</li>
      </ul>
    </div>
  </div>
</div>
<!-- <div class="flipped-callout-bis" style="margin-top:8px; padding:8px;">
    <p style="font-size:0.75rem; margin:0;">
      <i class="fas fa-infinity"></i> <strong>Sin retroceso:</strong> Al tener una única acción posible por par (símbolo, token), el análisis avanza siempre hacia adelante en tiempo <strong>\(\mathcal{O}(n)\)</strong>.
    </p>
  </div>
</div>-->

---

## Parser Predictivo LL(1)

<p style="font-size:0.85rem; text-align:center; margin-top:0px; ">Un analizador sintáctico LL(1) reemplaza las llamadas recursivas por una <strong>pila explícita</strong> y una <strong>tabla de análisis sintáctico \(M\)</strong>:</p>

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:10px; text-align:center;">
      <h3 style="margin:0; font-size:1.1rem; color:var(--accent-color);">
        <i class="fas fa-cubes"></i> Significado de LL(1)
      </h3>
      <ul style="font-size:0.75rem; text-align:left; line-height:1.6; margin-top:8px;">
        <li><strong>L (Left-to-right):</strong> Procesa la entrada de izquierda a derecha.</li>
        <li><strong>L (Leftmost derivation):</strong> Construye una derivación por la izquierda.</li>
        <li><strong>1:</strong> Utiliza exactamente <strong>1 token</strong> de preanálisis (lookahead).</li>
      </ul>
    </div>
    <div class="flipped-callout-bis" style="margin-top:10px; padding:8px;">
      <p style="font-size:0.75rem; margin:0;">
        <i class="fas fa-bolt"></i> <strong>Determinismo:</strong> Para cualquier par (No Terminal en cima, Token actual), la tabla indica una <strong>única producción</strong> a aplicar. 
      </p>
    </div>
  </div>

  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama de bloques del Parser LL(1) determinista: muestra la 'Pila Explícita' (conteniendo símbolos con $ al fondo), la 'Cinta de Entrada' (con el token actual $), el 'Programa de Control' central y la 'Tabla de Análisis M[A, a]' bidimensional. Estilo infografía tecnológica.
    -->
    <div class="video-player-wrapper" style="margin-top: 10px;">
      <video src="videos/c10/ll1_definicion.mp4"  poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
</div>

Note:
El parser predictivo LL(1) utiliza una arquitectura con cuatro componentes: la cinta de entrada delimitada por $, una pila de almacenamiento con el símbolo de fin $ en el fondo, una matriz bidimensional llamada Tabla de Análisis M[A, a], y un programa de control que compara la cima de la pila con el token actual.

---

### Ejemplos de funcionamiento del Parser LL(1)

<p style="font-size:0.85rem; text-align:center;">Antes de construir la Tabla de Análisis LL(1) de manera algorítmica, observemos el parser en acción sobre dos cadenas concretas. Presta atención a cómo la pila y la tabla determinan cada decisión <strong>sin ambigüedad</strong>.</p>

<div class="two-col-equal">
  <div class="col">
    <p style="font-size:0.75rem; text-align:center; margin-bottom:4px; color:var(--accent-color);"><i class="fas fa-play-circle"></i> <strong>Ejemplo 1:</strong> Cadena simple (<code>id + id</code>)</p>
    <div class="video-player-wrapper" style="margin-top: 4px; width:100%">
      <video src="videos/c10/ll1_ejemplo1.mp4"  poster="img/ejemplo.jpeg" controls></video>
    </div>
  </div>
  <div class="col">
    <p style="font-size:0.75rem; text-align:center; margin-bottom:4px; color:var(--accent-color);"><i class="fas fa-play-circle"></i> <strong>Ejemplo 2:</strong> Cadena (<code>id * id + id</code>)</p>
    <div class="video-player-wrapper" style="margin-top: 4px; width:100%">
      <video src="videos/c10/ll1_ejemplo2.mp4"  poster="img/ejemplo.jpeg" controls></video>
    </div>
  </div>
</div>

Note:
En el Ejemplo 1 se muestra el procesamiento paso a paso de la cadena id + id, donde se puede ver cómo la pila inicial $ E se expande con las reglas correctas hasta llegar al símbolo ACEPTAR. En el Ejemplo 2 se introduce la precedencia de la multiplicación, mostrando que el parser resuelve correctamente el orden de las operaciones sin necesidad de retroceso.

---

## Conjunto PRIMERO 

<p style="font-size:0.85rem; text-align:center;">
  \(\text{PRIMERO}(\alpha)\) es el conjunto de terminales que pueden aparecer como primer símbolo de alguna cadena derivada de \(\alpha\). Si \(\alpha \Rightarrow^* \epsilon\), entonces \(\epsilon \in \text{PRIMERO}(\alpha)\).
</p>

<div class="two-col-equal">
  <div class="col">
    <div class="card" style="padding:10px; width:95%">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-calculator"></i> Reglas de Cálculo de PRIMERO</h4>
      <ol style="font-size:0.75rem; line-height:1.5; margin-left:15px;">
        <li>Si \(X\) es un terminal o \(\epsilon\), \(\text{PRIMERO}(X) = \{X\}\).</li>
        <li>Si \(X \rightarrow X_1 X_2 \dots X_k\) es una producción:
          <ul style="margin-left:10px;">
            <li>Añadir \(\text{PRIMERO}(X_1) \setminus \{\epsilon\}\) a \(\text{PRIMERO}(X)\).</li>
            <li>Si \(\epsilon \in \text{PRIMERO}(X_1)\), añadir \(\text{PRIMERO}(X_2) \setminus \{\epsilon\}\), y así sucesivamente.</li>
            <li>Si todo \(X_i\) contiene \(\epsilon\), añadir \(\epsilon\) a \(\text{PRIMERO}(X)\).</li>
          </ul>
        </li>
      </ol>
    </div>
  </div>

  <div class="col">
    <div class="card" style="padding:10px; width:95%">
      <h4 class="card-title" style="font-size:1rem; color:var(--accent-color);"><i class="fas fa-square-root-alt"></i> Ejemplo Resuelto</h4>
      <div style="font-size:1rem; line-height:1.5;">
        \(E \rightarrow T E'\)<br>
        \(E' \rightarrow + T E' \mid \epsilon\)<br>
        \(T \rightarrow F T'\)<br>
        \(T' \rightarrow * F T' \mid \epsilon\)<br>
        \(F \rightarrow ( E ) \mid \mathbf{id}\)<br>
        <hr style="margin:5px 0;">
        <strong>Resultados:</strong><br>
        \(\text{PRIMERO}(F) = \text{PRIMERO}(T) = \text{PRIMERO}(E) = \{ \mathbf{(}, \mathbf{id} \}\)<br>
        \(\text{PRIMERO}(E') = \{ \mathbf{+}, \epsilon \}\)<br>
        \(\text{PRIMERO}(T') = \{ \mathbf{*}, \epsilon \}\)
      </div>
    </div>
  </div>
</div>

Note:
Para construir la tabla de análisis sintáctico necesitamos calcular dos conjuntos fundamentales. El primero es PRIMERO de alpha, que contiene todos los terminales con los que puede comenzar cualquier cadena derivada de alpha. Si alpha puede derivar la cadena vacía, epsilon forma parte de su conjunto PRIMERO.

---

## Ejemplos Cálculo de Primero

<div class="col">
  <div class="video-player-wrapper" style="margin-top: -5px; width:70%">
    <video src="videos/c10/alg_primero.mp4"  poster="img/miraestevideo.png" controls></video>
  </div>
</div>
  <div class="col">
  <div class="video-player-wrapper" style="margin-top: 10px; width:70%">
    <video src="videos/c10/alg_primero_ejemplo.mp4"  poster="img/ejemplo.jpeg" controls></video>
  </div>
</div>


---

## Conjunto SIGUIENTE 

<p style="font-size:0.85rem; text-align:center;">
  \(\text{SIGUIENTE}(A)\) es el conjunto de terminales (incluyendo el delimitador de fin de entrada \(\$\)) que pueden aparecer inmediatamente a la derecha de \(A\) en alguna derivación.
</p>

<div class="two-col-equal">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-step-forward"></i> Reglas de Cálculo de SIGUIENTE</h4>
      <ol style="font-size:0.75rem; line-height:1.5; margin-left:15px;">
        <li>Añadir \(\$\) a \(\text{SIGUIENTE}(S)\), donde \(S\) es el símbolo inicial.</li>
        <li>Si existe una producción \(B \rightarrow \alpha A \gamma\):
          <br>Añadir \(\text{PRIMERO}(\gamma) \setminus \{\epsilon\}\) a \(\text{SIGUIENTE}(A)\).
        </li>
        <li>Si existe una producción \(B \rightarrow \alpha A\) o \(B \rightarrow \alpha A \gamma\) donde \(\epsilon \in \text{PRIMERO}(\gamma)\):
          <br>Añadir \(\text{SIGUIENTE}(B)\) a \(\text{SIGUIENTE}(A)\).
        </li>
      </ol>
    </div>
  </div>

  <div class="col">
    <div class="flipped-callout recordar" style="padding:10px;">
      <h4><i class="fas fa-exclamation-triangle"></i> ¡Regla de Oro!</h4>
      <p style="font-size:0.75rem;">
        El símbolo \(\epsilon\) <strong>NUNCA pertenece a SIGUIENTE</strong>. SIGUIENTE solo contiene símbolos terminales reales y el delimitador de fin de entrada \(\$\).
      </p>
    </div>
    <div class="card" style="padding:10px; margin-top:8px;">
      <h5 style="margin:0; font-size:1rem; color:var(--accent-color);">Valores para Expresiones Aritméticas</h5>
      <p style="font-size:0.7rem; margin-top:4px; line-height:1.4;">
        \(\text{SIGUIENTE}(E) = \text{SIGUIENTE}(E') = \{ \mathbf{)}, \mathbf{\$} \}\)<br>
        \(\text{SIGUIENTE}(T) = \text{SIGUIENTE}(T') = \{ \mathbf{+}, \mathbf{)}, \mathbf{\$} \}\)<br>
        \(\text{SIGUIENTE}(F) = \{ \mathbf{+}, \mathbf{*}, \mathbf{)}, \mathbf{\$} \}\)
      </p>
    </div>
  </div>
</div>

Note:
El conjunto SIGUIENTE de un No Terminal A guarda los terminales que pueden aparecer inmediatamente después de A durante una derivación. Es crucial para saber qué hacer cuando un No Terminal deriva en la cadena vacía epsilon: si el token de preanálisis pertenece al conjunto SIGUIENTE(A), elegimos la producción que deriva en epsilon.


---

## Ejemplos cálculos de Siguiente

<div class="col">
  <div class="video-player-wrapper" style="margin-top: -5px; width:70%">
    <video src="videos/c10/alg_siguiente.mp4"  poster="img/miraestevideo.png" controls></video>
  </div>
</div>
<div class="col">
  <div class="video-player-wrapper" style="margin-top: 10px; width:70%">
    <video src="videos/c10/alg_siguiente_ejemplo.mp4"  poster="img/ejemplo.jpeg" controls></video>
  </div>
</div>


---

## Construcción de la Tabla \(M[A, a]\)

<p style="font-size:0.85rem; text-align:center;">Para cada producción \(A \rightarrow \alpha\) de la gramática, aplicamos las siguientes dos reglas de llenado:</p>

<div class="card" style="padding:10px; margin-bottom:10px;">
  <ol style="font-size:0.8rem; line-height:1.5; margin-left:20px;">
    <li>Para cada terminal \(a \in \text{PRIMERO}(\alpha)\) (con \(a \neq \epsilon\)), añadir \(A \rightarrow \alpha\) a la celda \(M[A, a]\).</li>
    <li>Si \(\epsilon \in \text{PRIMERO}(\alpha)\), para cada símbolo \(b \in \text{SIGUIENTE}(A)\) (incluyendo \(\$\)), añadir \(A \rightarrow \alpha\) a la celda \(M[A, b]\).</li>
    <li>Todas las entradas vacías de la matriz representan situaciones de <strong>error sintáctico</strong>.</li>
  </ol>
</div>

<div class="card" style="padding:8px;">
  <h4 class="card-title" style="font-size:1rem; text-align:center;"><i class="fas fa-table"></i> Tabla LL(1) para Expresiones Aritméticas</h4>
  <table class="compare-table" style="font-size:1rem; width:100%; text-align:center;">
    <thead>
      <tr>
        <th>No Terminal</th>
        <th>id</th>
        <th>+</th>
        <th>*</th>
        <th>(</th>
        <th>)</th>
        <th>$</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>\(E\)</strong></td>
        <td>\(E \rightarrow T E'\)</td>
        <td>—</td>
        <td>—</td>
        <td>\(E \rightarrow T E'\)</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td><strong>\(E'\)</strong></td>
        <td>—</td>
        <td>\(E' \rightarrow + T E'\)</td>
        <td>—</td>
        <td>—</td>
        <td>\(E' \rightarrow \epsilon\)</td>
        <td>\(E' \rightarrow \epsilon\)</td>
      </tr>
      <tr>
        <td><strong>\(T\)</strong></td>
        <td>\(T \rightarrow F T'\)</td>
        <td>—</td>
        <td>—</td>
        <td>\(T \rightarrow F T'\)</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td><strong>\(T'\)</strong></td>
        <td>—</td>
        <td>\(T' \rightarrow \epsilon\)</td>
        <td>\(T' \rightarrow * F T'\)</td>
        <td>—</td>
        <td>\(T' \rightarrow \epsilon\)</td>
        <td>\(T' \rightarrow \epsilon\)</td>
      </tr>
      <tr>
        <td><strong>\(F\)</strong></td>
        <td>\(F \rightarrow \mathbf{id}\)</td>
        <td>—</td>
        <td>—</td>
        <td>\(F \rightarrow ( E )\)</td>
        <td>—</td>
        <td>—</td>
      </tr>
    </tbody>
  </table>
</div>


Note:
Una vez calculados PRIMERO y SIGUIENTE, poblar la tabla M es un proceso mecánico. Si la regla A -> alpha tiene un terminal a en su PRIMERO(alpha), colocamos esa regla en M[A, a]. Si la regla puede derivar en epsilon, colocamos A -> alpha en todas las celdas M[A, b] donde b pertenezca a SIGUIENTE(A).

---

## Algoritmo y Traza Paso a Paso

<p style="font-size:0.85rem; margin-top:0;">Dada la cima de la pila \(X\) y el token actual \(a\):</p>

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-play-circle"></i> Reglas de Transición</h4>
      <ul style="font-size:0.7rem; line-height:1.4;">
        <li><strong>Si \(X = a = \$\):</strong> ÉXITO. Análisis completado.</li>
        <li><strong>Si \(X = a \neq \$\):</strong> <code>match()</code>: Desapilar \(X\) y avanzar entrada.</li>
        <li><strong>Si \(X\) es No Terminal:</strong> Consultar \(M[X, a]\).
          <br>- Si \(M[X, a] = X \rightarrow U V W\): Desapilar \(X\) y apilar \(W, V, U\) (quedando \(U\) en la cima).
          <br>- Si \(M[X, a]\) es vacía: <strong>ERROR SINTÁCTICO</strong>.
        </li>
      </ul>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-list-alt"></i> Traza para la entrada: <code>id + id $</code></h4>
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead>
          <tr><th>Pila (Cima a la der.)</th><th>Entrada Restante</th><th>Acción Aplicada</th></tr>
        </thead>
        <tbody>
          <tr><td><code>$ E</code></td><td><code>id + id $</code></td><td>\(M[E, \mathbf{id}] = E \rightarrow T E'\)</td></tr>
          <tr><td><code>$ E' T</code></td><td><code>id + id $</code></td><td>\(M[T, \mathbf{id}] = T \rightarrow F T'\)</td></tr>
          <tr><td><code>$ E' T' F</code></td><td><code>id + id $</code></td><td>\(M[F, \mathbf{id}] = F \rightarrow \mathbf{id}\)</td></tr>
          <tr><td><code>$ E' T' id</code></td><td><code>id + id $</code></td><td><code>match(id)</code></td></tr>
          <tr><td><code>$ E' T'</code></td><td><code>+ id $</code></td><td>\(M[T', \mathbf{+}] = T' \rightarrow \epsilon\)</td></tr>
          <tr><td><code>$ E'</code></td><td><code>+ id $</code></td><td>\(M[E', \mathbf{+}] = E' \rightarrow + T E'\)</td></tr>
          <tr><td><code>$ E' T +</code></td><td><code>+ id $</code></td><td><code>match(+)</code></td></tr>
          <tr><td><code>$ E' T</code></td><td><code>id $</code></td><td>\(M[T, \mathbf{id}] = T \rightarrow F T'\)</td></tr>
          <tr><td><code>$ E' T' F</code></td><td><code>id $</code></td><td>\(M[F, \mathbf{id}] = F \rightarrow \mathbf{id}\)</td></tr>
          <tr><td><code>$ E' T' id</code></td><td><code>id $</code></td><td><code>match(id)</code></td></tr>
          <tr><td><code>$ E' T'</code></td><td><code>$</code></td><td>\(M[T', \mathbf{\$}] = T' \rightarrow \epsilon\)</td></tr>
          <tr><td><code>$ E'</code></td><td><code>$</code></td><td>\(M[E', \mathbf{\$}] = E' \rightarrow \epsilon\)</td></tr>
          <tr><td><code>$</code></td><td><code>$</code></td><td><strong>ACEPTAR ✓</strong></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

Note:
En esta traza podemos apreciar el comportamiento determinista del parser LL(1). Inicialmente la pila contiene el símbolo inicial E sobre el delimitador $. En cada paso, el parser consulta la tabla M según la cima de la pila y el token actual, aplicando producciones o haciendo match de terminales. En solo 13 pasos procesa id + id sin vacilar ni retroceder.

---

## Gramáticas LL(1) 

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="flipped-callout-bis" style="padding:10px;">
      <h4 style="margin:0; font-size:0.95rem; color:var(--accent-color);"><i class="fas fa-check-circle"></i> Definición de Gramática LL(1)</h4>
      <p style="font-size:0.75rem; margin-top:4px;">
        Una gramática es <strong>LL(1)</strong> si y solo si su Tabla de Análisis Sintáctico \(M\) <strong>no contiene entradas múltiples (sin conflictos)</strong>.
      </p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-shield-alt"></i> Propiedades Inviolables</h4>
      <ul style="font-size:0.75rem; line-height:1.5;">
        <li>Si una gramática es <strong>ambigua</strong>, NUNCA puede ser LL(1).</li>
        <li>Si una gramática posee <strong>recursividad por la izquierda</strong>, NUNCA puede ser LL(1).</li>
        <li>Si \(A \rightarrow \alpha \mid \beta\), se requiere que \(\text{PRIMERO}(\alpha) \cap \text{PRIMERO}(\beta) = \emptyset\).</li>
      </ul>
    </div>    
  </div>
</div>
<div class="video-player-wrapper" style="margin-top:8px; width:75%">
  <video src="videos/c10/ll1_gramatica.mp4" poster="img/miraestevideo.png" controls></video>
</div>

Note:
Una gramática es formalmente LL(1) si su tabla M no presenta celdas múltiples o en conflicto. Si al calcular la tabla M encontramos que una celda recibe dos o más producciones distintas (como ocurre con el problema del dangling else en M[L, else]), la gramática no es LL(1). Toda gramática ambigua o con recursividad a la izquierda queda automáticamente descartada de ser LL(1).

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Cuándo se afirma formalmente que una gramática libre de contexto es de clase <span class="math-lang">LL(1)</span>?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Cuando todas sus reglas de producción son recursivas por la izquierda.</div>
  <div class="quiz-option" data-correct="false">Cuando la gramática es ambigua y requiere retroceso infinito para resolver derivaciones.</div>
  <div class="quiz-option" data-correct="true">Cuando su Tabla de Análisis Sintáctico M se construye sin ninguna celda con múltiples producciones (sin conflictos).</div>
  <div class="quiz-option" data-correct="false">Cuando el conjunto SIGUIENTE de todos sus símbolos no terminales contiene la cadena vacía epsilon.</div>
</div>

<div class="quiz-feedback"
     data-correct-explain="Una gramática es LL(1) si y solo si su tabla de análisis sintáctico M no posee celdas con múltiples alternativas. Esto garantiza un análisis 100% determinista, en tiempo lineal y sin necesidad de retroceso."
     data-incorrect-explain="Recuerda que la propiedad definitoria de una gramática LL(1) es que la matriz M no presenta entradas múltiples o en conflicto, lo que asegura que cada paso de derivación sea único y determinista."></div>

Note:
Esta pregunta de evaluación comprueba si el estudiante comprende el criterio fundamental que define a la clase de gramáticas LL(1) y su relación con la ausencia de conflictos en la tabla M.

---

## Ejercicios Propuestos

<div class="card">
  <h4 class="card-title"><i class="fas fa-pencil-alt"></i> Ejercicios Prácticos de Tablas LL(1)</h4>
  <table class="compare-table" style="font-size:1rem;">
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
          Calcule los conjuntos \(\text{PRIMERO}\) y \(\text{SIGUIENTE}\) para la gramática corregida de expresiones:<br>
          \(E \rightarrow T E'\)&nbsp;<br>
          \(E' \rightarrow + T E' \mid \epsilon\) &nbsp;<br>
          \(T \rightarrow F T'\), &nbsp; <br>
          \(T' \rightarrow * F T' \mid \epsilon\), &nbsp;<br>
          \(F \rightarrow ( E ) \mid \mathbf{id}\).
        </td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td>
          Construya la Tabla de Análisis Sintáctico \(M[A, a]\) resultante del ejercicio 1 y desarrolle la traza completa de la pila para procesar la cadena de entrada <code>id * id + id $</code>.
        </td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td>
          Dada la gramática <br>
          \(S \rightarrow A B \mid a B\) <br>
          \(A \rightarrow c A \mid b \mid a\) <br>
          \(B \rightarrow c B \mid a \mid b\) <br>
          determine si es LL(1) construyendo su tabla M e identificando posibles conflictos.
        </td>
      </tr>
    </tbody>
  </table>
</div>

Note:
Estos ejercicios serán resueltos y discutidos en el taller práctico. Les permitirán ejercitar el cálculo completo del pipeline: cálculo de conjuntos PRIMERO y SIGUIENTE, construcción de la tabla y simulación del parser predictivo con pila.

---

<!-- SLIDE: Resumen de la Clase -->
<h2 class="text-gradient">Resumen de la Clase</h2> 

<div class="grid">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos hoy</h4>
    <ul style="font-size:0.8rem; line-height:1.5;">
      <li>El <strong>Parser Predictivo LL(1)</strong> procesa la entrada de izquierda a derecha con 1 token de preanálisis, sin retroceso.</li>
      <li>El conjunto <strong>PRIMERO</strong> reúne los terminales iniciales derivables de cada cadena.</li>
      <li><strong>SIGUIENTE</strong> guarda los terminales que pueden aparecer inmediatamente después de un No Terminal.</li>
      <li>La <strong>Tabla \(M[A,a]\)</strong> se construye aplicando las reglas de PRIMERO y SIGUIENTE a cada producción.</li>
      <li>Una gramática es <strong>LL(1)</strong> si su tabla \(M\) no posee entradas múltiples (sin conflictos).</li>
    </ul>
  </div>   
      
  <div class="card" style="margin-top:10px">
    <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección</h4>
    <p style="margin-top:12px; text-align:center; color:var(--text-muted); font-size:0.85rem;">
      Daremos el salto al <strong>Análisis Sintáctico Ascendente LR(k)</strong>, la familia de algoritmos más potente utilizada por herramientas automáticas como <strong>YACC y Bison</strong>.
    </p>
  </div>    
</div>

<div class="flipped-callout" style="text-align: center; margin-top:10px;">
  <p style="font-size:0.8rem; margin:0;"><strong>⚠️ Recordatorio:</strong> Completar el cuestionario de autoevaluación correspondiente a esta clase en la plataforma virtual antes de la próxima clase presencial.</p>
</div>

Note:
Hemos finalizado la Clase 10 completando todo el recorrido del análisis sintáctico descendente predictivo. Ahora dominan las herramientas para calcular los conjuntos PRIMERO y SIGUIENTE, construir la tabla LL(1) y simular el parser con pila. En la próxima clase nos introduciremos en la familia de los parsers ascendentes LR. ¡Nos vemos!

<!-- HOJA DE RUTA --->
<h2>¿Qué aprendemos en esta clase?</h2>

<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 10px !important;">
  <h4><i class="fas fa-layer-group"></i> Análisis Sintáctico Ascendente (LR)</h4>
  <p>Superamos las limitaciones del análisis descendente construyendo el árbol de sintaxis <strong>desde las hojas hacia la raíz</strong> mediante la técnica <strong>Shift-Reduce</strong>.</p>
</div>

<div class="two-col-flex ratio-40-60">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta</span>    
      <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; ">
        <li>Concepto del análisis ascendente y operación de Reducción</li>
        <li>Arquitectura del analizador LR </li>
        <li>Las 4 Acciones Posibles: Desplazar, Reducir, Aceptar y Error</li>
        <li>Comparación LL(1) vs. LR en la misma cadena</li>
        <li>Familia de analizadores LR</li>
      </ul>       
  </div>  
  <div>
    <div class="video-player-wrapper" style="margin-top: 10px; width:100%">
      <video src="videos/c11/lr_intro.mp4" poster="img/fases_AS.png" controls></video>
    </div>
  </div>  
</div>

Note:
Bienvenidos a la clase 11. En lecciones anteriores estudiamos los analizadores sintácticos descendentes (descenso recursivo y LL(1)). En esta clase exploraremos una técnica más potente: el Análisis Sintáctico Ascendente (LR). Veremos cómo procesar gramáticas sin necesidad de eliminar la recursividad por la izquierda ni factorizar previamente, construyendo el árbol de abajo hacia arriba.

---

## La Idea Central: Reducir hacia la Raíz

<p style="font-size:0.85rem; text-align:center;">
  A diferencia del análisis descendente, el análisis ascendente parte de los símbolos terminales de la cadena de entrada e intenta <strong>reducirlos paulatinamente</strong> hasta alcanzar el símbolo inicial de la gramática.
</p>
<div class="video-player-wrapper" style="margin-top: 10px; width:70%">
  <video src="videos/c11/lr_arbol.mp4" poster="img/miraestevideo.png" controls></video>
</div>

Note:
En el análisis ascendente partimos de las hojas del árbol (los terminales). A medida que encontramos combinaciones que coinciden con el lado derecho de alguna producción, las reemplazamos por su no terminal correspondiente. Este proceso repetido nos lleva hasta la raíz E.

---

## Árbol de análisis sintáctico ascendente

<div class="two-col-equal">
  <div class="col">
    <div class="card" style="padding:12px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-compress-alt"></i> ¿Qué es una Reducción?</h4>
      <p style="font-size:0.75rem; line-height:1.5;">
        Consiste en identificar una subcadena de símbolos en la cima de la pila que coincida exactamente con la <strong>parte derecha (\(\beta\))</strong> de una regla de producción \(A \rightarrow \beta\), y reemplazarla por el <strong>no terminal (\(A\))</strong> de la parte izquierda.
      </p>
    </div>
    <div class="card" style="padding:12px;">
      <div class="flipped-callout-bis" style="margin-top:10px; padding:8px;">
        <p style="font-size:0.75rem; margin:0;">
          <i class="fas fa-undo"></i> Una reducción es exactamente la <strong>operación inversa a derivar</strong>.
        </p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px; text-align:center;">
      <h4 class="card-title" style="font-size:0.85rem; justify-content:center;"><i class="fas fa-tree"></i> Construcción Bottom-Up</h4>
      <div style="font-size:1rem; font-family:monospace; background:rgba(0,0,0,0.2); padding:8px; border-radius:6px; text-align:left;">
        Gramática:<br>
        \(E \rightarrow E + E \mid E * E \mid \mathbf{id} \mid \mathbf{num}\)<br><br>
        Entrada: <code>id + id + id</code><br>
        1. <code>id</code> \(\rightarrow E\)<br>
        2. <code>id</code> \(\rightarrow E\)<br>
        3. <code>E + E</code> \(\rightarrow E\)<br>
        4. <code>id</code> \(\rightarrow E\)<br>
        5. <code>E + E</code> \(\rightarrow E\) (Raíz)
      </div>
    </div>
  </div>
</div>

---

## Estructura del Analizador Ascendente (LR)

<p style="font-size:0.85rem; text-align:center; margin-top:0px">El motor del analizador LR opera combinando una <strong>pila explícita</strong>, una <strong>cinta de entrada</strong> con delimitador <code>$</code> y una <strong>tabla de análisis sintáctico \(M\)</strong> dividida en dos bloques:</p>

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-cogs"></i> Componentes Principales</h4>
      <ul style="font-size:0.6rem; line-height:1.5;">
        <li><strong>Entrada:</strong> Cadena finalizada con el delimitador <code>$</code>.</li>
        <li><strong>Pila:</strong> Almacena intercaladamente símbolos gramaticales y <strong>estados del autómata (\(s_0, s_1, \dots\))</strong>.</li>
        <li><strong>Tabla ACCIÓN:</strong> Determina la siguiente acción a tomar según el estado actual en la cima y el token de entrada.</li>
        <li><strong>Tabla IR_A (GOTO):</strong> Indica a qué nuevo estado transicionar tras realizar una reducción a un No Terminal.</li>
      </ul>
    </div>    
  </div>

  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 5px;">
      <video src="videos/c11/lr_componentes.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>
    <div class="flipped-callout" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.7rem; margin:0;">
        <i class="fas fa-plus-circle"></i> <strong>Gramática Aumentada:</strong> Se añade la regla \(S' \rightarrow S\) para identificar inequívocamente el momento exacto de la aceptación final.
      </p>
    </div>

Note:
La arquitectura de un analizador LR incluye la cinta de entrada, la pila de símbolos y estados alternados, y una tabla M dividida en dos secciones: ACCION (consultada con terminales) e IR_A (consultada con no terminales tras una reducción).

---

## Las 4 Acciones Posibles (Shift-Reduce)

<p style="font-size:0.85rem; text-align:center;">En cada iteración, el analizador consulta la celda \(\text{ACCIÓN}[s, a]\) donde \(s\) es el estado en el tope de la pila y \(a\) es el token actual:</p>

<div class="grid-2">
  <div class="card" style="padding:12px;">
    <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-color);">
      <i class="fas fa-sign-in-alt"></i> 1. Desplazar (Shift - \(d_i\))
    </h4>
    <p style="font-size:0.75rem; line-height:1.4;">
      Toma el token actual \(a\) de la entrada, lo apila junto con el nuevo estado \(s'\) indicado en la tabla (\(d_{s'}\)) y avanza el puntero de la entrada.
    </p>
  </div>

  <div class="card" style="padding:12px;">
    <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-secondary);">
      <i class="fas fa-compress-arrows-alt"></i> 2. Reducir (Reduce - \(r_j\))
    </h4>
    <p style="font-size:0.75rem; line-height:1.4;">
      Si la cima de la pila coincide con la parte derecha de la regla \(j: A \rightarrow \beta\), desapila los \(2 \cdot |\beta|\) elementos (símbolos y estados), y apila el No Terminal \(A\) seguido del estado indicado por \(\text{IR\_A}[s_{\text{tope}}, A]\).
    </p>
  </div>

  <div class="card" style="padding:12px;">
    <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-success);">
      <i class="fas fa-check-circle"></i> 3. Aceptar (Accept - \(acep\))
    </h4>
    <p style="font-size:0.75rem; line-height:1.4;">
      El análisis concluye con éxito. Se reconoce formalmente que la cadena de entrada pertenece al lenguaje generado por la gramática.
    </p>
  </div>

  <div class="card" style="padding:12px;">
    <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-danger);">
      <i class="fas fa-times-circle"></i> 4. Error (Celda vacía)
    </h4>
    <p style="font-size:0.75rem; line-height:1.4;">
      La combinación de estado actual y token de entrada no posee ninguna transición válida. Se detiene la ejecución o se ejecuta una rutina de recuperación.
    </p>
  </div>
</div>

Note:
Por el uso predominante de las acciones de desplazamiento (shift) y reducción (reduce), a este tipo de reconocedores sintácticos también se los conoce formalmente como "Shift-Reduce Parsers".

---

## Analizador: Descendente vs. Ascendente 

<p style="font-size:0.85rem; text-align:center;">Comparación entre los dos tipos de analizadores</p>

<div class="video-player-wrapper" style="margin-top:8px; width:80%">
  <video src="videos/c11/ll_vs_lr.mp4" poster="img/miraestevideo.png" controls></video>
</div>

Note:
Al comparar ambas trazas se observa cómo el parser LL(1) anticipa producciones desde la raíz expandiendo la pila, mientras que el parser ascendente acumula terminales en la pila y realiza reducciones progresivas al emparejar lados derechos.


---

## Ejemplo: LL(1) vs. LR

<p style="font-size:0.85rem; text-align:center;">Analizando la misma entrada <code>(a)a</code> sobre la gramática aumentada: \(S' \rightarrow S\), \(S \rightarrow (S)S \mid a\)</p>

<div class="two-col-equal">
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.80rem; text-align:center;"><i class="fas fa-arrow-down"></i> Análisis Descendente LL(1)</h4>
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead><tr><th>Pila</th><th>Entrada</th><th>Acción</th></tr></thead>
        <tbody>
          <tr><td><code>$ S'</code></td><td><code>(a)a$</code></td><td>\(S' \rightarrow S\)</td></tr>
          <tr><td><code>$ S</code></td><td><code>(a)a$</code></td><td>\(S \rightarrow (S)S\)</td></tr>
          <tr><td><code>$ S ) S (</code></td><td><code>(a)a$</code></td><td>sacar <code>(</code></td></tr>
          <tr><td><code>$ S ) S</code></td><td><code>a)a$</code></td><td>\(S \rightarrow a\)</td></tr>
          <tr><td><code>$ S ) a</code></td><td><code>a)a$</code></td><td>sacar <code>a</code></td></tr>
          <tr><td><code>$ S )</code></td><td><code>)a$</code></td><td>sacar <code>)</code></td></tr>
          <tr><td><code>$ S</code></td><td><code>a$</code></td><td>\(S \rightarrow a\)</td></tr>
          <tr><td><code>$ a</code></td><td><code>a$</code></td><td>sacar <code>a</code></td></tr>
          <tr><td><code>$</code></td><td><code>$</code></td><td>ACEPTAR</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.80rem; text-align:center;"><i class="fas fa-arrow-up"></i> Análisis Ascendente LR</h4>
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead><tr><th>Pila</th><th>Entrada</th><th>Acción</th></tr></thead>
        <tbody>
          <tr><td><code>$</code></td><td><code>(a)a$</code></td><td>desplazar</td></tr>
          <tr><td><code>$ (</code></td><td><code>a)a$</code></td><td>desplazar</td></tr>
          <tr><td><code>$ ( a</code></td><td><code>)a$</code></td><td>reducir \(S \rightarrow a\)</td></tr>
          <tr><td><code>$ ( S</code></td><td><code>)a$</code></td><td>desplazar</td></tr>
          <tr><td><code>$ ( S )</code></td><td><code>a$</code></td><td>desplazar</td></tr>
          <tr><td><code>$ ( S ) a</code></td><td><code>$</code></td><td>reducir \(S \rightarrow a\)</td></tr>
          <tr><td><code>$ ( S ) S</code></td><td><code>$</code></td><td>reducir \(S \rightarrow (S)S\)</td></tr>
          <tr><td><code>$ S</code></td><td><code>$</code></td><td>reducir \(S' \rightarrow S\)</td></tr>
          <tr><td><code>$ S'</code></td><td><code>$</code></td><td>ACEPTAR</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="flipped-callout-bis" style="margin-top:8px; padding:6px;">
  <p style="font-size:0.75rem; margin:0; text-align:center;">
    <i class="fas fa-key"></i> <strong>Propiedad Clave:</strong> Si leemos las reducciones del analizador ascendente en orden inverso, obtenemos exactamente una <strong>derivación por la derecha (Rightmost derivation)</strong>.
  </p>
</div>

Note:
Al comparar ambas trazas se observa cómo el parser LL(1) anticipa producciones desde la raíz expandiendo la pila, mientras que el parser ascendente acumula terminales en la pila y realiza reducciones progresivas al emparejar lados derechos.

---

## La Familia de Analizadores LR

<p style="font-size:0.85rem; text-align:center;">Todos los miembros de la familia LR comparten el mismo algoritmo de ejecución; la diferencia fundamental radica en la **potencia y forma en que se construye la tabla sintáctica**.</p>

<!--<div class="two-col-flex ratio-60-40">-->
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-sitemap"></i> Jerarquía de Parsers LR</h4>
      <ul style="font-size:0.75rem; line-height:1.6;">
        <li><strong>LR(0):</strong> Sin símbolos de preanálisis (lookahead). Muy limitado.</li>
        <li><strong>SLR(1) (Simple LR):</strong> Emplea el conjunto \(\text{SIGUIENTE}\) para resolver conflictos. Fácil de construir pero con alcance moderado.</li>
        <li><strong>LALR(1) (Lookahead LR):</strong> Combina estados equivalentes de LR(1). Ofrece un excelente equilibrio entre potencia y tamaño de tabla.</li>
        <li><strong>LR(1):</strong> El método más general y potente, pero genera tablas enormemente grandes.</li>
      </ul>
    </div>
  </div>
  <div class="col">
    <div class="flipped-callout" style="padding:10px;">
      <h4 style="font-size:0.85rem; margin:0;"><i class="fas fa-tools"></i> Herramientas Automáticas</h4>
      <p style="font-size:0.75rem; margin-top:5px;">
        Herramientas como <strong>YACC</strong>, <strong>Bison</strong> o <strong>PLY (Python)</strong> construyen automáticamente tablas de clase <strong>LALR(1)</strong> a partir de la especificación de la gramática.
      </p>
    </div>    
  <!--  <div class="video-player-wrapper" style="margin-top:8px;">
      <video src="videos/c11/lr_vs_ll.mp4" poster="img/miraestevideo.png" controls></video>
    </div>-->
  </div>
<!--</div>-->

Note:
Existen variantes LR(0), SLR(1), LALR(1) y LR(1). La sigla LALR(1) es la más popular en la práctica ya que generadores automáticos como YACC o PLY la utilizan por su eficiencia en memoria y amplia expresividad.

---

## Algoritmo Formal del Analizador LR

<!-- <div class="two-col-flex ratio-60-40">-->
  <div style="margin-top:0px">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.80rem;"><i class="fas fa-code"></i> Pseudo-código de Ejecución</h4>
      <pre style="font-size:0.60rem; line-height:1.3; background:transparent; margin:0;"><code>apuntar ae al primer símbolo de w$
repetir
  sea s el estado en la cima de la pila
  sea a el símbolo apuntado por ae

  si ACCION[s, a] == "desplazar s'" entonces
    apilar a y luego s' en la pila
    avanzar ae al siguiente símbolo
  sino si ACCION[s, a] == "reducir A -> β" entonces
    desapilar 2 * |β| elementos de la pila
    sea s' el estado que queda en la cima
    apilar A y luego IR_A[s', A] en la pila
    emitir la producción A -> β
  sino si ACCION[s, a] == "aceptar" entonces
    fin con éxito
  sino
    error()
fin_repetir</code></pre>
    </div>
  </div>
  <div class="col" style="margin-top:10px">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-warning);"><i class="fas fa-exclamation-circle"></i> Detalle Crucial del Desapilado</h4>
      <p style="font-size:0.75rem; line-height:1.4;">
        Dado que la pila almacena pares <code>(símbolo, estado)</code>, al aplicar una reducción para una regla con lado derecho \(β\), se deben retirar exactamente <strong>\(2 ⋅ |β|\) elementos</strong> de la pila.
      </p>
      <p style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
        <em>Ejemplo:</em> Para \(T → T * F\), donde \(|β| = 3\), se desapilan \(2 × 3 = 6\) elementos en total.
      </p>
    </div>
  </div>
<!--</div> -->
Note:
Es fundamental recordar la regla del desapilado: como por cada símbolo apilado va acompañado su estado correspondiente, al reducir una regla A -> beta se extraen exactamente el doble de elementos de la longitud de beta.

---

## Gramática de Expresiones y Tabla LR

<p style="font-size:0.80rem; text-align:center; margin-top:0;">Dada la gramática de expresiones numerada y su correspondiente tabla de análisis LR:</p>

<div class="two-col-flex ratio-30-70">
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.75rem;"><i class="fas fa-list-ol"></i> Producciones</h4>
      <ol style="font-size:0.65rem; line-height:1.4; margin-left:15px; padding:0;">
        <li>\(E \rightarrow E + T\)</li>
        <li>\(E \rightarrow T\)</li>
        <li>\(T \rightarrow T * F\)</li>
        <li>\(T \rightarrow F\)</li>
        <li>\(F \rightarrow (E)\)</li>
        <li>\(F \rightarrow \mathbf{id}\)</li>
      </ol>
      <hr style="margin:5px 0; border-color:var(--border-color);">
      <p style="font-size:0.60rem; color:var(--text-muted); margin:0;">
        <strong>Nomenclatura:</strong><br>
        • \(d_i\): Desplazar al estado \(i\)<br>
        • \(r_j\): Reducir por regla \(j\)<br>
        • \(acep\): Aceptar
      </p>
    </div>
  </div>

  <div class="col">
    <div class="card" style="padding:6px; overflow-x:auto;">
      <table class="compare-table" style="font-size:1rem; width:100%; text-align:center;">
        <thead>
          <tr>
            <th rowspan="2">Estado</th><th colspan="6">ACCIÓN</th><th colspan="3">IR_A</th>
          </tr>
          <tr>
            <th>id</th><th>+</th><th>*</th><th>(</th><th>)</th><th>$</th><th>E</th><th>T</th><th>F</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>0</strong></td><td>d5</td><td></td><td></td><td>d4</td><td></td><td></td><td>1</td><td>2</td><td>3</td></tr>
          <tr><td><strong>1</strong></td><td></td><td>d6</td><td></td><td></td><td></td><td>acep</td><td></td><td></td><td></td></tr>
          <tr><td><strong>2</strong></td><td></td><td>r2</td><td>d7</td><td></td><td>r2</td><td>r2</td><td></td><td></td><td></td></tr>
          <tr><td><strong>3</strong></td><td></td><td>r4</td><td>r4</td><td></td><td>r4</td><td>r4</td><td></td><td></td><td></td></tr>
          <tr><td><strong>4</strong></td><td>d5</td><td></td><td></td><td>d4</td><td></td><td></td><td>8</td><td>2</td><td>3</td></tr>
          <tr><td><strong>5</strong></td><td></td><td>r6</td><td>r6</td><td></td><td>r6</td><td>r6</td><td></td><td></td><td></td></tr>
          <tr><td><strong>6</strong></td><td>d5</td><td></td><td></td><td>d4</td><td></td><td></td><td></td><td>9</td><td>3</td></tr>
          <tr><td><strong>7</strong></td><td>d5</td><td></td><td></td><td>d4</td><td></td><td></td><td></td><td></td><td>10</td></tr>
          <tr><td><strong>8</strong></td><td></td><td>d6</td><td></td><td></td><td>d11</td><td></td><td></td><td></td><td></td></tr>
          <tr><td><strong>9</strong></td><td></td><td>r1</td><td>d7</td><td></td><td>r1</td><td>r1</td><td></td><td></td><td></td></tr>
          <tr><td><strong>10</strong></td><td></td><td>r3</td><td>r3</td><td></td><td>r3</td><td>r3</td><td></td><td></td><td></td></tr>
          <tr><td><strong>11</strong></td><td></td><td>r5</td><td>r5</td><td></td><td>r5</td><td>r5</td><td></td><td></td><td></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

Note:
Observen la estructura de la tabla. Para los estados 0 a 11, las columnas de terminales representan la función ACCION con desplazamientos (d) o reducciones (r), mientras que las columnas de No Terminales (E, T, F) contienen las transiciones IR_A.

---

### Ejemplo: <code>id * id + id $</code>

  <div class="col" style="margin-top: 0px;">
    <div class="video-player-wrapper" style="margin-top: 5px; width:80%">
      <video src="videos/c11/ejemplo_traza.mp4" poster="img/ejemplo.jpeg" controls></video>
    </div>    
    <div class="flipped-callout" style="margin-top:8px; padding:6px;">
      <p style="font-size:0.70rem; margin:0;">
        <i class="fas fa-lightbulb"></i> <strong>Punto Crítico:</strong><br> En el paso con <code>0 T 2 * 7 F 10</code> y entrada <code>+</code>, se desapilan 6 elementos (\(T, *, F\) y sus 3 estados) dejando el estado <code>0</code> expuesto; luego \(\text{IR\_A}[0, T] = 2\), quedando la pila en <code>0 T 2</code>.
      </p>
    </div>
  </div>

  <p> En la página siguiente está la tabla completa</p>


Note:
En esta traza podemos apreciar el dinamismo del parser LR. Analicen atentamente la reducción r3 en el paso 7: la regla T -> T * F tiene 3 símbolos, por lo cual se desapilan 6 elementos de la pila, quedando el estado 0 al descubierto para consultar IR_A[0, T] = 2.

---

### Traza: <code>id * id + id $</code>
<div class="card" style="padding:6px; overflow-x:auto;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-stream"></i> Ejecución de la Pila</h4>
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead><tr><th>Pila</th><th>Entrada Restante</th><th>Acción Aplicada</th></tr></thead>
        <tbody>
          <tr><td><code>0</code></td><td><code>id * id + id $</code></td><td>desplazar d5</td></tr>
          <tr><td><code>0 id 5</code></td><td><code>* id + id $</code></td><td>reducir \(r_6: F \rightarrow \mathbf{id}\)</td></tr>
          <tr><td><code>0 F 3</code></td><td><code>* id + id $</code></td><td>reducir \(r_4: T \rightarrow F\)</td></tr>
          <tr><td><code>0 T 2</code></td><td><code>* id + id $</code></td><td>desplazar d7</td></tr>
          <tr><td><code>0 T 2 * 7</code></td><td><code>id + id $</code></td><td>desplazar d5</td></tr>
          <tr><td><code>0 T 2 * 7 id 5</code></td><td><code>+ id $</code></td><td>reducir \(r_6: F \rightarrow \mathbf{id}\)</td></tr>
          <tr><td><code>0 T 2 * 7 F 10</code></td><td><code>+ id $</code></td><td>reducir \(r_3: T \rightarrow T * F\)</td></tr>
          <tr><td><code>0 T 2</code></td><td><code>+ id $</code></td><td>reducir \(r_2: E \rightarrow T\)</td></tr>
          <tr><td><code>0 E 1</code></td><td><code>+ id $</code></td><td>desplazar d6</td></tr>
          <tr><td><code>0 E 1 + 6</code></td><td><code>id $</code></td><td>desplazar d5</td></tr>
          <tr><td><code>0 E 1 + 6 id 5</code></td><td><code>$</code></td><td>reducir \(r_6: F \rightarrow \mathbf{id}\)</td></tr>
          <tr><td><code>0 E 1 + 6 F 3</code></td><td><code>$</code></td><td>reducir \(r_4: T \rightarrow F\)</td></tr>
          <tr><td><code>0 E 1 + 6 T 9</code></td><td><code>$</code></td><td>reducir \(r_1: E \rightarrow E + T\)</td></tr>
          <tr><td><code>0 E 1</code></td><td><code>$</code></td><td><strong>ACEPTAR ✓</strong></td></tr>
        </tbody>
      </table>
</div>


Note:
En esta traza podemos apreciar el dinamismo del parser LR. Analicen atentamente la reducción r3 en el paso 7: la regla T -> T * F tiene 3 símbolos, por lo cual se desapilan 6 elementos de la pila, quedando el estado 0 al descubierto para consultar IR_A[0, T] = 2.


---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> Al aplicar una reducción con la regla <span class="math-lang">\(A \rightarrow \alpha \beta \gamma\)</span> en un analizador LR, ¿cuántos elementos se desapilan de la pila?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Exactamente 3 elementos, uno por cada símbolo del lado derecho.</div>
  <div class="quiz-option" data-correct="true">Exactamente 6 elementos, pues se retiran alternadamente los símbolos gramaticales y sus estados asociados.</div>
  <div class="quiz-option" data-correct="false">Solamente 1 elemento, correspondiente al No Terminal A resultante.</div>
  <div class="quiz-option" data-correct="false">Depende de si el token actual de entrada es un terminal o el delimitador de fin $.</div>
</div>

<div class="quiz-feedback"
     data-correct-explain="Como la pila de un analizador LR intercala un estado del autómata por cada símbolo gramatical, al reducir una regla de longitud |LHS| = k se extraen exactamente 2 * k elementos."
     data-incorrect-explain="Recuerda que en la pila LR cada símbolo apilado va acompañado de su estado correspondiente. Por lo tanto, para una producción con k símbolos en el lado derecho se deben retirar 2 * k elementos."></div>

Note:
Esta evaluación rápida ayuda a fijar el concepto clave de la manipulación de la pila durante una acción de reducción.

---

## Ejercicios Propuestos

<div class="card">
  <h4 class="card-title"><i class="fas fa-pencil-alt"></i> Ejercicios Prácticos de Análisis LR</h4>
  <table class="compare-table" style="font-size:1.2rem;">
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
          Dada la gramática numerada de expresiones de la clase, desarrolle la traza completa de la pila y la entrada para la cadena <code>( id + id ) * id $</code> indicando cada acción consultada en la tabla LR.
        </td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td>
          Explicite la secuencia de derivación por la derecha en orden inverso obtenida a partir de las reducciones realizadas en la traza del Ejercicio 1.
        </td>
      </tr>
   <!--   <tr>
        <td><strong>3</strong></td>
        <td>
          Dada una celda en conflicto <em>Shift/Reduce</em> en una tabla sintáctica, explique conceptualmente qué ambigüedad o problema de gramática representa y cómo lo resuelve una herramienta como YACC estableciendo precedencias.
        </td>
      </tr>-->
    </tbody>
  </table>
</div>

Note:
Estos ejercicios serán abordados en la sesión de taller práctico para afianzar el seguimiento manual de la traza de un parser LR y comprender la relación con las herramientas de generación automática.

---

<!-- SLIDE: Resumen de la Clase -->
<h2 class="text-gradient">Resumen de la Clase</h2> 

<div class="grid">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos hoy</h4>
    <ul style="font-size:0.8rem; line-height:1.5;">
      <li>El <strong>Análisis Sintáctico Ascendente (LR)</strong> construye el árbol desde las hojas hacia la raíz reduciendo subcadenas al símbolo inicial.</li>
      <li>Opera mediante el esquema <strong>Shift-Reduce</strong> (Desplazar, Reducir, Aceptar y Error).</li>
      <li>La pila intercala <strong>símbolos y estados</strong> del autómata, lo que permite decidir la acción con contexto profundo.</li>
      <li>Las reducciones del parser LR reconstruyen una <strong>derivación por la derecha en orden inverso</strong>.</li>
      <li>La variante <strong>LALR(1)</strong> es el estándar en la industria utilizado por generadores como <strong>YACC, Bison y PLY</strong>.</li>
    </ul>
  </div>   
      
  <div class="card" style="margin-top:10px">
    <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección</h4>
    <p style="margin-top:12px; text-align:center; color:var(--text-muted); font-size:0.85rem;">
      Pondremos en práctica estos conceptos construyendo analizadores reales con <strong>YACC y PLY (Python Lex-Yacc)</strong>, escribiendo las reglas sintácticas y acciones semánticas.
    </p>
  </div>    
</div>

<div class="flipped-callout" style="text-align: center; margin-top:10px;">
  <p style="font-size:0.8rem; margin:0;"><strong>⚠️ Recordatorio:</strong> Resolver el cuestionario de autoevaluación sobre reconocedores LR en la plataforma virtual antes del próximo encuentro.</p>
</div>

Note:
Hemos completado la introducción al Análisis Sintáctico Ascendente LR. En la próxima clase veremos cómo traducir estas reglas y tablas a código ejecutable usando generadores automáticos como YACC y PLY. ¡Nos vemos!

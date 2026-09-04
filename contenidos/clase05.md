<!--  HOJA DE RUTA --->
<h2>¿Qué vamos a aprender en esta clase?</h2>
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta de la clase </span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; font-weight: bold;">
      <li>Concepto y elementos de una gramática formal</li>
      <li>Derivación y lenguaje generado \(L(G)\)</li>
      <li>Gramáticas lineales por derecha e izquierda</li>
      <li>Gramáticas regulares y lenguajes regulares</li>
      <li>Equivalencias entre Gramática Regular y Autómata Finito </li>
      <li>La Jerarquía de Chomsky</li>
    </ul>       
  </div>  
  <div>
    <div><img src="img/flecha_GR.png" style="align:center"></img></div>
  </div>  
</div>
<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 15px !important;">
  <h4><i class="fas fa-lightbulb"></i> Recuerda:</h4>
  <p>Modalidad de clase invertida: Revisa esta clase teórica interactiva antes de nuestro encuentro presencial en la Facultad.</p>
</div>

Note:
En los videos anteriores describimos los lenguajes regulares de dos maneras: usando autómatas finitos como mecanismos reconocedores, y usando expresiones regulares como mecanismos descriptivos. Hoy vamos a conocer una tercera forma fundamental: las gramáticas, que funcionan como mecanismos generadores. Estas tres herramientas describen exactamente la misma clase de lenguajes. Al terminar esta clase entenderemos por qué y veremos cómo se interconectan sistemáticamente.

---

## ¿Qué es una gramática?

<div class="two-col">
  <div>
    <p style="color: var(--text-color) !important;">
      Todos aprendimos gramática en la escuela: sabemos que una oración tiene sujeto y predicado, que el predicado tiene un verbo, y que las palabras se combinan según <strong>reglas precisas</strong>.
    </p>
    <div class="flipped-callout">
      <h4><i class="fas fa-language"></i> Definición intuitiva</h4>
      <p>Una <strong>gramática</strong> es un conjunto finito de reglas que describen cómo se combinan los símbolos de un lenguaje para formar oraciones o cadenas válidas.</p>
    </div>
    <p style="font-size: 0.85rem; color: var(--text-muted);">Esta misma idea aplica directamente a los lenguajes de programación: las reglas gramaticales definen qué programas están sintácticamente bien construidos.</p>
  </div>
  <div>
    <img src="img/gramatica_espanol.png"  style="width: 90%; border-radius: 8px; border: 1px solid var(--border-color); display: block; margin: 0 auto;">
  </div>
</div>

Note:
Todos aprendimos gramática en la escuela. Aprendimos que una oración tiene sujeto y predicado, que el predicado tiene un verbo, que el verbo puede ir acompañado de un objeto. Esas son reglas que describen cómo se combinan las palabras para formar frases válidas en el castellano. Formalmente, una gramática es exactamente eso: un conjunto finito de reglas que describe cómo se combinan los elementos de un lenguaje para formar cadenas válidas. Esa definición aplica tanto al castellano como a cualquier lenguaje de programación.

---

## Elementos de una gramática

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <table class="compare-table" style="font-size: 0.5em;">
      <tr>
        <td>  
          <div class="card">
            <h4 class="card-title"><span class="icon"><i class="fas fa-exchange-alt"></i></span>1. Producciones (Reglas)</h4>
            <p style="font-size: 0.85rem;">Reglas de reescritura de la forma:</p>
            <div style="text-align: center; font-weight: bold; font-size: 1.1rem; color: var(--accent-color); margin: 8px 0;">
              \(A \rightarrow \alpha \quad \)
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Indica que el símbolo  \(A\) puede sustituirse por \(\alpha\).</p>    
          </div>
        </td>
        <td> 
          <div class="card">
            <h4 class="card-title"><span class="icon"><i class="fas fa-font"></i></span>2. Símbolos Terminales (\(T\))</h4>
            <p style="font-size: 0.85rem;">Los símbolos definitivos que aparecen en las cadenas finales del lenguaje generado.</p>
            </br>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="card">
            <h4 class="card-title"><span class="icon"><i class="fas fa-shapes"></i></span>3. Símbolos No Terminales (\(N\))</h4>
            <p style="font-size: 0.85rem;">Variables sintácticas intermedias o categorías abstractas que ayudan a estructurar la derivación.</p>
          </div>
        </td>
        <td>
          <div class="card" >
            <h4 class="card-title"><span class="icon"><i class="fas fa-play-circle"></i></span>4. Símbolo Inicial (\(S \in N\))</h4>
            <p style="font-size: 0.85rem;">Es el no terminal distinguido desde el cual <strong>comienza toda derivación</strong>.</p>
          </div>
        </td>
      </tr>
    </table> 
  </div>
  <div class="col">
    <div class="video-player-wrapper" >
      <video src="videos/c05/gramatica.mp4" poster="img/miraestevideo.png" controls></video>
    </div>    
  </div>
</div>

Note:
Toda gramática tiene cuatro componentes fundamentales. Primero, las producciones o reglas de reescritura, que indican cómo un símbolo puede reemplazarse por una secuencia de otros. Segundo, los símbolos terminales, que son las hojas del árbol, las palabras finales o tokens. Tercero, los no terminales, que son variables sintácticas intermedias. Y cuarto, el símbolo inicial, que es el no terminal desde donde empieza siempre la generación.

---


## Ejemplo: Gramática del castellano

<div class="two-col-flex ">
  <div class="col">
    <div class="flipped-callout">
      <h4><i class="fas fa-tags"></i> Identificación de Elementos</h4>
      <ul style="font-size: 0.85rem;">
        <li><strong>No Terminales (\(N\)):</strong> <code>&lt;frase&gt;</code>, <code>&lt;sujeto&gt;</code>, <code>&lt;sustantivo&gt;</code>, <code>&lt;predicado&gt;</code>, <code>&lt;verbo&gt;</code>, <code>&lt;objeto&gt;</code></li>
        <li><strong>Terminales (\(T\)):</strong> <span style="color: var(--accent-success);">{Juan, María, corrió, canta}</span></li>
        <li><strong>Símbolo Inicial:</strong> <code>&lt;frase&gt;</code></li>
      </ul>
    </div>
    <div class="card" style="font-size: 0.85rem;">
      <h4 class="card-title"><i class="fas fa-list-ol"></i> Conjunto de Producciones (\(P\))</h4>
      <ol style="margin-left: 20px; line-height: 1.6;">
        <li><code>&lt;frase&gt;</code> \(\rightarrow\) <code>&lt;sujeto&gt;</code> <code>&lt;predicado&gt;</code></li>
        <li><code>&lt;sujeto&gt;</code> \(\rightarrow\) <code>&lt;sustantivo&gt;</code></li>
        <li><code>&lt;sustantivo&gt;</code> \(\rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">Juan</span></li>
        <li><code>&lt;sustantivo&gt;</code> \(\rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">María</span></li>
        <li><code>&lt;predicado&gt;</code> \(\rightarrow\) <code>&lt;verbo&gt;</code></li>
        <li><code>&lt;predicado&gt;</code> \(\rightarrow\) <code>&lt;verbo&gt;</code> <code>&lt;objeto&gt;</code></li>
        <li><code>&lt;verbo&gt;</code> \(\rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">corrió</span></li>
        <li><code>&lt;verbo&gt;</code> \(\rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">canta</span></li>
      </ol>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 15px;">
      <video src="videos/c05/ej_gramatica_castellano.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Veamos cómo funciona esto con la gramática del castellano. Tenemos 8 producciones. Los no terminales están entre corchetes angulares y representan categorías sintácticas. Los terminales son las palabras concretas Juan, María, corrió y canta. El símbolo inicial es frase. Esta gramática formaliza qué oraciones simples son válidas en este subconjunto del idioma.

---

## Ejemplo de derivación

<div class="card" style="margin-bottom: 15px;">
  <p style="font-size: 0.95rem; margin: 0;">
    Generemos paso a paso la frase terminal <strong style="color: var(--accent-success);">"María canta"</strong> partiendo del símbolo inicial <code>&lt;frase&gt;</code>:
  </p>
</div>

<div class="two-col">
  <div class="col">
    <div class="timeline" style="font-size: 0.82rem;">
      <div class="timeline-item">
        <div class="timeline-badge"></div>
        <p class="timeline-title"><code>&lt;frase&gt;</code> \(\Rightarrow\) <code>&lt;sujeto&gt;</code> <code>&lt;predicado&gt;</code></p>
        <p class="timeline-desc">Aplicamos la producción (1)</p>
      </div>
      <div class="timeline-item">
        <div class="timeline-badge"></div>
        <p class="timeline-title">\(\Rightarrow\) <code>&lt;sustantivo&gt;</code> <code>&lt;predicado&gt;</code></p>
        <p class="timeline-desc">Aplicamos la producción (2) sobre <code>&lt;sujeto&gt;</code></p>
      </div>
      <div class="timeline-item">
        <div class="timeline-badge"></div>
        <p class="timeline-title">\(\Rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">María</span> <code>&lt;predicado&gt;</code></p>
        <p class="timeline-desc">Aplicamos la producción (4) sobre <code>&lt;sustantivo&gt;</code></p>
      </div>
      <div class="timeline-item">
        <div class="timeline-badge"></div>
        <p class="timeline-title">\(\Rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">María</span> <code>&lt;verbo&gt;</code></p>
        <p class="timeline-desc">Aplicamos la producción (5) sobre <code>&lt;predicado&gt;</code></p>
      </div>
      <div class="timeline-item">
        <div class="timeline-badge"></div>
        <p class="timeline-title">\(\Rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">María canta</span></p>
        <p class="timeline-desc">Aplicamos la producción (8) sobre <code>&lt;verbo&gt;</code> (Cadena final de terminales)</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card" style="font-size: 0.85rem;">
      <h4 class="card-title"><i class="fas fa-list-ol"></i> Conjunto de Producciones (\(P\))</h4>
      <ol style="margin-left: 20px; line-height: 1.6;">
        <li><code>&lt;frase&gt;</code> \(\rightarrow\) <code>&lt;sujeto&gt;</code> <code>&lt;predicado&gt;</code></li>
        <li><code>&lt;sujeto&gt;</code> \(\rightarrow\) <code>&lt;sustantivo&gt;</code></li>
        <li><code>&lt;sustantivo&gt;</code> \(\rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">Juan</span></li>
        <li><code>&lt;sustantivo&gt;</code> \(\rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">María</span></li>
        <li><code>&lt;predicado&gt;</code> \(\rightarrow\) <code>&lt;verbo&gt;</code></li>
        <li><code>&lt;predicado&gt;</code> \(\rightarrow\) <code>&lt;verbo&gt;</code> <code>&lt;objeto&gt;</code></li>
        <li><code>&lt;verbo&gt;</code> \(\rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">corrió</span></li>
        <li><code>&lt;verbo&gt;</code> \(\rightarrow\) <span style="color: var(--accent-success); font-weight: bold;">canta</span></li>
      </ol>
    </div>
  </div>
</div>

Note:
Ahora vemos cómo se genera la frase "María canta". Empezamos desde el símbolo inicial frase y aplicamos producciones una por una. En cada paso sustituimos un no terminal por el lado derecho de una producción correspondiente. Cuando ya no quedan no terminales en la cadena, hemos completado la derivación y alcanzado una sentencia del lenguaje.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> Analizando la gramática del castellano anterior, ¿es posible derivar la cadena "<span class="math-lang">María canta Juan</span>"?</span>
<p>Elige la opción correcta</p>
</div>

<div class="quiz-container">
  <div class="quiz-option" data-correct="false">
    Sí, porque todas las palabras individuales pertenecen al conjunto de terminales  \(T\).
  </div>
  <div class="quiz-option" data-correct="true">
    No, porque no existe ninguna producción que permita colocar un sustantivo después de un verbo en esa posición.
  </div>
  <div class="quiz-option" data-correct="false">
    Sí, aplicando la regla de predicado con objeto de forma recursiva.
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="Pertenecer al vocabulario terminal no basta: las producciones de la gramática determinan el orden estructural admisible. No hay regla que permita reescribir &lt;objeto&gt; como &lt;sustantivo&gt; en esta gramática simplificada." 
     data-incorrect-explain="Recuerda que para que una cadena pertenezca al lenguaje generado, debe existir una secuencia válida de derivaciones a partir del símbolo inicial que conduzca exactamente a esa combinación de terminales.">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta permite fijar la diferencia crucial entre el conjunto de símbolos disponibles y la estructura válida impuesta por las reglas gramaticales.

---

## Gramática: Definición Formal

<div class="card" style="text-align: center; padding: 15px; margin-bottom: 20px;">
  <span style="font-size: 1.3rem; font-weight: bold; color: var(--accent-color);">
    Una gramática formal es una cuádrupla \(G = (N, T, S, P)\)
  </span>
</div>
<div class="grid-2">
  <div class="card">
    <h4 class="card-title">Componentes Formales</h4>
    <ul style="font-size: 0.85rem; line-height: 1.6;">
      <li>\(N\): Conjunto finito de <strong>símbolos no terminales</strong>.</li>
      <li>\(T\): Conjunto finito de <strong>símbolos terminales</strong> (\(N \cap T = \emptyset\)).</li>
      <li>\(S \in N\): <strong>Símbolo inicial</strong> distinguido.</li>
      <li>\(P\): Conjunto finito de <strong>producciones</strong> de la forma:
        <div style="text-align: center; margin-top: 5px; color: var(--accent-secondary); font-weight: bold;">
          \(\alpha A \beta \rightarrow \gamma\)
        </div>
        donde \(A \in N\) y \(\alpha, \beta, \gamma \in (N \cup T)^*\).
      </li>
    </ul>
  </div>
  <div class="card">
    <h4 class="card-title"><i class="fas fa-filter"></i> Restricciones y Clasificación</h4>
    <div class="flipped-callout">
      <p style="font-size: 0.85rem;">
        Esta es la definición en su forma más general (sin restricciones).
      </p>
      <p style="font-size: 0.85rem;">
        Al imponer <strong>restricciones sintácticas</strong> sobre la forma de las producciones en \(P\), obtenemos familias de gramáticas con distinto poder computacional (como las <em>Gramáticas Regulares</em>).
      </p>
    </div>
  </div>
</div>

Note:
Formalmente, una gramática G se define como una cuádrupla (N, T, S, P). N y T son conjuntos disjuntos: ningún símbolo puede ser simultáneamente terminal y no terminal. S es el símbolo inicial perteneciente a N. Y P es el conjunto de reglas de producción. En su forma más libre, las producciones reemplazan una cadena con al menos un no terminal por otra cadena cualquiera. Restringir la forma de estas producciones es lo que da origen a la clasificación de gramáticas.

---

## Derivación y Lenguaje Generado

<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title"><i class="fas fa-step-forward"></i> Paso de Derivación (\(\Rightarrow\))</h4>
      <p style="font-size: 0.85rem;">Dada una producción \(p \rightarrow q\), si una cadena contiene la subcadena \(p\), podemos reemplazarla por \(q\):</p>
      <div style="text-align: center; font-size: 1.1rem; color: var(--accent-color); font-weight: bold; margin: 8px 0;">
        \(x p y \Rightarrow x q y\)
      </div>
      <p style="font-size: 0.8rem; color: var(--text-muted);">Decimos que \(xpy\) deriva directamente en \(xqy\).</p>
    </div>
    <div class="card" style="margin-top: 10px;">
      <h4 class="card-title"><i class="fas fa-fast-forward"></i> Clausura Transitiva (\(\Rightarrow^*\))</h4>
      <p style="font-size: 0.85rem;">Indica una secuencia de <strong>cero o más pasos</strong> de derivación:</p>
      <div style="text-align: center; font-size: 1.05rem; color: var(--accent-secondary); font-weight: bold;">
        \(S \Rightarrow v_1 \Rightarrow v_2 \Rightarrow \dots \Rightarrow w \iff S \Rightarrow^* w\)
      </div>
    </div>
  </div>
  <div class="col">
   <div class="video-player-wrapper">
      <video src="videos/c05/derivacion.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>
 <div class="flipped-callout-bis" style="height: 90%;">
      <h4><i class="fas fa-box-open"></i> Lenguaje Generado \(L(G)\)</h4>
      <p style="font-size: 0.9rem;">
        Es el conjunto de todas las cadenas compuestas <strong>exclusivamente por terminales</strong> que pueden derivarse a partir del símbolo inicial \(S\):
      </p>
      <div style="text-align: center; font-size: 1.2rem; font-weight: bold; color: var(--accent-success); margin: 15px 0;">
        \(L(G) = \{ w \in T^* \mid S \Rightarrow^* w \}\)
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted);">
        Si una cadena intermedia contiene algún símbolo de \(N\), se denomina <em>forma sentencial</em>, pero aún no pertenece formalmente a \(L(G)\).
      </p>
    </div>

Note:
Definimos la derivación formalmente. La flecha simple indica un paso individual de sustitución. La flecha con asterisco representa la clausura reflexiva y transitiva: una secuencia finita de cero o más sustituciones. Con esto definimos el lenguaje generado L(G) como el conjunto de todas las palabras formadas únicamente por símbolos terminales que pueden derivarse desde el símbolo inicial S.

---

## Gramáticas Lineales por la Derecha

<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title">Estructura de las Producciones</h4>
      <p style="font-size: 0.85rem;">Todas las reglas de \(P\) deben tener una de estas dos formas:</p>
      <ul style="font-size: 0.95rem; line-height: 1.8; color: var(--accent-color); font-weight: bold;">
        <li>\(A \rightarrow w\)</li>
        <li>\(A \rightarrow w B\)</li>
      </ul>
      <p style="font-size: 0.8rem; color: var(--text-muted);">donde \(A, B \in N\) y \(w \in T^*\).</p>
      <div class="flipped-callout" style="margin-top: 10px; font-size: 0.8rem;">
        <p><strong>Clave:</strong> El lado izquierdo es un único no terminal. El lado derecho tiene a lo sumo un no terminal y, de haberlo, está <strong>al final de todo (a la derecha)</strong>.</p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="card">
      <h4 class="card-title">Ejemplo: Gramática \(G_1\)</h4>
      <p style="font-size: 0.85rem;">Sea \(G_1 = (\{S\}, \{a, b\}, S, P_1)\) con producciones:</p>
      <div style="border: 1px dashed var(--border-color); padding: 10px; border-radius: 6px; font-size: 1rem; color: var(--accent-success); font-weight: bold; text-align: center;">
        \(S \rightarrow abS \mid a\)
      </div>
      <p style="font-size: 0.85rem; margin-top: 10px;"><strong>Lenguaje generado:</strong></p>
      <p style="font-size: 0.9rem; text-align: center; color: var(--accent-secondary); font-weight: bold;">
        \(L(G_1) = \{ (ab)^n a \mid n \ge 0 \} = \{ a, aba, ababa, \dots \}\)
      </p>
    </div>
  </div>
</div>

Note:
Una gramática es lineal por la derecha si en todas sus producciones el lado izquierdo es un solo no terminal, y el lado derecho contiene solo terminales o bien una cadena de terminales seguida de exactamente un no terminal al final. El ejemplo G1 tiene producciones S produce abS y S produce a. Genera cadenas con repeticiones de ab terminadas en una a.

---

## Gramáticas Lineales por la Izquierda

<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title">Estructura de las Producciones</h4>
      <p style="font-size: 0.85rem;">Todas las reglas de \(P\) deben tener una de estas dos formas:</p>
      <ul style="font-size: 0.95rem; line-height: 1.8; color: var(--accent-secondary); font-weight: bold;">
        <li>\(A \rightarrow w\)</li>
        <li>\(A \rightarrow B w\)</li>
      </ul>
      <p style="font-size: 0.8rem; color: var(--text-muted);">donde \(A, B \in N\) y \(w \in T^*\).</p>
      <div class="flipped-callout-bis" style="margin-top: 10px; font-size: 0.8rem;">
        <p><strong>Clave:</strong> El lado izquierdo es un único no terminal. El lado derecho tiene a lo sumo un no terminal y, de haberlo, está <strong>al comienzo de todo (a la izquierda)</strong>.</p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="card">
      <h4 class="card-title">Ejemplo: Gramática \(G_2\)</h4>
      <p style="font-size: 0.85rem;">Sea \(G_2 = (\{S, T, U\}, \{a, b\}, S, P_2)\) con producciones:</p>
      <div style="border: 1px dashed var(--border-color); padding: 10px; border-radius: 6px; font-size: 0.95rem; color: var(--accent-success); font-weight: bold; line-height: 1.6;">
        \(S \rightarrow Tab\)<br>
        \(T \rightarrow Tab \mid U\)<br>
        \(U \rightarrow a\)
      </div>
      <p style="font-size: 0.8rem; margin-top: 8px; color: var(--text-muted);">
        Todas las variables no terminales en los lados derechos aparecen estrictamente en la primera posición.
      </p>
    </div>
  </div>
</div>

Note:
De forma simétrica, una gramática es lineal por la izquierda si en el lado derecho el no terminal aparece estrictamente al principio de la cadena, seguido de terminales. En el ejemplo G2, el no terminal T en la regla T produce Tab aparece al inicio del lado derecho.

---

## Gramáticas Regulares

<div class="card" style="border: 2px solid var(--accent-color); padding: 15px; margin-bottom: 20px;">
  <h4 class="card-title" style="text-align: center; font-size: 1.2rem; color: var(--accent-color);">
    <i class="fas fa-certificate"></i> Definición de Gramática Regular (GR)
  </h4>
  <p style="text-align: center; font-size: 1.05rem; margin: 0;">
    Una gramática es <strong>regular</strong> si es <strong>lineal por la derecha</strong> o bien <strong>lineal por la izquierda</strong>.
  </p>
</div>
<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title"><i class="fas fa-exclamation-triangle"></i> Regla de Uniformidad</h4>
      <p style="font-size: 0.85rem;">
        Una gramática regular <strong>no puede mezclar</strong> producciones lineales por la derecha con producciones lineales por la izquierda en el mismo conjunto de reglas \(P\).
      </p>
    </div>
    </br>
    <div class="card" style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid var(--accent-success);">
      <h4 class="card-title" style="color: var(--accent-success);"><i class="fas fa-check-circle"></i> Teorema Fundamental</h4>
      <p style="font-size: 0.88rem; font-weight: bold;">
        Las gramáticas regulares generan exactamente la clase de los <span style="color: var(--accent-color);">Lenguajes Regulares</span>.
      </p>
    </div>
  </div>
  <div class="col">
      <div class="video-player-wrapper" style="80%">
          <video src="videos/c05/gramatica_no_regular.mp4" poster="img/u0_02_play_video.png" controls></video>
      </div>
  </div>
</div>


Note:
Llegamos al concepto central. Una gramática regular es aquella que es o bien puramente lineal por la derecha, o bien puramente lineal por la izquierda. Y el resultado teórico crucial es que las gramáticas regulares generan con total exactitud la misma clase de lenguajes que reconocen los autómatas finitos y que describen las expresiones regulares.

---

## Ejemplo 1: Generación de números enteros

<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title"><i class="fas fa-hashtag"></i> Gramática Lineal Derecha</h4>
      <p style="font-size: 0.82rem;">Queremos generar la secuencia de dígitos decimales:</p>
      <div style="font-size: 0.85rem; color: var(--accent-color); font-weight: bold; line-height: 1.6;">
        \(S \rightarrow 0 \mid 1 \mid 2 \mid 3 \mid 4 \mid 5 \mid 6 \mid 7 \mid 8 \mid 9\)<br>
        \(S \rightarrow 0S \mid 1S \mid 2S \mid 3S \mid 4S \mid 5S \mid 6S \mid 7S \mid 8S \mid 9S\)
      </div>
      <div class="flipped-callout" style="margin-top: 10px; font-size: 0.8rem;">
        <p><strong>Ejemplo: derivación del número 366:</strong></p>
        <p style="color: var(--accent-success); font-weight: bold; text-align: center;">
          \(S \Rightarrow 3S \Rightarrow 36S \Rightarrow 366\)
        </p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="video-player-wrapper">
      <video src="videos/c05/gramatica_numeros_enteros.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
    <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 8px;">
      ¿Es regular? Sí, es lineal por la derecha. También podríamos construir una versión lineal por la izquierda equivalente para el mismo lenguaje.
    </p>
  </div>
</div>

Note:
Veamos un ejemplo concreto de diseño: una gramática para números enteros. Las producciones permiten emitir un dígito y continuar llamando a S a la derecha, o emitir un dígito final terminal. Para generar el número 928, derivamos S en 9S, luego en 92S, y finalmente cerramos con 928. Cada paso añade un dígito por la derecha.

---

## Ejemplo 2: Números binarios pares

<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title"><i class="fas fa-code-branch"></i> Condición de Paridad Binaria</h4>
      <p style="font-size: 0.85rem;">Un número binario es par si y solo si su último dígito es <strong>0</strong>.</p>
      <div class="flipped-callout-bis" style="font-size: 0.9rem;">
        <p><strong>Producciones (\(P\)):</strong></p>
        <div style="color: var(--accent-secondary); font-weight: bold; font-size: 1.05rem; text-align: left;">
          \(T \rightarrow 0\)<br>
          \(T \rightarrow 0T \mid 1T\)
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: 10px;">
      <h4 class="card-title">Ejemplo: derivación de la cadena "1100"</h4>
      <p style="font-size: 0.95rem; text-align: center; color: var(--accent-success); font-weight: bold;">
        \(T \Rightarrow 1T \Rightarrow 11T \Rightarrow 100T \Rightarrow 1000\)
      </p>
    </div>
  </div>

  <div class="col">
    <div class="card" style="height: 100%; display: flex; flex-direction: column; justify-content: center;">
      <p style="font-size: 0.9rem;">¿Es regular esta gramática? ¿De qué tipo es?</p>
      <div class="video-player-wrapper">
        <video src="videos/c05/gramatica_numeros_binarios_pares.mp4" poster="img/miraestevideo.png" controls></video>
      </div>
    </div>
  </div>
</div>

Note:
En este segundo ejemplo generamos números binarios pares. Dado que la paridad exige terminar en cero, resulta muy natural escribir una gramática lineal por la izquierda: agregamos prefijos 0 o 1 a la izquierda del no terminal T, y al finalizar sustituimos T por el terminal 0. La derivación de 100 muestra cómo se construye la cadena de izquierda a derecha asegurando el cero final.

---

## Contraejemplo: Gramática no regular

<div class="card" style="border: 2px solid var(--accent-danger); margin-bottom: 15px;">
  <h4 class="card-title" style="color: var(--accent-danger);">
    <i class="fas fa-ban"></i> ¡Cuidado con esta trampa conceptual común!
  </h4>
  <p style="font-size: 0.88rem; margin: 0;">
    Tener <em>a lo sumo un no terminal</em> en el lado derecho <strong>no garantiza</strong> que la gramática sea regular.
  </p>
</div>

<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title">Gramática \(G_3\)</h4>
      <div style="font-size: 0.95rem; font-weight: bold; line-height: 1.6; color: var(--text-color);">
        \(S \rightarrow A\)<br>
        \(A \rightarrow aB \mid \epsilon\)<br>
        <span style="color: var(--accent-danger); background: rgba(239, 68, 68, 0.1); padding: 2px 6px; border-radius: 4px;">
          \(B \rightarrow Ab\)
        </span>
      </div>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 10px;">
        Analicemos la regla \(B \rightarrow Ab\): el no terminal \(A\) está al principio, pero en \(A \rightarrow aB\) el no terminal \(B\) está al final.
      </p>
    </div>
  </div>

  <div class="col">
    <div class="flipped-callout" style="border-left-color: var(--accent-danger);">
      <h4><i class="fas fa-times-circle" style="color: var(--accent-danger);"></i> ¿Por qué NO es regular?</h4>
      <p style="font-size: 0.85rem;">
        Es una gramática lineal (a lo sumo un no terminal por producción), pero:
      </p>
      <ul style="font-size: 0.8rem; line-height: 1.5;">
        <li>No es lineal por la derecha (por culpa de \(B \rightarrow Ab\)).</li>
        <li>No es lineal por la izquierda (por culpa de \(A \rightarrow aB\)).</li>
      </ul>
      <p style="font-size: 0.85rem; font-weight: bold; color: var(--accent-danger); margin-top: 8px;">
        Al mezclar ambas formas, \(G_3\) deja de ser una gramática regular.
      </p>
    </div>
  </div>
</div>

Note:
Este contraejemplo es sumamente instructivo. La gramática G3 tiene a lo sumo un no terminal por producción, por lo que es lineal. Sin embargo, tiene una regla que pone el no terminal a la derecha y otra que lo pone a la izquierda. Al mezclar ambos esquemas, no es ni puramente lineal por la derecha ni puramente lineal por la izquierda. Por lo tanto, no es una gramática regular.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Por qué la producción individual <span class="math-lang">\(A \rightarrow a B b\) </span> rompe la condición de gramática regular?</span>
<p>Elige la opción correcta</p>
</div>

<div class="quiz-container">
  <div class="quiz-option" data-correct="false">
    Porque contiene dos símbolos terminales distintos ('a' y 'b').
  </div>
  <div class="quiz-option" data-correct="true">
    Porque el no terminal B se encuentra en el medio, rodeado por terminales a ambos lados, incumpliendo la posición exclusiva en los extremos.
  </div>
  <div class="quiz-option" data-correct="false">
    Porque los no terminales no pueden coexistir con más de un terminal en ninguna gramática.
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="En una gramática regular, el no terminal derecho debe estar estrictamente al final de todo (lineal derecha) o al inicio de todo (lineal izquierda). Si queda en una posición intermedia entre terminales, la regla no es regular." 
     data-incorrect-explain="Recuerda las definiciones formales: en las producciones regulares, los terminales pueden ser de cualquier longitud, pero el único no terminal debe ubicarse rígidamente en el extremo izquierdo o derecho.">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta refuerza la importancia de la posición de las variables en los lados derechos para conservar la regularidad.

---

<!--  TRANSICIÓN A LA SEGUNDA PARTE --->
<h2>Equivalencia entre GR y Autómatas Finitos</h2>
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">  
    <p style="font-size: 0.85rem; line-height: 1.6;">
      Ahora que sabemos definir gramáticas regulares, abordamos la pregunta constructiva:
    </p>
    <div class="flipped-callout">
      <p style="font-size: 0.95rem; font-weight: bold; color: var(--accent-color);">
        ¿Cómo transformar automáticamente una Gramática Regular en un Autómata Finito y viceversa?
      </p>
    </div>
  </div>  
  <div>
    <div class="video-player-wrapper">
      <video src="videos/c05/teoremas_equivalencia.mp4" poster="img/compu_cuaderno.jpg" controls></video>
    </div>
  </div>  
</div>

Note:
Pasamos a la segunda mitad de la lección. Hasta ahora sabemos que ambos conceptos generan la misma clase de lenguajes. Ahora vamos a ver los dos algoritmos constructivos que permiten pasar de una gramática regular a un autómata finito y viceversa, formalizados a través de los Teoremas 1 y 2.

---

## Teorema 1: De Gramática Regular a AF

<div class="card" style="margin-bottom: 15px; border-left: 4px solid var(--accent-color);">
  <p style="font-size: 0.92rem; margin: 0;">
    <strong>Teorema 1:</strong> Sea \(G = (N, T, P, S)\) una gramática lineal por la derecha. Entonces \(L(G)\) es un lenguaje regular y existe un Autómata Finito No Determinista \(M\) tal que \(L(M) = L(G)\).
  </p>
</div>
<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title"><i class="fas fa-cogs"></i> Procedimiento Constructivo (6 Pasos)</h4>
      <ol style="font-size: 0.8rem; line-height: 1.5; margin-left: 15px;">
        <li>Por cada no terminal \(v_i \in N\), crear un estado etiquetado con \(v_i\).</li>
        <li>El estado inicial del autómata es el símbolo inicial \(S\).</li>
        <li>Agregar un nuevo estado final \(v_f \in F\) (con \(Q = N \cup \{v_f\}\)).</li>
        <li>Por cada regla \(v_i \rightarrow a v_j\), añadir transición \(\delta(v_i, a) = v_j\).</li>
        <li>Por cada regla \(v_i \rightarrow a\), añadir transición \(\delta(v_i, a) = v_f\).</li>
        <li>Por cada regla \(v_i \rightarrow \epsilon\), hacer que \(v_i\) sea también estado de aceptación (\(v_i \in F\)).</li>
      </ol>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper">
      <video src="videos/c05/equivalencia_parte1.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>
<div class="flipped-callout" style=" display: flex; flex-direction: column; justify-content: center;">
  <p style="text-align: center; font-size: 1.1rem; font-weight: bold; color: var(--accent-secondary); margin: 15px 0;">
    "Cada no terminal es un estado. Cada producción es una transición."
  </p>
  <p style="font-size: 0.8rem; color: var(--text-muted); text-align: center;">
    La estructura sintáctica de la gramática se proyecta de manera directa en el grafo de estados del autómata.
  </p>
</div>

Note:
El Teorema 1 demuestra constructivamente cómo transformar cualquier gramática lineal por derecha en un autómata finito. Los no terminales se convierten en estados, las reglas con no terminal a la derecha definen transiciones entre estados existentes, y las reglas que terminan en constantes derivan al estado de aceptación final vf. Si hay derivaciones épsilon, el estado emisor se convierte también en estado de aceptación.

---

## Ejemplo 1: De GR a AF

<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title">Gramática de Entrada</h4>
      <div style="font-size: 0.95rem; font-weight: bold; color: var(--accent-color); line-height: 1.6;">
        \(S \rightarrow aA\)<br>
        \(A \rightarrow aB\)<br>
        \(B \rightarrow bS \mid b\)
      </div>
      <div class="flipped-callout-bis" style="font-size: 0.8rem; margin-top: 10px;">
        <p><strong>Mapeo de producciones a transiciones:</strong></p>
        <ul style="margin-left: 15px; line-height: 1.5;">
          <li>\(S \rightarrow aA \implies \delta(S, a) = A\)</li>
          <li>\(A \rightarrow aB \implies \delta(A, a) = B\)</li>
          <li>\(B \rightarrow bS \implies \delta(B, b) = S\)</li>
          <li>\(B \rightarrow b \implies \delta(B, b) = v_f\)</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper">
      <video src="videos/c05/ejemplo1_gr_af.mp4" poster="img/ejemplo.jpeg" controls></video>
    </div>
    <div class="card" style="margin-top: 10px; font-size: 0.85rem; text-align: center;">
      <p style="margin: 0;">¿Qué lenguaje reconoce este autómata?.</p>
    </div>
  </div>
</div>

Note:
Apliquemos el procedimiento al ejemplo. Creamos los estados S, A y B correspondientes a los no terminales, más el estado final vf. Las producciones nos dan las transiciones: de S a A con a, de A a B con a, de B a S con b (cerrando el ciclo aab), y de B a vf con b para aceptar la cadena.

---

## Ejemplo 2: De GR a AF

<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title">Gramática con \(\epsilon\) en el Inicio</h4>
      <div style="font-size: 0.95rem; font-weight: bold; color: var(--accent-secondary); line-height: 1.6;">
        \(S \rightarrow 0T \mid 1U \mid \epsilon\)<br>
        \(T \rightarrow 1S\)<br>
        \(U \rightarrow 0S\)
      </div>
      <div class="flipped-callout" style="font-size: 0.82rem; margin-top: 10px;">
        <p><strong>Efecto de \(S \rightarrow \epsilon\):</strong></p>
        <p>Por el paso 6, el estado inicial \(S\) es a su vez un <strong>estado de aceptación</strong>. No se requiere crear un estado \(v_f\) separado.</p>
      </div>
    </div>
  </div>

  <div class="col">
     <div class="video-player-wrapper">
      <video src="videos/c05/ejemplo2_gr_af.mp4" poster="img/ejemplo.jpeg" controls></video>
    </div>
    <div class="card" style="margin-top: 10px; font-size: 0.85rem; text-align: center;">
      <p style="margin: 0;">¿Qué lenguaje reconoce este autómata?.</p>
    </div>
  </div>
</div>

Note:
En este segundo ejemplo, la regla S produce épsilon indica que la cadena vacía forma parte del lenguaje. Siguiendo el algoritmo, convertimos a S en un estado inicial y simultáneamente de aceptación. Desde S alternamos con 0 a T y volvemos con 1 a S, o vamos con 1 a U y volvemos con 0 a S.

---

## Teorema 2: De Autómata Finito a GR

<div class="card" style="margin-bottom: 15px; border-left: 4px solid var(--accent-success);">
  <p style="font-size: 0.92rem; margin: 0;">
    <strong>Teorema 2:</strong> Si \(L\) es un lenguaje regular sobre el alfabeto \(\Sigma\), entonces existe una gramática regular \(G = (N, \Sigma, P, S)\) tal que \(L = L(G)\).
  </p>
</div>

<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title"><i class="fas fa-undo"></i> Procedimiento Inverso (4 Pasos)</h4>
      <p style="font-size: 0.82rem;">Dado el autómata \(M = (Q, \Sigma, \delta, q_0, F)\):</p>
      <ol style="font-size: 0.82rem; line-height: 1.6; margin-left: 15px;">
        <li>Los no terminales son los estados del autómata: \(N = Q\).</li>
        <li>El símbolo inicial de la gramática es el estado inicial: \(S = q_0\).</li>
        <li>Por cada transición \(\delta(q_i, a) = q_k\), añadir la regla \(q_i \rightarrow a q_k\).</li>
        <li>Por cada estado de aceptación \(q_k \in F\), añadir la regla \(q_k \rightarrow \epsilon\).</li>
      </ol>
    </div>
  </div>
  <div class="col">
      <div class="video-player-wrapper">
        <video src="videos/c05/equivalencia_parte2.mp4" poster="img/u0_02_play_video.png" controls></video>
      </div>
  </div>
</div>
<div class="flipped-callout-bis" style="display: flex; flex-direction: column; justify-content: center;">
  <p style="text-align: center; font-size: 1.1rem; font-weight: bold; color: var(--accent-color); margin: 15px 0;">
    "Cada estado es un no terminal. Cada transición es una producción."   </p>
  <p style="font-size: 0.82rem; color: var(--text-muted); text-align: center;">
    El camino inverso es un espejo fiel del Teorema 1.
  </p>
</div>

Note:
Ahora analizamos el sentido inverso a través del Teorema 2: dado un autómata finito, construir una gramática regular que genere su mismo lenguaje. El procedimiento es sumamente directo: los estados se convierten en no terminales, cada flecha del autómata genera una producción, y los estados de aceptación agregan una regla que produce épsilon.

---

## Ejemplo 1: De AF a GR 

<div class="two-col">
  <div class="col">
    <div class="video-player-wrapper">
      <video src="videos/c05/ejemplo1_af_gr.mp4" poster="img/ejemplo.jpeg" controls></video>
    </div>
    <div class="card" style="margin-top: 10px; font-size: 0.8rem;">
      <p><strong>Autómata:</strong> </br>
      Estados \(\{S, T, U\}\), Inicial \(S\), Final \(F=\{U\}\).</br>
      Transiciones: \(\delta(S, a) = T\), \(\delta(T, b) = U\), \(\delta(U, b) = U\)</p>
    </div>
  </div>

  <div class="col">
    <div class="card">
      <h4 class="card-title">Gramática Obtenida</h4>
      <div style="font-size: 0.88rem; font-weight: bold; color: var(--accent-color); line-height: 1.5;">
        \(S \rightarrow aT\)<br>
        \(T \rightarrow bU\)<br>
        \(U \rightarrow bU \mid \epsilon\)
      </div>
      <div class="flipped-callout" style="margin-top: 10px; font-size: 0.8rem;">
        <p><strong>Simplificación sin \(\epsilon\):</strong></p>
        <p>Sustituyendo la regla de parada \(U \rightarrow \epsilon\), podemos reescribir de forma equivalente:</p>
        <p style="color: var(--accent-success); font-weight: bold;">
          \(S \rightarrow aT\)<br>
          \(T \rightarrow bU \mid b\)<br>
          \(U \rightarrow bU \mid b\)
        </p>
      </div>
    </div>
  </div>
</div>

Note:
Tomemos este autómata que reconoce a b b estrella. El estado inicial S pasa a T con a, T pasa a U con b, y U cicla en b. Aplicando el algoritmo obtenemos S produce aT, T produce bU, U produce bU y U produce épsilon por ser de aceptación. Si queremos eliminar las reglas épsilon, podemos combinar producciones fácilmente.

---

## Ejemplo 2: De AF a GR

<div class="two-col">
  <div class="col">
    <div class="card">
      <h4 class="card-title">Autómata con 4 Estados (\(S_0, S_1, S_2, S_3\))</h4>
      <p style="font-size: 0.82rem;">Transiciones: </br>
      \(\delta(S_0, a) = S_1\), \(\delta(S_1, a) = S_2\), \(\delta(S_2, b) = S_2\), \(\delta(S_2, a) = S_3\) </p>
      <div class="flipped-callout-bis" style="font-size: 0.85rem; margin-top: 8px;">
        <p><strong>Gramática Resultante:</strong></p>
        <div style="color: var(--accent-color); font-weight: bold; line-height: 1.5;">
          \(S_0 \rightarrow a S_1\)<br>
          \(S_1 \rightarrow a S_2\)<br>
          \(S_2 \rightarrow b S_2 \mid a S_3\)<br>
          \(S_3 \rightarrow \epsilon\)
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: 10px; font-size: 0.8rem;">
      <p><strong>Derivación de "aaba":</strong></p>
      <p style="color: var(--accent-success); font-weight: bold;">
        \(S_0 \Rightarrow a S_1 \Rightarrow aa S_2 \Rightarrow aab S_2 \Rightarrow aaba S_3 \Rightarrow aaba\)
      </p>
    </div>
  </div>

  <div class="col">
    <div class="video-player-wrapper">
      <video src="videos/c05/ejemplo2_af_gr.mp4" poster="img/ejemplo.jpeg" controls></video>
    </div>
    <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;">
      Observa cómo cada paso de derivación refleja exactamente el avance de la cabeza de lectura entre los estados del autómata.
    </p>
  </div>
</div>

Note:
En este segundo ejemplo vemos un autómata con 4 estados. Las transiciones construyen las reglas de producción directamente. Al verificar la derivación de la palabra "aaba", notamos que la secuencia de símbolos no terminales traza con exactitud la ruta de estados recorrida por el autómata durante el reconocimiento.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> En la conversión de AF a GR, si el estado <span class="math-lang">\(q_3\) </span> es un estado de aceptación (\(q_3 \in F\)), ¿qué regla obligatoria se agrega a la gramática?</span>
<p>Elige la opción correcta</p>
</div>

<div class="quiz-container">
  <div class="quiz-option" data-correct="false">
    \(q_3 \rightarrow S\) &nbsp; (retorno al estado inicial).
  </div>
  <div class="quiz-option" data-correct="true">
    \(q_3 \rightarrow \epsilon\) &nbsp; (permite culminar la derivación eliminando el no terminal).
  </div>
  <div class="quiz-option" data-correct="false">
    \(q_3 \rightarrow \emptyset\) &nbsp; (bloqueo de derivación).
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="Al llegar a un estado de aceptación, la cadena puede finalizar válidamente. La regla q3 -&gt; ε permite que el no terminal q3 desaparezca de la forma sentencial, dejando únicamente la cadena de terminales generada." 
     data-incorrect-explain="Recuerda que los estados de aceptación corresponden a puntos donde la lectura puede concluir exitosamente. En la gramática esto se modela permitiendo que la variable se reescriba en la cadena vacía ε.">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta afirma el rol de la producción épsilon como mecanismo de parada de la derivación en los estados finales.

---

## La Jerarquía de Chomsky

<div class="two-col-flex ">
  <div>
    <div class="card">
      <h4 class="card-title"><i class="fas fa-history"></i> Origen Histórico (1956)</h4>
      <p style="font-size: 0.85rem;">
        Propuesta por el lingüista y científico cognitivo <strong>Noam Chomsky</strong> al intentar formalizar matemáticamente los lenguajes naturales.
      </p>
      <div class="flipped-callout" style="font-size: 0.8rem; margin-top: 10px;">
        <p>Aunque nació para modelar el lenguaje humano, se convirtió en el <strong>pilar teórico fundamental</strong> para el diseño de compiladores y lenguajes de programación.</p>
      </div>
    </div>
    <div>
      <iframe 
        style="width: 70%; max-width: 800px; height: 300px;"
        src="https://www.youtube.com/embed/F3l9UWpoUuU?si=cQrOdrG5Y2bX6xNy" title="YouTube video player"
        allowfullscreen>
      </iframe>
     </div>
  </div>
   <div class="video-player-wrapper" style="margin-top: 15px;">
      <video src="videos/c05/gramaticas_jerarquias.mp4" poster="img/miraestevideo_2.png" controls></video>
    </div>  
</div>

Note:
Llegamos al cierre conceptual de la unidad con la Jerarquía de Chomsky. En la década de 1950, Noam Chomsky propuso clasificar las gramáticas formales en cuatro niveles según el grado de restricción sobre sus producciones. Este trabajo revolucionó tanto la lingüística como las nacientes ciencias de la computación.

---

## Clasificación de las gramáticas

<table class="compare-table" style="width: 100%;">
  <thead>
    <tr>
      <th>Tipo</th>
      <th>Gramática</th>
      <th>Forma de las Producciones</th>
      <th>Autómata Reconocedor</th>
      <th>Aplicación en Compiladores</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: rgba(16, 185, 129, 0.08);">
      <td><strong>Tipo 3</strong></td>
      <td><strong>Regular</strong></td>
      <td>\(A \rightarrow wB \mid w\) </br>
      (Lineal Der./Izq.)</td>
      <td><strong>Autómata Finito</strong> (AFD/AFND)</td>
      <td><span style="color: var(--accent-success); font-weight: bold;">Análisis Léxico</span> (Tokens)</td>
    </tr>
    <tr style="background: rgba(59, 130, 246, 0.08);">
      <td><strong>Tipo 2</strong></td>
      <td><strong>Libre de Contexto</strong></td>
      <td>\(A \rightarrow \gamma \quad \) </br>
      \( (A \in N, \gamma \in (N \cup T)^*)\)</td>
      <td><strong>Autómata con Pila</strong> (AP)</td>
      <td><span style="color: var(--accent-color); font-weight: bold;">Análisis Sintáctico</span> (Gramática del lenguaje)</td>
    </tr>
    <tr>
      <td><strong>Tipo 1</strong></td>
      <td><strong>Sensible al Contexto</strong></td>
      <td>\(\alpha A \beta \rightarrow \alpha \gamma \beta \quad \) </br>
      \((|\alpha A \beta| \le |\alpha \gamma \beta|)\)</td>
      <td>Autómata Linealmente Acotado</td>
      <td>Análisis Semántico puntual</td>
    </tr>
    <tr>
      <td><strong>Tipo 0</strong></td>
      <td><strong>Sin Restricciones</strong></td>
      <td>\(\alpha \rightarrow \beta \quad \) </br>
      \((\alpha \text{ contiene al menos un } NT)\)</td>
      <td><strong>Máquina de Turing</strong></td>
      <td>Computabilidad universal</td>
    </tr>
  </tbody>
</table>
<div class="flipped-callout" style="font-size: 0.8rem;">
  <p><strong>Enfoque de la materia:</strong> En esta Unidad 2 aprendimos las gramáticas de <strong>Tipo 3</strong> (Léxico). En la Unidad 3 estudiaremos en profundidad el <strong>Tipo 2</strong> (Sintaxis).</p>
</div>

Note:
Esta tabla organiza los cuatro tipos. El Tipo 3 son las gramáticas regulares que reconocen los autómatas finitos y que usamos en el análisis léxico. El Tipo 2 son las gramáticas libres de contexto, reconocidas por autómatas con pila, que formarán la base de la Unidad 3 para el análisis sintáctico. Los Tipos 1 y 0 representan sistemas de mayor poder computacional hasta llegar a la Máquina de Turing.

---

## Contención en la Jerarquía de Chomsky

<div class="two-col-flex ">
  <div>
    <div class="card">
      <h4 class="card-title"><i class="fas fa-layer-group"></i> Inclusión Estricta</h4>
      <p style="font-size: 0.88rem; font-weight: bold; color: var(--accent-color); text-align: center;">
        Tipo 3 \(\subset\) Tipo 2 \(\subset\) Tipo 1 \(\subset\) Tipo 0
      </p>
      <ul style="font-size: 0.8rem; line-height: 1.6; margin-left: 15px;">
        <li>Todo lenguaje regular es también libre de contexto.</li>
        <li>Todo lenguaje libre de contexto es dependiente del contexto.</li>
        <li>A menor restricción en las reglas \(\rightarrow\) <strong>mayor poder expresivo</strong>.</li>
        <li>A mayor restricción \(\rightarrow\) <strong>algoritmos de reconocimiento más rápidos y eficientes</strong>.</li>
      </ul>
    </div>
  </div>

  <div>
    <img src="img/jerarquia_gramaticas.png" alt="Óvalos concéntricos de la Jerarquía de Chomsky" style="width: 85%; border-radius: 8px; border: 1px solid var(--border-color); display: block; margin: 0 auto;">
  </div>
</div>

Note:
El diagrama de óvalos concéntricos ilustra la relación de inclusión estricta: cada nivel incluye por completo a los anteriores. A medida que relajamos las restricciones sintácticas, ganamos poder expresivo pero perdemos velocidad y simplicidad algorítmica. Por eso los compiladores usan gramáticas regulares para los tokens (máxima velocidad) y gramáticas libres de contexto para las estructuras anidadas.

---

## Equivalencias entre modelos

<div class="two-col-flex">
  <div>
    <div class="card">
      <h4 class="card-title"><i class="fas fa-project-diagram"></i> Resumen de la Unidad 2</h4>
      <p style="font-size: 0.85rem;">Los lenguajes regulares pueden formularse mediante tres formalismos equivalentes:</p>
      <ul style="font-size: 0.82rem; line-height: 1.6;">
        <li><strong>Autómatas Finitos:</strong> Modelo operacional que los <em>reconoce</em>.</li>
        <li><strong>Expresiones Regulares:</strong> Modelo algebraico que los <em>representa</em>.</li>
        <li><strong>Gramáticas Regulares:</strong> Modelo generativo que los <em>produce</em>.</li>
      </ul>
    </div>
    <div>
      <img src="img/triangulo_equivalencias_final.jpeg" alt="Triángulo completo de equivalencias de la Unidad 2" style="width: 90%; border-radius: 8px; border: 1px solid var(--border-color); display: block; margin: 0 auto;">
    </div>
  </div>
  <div class="video-player-wrapper" style="margin-top: 15px;">
      <video src="videos/c05/equivalencias_finales.mp4" poster="img/miraestevideo_2.png" controls></video>
  </div>  
</div>

Note:
Cerramos la lección con el mapa integral de la Unidad 2. Tenemos tres herramientas intercambiables para los lenguajes regulares: los autómatas finitos que reconocen, las expresiones regulares que describen, y las gramáticas regulares que generan. En la práctica, las expresiones regulares son la opción preferida para definir tokens y los autómatas finitos son el motor que los ejecuta. En la próxima clase veremos cómo la herramienta Lex automatiza toda esta construcción.

---

## Ejercicios Prácticos

<div class="grid-2">
  <div class="card">
    <h4 class="card-title"><i class="fas fa-pencil-alt"></i> 1. Diseño de Gramáticas Regulares</h4>
    <p style="font-size: 0.82rem;">Escribir gramáticas regulares para los siguientes lenguajes:</p>
    <ul style="font-size: 0.8rem; line-height: 1.5; margin-left: 15px;">
      <li>Números decimales (ej: <code>0.98</code>, <code>14.5</code>).</li>
      <li>Identificadores de variables (letra seguida de letras o dígitos).</li>
      <li>Lenguaje \((01)^+ \mid (10)^+\).</li>
    </ul>
  </div>

  <div class="card">
    <h4 class="card-title"><i class="fas fa-exchange-alt"></i> 2. Conversiones Constructivas</h4>
    <ul style="font-size: 0.8rem; line-height: 1.5; margin-left: 15px;">
      <li>Para las gramáticas anteriores, construir los autómatas finitos aplicando el <strong>Teorema 1</strong>.</li>
      <li>Diseñar un autómata para cadenas binarias que contengan un número impar de unos y obtener su gramática regular con el <strong>Teorema 2</strong>.</li>
    </ul>
  </div>
</div>

<div class="flipped-callout" style="margin-top: 15px;">
  <h4><i class="fas fa-pencil"></i> </h4>
  <p>Resolvé y consultá lo que tengas dudas en el encuentro presencial</p>
</div>

Note:
Les dejamos estos ejercicios recomendados para afianzar el paso constructivo entre gramáticas y autómatas antes de la clase presencial. ¡Nos vemos en el próximo tema!

---

## Resumen de la clase

<div class="grid-2">
  <div class="card">
    <h4 class="card-title" ><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos</h4>
    <ul style="font-size:0.78rem; line-height:1.45;">
      <li>Una <strong>gramática</strong> se define como un conjunto finito de reglas para formar cadenas válidas en un lenguaje. Se compone de una cuádrupla $G = (N, T, S, P)$:</li>
      <li> La <strong>derivación</strong> es el proceso paso a paso de reemplazar variables no terminales usando las reglas de producción hasta obtener una cadena formada únicamente por símbolos terminales, la cual pasa a integrar el lenguaje $L(G)$.</li>
      <li>Las gramáticas regulares y los autómatas finitos son equivalentes.</li>
      <li>La jerarquía de Chomsky clasifica las gramáticas según sus restricciones y el modelo computacional que las reconocen.</li>
    </ul>
  </div>            
  <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <h4 class="card-title" style="color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección</h4>
      <p style="text-align:left; font-size:0.85rem; color:var(--text-muted); line-height: 1.4;">
        Estudiaremos cómo se integra todos los conceptos de esta Unidad en la herramienta de generación de analizadores léxicos Lex.
      </p>
    </div>        
  </div>    
</div>
<div class="flipped-callout" style="margin: 0; padding: 10px;">
      <p style="font-size:0.75rem; text-align: center; margin:0;"><strong>Recordatorio:</strong> Completa las actividades prácticas de la plataforma antes del encuentro presencial.</p>
    </div>


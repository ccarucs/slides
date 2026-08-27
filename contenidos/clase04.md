<!--  HOJA DE RUTA --->
<h2>¿Qué vamos a aprender?</h2>
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta de la clase </span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; font-weight: bold;">
      <li>Cadenas, alfabetos y lenguajes formales</li>
      <li>Operaciones básicas sobre cadenas y lenguajes</li>
      <li>Lenguajes regulares y propiedades de cierre</li>
      <li>Límites de los autómatas y el Lema del Bombeo</li>
      <li>Definición formal y ejemplos de Expresiones Regulares (ER)</li>
      <li>Teorema de Kleene y Construcción de Thompson</li>
      <li>Método de Ecuaciones (Conversión de AF a ER)</li>
    </ul>       
  </div>  
  <div>
    <div class="video-player-wrapper">
      <video src="videos/c04/v01_introduccion.mp4" poster="img/compu_af.png" controls></video>
    </div>
  </div>  
</div>
<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 15px !important;">
  <h4><i class="fas fa-lightbulb"></i> Recuerda:</h4>
  <p>Esta clase une la base matemática con la herramienta práctica de diseño del Analizador Léxico.</p>
</div>

Note:
Llevamos varios videos trabajando con autómatas finitos. Ya sabemos construirlos, trazar cadenas, convertir AFND a AFD. Pero hay una pregunta que todavía no respondimos, y es bastante incómoda: ¿Los autómatas finitos pueden reconocer cualquier conjunto de cadenas? Dicho de otra manera: ¿hay algún lenguaje que queramos reconocer en un compilador, y para el cual ningún autómata finito sea suficiente? La respuesta es sí. Y entender por qué es fundamental, porque marca exactamente el límite entre lo que puede hacer el análisis léxico —la fase que usa autómatas finitos— y lo que requiere el análisis sintáctico, que va a necesitar herramientas más potentes. En este video vamos a construir ese entendimiento en tres pasos. Primero, vamos a precisar el vocabulario: qué es formalmente un lenguaje, qué operaciones podemos hacer con lenguajes. Después vamos a ver que los lenguajes regulares —los que reconocen los AF— son cerrados bajo esas operaciones. Y finalmente vamos a demostrar, con un argumento sorprendentemente elegante, que algunos lenguajes están definitivamente fuera del alcance de los autómatas finitos.

---

## Vocabulario fundamental

<div class="two-col">
  <div class="col">
    <p>Antes de definir los límites, unifiquemos los términos matemáticos:</p>
    <ul>
      <li><strong>Cadena:</strong> Secuencia finita de símbolos de un alfabeto \(\Sigma\). La longitud de \(w\), denotada \(|w|\), es su número de símbolos. \((|abc| = 3)\).</li>
      <li><strong>Cadena Vacía (\(\epsilon\)):</strong> La secuencia que no contiene símbolos. Su longitud es \(|\epsilon| = 0\).</li>
      <li><strong>Estrella de Kleene del Alfabeto (\(\Sigma^*\)):</strong> El conjunto de todas las cadenas posibles formadas con símbolos de \(\Sigma\), incluyendo \(\epsilon\).</li>
    </ul>
    <div class="flipped-callout-bis">
      <p><strong>Lenguaje:</strong> Es cualquier subconjunto \(L\) de \(\Sigma^*\) (\(L \subseteq \Sigma^*\)).</p>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 20px;">
      <video src="videos/c04/v02_definiciones.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>    
  </div>
</div>

Note:
Antes de hablar de lenguajes con precisión, necesitamos un vocabulario compartido. Estas definiciones son simples, pero vamos a usarlas durante todo el resto de la materia. Una cadena es una secuencia de símbolos tomados de un alfabeto Sigma. Nada nuevo: ya venimos usando cadenas desde el primer video. La longitud de una cadena w, notada barra w barra, es la cantidad de símbolos que la componen. Por ejemplo, si Sigma es igual al conjunto formado por a y b, la cadena abba tiene longitud 4. La cadena vacía épsilon tiene longitud 0. Dado un alfabeto Sigma, definimos Sigma estrella como el conjunto de todas las cadenas que pueden formarse con los símbolos de Sigma, incluyendo la cadena vacía. Si Sigma es {a,b}, entonces Sigma estrella es el conjunto formado por épsilon, a, b, aa, ab, ba, bb, aaa, y así. Es un conjunto infinito. Y ahora la definición clave: un lenguaje es simplemente un subconjunto de Sigma estrella. Es un conjunto de cadenas. Puede ser finito o infinito. Con esta definición, todo lo que hemos estudiado adquiere una formulación más precisa. El conjunto de identificadores válidos en Python es un lenguaje. El conjunto de números enteros decimales es un lenguaje. El conjunto de cadenas que acepta un autómata finito M es un lenguaje, y se denota L(M).

---

## Operaciones fundamentales sobre cadenas

<div class="two-col">
  <div class="col">
    <div class ="card">
    <h3 class="card-title" sytle="color:var(--accent-success)")><strong>Concatenación</strong></h3>
    <p>Si \(x = \text{abc}\) e \(y = \text{de}\), su concatenación \(x.y\) (u omitiendo el punto, \(xy\)) es \(\text{abcde}\).</p>
    <div class="flipped-callout">
      <p>\(x\epsilon = \epsilon x = x\)</p>
      <p>El épsilon actúa como el elemento neutro de la concatenación.</p> 
    </div>
    </div>
  </div>
  <div class="col">
        <div class="card">
    <h3 class="card-title"><strong>Exponenciación</strong></h3>
    <p>Concatenación repetida de una cadena sobre sí misma:</p>
    <ul>
      <li>\(s^0 = \epsilon\)</li>
      <li>\(s^1 = s\)</li>
      <li>\(s^i = s^{i-1}.s \quad (\forall i > 0)\)</li>
      <li><em>Ejemplo: si \(s = \text{ab}\) \(\rightarrow s^2 = \text{abab}\), \(s^3 = \text{ababab}\).</em></li>
    </ul>
    </div>
  </div>
</div>

Note:
Sobre las cadenas podemos definir algunas operaciones que van a aparecer frecuentemente. La concatenación de dos cadenas x e y es simplemente ponerlas una detrás de la otra. Si x es igual a abc e y es de, la concatenación es abcde. El operador punto se omite habitualmente. Una propiedad importante: cualquier cadena concatenada con épsilon da la misma cadena. La exponenciación de una cadena es concatenación repetida. Si s es una cadena, s a la cero es épsilon, s a la i es s a la i menos uno por s. Por ejemplo, si s es ab, s al cuadrado es abab y s al cubo es ababab. La exponenciación s a la cero igual a épsilon es consistente con la convención usual de que cualquier cosa elevada a cero da el neutro de la operación.

---

## Operaciones sobre lenguajes

<p>Dados dos lenguajes \(L\) y \(M\) definidos sobre un alfabeto común \(\Sigma\), definimos:</p>
<div class="grid-2">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-union"></i></span>Unión</h4>
    <p style="font-size: 0.85rem;">\(L \cup M = \{s \mid s \in L \text{ o } s \in M\}\)</p>
    <p style="font-size: 0.75rem; color: var(--text-muted);">Cadenas que están en al menos uno de los lenguajes.</p>
  </div>  
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-link"></i></span>Concatenación</h4>
    <p style="font-size: 0.85rem;">\(L.M = \{st \mid s \in L \text{ y } t \in M\}\)</p>
    <p style="font-size: 0.75rem; color: var(--text-muted);">Cadenas formadas por una cadena de L seguida de una de M.</p>
  </div>
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-asterisk"></i></span>Estrella de Kleene</h4>
    <p style="font-size: 0.85rem;">\(L^* = \bigcup_{i=0}^{\infty} L^i\)</p>
    <p style="font-size: 0.75rem; color: var(--text-muted);">Cero o más concatenaciones de cadenas de L. Siempre incluye \(\epsilon\).</p>
  </div>
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-plus"></i></span>Clausura Positiva</h4>
    <p style="font-size: 0.85rem;">\(L^+ = \bigcup_{i=1}^{\infty} L^i\)</p>
    <p style="font-size: 0.75rem; color: var(--text-muted);">Una o más concatenaciones de cadenas de L. Excluye \(\epsilon\) (salvo que \(\epsilon \in L\)).</p>
  </div>
</div>

Note:
Así como operamos sobre cadenas, podemos operar sobre lenguajes. Dados dos lenguajes L y M, definimos tres operaciones fundamentales. La unión L unión M es el conjunto de cadenas que pertenecen a L, a M, o a ambos. La concatenación L punto M es el conjunto de todas las cadenas que se forman tomando una cadena de L seguida de una cadena de M. La estrella de Kleene L estrella es la unión de todas las potencias de L, incluyendo la cadena vacía épsilon. La cerradura positiva L más es similar, pero excluye la potencia cero, es decir, no garantiza la inclusión de épsilon de forma gratuita; incluye solo cadenas formadas por una o más letras del lenguaje de origen.

---

## Ejemplos prácticos de operaciones

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <p>Consideremos los conjuntos de base del análisis léxico:</p>
    <p>\(L = \{\text{a}, \text{b}, \dots, \text{z}\} \quad \text{(letras)}\)</p>
    <p style="margin-bottom: 20px;">\(D = \{\text{0}, \text{1}, \dots, \text{9}\} \quad \text{(dígitos)}\)</p>    
    <div class="flipped-callout">
      <ul>
        <li>\(L \cup D\) = Conjunto de todas las letras y dígitos individuales.</li>
        <li>\(L.D\) = Cadenas compuestas de una letra seguida de un dígito (ej: <code>a0, b5, z9</code>).</li>
        <li>\(L^4\) = Cadenas de exactamente 4 letras.</li>
        <li>\(L^*\) = Todas las palabras posibles compuestas únicamente por letras (incluyendo la palabra vacía).</li>
      </ul>
    </div>
  </div>
  <div class="col">
    
  </div>
</div>

Note:
Fíjense que ya usamos implícitamente esta notación cuando describimos tokens. Un identificador de un lenguaje de programación podría describirse como L punto, y entre paréntesis L unión D, todo eso elevado a la estrella. Es decir: una letra seguida de cero o más letras o dígitos. Esa descripción con operaciones sobre lenguajes tiene un nombre: expresión regular. Lo vamos a explorar en profundidad a continuación.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> Si tenemos los lenguajes <span class="math-lang">\(L = \{\text{ab}\}\)</span> y <span class="math-lang">\(M = \{\text{x}\}\)</span>, ¿qué cadenas componen el lenguaje concatenado y cerrado <span class="math-lang">\(L.M^*\)</span>?</span>
<p>Elige la opción correcta</p>
</div>

<div class="quiz-container">
  <div class="quiz-option" data-correct="true">
    Cadenas que comienzan exactamente con "ab" seguido de cualquier cantidad (cero o más) de "x" (ej: ab, abx, abxx, abxxx...).
  </div>
  <div class="quiz-option" data-correct="false">
    Únicamente las cadenas "ab" y "x", así como su unión y repetición infinita.
  </div>
  <div class="quiz-option" data-correct="false">
    Cadenas vacías y secuencias repetidas alternadas como abx, abxabx, abxabxabx...
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="El lenguaje <span class='math-lang'>L</span> tiene una sola cadena 'ab', y <span class='math-lang'>M<sup>*</sup></span> contiene {ε, x, xx, xxx...}. Al concatenarlos, cada cadena resultante debe tener la forma 'ab' (de <span class='math-lang'>L</span>) seguida de alguna cadena de <span class='math-lang'>M<sup>*</sup></span>." 
     data-incorrect-explain="Recuerda el orden de precedencia y la definición: <span class='math-lang'>L.M<sup>*</sup></span> significa concatenar una cadena perteneciente a <span class='math-lang'>L</span> a la izquierda con una cadena perteneciente a <span class='math-lang'>M<sup>*</sup></span> a la derecha.">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta ayuda a verificar que los alumnos comprendan cómo opera la concatenación cuando uno de los lenguajes está afectado por el operador estrella de Kleene.

---

## Lenguaje Regular: La definición formal

<div class="two-col">
  <div class="col">
    <div class="flipped-callout-bis">
      <h4><i class="fas fa-bookmark"></i> Definición</h4>
      <p style="font-size: 1.15rem;">Un lenguaje \(L\) se denomina <strong>lenguaje regular</strong> si y solo si existe un autómata finito \(M\) tal que \(L = L(M)\).</p>
    </div>
    <p>El conjunto de cadenas aceptadas por el autómata define el lenguaje.</p>    
    <h4 style="margin-top: 15px;">Casos extremos pero regulares:</h4>
    <ul>
      <li>\(L = \Sigma^*\) (Todas las cadenas posibles)</li>
      <li>\(L = \emptyset\) (Lenguaje vacío, ninguna cadena)</li>
      <li>\(L = \{\epsilon\}\) (Solo la cadena vacía)</li>
    </ul>
  </div>
  
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 20px;">
      <video src="videos/c04/v03_lenguajesregulares.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Ahora podemos dar la definición que da nombre a este video. Un lenguaje regular es un lenguaje que puede ser reconocido por algún autómata finito. Formalmente: L es regular si existe un AFD M tal que L es igual a L(M). Todos los lenguajes que hemos visto hasta ahora son regulares: identificadores, enteros, reales, palabras reservadas. Hay tres casos especiales que vale la pena mencionar explícitamente, porque muestran los extremos del concepto. El autómata que acepta todas las cadenas posibles, el autómata que no acepta ninguna cadena (su lenguaje es el conjunto vacío), y el autómata que acepta solo la cadena vacía. Los tres son regulares.

---

## Propiedades de cierre

<div class="two-col">
  <div class="col">
    <p>Los lenguajes regulares poseen una propiedad fundamental: son <strong>cerrados</strong> bajo las operaciones de <strong>unión</strong>, <strong>concatenación</strong> y <strong>estrella de Kleene</strong>.</p>
    <div class="flipped-callout">
      <p>Si \(L\) y \(M\) son lenguajes regulares, entonces:</p>
      <p style="text-align: center; font-size:1.1rem; font-weight: bold; color: var(--accent-success);">
        \(L \cup M\),  \(L.M\)  y  \(L^*\)
      </p>
      <p>¡también son lenguajes regulares!</p>
    </div>
    <p style="font-size: 0.9rem;"><strong>Demostración constructiva:</strong> Para demostrar que el resultado es regular, basta con ver cómo combinar los autómatas originales usando transiciones \(\epsilon\).</p>
  </div>
  
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 20px;">
      <video src="videos/c04/v04_operacionesLR.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Ahora viene un resultado muy útil: los lenguajes regulares son cerrados bajo unión, concatenación y estrella de Kleene. Esto significa que si L1 y L2 son regulares, entonces la unión, concatenación y estrella de Kleene también lo son. La demostración no es complicada, y es constructiva: para cada operación, se muestra cómo construir un autómata que reconozca el resultado a partir de los autómatas de base. La consecuencia práctica es importante: podemos construir autómatas para lenguajes complejos combinando autómatas más simples con estas operaciones. Y esa es exactamente la estrategia que usa Lex internamente.

---

## Demostración visual: Unión de lenguajes regulares

<div class="two-col">
  <div class="col">
    <p style="font-size: 0.95rem;">Se toman los autómatas \(M_1\) y \(M_2\) que reconozcan \(L_1\) y \(L_2\) respectivamente. Se crea un nuevo estado inicial y se trazan <strong>transiciones \(\epsilon\)</strong> hacia los estados iniciales de \(M_1\) y \(M_2\).</p>    
    <div class="flipped-callout-bis" style="font-size: 0.9rem;">
      <p>El autómata de la derecha es un <strong>AFND-\(\epsilon\)</strong>. Como demostramos en la clase anterior, todo AFND-\(\epsilon\) tiene un AFD equivalente, por lo que el lenguaje unión sigue siendo regular.</p>
    </div>
  </div>  
  <div class="col">
    <div class="diagram-wrap" style="width:100%;">
      <!-- SVG que modela la Unión de dos Autómatas M1 y M2 -->
      <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="arrow-uni" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="var(--text-muted)"/></marker></defs>
        <!-- Estado inicial nuevo -->
        <circle cx="50" cy="120" r="22" fill="var(--card-bg)" stroke="var(--accent-color)" stroke-width="2"/>
        <text x="50" y="125" text-anchor="middle" fill="var(--text-color)" font-size="12">Inicio</text>
        <line x1="10" y1="120" x2="28" y2="120" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-uni)"/>        
        <!-- Flecha arriba (M1) -->
        <path d="M 68 105 Q 110 50 155 50" fill="none" stroke="var(--text-muted)" stroke-dasharray="4,3" stroke-width="2" marker-end="url(#arrow-uni)"/>
        <text x="105" y="65" fill="var(--accent-secondary)" font-size="14" font-weight="bold">ε</text>        
        <!-- Caja M1 -->
        <rect x="160" y="20" width="160" height="70" rx="6" fill="var(--card-bg)" stroke="var(--accent-secondary)" stroke-width="2"/>
        <text x="240" y="60" text-anchor="middle" fill="var(--text-color)" font-size="16" font-weight="bold">Autómata M1</text>        
        <!-- Flecha abajo (M2) -->
        <path d="M 68 135 Q 110 190 155 190" fill="none" stroke="var(--text-muted)" stroke-dasharray="4,3" stroke-width="2" marker-end="url(#arrow-uni)"/>
        <text x="105" y="185" fill="var(--accent-secondary)" font-size="14" font-weight="bold">ε</text>        
        <!-- Caja M2 -->
        <rect x="160" y="150" width="160" height="70" rx="6" fill="var(--card-bg)" stroke="var(--accent-secondary)" stroke-width="2"/>
        <text x="240" y="190" text-anchor="middle" fill="var(--text-color)" font-size="16" font-weight="bold">Autómata M2</text>
      </svg>
    </div>
  </div>
</div>

Note:
Para la unión: Si M1 reconoce L1 y M2 reconoce L2, construimos un nuevo autómata con un estado inicial fresco que tiene transiciones épsilon hacia el estado inicial de M1 y hacia el estado inicial de M2. El nuevo autómata puede seguir cualquiera de los dos caminos de manera no determinista, y acepta si alguno de los dos autómatas originales acepta. Como ya vimos, este AFND resultante puede convertirse a un AFD equivalente.

---

## Concatenación y Clausura de Kleene
<p>Sean los autómatas \(M_1\) y \(M_2\) que reconocen los lenguajes \(L_1\) y \(L_2\), respectivamente.</p>
<div class="grid-2">
  <div class="card">
    <h4 class="card-title">Concatenación (\(L_1.L_2\))</h4>
    <p style="font-size: 0.85rem; line-height: 1.5;">Cada estado aceptador de \(M_1\) deja de ser de aceptación. Se conecta con el estado inicial de \(M_2\) mediante una <strong>transición \(\epsilon\)</strong>.</p>
    <div style="border: 1px dashed var(--border-color); padding: 8px; margin-top: 10px; border-radius: 6px; text-align: center;">
      <span style="font-size:1.4rem; color: var(--accent-color);">[M1] \(\xrightarrow{\epsilon}\) [M2]</span>
    </div>
  </div>
  
  <div class="card">
    <h4 class="card-title">Estrella de Kleene (\(L_1^*\))</h4>
    <p style="font-size: 0.85rem; line-height: 1.5;">Se añade un nuevo estado inicial (también de aceptación, para admitir la transición vacía, \(\epsilon\)). Se conecta con el inicial original y se añade un retorno \(\epsilon\) desde los finales hacia el inicial.</p>
    <div style="border: 1px dashed var(--border-color); padding: 8px; margin-top: 10px; border-radius: 6px; text-align: center;">
      <span style="font-size:1.4rem; color: var(--accent-success);">[Inicio] \(\xrightarrow{\epsilon}\) [M1] \(\xrightarrow{\epsilon}\) [Inicio]</span>
    </div>
  </div>
</div>
<!--
<div class="card" style="border: 2px dashed var(--accent-success); padding: 12px; border-radius: 8px; margin-top: 15px; text-align: center; background: rgba(16, 185, 129, 0.05);">
  <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">
    <strong>Detalle de diseño:</strong> Para la concatenación, el flujo atraviesa secuencialmente el primer autómata y continúa en el segundo. Para la estrella de Kleene, se habilita tanto el bypass (puente de longitud cero) como la repetición cíclica (lazo de retorno).
  </p>
</div> -->

Note:
Concatenación: El estado o estados de aceptación de M1 dejan de ser de aceptación, y se les agrega una transición épsilon hacia el estado inicial de M2. El autómata recorre M1 primero, y cuando M1 aceptaría, continúa de forma inmediata en M2. Acepta si completa ambos de forma secuencial. Estrella de Kleene: Se agrega al autómata M1 un nuevo estado inicial que también es de aceptación —para incluir la cadena vacía— y una transición épsilon desde los estados de aceptación de M1 de vuelta al estado inicial. Esto permite "repetir" el autómata cero o más veces.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> Dados dos lenguajes regulares <span class="math-lang">\(L_1\)</span> y <span class="math-lang">\(L_2\)</span>, si aplicamos la operación <span class="math-lang">\((L_1 \cup L_2)^*\)</span>, ¿el lenguaje resultante sigue siendo regular?</span>
<p>Elige la opción correcta</p>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">
    No, al combinar la estrella de Kleene con la unión se rompe el determinismo y deja de ser regular.
  </div>
  <div class="quiz-option" data-correct="true">
    Sí, porque los regulares son cerrados bajo la unión, y el resultado de la unión también es cerrado bajo la estrella de Kleene.
  </div>
  <div class="quiz-option" data-correct="false">
    Solo si L1 y L2 no tienen elementos en común, de lo contrario la intersección rompe la propiedad.
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="Las propiedades de cierre actúan algebraicamente. Si aplicamos operaciones de cierre válidas sobre conjuntos regulares, el resultado final obligatoriamente sigue perteneciendo a los lenguajes regulares." 
     data-incorrect-explain="Recuerda las propiedades de cierre: no importa el orden o la anidación en la que se apliquen unión, concatenación o clausura; el resultado final siempre será representable por un autómata finito y, por tanto, es regular.">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta conceptual reafirma la importancia de las leyes de clausura para poder hacer composiciones de expresiones regulares complejas en lexers reales.

---

## Límite de los autómatas finitos

<div class="two-col">
  <div class="col">
    <p>Intentemos diseñar un autómata finito para reconocer expresiones matemáticas con paréntesis bien anidados. Ej: <code>( ( ) ( ) )</code> es correcto, pero <code>( ( )</code> no.</p>
    <div class="flipped-callout">
      <h4>El obstáculo técnico</h4>
      <p>Para validar que los paréntesis de cierre coincidan con los de apertura, el autómata debe <strong>contar</strong> cuántos paréntesis de apertura siguen abiertos.</p>
    </div>
    <p style="text-align:left">Como el anidamiento puede ser arbitrariamente profundo, necesitaríamos <strong>infinitos estados</strong> para registrar este conteo. Pero un autómata es <strong>finito</strong>.</p>
  </div>
  
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 20px;">
      <video src="videos/c04/v05_limitesAF.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Llegamos al corazón del video. Hasta ahora todo parece indicar que los autómatas finitos son muy poderosos. Pero hay algo que no pueden hacer, y es importante entender por qué. Pensemos en este lenguaje: el conjunto de todas las expresiones con paréntesis balanceados. Por ejemplo, paréntesis abierto-cerrado o anidados pertenecen al lenguaje. Paréntesis que abren pero no cierran no pertenecen. La condición es que cada paréntesis de apertura debe tener exactamente un paréntesis de cierre correspondiente, y el anidamiento debe ser correcto. ¿Puede un autómata finito reconocer este lenguaje? La respuesta intuitiva es no. Para verificar que los paréntesis están balanceados, el autómata necesitaría recordar cuántos paréntesis de apertura ha leído que todavía no fueron cerrados. Ese número puede ser arbitrariamente grande. Pero un autómata finito tiene un número fijo de estados —no puede crecer ilimitadamente según la entrada. No tiene memoria suficiente. Para hacer este argumento preciso, existe una herramienta llamada el lema del bombeo.

---

## El Lema del Bombeo (Pumping Lemma)

<div class="two-col">
  <div class="col">
    <div class="flipped-callout">
      <p><strong>Idea intuitiva:</strong> Si un lenguaje es regular, tiene un autómata con \(k\) estados. Si le damos una cadena muy larga (longitud \(\ge k\)), el autómata debe repetir al menos un estado.</p>
    </div>
    <p style="font-size: 0.9rem;">Esa repetición genera un <strong>ciclo</strong> en el recorrido del autómata.</p>
    <p style="font-size: 0.9rem;">Podemos recorrer ese ciclo cero, una, o muchas veces (<strong>"bombear"</strong>) y el autómata seguirá aceptando la cadena resultante.</p>
  </div>
  
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 20px;">
      <video src="videos/c04/v06_lemabombeo.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
      <p style="font-size:0.9rem; text-align:center; color:var(--accent-danger); font-weight:bold;"><i class="fas fa-exclamation-triangle"></i> Demostración por contradicción: el lenguaje no es regular.</p>
  </div>
</div>

Note:
El lema del bombeo —en inglés, pumping lemma— establece una propiedad que todos los lenguajes regulares deben cumplir. Si un lenguaje no cumple esa propiedad, entonces definitivamente no es regular. La idea informal es la siguiente: si un lenguaje es regular, existe un autómata finito M que lo reconoce. Ese autómata tiene una cantidad fija de estados. Si le damos a M una cadena suficientemente larga —más larga que la cantidad de estados— el autómata va a tener que visitar algún estado más de una vez mientras la procesa. Eso significa que hay un "ciclo" en el recorrido del autómata. Si hay un ciclo, podemos "bombear" ese ciclo: recorrerlo cero veces, una vez, dos veces, tres veces... y en todos esos casos el autómata sigue aceptando, porque el ciclo no cambia si termina en un estado de aceptación o no. Eso implica que hay una subcadena que se puede repetir arbitrariamente, y todas las cadenas resultantes siguen perteneciendo al lenguaje. Más formalmente: si L es regular, entonces para toda cadena w perteneciente a L suficientemente larga, w se puede dividir como w = xyz, donde la subcadena y se puede repetir p veces (con p mayor o igual a cero) y la cadena resultante x y a la p z sigue perteneciendo a L.

---

## Más sobre el lema

<div class="flipped-callout-bis">
  <p><strong>Teorema:</strong> El lenguaje \(L = \{a^n b^n \mid n \ge 0\}\) no es regular (no hay autómata finito para él).</p>
</div>
<div class="two-col">
  <div class="col">
    <div class="video-player-wrapper" style="margin: 15px auto;">
      <video src="videos/c04/v07_consecuenciabombeo.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
  <div class="col">
    <div class="flipped-callout-bis">
      <p>Responde:</br>
      <span class="emoji-float" > 🤔</span> El lenguaje \(L = \{x^n y^n \mid n \ge 0\ \land  n \le 5\}\) es regular? </p>
    </div>
  <!--
    <p style="font-size:0.85rem;"><strong>Demostración por contradicción:</strong></p>
    <ol style="font-size:0.8rem; line-height:1.5;">
      <li>Supongamos que \(L\) es regular \(\rightarrow\) existe un AFD con \(k\) estados.</li>
      <li>Tomamos la cadena \(w = a^k b^k\). Como \(|w| = 2k \ge k\), se aplica el lema \(\rightarrow w = xyz\) con \(|xy| \le k\) e \(|y| \ge 1\).</li>
      <li>Dado que \(|xy| \le k\), la subcadena \(y\) debe estar compuesta <strong>únicamente de letras 'a'</strong>.</li>
      <li>Bombeamos \(y\) haciendo \(p = 2\): la cadena resultante es \(xy^2z\).</li>
      <li>Esta nueva cadena tendrá la forma \(a^{k + |y|} b^k\). Como \(|y| \ge 1\), habrá más letras 'a' que 'b' (\(k + |y| \ne k\)).</li>
      <li>La cadena resultante <strong>no pertenece al lenguaje</strong>. Esto contradice el lema del bombeo.</li>
    </ol> -->
  </div>
</div>  

Note:
Veamos cómo se usa el lema del bombeo para demostrar que un lenguaje no es regular. El ejemplo canónico es el lenguaje L de las cadenas formadas por n letras a seguidas de n letras b. Este lenguaje es similar al de los paréntesis balanceados: cada a es como un paréntesis de apertura y cada b como uno de cierre. La estrategia es por contradicción: supongamos que L es regular. Entonces existe un AFD M que lo reconoce, con alguna cantidad k de estados. Tomemos la cadena w = a a la k, b a la k. Es una cadena de L y es suficientemente larga para aplicar el lema. Cuando M procesa las k letras a iniciales, recorre k más un estados. Como M tiene solo k estados, por el principio del palomar algún estado se visita dos veces durante ese recorrido. Eso significa que hay un ciclo en la parte de las a. Por el lema del bombeo, podemos dividir w = xyz donde y está contenida en la parte de las a. Si "bombeamos" y —la repetimos p veces— obtenemos la cadena x, y a la p, z. Como y está compuesta solo de as, al repetirla p veces da una cadena con un número diferente de as y bs. En todos los casos posibles, al bombear obtenemos cadenas que no pertenecen a L. Eso contradice la conclusión del lema del bombeo. La contradicción prueba que nuestra suposición inicial era falsa: el lenguaje no es regular.

---

## Consecuencias para el compilador

<div class="grid-2">
  <div class="card">
    <h4 class="card-title" style="color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-check-circle"></i></span>Lo que el Analizador Léxico SÍ hace</h4>
    <p style="font-size:0.85rem;">Identifica tokens: identificadores, palabras reservadas, números, constantes, operadores y comentarios.</p></br>
    <p style="font-size:0.75rem; color: var(--text-muted);">Tienen estructura lineal \(\rightarrow\) <strong>Lenguajes Regulares (AFD)</strong>.</p>
  </div>
  
  <div class="card">
    <h4 class="card-title" style="color: var(--accent-danger) !important;"><span class="icon"><i class="fas fa-times-circle"></i></span>Lo que el Analizador Léxico NO puede hacer</h4>
    <p style="font-size:0.85rem;">Validar anidamiento de estructuras como paréntesis, llaves de funciones, o bloques <code>if/else</code>.</p></br>
    <p style="font-size:0.75rem; color: var(--text-muted);">Requiere contar/sintaxis \(\rightarrow\) <strong>No alcanza con Lenguajes Regulares</strong>.</p>
  </div>
</div>

<div class="flipped-callout" style="margin-top: 15px;">
  <p><i class="fas fa-arrow-right"></i> Por esta razón conceptual, el compilador separa la fase del <strong>Analizador Léxico</strong> (Autómatas Finitos) de la del <strong>Analizador Sintáctico</strong> (estudiaremos otro tipo de autómatas en la Unidad 3!)</p>
</div>

Note:
Esta demostración tiene consecuencias directas para el diseño de compiladores. Los autómatas finitos pueden reconocer identificadores, palabras reservadas, operadores, constantes, comentarios. Todos estos tienen una estructura regular: no requieren contar ni recordar historia arbitraria. Son exactamente el dominio del análisis léxico. Los autómatas finitos no pueden reconocer expresiones con paréntesis bien balanceados de anidamiento arbitrario, estructuras de bloque correctamente anidadas como if-end, begin-end, llaves abiertas y cerradas, ni sentencias correctamente formadas según la gramática del lenguaje. Esta es la razón por la cual el compilador no puede hacer todo con un solo autómata finito. El análisis léxico —tokens— es dominio de los AF. El análisis sintáctico —estructura del programa— requiere un modelo más potente: los autómatas con pila. Eso es exactamente lo que vamos a estudiar en la Unidad 3.

---

## Expresiones regulares

<div class="two-col">
  <div class="col">
    <p>Dibujar un autómata o escribir descripciones naturales largas es poco práctico.</p>
    <div class="flipped-callout-bis">
      <p>Una <strong>expresión regular (ER)</strong> o patrón es una notación formal compacta que describe un conjunto de cadenas sin enumerarlas.</p>
    </div>
    <p style="font-size:0.95rem;"><strong>Ejemplo cotidiano:</strong></br>El patrón <code style="color:var(--accent-color)">Mar(i|ia|ti)na </code> describe (o representa) a los nombres: <code>Marina</code>, <code>Mariana</code> y <code>Martina</code>.</p>
  </div>

  <div class="col">
    <p style="font-size:0.9rem; text-align:center; color:var(--accent-danger); font-weight:bold;"><i class="fas fa-pencil"></i> Definición de <strong>Expresión Regular</strong></p>
    <div class="video-player-wrapper" style="margin-top: 10px;">
      <video src="videos/c04/v08_definicionER.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>

Note:
Hasta ahora estuvimos trabajando con autómatas finitos: diagramas de estados que nos permiten reconocer cadenas de un lenguaje. Pero hay algo que todavía no resolvimos del todo: ¿cómo describimos el lenguaje que reconoce un autómata, de manera compacta y precisa? Miremos este autómata que ya conocemos, el que reconoce identificadores en un lenguaje de programación. Si alguien nos pregunta qué cadenas acepta, podemos decir "una letra seguida de cero o más letras o dígitos". Eso está bien, pero es una descripción en lenguaje natural, informal. ¿Existe una notación más precisa, más compacta, que no dependa de dibujar el autómata ni de escribir una oración? La respuesta es sí, y esa notación se llama expresión regular. En este video vamos a ver qué son las expresiones regulares, cómo se definen formalmente, y cómo se usan para describir lenguajes.

---

## Definición formal y recursiva de las ER

<p style="font-size:0.95rem;">Dada una expresión regular sobre un alfabeto \(\Sigma\), se define de manera <strong>recursiva</strong>:</p>

<div class="grid-2" style="grid-gap: 15px !important;">
  <div class="card" style="padding: 10px !important;">
    <h4 class="card-title" style="font-size:0.95rem !important;"><span class="badge" style="background:var(--accent-secondary); color:white;">Base 1</span> El vacío \(\emptyset\)</h4>
    <p style="font-size:0.8rem; margin:0;">Es una ER que denota el conjunto vacío \(\emptyset\) (ninguna cadena).</p>
  </div>
  
  <div class="card" style="padding: 10px !important;">
    <h4 class="card-title" style="font-size:0.95rem !important;"><span class="badge" style="background:var(--accent-secondary); color:white;">Base 2</span> El épsilon \(\epsilon\)</h4>
    <p style="font-size:0.8rem; margin:0;">Es una ER que denota el lenguaje \(\{\epsilon\}\) (únicamente la cadena vacía).</p>
  </div>

  <div class="card" style="padding: 10px !important;">
    <h4 class="card-title" style="font-size:0.95rem !important;"><span class="badge" style="background:var(--accent-secondary); color:white;">Base 3</span> Símbolo \(a \in \Sigma\)</h4>
    <p style="font-size:0.8rem; margin:0;">Es una ER que denota el lenguaje \(\{a\}\) (cadena de longitud 1).</p>
  </div>

  <div class="card" style="padding: 10px !important;">
    <h4 class="card-title" style="font-size:0.95rem !important;"><span class="badge" style="background:var(--accent-success); color:white;">Paso</span> Operaciones</h4>
    <p style="font-size:0.80rem; margin:0; line-height: 1.3;">Si \(r\) y \(s\) son ER, entonces son ER:
      <br><strong>Unión:</strong> \(r \mid s \rightarrow L(r) \cup L(s)\)
      <br><strong>Concatenación:</strong> \(r s \rightarrow L(r).L(s)\)
      <br><strong>Clausura:</strong> \(r^* \rightarrow L(r)^*\)
    </p>
  </div>
</div>

<p style="font-size: 0.75rem; text-align: center; color: var(--text-muted); margin-top: 10px;">Precedencia de operadores (mayor a menor): Clausura (\(^*\)) \(\rightarrow\) Concatenación (sin símbolo) \(\rightarrow\) Unión (\(\mid\)). Los paréntesis alteran el orden.</p>

Note:
La definición formal de expresión regular es recursiva. Eso significa que las expresiones complejas se construyen a partir de expresiones más simples. Vamos regla por regla. Regla 1: el símbolo vacío es una expresión regular. Representa el conjunto vacío. Regla 2: épsilon es una expresión regular. Representa el lenguaje que contiene únicamente la cadena vacía. Ojo: no es el lenguaje vacío, es el lenguaje que tiene exactamente un elemento de longitud cero. Regla 3: si a es un símbolo del alfabeto Sigma, entonces a por sí solo es una expresión regular. Representa el lenguaje que contiene solo esa cadena de longitud uno. Hasta acá tenemos los casos base de la definición. Regla 4: si r y s son expresiones regulares, entonces podemos construir nuevas expresiones regulares combinándolas con los tres operadores. La unión r barra s representa la unión de los lenguajes, la concatenación rs representa el producto, y la estrella de Kleene r estrella representa la clausura. La precedencia de los operadores es: clausura, concatenación y unión.


---

## Ejemplos con el alfabeto  Σ = \{a, b\}
<div class="two-col">
  <div class="col">
<table class="compare-table" style="line-height: 1.4;">
  <tr>
    <th>Expresión Regular</th>
    <th>Ejemplos de cadenas aceptadas</th>
  </tr>
  <tr>
    <td><code>a | b</code></td>
    <td>\(a, b\) (una sola letra)</td>
  </tr>
  <tr>
    <td><code>(a | b)(a | b)</code></td>
    <td>\(aa, ab, ba, bb\)</td>
  </tr>
  <tr>
    <td><code>a*</code></td>
    <td>\(\epsilon, a, aa, aaa, aaaa, \dots\)</td>
  </tr>
  <tr>
    <td><code>(a | b)*</code></td>
    <td>\(\epsilon, a, b, ab, ba, abba, babab, \dots\)</td>
  </tr>
  <tr>
    <td><code>a*b</code></td>
    <td>\(b, ab, aab, aaab, aaaab, \dots\)</td>
  </tr>
  <tr>
    <td><code>a | a*b</code></td>
    <td>\(a, b, ab, aab, aaab, \dots\)</td>
  </tr>
</table>
</div>
<div class="col">
    <div class="video-player-wrapper">
      <video src="videos/c04/v09_ejemplosER.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
 
</div>

Note:
Vamos a ver una serie de ejemplos sobre el alfabeto Sigma formado por a y b, para que estas reglas queden bien claras. La expresión a barra b representa el conjunto {a, b}. La expresión entre paréntesis a barra b concatenada consigo misma representa todas las cadenas de longitud exactamente 2. La expresión a estrella representa la cadena vacía y todas las repeticiones de a. La expresión entre paréntesis a barra b elevado a la estrella es particularmente importante: representa todas las cadenas posibles formadas con as y bs, en cualquier orden y cantidad, incluyendo la cadena vacía. En otras palabras, es exactamente Sigma estrella. La expresión a estrella b representa el conjunto formado por b, ab, aab, aaab, y así. Y finalmente, a barra a estrella b representa la unión de a con el conjunto anterior.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Qué tipo de cadenas describe la expresión regular <span class="math-lang"><code>(a|b)*abb</code></span> sobre el alfabeto <span class="math-lang">\(\Sigma = \{a, b\}\)</span>?</span>
<p>Elige la opción correcta</p>
</div>

<div class="quiz-container">
  <div class="quiz-option" data-correct="false">
    Únicamente la cadena exacta "abb", dado que el operador estrella de Kleene inicial se anula al concatenarse.
  </div>
  <div class="quiz-option" data-correct="false">
    Cadenas que contienen "abb" en el medio de la palabra, rodeadas por cualquier cantidad de caracteres.
  </div>
    <div class="quiz-option" data-correct="true">
    Cualquier combinación de caracteres "a" y "b" (incluyendo la cadena vacía de base), con la condición obligatoria de terminar exactamente con la secuencia "abb".
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="El fragmento (a|b)* representa cualquier cadena del alfabeto, y al estar concatenada a su derecha con 'abb', obliga a que toda cadena válida finalice con esa secuencia exacta." 
     data-incorrect-explain="Analiza la estructura: (a|b)* representa Σ*, es decir, cualquier prefijo. 'abb' es el sufijo de coincidencia obligatoria al no haber más elementos después de este.">
</div>

Note:
[AUTOEVALUACIÓN] Esta autoevaluación permite verificar que los estudiantes comprendan cómo restringir patrones de cadenas usando prefijos libres y sufijos fijos.

---

## Ejemplo: Identificadores en programación

<div class="two-col">
  <div class="col">
    <p>Volvamos al ejemplo del autómata que reconoce identificadores. La regla descriptiva es: <em>"Una letra seguida de cero o más letras o dígitos"</em>.</p>
    <div class="flipped-callout">
      <p><strong>En notación de Expresión Regular:</strong></p>
      <p style="text-align:center; font-size:1.3rem; font-weight:bold; color:var(--accent-color);">
        <code>letra (letra | dígito)*</code>
      </p>
    </div>
    <p style="font-size: 0.85rem; line-height: 1.5;">Donde definimos los alias auxiliares:</p>
    <ul style="font-size: 0.8rem; line-height: 1.4;">
      <li><code>letra = a | b | ... | z | A | ... | Z</code></li>
      <li><code>dígito = 0 | 1 | ... | 9</code></li>
    </ul>
  </div>

  <div class="col">
    <div class="card" style="border: 2px dashed var(--accent-secondary); padding: 15px; border-radius: 8px; margin: 10px 0; text-align: center; background: rgba(99, 102, 241, 0.05); display: flex; flex-direction: column; justify-content: center; height: 90%;">
      <div><img src="img/u2_afd_identif_simplif.png" style="align:center"></img></div>
    </div>
  </div>
</div>

Note:
Volvamos al ejemplo del comienzo: los identificadores en un lenguaje de programación. Sabemos que un identificador es una letra seguida de cero o más letras o dígitos. La expresión regular es letra, seguido de letra barra dígito entre paréntesis, y todo esto elevado a la estrella. ¿Cómo se lee? Una letra seguida de cero o más símbolos que pueden ser letras o dígitos. Es habitual y conveniente definir nombres para subexpresiones que se usan repetidamente, como letra y dígito. Esto es exactamente lo que hacen herramientas como Lex cuando describimos los tokens de un lenguaje: usamos expresiones con nombres auxiliares para definir patrones de manera legible.

---

## Teorema de Kleene

<div class="two-col">
  <div class="col">
    <div class="flipped-callout-bis">
      <h4>Teorema de Kleene</h4>
      <p style="font-size:1.15rem; line-weight:1.5;"><strong>Un lenguaje es regular si y solo si puede describirse mediante una expresión regular.</strong></p>
    </div>
    <p style="font-size:0.9rem; margin-top:15px;">Esto demuestra que las <strong>ER</strong> y los <strong>Autómatas Finitos</strong> tienen exactamente el mismo poder de expresión.</p>
  </div>
  
  <div class="col">
    <div class="card" style="border: 2px dashed var(--accent-warning); padding: 15px; border-radius: 8px; margin: 10px 0; text-align: center; background: rgba(245, 158, 11, 0.05); display: flex; flex-direction: column; justify-content: center; height: 90%;">
      <div><img src="img/u2_teoremaKleene.png" style="align:center"></img></div>
      <p> A continuación demostraremos el teorema en los dos sentidos:</br>
          ➡️ Para una ER existe un AF equivalente </br>
          ⬅️ Para un AF existe una ER equivalente
      </p>
   <!--   <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
        <strong>Descripción para producción:</strong> Gráfico de equivalencia matemática de doble sentido. A la izquierda: Expresión Regular r. A la derecha: Autómata Finito M. Hay dos flechas anchas de conexión: Flecha superior de izquierda a derecha etiquetada como 'Construcción de Thompson (ER -> AFND)'. Flecha inferior de derecha a izquierda etiquetada como 'Método de Ecuaciones (AF -> ER)'.
      </p> -->
    </div>
  </div>
</div>

Note:
En este bloque vamos a formalizar la conexión entre expresiones regulares y autómatas a través del Teorema de Kleene. El teorema dice algo muy concreto: Un lenguaje es regular si y solo si es reconocido por un autómata finito. "Si y solo si" significa que hay que demostrarlo en dos sentidos. Primero: dado un lenguaje regular —representado por una expresión regular— existe un autómata finito que lo reconoce. Segundo: dado un autómata finito, existe una expresión regular que describe su lenguaje. Vamos con cada uno.

---

## De ER a AFND: Construcción de Thompson

<div class="two-col">
  <div class="col">
    <p style="font-size:0.95rem;">Es un algoritmo constructivo inductivo. Construye autómatas simples para las bases y los combina mediante <strong>transiciones \(\epsilon\)</strong>.</p>    
    <div class="flipped-callout" style="font-size:0.85rem;">
      <h4 style="font-size:0.95rem !important;"><i class="fas fa-brick-layout"></i> Casos Base:</h4>
      <ul>
        <li><strong>Vacío (\(\emptyset\)):</strong> Dos estados sin transiciones.</li>
        <li><strong>Épsilon (\(\epsilon\)):</strong> Dos estados unidos por una transición \(\epsilon\).</li>
        <li><strong>Símbolo (\(a\)):</strong> Dos estados unidos por una transición etiquetada con 'a'.</li>
      </ul>
    </div>
    <p>Para combinar autómatas intermedios \(M_1\) y \(M_2\):</p>
    <ul style="font-size:0.85rem; line-height:1.45;">
      <li><strong>Unión (\(r \mid s\)):</strong> Se introduce un estado inicial y un estado final nuevos. Se conectan mediante transiciones \(\epsilon\) a las entradas y salidas de \(M_1\) y \(M_2\).</li>
      <li><strong>Concatenación (\(rs\)):</strong> Se conecta el estado de aceptación de \(M_1\) directamente al inicial de \(M_2\) vía \(\epsilon\).</li>
      <li><strong>Clausura (\(r^*\)):</strong> Se añade un nuevo camino \(\epsilon\) para saltear el autómata (longitud 0) y un lazo de retorno \(\epsilon\) para repetir el ciclo.</li>
    </ul>

  </div>

  <div class="col">
    <div class="video-player-wrapper" >
      <video src="videos/c04/v10_Kleene_parte1.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
    <p> ➡️ Para una ER existe un AF equivalente       </p>
  </div>
</div>

Note:
Para demostrar que cualquier expresión regular puede convertirse en un autómata finito, vamos a usar un método constructivo llamado construcción de Thompson. La idea es simple: como las expresiones regulares se definen recursivamente, podemos construir un autómata para cada regla de esa definición, y luego combinarlos. El autómata que construimos es un AFND porque las transiciones vacías épsilon facilitan enormemente la construcción. Empecemos por los casos base: para el conjunto vacío, un autómata con estado inicial y final pero sin transiciones; para épsilon, un autómata con una única transición vacía; y para un símbolo a, un autómata con dos estados y una transición etiquetada con a.


---

## De Autómata a ER: El método de ecuaciones

<div class="two-col">
  <div class="col">
    <p>Para hacer el camino inverso (pasar de un autómata finito a su Expresión Regular), planteamos un <strong>sistema de ecuaciones algebraicas</strong>.</p>    
    <div class="flipped-callout">
      <h4>Lema de Kleene (o Lema de Arden)</h4>
      <p>Si \(\omega, \beta\) y \(\gamma\) son expresiones regulares, y \(\epsilon \notin L(\gamma)\), la ecuación:</p>
      <p style="text-align:center; font-size:1.15rem; font-weight:bold; color:var(--accent-secondary);">
        \(\omega = \beta + \omega \gamma\)
      </p>
      <p>tiene la solución única:</p>
      <p style="text-align:center; font-size:1.15rem; font-weight:bold; color:var(--accent-success);">
        \(\omega = \beta \gamma^*\)
      </p>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 10px;">
      <video src="videos/c04/v11_metodoecuaciones.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
    <p> ⬅️ Para un AF existe una ER equivalente   </p>
  </div>
</div>

Note:
Ahora vamos en el otro sentido: dado un autómata finito, queremos encontrar una expresión regular que describa su lenguaje. Para esto vamos a usar un método sistemático basado en un sistema de ecuaciones. La idea es traducir la información del autómata a ecuaciones algebraicas sobre expresiones regulares, y luego resolverlas. Antes de ver el método, necesitamos un lema que nos va a permitir resolver esas ecuaciones. El lema dice que si omega, beta y gama son expresiones regulares, y gama no contiene la cadena vacía, entonces la ecuación omega igual a beta más omega gama tiene una única solución: omega igual a beta por gama estrella. Podemos pensarlo de manera análoga a despejar una variable en álgebra.

---

## Planteando el sistema de ecuaciones

<p style="font-size:0.95rem;">El algoritmo se estructura en tres pasos definidos:</p>

<div class="grid-2">
  <div class="card">
    <h4 class="card-title"><span class="badge" style="background:var(--accent-secondary); color:white;">Paso 1</span> Asignación de variables</h4>
    <p style="font-size:0.8rem;">Para cada estado \(s_i\) del autómata, definimos una variable \(\omega_{s_i}\) que representa el conjunto de cadenas que llegan a él.</p>
  </div>
  
  <div class="card">
    <h4 class="card-title"><span class="badge" style="background:var(--accent-secondary); color:white;">Paso 2</span> Planteo de ecuaciones</h4>
    <p style="font-size:0.8rem;">Por cada estado, sumamos términos por cada arco incidente. Si hay una transición de \(s_j\) a \(s_i\) con el símbolo \(a\), agregamos \(\omega_{s_j}.a\). Al estado inicial le agregamos sumando \(\epsilon\).</p>
  </div>

  <div class="card">
    <h4 class="card-title"><span class="badge" style="background:var(--accent-success); color:white;">Paso 3</span> Resolución algebraica</h4>
    <p style="font-size:0.8rem;">Resolvemos el sistema de ecuaciones mediante sustituciones sucesivas y aplicando el lema de Kleene para eliminar auto-referencias de variables.</p>
  </div>

  <div class="card">
    <h4 class="card-title"><span class="badge" style="background:var(--accent-success); color:white;">Solución</span> Unión final</h4>
    <p style="font-size:0.8rem;">La Expresión Regular solución del lenguaje del autómata es el valor obtenido para la variable del estado de aceptación. Si hay varios estados finales, se realiza la unión (\(\mid\)) de sus resultados.</p>
  </div>
</div>

Note:
El método tiene tres pasos. Paso 1: para cada estado del autómata, definimos una variable omega sub s i que representa el conjunto de todas las cadenas que conducen al autómata desde el inicio hasta ese estado. Paso 2: para cada estado, planteamos una ecuación mirando todos los arcos que llegan a ese estado. Si existe una transición desde s j hasta s i con el símbolo a, agregamos el término omega sub s j por a a la ecuación. Si hay varios arcos, sumamos un término por cada uno. La ecuación para el estado inicial siempre incluye un término adicional más épsilon, porque la cadena vacía ya te sitúa en el estado inicial al comenzar. Paso 3: resolvemos el sistema aplicando el lema, haciendo sustituciones hasta despejar la variable asociada al estado de aceptación.

---

## Ejemplo completo: Planteo

<div class="two-col">
  <div class="col">
    <p style="font-size: 0.9rem;">Analicemos el autómata de tres estados \(s_0, s_1, s_2\). El alfabeto es \(\{a, b\}\), el inicial es \(s_0\) y el único final es \(s_1\).</p>    
    <div class="flipped-callout-bis" style="font-size: 0.85rem;">
      <p><strong>Planteamos las ecuaciones de arcos entrantes:</strong></p>
      <ul>
        <li>\(\omega_{s_0} = \omega_{s_0} a + \omega_{s_2} b + \epsilon \quad \text{(inicial, más ε)}\)</li>
        <li>\(\omega_{s_1} = \omega_{s_1} a + \omega_{s_0} b\)</li>
        <li>\(\omega_{s_2} = \omega_{s_2} a + \omega_{s_1} b\)</li>
      </ul>
    </div>
  </div>

  <div class="col">
    <div class="card" style="border: 2px dashed var(--accent-warning); padding: 15px; border-radius: 8px; margin: 10px 0; text-align: center; background: rgba(245, 158, 11, 0.05); display: flex; flex-direction: column; justify-content: center; height: 90%;">
          <div><img src="img/u2_af_er.png" style="align:center"></img></div>
    </div>
  </div>
</div>

Note:
Vamos a aplicar el método sobre un ejemplo concreto. El autómata tiene tres estados: s0, s1 y s2. El alfabeto es a y b. El estado inicial es s0 y el único estado de aceptación es s1. Mirando el diagrama, no es inmediatamente obvio qué lenguaje reconoce este autómata. Tenemos tres estados, entonces planteamos tres ecuaciones. Para s0: omega sub s0 igual a omega sub s0 por a, más omega sub s2 por b, más épsilon. Para s1: omega sub s1 igual a omega sub s1 por a, más omega sub s0 por b. Para s2: omega sub s2 igual a omega sub s2 por a, más omega sub s1 por b.

---

## Ejemplo completo: Resolución paso a paso

<div class="two-col">
  <div class="col" style="font-size: 0.72rem; line-height: 1.45; text-align:left">
    <p><strong>1. Aplicamos el lema \(\omega = \beta \gamma^*\) a cada ecuación:</strong></p>
    <ul>
      <li>(1) \(\omega_{s_0} = (\omega_{s_2} b + \epsilon) a^*\)</li>
      <li>(2) \(\omega_{s_1} = (\omega_{s_0} b) a^*\)</li>
      <li>(3) \(\omega_{s_2} = (\omega_{s_1} b) a^*\)</li>
    </ul>    
    <p><strong>2. Sustituimos (1) en (2):</strong></p>
    <p>\(\omega_{s_1} = (\omega_{s_2} b + \epsilon) a^* b a^* = \omega_{s_2} b a^* b a^* + a^* b a^* \quad (4)\)</p>    
    <p><strong>3. Sustituimos (3) en (4):</strong></p>
    <p>\(\omega_{s_1} = \omega_{s_1} b a^* b a^* b a^* + a^* b a^* \quad (5)\)</p>    
    <p><strong>4. Volvemos a aplicar el lema a (5):</strong></p>
    <p>Donde \(\gamma = b a^* b a^* b a^*\) y \(\beta = a^* b a^*\):</p>
    <p style="font-size: 0.8rem; font-weight: bold; color: var(--accent-success); text-align: center;">
      \(\omega_{s_1} = a^* b a^* (b a^* b a^* b a^*)^*\)
    </p>
  </div>
  
  <div class="col">
    <div class="video-player-wrapper" style="margin-top: 15px;">
      <video src="videos/c04/v12_ejemploecuaciones.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
</div>

Note:
Ahora aplicamos el lema a las tres ecuaciones. En la ecuación de s0, la variable omega sub s0 aparece en ambos lados. El término que la acompaña es a, entonces gama es a, y todo lo demás es beta. Obtenemos las tres ecuaciones resueltas en base a las variables externas. Como el estado de aceptación es s1, necesitamos despejar omega sub s1. Hacemos sustituciones encadenadas. Sustituimos la expresión de omega sub s0 en la ecuación de omega sub s1, expandimos los términos, y luego sustituimos la expresión de omega sub s2. ¡Volvemos a tener omega sub s1 en ambos lados de la ecuación! Aplicamos el lema una vez más con gama igual a b a estrella b a estrella b a estrella, y beta igual a a estrella b a estrella. Obtenemos la expresión regular buscada.

---

## Interpretación del resultado

<div class="two-col">
  <div class="col">
    <div class="flipped-callout">
      <h4>¿Qué lenguaje describe?</h4>
      <p style="font-size: 0.85rem; line-height: 1.4;">Cadenas formadas por un número de letras "b" que sea exactamente múltiplo de 3 más 1 (\(3k+1\) letras "b" con \(k \ge 0\)), con cualquier número de letras "a" intercaladas en cualquier parte de la cadena.</p>
      <p style="text-align: center; font-size: 0.95rem; font-weight: bold; color: var(--accent-color);">
        \(L = \{w \mid w \text{ tiene } 3k+1 \text{ b's, } k \ge 0\}\)
      </p>
    </div>
  </div>

  <div class="col" style="font-size:0.75rem; line-height: 1.35;">
    <div><img src="img/u2_af_er_2.png" style="align:center"></img></div>
  </div>
</div>

Note:
¿Qué lenguaje describe este resultado que obtuvimos? Cadenas con exactamente 3k más 1 ocurrencias de b, con k mayor o igual a cero, y cualquier cantidad de as intercaladas. Un resultado que no era para nada obvio mirando el autómata, y que el método nos permitió encontrar de manera sistemática. Para cerrar la clase, les propongo realizar estos ejercicios: escribir las expresiones regulares para los tres lenguajes propuestos sobre los alfabetos dados, y resolver el sistema de ecuaciones para el autómata de ejercicio mostrado en la diapositiva.

---


## ¡Ejercitamos lo aprendido!

<div class="grid-2">
  <div class="card" style="font-size:0.75rem; line-height: 1.35;">
    <h4 class="card-title" style="font-size: 0.95rem !important;"><span class="icon"><i class="fas fa-pencil-alt"></i></span>Ejercicio 1</h4>
    <p>Escribir las expresiones regulares para los lenguajes:</p>
    <ol>
          <li>Cadenas con número impar de \(x\)'s, (\(\Sigma=\{x\}\)).</li>
          <li>Palabras con exactamente una letra \('a'\), (\(\Sigma=\{a,b\}\)).</li>
          <li>Palabras que comiencen exactamente con \('b'\), (\(\Sigma=\{a,b\}\)).</li>
    </ol>
  </div>

  <div class="card" style="font-size:0.75rem; line-height: 1.35;">
    <h4 class="card-title" style="font-size: 0.95rem !important;"><span class="icon"><i class="fas fa-pencil-alt"></i></span>Ejercicio 2</h4>
    <p>Obtener la expresión regular para el lenguaje reconocido por el autómata:</p>
    <div><img src="img/ejercicios_finales_c04.png" style="align:center"></img></div>    
  </div>  
</div>
<div class="flipped-callout" style="margin-top: 20px !important; padding: 12px !important;">
  <p style="font-size: 0.85rem; margin: 0; font-weight: bold; text-align: center;">
    <i class="fas fa-info-circle"></i> Traé los ejercicios resueltos a la clase presencial. Los discutiremos y validaremos en grupo.
  </p>
</div>


---

## Resumen de la clase

<div class="grid-2">
  <div class="card">
    <h4 class="card-title" ><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos</h4>
    <ul style="font-size:0.78rem; line-height:1.45;">
      <li>Un <strong>lenguaje</strong> es un conjunto de cadenas. Es <strong>regular</strong> si existe un autómata finito capaz de reconocerlo.</li>
      <li>Los lenguajes regulares son <strong>cerrados</strong> bajo unión, concatenación y clausura de Kleene.</li>
      <li>Los autómatas tienen <strong>límites</strong>: carecen de memoria para contar niveles arbitrarios de anidamientos (demostrado por el <strong>Lema del Bombeo</strong>).</li>
      <li>Las <strong>ER</strong> son expresiones algebraicas equivalentes a los autómatas finitos (Teorema de Kleene).</li>
      <li>Se puede alternar entre ER y AFND con la <strong>Construcción de Thompson</strong> y el <strong>Método de Ecuaciones</strong>.</li>
    </ul>
  </div>            
  <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <h4 class="card-title" style="color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección</h4>
      <p style="text-align:left; font-size:0.85rem; color:var(--text-muted); line-height: 1.4;">
        Estudiaremos las <strong>Gramáticas Regulares</strong> para cerrar formalmente la Unidad 2, y veremos cómo se integra todo esto en la herramienta de generación de analizadores léxicos <strong>Lex</strong>.
      </p>
    </div>        
  </div>    
</div>
<div class="flipped-callout" style="margin: 0; padding: 10px;">
      <p style="font-size:0.75rem; text-align: center; margin:0;"><strong>Recordatorio:</strong> Completa las actividades prácticas de la plataforma antes del encuentro presencial.</p>
    </div>

Note:
Cerramos esta clase con las ideas centrales. El Teorema de Kleene establece la equivalencia completa entre expresiones regulares y autómatas finitos: son dos formas distintas de describir exactamente la misma clase de lenguajes, los lenguajes regulares. Para convertir una ER en un autómata usamos la construcción de Thompson. Para hacer el camino inverso, planteamos un sistema de ecuaciones sobre el autómata y lo resolvemos usando el lema de Kleene. Estos resultados no son solo teóricos. En la siguiente lección vamos a ver cómo las expresiones regulares son exactamente la herramienta que usa el analizador léxico para describir los tokens de un lenguaje de programación, y cómo herramientas como Lex automatizan todo este proceso. Hasta la próxima.

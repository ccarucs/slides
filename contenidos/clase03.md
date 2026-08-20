
<!--  HOJA DE RUTA --->
<h2>¿Qué vamos a aprender?</h2>
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta de la clase </span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px;  font-weight: bold;">
      <li>Definición de autómata finito no determinista</li>
      <li>Cadena aceptada por autómata finito no determinista</li>
      <li>Transiciones ε (épsilon)</li>
      <li>Conversión a autómata determinista</li>
      <li><strong>Autómatas Finitos:</strong> Mecanismos de reconocimiento.</li>
    </ul>       
  </div>  
  <div>
    <div class="video-player-wrapper">
      <video src="videos/u2_afnd/u2_afnd_01_introduccion.mp4" poster="img/alumnos_compu.png" controls></video>
    </div>
  </div>  
</div>
<div class="flipped-callout" style="margin-top: 10px !important;
  margin-bottom: 10px !important;
  padding: 15px !important;">
  <h4><i class="fas fa-lightbulb"></i> Recuerda:</h4>
  <p>Mirá esta clase teórica antes de la clase presencial en la Facultad</p>
</div>

---
## Repaso rápido: el AFD

<div class="two-col">
  <div class="col">
    <p>Un <strong>Autómata Finito Determinista</strong> es una quíntupla <strong>M = (S, Σ, δ, s₀, F)</strong>, donde δ es una función que, dado un estado y un símbolo, devuelve <strong>exactamente un estado</strong>.</p>
    <div class="flipped-callout">
    <p><strong>Aceptación:</strong> M acepta x₁x₂…xₙ si existe una secuencia de estados s₀,s₁,…,sₙ tal que sₙ ∈ F y cada δ(sⱼ₋₁, xⱼ) = sⱼ es válida.</p>
    </div>
    <p style="text-align:left">Hay un <strong>único camino</strong> posible para cada cadena. Ese camino termina en aceptación o en rechazo. Ahora veamos qué pasa cuando relajamos esa restricción.</p>
    <div >
      <audio src="videos/u2_afnd/03_afd_definicion.m4a" controls style="display: block; margin: 0 auto;"></audio>
    </div>
  </div>
  <div class="col">
    <p><strong>Ejemplo de la clase anterior</strong></p>
    <div><img src="img/u2_afd_identif.png" style="align:center; width:90%"></img></div>
</div>

</div>

Note:
Antes de introducir el no determinismo, un repaso breve. Un Autómata Finito Determinista es una quíntupla M = (S, Σ, δ, s₀, F), donde δ es una función que dado un estado y un símbolo devuelve exactamente un estado. Eso es el determinismo: una entrada, una respuesta, sin ambigüedad. La condición de aceptación es la ya vista: el autómata acepta la cadena x₁x₂...xₙ si existe una secuencia de estados s₀, s₁, ..., sₙ tal que sₙ ∈ F y cada transición δ(sⱼ₋₁, xⱼ) = sⱼ es válida. Dicho de otra manera: hay un único camino posible para cada cadena, y ese camino o termina en un estado de aceptación —cadena válida— o no —cadena rechazada. Ahora, qué pasa cuando se relaja esa restricción.

---

## Cuando hay más de una opción

<div class="two-col">
  <div class="col">
    <p>En la clase anterior definimos el <strong>Autómata Finito Determinista (AFD)</strong>: en cada estado, para cada símbolo, existe <strong>exactamente una</strong> transición posible.</p>
    <div class="flipped-callout">
      <h4><i class="fas fa-lightbulb"></i> La pregunta de hoy</h4>
      <p>¿Qué pasa si un autómata puede tener <strong>más de una</strong> transición posible para el mismo símbolo? ¿O transiciones que no consumen ningún símbolo?</p>
    </div>
    <p>Eso es un <strong>Autómata Finito No Determinista (AFND)</strong>. Vamos a ver qué es, cómo acepta cadenas, y por qué —aunque parece más complicado— es una herramienta muy útil para <em>diseñar</em> autómatas.</p>
  </div>

  <div class="col">
    <div class="video-player-wrapper" >
    <video src="videos/u2_afnd/u2_afnd_02_definicion.mp4" poster="img/u0_02_play_video.png" controls></video>
  </div>
</div>


---

## Autómata Finito No Determinista

<div class="two-col">
  <div class="col">
    <p style="text-align:left">Formalmente, un AFND también se define como una quíntupla <strong>M = (S, Σ, δ, s₀, F)</strong>. </br>
    S, Σ, s₀ y F se definen igual que en el AFD. La diferencia está en <strong>δ</strong> (la función de transición):</p>
    <table  class="compare-table">
      <tr><th>AFD</th><th>AFND</th></tr>
      <tr><td>δ: S × Σ → S</td><td>δ: S × Σ → 𝒫(S)</td></tr>
      <tr><td>Devuelve un estado</td><td>Devuelve un <strong>conjunto</strong> de estados</td></tr>
    </table>
    <p><strong>𝒫(S)</strong> = conjunto de partes de S (todos los subconjuntos posibles). Si S tiene n estados, 𝒫(S) tiene <strong>2ⁿ</strong> subconjuntos. </p>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="width:100%">
        <video src="videos/u2_afnd/u2_afnd_03_cadenaaceptadaND.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>
  <div class="flipped-callout">
    <p><strong>Aceptación:</strong> el AFND acepta x₁x₂…xₙ si <strong>existe al menos una</strong> secuencia de estados desde s₀ hasta algún estado de F que corresponda a esa cadena.</p>
  </div>

---

## Responde la siguiente pregunta
<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> En un Autómata Finito No Determinista (AFND), si una cadena abre 10 caminos posibles, 9 de los cuales terminan en estados no finales, y solo 1 camino termina en un estado de aceptación:</span>
<p>Elige la opción correcta</p>
</div>

<div class="quiz-container">
  <div class="quiz-option" data-correct="true">
    La cadena es aceptada, ya que basta con que exista al menos un camino de aceptación.
  </div>
  <div class="quiz-option" data-correct="false">
    La cadena es rechazada, porque la mayoría de los caminos posibles no llegaron a un estado final.
  </div>
  <div class="quiz-option" data-correct="false">
    El autómata entra en un estado de error indefinido debido al conflicto de transiciones.
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="Esa es la esencia del no determinismo: se dice que la cadena es aceptada si existe al menos un camino exitoso que la consuma por completo y termine en un estado de aceptación." 
     data-incorrect-explain="Recuerda la definición de aceptación en un AFND: no se trata de promedios ni mayorías. Basta con que exista al menos una secuencia válida de transiciones que lleve a la aceptación.">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta sirve para verificar que los alumnos comprendan el concepto fundamental de la aceptación de cadenas en el no determinismo.

---


## ¿Por qué usar AFNDs?

<div class="two-col">
  <div class="col">
    <p style="text-align:left">Si los AFND son más complicados de entender, ¿para qué los usamos? </br>Rta: Porque son <strong>mucho más fáciles de diseñar</strong>, sobre todo cuando el lenguaje a reconocer tiene estructura de "elección".</p>
    <div class="video-player-wrapper" style="width:95%">
      <video src="videos/u2_afnd/u2_afnd_motivacion.mp4" poster="img/interrogacion.png" controls></video>
    </div>
  </div>
  <div class="col">
    <p><strong>Ejemplo:</strong>   
    <p>Un autómata que reconozca <strong>enteros</strong> (por ej. 23) y <strong>reales</strong> (por ej. 23.57) en notación decimal.</p>
    <ul>
      <li>Construir un AFD de enteros y otro AFD de reales por separado es fácil.</li>
      <li>Unir los AF, pero al leer el primer dígito, ¿vamos hacia la parte de enteros o hacia la de reales? </li>
      <li>El no determinismo permite tomar <strong>las dos decisiones al mismo tiempo</strong>: el estado inicial va a dos estados simultáneamente.</li>
    </ul>
  </div>
</div>

Note:
DESARROLLO — Bloque 4 — ¿Por qué usar AFNDs? Si los AFNDs son más complicados de entender, ¿para qué los usamos? La respuesta es: porque son mucho más fáciles de diseñar que los AFDs, especialmente cuando el lenguaje que queremos reconocer tiene una estructura que se presta a la "elección". Veamos el ejemplo de los números. Supongamos que queremos construir un autómata que reconozca tanto enteros como reales en notación decimal. Por ejemplo, 23 es un entero válido, 23.57 es un real válido. Una estrategia natural es: primero construimos un AFD que reconoce enteros, luego otro que reconoce reales, y después los unimos. El problema aparece en el estado inicial del autómata combinado: al leer un dígito, ¿vamos hacia la parte del autómata de enteros o hacia la del de reales? No lo sabemos de entrada. Necesitamos tomar las dos decisiones al mismo tiempo. Eso es exactamente lo que permite el no determinismo. El autómata combinado tiene no determinismo en el estado inicial: al leer el primer dígito, puede ir a dos estados distintos simultáneamente. El AFND resultante es compacto, intuitivo y refleja directamente la estructura del problema. El AFD equivalente puede ser más difícil de concebir directamente. El no determinismo nos da un lenguaje de diseño más expresivo.


---
## Tabla de transiciones
<p>Para representar AFND usamos las mismas formas que para los AFD: diagrama de estados o tabla de transiciones </p>
<div class="video-player-wrapper" style="width:70%">
    <video src="videos/u2_afnd/u2_afnd_tablatransiciones.mp4" poster="img/u0_02_play_video.png" controls></video>
</div>

---

## Una transición especial

<p>Un tipo de transición especial es la <strong>transición ε</strong> (épsilon). </br>
En pocas palabras: el autómata avanza (cambia de estado) pero no lee símbolo de la entrada</br>
Veamos un ejemplo: </p>
<div class="video-player-wrapper" style="width:70%">
    <video src="videos/u2_afnd/u2_afnd_transicionepsilon.mp4" poster="img/u0_02_play_video.png" controls></video>
</div>


---

## Transiciones ε

<div class="two-col">
  <div class="col">
  <p>Una transición <strong>ε</strong> (épsilon) es una transición que el autómata puede seguir <strong>sin leer ningún símbolo</strong> de la cinta: la cabeza lectora no avanza, el autómata cambia de estado sin consumir símbolo de la entrada.</p>
<div class="diagram-wrap" >
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-eps" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="var(--accent-color)"/></marker></defs>
<line x1="10" y1="110" x2="45" y2="110" stroke="var(--text-color)" stroke-width="2" marker-end="url(#arrow-eps)"/>
<circle cx="80" cy="110" r="32" fill="var(--card-bg)" stroke="var(--accent-color)" stroke-width="2.5"/>
<text x="80" y="116" text-anchor="middle" fill="var(--text-color)" font-family="'Fira Code', monospace" font-size="18">q0</text>
<circle cx="240" cy="110" r="32" fill="var(--card-bg)" stroke="var(--accent-color)" stroke-width="2.5"/>
<text x="240" y="116" text-anchor="middle" fill="var(--text-color)" font-family="'Fira Code', monospace" font-size="18">q1</text>
<circle cx="400" cy="110" r="32" fill="var(--card-bg)" stroke="var(--accent-color)" stroke-width="2.5"/>
<text x="400" y="116" text-anchor="middle" fill="var(--text-color)" font-family="'Fira Code', monospace" font-size="18">q2</text>
<circle cx="560" cy="110" r="32" fill="var(--card-bg)" stroke="var(--accent-success)" stroke-width="2.5"/>
<circle cx="560" cy="110" r="24" fill="none" stroke="var(--accent-success)" stroke-width="2"/>
<text x="560" y="116" text-anchor="middle" fill="var(--text-color)" font-family="'Fira Code', monospace" font-size="18">q3</text>
<line x1="112" y1="110" x2="205" y2="110" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-eps)"/>
<text x="155" y="98" text-anchor="middle" fill="var(--accent-warning)" font-family="'Fira Code', monospace" font-size="18">a</text>
<line x1="272" y1="110" x2="365" y2="110" stroke-dasharray="5,4" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-eps)"/>
<text x="318" y="98" text-anchor="middle" fill="var(--accent-secondary)" font-family="'Fira Code', monospace" font-size="18">ε</text>
<line x1="432" y1="110" x2="525" y2="110" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-eps)"/>
<text x="478" y="98" text-anchor="middle" fill="var(--accent-warning)" font-family="'Fira Code', monospace" font-size="18">a</text>
</svg>
</div>
  </div>
  <div class="col">
  <p style="color:var(--accent-success)"><strong>Siguiendo la cadena `aa`</strong></p>

| Paso | Estado | Cinta restante | Acción |
| --- | --- | --- | --- |
| 1 | q0 | a a | lee **a**, pasa a q1 |
| 2 | q1 | a | transición **ε**: la cabeza no se mueve, pasa a q2 |
| 3 | q2 | a | lee **a**, pasa a q3 |
| 4 | q3 (F) | — | cadena consumida completa, estado de aceptación |

  <p style="color:var(--accent-success); font-weight:600; text-align:center;"><i class="fas fa-check-circle"></i> El AFND acepta la cadena aa</p>
  </div>
</div>

Note:
Hay un caso especial de transición en los autómatas no deterministas que merece atención propia: las transiciones ε, transiciones épsilon, o transiciones vacías. Una transición ε es una transición que el autómata puede seguir sin leer ningún símbolo de la cinta. La cabeza lectora no avanza: el autómata simplemente cambia de estado "gratuitamente". Se tienen cuatro estados: q0, q1, q2, q3. Las transiciones son: q0 con a va a q1; q1 con ε (transición vacía, no consume símbolo) va a q2; q2 con a va a q3, estado de aceptación.
Sigamos la cadena aa a través de este autómata. El autómata comienza en q0. Lee el primer a y pasa a q1. La cabeza lectora ahora apunta al segundo a, pero el autómata sigue la transición ε hacia q2 sin leer nada: la cabeza no se mueve. Desde q2, lee el segundo a y llega a q3. La cadena fue consumida completa y el autómata está en un estado de aceptación. La cadena aa es aceptada. ¿Para qué sirven las transiciones ε? Son muy útiles para construir autómatas complejos a partir de autómatas más simples: se pueden "concatenar" autómatas conectando los estados finales de uno con el inicial del siguiente mediante transiciones ε, sin necesidad de consumir ningún símbolo en esa conexión. Es una herramienta de composición muy poderosa.

---


## AFD vs AFND: lo mejor de los dos

<div class="grid-2">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-code"></i></span>AFD — fácil de <strong>codificar</strong></h4>
    <p>La tabla de transiciones se traduce directamente en un programa. En cada paso hay exactamente una cosa que hacer: consultar la tabla, actualizar el estado.</p>
  </div>
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-diagram-project"></i></span>AFND — fácil de <strong>construir</strong></h4>
    <p>Para problemas complejos, pensar en términos de no determinismo es más natural. Pero implementarlo directamente exigiría explorar todos los caminos posibles (backtracking): costoso y complejo.</p>
  </div>
</div>

  <div class="video-player-wrapper">     
    <video src="videos/u2_afnd/u2_afnd_equivalencia.mp4" controls style="width:90%"></video>
  </div>

Note:
DESARROLLO —  AFD vs AFND: lo mejor de los dos. Llegamos al punto central de este video: ¿cuál usar? La situación es la siguiente: los AFDs son fáciles de implementar en código. La tabla de transiciones se traduce directamente en un programa, como vimos en el video anterior. En cada paso hay exactamente una cosa que hacer: consultar la tabla, actualizar el estado. Los AFNDs son más fáciles de diseñar. Para problemas complejos, pensar en términos de no determinismo es más natural. El autómata de enteros y reales es un buen ejemplo. Pero implementar un AFND directamente en código es difícil: habría que explorar todos los caminos posibles, retroceder cuando uno no funciona, y probar el siguiente. Es como una búsqueda con backtracking. Costoso y complejo. La solución es elegante: se diseña como AFND —aprovechando su expresividad— y se convierte a AFD para implementarlo. Y esto es posible gracias al siguiente teorema: para cada AFND existe un AFD que acepta exactamente el mismo lenguaje. AFD y AFND son equivalentes en poder expresivo: reconocen exactamente la misma clase de lenguajes. La diferencia es solo de conveniencia: cuál es más cómodo en cada etapa del proceso. Ese proceso de conversión —cómo transformar un AFND en un AFD equivalente— es lo que vamos a ver en el próximo video.


---

## Traducir ambigüedad en certeza
<p>Los AFND son cómodos para <strong>diseñar</strong>, pero difíciles de implementar. Los AFD son directamente traducibles a código. Y como son equivalentes, podemos combinar lo mejor de cada uno.</p>
<div class="two-col-flex ratio-40-60" >
  <div>
    <div class="flipped-callout">
      <h4><i class="fas fa-question"></i> La pregunta de este video</h4>
      <p>¿Cómo se hace, en concreto, la conversión de un AFND a un AFD?</p>
    </div>    
    </br>
    <div class="flipped-callout-bis">
      <h4><i class="fas fa-scale-balanced"></i> Teorema</h4>
      <p style="font-size:1.2rem"><strong>Para cada AFND existe un AFD que acepta exactamente el mismo lenguaje.</strong> AFD y AFND son equivalentes en poder expresivo.</p>
    </div> 
    </br>
    <!-- AFD y AFND son equivalentes en poder expresivo: la diferencia es solo de conveniencia según la etapa del proceso.</p> --> 
  </div>  
  <div>
    <div class="video-player-wrapper">     
      <video src="videos/u2_afnd/u2_afnd_teoremaequivalencia.mp4" poster="img/u0_02_play_video.png" controls style="width:90%"></video>
    </div>    
  </div>
</div>

---

## Explicación paso a paso

<p>Vemos el <strong>algoritmo de construcción de AFD a partir de un AFND </strong> sobre un ejemplo concreto, paso a paso.</p>
 <div class="video-player-wrapper">     
    <video src="videos/u2_afnd/u2_afnd_ejemploconversion.mp4" poster="img/u2_05_afnd.png" controls style="width:90%"></video>
  </div>  

---

## La idea central: estados como conjuntos

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <p>Dado el <strong>AFND</strong> M = (Q, Σ, δ, q₀, F), construimos el <strong>AFD</strong> M' = (Q', Σ', δ', q₀', F'):</p>
    <ul>
    <li><strong>Q'</strong> = 𝒫(Q). Si Q tiene n estados, Q' puede tener hasta 2ⁿ estados.</li>
    <li><strong>Σ'</strong> = Σ (el alfabeto es el mismo).</li>
    <li><strong>q₀'</strong> = se reduce a <code>[q₀]</code> (solo el estado incial de M).</li>
    <li><strong>F'</strong> = todo subconjunto de Q' que contenga <strong>al menos un</strong> estado de F.</li>
    <li><strong>δ'</strong>: δ'([q₁,…,qᵢ], a) = [] δ(q₁,a) ∪ … ∪ δ(qᵢ,a) ]</li>
    </ul>
  </div>
  <div class="col">      
      <img src="img/u2_05_afnd.png" style="align:center; width:80%"></img>
  </div>
</div>
<div class="flipped-callout">
  <p>Los estados del <strong>AFD resultante</strong> representan <strong>conjuntos</strong> de estados del AFND. En el ejemplo, en lugar de elegir entre s₁ y s₂, el AFD "está en {s₁, s₂}" al mismo tiempo, llevando registro de todas las posibilidades simultáneamente.</p>
  <p>Esto elimina el no determinismo: para cada símbolo hay un único <em>conjunto siguiente</em>.</p>
</div>

---

## La tabla completa de transiciones 
<p> Para el ejemplo, el AFND tiene 8 estados</p>

<div class="two-col">
<div class="col">

<table class="compare-table" style="font-size:0.7em;">
<tr><th>δ'</th><th>x</th><th>y</th></tr>
<tr><td>→ [s₀]</td><td>∅</td><td>[s₁,s₂]</td></tr>
<tr><td>[s₁]</td><td>[s₀]</td><td>∅</td></tr>
<tr><td>(F) [s₂]</td><td>∅</td><td>∅</td></tr>
<tr><td>[s₀,s₁]</td><td>[s₀]</td><td>[s₁,s₂]</td></tr>
<tr><td>(F) [s₁,s₂]</td><td>[s₀]</td><td>∅</td></tr>
<tr><td>(F) [s₀,s₂]</td><td>∅</td><td>[s₁,s₂]</td></tr>
<tr><td>(F) [s₀,s₁,s₂]</td><td>[s₀]</td><td>[s₁,s₂]</td></tr>
<tr><td>∅</td><td>∅</td><td>∅</td></tr>
</table>

</div>
<div class="col">

<p>Son los 8 estados esperados (2³). El AFD M' es <strong>correcto</strong>… pero bastante grande.</p>
<div class="flipped-callout">
<p><i class="fas fa-magnifying-glass"></i> ¿Podemos simplificarlo? (Ver próxima slide)</p>
</div>

</div>
</div>


---

## Eliminar estados inalcanzables

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <p style="text-align:left">Un estado es <strong>inalcanzable</strong> si ninguna flecha llega a él desde el estado inicial. Nunca va a ser visitado al procesar ninguna cadena → se puede <strong>eliminar sin cambiar el lenguaje</strong> reconocido.</p>
    <p>En nuestro ejemplo: [s₁], [s₂], [s₀,s₁], [s₀,s₂] y [s₀,s₁,s₂] son inalcanzables. Desde [s₀] solo se llega a [s₁,s₂], y desde [s₁,s₂] solo se vuelve a [s₀] o a [∅].</p>
    
  </div>
  <div class="col">
    <div class="video-player-wrapper" >
      <video src="videos/u2_afnd/u2_afnd_estadosinalcanzables.mp4" poster="img/u2_afnd_noalcanzables.png" controls></video>
    </div>
  </div>
</div>
<div class="flipped-callout">
      <p>El autómata solo circula realmente entre <strong>tres</strong> estados: [s₀], [s₁,s₂] y [∅] (sumidero).</p>
    </div>

---

<!-- .slide: data-menu-title=" - AFD final simplificado" -->
## El AFD equivalente, simplificado

<div class="two-col">
  <div class="col">
    <table class="compare-table" style="font-size:0.75em;">
    <tr><th>δ'</th><th>x</th><th>y</th></tr>
    <tr><td>→ [s₀]</td><td>∅</td><td>[s₁,s₂]</td></tr>
    <tr><td>(F) [s₁,s₂]</td><td>[s₀]</td><td>∅</td></tr>
    </table>
    <p style="margin-top:15px;">De un AFND con <strong>3 estados</strong> que requería explorar múltiples caminos, llegamos a un AFD con solo <strong>2 estados</strong>, implementable directamente con la estructura de código vista en el video anterior.</p>
  </div>
  <div class="col">
    <img src="img/u2_afnd_afd.png" style="align:center; width:80%"></img>
  </div>
</div>

---

## Responde la siguiente pregunta
<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> Si un AFND original tiene 5 estados, ¿cuál es la cantidad de estados máxima teórica y la cantidad habitual en la práctica para el AFD equivalente?</span>
<p>Elige la opción correcta</p>
</div>

<div class="quiz-container">
  <div class="quiz-option" data-correct="false">
    El máximo es 5 estados, ya que el AFD equivalente nunca puede tener más estados que el original.
  </div>
  <div class="quiz-option" data-correct="false">
    El AFD siempre tiene exactamente 32 estados, y todos deben implementarse obligatoriamente en el código.
  </div>
    <div class="quiz-option" data-correct="true">
    El máximo teórico es 32 estados (2⁵), pero en la práctica el autómata resultante suele tener muy pocos estados alcanzables (similar o ligeramente superior a 5).
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="El conjunto de partes de un conjunto de 5 estados tiene un tamaño de 2⁵ = 32. Sin embargo, la gran mayoría de estos estados son inalcanzables. En la práctica real de compiladores, el número de estados útiles es pequeño." 
     data-incorrect-explain="Recuerda que cada estado del AFD representa un subconjunto de estados del AFND. Por lo tanto, el número de estados posibles es el conjunto de partes (2ⁿ). No obstante, la mayoría de ellos serán inalcanzables y se eliminan.">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta evalúa la comprensión de la diferencia entre el tamaño del peor caso teórico exponencial y el comportamiento típico en la práctica.

---

<!-- .slide: data-menu-title="Construcción incremental " -->
## Una estrategia más eficiente: construcción incremental

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <p style="text-align:left">Generar los 2ⁿ estados y después eliminar los inalcanzables es correcto, pero <strong>ineficiente</strong> si el AFND tiene muchos estados (la serían mayoría descartados).</p>
    <p>La <strong>construcción incremental</strong> (o <em>lazy</em>) evita ese trabajo de más:</p>
    <ol style="text-align:left">
      <li>El estado inicial de M' es [q₀]. Se agrega a una lista de pendientes.</li>
      <li>Se toma el primer pendiente sin procesar; se calculan sus transiciones para cada símbolo.</li>
      <li>Si el resultado es un conjunto nuevo (no está aún en M'), se agrega a los pendientes.</li>
      <li>Se repite hasta que no queden pendientes.</li>
    </ol>
    <p>Así, solo se generan los estados <strong>alcanzables</strong>. </p>
  </div>
  <div class="col">
    <div class="video-player-wrapper">     
      <video src="videos/u2_afnd/u2_afnd_afd_simplificado.mp4"  controls style="width:90%"></video>
    </div>    
    <p>En este ejemplo, aplicando este algoritmo se obtiene directamente [s₀], [s₁,s₂] y [∅], sin pasar por los otros cinco estados.</p>
  </div>
</div>



---


## Autómata Finito Mínimo

<div class="video-slide-container">
<div>

<p>El AFD equivalente puede tener hasta 2ⁿ estados. En el <strong>peor caso</strong>, todos son alcanzables y ninguno se puede eliminar: existen lenguajes para los que el AFD mínimo es exponencialmente más grande que el AFND más compacto.</p>

<div class="flipped-callout">
<p><i class="fas fa-circle-check"></i> En la práctica —y especialmente en análisis léxico— esto raramente es un problema: los tokens de lenguajes de programación tienen estructura regular que no genera esa explosión.</p>
</div>

<p>Además, ese costo se paga <strong>una sola vez</strong>, al construir el compilador — no durante la compilación. Reconocer tokens con el AFD ya construido es tiempo constante por carácter.</p>

</div>

<div>
  <iframe src="lecturas/Minimizacion_de_Automatas.pdf" style="width: 100%; height: 500px; border: none; border-radius: 8px; max-height: none;"></iframe>
  <div style="display: flex; gap: 15px; justify-content: center; margin-top: 10px !important; font-size: 0.85rem !important;">
    <span style="color: var(--text-muted);">|</span>
    <a href="https://ingenieria.campusvirtual.ucasal.edu.ar/pluginfile.php/89193/mod_folder/content/0/Minimizacion%20de%20Automatas.pdf" target="_blank" style="color: var(--accent-secondary); font-weight: bold;">
      <i class="fas fa-external-link-alt"></i> Abrir 
    </a>
  </div>
</div>

</div>
</div>

Note:
DESARROLLO — Bloque 6 — ¿Y el tamaño importa? Vale la pena detenerse un momento en este punto. Dijimos que el AFD equivalente puede tener hasta 2ⁿ estados, siendo n la cantidad de estados del AFND. En el peor caso, todos esos estados son alcanzables y ninguno se puede eliminar. Ese peor caso existe: hay lenguajes para los cuales el AFD mínimo tiene exponencialmente más estados que el AFND más compacto. Sin embargo, en la práctica —y especialmente en el análisis léxico— esto raramente es un problema. Los autómatas que describen tokens de lenguajes de programación tienen una estructura regular que no genera esa explosión exponencial. Los AFDs resultantes son manejables. Además, ese costo se paga una sola vez: en el momento de construir el compilador, no durante la compilación. Una vez construido el AFD, reconocer tokens es una operación de tiempo constante por carácter: consultar la tabla, actualizar el estado. Eso es exactamente lo que hace Lex.

---

## Autómatas traductores

<div class="two-col">
  <div class="col">
  <p> Existen otros tipos de autómatas finitos, que además de reconocer cadenas, pueden <strong>generar un cómputo</strong>, es decir tienen una salida. Se trata de los autómatas finitos traductores, en particular, describimos los autómatas:</p>
  <ul>
    <li><strong>Máquina de Moore</strong>: el resultado está asociado al estado donde finaliza el autómata</li>
    <li><strong>Máquina de Mealy</strong>: el resultado está asociado a las transiciones del autómata</li>
  </ul>
  </div>
  <div class="col">
  <iframe src="lecturas/Maquinas_secuenciales.pdf" style="width: 100%; height: 500px; border: none; border-radius: 8px; max-height: none;"></iframe>
  <div style="display: flex; gap: 15px; justify-content: center; margin-top: 10px !important; font-size: 0.85rem !important;">
    <span style="color: var(--text-muted);">|</span>
    <a href="https://ingenieria.campusvirtual.ucasal.edu.ar/pluginfile.php/89193/mod_folder/content/0/Maquinas%20secuenciales.pdf" target="_blank" style="color: var(--accent-secondary); font-weight: bold;">
      <i class="fas fa-external-link-alt"></i> Abrir 
    </a>
  </div>
  </div>
</div>

---


## ¡Ejercitamos lo aprendido!

<div class="two-col">
  <div class="col">
    <p><strong>Para cada uno de los AFND de la imagen:</strong>
      <ol>
        <li>Indicar cuáles son las cadenas reconocidas</li>
        <li>Construir un AFD equivalente</li>
      </ol>
    </p>
  </div>
  <div class="col">
    <div><img src="img/ejercicios_finales_c03.png" style="align:center"></img></div>
  </div>
</div>
<div class="flipped-callout" style="margin-top: 20px !important; padding: 12px !important;">
  <p style="font-size: 0.85rem; margin: 0; font-weight: bold; text-align: center;">
    <i class="fas fa-info-circle"></i> Resolvé los ejercicios y traelos a la clase presencial. Los discutiremos y validaremos en grupo.
  </p>
</div>

---

<!-- SLIDE: Resumen de la Clase -->
<!--<section data-menu-title="Resumen" data-transition="slide-in fade-out"> -->
  <h2 class="text-gradient">Resumen de la Clase</h2> 
  <div class="grid-2">
    <div class="card">
      <h4 class="card-title" ><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos</h4>
      <ul>
        <li>Los <strong>AFND</strong> permiten múltiples transiciones para el mismo símbolo, o transiciones ε. Aceptan una cadena si <strong>existe al menos un camino</strong> exitoso.</li>
        <li>Son herramientas de <strong>diseño</strong> poderosas, pero difíciles de implementar directamente.</li>
        <li>El <strong>teorema de equivalencia:</strong> para cada AFND existe un AFD equivalente.</li>
        </ul>
    </div>          
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección</h4>
      <p style="margin-top:15px; text-align:center; color:var(--text-muted);"><strong>Expresiones regulares</strong> para representar lenguajes y su relación con el análisis léxico.</p>
    </div>    
  </div>
  <div class="flipped-callout-bis" style="margin-top:15px;">
    <p><strong>➡️ Resultado final:</strong> el poder de diseño del no determinismo, con la eficiencia de implementación del determinismo. Lo mejor de los dos mundos.</p>
  </div>
  <div class="flipped-callout" style="text-align: center;">
    <p><strong>⚠️ Recordatorio:</strong> Asegúrate de completar el cuestionario de autoevaluación en la plataforma antes de asistir a la clase presencial.</p>
  </div>
<!-- </section> -->

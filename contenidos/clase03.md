
<!--  HOJA DE RUTA --->
<h2>¿Qué vamos a aprender?</h2>
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="video-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta de la clase </span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px;  font-weight: bold;">
      <li>Definición de autómata finito no determinista</li>
      <li>Cadena aceptada por autómata finito no determinista</li>
      <li>Transiciones ε (épsilon)</li>
      <li>Conversión a autómata determinista</li>
      <li>Autómatas Finitos:</strong> Mecanismos de reconocimiento.</li>
    </ul>       
  </div>  
  <div>
    <div class="video-player-wrapper">
      <video src="videos/u2/u2_afnd_01_introduccion.mp4" poster="img/u0_02_play_video.png" controls></video>
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

## Cuando hay más de una opción

<div class="two-col">
  <div class="col">
    <p>En el video anterior definimos el <strong>Autómata Finito Determinista (AFD)</strong>: en cada estado, para cada símbolo, existe <strong>exactamente una</strong> transición posible.</p>
    <div class="flipped-callout">
      <h4><i class="fas fa-lightbulb"></i> La pregunta de hoy</h4>
      <p>¿Qué pasa si un autómata puede tener <strong>más de una</strong> transición posible para el mismo símbolo? ¿O transiciones que no consumen ningún símbolo?</p>
    </div>
    <p>Eso es un <strong>Autómata Finito No Determinista (AFND)</strong>. Vamos a ver qué es, cómo acepta cadenas, y por qué —aunque parece más complicado— es una herramienta muy útil para <em>diseñar</em> autómatas.</p>
  </div>

  <div class="col">
    <img src="img/u2_05_afnd.png" style="width:60%"></img>
    <p>Alfabeto Σ = {x, y}. Estado inicial: s₀. Estado de aceptación: s₂.</p>
    <ul>
      <li>Desde s₀, con <strong>y</strong>: se puede ir a <strong>s₁</strong> o a <strong>s₂</strong> — dos opciones para el mismo símbolo.</li>
      <li>Desde s₁, con <strong>x</strong>: se va a s₀.</li>
      <li>Desde s₂: no hay transiciones salientes.</li>
    </ul>
    <p>Esto <strong>no puede ocurrir</strong> en un AFD. Aquí sí: este es un AFND.</p>
  </div>
</div>

---

## Repaso rápido: el AFD

<p>Un <strong>Autómata Finito Determinista</strong> es una quíntupla <strong>M = (S, Σ, δ, s₀, F)</strong>, donde δ es una función que, dado un estado y un símbolo, devuelve <strong>exactamente un estado</strong>.</p>

<div class="flipped-callout">
<p><strong>Aceptación:</strong> M acepta x₁x₂…xₙ si existe una secuencia de estados s₀,s₁,…,sₙ tal que sₙ ∈ F y cada δ(sⱼ₋₁, xⱼ) = sⱼ es válida.</p>
</div>

<p style="text-align:left">Hay un <strong>único camino</strong> posible para cada cadena. Ese camino termina en aceptación o en rechazo. Ahora veamos qué pasa cuando relajamos esa restricción.</p>

</div>

---
## Autómata Finito No Determinista

<div class="two-col">
  <div class="col">
    <p>Formalmente, un AFND también se define como una quíntupla <strong>M = (S, Σ, δ, s₀, F)</strong>. S, Σ, s₀ y F se definen igual que en el AFD. La diferencia está en δ:</p>
    <table style="font-size:0.85rem;">
      <tr><th>AFD</th><th>AFND</th></tr>
      <tr><td>δ: S × Σ → S</td><td>δ: S × Σ → 𝒫(S)</td></tr>
      <tr><td>Devuelve un estado</td><td>Devuelve un <strong>conjunto</strong> de estados</td></tr>
    </table>
    <p><strong>𝒫(S)</strong> = conjunto de partes de S (todos los subconjuntos posibles). Si S tiene n estados, 𝒫(S) tiene <strong>2ⁿ</strong> subconjuntos. <em>(Esta observación va a ser clave en el Video 3b.)</em></p>
    <div class="flipped-callout">
      <p><strong>Aceptación:</strong> el AFND acepta x₁x₂…xₙ si <strong>existe al menos una</strong> secuencia de estados desde s₀ hasta algún estado de F que corresponda a esa cadena.</p>
    </div>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="width:100%">
        <video src="videos/u2/u2_afnd_02_definicion.mp4" poster="videos/u0_01_portada_video.png" controls></video>
    </div>
    <div class="video-meta">
        <span><i class="fas fa-video"></i> Video Explicativo</span>
    </div>
  </div>
</div>

---


## ¿Por qué usar AFNDs?

<div class="two-col">
  <div class="col">

  <p>Si son más complicados de entender, ¿para qué los usamos? Porque son <strong>mucho más fáciles de diseñar</strong>, sobre todo cuando el lenguaje a reconocer tiene estructura de "elección".</p>

  <p><strong>Ejemplo:</strong> un autómata que reconozca <strong>enteros</strong> (23) y <strong>reales</strong> (23.57) en notación decimal.</p>
  <ul>
    <li>Construir un AFD de enteros y otro de reales por separado es fácil.</li>
    <li>El problema: al leer el primer dígito, ¿vamos hacia la parte de enteros o hacia la de reales? No lo sabemos todavía.</li>
    <li>El no determinismo permite tomar <strong>las dos decisiones al mismo tiempo</strong>: el estado inicial va a dos estados simultáneamente.</li>
  </ul>

  </div>

  <div class="col">
    <img src="img/u2_06_afafnd.png" style="width:100%"></img>
    </div>
</div>

Note:
DESARROLLO — Bloque 4 — ¿Por qué usar AFNDs? Si los AFNDs son más complicados de entender, ¿para qué los usamos? La respuesta es: porque son mucho más fáciles de diseñar que los AFDs, especialmente cuando el lenguaje que queremos reconocer tiene una estructura que se presta a la "elección". Veamos el ejemplo de los números. Supongamos que queremos construir un autómata que reconozca tanto enteros como reales en notación decimal. Por ejemplo, 23 es un entero válido, 23.57 es un real válido. Una estrategia natural es: primero construimos un AFD que reconoce enteros, luego otro que reconoce reales, y después los unimos. El problema aparece en el estado inicial del autómata combinado: al leer un dígito, ¿vamos hacia la parte del autómata de enteros o hacia la del de reales? No lo sabemos de entrada. Necesitamos tomar las dos decisiones al mismo tiempo. Eso es exactamente lo que permite el no determinismo. El autómata combinado tiene no determinismo en el estado inicial: al leer el primer dígito, puede ir a dos estados distintos simultáneamente. El AFND resultante es compacto, intuitivo y refleja directamente la estructura del problema. El AFD equivalente puede ser más difícil de concebir directamente. El no determinismo nos da un lenguaje de diseño más expresivo.


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

<div class="flipped-callout" style="margin-top:20px;">
  <h4><i class="fas fa-scale-balanced"></i> Teorema</h4>
  <p style="font-size:1.2rem"><strong>Para cada AFND existe un AFD que acepta exactamente el mismo lenguaje.</strong> AFD y AFND son equivalentes en poder expresivo: la diferencia es solo de conveniencia según la etapa del proceso.</p>
</div>

Note:
DESARROLLO — Bloque 6 — AFD vs AFND: lo mejor de los dos. Llegamos al punto central de este video: ¿cuál usar? La situación es la siguiente: los AFDs son fáciles de implementar en código. La tabla de transiciones se traduce directamente en un programa, como vimos en el video anterior. En cada paso hay exactamente una cosa que hacer: consultar la tabla, actualizar el estado. Los AFNDs son más fáciles de diseñar. Para problemas complejos, pensar en términos de no determinismo es más natural. El autómata de enteros y reales es un buen ejemplo. Pero implementar un AFND directamente en código es difícil: habría que explorar todos los caminos posibles, retroceder cuando uno no funciona, y probar el siguiente. Es como una búsqueda con backtracking. Costoso y complejo. La solución es elegante: se diseña como AFND —aprovechando su expresividad— y se convierte a AFD para implementarlo. Y esto es posible gracias al siguiente teorema: para cada AFND existe un AFD que acepta exactamente el mismo lenguaje. AFD y AFND son equivalentes en poder expresivo: reconocen exactamente la misma clase de lenguajes. La diferencia es solo de conveniencia: cuál es más cómodo en cada etapa del proceso. Ese proceso de conversión —cómo transformar un AFND en un AFD equivalente— es lo que vamos a ver en el próximo video.


---

## Traducir ambigüedad en certeza
<p>Los AFND son cómodos para <strong>diseñar</strong>, pero difíciles de implementar. Los AFD son directamente traducibles a código. Y como son equivalentes, podemos combinar lo mejor de cada uno.</p>
<div class="two-col-flex ratio-40-60" >
  <div>
  <div class="flipped-callout">
    <h4><i class="fas fa-question"></i> La pregunta de este video</h4>
    <p>¿Cómo se hace, en concreto, la conversión de un AFND a un AFD?</p>
  </div>
   <p>Vamos a ver el <strong>algoritmo de construcción de subconjuntos</strong> sobre un ejemplo completo, paso a paso, y al final un truco para simplificar el resultado.</p>
  </div>
  <div class="video-player-wrapper">     
    <video src="videos/u2/u2_afnd_04_NDaD.mp4" poster="videos/u0_01_portada_video.png" controls style="width:90%"></video>
    <div class="video-meta">
      <span><i class="fas fa-video"></i> Video Explicativo</span>
    </div>
  </div>
<div>

---


## La idea central: estados como conjuntos

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <p>Dado el <strong>AFND</strong> M = (Q, Σ, δ, q₀, F), construimos el <strong>AFD</strong> M' = (Q', Σ', δ', q₀', F'):</p>
    <ul>
    <li><strong>Q'</strong> = 𝒫(Q). Si Q tiene n estados, Q' puede tener hasta 2ⁿ estados.</li>
    <li><strong>Σ'</strong> = Σ (el alfabeto es el mismo).</li>
    <li><strong>q₀'</strong> = [q₀] (subconjunto que contiene solo el estado inicial).</li>
    <li><strong>F'</strong> = todo subconjunto de Q' que contenga <strong>al menos un</strong> estado de F.</li>
    <li><strong>δ'</strong>: δ'([q₁,…,qᵢ], a) = δ(q₁,a) ∪ δ(q₂,a) ∪ … ∪ δ(qᵢ,a)</li>
    </ul>
  </div>

  <div class="col">
      <div class="flipped-callout">
        <p>Los estados del <strong>AFD resultante</strong> representan <strong>conjuntos</strong> de estados del AFND. En el ejemplo, e lugar de elegir entre s₁ y s₂, el AFD "está en {s₁, s₂}" al mismo tiempo, llevando registro de todas las posibilidades simultáneamente.</p>
        <p>Esto elimina el no determinismo: para cada símbolo hay un único <em>conjunto siguiente</em>.</p>
      </div>
      
  <div>
<div>

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
<p><i class="fas fa-magnifying-glass"></i> ¿Podemos simplificarlo? (spoiler: sí — próxima slide)</p>
</div>

</div>
</div>


---

## Eliminar estados inalcanzables

<div class="video-slide-container">
<div>

<p>Un estado es <strong>inalcanzable</strong> si ninguna flecha llega a él desde el estado inicial. Nunca va a ser visitado al procesar ninguna cadena → se puede <strong>eliminar sin cambiar el lenguaje</strong> reconocido.</p>

<p>En nuestro ejemplo: [s₁], [s₂], [s₀,s₁], [s₀,s₂] y [s₀,s₁,s₂] son inalcanzables. Desde [s₀] solo se llega a [s₁,s₂], y desde [s₁,s₂] solo se vuelve a [s₀] o a [∅].</p>

<div class="flipped-callout">
<p>El autómata solo circula realmente entre <strong>tres</strong> estados: [s₀], [s₁,s₂] y [∅] (sumidero).</p>
</div>

</div>
<div>


</div>

---

<!-- .slide: data-menu-title="3b - AFD final simplificado" -->
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


</div>
</div>


---

<!-- .slide: data-menu-title="3b - Construcción incremental (lazy)" -->
## Una estrategia más eficiente: construcción incremental

<div class="video-slide-container">
<div>

<p>Generar los 2ⁿ estados y después eliminar los inalcanzables es correcto, pero <strong>ineficiente</strong> si el AFND tiene muchos estados (10 estados → hasta 1024 estados a calcular, la mayoría descartados).</p>

<p>La <strong>construcción incremental</strong> (o <em>lazy</em>) evita ese trabajo de más:</p>
<ol>
<li>El estado inicial de M' es [q₀]. Se agrega a una lista de pendientes.</li>
<li>Se toma el primer pendiente sin procesar; se calculan sus transiciones para cada símbolo.</li>
<li>Si el resultado es un conjunto nuevo (no está aún en M'), se agrega a los pendientes.</li>
<li>Se repite hasta que no queden pendientes.</li>
</ol>
<p>Así, solo se generan los estados <strong>alcanzables</strong>. En nuestro ejemplo hubiese dado directamente [s₀], [s₁,s₂] y [∅], sin pasar por los otros cinco.</p>

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

</div>
</div>

Note:
DESARROLLO — Bloque 6 — ¿Y el tamaño importa? Vale la pena detenerse un momento en este punto. Dijimos que el AFD equivalente puede tener hasta 2ⁿ estados, siendo n la cantidad de estados del AFND. En el peor caso, todos esos estados son alcanzables y ninguno se puede eliminar. Ese peor caso existe: hay lenguajes para los cuales el AFD mínimo tiene exponencialmente más estados que el AFND más compacto. Sin embargo, en la práctica —y especialmente en el análisis léxico— esto raramente es un problema. Los autómatas que describen tokens de lenguajes de programación tienen una estructura regular que no genera esa explosión exponencial. Los AFDs resultantes son manejables. Además, ese costo se paga una sola vez: en el momento de construir el compilador, no durante la compilación. Una vez construido el AFD, reconocer tokens es una operación de tiempo constante por carácter: consultar la tabla, actualizar el estado. Eso es exactamente lo que hace Lex.


---

<!-- .slide: data-menu-title="Cierre general y próximo tema" -->
## Cierre: lo que vimos hoy

<div class="recordar" style="background: var(--card-bg); border-radius:12px; padding:20px; text-align:left;">
<ul>
<li>Los <strong>AFND</strong> permiten múltiples transiciones para el mismo símbolo, o transiciones ε. Aceptan una cadena si <strong>existe al menos un camino</strong> exitoso.</li>
<li>Son herramientas de <strong>diseño</strong> poderosas, pero difíciles de implementar directamente.</li>
<li>El <strong>algoritmo de construcción de subconjuntos</strong> convierte cualquier AFND en un AFD equivalente: los estados del AFD son subconjuntos de estados del AFND.</li>
<li>El resultado se puede simplificar eliminando <strong>estados inalcanzables</strong>.</li>
<li>La <strong>construcción incremental</strong> es la variante práctica: solo genera los estados que realmente se alcanzan.</li>
</ul>
</div>

<div class="flipped-callout" style="margin-top:15px;">
<p><strong>Resultado final:</strong> el poder de diseño del no determinismo, con la eficiencia de implementación del determinismo. Lo mejor de los dos mundos.</p>
</div>

<p style="margin-top:15px; text-align:center; color:var(--text-muted);">➡️ Próxima lección: <strong>Máquinas de Mealy y Moore</strong> — autómatas que producen salida, y su relación con el análisis léxico.</p>


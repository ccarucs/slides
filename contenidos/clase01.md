## Contenidos de la clase
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="video-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta de la clase </span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; font-weight: bold">
      <li>Qué es un compilador.</li>
      <li>Definición y motivación</li>
      <li>Compilador vs Intérprete</li>
      <li>Contexto de un compilador</li>
      <li>Fases del compilador</li>
      <li>Agrupamiento de fases </li>
    </ul>       
  </div>  
  <div>
    <div class="video-player-wrapper">
      <video src="videos/u1/u1_01_introduccion.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>  
</div>
<div class="flipped-callout">
  <h4><i class="fas fa-lightbulb"></i> Antes de la clase presencial</h4>
  <p>Al terminar esta clase resolvé el cuestionario de autoevaluación al final de la Lección 1.</p>
</div>

</div>

Note:
[INTRO] Bienvenidos a Compiladores. Esta es una materia que puede parecer muy teórica, muy técnica, pero en realidad es exactamente lo contrario: es una materia que explica algo que ya usamos todo el tiempo sin pensarlo demasiado. Cada vez que escribimos un programa informático y lo ejecutamos, algo ocurre entre ese código que escribimos y las instrucciones que finalmente corre el procesador. Ese "algo" es el trabajo del compilador. Y entender cómo funciona cambia la forma en que programamos. En este primer video vamos a hacer un recorrido general, para entender: qué es un compilador, en qué contexto trabaja, cuáles son sus partes internas, y cómo se relaciona todo eso con la teoría que vamos a ver a lo largo del cuatrimestre.

---

## ¿Qué es un compilador?

<div class="two-col">
  <div>
    <p style="font-size:1.1rem !important; color: var(--text-color) !important;">Un programa que <strong>lee</strong> un programa escrito en un lenguaje y lo <strong>traduce</strong> a un programa equivalente en otro lenguaje.</p>
    <div class="flipped-callout">
      <h4><i class="fas fa-exchange-alt"></i> Lenguaje fuente → Lenguaje objeto</h4>
      <p>No es una copia ni una transcripción literal: es un programa equivalente, que hace lo mismo, expresado en otro lenguaje.</p>
    </div>
  </div>
  <div class="card" style="opacity:0.75; border-style:dashed;">
    <img src="img/u1_01_traductor.png" style="width:100%"></img>
  </div>
</div>

Note:
[DESARROLLO — Bloque 1] Empecemos por la definición básica: un programa que lee un programa escrito en un lenguaje y lo traduce a un programa equivalente en otro lenguaje. Un compilador lee un programa escrito en un lenguaje de programación —al que llamamos lenguaje fuente— y lo traduce a un programa equivalente escrito en otro lenguaje —el lenguaje objeto. Ese programa equivalente no es una transcripción literal, no es una copia. Es un programa que hace lo mismo, pero expresado en otro lenguaje. Generalmente ese lenguaje objeto es código de máquina, el lenguaje binario que entiende el procesador. Pero no siempre: a veces el destino es un código intermedio, o incluso otro lenguaje de alto nivel. Este proceso de traducción se conoce como compilación. Además, el compilador hace algo muy importante: detecta errores. Si el programa fuente tiene problemas —errores de sintaxis, variables no declaradas, tipos incompatibles— el compilador los reporta. Y lo ideal es que no se detenga en el primer error encontrado, sino que siga analizando para reportar la mayor cantidad posible.

---


## ¿Por qué estudiar compiladores?

<div class="grid-3">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-hammer"></i></span>Construir traductores</h4>
    <p>Intérpretes de comandos, procesadores de configuración, lenguajes de dominio específico. Las tareas básicas de cualquier compilador son esencialmente las mismas.</p>
  </div>
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-user-graduate"></i></span>Ser mejor programador</h4>
    <p>Saber qué hace el compilador con una variable, con los tipos o con las llamadas a funciones impacta directo en la corrección y eficiencia del código que escribimos.</p>
  </div>
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-project-diagram"></i></span>Aplicación en otras áreas</h4>
    <p>Procesamiento de lenguaje natural, análisis de protocolos de red, motores de búsqueda: pensar en términos formales sobre el procesamiento de lenguajes.</p>
  </div>
</div>

Note:
Ahora bien, ¿por qué estudiar esto? Varios motivos. El primero es porque quizás en algún momento necesiten construir un compilador, o algo que se le parezca. Si bien hay muchos lenguajes de programación y también son variados los lenguajes objeto, las tareas básicas que debe realizar cualquier compilador son esencialmente las mismas. Entonces, comprendiendo estas tareas, podemos construir compiladores o traductores para una gran variedad de lenguajes. El segundo motivo es que entender cómo se obtiene un ejecutable hace que escribamos mejores códigos. Saber qué hace el compilador con una variable, cómo maneja los tipos, qué pasa con las llamadas a funciones... todo eso tiene impacto directo en la corrección y en la eficiencia de los programas que escribimos. Y el tercer motivo es que las técnicas básicas para la escritura de compiladores pueden ser aplicadas a otras áreas de la informática: procesamiento de lenguaje natural, análisis de protocolos de red, motores de búsqueda. Aprender a construir un compilador es aprender a pensar en términos formales sobre el procesamiento de lenguajes.

---

## Compilador

<div>
  <div class="video-player-wrapper" style="width:70%">
    <video src="videos/u1/u1_02_definicion.mp4" poster="videos/u0_01_portada_video.png" controls></video>
  </div>
  <div class="video-meta">
    <span><i class="fas fa-video"></i> Video Explicativo</span>
  </div>
</div>


---

## El contexto de un compilador
<div class="two-col">
  <div class="timeline">
    <div class="timeline-item">
      <div class="timeline-badge"></div>
      <p class="timeline-title">Código fuente</p>
      <p class="timeline-desc">Lo que escribe el programador, en uno o varios archivos.</p>
    </div>
    <div class="timeline-item">
      <div class="timeline-badge"></div>
      <p class="timeline-title">Preprocesador</p>
      <p class="timeline-desc">Incluye cabeceras, expande macros, resuelve directivas condicionales. Entrega el programa fuente "limpio".</p>
    </div>
    <div class="timeline-item">
      <div class="timeline-badge"></div>
      <p class="timeline-title">Compilador</p>
      <p class="timeline-desc">Transforma el código fuente en lenguaje ensamblador o directamente en código de máquina.</p>
    </div>
    <div class="timeline-item">
      <div class="timeline-badge"></div>
      <p class="timeline-title">Ensamblador</p>
      <p class="timeline-desc">Traduce a código de máquina relocalizable: aún sin direcciones de memoria fijas.</p>
    </div>
    <div class="timeline-item">
      <div class="timeline-badge"></div>
      <p class="timeline-title">Editor de enlace (linker)</p>
      <p class="timeline-desc">Une el código objeto propio con las bibliotecas necesarias en un único ejecutable.</p>
    </div>  
  </div>
  <div>
    <div class="video-player-wrapper">
      <video src="videos/u1/u1_04_contexto.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>  
</div>

Note:
El compilador no trabaja solo. Para obtener un programa ejecutable a partir de código fuente, generalmente intervienen varios programas. El punto de partida es el código fuente. Lo primero que puede intervenir es el preprocesador, que transforma el código fuente antes de que el compilador lo vea: incluye archivos de cabecera, expande macros, resuelve directivas condicionales o incluye librerías. Luego entra el compilador propiamente dicho, que transforma ese código fuente en código en lenguaje ensamblador, o directamente en código de máquina, según la implementación. Si el compilador produjo código ensamblador, el siguiente paso es el ensamblador, que traduce ese código a código de máquina relocalizable. "Relocalizable" significa que aún no tiene direcciones de memoria fijas: todavía no sabe en qué posición de la memoria va a cargarse el programa. Finalmente, el editor de enlace —o linker— toma todos los archivos de código objeto, más las bibliotecas que el programa necesita, y los une en un único archivo ejecutable, resolviendo las referencias entre módulos. A todo este proceso a veces se lo llama simplemente "compilar", aunque en rigor involucra varios programas distintos.

---

## Compiladores e intérpretes
<div class="two-col">
<table class="compare-table" style="font-size: 0.5em;">
  <tr>
    <th></th>
    <th>Compilador</th>
    <th>Intérprete</th>
  </tr>
  <tr>
    <td><strong>Qué hace con el programa</strong></td>
    <td>Traduce el programa completo a otro lenguaje y guarda el resultado</td>
    <td>Ejecuta directamente, instrucción por instrucción</td>
  </tr>
  <tr>
    <td><strong>Cuándo se ejecuta</strong></td>
    <td>Después, a partir del código objeto generado</td>
    <td>Inmediatamente, mientras analiza</td>
  </tr>
  <tr>
    <td><strong>Velocidad de ejecución</strong></td>
    <td>Mayor: la traducción ya está hecha</td>
    <td>Menor: analiza el código cada vez</td>
  </tr>
  <tr>
    <td><strong>Flexibilidad</strong></td>
    <td>Menor</td>
    <td>Mayor, facilita el desarrollo interactivo</td>
  </tr>
  <tr>
</table>
<div><img src="img/u1_02_compinterp.png" style="align:center"></img></div>
</div>

Note:
Antes de entrar en las fases internas del compilador, conviene distinguirlo de otra herramienta con la que comparte muchas características: el intérprete. Ambos reciben un programa fuente y lo procesan. La diferencia está en qué hacen con él. El compilador traduce el programa completo a otro lenguaje y guarda el resultado. La ejecución ocurre después, a partir de ese resultado. El intérprete, en cambio, ejecuta el programa directamente, instrucción por instrucción, sin generar código objeto persistente. Lee una instrucción, la analiza, la ejecuta, y pasa a la siguiente. ¿Qué implica esto? Los programas compilados generalmente se ejecutan más rápido, porque la traducción ya está hecha. Los intérpretes son más flexibles y facilitan el desarrollo interactivo, pero son más lentos en tiempo de ejecución porque deben analizar el código cada vez que se ejecuta.

---

## Las fases del compilador

Un compilador se descompone en **seis fases** secuenciales. Cada una recibe la salida de la anterior y produce una nueva representación del programa. Dos componentes transversales —tabla de símbolos y manejador de errores— colaboran con todas ellas.

<div>
  <div class="video-player-wrapper">
    <video src="videos/u1/u1_05_fases.mp4" poster="videos/u0_01_portada_video.png" controls></video>
  </div>
  <div class="video-meta">
    <span><i class="fas fa-video"></i> Video Explicativo</span>
  </div>
</div>

---

## Recorré las 6 fases

<p style="text-align:center;">Usá el simulador para volver a repasar cómo se transforma <code>posicion := inicial + velocidad * 60</code> en cada etapa, a tu ritmo.</p>

<div class="simulator-container">
  <div class="simulator-steps" id="sim-steps"></div>
  <div class="simulator-content">
    <div class="sim-expression" id="sim-expr"></div>
    <p id="sim-desc" style="font-size: 0.95rem !important;"></p>
    <div class="sim-output-box" id="sim-output"></div>
    <div class="sim-nav">
      <button class="sim-nav-btn" id="sim-prev"><i class="fas fa-chevron-left"></i> Anterior</button>
      <span class="sim-nav-info" id="sim-info"></span>
      <button class="sim-nav-btn" id="sim-next">Siguiente <i class="fas fa-chevron-right"></i></button>
    </div>
  </div>
</div>

Note:
Este simulador ya está resuelto en custom.js (simData) con el mismo ejemplo del video. Es un buen punto para pausar la narración y dejar que el estudiante interactúe, o para usarlo como resumen visual antes de pasar a la tabla de símbolos.

---

## Tabla de símbolos

<div class="onetwo-col">
  <div>
    <p style="text-align:left;">Estructura de datos —generalmente una <strong>tabla hash</strong>— que registra todos los identificadores del programa: variables, funciones, tipos definidos por el usuario.</p>
    <p style="text-align:left;">Para cada identificador guarda: <strong>tipo</strong>, <strong>ámbito</strong> (dónde es válido), <strong>dirección de memoria</strong>, y si es función, cantidad y tipos de parámetros.</p>
    <div class="flipped-callout">
      <h4><i class="fas fa-table"></i> ¿Quién la usa?</h4>
      <p>El analizador léxico introduce los identificadores la primera vez que los encuentra. Las fases siguientes la consultan y la enriquecen con más información.</p>
    </div>
  </div>
  <div>
    <div class="video-player-wrapper">
      <video src="videos/u1/u1_06_tablayerrores.mp4" poster="videos/u0_01_portada_video.png" controls></video>
    </div>
    <div class="video-meta">
      <span><i class="fas fa-video"></i> Video Explicativo</span>
      <!--<span><i class="fas fa-clock"></i> 2:00 min</span>-->
    </div>
  </div>
</div>

Note:
Además de las seis fases, el compilador cuenta con dos componentes que no forman parte de la secuencia principal, sino que están disponibles para todas las fases. El primero es la tabla de símbolos. Es una estructura de datos —generalmente implementada con una tabla hash— que registra todos los identificadores del programa: variables, funciones, tipos definidos por el usuario. Para cada identificador, guarda sus atributos: el tipo, el ámbito —es decir, en qué parte del programa es válido—, la dirección de memoria asignada, y en el caso de funciones, la cantidad y tipos de parámetros. El analizador léxico es quien introduce los identificadores en la tabla la primera vez que los encuentra. Las fases siguientes la consultan y la enriquecen con más información.


---

## Manejador de errores

<p>Cada fase puede encontrar errores de naturaleza distinta. Un compilador bien diseñado <strong>no se detiene ante el primer error</strong>: intenta recuperarse y seguir analizando.</p>

<div class="grid-3">
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <p>El análisis léxico puede encontrar caracteres o secuencias que no corresponden a ningún token válido del lenguaje.</p>
  </div>
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <p class="timeline-desc">El análisis sintáctico detecta incumplimiento a las reglas gramaticales.</p>
  </div>
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <p class="timeline-desc">El análisis semántico detecta errores de significado.</p>
  </div>
</div>
<div>
  <img src="img/u1_04_errores.png"></img>
</div>

Note:
El segundo componente transversal es el manejador de errores. Cada fase puede encontrar errores, y cada fase produce errores de naturaleza distinta. El análisis léxico puede encontrar caracteres o secuencias que no corresponden a ningún token válido del lenguaje: por ejemplo, un identificador que empieza con un número, como 2ab. El análisis sintáctico detecta violaciones a las reglas gramaticales: por ejemplo, dos operandos seguidos sin operador entre ellos, como total := val1 val2. El análisis semántico detecta errores de significado: intentar sumar una variable numérica con una cadena de texto, por ejemplo total := val1 * 'pal'. Un compilador bien diseñado no se detiene ante el primer error. Intenta recuperarse y continuar el análisis para reportar la mayor cantidad posible de problemas en una sola pasada. Esto es importante en la práctica: tener que compilar veinte veces para descubrir veinte errores uno por uno sería muy poco eficiente.

---

## Agrupamiento de fases

<div class="two-col">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-search"></i></span>Análisis</h4>
    <p>Léxico + Sintáctico + Semántico. Entiende el programa fuente, verifica que sea correcto y construye una representación interna.</p>
  </div>
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-pen-fancy"></i></span>Síntesis</h4>
    <p>Gen. código intermedio + Optimización + Gen. código final. Produce el programa objeto a partir de la representación interna.</p>
  </div>
</div>

<div>
  <div class="video-player-wrapper" style="width:60%">
    <video src="videos/u1/u1_08_agrupamiento.mp4" poster="videos/u0_01_portada_video.png" controls></video>
  </div>
  <div class="video-meta">
    <span><i class="fas fa-video"></i> Video Explicativo</span>
    <!--<span><i class="fas fa-clock"></i> 2:00 min</span>-->
  </div>
</div>

---

## Herramientas para construir compiladores

<div class="grid-2">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-terminal"></i></span>Lex</h4>
    <p>Generador automático de analizadores léxicos. A partir de especificaciones de tokens —expresadas con expresiones regulares— genera el lexer. No hace falta programarlo a mano.</p>
  </div>
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-code-branch"></i></span>Yacc</h4>
    <p>Generador automático de analizadores sintácticos. Dada la gramática del lenguaje, genera el parser a partir de una especificación formal.</p>
  </div>
</div>

---

## Especificaciones de los lenguajes
<table class="compare-table" style="margin-top: 20px;">
  <tr>
    <th>Fase del compilador</th>
    <th>Fundamento teórico</th>
  </tr>
  <tr>
    <td>Análisis léxico</td>
    <td>Autómatas finitos, expresiones regulares</td>
  </tr>
  <tr>
    <td>Análisis sintáctico</td>
    <td>Gramáticas independientes del contexto, autómatas con pila</td>
  </tr>
  <tr>
    <td>Análisis semántico</td>
    <td>Gramáticas de atributos</td>
  </tr>
</table>

Note:
Construir un compilador desde cero es una tarea ardua pero interesante. Para facilitar esta tarea existen herramientas que automatizan las partes más mecánicas del proceso. En este curso vamos a usar dos herramientas fundamentales: Lex es un generador automático de analizadores léxicos. Dado un conjunto de especificaciones de tokens —expresadas mediante expresiones regulares— genera el analizador léxico correspondiente. No hay que programar el lexer a mano: basta con especificar qué forma tienen los tokens. Yacc es un generador automático de analizadores sintácticos. Dada la gramática del lenguaje, genera el parser. La herramienta hace el trabajo pesado a partir de una especificación formal. Estas herramientas están basadas en teoría formal de la computación. Y acá aparece la conexión con la teoría que vamos a estudiar en este cuatrimestre. El análisis léxico se basa en autómatas finitos y expresiones regulares. El análisis sintáctico se basa en gramáticas independientes del contexto y autómatas con pila. El análisis semántico usa gramáticas de atributos. Toda la teoría de lenguajes formales que vamos a ver tiene una aplicación directa y concreta en alguna fase del compilador. No es teoría por la teoría: es el fundamento de las herramientas que vamos a usar.

---
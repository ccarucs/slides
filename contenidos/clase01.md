## Contenidos de la clase
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
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
    <div class="video-player-wrapper" style="width:100%; margin-top:10;">
      <video src="videos/u1/u1_01_introduccion.mp4" poster="img/indice_grafico.png" controls></video>
    </div>
  </div>  
</div>
<div class="flipped-callout">
  <h4><i class="fas fa-lightbulb"></i> Antes de la clase presencial</h4>
  <p>Al terminar esta clase resolvé el <span style="color: var(--accent-color)">Cuestionario de Autoevaluación</span> que está al final de la <span style="color: var(--accent-color)">Lección 1</span> del aula virtual.</p>
</div>

---

## ¿Qué es un compilador?

<div class="two-col-flex ratio-40-60">
  <div>
    <p style="color: var(--text-color) !important;">Un programa que <strong>lee</strong> un programa escrito en un lenguaje y lo <strong>traduce</strong> a un programa equivalente en otro lenguaje.</p>
    <div class="flipped-callout">
      <h4><i class="fas fa-exchange-alt"></i> Lenguaje fuente → Lenguaje objeto</h4>
      <p>No es una copia ni una transcripción literal: es un programa equivalente, que hace lo mismo, expresado en otro lenguaje.</p>
    </div>
  </div>
  <div>
    <div class="video-player-wrapper teatro" style="width:1000%; margin-top:10;">
      <video src="videos/u1/u1_02_definicion.mp4" poster="img/u1_01_traductor.png" controls></video>
    </div>
  </div>
</div>


---

## ¿Por qué estudiar compiladores?
<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card">
      <h4 class="card-title"><span class="icon"><i class="fas fa-user-graduate"></i></span>Habilidades que desarrollarás</h4>
      <ul>
          <li>Pensar en <strong>gramáticas y lenguajes formales</strong> — útil en parsing, config files, DSLs.</li>
          <li>Entender el <strong>modelo de ejecución real</strong> de los programas.</li>
          <li>Diseñar <strong>herramientas</strong> para procesar texto estructurado.</li>
          <li>Depurar errores <strong>a nivel de lenguaje</strong>, no solo de lógica.</li>
      </ul>
    </div>  
  </div>
  <div class="col">
  <div class="video-player-wrapper" style="width:100%">
    <video src="videos/u1/u1_03_motivacion.mp4" poster="img/interrogacion.png" controls></video>
  </div>
  </div>
</div>



---

## El contexto de un compilador
<div class="two-col-flex ratio-40-60">
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
    <div class="video-player-wrapper" style="width:80%">
      <video src="videos/u1/u1_04_contexto.mp4" poster="img/u0_02_play_video.png" controls ></video>
    </div>
  </div>  
</div>

Note:
El compilador no trabaja solo. Para obtener un programa ejecutable a partir de código fuente, generalmente intervienen varios programas. El punto de partida es el código fuente. Lo primero que puede intervenir es el preprocesador, que transforma el código fuente antes de que el compilador lo vea: incluye archivos de cabecera, expande macros, resuelve directivas condicionales o incluye librerías. Luego entra el compilador propiamente dicho, que transforma ese código fuente en código en lenguaje ensamblador, o directamente en código de máquina, según la implementación. Si el compilador produjo código ensamblador, el siguiente paso es el ensamblador, que traduce ese código a código de máquina relocalizable. "Relocalizable" significa que aún no tiene direcciones de memoria fijas: todavía no sabe en qué posición de la memoria va a cargarse el programa. Finalmente, el editor de enlace —o linker— toma todos los archivos de código objeto, más las bibliotecas que el programa necesita, y los une en un único archivo ejecutable, resolviendo las referencias entre módulos. A todo este proceso a veces se lo llama simplemente "compilar", aunque en rigor involucra varios programas distintos.

---

## Compiladores e intérpretes

<div style="margin-bottom: 25px;">
  <audio src="videos/u1/u1_compilador_interprete.m4a" controls style="width: 40%; display: block; margin: 0 auto;"></audio>
</div>

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

</table>
<div><img src="img/u1_02_compinterp.png" style="align:center; width:90%"></img></div>
</div>

Note: Antes de entrar en las fases internas del compilador, conviene distinguirlo de otra herramienta con la que comparte muchas características: el intérprete. Ambos reciben un programa fuente y lo procesan. La diferencia está en qué hacen con él. El compilador traduce el programa completo a otro lenguaje y guarda el resultado. La ejecución ocurre después, a partir de ese resultado. El intérprete, en cambio, ejecuta el programa directamente, instrucción por instrucción, sin generar código objeto persistente. Lee una instrucción, la analiza, la ejecuta, y pasa a la siguiente. ¿Qué implica esto? Los programas compilados generalmente se ejecutan más rápido, porque la traducción ya está hecha. Los intérpretes son más flexibles y facilitan el desarrollo interactivo, pero son más lentos en tiempo de ejecución porque deben analizar el código cada vez que se ejecuta.


---

## Responde la siguiente pregunta
<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Cuál es la principal diferencia operativa entre un compilador y un intérprete?</scan>
<p>Elige la opción correcta</p>
</div>
<div class="quiz-container">
  <div class="quiz-option" data-correct="false">
    El compilador ejecuta el programa línea por línea mientras que el intérprete genera un ejecutable.
  </div>
  <div class="quiz-option" data-correct="true">
    El compilador traduce todo el código antes de ejecutarlo; el intérprete traduce y ejecuta instrucción por instrucción en tiempo real.
  </div>
  <div class="quiz-option" data-correct="false">
    Los intérpretes son siempre más rápidos en tiempo de ejecución porque omiten la fase de análisis.
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain=" El compilador realiza la traducción de forma previa (offline), mientras que el intérprete procesa el código fuente directamente." 
     data-incorrect-explain="El compilador produce un archivo traducido (código objeto) para su posterior ejecución, mientras que el intérprete no genera código persistente.">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta permite afianzar el concepto antes de adentrarnos en las fases del compilador. Es una pausa activa ideal para el estudiante en su casa.

---

## Las fases del compilador

Un compilador se descompone en **seis fases** secuenciales. Cada una recibe la salida de la anterior y produce una nueva representación del programa. Dos componentes transversales —tabla de símbolos y manejador de errores— colaboran con todas ellas.

<div>
  <div class="video-player-wrapper" style="width:70%">
    <video src="videos/u1/u1_05_fases.mp4" poster="videos/u0_01_portada_video.png" controls></video>
  </div>
</div>

---

## Las fases en acción (Ejemplo)

En este video se muestra cómo se transforma y compila paso a paso la sentencia <span style="color:var(--accent-color)">posicion := inicial + velocidad * 60</span>. Es una explicación sencilla ... recuerden que durante el cuatrimestre veremos en detalle cómo implementar cada fase.

<div>
  <div class="video-player-wrapper" style="width:70%">
    <video src="videos/u1/u1_05_fases_ejemplo.mp4" poster="img/u0_02_play_video.png" controls></video>
  </div>

</div>

Note:
[DESARROLLO] Prestá atención a cómo cada fase transforma la expresión original. En la siguiente diapositiva vas a poder interactuar con un simulador de este mismo ejemplo para recorrer cada etapa a tu propio ritmo.

---

## Recorré las 6 fases

<p style="text-align:center;"><span class="emoji-float">🫵 </span> Usá el <strong>simulador </strong>para volver a repasar cómo se transforma <span style="color:var(--accent-color)">posicion := inicial + velocidad * 60</span> en cada etapa, a tu ritmo.</p>

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
Este simulador ya está resuelto en custom.js (simData) con el mismo ejemplo del video. 

---

## Ponemos a prueba lo aprendido

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> Si un programador escribe  <code style="color:var(--text-muted)">total := x + 10</code>  pero no ha declarado la variable <code style="color:var(--text-muted)"> x </code>, ¿en qué fase se detecta este error?</scan>
<p>Elige la opción correcta</p>
</div>
<div class="quiz-container">
  <div class="quiz-option" data-correct="false">
    En el Análisis Léxico, porque la variable 'x' no es un token válido.
  </div>
  <div class="quiz-option" data-correct="false">
    En el Análisis Sintáctico, porque la gramática exige que las variables estén declaradas antes.
  </div>
  <div class="quiz-option" data-correct="true">
    En el Análisis Semántico, porque evalúa el significado, validez de tipos y declaraciones de los identificadores en la Tabla de Símbolos.
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="El lexer y el parser solo verifican la estructura de caracteres y la gramática (que sintácticamente es correcta: id := id + num). Es el análisis semántico el que comprueba que la variable realmente exista y tenga un tipo compatible." 
     data-incorrect-explain="La sintaxis 'variable := variable + número' es perfectamente correcta gramaticalmente. El error radica en el significado/contexto (saber si existe 'x'), lo cual es competencia de otra fase.">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta asienta el simulador interactivo y conecta la teoría formal con la práctica del desarrollo de software cotidiano.

---

## Tabla de símbolos

<div class="two-col-flex ratio-40-60">
  <div>
    <p style="text-align:left;">Estructura de datos —generalmente una <strong>tabla hash</strong>— que registra todos los identificadores del programa: variables, funciones, tipos definidos por el usuario.</p>
    <p style="text-align:left;">Para cada identificador guarda: <strong>tipo</strong>, <strong>ámbito</strong> (dónde es válido), <strong>dirección de memoria</strong>, y si es función, cantidad y tipos de parámetros.</p>
    <div class="flipped-callout">
      <h4><i class="fas fa-table"></i> ¿Quién la usa?</h4>
      <p>El analizador léxico introduce los identificadores la primera vez que los encuentra. Las fases siguientes la consultan y la enriquecen con más información.</p>
    </div>
  </div>
  <div>
    <div class="video-player-wrapper" style="width:70%">
      <video src="videos/u1/u1_06_tablasimbolos.mp4" poster="videos/u0_01_portada_video.png" controls></video>
    </div>

  </div>
</div>

---

## Manejador de errores

<p>Cada fase puede encontrar errores de naturaleza distinta. Un compilador bien diseñado <strong>no se detiene ante el primer error</strong>: intenta recuperarse y seguir analizando.</p>
<div class="two-col">
  <div class="col">
  <div class="grid-3">
    <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
      <p>El análisis léxico encuentra caracteres o secuencias que no corresponden a ningún token válido del lenguaje.</p>
    </div>
    <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
      <p class="timeline-desc">El análisis sintáctico detecta secuencia que imcumplen reglas gramaticales.</p>
    </div>
    <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
      <p class="timeline-desc">El análisis semántico detecta errores de significado.</p>
    </div>
  </div>
  <div>
    <img src="img/u1_04_errores.png"></img>
  </div>
  </div>
 <div class="col">
    <div class="video-player-wrapper" style="width:100%">
      <video src="videos/u1/u1_07_errores.mp4" poster="videos/u0_01_portada_video.png" controls></video>
    </div>
  </div>
</div>


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
  <div class="video-player-wrapper" style="width:50%">
    <video src="videos/u1/u1_08_agrupamiento.mp4" poster="videos/u0_01_portada_video.png" controls></video>
  </div>

</div>

---

## Software para construir compiladores

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
<div class="three-col-flex ratio-wide-mid">
  <div></div>
  <div class="video-player-wrapper" >
      <video src="videos/u1/u1_07_herramientas.mp4" poster="img/compu_compi.png" controls></video>   
  </div>
  <div class="flipped-callout" style="text-align: center;">
    <p><strong>⚠️ En las próximas semanas daremos las indicaciones para la instalación y uso de estas herramientas.</p>
  </div>
</div>
 

---


## Especificaciones de los lenguajes
<table class="compare-table" style="margin-top: 20px; width: 80%">
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


---


  <h2 class="text-gradient">Resumen de la Clase</h2> 
  <div class="grid-2">
    <div class="card">
      <h4 class="card-title" ><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos</h4>
      <ul>
        <li>Un <strong>compilador</strong> traduce código fuente a objeto y detecta errores.</li>
        <li >Trabaja coordinado con el <strong>preprocesador, ensamblador y linker</strong>.</li>
        <li>Consta de <strong>6 fases</strong> lógicas fundamentales.</li>
        <li>La separación <strong>Front End / Back End</strong> fomenta la reutilización.</li>
        <li>Las herramientas como <strong>Lex y Yacc</strong> se basan en teoría de autómatas.</li>
      </ul>
    </div>          
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección: </h4>
      <p style="margin-top:15px; text-align:lef; color:var(--text-muted);"> En la siguiente lección: <strong> iniciaremos el estudio formal de la primera fase: <strong>Análisis Léxico</strong>. Veremos cómo se definen las expresiones regulares para representar números, palabras clave e identificadores en un programa.</p>
    </div>    
  </div>

  <div class="flipped-callout" style="text-align: center;">
    <p><strong>⚠️ Recordatorio:</strong> Asegúrate de completar el cuestionario de autoevaluación en la plataforma antes de asistir a la clase presencial.</p>
  </div>


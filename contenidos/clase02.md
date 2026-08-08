## ¿Qué vamos a estudiar en esta clase?
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta de la clase </span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; font-weight: bold;">
      <li>Autómatas finitos: fundamentos y conceptos</li>
      <li>Componentes de un autómata finito</li>
      <li>Representación: Diagramas y Tablas de Transición</li>
      <li>Introducción a la Implementación en Código</li>
    </ul>       
  </div>  
  <div>
    <div class="video-player-wrapper" style="width:70%; margin-top:10;">
      <video src="videos/u2/u2_01_introduccion.mp4"  controls></video>
    </div>
  </div>  
</div>
<div class="flipped-callout" >
  <h4><i class="fas fa-lightbulb"></i> Recordar</h4>
  <p>Modalidad de cursado: clase invertida. Ver esta clase teórica antes de la clase presencial en la Facultad.</p>
</div>

---

## Definición de Autómata
<h3 class="card-title"><strong>Primero definamos lo que es un <span style="color: var(--accent-secondary)">Autómata</span></strong></h3>
<div class="grid-2"> 
    <div class="card">
      <h4 class="card-title"><span class="icon"><i class="fas fa-microchip"></i></span>Origen Etimológico</h4>
      <p>Del griego <em>automatos</em>, que significa "con movimiento propio" o "guiado por sí mismo". En la vida cotidiana, nos referimos a un mecanismo que repite acciones de manera automática.</p>
    </div>  
    <div class="card">
      <h4 class="card-title"><span class="icon"><i class="fas fa-bolt"></i></span>En Ciencias de la Computación</h4>
      <p>Es un modelo matemático abstracto de un sistema que:</p>
      <ul>
        <li>Recibe una secuencia de entradas (símbolos).</li>
        <li>Cambia de "estado" de acuerdo a reglas predefinidas.</li>
        <li>Determina si la secuencia de entrada es válida (aceptada) o no (rechazada).</li>
      </ul>
    </div>  
</div>

---

## ¿Qué es un Autómata Finito?
  <div class="flipped-callout">
    <h4><i class="fas fa-lightbulb"></i> Primera definición</h4>
    <p>Daremos la definición formal más adelante</p>
  </div>
    <div class="video-player-wrapper" style="width:50%">
      <video src="videos/u2/u2_05_definicion1ra.mp4" poster="img/interrogacion.png" controls></video>
    </div>


---

## Componentes del Autómata Finito
<p>Desde una perspectiva física o conceptual clásica, un autómata consta de tres partes principales:</p>
<div class="grid-2">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-cogs"></i></span>Componentes</h4>
    <ul>
      <li><strong>Cinta de Entrada:</strong> Una tira dividida en celdas, donde cada celda contiene un símbolo del alfabeto. Se lee estrictamente de izquierda a derecha, un símbolo a la vez.</li>
      <li><strong>Cabeza Lectora:</strong> El mecanismo que "mira" el símbolo actual de la cinta y se mueve una posición a la derecha tras procesarlo.</li>
      <li><strong>Control Central:</strong> El dispositivo que posee un número finito de estados posibles y las reglas de transición que definen el comportamiento.</li>
    </ul>
  </div>
  
  <div class="card" style="display: flex; align-items: center; justify-content: center;">
    <img src="img/u2_01_AF.png" style="max-width: 90%; height: auto; display: block; margin: 0 auto;">   
  </div>
</div>

---

## ¿Por qué estudiar Autómatas Finitos?
<p>Los autómatas finitos son la base del <strong>Análisis Léxico</strong> dentro de un compilador, pero su aplicación va mucho más allá.</p>
<div class="two-col-flex ratio-40-60">
  <div class="col">
    <h4 class="card-title">Ejemplos</h4>
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; text-align: center;"><span class="icon"><i class="fas fa-check-double"></i></span><br>Circuitos digitales</h4>
      <p style="font-size: 0.85rem; padding-left: 15px; margin: 0; color: var(--text-muted);">
        Diseño y verificación de circuitos secuenciales.
      </p>
    </div> 
    <p></p>
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; text-align: center;"><span class="icon"><i class="fas fa-robot"></i></span><br>Robótica</h4>
      <p style="font-size: 0.85rem; padding-left: 15px; margin: 0; color: var(--text-muted);">
        Diseño de comportamientos ante estímulos externos.
      </p>
    </div> 
    <p></p>
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; text-align: center;"><span class="icon"><i class="fas fa-search"></i></span><br>Minería de textos</h4>
      <p style="font-size: 0.85rem; padding-left: 15px; margin: 0; color: var(--text-muted);">
        Detección de patrones y frases en grandes volúmenes de texto.
      </p>
    </div> 
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="width: 70%;">
      <video src="videos/u2/u2_02_motivacionAF.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; text-align: center;"><span class="icon"><i class="fas fa-book"></i></span><br>ANÁLISIS LÉXICO</h4>
      <p style="font-size: 0.85rem; padding-left: 15px; margin: 0; color: var(--text-muted);">
        El analizador léxico necesita reconocer palabras reservadas, variables, números, símbolos. Todo eso se puede reconocer con autómatas finitos.
      </p>
    </div> 
  </div>
</div>

---

## Un ejemplo cotidiano
  <div style="font-size:1.2rem">
  <span >🤓 Para empezar ... un ejemplo sencillo para entender el funcionamiento de un autómata finito</span>
  <p></p>
    
  </div>
  <div>
    <div class="video-player-wrapper" style="width: 70%;">
      <video src="videos/u2/u2_03_ejemplosaeta.mp4" poster="img/tarjeta_saeta.jpeg" controls></video>
    </div>
    <div class="flipped-callout">
      <h4><i class="fas fa-lightbulb"></i> Propiedad clave:</h4><p>La máquina no necesita recordar qué tarjetas leyó hace una hora. El <strong>estado actual</strong> resume toda la historia relevante del sistema para tomar la siguiente decisión.</p>
    </div>
  </div>


---


## Responde la siguiente pregunta
<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Qué representa el "estado actual" en la máquina del colectivo (tarjeta SAETA)?</scan>
<p>Elige la opción correcta</p>
</div>


<div class="quiz-container">
  <div class="quiz-option" data-correct="true">
    Toda la historia pasada relevante del sistema para tomar la siguiente decisión (por ej., si la tarjeta ya fue leída).
  </div>
  <div class="quiz-option" data-correct="false">
    El saldo exacto en pesos que le queda al usuario para los próximos viajes.
  </div>
  <div class="quiz-option" data-correct="false">
    El historial completo de los horarios y líneas de colectivo que tomó el usuario durante el año.
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="El estado actual condensa toda la información necesaria del pasado. El autómata no 'mira hacia atrás' ni tiene memoria histórica de eventos para decidir qué hacer con la siguiente entrada." 
     data-incorrect-explain="El estado del sistema resume el historial relevante de transiciones previas de forma que, para tomar una decisión en el presente, basta con conocer el estado actual y el símbolo de entrada.">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta permite afianzar el concepto intuitivo de "estado" de manera activa antes de formalizarlo matemáticamente.

---


## Más ejemplos de Autómatas Finitos
<p>Analizá los siguientes ejemplos adicionales para comprender la variedad de aplicaciones de este modelo:</p>
<div style="display: flex; gap: 20px; justify-content: center;">
  <div class="video-player" style="width: 100%;">
    <iframe 
      src="https://www.youtube.com/embed/z9YiErQI6-w?si=2KUAxFYrudu2nVmD" 
      title="Ejemplo 1 de Autómatas Finitos" 
      width="560" 
      height="315"  
      allowfullscreen>
    </iframe>
  </div>

  <div class="video-player" style="width: 100%;">
    <iframe 
      src="https://www.youtube.com/embed/Q2zr8IBhc30?si=IdTkN25YejgcH65o" 
      title="Ejemplo 2 de Autómatas Finitos" 
      width="560" 
      height="315" 
      allowfullscreen>
    </iframe>
  </div>
</div>

---

## Diagrama de Transiciones
<span class="texto-destacado"> Veamos cómo representamos gráficamente a los autómatas finitos</span>
<div class="onetwo-col">
  <div>
    <div class="video-player-wrapper">
      <video src="videos/u2/u2_04_diagramaAF.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>  
  <div>
    <ul style="font-weight: bold; line-height: 1.8;">
      <li>Círculo = estado</li>
      <li>Flecha etiquetada = transición</li>
      <li>Flecha "de la nada" = estado inicial</li>
      <li>Doble círculo = estado de aceptación</li>
    </ul>
    <div style="margin-top: 20px;"><img src="img/u2_02_simbolos.png" style="width: 40%; display: block; margin: 0 auto;"></div>  
  </div>
</div>


---

## Definición formal
<div class="two-col">
  <div class="col">
    <div style="text-align: center; margin-bottom: 15px;">
      <p class="texto-destacado">Formalmente, un <strong>Autómata Finito Determinista (AFD)</strong> se define como una quíntupla:</p>
      <h4 class="text-gradient" style="font-size: 1.5rem; font-weight: bold;">M = (S, Σ, δ, s₀, F)</h4>
    </div>
    <div style="display: flex; justify-content: center;">
      <div class="card" style="width: 80%; margin-bottom: 15px;">
        <h4 class="card-title"><span class="icon"><i class="fas fa-circle-nodes"></i></span>Componentes</h4>
        <p><strong>\(S\)</strong>: conjunto finito de estados</p>
        <p><strong>\(\Sigma\)</strong>: alfabeto de entrada (símbolos)</p>
        <p><strong>\(\delta\)</strong>: función de transición, \(\delta: S \times \Sigma \to S\)</p>
        <p><strong>\(s_0\)</strong>: estado inicial, \(s_0 \in S\)</p>
        <p><strong>\(F\)</strong>: conjunto de estados de aceptación, \(F \subseteq S\)</p>
      </div>
    </div>
  </div>
  <div>
    <div class="video-player-wrapper">
      <video src="videos/u2/u2_09_definicionformal.mp4" poster="img/u2_01_AF.png" controls></video>
    </div>
    <div class="video-meta">
      <span><i class="fas fa-video"></i> Explicación y ejemplo</span>
    </div>
  </div>
</div>

---

## Aceptación de cadenas
<div class="card" style="margin-top: 15px;">
  <p style="text-align: center; font-size: 1.1rem;">
    El AFD \(M \text{ acepta } x_1x_2\dots x_n \iff \text{existe una secuencia de estados } s_0, s_1, \dots, s_n \text{ tal que:}\)
  </p>
  <p style="text-align: center; font-weight: bold; color: var(--accent-color);">
    \(s_0 \text{ es el inicial, } \delta(s_{j-1}, x_j) = s_j \text{ para cada paso } j, \text{ y } s_n \in F\)
  </p>
</div>

<p style="margin-top: 20px;">En palabras simples: partiendo del estado inicial y siguiendo las transiciones símbolo a símbolo, se llega a un estado de aceptación al leer el último carácter de la entrada. Si no es posible completar el camino o se termina en otro estado, la cadena se <strong>rechaza</strong>.</p>

<div class="onetwo-col">
  <div>
    <div class="video-player-wrapper" style="width:60%">
      <video src="videos/u2/u2_06_cadenaaceptadavacia.mp4" poster="img/tilde_verde.png" controls></video>
    </div>
  </div>
  <div class="card" style="margin-top: 15px;">
    <h4 class="card-title"><span class="icon"><i class="fas fa-asterisk"></i></span>Caso especial: la cadena vacía (\(\epsilon\))</h4>
    <p>El autómata acepta \(\epsilon\) si y solo si el <strong>estado inicial es también de aceptación</strong> (\(s_0 \in F\)): la máquina arranca, no lee nada (cero transiciones), y ya está en un estado final.</p>
  </div>
</div>

---

## Responde antes de continuar
<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Qué condición debe cumplirse para que un autómata acepte la cadena vacía (\(\epsilon\))?</scan>
<p>Elige la opción correcta</p>
</div>

<div class="quiz-container">
  <div class="quiz-option" data-correct="false">
    El autómata no debe tener ningún estado de aceptación en su conjunto    \(F\).
  </div>
  <div class="quiz-option" data-correct="true">
    El estado inicial debe ser también un estado de aceptación  (\(s_0 \in F\)).
  </div>
  <div class="quiz-option" data-correct="false">
    La función de transición debe permitir ciclar infinitamente con cualquier símbolo.
  </div>
</div>
<div class="quiz-feedback" 
     data-correct-explain="Al procesar la cadena vacía (\(\epsilon\)) no se consume ningún símbolo. El autómata finaliza exactamente en el estado donde inició (\(s_0\)). Por ende, si \(s_0\) es de aceptación, la cadena es aceptada inmediatamente." 
     data-incorrect-explain="Recordá que \(\epsilon\) representa la ausencia de caracteres. Al no haber símbolos para procesar, el autómata no realiza transiciones y se queda en \(s_0\). Para que la cadena sea válida, el estado de parada (\(s_0\)) debe ser un estado de aceptación (\(s_0 \in F\)).">
</div>

Note:
[AUTOEVALUACIÓN] Esta pregunta afianza el caso límite de la cadena vacía, un caso especial clave en el análisis sintáctico y léxico.

---


## De la tabla de transiciones al código
<p class="texto-destacado">El diagrama de estados es genial para entender el funcionamiento de un AF intuitivamente, pero para programar no es conveniente. Por eso existe otra representación equivalente, que es mucho más cómoda de traducir directo a código: la tabla de transiciones.</p>
<div class="two-col">
  <div>
    <div class="video-player-wrapper">
      <video src="videos/u2/u2_07_implementacionAF.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
  <div style="display: flex; align-items: center; justify-content: center;">
    <img src="img/u2_03_codigoAF.png" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
  </div>
</div>

Note:
    El diagrama de estados es genial para entender la intuición, pero para programar es
    incómodo. Por eso existe una segunda representación, equivalente, que es mucho más
    cómoda de traducir directo a código: la tabla de transiciones.

    La idea es simple: en la primera columna ponemos los nombres de todos los estados. En la
    primera fila ponemos todos los símbolos de entrada posibles -en nuestro ejemplo,
    "letra" y "dígito"-. Y adentro de la tabla, en la celda que cruza el estado con el
    símbolo, ponemos a qué estado se pasa. Generalmente identificamos el estado inicial con
    una flechita al lado del nombre, y los estados finales con una "F" o con la palabra
    "aceptación" al lado.

    Para nuestro ejemplo de identificadores: la fila del estado 1 dice que con "letra" se va
    al estado 3, y con "dígito" se va al estado 2. La fila del estado 2 dice que con
    cualquiera de los dos símbolos se queda en el estado 2. Y la fila del estado 3 dice que
    con cualquiera de los dos símbolos se queda en el estado 3.

    ¿Por qué es mejor para programar? Porque una tabla es, ni más ni menos, una estructura de
    datos: en Python sería directamente un diccionario de diccionarios, o una matriz. Cuando
    lleguemos al código, dentro de un rato, van a ver que "consultar la tabla de
    transiciones" es literalmente una línea: `estado = tabla[estado_actual][simbolo]`. Toda
    la complejidad del diagrama gráfico se condensa en una sola búsqueda en una estructura de
    datos.

    Esta es la razón profunda por la que insistimos tanto en tener las dos representaciones:
    el diagrama para pensar y comunicar, la tabla para programar.

---

## Implementación en Código
<div class="onetwo-col">
  <div>
<pre><code class="language-plaintext">
estado ← 1                          // estado inicial
leer primer carácter de la entrada
mientras no sea fin de cadena:
    según estado:
        si estado = 1:
            si carácter es letra  → estado ← 3
            si carácter es dígito → estado ← 2
            si no                 → error
        si estado = 2:
            → error (cualquier entrada)
        si estado = 3:
            si carácter es letra o dígito → estado ← 3
            si no                          → error
    leer siguiente carácter
al salir del ciclo:
    si estado = 3 → cadena aceptada (identificador válido)
    si no         → error
</code></pre>
<p class="descripcion" style="margin-top: 10px; font-size: 0.85rem; line-height: 1.5;">
  Cada fila de la tabla de transiciones se convierte en un bloque <code>si estado = k</code>; cada celda, en una condición sobre el carácter leído. 
  sí funciona la lógica básica de un analizador léxico real (a mayor escala, es lo que automatizan herramientas como Lex).
</p>
</div>
<div style="display: flex; align-items: center; justify-content: center;">
  <img src="img/u2_04_implemAF.png" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
</div>
</div>

---


## ¡Ejercitamos lo aprendido!
<p style="margin-bottom: 15px;">Escuchá el audio explicativo y resolvé los ejercicios propuestos a continuación antes de la clase presencial:</p>

<div >
  <audio src="videos/u2/u2_08_ejerciciosfinalesAF.mp3" controls style="display: block; margin: 0 auto;"></audio>
</div>
</br>
<div class="grid-3">
  <div class="card" style="border-color: var(--card2)">
    <h4 class="card-title" style="font-size: 0.95rem !important;"><span class="icon"><i class="fas fa-pencil-alt"></i></span>Ejercicio 1</h4>
    <p style="font-size: 0.8rem; line-height: 1.4; color: var(--text-muted);">
      Diseñar un Autómata Finito Determinista (AFD) que determine si un número entero positivo es divisible por 2.
      ¿Cuál es el alfabeto de entrada?
    </p>
  </div>
  <div class="card" style="border-color: var(--card2)">
    <h4 class="card-title" style="font-size: 0.95rem !important;"><span class="icon"><i class="fas fa-pencil-alt"></i></span>Ejercicio 2</h4>
    <p style="font-size: 0.8rem; line-height: 1.4; color: var(--text-muted);">
      Diseñar un AFD que reconozca cadenas sobre el alfabeto \(\Sigma = \{x, y\}\) que acepte cadenas con longitud mayor a uno y par.</br>
      Por ejemplo las cadenas xx, yxyx, xyxxxy deberían ser aceptadas porque tienen longitud par mayor a 1.
    </p>
  </div>
  <div class="card" style="border-color: var(--card2)">
    <h4 class="card-title" style="font-size: 0.95rem !important;"><span class="icon"><i class="fas fa-pencil-alt"></i></span>Ejercicio 3</h4>
    <p style="font-size: 0.8rem; line-height: 1.4; color: var(--text-muted);">
      Diseñar un AFD que acepte números enteros y números decimales.
      </br>
      Por ejemplo, debería aceptar los números 191, 34 (son enteros) pero también aceptar 28.34, 1.123 (números decimales).
    </p>
  </div>
</div>

<div class="flipped-callout" style="margin-top: 20px !important; padding: 12px !important;">
  <p style="font-size: 0.85rem; margin: 0; font-weight: bold; text-align: center;">
    <i class="fas fa-info-circle"></i> Traé tus diseños en papel o formato digital a la clase presencial. Los discutiremos y validaremos en grupo.
  </p>
</div>
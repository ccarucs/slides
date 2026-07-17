<h2>¿Qué vamos a estudiar en esta clase?</h2>
<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="video-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta de la clase </span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; font-weight: bold;">
      <li>Autómatas finitos: fundamentos y conceptos </li>
      <li>Componentes de un autómata finito </li>
      <li>Representación: Diagramas y Tablas de Transición </li>
      <li>Introducción a la Implementación en Código </li>
    </ul>       
  </div>  
  <div>
    <div class="video-player-wrapper">
      <video src="videos/u2/u2_01_introduccion.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>  
</div>
<div class="flipped-callout" style="margin-top: 10px !important;
  margin-bottom: 10px !important;
  padding: 15px !important;">
  <h4><i class="fas fa-lightbulb"></i> Recordar</h4>
  <p>Modalidad de cursado: clase invertida. Ver esta clase teórica antes de la clase presencial en la Facultad</p>
</div>

---

## ¿Qué es un Autómata?
<div class="grid-2">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-microchip"></i></span>Origen Etimológico</h4>
    <p>Del griego automatos, que significa "con movimiento propio" o "guiado por sí mismo". En la vida cotidiana, nos referimos a un mecanismo que repite acciones de manera automática.</p>
      </div>
  
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-bolt"></i></span>En Ciencias de Computación</h4>
    <p>Es un modelo matemático abstracto de un sistema que:</p>
    <ul>
      <li>Recibe una secuencia de entradas (símbolos).</li>
      <li>Cambia de "estado" de acuerdo a reglas predefinidas.</li>
      <li>Determina si la secuencia de entrada es válida (aceptada) o no (rechazada).</li>
    </ul>
  </div>
</div>

---

<h2>¿Por qué estudiar compiladores?</h2>
<p>Los autómatas finitos son la base del <strong>Análisis Léxico</strong> dentro de un compilador. </p>
  <div class="grid-3">
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; align=center"><span class="icon"><i class="fas fa-check-double"></i></span></br>Circuitos digitals</h4>
      <p style="font-size: 0.85rem; padding-left: 15px; margin: 0; color: var(--text-muted);">
        Diseño y verificación de circuitos secuenciales
      </p>
    </div> 
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; align=center"><span class="icon"><i class="fas fa-check-double"></i></span></br>Robótica</h4>
      <p style="font-size: 0.85rem; padding-left: 15px; margin: 0; color: var(--text-muted);">
        Diseño de comportamientos ante estímulos externos
      </p>
    </div> 
    <div class="card">
      <h4 class="card-title" style="font-size: 1rem !important; align=center"><span class="icon"><i class="fas fa-check-double"></i></span></br>Minería de textos</h4>
      <p style="font-size: 0.85rem; padding-left: 15px; margin: 0; color: var(--text-muted);">
        Detección de patrones y frases en grandes volúmenes de texto
      </p>
    </div> 
  </div>
  <div class="video-player-wrapper" style="width:50%; align:center">
    <video src="videos/u2/u2_02_motivacionAF.mp4" poster="img/u0_02_play_video.png" controls></video>
  </div>

 

---

## Un ejemplo cotidiano
<div>
  <div class="video-player-wrapper" style="width:70%">
    <video src="videos/u2/u2_03_ejemplosaeta.mp4" poster="img/tarjeta_saeta.jpeg" controls></video>
  </div>
  <div class="video-meta">
    <span><i class="fas fa-video"></i> Video Explicativo</span>
  </div>
</div>
<div class="flipped-callout">
  <h4><i class="fas fa-lightbulb"></i> Propiedad clave:</h4>
  <p>La máquina no necesita recordar qué tarjetas leyó hace una hora. El <strong>estado actual</strong> resume toda la historia relevante del sistema para tomar la siguiente decisión.</p>
</div>

---

## Autómata Finito
<p>Es una máquina conceptual, un dispositivo que puede estar en cualquiera de un numero finito de estados, de los cuales uno es el inicial y uno o más son de aceptación</p>
<div class="grid-2">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-microchip"></i></span>Componentes del autómata</h4>
     <ul>
      <li>Cinta de Entrada: Una tira dividida en celdas, donde cada celda contiene un símbolo del alfabeto. Se lee estrictamente de izquierda a derecha, un símbolo a la vez.</li>
      <li>Cabeza Lectora: El mecanismo que "mira" el símbolo actual de la cinta y se mueve una posición a la derecha tras procesarlo.</li>
      <li>Control Central: El dispositivo que posee un número finito de estados posibles y las reglas de transición que definen el comportamiento.</li>
    </ul>
  </div>
  
  <div class="card">
    <img src="img/u2_01_AF.png" style="align:center">   
  </div>
</div>

---

## Diagrama de Transiciones
<div class="onetwo-col">
  <div>
    <div class="video-player-wrapper">
      <video src="videos/u2/u2_04_diagramaAF.mp4" poster="videos/u0_01_portada_video.png" controls></video>
    </div>
    <div class="video-meta">
      <span><i class="fas fa-video"></i> Video Explicativo</span>
    </div>
  </div>  
  <div>
    <ul>
      <li>Círculo = estado</li>
      <li>Flecha etiquetada = transición</li>
      <li>Flecha "de la nada" = estado inicial</li>
      <li>Doble círculo = estado de aceptación</li>
    </ul>
    <div><img src="img/u2_02_simbolos.png" style="width:40%"></img></div>  
  </div>
</div>

---

## Más ejemplos de Autómatas Finitos

<div class="video-container-custom">
  <div class="video-player">
    <iframe 
      src="https://www.youtube.com/embed/z9YiErQI6-w?si=2KUAxFYrudu2nVmD" 
      title="Título del Video" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>

  <!-- Columna Derecha: El video de YouTube (Iframe) -->
  <div class="video-player">
    <iframe 
      src="https://www.youtube.com/embed/Q2zr8IBhc30?si=IdTkN25YejgcH65o" 
      title="Título del Video" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>
</div>


---


## Definición formal

<div style="text-align:center; margin-bottom:15px;">
<p>Formalmente un <strong>Autómata Finito Determinista</strong> se define con una quíntupla:</p>
<h4 class="text-gradient">M = (S, Σ, δ, s₀, F)</h>
</div>

<div style="display: flex;  justify-content: center; ">
<div class="card" style="width:60%; margin-bottom:15px;">
<h4 class="card-title"><span class="icon"><i class="fas fa-circle-nodes"></i></span>Componentes</h4>
<p><strong>S</strong>: conjunto finito de estados</p>
<p><strong>Σ</strong>: alfabeto de entrada</p>
<p><strong>δ</strong>: función de transición, δ: S × Σ → S</p>
<p><strong>s₀</strong>: estado inicial, s₀ ∈ S</p>
<p><strong>F</strong>: estados de aceptación, F ⊆ S</p>
</div>
</div>

---

## Aceptación de cadenas

<div class="card" style="margin-top:15px;">
<p>M acepta x₁x₂…xₙ ⟺ existe una secuencia de estados s₀, s₁, …, sₙ tal que <strong>s₀</strong> es el inicial, <strong>δ(sⱼ₋₁, xⱼ) = sⱼ</strong> para cada paso, y <strong>sₙ ∈ F</strong>.</p>
</div>


<p style="margin-top:20px;">En criollo: partiendo del estado inicial y siguiendo las transiciones símbolo a símbolo, se llega a un estado de aceptación al leer el último carácter. Si no, la cadena se <strong>rechaza</strong>.</p>

<div class="onetwo-col">
  <div >
    <div class="video-player-wrapper">
      <video src="videos/u2/u2_06_cadenaaceptadavacia.mp4" poster="videos/u0_01_portada_video.png" controls></video>
    </div>
    <div class="video-meta">
      <span><i class="fas fa-video"></i> Video Explicativo</span>
    </div>
  </div>
  <div class="card" style="margin-top:15px;">
  <h4 class="card-title"><span class="icon"><i class="fas fa-asterisk"></i></span>Caso especial: la cadena vacía (ε)</h4>
  <p>El autómata acepta ε si y solo si el <strong>estado inicial es también de aceptación</strong>: la máquina arranca, no lee nada, y ya está en un estado final.</p>
  </div>
</div>

---


## De la tabla de transiciones al código
<div class="two-col">
<div>
  <div class="video-player-wrapper">
    <video src="videos/u2/u2_07_implementacionAF.mp4" poster="videos/u0_01_portada_video.png" controls></video>
  </div>
  <div class="video-meta">
    <span><i class="fas fa-video"></i> Video Explicativo</span>
  </div>
</div>
<div>
<img src="img/u2_03_codigoAF.png"></img>
</div>
</div>

---

## Implementación

<div class="onetwo-col">
  <div>
<pre><code>
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
<p class="descripcion">Cada fila de la tabla se convierte en un bloque <code>si estado = k</code>; cada celda, en una condición sobre el carácter leído. </br>Así funciona un analizador léxico real (a mayor escala, es lo que hace Lex).</p>

</div>
<div>
<img src="img/u2_04_implemAF.png"></img>
</div>

<!-- Sugerencia adicional: mostrar también la versión en Python junto al pseudocódigo,
     ya que es el lenguaje que van a usar en el TP de Lex/Yacc. Queda como decisión editorial. -->

---
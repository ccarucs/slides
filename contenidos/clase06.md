## Los contenidos de esta clase


<div class="grid-3" style="margin-top:10px;">
  <div class="card hoja-ruta">
  <div class="card-title"><span class="icon"><i class="fas fa-route"></i></span> ¿Qué vamos a ver en esta clase?</div>
  <p>Durante las últimas semanas construimos una base teórica sólida: autómatas finitos, expresiones regulares y gramáticas regulares. Hoy vemos <strong>dónde aparece todo eso en un compilador real</strong>.</p>
</div>
<div>
     <img src="img/compu_cuaderno.jpg" style="align:center; width:100%"></img>
  </div>
  <div class="card">
     <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta de la clase </span> 
      <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; font-weight: bold;">
        <li>Tareas del scanner</li>
        <li>Token, lexema y atributo</li>
        <li>Tipos de tokens</li>
        <li>Preanálisis (lookahead)</li>
        <li>Construcción del analizador léxico </li>
      </ul>  
  </div>  
</div>
<div class="flipped-callout recordar">
    <h4><i class="fas fa-lightbulb"></i> Antes de seguir</h4>
    <p>Si todavía no tenés claros los autómatas finitos, las expresiones regulares y las gramáticas regulares (Lecciones 2 a 5), esta clase te va a costar más. Es el momento en que <strong>toda esa teoría se vuelve código</strong>.</p>
</div>


---

## El analizador léxico en el compilador

<div class="two-col-flex ratio-40-60">
  <div>
    <p>El <strong>analizador léxico</strong> (o <em>scanner</em>) es la primera fase del compilador. Recibe el programa fuente como una secuencia plana de caracteres y entrega a la siguiente fase una secuencia de <strong>tokens</strong>.</p>
    <div class="flipped-callout-bis">
      <h4><i class="fas fa-arrow-right"></i> En una frase</h4>
      <p>Flujo de caracteres adentro → flujo de tokens afuera.</p>
    </div>
  </div>
  <div>
    <img src="img/fases_AL.png" alt="Fases del compilador con el analizador léxico resaltado" style="width:80%; border-radius:12px;">
  </div>
</div>

Note: El analizador léxico recibe el programa fuente como un flujo de caracteres y entrega al analizador sintáctico un flujo de tokens. En la práctica funciona como una subrutina: el analizador sintáctico pide un nuevo token cada vez que lo necesita para construir el árbol sintáctico, y el léxico lo provee. Interactúa además con la tabla de símbolos y con el manejador de errores, igual que el resto de las fases.

---

## Las tres tareas del scanner

<div class="grid-3">
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-1"></i></span> Leer y agrupar</div>
    <p>Lee el programa fuente de izquierda a derecha, carácter por carácter, y agrupa secuencias con significado propio en <strong>tokens</strong>, que envía al analizador sintáctico.</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-2"></i></span> Filtrar</div>
    <p>Descarta lo que no forma parte de la gramática del lenguaje: espacios en blanco, tabulaciones, saltos de línea y comentarios.</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-3"></i></span> Reportar errores</div>
    <p>Lleva la cuenta del número de línea que se está leyendo, para poder informar con precisión dónde se produjo un error léxico.</p>
  </div>
</div>
<div class="video-player-wrapper" style="margin-top:24px; max-width:600px;">
  <video src="videos/c06/tareas_AL.mp4" poster="img/fase1_AL.png" controls></video>
</div>



---

## Compilación dirigida por la sintaxis
<div class="two-col">
  <div class="col">
    <div class="flipped-callout" style="margin-top:20px;">
      <h4><i class="fas fa-sync-alt"></i> ¿Quién manda?</h4>
      <p>Es el analizador sintáctico quien controla el ritmo: llama a <code>getNextToken()</code> cada vez que necesita un token nuevo, y el léxico responde llamando internamente a <code>getChar()</code> sobre el flujo de caracteres. Ambos comparten acceso a la <strong>tabla de símbolos</strong>.</p>
    </div>
    <div><img src="img/getChar_getToken.png" style="align:center"></img></div>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="width:100%">
      <video src="videos/c06/AL_subrutina.mp4" poster="img/u0_02_play_video.png" controls></video>
    </div>
  </div>
</div>
Note: Esta interacción se conoce como compilación dirigida por la sintaxis. No es el léxico el que "empuja" tokens por su cuenta: el sintáctico los pide. Este esquema (con getChar y getNextToken) es el mismo que aparece en las slides históricas y conviene mantenerlo porque se repite en la Unidad 3 cuando se construya el parser.

---

## Token, lexema y atributo

<div class="grid-3">
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-tag"></i></span> Token</div>
    <p>Categoría lógica: agrupa un conjunto de cadenas con el mismo significado. Ej.: el token <em>id</em> agrupa a todos los identificadores.</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-font"></i></span> Lexema</div>
    <p>La secuencia concreta de caracteres que pertenece a un token. Si el token es <em>id</em>, un lexema puede ser "posicion", otro "velocidad".</p>
  </div>
  <div class="card">
    <div class="card-title"><span class="icon"><i class="fas fa-database"></i></span> Atributo</div>
    <p>Información adicional útil para las fases siguientes: para un identificador, su posición en la tabla de símbolos; para un número, su valor.</p>
  </div>
</div>
<div class="two-col-flex ratio-40-60">
  <div class="col">
     <p class="descripcion" style="text-align:center;">Los tokens son los <strong>símbolos terminales</strong> de la gramática del lenguaje fuente: son los ladrillos que el analizador sintáctico usa para construir el árbol.</p>
  </div>
  <div class="col">
    <div class="video-player-wrapper" style="margin-top:10px; max-width:600px;">
      <video src="videos/c06/token_definicion.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
  </div>
</div>

Note: Este es uno de los puntos donde más se confunden los estudiantes (mezclan token con lexema). Insistir en la analogía: el token es la "categoría" (como el nombre de una especie), el lexema es el "ejemplar concreto". En la práctica, el analizador léxico entrega pares (token, lexema o atributo).

---

## Paso a paso: descomposición de una sentencia

<div class="sim-expression" style="text-align:center; font-size:1.1rem; max-width:600px; margin:0 auto 20px auto;">
  posicion := inicial + velocidad * 60
</div>

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-badge"></div>
    <p class="timeline-title">"posicion"</p>
    <p class="timeline-desc">→ token <em>id</em>, lexema "posicion" → se guarda en la tabla de símbolos.</p>
  </div>
  <div class="timeline-item">
    <div class="timeline-badge"></div>
    <p class="timeline-title">":="</p>
    <p class="timeline-desc">→ token <em>op</em>, lexema ":=".</p>
  </div>
  <div class="timeline-item">
    <div class="timeline-badge"></div>
    <p class="timeline-title">"inicial", "+", "velocidad", "*"</p>
    <p class="timeline-desc">→ id, op, id, op — mismo patrón que los anteriores.</p>
  </div>
  <div class="timeline-item">
    <div class="timeline-badge"></div>
    <p class="timeline-title">"60"</p>
    <p class="timeline-desc">→ token <em>num</em>, lexema "60".</p>
  </div>
</div>

<div class="flipped-callout-bis">
  <p><strong>Resultado:</strong> (id,"posicion") (op,":=") (id,"inicial") (op,"+") (id,"velocidad") (op,"*") (num,"60") — siete tuplas, sin los espacios en blanco, con los identificadores ya registrados en la tabla de símbolos.</p>
</div>

Note: Este es el bloque de ejemplo del guion original. Sugerencia de producción: mostrar la sentencia fija en pantalla e ir "iluminando" cada fragmento mientras aparece su tupla correspondiente, en vez de una lista estática — es más dinámico y ayuda a fijar la correspondencia carácter → token.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> En la sentencia <span class="math-lang"><code>x1 := a + b</code></span>, "<span class="math-lang">x1</span>" y "<span class="math-lang">a</span>" comparten el mismo token pero tienen distinto...</div>
<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Atributo</div>
  <div class="quiz-option" data-correct="true">Lexema</div>
  <div class="quiz-option" data-correct="false">Patrón</div>
  <div class="quiz-option" data-correct="false">Tipo de dato</div>
</div>
<div class="quiz-feedback"
     data-correct-explain="'x1' y 'a' son lexemas distintos que pertenecen ambos al mismo token (id), porque los dos siguen el patrón letra(letra|dígito)*."
     data-incorrect-explain="El token es la categoría (en este caso 'id' para ambos). Lo que cambia entre 'x1' y 'a' es la secuencia concreta de caracteres: eso es el lexema."></div>

Note: Verificar que quedó claro el bloque anterior antes de avanzar. Si la mayoría falla esta pregunta, conviene volver a la diapositiva de definiciones antes de seguir con tipos de tokens.

---

## Familias de tokens

<div class="two-col">
  <div class="grid" style="gap:20px;">
    <div class="card">
      <div class="card-title"><span class="icon"><i class="fas fa-signature"></i></span> Identificadores</div>
      <p>Nombres de variables, funciones, arreglos. Sus valores se guardan en la tabla de símbolos.</p>
      <hr>
      <div class="card-title"><span class="icon"><i class="fas fa-key"></i></span> Palabras reservadas</div>
      <p><code>if</code>, <code>then</code>, <code>else</code>, <code>while</code>... Tienen el <strong>mismo patrón</strong> que los identificadores.</p>
      <hr>
      <div class="card-title"><span class="icon"><i class="fas fa-plus"></i></span> Números y símbolos</div>
      <p>Operadores aritméticos, relacionales, paréntesis, punto y coma. </p>
      <hr>
      <div class="card-title"><span class="icon"><i class="fas fa-trash"></i></span> Tokens descartados</div>
      <p>Comentarios, espacios en blanco, tabulaciones, saltos de línea. Se reconocen, pero nunca llegan al analizador sintáctico.</p>
    </div>
 </div>
  <div class="col">
    <div class="video-player-wrapper" style="width:100%">
      <video src="videos/c06/tokens.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
      <div class="flipped-callout" style="font-size:0.85"><p>
    <span class="emoji-float"> 🤔</span>Identificadores y palabras reservadas comparten exactamente el mismo patrón <code>letra(letra|dígito)*</code>, ¿Cómo hace el analizador léxico para distinguirlos?</p>
    </div>
  </div>

</div>
Note: Remarcar el caso de las palabras reservadas porque es una de las dificultades típicas al implementar el lexer a mano o en PLY: hay que resolver la colisión de patrones, normalmente con una tabla de palabras clave que se consulta antes de decidir que algo es un identificador genérico.


---


## Tokens y expresiones regulares
<div class="two-col">
  <div class="video-player-wrapper" style="width:100%">
    <video src="videos/c06/tokens_ejemplos.mp4" poster="img/miraestevideo.png" controls></video>
  </div>
  <div class="col">
    <span><i class="fas fa-pencil"></i><p>Para cada token de la tabla escribir la <strong>expresión regular</strong> que lo represente</p>
    <table class="compare-table" >
      <tr><th>Token</th><th>Ejemplo de lexemas</th></tr>
      <tr><td>identif</td><td>"cont", "x1"</td></tr>
      <tr><td>pal_res</td><td>"for", "do"</td></tr>
      <tr><td>oper</td><td>"+", "*"</td></tr>
      <tr><td>cadena</td><td>"dni", "nombre"</td></tr>
    </table>
  </div>
</div>

---

## El mecanismo de preanálisis (lookahead)

<p>A veces un solo carácter no alcanza para decidir qué token se encontró. Ejemplo: el analizador lee <code>&gt;</code>. ¿Qué token es? Depende del carácter siguiente.</p>
<div class="video-player-wrapper" style="width:80%">
    <video src="videos/c06/preanalisis.mp4" poster="img/miraestevideo_2.png" controls></video>
  </div>
<div class="flipped-callout" >
  <p>Al carácter que se mira por adelantado sin consumirlo se lo llama <strong>símbolo de preanálisis</strong>. Es una técnica fundamental que veremos en las próximas lecciones </p>
</div>

Note: Al carácter que se mira por adelantado sin consumirlo se lo llama símbolo de preanálisis. Es una técnica fundamental que va a reaparecer en la Lección 7 (Lex) y en la Unidad 3. Sugerencia de producción: mostrar primero solo el símbolo ">" en pantalla, luego el carácter siguiente con un signo de interrogación, y recién después revelar los dos caminos posibles — refuerza mejor la idea de "mirar antes de decidir" que una explicación puramente textual.

---

## Responde la siguiente pregunta

 <div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> El analizador léxico lee "<span class="math-lang">></span>" y el siguiente carácter es un espacio en blanco. ¿Qué hace con ese espacio?</div>

<div class="quiz-container"> 
  <div class="quiz-option" data-correct="false">Lo incluye como parte del lexema ">"</div>
  <div class="quiz-option" data-correct="false">Genera un error léxico</div>
  <div class="quiz-option" data-correct="true">Lo descarta, sin devolverlo como próximo carácter útil</div>
  <div class="quiz-option" data-correct="false">Lo devuelve como token separado</div>
</div>
<div class="quiz-feedback"
     data-correct-explain="El estado marcado con asterisco indica 'devolver el token > y descartar el blanco leído', ya que el blanco no aporta nada al próximo token."
     data-incorrect-explain="El blanco fue leído solo para decidir que no era '=' . Como el blanco tampoco es un carácter significativo para ningún otro token, se descarta directamente (a diferencia de cuando el carácter siguiente sí es parte de otro token, en cuyo caso se retrocede con ungetc)."></div>

Note: Esta pregunta distingue dos subcasos del preanálisis que suelen confundirse: "retroceder porque el carácter pertenece al próximo token" vs. "descartar porque es un espacio en blanco". Vale la pena aclararlo verbalmente aunque la mayoría acierte.

---

## Construcción del analizador léxico

<div class="two-col">
  <div class="col">    
    <div class="card">
      <div class="card-title"><span class="icon"><i class="fas fa-hammer"></i></span> "A mano"</div>
      <p>Se implementa directamente el código que reconoce cada token, con estructuras de control que replican el comportamiento de un autómata.</p>
      <p class="descripcion"><i class="fas fa-thumbs-down" style="color:var(--accent-danger)"></i> Viable solo para lenguajes muy pequeños. Escala mal: tedioso, propenso a errores, difícil de mantener.</p>
    </div>
    <div class="card">
      <div class="card-title"><span class="icon"><i class="fas fa-cogs"></i></span> Con generador automático</div>
      <p>Se describen los tokens con expresiones regulares y una herramienta genera el código del analizador. La clásica: <strong>Lex</strong>. En Python: <strong>PLY</strong> (Python Lex-Yacc).</p>
      <p class="descripcion"><i class="fas fa-thumbs-up" style="color:var(--accent-success)"></i> Es el enfoque que se usa en la práctica, y el que vamos a usar en el proyecto integrador.</p>
    </div>
  </div>
  <div class="col">
  <div class="video-player-wrapper" style="width:100%">
    <video src="videos/c06/AL_construccion.mp4" poster="img/miraestevideo_2.png" controls></video>
  </div>
  </div>
</div>

Note: Llegamos al corazón de la clase. Marcar con claridad que en el proyecto integrador se va a trabajar exclusivamente con el segundo enfoque (PLY), pero que entender el primero (a mano) es indispensable para comprender qué hace la herramienta "por debajo".

---

## El pipeline de construcción automática

<div class="two-col">
  <div class="col">
    <div class="video-player-wrapper" style="width:100%">
      <video src="videos/c06/pipeline_AL.mp4" poster="img/compu_AL.png" controls></video>
    </div>
  </div>

  <div class="col">
    <div class="card">
      <p class="descripcion"><strong>① ER → AFND</strong>: construcción de Thompson (Lección 4).</p>
      <p class="descripcion"><strong>② AFND → AFD</strong>: conversión por subconjuntos (Lección 3).</p>
      <p class="descripcion"><strong>③ AFD → AFD mínimo</strong>: minimización de estados.</p>
      <p class="descripcion"><strong>④ AFD mínimo → Código</strong>: cada estado se traduce en un <code>case</code> de un <code>switch</code>.</p>
    </div>
  </div>
</div>
<div class="flipped-callout-bis" style="margin-top:10px;">
  <p><i class="fas fa-magic"></i> Cuando se usa Lex o PLY, solo hace falta escribir las expresiones regulares. La herramienta resuelve los pasos automáticamente.</p>
</div>

Note: Esta es la slide clave de toda la clase, según las notas de producción del guion original: conviene armarla progresivamente, un bloque y una flecha por vez, nombrando en qué lección anterior se estudió cada transformación. Que el estudiante vea el mapa completo armándose en pantalla es más potente que mostrarlo todo junto de entrada.

---


## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> En el pipeline <span class="math-lang">ER → AFND → AFD → Código</span>, ¿qué algoritmo se usa específicamente para pasar de la expresión regular al AFND?</div>

<div class="quiz-container">
  <div class="quiz-option" data-correct="false">Minimización de estados</div>
  <div class="quiz-option" data-correct="false">Conversión por subconjuntos</div>
  <div class="quiz-option" data-correct="true">Construcción de Thompson</div>
  <div class="quiz-option" data-correct="false">Algoritmo de Earley</div>
</div>
<div class="quiz-feedback"
     data-correct-explain="La construcción de Thompson (vista en la Lección 4) traduce cualquier expresión regular en un AFND equivalente."
     data-incorrect-explain="La construcción de Thompson es el algoritmo que convierte una ER en AFND. La conversión por subconjuntos es el paso siguiente (AFND → AFD), y la minimización es el paso posterior a eso."></div>

Note: Esta pregunta funciona como repaso integrador de toda la Unidad 2: conecta explícitamente el nombre de cada algoritmo con el paso del pipeline al que corresponde. Si hay dudas, es buen momento para repasar brevemente el mapa completo antes de seguir.

---

## Resumen y cierre de la Unidad 2

<div class="three-col-flex ratio-equal" style="text-align:center;">
  <div class="card">
    <div class="card-title" style="justify-content:center;"><i class="fas fa-check-double"></i> Autómatas finitos</div>
    <p class="descripcion">Reconocen si una cadena pertenece a un lenguaje.</p>
  </div>
  <div class="card">
    <div class="card-title" style="justify-content:center;"><i class="fas fa-code"></i> Expresiones regulares</div>
    <p class="descripcion">Describen de forma compacta el patrón de cada token.</p>
  </div>
  <div class="card">
    <div class="card-title" style="justify-content:center;"><i class="fas fa-project-diagram"></i> Gramáticas regulares</div>
    <p class="descripcion">Generan cadenas del lenguaje mediante producciones.</p>
  </div>
</div>

<div class="flipped-callout" style="text-align:center; margin-top:15px;">
  <p><i class="fas fa-cogs"></i> El <strong>analizador léxico</strong> es donde estas tres piezas se ponen a trabajar juntas: ejecuta lo que las ER describen y las GR generan, usando autómatas finitos como motor de reconocimiento.</p>
</div>

<img src="img/cierre_u2.jpeg" alt="Mapa conceptual de cierre de la Unidad 2" style="max-width:500px; margin:10px auto 0 auto; display:block; border-radius:12px;">


Note: Con esto se cierra la Unidad 2 completa (Lecciones 2 a 6). Mensaje de puente hacia la Unidad 3: si el analizador léxico usa autómatas finitos y expresiones regulares para reconocer tokens, el analizador sintáctico va a usar gramáticas independientes del contexto y autómatas con pila para reconocer la estructura del programa — un problema más complejo, con herramientas más poderosas.


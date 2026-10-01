<!-- HOJA DE RUTA --->
<h2>¿Qué aprendemos en esta clase?</h2>

<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 15px !important;">
  <h4><i class="fas fa-sitemap"></i> Unidad 3: Análisis Sintáctico Descendente Recursivo</h4>
  <p>En las clases anteriores construimos las bases teóricas: Gramáticas Libres de Contexto y Autómatas con Pila. En esta clase transformamos la teoría en código real estudiando el <strong>Análisis Sintáctico Descendente Recursivo</strong>, la técnica fundamental para entender el funcionamiento interno de un parser.</p>
</div>

<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta (primera parte)</span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; ">
      <li>Tipos de analizadores sintácticos</li>
      <li>Árbol de análisis sintáctico</li>
      <li>Parsers: Top-Down vs. Bottom-Up</li>
      <li>El símbolo de preanálisis (lookahead) </li>
      <li>Descenso recursivo</li>
      <li>Limitación crítica: Recursividad por la izquierda</li>
      <li>De la gramática al código ejecutable</li>
    </ul>       
  </div>  
  <div>
    <!-- PROMPT PARA GENERAR IMAGEN:
    Ilustración conceptual y tecnológica de la fase de Análisis Sintáctico: una corriente brillante de tokens ingresa por la izquierda a un procesador futurista y se transforma en un árbol jerárquico estructurado (Parse Tree) con nodos interconectados con destellos de luz cian y azul sobre fondo oscuro.
    -->
    <div class="video-player-wrapper" style="margin-top: 10px;">
      <video src="videos/c09/as_introduccion.mp4" poster="img/fases_AS.png" controls></video>
    </div>
  </div>  
</div>

Note:
Bienvenidos a la clase 9. En las lecciones anteriores construimos la base teórica con gramáticas libres de contexto y autómatas con pila. Hoy daremos el paso crucial hacia la práctica: cómo convertir una gramática formal en un programa ejecutable que lea tokens y determine si una secuencia de código es sintácticamente correcta. Estudiaremos el Análisis Sintáctico Descendente Recursivo, comprendiendo su arquitectura, el uso del símbolo de preanálisis, el mecanismo de retroceso y las restricciones estructurales que impone sobre las gramáticas.

---

## El Rol del Analizador Sintáctico 

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <p style="font-size:0.85rem;">
      El <strong>Analizador Sintáctico</strong> (<em><strong>parser</strong></em>) recibe la secuencia de componentes léxicos (tokens) entregada por el analizador léxico y comprueba si satisface las reglas gramaticales del lenguaje.
    </p>    
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.9rem;"><i class="fas fa-tasks"></i> Tareas Principales del Parser</h4>
      <ul style="font-size:0.75rem; line-height:1.5;">
        <li>Verificar la <strong>validez sintáctica</strong> de la cadena de entrada.</li>
        <li>Construir la representación intermedia jerárquica (<strong>Árbol de Análisis Sintáctico</strong>).</li>
        <li>Reportar errores sintácticos con mensajes claros y recuperarse para continuar el análisis.</li>
      </ul>
    </div>
    
  </div>
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama de arquitectura de compiladores resaltando el bloque del Analizador Sintáctico. A la izquierda llega 'Token Stream' proveniente del Léxico, al centro el 'Parser' consulta la 'Tabla de Símbolos', y a la derecha emite el 'Árbol Sintáctico' (Parse Tree). Estilo limpio de infografía técnica.
    -->
    <div class="video-player-wrapper" style="width:95%">
      <video src="videos/c09/as_parser.mp4" poster="img/fase2_AS.png" controls></video>
     </div>
    <div class="flipped-callout recordar" style="margin-top:10px;">
      <h4><i class="fas fa-exchange-alt"></i> Interfaz Léxico ↔ Sintáctico</h4>
      <p style="font-size:0.75rem;">
        El parser actúa como director: solicita el siguiente token al analizador léxico mediante llamadas a <code>siguiente_token()</code> a medida que requiere avanzar en la lectura.
      </p>
    </div>
  </div>
</div>

Note:
El analizador sintáctico ocupa el segundo lugar en el front-end del compilador. Su tarea fundamental no es solo decir si un programa es válido o no, sino construir la estructura jerárquica que representa el significado operacional del código. Trabaja en estrecha interacción con el analizador léxico, pidiéndole tokens a demanda mientras valida las reglas de la gramática.

---

## Dos Familias de Parsers

<p style="font-size:0.85rem; text-align:center;">Los algoritmos de análisis sintáctico se dividen en dos grandes familias según el sentido en que construyen el árbol:</p>

<div class="two-col-flex ratio-50-50">
  <div class="col">
    <div class="card" style="border-top:4px solid var(--accent-color); padding:12px;">
      <h3 style="margin-top:0; font-size:1.05rem; color:var(--accent-color);">
        <i class="fas fa-arrow-down"></i> Descendente (Top-Down)
      </h3>
      <ul style="font-size:0.75rem; line-height:1.5;">
        <li>Construye el árbol <strong>desde la raíz hacia las hojas</strong>.</li>
        <li>Parte del <strong>símbolo inicial</strong> de la gramática e intenta derivar la cadena de entrada.</li>
        <li>Expande No Terminales aplicando producciones.</li>
        <li><em>Ventaja:</em> Muy intuitivo y fácil de construir manualmente.</li>
      </ul>
    </div>
  </div>
  <div class="col">
    <div class="card" style="border-top:4px solid #9c27b0; padding:12px;">
      <h3 style="margin-top:0; font-size:1.05rem; color:#9c27b0;">
        <i class="fas fa-arrow-up"></i> Ascendente (Bottom-Up)
      </h3>
      <ul style="font-size:0.75rem; line-height:1.5;">
        <li>Construye el árbol <strong>desde las hojas hacia la raíz</strong>.</li>
        <li>Parte de los <strong>tokens de entrada</strong> y los reduce hasta alcanzar el símbolo inicial.</li>
        <li>Sustituye subcadenas por No Terminales (reducciones).</li>
        <li><em>Ventaja:</em> Soporta una clase más amplia de gramáticas.</li>
      </ul>
    </div>
  </div>
</div>


Note:
Existen dos formas opuestas de construir el árbol sintáctico. El enfoque descendente (Top-Down) comienza en el símbolo inicial y busca derivar los tokens de entrada expandiendo no terminales de arriba hacia abajo. El enfoque ascendente (Bottom-Up) parte de las hojas (los tokens reales) y va agrupándolos en subárboles hasta llegar a la raíz. En esta lección nos enfocamos en los métodos descendentes.

---

## Descendente o Ascendente?

<div class="flipped-callout recordar" style="margin-top:10px;">
      <p style="font-size:0.7rem;">
        El enfoque <strong>descendente (Top-Down) </strong> comienza en el símbolo inicial y busca derivar los tokens de entrada expandiendo no terminales de arriba hacia abajo. El enfoque <strong>ascendente (Bottom-Up)</strong> parte de las hojas (los tokens reales) y va agrupándolos en subárboles hasta llegar a la raíz. 
      </p>
    </div>
<div class="video-player-wrapper" style="margin-top: 10px;">
  <video src="videos/c09/as_tiposparser.mp4" poster="img/miraestevideo.png" controls></video>
</div>

---

## Construcción de árbol sintáctico

<p>Empezamos viendo un ejemplo de cómo se construye un árbol de análisis de sintáctico de forma <strong>descendente</strong>. Luego formalizaremos este proceso.</p>
<div class="video-player-wrapper" style="margin-top: 10px; width:80%">
  <video src="videos/c09/as_construccion_arbol.mp4" poster="img/miraestevideo.png" controls></video>
</div>

---

## Tipos de analizadores sintácticos descendente
<div class="flipped-callout recordar" style="margin-top:10px;">
      <p style="font-size:0.7rem;">
        El análisis sintántico descendente se puede realizar de distintas maneras. En esta lección nos enfocamos en el método predictivo recursivo.
      </p>
    </div>
<div class="video-player-wrapper" style="margin-top: 10px;">
  <video src="videos/c09/as_tipos_descendentes.mp4" poster="img/miraestevideo_2.png" controls></video>
</div>

---


## Descenso Recursivo con Retroceso

<p style="font-size:0.85rem; text-align:center;">Cuando hay varias producciones para un No Terminal y no sabemos cuál elegir, podemos probar una alternativa y, si falla, <strong>retroceder</strong> al estado anterior.</p>

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-vial"></i> Ejemplo de Gramática y Entrada</h4>
      <div style="font-size:1rem; font-family:monospace; background:rgba(0,0,0,0.2); padding:8px; border-radius:5px;">
        Gramática: 
        <br> S → c A d &nbsp;
        <br> A → a b | a<br>
        Entrada: &nbsp;&nbsp;&nbsp; w = c a d
      </div>      
    </div>
  </div>

  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Esquema comparativo en 3 pasos (a, b, c) mostrando la evolución del árbol sintáctico para 'S -> c A d' con la entrada 'c a d'. En el paso b aparece una cruz roja sobre la hoja 'b' indicando retroceso (backtracking), y en el paso c aparece un tilde verde indicando aceptación.
    -->
    <ol style="font-size:0.85rem; line-height:1.4; margin-top:8px; margin-left:15px;">
        <li>Se expande \(S \rightarrow c A d\). El token \(c\) coincide con <code>lookahead</code> \(c\). Se avanza a \(a\).</li>
        <li>Para \(A\), se prueba la 1ª alternativa: \(A \rightarrow a b\).</li>
        <li>El terminal \(a\) coincide. Se avanza a \(d\). Pero la hoja actual es \(b\). <strong>¡Fallo de coincidencia!</strong></li>
        <li><strong>Retroceso:</strong> Se deshace la expansión de \(A\) y se rebobina la entrada al token \(a\).</li>
        <li>Se prueba la 2ª alternativa: \(A \rightarrow a\). Coincide \(a\) y luego \(d\). <strong>¡Análisis Exitoso!</strong></li>
      </ol>
  </div>
</div>
<img src="img/ej_retroceso.jpg" alt="Pasos de traza con retroceso (Árboles a, b, c)" style="width:50%; border-radius:8px; display:block;">

Note:
El descenso recursivo con retroceso o backtracking es la versión más general pero intuitiva. Si nos encontramos ante una ramificación en la gramática, intentamos la primera alternativa. Si más adelante descubrimos que esa elección nos lleva a un callejón sin salida donde los tokens no coinciden, volvemos atrás en el árbol y en la secuencia de entrada para intentar la siguiente alternativa.

---

## Evaluación del Retroceso (Backtracking)

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:10px; border-left:4px solid #4caf50;">
      <h4 class="card-title" style="font-size:0.85rem; color:#4caf50;"><i class="fas fa-thumbs-up"></i> Ventajas</h4>
      <ul style="font-size:0.75rem; line-height:1.4;">
        <li>Conceptualmente muy sencillo y fácil de razonar a mano.</li>
        <li>Permite trabajar con gramáticas más amplias sin requerir que sean strictly deterministas en cada paso.</li>
      </ul>
    </div>
  </div>
  
  <div class="col">
    <div class="card" style="padding:10px; border-left:4px solid var(--accent-danger);">
      <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-danger);"><i class="fas fa-thumbs-down"></i> Desventajas Críticas</h4>
      <ul style="font-size:0.75rem; line-height:1.4;">
        <li><strong>Alto costo computacional:</strong> En el peor de los casos, el tiempo de ejecución es exponencial respecto a la longitud de la entrada.</li>
        <li>Reexamina repetidamente los mismos tokens de entrada.</li>
        <li>Hace difícil la emisión de mensajes de error sintáctico precisos.</li>
      </ul>
    </div>
  </div>
</div>

<div class="flipped-callout recordar" style="margin-top:12px;">
  <h4><i class="fas fa-lightbulb"></i> Conclusión Práctica para Compiladores Reales</h4>
  <p style="font-size:0.75rem;">
    Debido a su ineficiencia, los compiladores de producción <strong>evitan el retroceso</strong>. En su lugar, transforman la gramática para construir <strong>parsers predictivos</strong> (que eligen la regla correcta observando solo 1 token de preanálisis sin volver atrás).
  </p>
</div>

Note:
Aunque el retroceso funciona teóricamente, en la práctica es prohibitivo para compiladores reales. Imaginen compilar un archivo de miles de líneas donde el parser tenga que rehacer el trabajo una y otra vez por haber elegido una alternativa incorrecta. Por eso, en la práctica buscamos gramáticas deterministas que nos permitan predecir la regla exacta a aplicar sin necesidad de retroceder.


---

## Descenso Recursivo

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="flipped-callout-bis" style="text-align:center; padding:12px; margin-bottom:12px;">
      <h3 style="margin:0; font-size:1.2rem; color:var(--accent-color);">
        <i class="fas fa-code-branch"></i> Símbolo No Terminal \(\rightarrow\) Procedimiento / Función
      </h3>
      <p style="font-size:0.8rem; margin-top:4px;">Cada No Terminal de la gramática se traduce en una función ejecutable en el código del parser.</p>
    </div>
    <div class="card" style="padding:10px;">
      <p style="font-size:0.75rem; margin-top:8px;">
      Se denomina <strong>recursivo</strong> porque las funciones se invocan entre sí siguiendo la estructura recursiva de las producciones gramaticales.
    </p>
    </div>    
  </div>

  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-eye"></i> El Símbolo de Preanálisis (Lookahead)</h4>
      <p style="font-size:0.75rem;">
        Variable global que almacena el <strong>token actual</strong> suministrado por el léxico. Permite a cada procedimiento decidir qué regla de producción aplicar.
      </p>
      <!-- PROMPT PARA GENERAR IMAGEN:
      Ilustración didáctica mostrando una cinta de tokens con una lupa brillante o flecha roja apuntando al token actual 'lookahead', mientras el código ejecutable consulta el valor del token para tomar un camino condicional      -->      
    </div>
  </div>
</div>
  <div class="video-player-wrapper" style="width:90%">
    <video src="videos/c09/as_recursivo.mp4" poster="img/miraestevideo_2.png" controls></video>
  </div>
Note:
La idea del descenso recursivo es asombrosamente simple y elegante: a cada símbolo No Terminal de nuestra gramática le hacemos corresponder una función en código. Cuando esa función se ejecuta, su objetivo es reconocer en la entrada los tokens generados por ese No Terminal. Para saber qué producción elegir cuando hay varias alternativas, la función consulta la variable global lookahead, que contiene el token actual de la entrada.

---

## Consumo de Tokens

<h5>La Función <code>parea()</code></h5>
<p style="font-size:0.85rem; text-align:center;">Para verificar y consumir los símbolos terminales de la entrada se utiliza la función auxiliar <code>parea()</code>:</p>
<div class="two-col-flex ratio-50-50">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" ><i class="fab fa-python"></i> Código de la Función parea()</h4>
      <pre style="font-size:0.75rem; margin:0; width:100%"><code class="language-python">lookahead = None  # Variable global de preanálisis
def parea(token_esperado):
    global lookahead
    if lookahead == token_esperado:
        # Avanza pidiendo el siguiente token al léxico
        lookahead = obtener_siguiente_token()
    else:
        # Lanza error de sintaxis si no coinciden
        error_sintactico(
            f"Se esperaba '{token_esperado}', "
            f"se encontró '{lookahead}'"
        )</code></pre>
    </div>
  </div>
  <div class="col">
    <div class="grid-1" style="gap:8px;">
      <div class="card" style="padding:8px;">
        <h4 class="card-title"><i class="fas fa-check"></i> 1. Verificación</h4>
        <p style="font-size:0.7rem; margin:2px 0 0 0;">Compara el token actual <code>lookahead</code> con el terminal esperado en la producción.</p>
      </div>
      <div class="card" style="padding:8px;">
        <h4 class="card-title"><i class="fas fa-forward"></i> 2. Avance</h4>
        <p style="font-size:0.7rem; margin:2px 0 0 0;">Si coinciden, consume el token invocando al léxico para cargar el nuevo <code>lookahead</code>.</p>
      </div>
      <div class="card" style="padding:8px; border-left:3px solid var(--accent-danger);">
        <h5 class="card-title"><i class="fas fa-exclamation-triangle"></i> 3. Diagnóstico</h5>
        <p style="font-size:0.7rem; margin:2px 0 0 0;">Si difieren, interrumpe la ejecución reportando la discrepancia sintáctica.</p>
      </div>
    </div>
  </div>
</div>

Note:
La función match o parea es el bloque constructor básico de los terminales. Cada vez que en una regla de producción aparece un terminal, invocamos match pasando dicho terminal como parámetro. Si el token actual coincide con lo esperado, match avanza la entrada leyendo el siguiente token. Si no coincide, se detecta inmediatamente un error sintáctico.

---

## De la Gramática al Código Real

<h5>Ejemplo Práctico</h5>
<p style="font-size:0.85rem; margin-top:0;">Traducción de una gramática de sentencias condicionales y compuestas a procedimientos en Python:</p>

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-scroll"></i> Producciones Gramaticales</h4>
      <div style="font-size:0.9rem; font-family:monospace; line-height:1.6;">
        prop → <strong>if</strong> expr <strong>then</strong> prop <strong>else</strong> prop<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| <strong>while</strong> expr <strong>do</strong> prop<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| <strong>begin</strong> lista_prop <strong>end</strong>
      </div>
    </div>    
    <div class="flipped-callout-bis" style="margin-top:10px; padding:8px;">
      <p style="font-size:0.7rem; margin:0;">
        Cada palabra clave terminal (<code>if</code>, <code>then</code>, <code>while</code>, etc.) se valida mediante <code>parea()</code>, mientras que los No Terminales (<code>expr</code>, <code>lista_prop</code>) son llamadas a sus funciones correspondientes.
      </p>
    </div>
  </div>

  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.8rem; color:var(--accent-color);"><i class="fab fa-python"></i> Implementación de proc_prop()</h4>
      <pre style="font-size:1rem; margin:0; width:100%"><code class="language-python">def proc_prop():
    if lookahead == 'if':
        parea('if')
        proc_expr()
        parea('then')
        proc_prop()
        parea('else')
        proc_prop()
    elif lookahead == 'while':
        parea('while')
        proc_expr()
        parea('do')
        proc_prop()
    elif lookahead == 'begin':
        parea('begin')
        proc_lista_prop()
        parea('end')
    else:
        error(f"Token insospechado: {lookahead}")</code></pre>
    </div>
  </div>
</div>

Note:
Observemos la belleza de la correspondencia directa entre la gramática formal y el código ejecutable. La regla prop -> if expr then prop else prop se traduce instrucción por instrucción: primero hacemos match de 'if', luego invocamos a proc_expr(), luego match de 'then', y así sucesivamente. Esta estructura directa es la que utilizaremos también en la práctica de laboratorio.

---

## Gramática → Código

<p style="font-size:0.85rem; text-align:center;">Resumen de patrones de diseño para construir <strong>parsers descendentes recursivos</strong>:</p>

<div class="card" style="padding:10px;">
  <table class="compare-table" style="font-size:1rem; width:100%;">
    <thead>
      <tr>
        <th>Elemento Gramatical</th>
        <th>Estructura en Código del Parser</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Símbolo No Terminal \(A\)</strong></td>
        <td>Definición de función <code>def proc_A():</code></td>
      </tr>
      <tr>
        <td><strong>Símbolo Terminal \(t\)</strong></td>
        <td>Invocación a la función auxiliar <code>parea(t)</code></td>
      </tr>
      <tr>
        <td><strong>Secuencia de símbolos \(A \rightarrow \alpha \; \beta \; \gamma\)</strong></td>
        <td>Secuencia consecutiva de llamadas: <code>proc_α(); proc_β(); proc_γ()</code></td>
      </tr>
      <tr>
        <td><strong>Alternativas de producción \(A \rightarrow \alpha \mid \beta\)</strong></td>
        <td>Estructura condicional:<br>
          <code>if lookahead in PRIMERO(α): proc_α()</code><br>
          <code>elif lookahead in PRIMERO(β): proc_β()</code>
        </td>
      </tr>
      <tr>
        <td><strong>Producción vacía \(A \rightarrow \epsilon\)</strong></td>
        <td>No realiza ninguna acción (bloque <code>pass</code> o retorno directo)</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="flipped-callout" style="margin-top:10px; text-align:center;">
  <p style="font-size:0.75rem; margin:0;">
    <i class="fas fa-magic"></i> Esta tabla constituye la <strong>receta universal</strong> para convertir cualquier gramática bien estructurada en un compilador o intérprete ejecutable.
  </p>
</div>

Note:
Esta tabla resume la receta de traducción universal. Cada concepto del formalismo de gramáticas libres de contexto tiene una traducción directa e inequívoca a construcciones estándar de programación estructurada: condicionales, llamadas a función y secuencias.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Por qué un analizador sintáctico descendente recursivo no puede procesar directamente una gramática con la producción <span class="math-lang"> \(E \rightarrow E + T\)</span> ?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Porque el símbolo '+' no es reconocido por el analizador léxico.</div>
  <div class="quiz-option" data-correct="true">Porque la función proc_E() se llamaría recursivamente a sí misma de forma infinita sin avanzar en la lectura de tokens de la entrada.</div>
  <div class="quiz-option" data-correct="false">Porque la función parea() solo puede procesar tokens numéricos e identificadores.</div>
  <div class="quiz-option" data-correct="false">Porque las expresiones aritméticas requieren obligatoriamente un autómata finito determinista sin pila.</div>
</div>

<div class="quiz-feedback"
     data-correct-explain="Al ser la producción E → E + T recursiva por la izquierda, la función proc_E() invoca inmediatamente a proc_E() sin ejecutar ningún parea() que avance el lookahead, produciendo un bucle infinito y desbordamiento de pila (Stack Overflow)."
     data-incorrect-explain="Recuerda que la recursividad por la izquierda directa origina una llamada recursiva a la misma función antes de consumir cualquier token de entrada, provocando una recursión infinita."></div>

Note:
Esta pregunta evalúa la comprensión conceptual sobre la limitación fundamental que imponen las gramáticas recursivas por la izquierda en el análisis sintáctico descendente.

---

## Ejercicios Propuestos

<div class="card">
  <h4 class="card-title"><i class="fas fa-pencil-alt"></i> Resolver:</h4>
  <table class="compare-table" style="font-size:1rem;">
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
          Dada la gramática \(S \rightarrow a A b \mid a B\), \(A \rightarrow w\), \(B \rightarrow w b\), realice la traza gráfica del árbol sintáctico con retroceso (backtracking) para reconocer la cadena de entrada \(w_{in} = a w b\).
        </td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td>
          Escriba los procedimientos en pseudocódigo o Python para la siguiente gramática de tipos en Pascal:
          <br>
          <code>tipo → simple | ↑ id | array [ simple ] of tipo</code><br>
          <code>simple → integer | char | num puntopunto num</code>
        </td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td>
          Identifique cuáles de las siguientes producciones contienen recursividad por la izquierda (directa o indirecta) e indique por qué fallarían en un parser descendente:
          <br>
          a) \(Expr \rightarrow Expr + Term \mid Term\) &nbsp;&nbsp;&nbsp;&nbsp; <br>
          b) \(Stmt \rightarrow \mathbf{if} \; Expr \; Stmt\)
        </td>
      </tr>
    </tbody>
  </table>
</div>

Note:
Trabajaremos sobre estos tres ejercicios en nuestra próxima sesión presencial de taller. Les servirá para afianzar el trazado de algoritmos con retroceso y la traducción manual de gramáticas a pseudocódigo antes de pasar a las transformaciones sintácticas.

---

<!-- SLIDE: Resumen de la Clase -->
<h2 class="text-gradient">Resumen de esta Clase (1ra parte)</h2> 

<div class="grid">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos hoy</h4>
    <ul style="font-size:0.8rem; line-height:1.5;">
      <li>Los parsers se dividen en dos familias: <strong>descendentes (Top-Down)</strong> y <strong>ascendentes (Bottom-Up)</strong>.</li>
      <li>El <strong>Árbol de Análisis Sintáctico</strong> representa la estructura jerárquica de la entrada según las reglas gramaticales.</li>
      <li>En el <strong>Descenso Recursivo</strong>, asignamos una función ejecutable por cada No Terminal de la gramática.</li>
      <li>El <strong>símbolo de preanálisis (lookahead)</strong> guía las decisiones y la función <code>parea()</code> consume los tokens.</li>
      <li>El <strong>retroceso (backtracking)</strong> permite evaluar alternativas pero resulta computacionalmente ineficiente.</li>
      <li>La <strong>recursividad por la izquierda</strong> invalida el parser descendente produciendo bucles infinitos.</li>
    </ul>
  </div>   
  </br>       
  <div class="card">
    <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Segunda parte de esta clase</h4>
    <p style="margin-top:12px; text-align:center; color:var(--text-muted); font-size:0.85rem;">
      Estudiaremos las <strong>Transformaciones Gramaticales</strong>: limpieza de gramáticas, eliminación de recursividad por la izquierda y factorización por la izquierda, necesarias para construir parsers correctos.
    </p>
  </div>    
</div>


Note:
Llegamos al final de la Clase 9. Hoy hemos comprendido los tipos de analizadores sintácticos, la construcción del árbol de análisis y la arquitectura del Descenso Recursivo. En la próxima clase aprenderemos cómo limpiar gramáticas, eliminar la recursividad a izquierda y factorizar prefijos comunes. ¡Nos vemos en la próxima lección!

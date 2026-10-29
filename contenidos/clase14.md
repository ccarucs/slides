<!-- HOJA DE RUTA --->
<h2>¿Qué aprendemos en esta clase?</h2>

<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 10px !important;">
  <h4><i class="fas fa-random"></i> Generación de Código Intermedio</h4>
  <p>El compilador ya reconoció los tokens, validó la estructura y comprobó el significado del programa... pero <strong>todavía no generó ni una instrucción</strong>. Hoy empezamos la <strong>síntesis</strong>: traducimos el programa a un código intermedio, y lo hacemos <strong>automáticamente</strong> desde el parser.</p>
</div>

<div class="two-col-flex ratio-40-60">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta</span>    
      <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; ">
        <li>¿Qué es el código intermedio y para qué sirve?</li>
        <li>Código de tres direcciones: cuádruplos, triples y triples indirectos</li>
        <li>Notación posfija y máquinas de pila</li>
        <li>Traducción dirigida por la sintaxis: atributo <code>lugar</code> y <code>GenC</code></li>
      </ul>       
  </div>  
  <div>
    <!-- CLIP: guion U5, Parte A — [INTRO] (qué es el código intermedio, temario) -->
    <div class="card" style="padding:6px; text-align:center;">
      <img src="img/fases_GCI.png" style="width:95%;"></img>
    </div>
  </div>  
</div>

Note:
Bienvenidos a la clase 14 y a la Unidad 5. Hasta ahora el compilador analizó el programa fuente en tres etapas: léxica, sintáctica y semántica. Pero todavía no generó ningún código. En esta clase respondemos tres preguntas: qué es el código intermedio y para qué sirve, cuáles son las representaciones más usadas y cómo el compilador las genera automáticamente durante el análisis sintáctico.

---

## ¿Por qué un Código Intermedio?

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama en abanico sobre fondo oscuro: a la izquierda un único bloque "Front-end (léxico + sintáctico + semántico)" que produce "Código intermedio" (bloque central resaltado en cian). Desde el código intermedio salen tres flechas en abanico hacia tres bloques "Back-end x86", "Back-end ARM" y "Back-end RISC-V", cada uno terminando en un ícono de chip. Estilo vectorial técnico, coherente con el resto de las clases. Nombre sugerido: img/c14_abanico_backends.png
    -->
    <div class="card" style="padding:6px; text-align:center;">
      <img src="img/abanico_backends.png" style="width:95%;"></img>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px;">
      <p style="font-size:0.72rem; line-height:1.5;">Una representación <strong>entre</strong> el código fuente y el código máquina: el lenguaje de una <strong>máquina hipotética</strong>, pensado para facilitar el trabajo del compilador.</p>
    </div>
    <div class="flipped-callout" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.7rem; margin:0;"><i class="fas fa-check-double"></i> Debe ser <strong>fácil de producir</strong> a partir del análisis semántico y <strong>fácil de traducir</strong> al programa objeto.</p>
    </div>
  </div>
</div>
<div class="two-col-equal" style="margin-top:8px;">
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.8rem; color:var(--accent-color);"><i class="fas fa-recycle"></i> 1. Portabilidad ("reciclado")</h4>
    <p style="font-size:0.68rem; margin:0;">El front-end es el mismo para todas las arquitecturas; solo el back-end se adapta a cada procesador. GCC y LLVM aprovechan este principio.</p>
  </div>
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.8rem; color:var(--accent-secondary);"><i class="fas fa-tachometer-alt"></i> 2. Optimización</h4>
    <p style="font-size:0.68rem; margin:0;">Algunas optimizaciones son más sencillas en el nivel intermedio. Ej.: <strong>asignación de registros</strong>, se usan variables auxiliares sin restricciones y luego se mapean a registros físicos.</p>
  </div>
</div>

Note:
¿Por qué no traducir directamente a código máquina? Por dos razones: portabilidad y optimización. Con un código intermedio, las diferencias entre arquitecturas aparecen recién en la etapa posterior.

---

## Tres Formas de Representarlo

<div class="grid-3">
  <div class="card" style="padding:10px;">
    <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-color);"><i class="fas fa-th-list"></i> Código de tres direcciones</h4>
    <p style="font-size:0.72rem;">Proposiciones con un único operador:</p>
    <p style="font-size:0.85rem; text-align:center;"><code>res := arg1 op arg2</code></p>
  </div>
  <div class="card" style="padding:10px;">
    <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-secondary);"><i class="fas fa-layer-group"></i> Notación posfija</h4>
    <p style="font-size:0.72rem;">El operador va después de los operandos; se evalúa con una pila:</p>
    <p style="font-size:0.85rem; text-align:center;"><code>a b +</code></p>
  </div>
  <div class="card" style="padding:10px;">
    <h4 class="card-title" style="font-size:0.85rem; color:var(--accent-success);"><i class="fas fa-sitemap"></i> Árbol sintáctico</h4>
    <p style="font-size:0.72rem;">El árbol de análisis sin información redundante (árbol sintáctico abstracto).</p>
  </div>
</div>

<div class="flipped-callout-bis" style="margin-top:10px; padding:8px;">
  <p style="font-size:0.75rem; margin:0; text-align:center;"><i class="fas fa-bullseye"></i> En esta clase trabajamos en profundidad las dos primeras: <strong>código de tres direcciones</strong> y <strong>notación posfija</strong>.</p>
</div>

Note:
El árbol sintáctico como representación intermedia aparece en la bibliografía; en esta clase nos concentramos en el código de tres direcciones y en la notación posfija, que son las que vamos a generar con traducción dirigida por la sintaxis.

---

## Código de Tres Direcciones

<div class="card" style="padding:10px;">
  <p style="font-size:1rem; text-align:center; margin:4px 0;"><code>res := arg1 op arg2</code></p>
  <ul style="font-size:0.7rem; line-height:1.55;">
    <li>Dos operandos y un resultado: <strong>tres "direcciones"</strong>.</li>
    <li><code>arg1</code>, <code>arg2</code>: identificadores del programador, constantes o <strong>variables auxiliares</strong>.</li>
    <li><code>res</code>: variable auxiliar creada por el compilador y registrada en la <strong>tabla de símbolos</strong>.</li>
  </ul>
</div>
<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div  style="margin-top:8px;">
      <div class="card" style="padding:8px; text-align:center;">
        <p style="font-size:0.62rem; margin:0;">Una expresión, varios operadores</p>
        <p style="font-size:0.8rem; margin:4px 0;"><code>z := x + y – x * y</code></p>
      </div>
    </div>
  </div>
  <div class="col">
    <!-- CLIP: guion U5, Parte A — [DESARROLLO: ¿Qué es el código intermedio?] y [Código de tres direcciones] -->
          <div class="card" style="padding:8px;">
        <p style="font-size:0.62rem; margin:0; text-align:center;">Un operador por línea</p>
<pre style="font-size:0.7rem; margin:4px 0;"><code>v1 := x + y
v2 := x * y
v3 := v1 – v2
z  := v3</code></pre>
      </div>
  </div>
</div>
<div class="card" style="padding:6px; text-align:center;">
    <img src="img/gci_ejemplo.png" style="width:75%;"></img>
  </div>

Note:
La clave está en que las expresiones complejas, con varios operadores, se descomponen en una secuencia de proposiciones simples con un único operador. v1, v2 y v3 son variables auxiliares: las crea el compilador, no el programador.

---

## Linealizar el Árbol
<!-- PROMPT PARA GENERAR IMAGEN:
    Árbol sintáctico de la expresión x + y – x * y sobre fondo oscuro: raíz '–' (etiqueta v3), hijo izquierdo '+' (etiqueta v1) con hojas x e y, hijo derecho '*' (etiqueta v2) con hojas x e y. Los nodos interiores resaltados en cian con su variable auxiliar en un recuadro; las hojas en gris. Flechas punteadas numeradas 1, 2, 3 indicando el orden en que se generan las proposiciones (primero +, luego *, luego –). Estilo técnico, tipografía monoespaciada. Nombre sugerido: img/c14_arbol_tres_dir.png
    -->   
<div class="two-col"> 
    <div class="col" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.82rem;"><i class="fas fa-stream"></i> ¿Cómo se hace la descomposición?</h4>
      <ul style="font-size:0.72rem; line-height:1.6;">
        <li>La hace el <strong>analizador sintáctico</strong>: equivale a <strong>linealizar</strong> el árbol de análisis de la expresión.</li>
        <li>Las <strong>hojas</strong> son los operandos (<code>x</code>, <code>y</code>).</li>
        <li>Cada <strong>nodo interior</strong> es una operación y se convierte en <strong>una proposición</strong> con su variable auxiliar.</li>
        <li>La estructura viene definida por las <strong>reglas de la gramática</strong>.</li>
      </ul>
    </div>
    <div class="col">
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead><tr><th>Nodo</th><th>Proposición</th></tr></thead>
        <tbody>
          <tr><td><code>+</code></td><td><code>v1 := x + y</code></td></tr>
          <tr><td><code>*</code></td><td><code>v2 := x * y</code></td></tr>
          <tr><td><code>–</code></td><td><code>v3 := v1 – v2</code></td></tr>
        </tbody>
      </table>
    </div>
</div>
<div style="padding:6px; text-align:center;">
      <img src="img/arbol_3_dir.png" style="width:70%;"></img>
    </div>

Note:
El compilador recorre el árbol y, en cada nodo interior, genera una proposición de tres direcciones con una variable auxiliar que almacena el resultado parcial. Esta idea es la que vamos a automatizar en la segunda parte de la clase.

---

## Implementación (1): Cuádruplos

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:8px;">
      <p style="font-size:0.72rem; margin:0 0 6px 0;">Un registro de <strong>cuatro campos</strong> por proposición: <code>op | arg1 | arg2 | res</code></p>
      <table class="compare-table" style="font-size:0.95rem; width:100%;">
        <thead><tr><th>#</th><th>op</th><th>arg1</th><th>arg2</th><th>res</th></tr></thead>
        <tbody>
          <tr><td>1</td><td><code>ADD</code></td><td><code>x</code></td><td><code>y</code></td><td style="color:var(--accent-color);"><strong><code>v1</code></strong></td></tr>
          <tr><td>2</td><td><code>MUL</code></td><td><code>x</code></td><td><code>y</code></td><td style="color:var(--accent-color);"><strong><code>v2</code></strong></td></tr>
          <tr><td>3</td><td><code>SUB</code></td><td><code>v1</code></td><td><code>v2</code></td><td style="color:var(--accent-color);"><strong><code>v3</code></strong></td></tr>
          <tr><td>4</td><td><code>STO</code></td><td><code>v3</code></td><td>—</td><td><code>z</code></td></tr>
        </tbody>
      </table>
      <p style="font-size:0.62rem; color:var(--text-muted); margin:4px 0 0 0;"><code>STO</code> (<em>store</em>): asigna el valor de <code>v3</code> a la variable <code>z</code> del programa.</p>
    </div>
  </div>
  <div class="col">
    <div class="flipped-callout" style="padding:8px;">
      <p style="font-size:0.7rem; margin:0;"><i class="fas fa-link"></i> <code>arg1</code>, <code>arg2</code> y <code>res</code> son, en general, <strong>punteros a la tabla de símbolos</strong>: así el compilador accede a tipo, alcance y ubicación de cada variable.</p>
    </div>
  </div>
</div>
<div class="grid-2" style="margin-top:8px;">
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.72rem; color:var(--accent-success);"><i class="fas fa-plus"></i> Ventaja</h4>
    <p style="font-size:0.64rem; margin:0;">Simples y claros: cada proposición es autocontenida y su resultado se localiza por nombre.</p>
  </div>
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.72rem; color:var(--accent-danger);"><i class="fas fa-minus"></i> Desventaja</h4>
    <p style="font-size:0.64rem; margin:0;">Requieren espacio en la tabla de símbolos para todas las variables auxiliares.</p>
  </div>
</div>

Note:
El código de tres direcciones es el concepto; para implementarlo hay que elegir una estructura de datos concreta. Existen tres alternativas: cuádruplos (o cuartetos), triples (o tercetos) y triples indirectos. Empezamos por la más directa.

---

## Implementación (2): Triples

<div class="card" style="padding:8px;">
  <p style="font-size:0.72rem; margin:0 0 6px 0;">Solo <strong>tres campos</strong>: <code>op | arg1 | arg2</code>. El resultado de una proposición anterior se referencia con su <strong>número entre paréntesis</strong>.</p>
  <table class="compare-table" style="font-size:0.95rem; width:100%;">
    <thead><tr><th>#</th><th>op</th><th>arg1</th><th>arg2</th></tr></thead>
    <tbody>
      <tr><td>1</td><td><code>ADD</code></td><td><code>x</code></td><td><code>y</code></td></tr>
      <tr><td>2</td><td><code>MUL</code></td><td><code>x</code></td><td><code>y</code></td></tr>
      <tr style="background:rgba(255,200,0,0.12);"><td>3</td><td><code>SUB</code></td><td><strong><code>(1)</code></strong></td><td><strong><code>(2)</code></strong></td></tr>
      <tr><td>4</td><td><code>STO</code></td><td><strong><code>(3)</code></strong></td><td><code>z</code></td></tr>
    </tbody>
  </table>
  <p style="font-size:0.62rem; color:var(--text-muted); margin:4px 0 0 0;"><code>(n)</code> = resultado de la proposición <em>n</em>, no un valor.</p>
</div>
<div class="two-col">
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.72rem; color:var(--accent-success);"><i class="fas fa-plus"></i> Ventaja</h4>
      <p style="font-size:0.66rem; margin:0;">Ahorro de espacio: no hay variables auxiliares ni hay que guardarlas en la tabla de símbolos.</p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:8px; margin-top:8px;">
      <h4 class="card-title" style="font-size:0.72rem; color:var(--accent-danger);"><i class="fas fa-minus"></i> Desventaja</h4>
      <p style="font-size:0.66rem; margin:0;">Muy sensibles al <strong>reordenamiento</strong>: si el optimizador mueve una proposición, todas las referencias a ella quedan desactualizadas.</p>
    </div>
  </div>
</div>

Note:
La proposición 3 dice: restar el resultado de la proposición 1 menos el de la proposición 2. La 4: almacenar el resultado de la 3 en z. El problema aparece al optimizar, porque reordenar obliga a recalcular las referencias.

---

## Implementación (3): Triples Indirectos

<div class="card" style="padding:8px;">
      <div class="two-col-flex ratio-30-70">
        <div>
          <p style="font-size:0.66rem; margin:0; text-align:center;"><strong>props</strong> (orden deseado)</p>
          <table class="compare-table" style="font-size:0.9rem; width:100%;">
            <thead><tr><th>#</th><th>→</th></tr></thead>
            <tbody>
              <tr><td>0</td><td><code>(21)</code></td></tr>
              <tr><td>1</td><td><code>(22)</code></td></tr>
              <tr><td>2</td><td><code>(23)</code></td></tr>
              <tr><td>3</td><td><code>(24)</code></td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <p style="font-size:0.66rem; margin:0; text-align:center;"><strong>triples</strong> (en memoria)</p>
          <table class="compare-table" style="font-size:0.9rem; width:100%;">
            <thead><tr><th>#</th><th>op</th><th>arg1</th><th>arg2</th></tr></thead>
            <tbody>
              <tr><td>(21)</td><td><code>ADD</code></td><td><code>x</code></td><td><code>y</code></td></tr>
              <tr><td>(22)</td><td><code>MUL</code></td><td><code>x</code></td><td><code>y</code></td></tr>
              <tr><td>(23)</td><td><code>SUB</code></td><td><code>(21)</code></td><td><code>(22)</code></td></tr>
              <tr><td>(24)</td><td><code>STO</code></td><td><code>(23)</code></td><td><code>z</code></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
<div class="two-col-flex ratio-40-60">
  <div class="col">
     <div class="card" style="margin-top:15px; padding:10px;">
      <p style="font-size:0.7rem; line-height:1.5;">Se agrega una lista auxiliar <strong><code>props</code></strong> con punteros a los triples: el orden de ejecución lo da la lista, no la posición física de los triples.</p>
    </div>   
  </div>
  <div class="col">
    <div class="flipped-callout" style="margin-top:15px; padding:8px;">
      <p style="font-size:0.7rem; margin:0;"><i class="fas fa-random"></i> <strong>Para reordenar</strong> solo se modifica <code>props</code>; los triples no se mueven y sus referencias siguen siendo válidas. Como reorganizar el índice de una base de datos en vez de mover los registros.</p>
    </div>
  </div>
</div>

<!-- CLIP (opcional, ubicar en esta diapositiva o en la de cuádruplos): guion U5, Parte A — [Implementación: cuádruplos], [triples] y [triples indirectos] -->


Note:
Los triples indirectos resuelven exactamente el problema del reordenamiento: al trasladar el código, las proposiciones no varían. Con triples habría que modificar todas las instrucciones; con triples indirectos, solo la lista props.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> El optimizador necesita <strong>cambiar el orden</strong> de varias proposiciones. ¿Con qué implementación esto es más barato y por qué?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">Con triples, porque al no tener variables auxiliares ocupan menos espacio.</div>
  <div class="quiz-option" data-correct="true">Con triples indirectos, porque solo se reordena la lista <code>props</code> y las referencias entre triples no cambian.</div>
  <div class="quiz-option" data-correct="false">Con cuádruplos, porque cada proposición referencia a las otras por número.</div>
  <div class="quiz-option" data-correct="false">Con cualquiera: el orden de las proposiciones no afecta a las referencias.</div>
</div>

<div class="quiz-feedback"
     data-correct-explain="En los triples indirectos el orden de ejecución lo determina props. Los triples quedan en su lugar, así que referencias como (21) o (22) siguen siendo válidas."
     data-incorrect-explain="Pensá qué pasa con referencias como (1) o (2) si una proposición cambia de posición. En triples hay que recalcularlas todas; en triples indirectos se reordena solo la lista de punteros props."></div>

Note:
Los cuádruplos también se pueden reordenar con facilidad, porque los resultados se nombran con variables auxiliares; pero lo hacen a costa de espacio en la tabla de símbolos. Los triples indirectos combinan el ahorro de espacio de los triples con la facilidad de reordenamiento.

---

## Notación Posfija

<div class="card" style="padding:10px;">
  <p style="font-size:0.72rem; line-height:1.5;">También llamada <strong>notación polaca inversa</strong> (RPN): el operador se escribe <strong>después</strong> de sus operandos.</p>
  <table class="compare-table" style="font-size:0.9rem; width:100%;">
    <thead><tr><th>Infija</th><th>Posfija</th></tr></thead>
    <tbody>
      <tr><td><code>a + b</code></td><td><code>a b +</code></td></tr>
      <tr><td><code>a * (9 + d)</code></td><td><code>a 9 d + *</code></td></tr>
      <tr><td><code>a := a * (9 + d)</code></td><td><code>a a 9 d + * :=</code></td></tr>
      <tr><td><code>x + y – x * y</code></td><td><code>x y + x y * –</code></td></tr>
    </tbody>
  </table>
</div>
<!-- CLIP: guion U5, Parte A — [Notación posfija] (definición, ejemplos, evaluación con pila, instrucciones LOD) -->
<div class="flipped-callout" style="margin-top:20px; padding:8px;">
<p style="font-size:0.7rem; margin:0;"><i class="fas fa-magic"></i> Maneja la <strong>precedencia sin paréntesis</strong>: el orden de evaluación está implícito en el orden de operandos y operadores.</p>
</div>


Note:
En a * (9 + d), primero se colocan los operandos de la suma, 9 y d, luego el +; el operando a ya estaba antes, y finalmente va el *. Los paréntesis desaparecen porque el orden ya dice qué se calcula primero.

---

## Evaluación con una Máquina de Pila

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:8px;">
      <p style="font-size:0.68rem; margin:0 0 4px 0;"><strong>Operando</strong> → se apila. <strong>Operador binario</strong> → se desapilan dos, se opera y se apila el resultado.<br><code>x y + x y * –</code> con <code>x = 1, y = 2</code>:</p>
      <table class="compare-table" style="font-size:0.85rem; width:100%;">
        <thead><tr><th>Se lee</th><th>Instrucción</th><th>Acción</th><th>Pila</th></tr></thead>
        <tbody>
          <tr><td><code>x</code></td><td><code>LOD x</code></td><td>apilar 1</td><td><code>[1]</code></td></tr>
          <tr><td><code>y</code></td><td><code>LOD y</code></td><td>apilar 2</td><td><code>[1, 2]</code></td></tr>
          <tr style="background:rgba(255,200,0,0.12);"><td><code>+</code></td><td><code>ADD</code></td><td>1 + 2 = 3</td><td><code>[3]</code></td></tr>
          <tr><td><code>x</code></td><td><code>LOD x</code></td><td>apilar 1</td><td><code>[3, 1]</code></td></tr>
          <tr><td><code>y</code></td><td><code>LOD y</code></td><td>apilar 2</td><td><code>[3, 1, 2]</code></td></tr>
          <tr style="background:rgba(255,200,0,0.12);"><td><code>*</code></td><td><code>MUL</code></td><td>1 * 2 = 2</td><td><code>[3, 2]</code></td></tr>
          <tr style="background:rgba(255,200,0,0.12);"><td><code>–</code></td><td><code>SUB</code></td><td>3 – 2 = 1</td><td><code>[1]</code> ✓</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.78rem;"><i class="fab fa-python"></i> Una máquina de pila en Python</h4>
<pre style="font-size:0.5rem; margin:2px 0;"><code class="language-python">import operator
OPERACIONES = {"ADD": operator.add, "SUB": operator.sub,
               "MUL": operator.mul, "DIV": operator.truediv}
def ejecutar(codigo: list[str], memoria: dict) -> float:
    """Ejecuta código posfijo (LOD/ADD/SUB/MUL/DIV)."""
    pila = []
    for instruccion in codigo:
        op, *arg = instruccion.split()
        if op == "LOD":
            nombre = arg[0]
            pila.append(memoria[nombre] if nombre in memoria
                        else float(nombre))
        else:
            der = pila.pop()   # tope = operando derecho
            izq = pila.pop()
            pila.append(OPERACIONES[op](izq, der))
    return pila.pop()

codigo = ["LOD x", "LOD y", "ADD",
          "LOD x", "LOD y", "MUL", "SUB"]
print(ejecutar(codigo, {"x": 1, "y": 2}))  # 1</code></pre>
    </div>
  </div>
</div>

Note:
LOD carga un operando en la pila. Esta secuencia es directamente ejecutable por una máquina de pila, sin variables auxiliares ni registros intermedios. Ojo con el orden al desapilar en la resta y la división: el tope de la pila es el operando derecho.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> ¿Cuál es la notación posfija de <br><span class="math-lang"><code>(a + b) * c – d</code></span>?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false"><code>a b c + * d –</code></div>
  <div class="quiz-option" data-correct="true"><code>a b + c * d –</code></div>
  <div class="quiz-option" data-correct="false"><code>a b + c d – *</code></div>
  <div class="quiz-option" data-correct="false"><code>– * + a b c d</code></div>
</div>

<div class="quiz-feedback"
     data-correct-explain="* Primero a b + (la suma entre paréntesis), luego ese resultado por c (c *), y por último se resta d (d –)."
     data-incorrect-explain="Respetá la precedencia: el paréntesis obliga a sumar primero (a b +), después se multiplica por c y al final se resta d. La última opción es notación prefija, no posfija."></div>

Note:
Pueden comprobarlo con la máquina de pila: con a=1, b=2, c=3, d=4, el resultado debe ser (1+2)*3–4 = 5.

---

## Traducción Dirigida por la Sintaxis

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:10px;">
      <p style="font-size:0.72rem; line-height:1.5;">¿Cómo genera el compilador ese código <strong>automáticamente</strong>? Con las <strong>acciones semánticas</strong> que ya conocemos: el parser LR las ejecuta al <strong>reducir</strong> por cada producción. En esta fase, las acciones <strong>emiten código intermedio</strong>.</p>
    </div>
  </div>
  <div class="col">
    <div class="flipped-callout-bis" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.7rem; margin:0;"><i class="fas fa-history"></i> Es la misma mecánica de una clase anterior (pila de valores, <code>$$ = $1 + $3</code> en YACC), pero en vez de <em>calcular</em> el valor, se <em>genera el código</em> que lo calculará.</p>
    </div>
  </div>
</div>
<div class="grid-3" style="margin-top:8px;">
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.75rem;"><i class="fas fa-map-marker-alt"></i> <code>.lugar</code></h4>
    <p style="font-size:0.64rem; margin:0;">Atributo que indica <strong>dónde está el valor</strong> de una expresión: nombre de variable, constante o variable auxiliar (puede ser un puntero a la tabla de símbolos).</p>
  </div>
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.75rem;"><i class="fas fa-cogs"></i> <code>GenC(…)</code></h4>
    <p style="font-size:0.64rem; margin:0;">Procedimiento que <strong>emite una instrucción</strong> de código intermedio: <code>GenC(op, arg1, arg2, res)</code>.</p>
  </div>
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.75rem;"><i class="fas fa-sort-numeric-up"></i> <code>k</code> y <code>var[k]</code></h4>
    <p style="font-size:0.64rem; margin:0;">Contador y arreglo "infinito" de variables auxiliares: <code>INC(k)</code> → <code>var[1]</code>, <code>var[2]</code>, …</p>
  </div>
</div>

Note:
La generación de código no es una fase separada e independiente: ocurre durante el análisis sintáctico, integrada con él. Vamos a ver dos ejemplos completos con la misma gramática y la misma expresión: uno que genera cuádruplos y otro que genera notación posfija.

---

## Acciones Semánticas para Generar Cuádruplos

<div class="two-col-flex ratio-70-30">
  <div class="col">
    <div class="card" style="padding:6px;">
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead><tr><th>#</th><th>Producción</th><th>Regla semántica</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>\(E \rightarrow T\)</td><td><code>E.lugar := T.lugar</code></td></tr>
          <tr style="background:rgba(255,80,80,0.10);"><td>2</td><td>\(E_1 \rightarrow E_2 + T\)</td><td><code>INC(k); E₁.lugar := var[k];</code><br><strong><code>GenC(ADD, E₂.lugar, T.lugar, var[k])</code></strong></td></tr>
          <tr><td>3</td><td>\(E_1 \rightarrow E_2 - T\)</td><td>ídem con <code>SUB</code></td></tr>
          <tr><td>4</td><td>\(T \rightarrow F\)</td><td><code>T.lugar := F.lugar</code></td></tr>
          <tr style="background:rgba(255,80,80,0.10);"><td>5</td><td>\(T_1 \rightarrow T_2 * F\)</td><td><code>INC(k); T₁.lugar := var[k];</code><br><strong><code>GenC(MUL, T₂.lugar, F.lugar, var[k])</code></strong></td></tr>
          <tr><td>6</td><td>\(T_1 \rightarrow T_2 / F\)</td><td>ídem con <code>DIV</code></td></tr>
          <tr><td>7</td><td>\(F \rightarrow \mathbf{id}\)</td><td><code>F.lugar := <span style="color:var(--accent-color);">id.nombre</span></code></td></tr>
          <tr><td>8</td><td>\(F \rightarrow \mathbf{num}\)</td><td><code>F.lugar := <span style="color:var(--accent-secondary);">num.valor</span></code></td></tr>
          <tr><td>9</td><td>\(F \rightarrow (E)\)</td><td><code>F.lugar := E.lugar</code></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:8px;">
      <p style="font-size:0.66rem; line-height:1.5; margin:0;">Gramática \(G_0\) (Teufel): <code>E</code> = EXPR, <code>T</code> = TERM, <code>F</code> = FACTOR.</p>
    </div>
    <div class="flipped-callout" style="margin-top:8px; padding:8px;">
      <ul style="font-size:0.64rem; line-height:1.5; margin:0;">
        <li>Solo las <strong>operaciones</strong> crean una variable auxiliar y emiten código.</li>
        <li><code>id.nombre</code>: lexema del identificador.</li>
        <li><code>num.valor</code>: valor de la constante.</li>
        <li>Las demás reglas solo <strong>propagan</strong> el lugar; los paréntesis no generan código.</li>
      </ul>
    </div>
  </div>
</div>

Note:
Observen que el atributo lugar es sintetizado: siempre se calcula a partir de los hijos. Por eso encaja de forma natural con el análisis ascendente LR, como vimos en la clase 12.

---

### Ejemplo 1: cuádruplos para <code>x + y – x * y</code>

<div class="card" style="padding:4px; overflow-x:auto;">
  <table class="compare-table" style="font-size:1rem; width:100%;">
    <thead><tr><th>Pila</th><th>Pila <code>lugar</code></th><th>Entrada</th><th>Acción</th><th>Regla sem.</th><th>Código</th></tr></thead>
    <tbody>
      <tr><td><code>$</code></td><td></td><td><code>id+id-id*id$</code></td><td>desplazar</td><td></td><td></td></tr>
      <tr><td><code>$ id</code></td><td></td><td><code>+id-id*id$</code></td><td>red. \(F \rightarrow id\)</td><td><code>F.lugar=x</code></td><td></td></tr>
      <tr><td><code>$ F</code></td><td><code>x</code></td><td><code>+id-id*id$</code></td><td>red. \(T \rightarrow F\)</td><td><code>T.lugar=x</code></td><td></td></tr>
      <tr><td><code>$ T</code></td><td><code>x</code></td><td><code>+id-id*id$</code></td><td>red. \(E \rightarrow T\)</td><td><code>E.lugar=x</code></td><td></td></tr>
      <tr><td><code>$ E</code></td><td><code>x</code></td><td><code>+id-id*id$</code></td><td>desplazar</td><td></td><td></td></tr>
      <tr><td><code>$ E +</code></td><td><code>x</code></td><td><code>id-id*id$</code></td><td>desplazar</td><td></td><td></td></tr>
      <tr><td><code>$ E + id</code></td><td><code>x</code></td><td><code>-id*id$</code></td><td>red. \(F \rightarrow id\)</td><td><code>F.lugar=y</code></td><td></td></tr>
      <tr><td><code>$ E + F</code></td><td><code>x y</code></td><td><code>-id*id$</code></td><td>red. \(T \rightarrow F\)</td><td><code>T.lugar=y</code></td><td></td></tr>
      <tr style="background:rgba(255,200,0,0.14);"><td><code>$ E + T</code></td><td><code>x y</code></td><td><code>-id*id$</code></td><td>red. \(E \rightarrow E+T\)</td><td><code>k=1; E₁.lugar=var[1]</code></td><td><strong><code>ADD x y var[1]</code></strong></td></tr>
      <tr><td><code>$ E</code></td><td><code>var[1]</code></td><td><code>-id*id$</code></td><td>desplazar</td><td></td><td></td></tr>
      <tr><td><code>$ E -</code></td><td><code>var[1]</code></td><td><code>id*id$</code></td><td>desplazar</td><td></td><td></td></tr>
      <tr><td><code>$ E - id</code></td><td><code>var[1]</code></td><td><code>*id$</code></td><td>red. \(F \rightarrow id\)</td><td><code>F.lugar=x</code></td><td></td></tr>
      <tr><td><code>$ E - F</code></td><td><code>var[1] x</code></td><td><code>*id$</code></td><td>red. \(T \rightarrow F\)</td><td><code>T.lugar=x</code></td><td></td></tr>
      <tr><td><code>$ E - T</code></td><td><code>var[1] x</code></td><td><code>*id$</code></td><td>desplazar</td><td></td><td></td></tr>
      <tr><td><code>$ E - T *</code></td><td><code>var[1] x</code></td><td><code>id$</code></td><td>desplazar</td><td></td><td></td></tr>
      <tr><td><code>$ E - T * id</code></td><td><code>var[1] x</code></td><td><code>$</code></td><td>red. \(F \rightarrow id\)</td><td><code>F.lugar=y</code></td><td></td></tr>
      <tr style="background:rgba(255,200,0,0.14);"><td><code>$ E - T * F</code></td><td><code>var[1] x y</code></td><td><code>$</code></td><td>red. \(T \rightarrow T*F\)</td><td><code>k=2; T₁.lugar=var[2]</code></td><td><strong><code>MUL x y var[2]</code></strong></td></tr>
      <tr style="background:rgba(255,200,0,0.14);"><td><code>$ E - T</code></td><td><code>var[1] var[2]</code></td><td><code>$</code></td><td>red. \(E \rightarrow E-T\)</td><td><code>k=3; E₁.lugar=var[3]</code></td><td><strong><code>SUB var[1] var[2] var[3]</code></strong></td></tr>
      <tr><td><code>$ E</code></td><td><code>var[3]</code></td><td><code>$</code></td><td><strong>aceptar</strong></td><td></td><td></td></tr>
    </tbody>
  </table>
</div>
</div>


Note:
No hace falta memorizar cada movimiento de la pila: lo importante son los momentos en que se genera código. Al reducir E + T se emite el primer cuádruplo; al reducir T * F, el segundo; y al reducir E – T, el tercero. Este tipo de traza es la que vamos a practicar en el trabajo práctico.

---

## El Código Generado Refleja el Árbol

<div class="two-col-equal">
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-file-code"></i> Cuádruplos generados</h4>
      <table class="compare-table" style="font-size:0.95rem; width:100%;">
        <thead><tr><th>#</th><th>op</th><th>arg1</th><th>arg2</th><th>res</th></tr></thead>
        <tbody>
          <tr><td>1</td><td><code>ADD</code></td><td><code>x</code></td><td><code>y</code></td><td><code>var[1]</code></td></tr>
          <tr><td>2</td><td><code>MUL</code></td><td><code>x</code></td><td><code>y</code></td><td><code>var[2]</code></td></tr>
          <tr><td>3</td><td><code>SUB</code></td><td><code>var[1]</code></td><td><code>var[2]</code></td><td><code>var[3]</code></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:8px; margin-top:15px">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-sitemap"></i> Correspondencia con el árbol</h4>
      <ul style="font-size:0.7rem; line-height:1.6;">
        <li>Proposición 1 ↔ nodo <code>+</code> (hojas <code>x</code>, <code>y</code>).</li>
        <li>Proposición 2 ↔ nodo <code>*</code> (hojas <code>x</code>, <code>y</code>).</li>
        <li>Proposición 3 ↔ nodo <code>–</code>, que usa los resultados de <code>+</code> y <code>*</code>.</li>
      </ul>
    </div>
  </div>
</div>

<div class="flipped-callout" style="margin-top:10px; padding:8px;">
  <p style="font-size:0.76rem; margin:0; text-align:center;"><i class="fas fa-arrow-up"></i> El análisis ascendente recorre el árbol <strong>de abajo hacia arriba</strong> y las instrucciones se generan en ese mismo orden: es la <strong>linealización del árbol</strong> que vimos al principio, ahora automática.</p>
</div>

Note:
Es el mismo resultado que obtuvimos a mano en la primera parte de la clase, con var[1], var[2] y var[3] en lugar de v1, v2 y v3. Aquí no aparece el STO porque la entrada es solo la expresión, sin asignación.

---

## Ejemplo 2: misma gramática, Código Posfijo

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:6px;">
      <table class="compare-table" style="font-size:0.85rem; width:100%;">
        <thead><tr><th>#</th><th>Producción</th><th>Cuádruplos</th><th>Posfija</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>\(E \rightarrow T\)</td><td>propaga lugar</td><td>—</td></tr>
          <tr><td>2</td><td>\(E_1 \rightarrow E_2 + T\)</td><td><code>GenC(ADD, …, var[k])</code></td><td><strong><code>GenC(ADD)</code></strong></td></tr>
          <tr><td>3</td><td>\(E_1 \rightarrow E_2 - T\)</td><td><code>GenC(SUB, …, var[k])</code></td><td><strong><code>GenC(SUB)</code></strong></td></tr>
          <tr><td>4</td><td>\(T \rightarrow F\)</td><td>propaga lugar</td><td>—</td></tr>
          <tr><td>5</td><td>\(T_1 \rightarrow T_2 * F\)</td><td><code>GenC(MUL, …, var[k])</code></td><td><strong><code>GenC(MUL)</code></strong></td></tr>
          <tr><td>6</td><td>\(T_1 \rightarrow T_2 / F\)</td><td><code>GenC(DIV, …, var[k])</code></td><td><strong><code>GenC(DIV)</code></strong></td></tr>
          <tr><td>7</td><td>\(F \rightarrow \mathbf{id}\)</td><td><code>F.lugar := id.nombre</code></td><td><strong><code>GenC(LOD id.nombre)</code></strong></td></tr>
          <tr><td>8</td><td>\(F \rightarrow \mathbf{num}\)</td><td><code>F.lugar := num.valor</code></td><td><strong><code>GenC(LOD num.valor)</code></strong></td></tr>
          <tr><td>9</td><td>\(F \rightarrow (E)\)</td><td>propaga lugar</td><td>—</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="col">
    <!-- CLIP: guion U5, Parte B — [EJEMPLO 2: traducción a notación posfija] -->
    <div class="flipped-callout" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.68rem; margin:0;"><i class="fas fa-exchange-alt"></i> <strong>Las producciones son idénticas</strong>: solo cambian las acciones. Cambiando las acciones semánticas, cambia el tipo de código generado <strong>sin tocar el analizador</strong>.</p>
    </div>
  </div>
</div>

Note:
En notación posfija no hacen falta variables auxiliares: cada vez que el analizador reduce un identificador emite LOD, y cada vez que reduce una operación emite el operador. Las acciones son mucho más simples.

---

### Traza del Ejemplo 2: 
<h4><code>x + y – x * y</code></h4>

<div class="two-col-flex ratio-70-30">
  <div class="col">
    <div class="card" style="padding:4px; overflow-x:auto;">
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead><tr><th>Pila</th><th>Entrada</th><th>Acción</th><th>Código generado</th></tr></thead>
        <tbody>
          <tr><td><code>$</code></td><td><code>id+id-id*id$</code></td><td>desplazar</td><td></td></tr>
          <tr style="background:rgba(255,200,0,0.14);"><td><code>$ id</code></td><td><code>+id-id*id$</code></td><td>red. \(F \rightarrow id\)</td><td><strong><code>LOD x</code></strong></td></tr>
          <tr><td><code>$ F</code></td><td><code>+id-id*id$</code></td><td>red. \(T \rightarrow F\)</td><td></td></tr>
          <tr><td><code>$ T</code></td><td><code>+id-id*id$</code></td><td>red. \(E \rightarrow T\)</td><td></td></tr>
          <tr><td><code>$ E</code></td><td><code>+id-id*id$</code></td><td>desplazar</td><td></td></tr>
          <tr><td><code>$ E +</code></td><td><code>id-id*id$</code></td><td>desplazar</td><td></td></tr>
          <tr style="background:rgba(255,200,0,0.14);"><td><code>$ E + id</code></td><td><code>-id*id$</code></td><td>red. \(F \rightarrow id\)</td><td><strong><code>LOD y</code></strong></td></tr>
          <tr><td><code>$ E + F</code></td><td><code>-id*id$</code></td><td>red. \(T \rightarrow F\)</td><td></td></tr>
          <tr style="background:rgba(255,200,0,0.14);"><td><code>$ E + T</code></td><td><code>-id*id$</code></td><td>red. \(E \rightarrow E+T\)</td><td><strong><code>ADD</code></strong></td></tr>
          <tr><td><code>$ E</code></td><td><code>-id*id$</code></td><td>desplazar</td><td></td></tr>
          <tr><td><code>$ E -</code></td><td><code>id*id$</code></td><td>desplazar</td><td></td></tr>
          <tr style="background:rgba(255,200,0,0.14);"><td><code>$ E - id</code></td><td><code>*id$</code></td><td>red. \(F \rightarrow id\)</td><td><strong><code>LOD x</code></strong></td></tr>
          <tr><td><code>$ E - F</code></td><td><code>*id$</code></td><td>red. \(T \rightarrow F\)</td><td></td></tr>
          <tr><td><code>$ E - T</code></td><td><code>*id$</code></td><td>desplazar</td><td></td></tr>
          <tr><td><code>$ E - T *</code></td><td><code>id$</code></td><td>desplazar</td><td></td></tr>
          <tr style="background:rgba(255,200,0,0.14);"><td><code>$ E - T * id</code></td><td><code>$</code></td><td>red. \(F \rightarrow id\)</td><td><strong><code>LOD y</code></strong></td></tr>
          <tr style="background:rgba(255,200,0,0.14);"><td><code>$ E - T * F</code></td><td><code>$</code></td><td>red. \(T \rightarrow T*F\)</td><td><strong><code>MUL</code></strong></td></tr>
          <tr style="background:rgba(255,200,0,0.14);"><td><code>$ E - T</code></td><td><code>$</code></td><td>red. \(E \rightarrow E-T\)</td><td><strong><code>SUB</code></strong></td></tr>
          <tr><td><code>$ E</code></td><td><code>$</code></td><td><strong>aceptar</strong></td><td></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.78rem;"><i class="fas fa-file-code"></i> Código generado</h4>
<pre style="font-size:0.75rem; margin:4px 0;"><code>LOD x
LOD y
ADD
LOD x
LOD y
MUL
SUB</code></pre>
    </div>
    <div class="flipped-callout-bis" style="margin-top:8px; padding:6px;">
      <p style="font-size:0.62rem; margin:0;">¡Es el mismo código posfijo que obtuvimos a mano con la pila! El orden de las reducciones coincide con el orden correcto de las instrucciones: la <strong>precedencia ya está en la gramática</strong>.</p>
    </div>
  </div>
</div>

Note:
La traducción dirigida por la sintaxis llega al mismo resultado de manera automática, siguiendo la estructura gramatical de la expresión. Como la precedencia de operadores está capturada en la gramática (E, T, F), no hace falta tratarla explícitamente en las acciones.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> Con las acciones para <strong>notación posfija</strong> y la gramática \(G_0\), ¿qué código se genera para<br> <span class="math-lang"><code>a * (b + c)</code></span>?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false"><code>LOD a / MUL / LOD b / LOD c / ADD</code></div>
  <div class="quiz-option" data-correct="false"><code>LOD a / LOD b / MUL / LOD c / ADD</code></div>
  <div class="quiz-option" data-correct="true"><code>LOD a / LOD b / LOD c / ADD / MUL</code></div>
  <div class="quiz-option" data-correct="false"><code>LOD b / LOD c / ADD / LOD a / MUL</code></div>
</div>

<div class="quiz-feedback"
     data-correct-explain="Se reduce a (LOD a); luego, dentro del paréntesis, b y c (LOD b, LOD c) y la suma E+T (ADD). F → (E) no genera código. Recién después se reduce T * F (MUL)."
     data-incorrect-explain="Seguí el orden de las reducciones: el parser no puede reducir T * F hasta haber reducido todo el factor (b + c). La regla F → (E) no emite nada; los paréntesis solo fuerzan que ADD se genere antes que MUL."></div>

Note:
Este es el tipo de razonamiento que se pide en el trabajo práctico: dada una expresión, determinar el orden de las reducciones y, con él, el código generado.

---

## Ejercicios Propuestos

<div class="card">
  <h4 class="card-title"><i class="fas fa-pencil-alt"></i> Ejercicios de Generación de Código Intermedio</h4>
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
          Para <code>a := b * (c – d) + e</code> escriba el código de tres direcciones y sus implementaciones con <strong>cuádruplos</strong>, <strong>triples</strong> y <strong>triples indirectos</strong>.
        </td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td>
          Escriba en notación posfija <code>(a + b) * (c – d) / e</code> y evalúela con una pila para <code>a=2, b=4, c=7, d=1, e=3</code>, mostrando el estado de la pila en cada paso. Verifique el resultado con la función <code>ejecutar</code> de la clase.
        </td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td>
          Con la gramática \(G_0\) y las acciones para cuádruplos, desarrolle la traza del análisis ascendente de <code>a * (b + c)</code> con las columnas Pila, Pila <code>lugar</code>, Entrada, Acción, Regla semántica y Código generado.
        </td>
      </tr>
      <tr>
        <td><strong>4</strong></td>
        <td>
          Repita el ejercicio 3 con las acciones para <strong>notación posfija</strong> y compare ambos códigos generados.
        </td>
      </tr>
    </tbody>
  </table>
</div>

Note:
Estos ejercicios se trabajarán en el encuentro presencial. Es el tipo de ejercicio que puede aparecer en la evaluación: dada una gramática y una expresión, construir la tabla de análisis y el código generado, tanto en cuádruplos como en notación posfija.

---

<!-- SLIDE: Resumen de la Clase -->
<h2 class="text-gradient">Resumen de la Clase</h2> 

<div class="grid">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos hoy</h4>
    <ul style="font-size:0.8rem; line-height:1.5;">
      <li>El <strong>código intermedio</strong> desacopla el front-end del back-end: facilita la <strong>portabilidad</strong> y la <strong>optimización</strong>.</li>
      <li>El <strong>código de tres direcciones</strong> (<code>res := arg1 op arg2</code>) se implementa con <strong>cuádruplos</strong>, <strong>triples</strong> o <strong>triples indirectos</strong>, según el balance entre espacio y facilidad de reordenamiento.</li>
      <li>La <strong>notación posfija</strong> no necesita paréntesis ni variables auxiliares y se ejecuta directamente en una <strong>máquina de pila</strong>.</li>
      <li>Con la <strong>traducción dirigida por la sintaxis</strong>, el parser genera el código al reducir: cambiando solo las acciones semánticas, cambia el tipo de código generado.</li>
    </ul>
  </div>   
      
  <div class="card" style="margin-top:10px">
    <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-flag-checkered"></i></span>Recorrido completo</h4>
    <p style="margin-top:12px; text-align:center; color:var(--text-muted); font-size:0.85rem;">
      Desde los <strong>caracteres</strong> del programa fuente hasta las <strong>instrucciones</strong> de una máquina intermedia: léxico → sintáctico → semántico → código intermedio. 
    </p>
  </div>    
</div>

<div class="flipped-callout" style="text-align: center; margin-top:10px;">
  <p style="font-size:0.8rem; margin:0;"><strong>⚠️ Recordatorio:</strong> Completar el cuestionario de autoevaluación sobre generación de código intermedio en la plataforma virtual antes del próximo encuentro presencial. <br><span style="font-size:0.7rem; color:var(--text-muted);">Para profundizar: Teufel Cap. 5 · Louden Cap. 8 · Aho et al. Cap. 8</span></p>
</div>

Note:
Llegamos al final de la clase. La generación de código intermedio es el puente entre el análisis y la síntesis. Vimos sus representaciones y el mecanismo que permite generarlas automáticamente: la traducción dirigida por la sintaxis, que integra la generación de código dentro del análisis sintáctico. ¡Nos vemos en el encuentro presencial!

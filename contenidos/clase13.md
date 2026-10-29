<!-- HOJA DE RUTA --->
<h2>¿Qué aprendemos en esta clase?</h2>

<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 10px !important;">
  <h4><i class="fas fa-database"></i> La Tabla de Símbolos</h4>
  <p>En la clase anterior las reglas semánticas llamaban a <code>añadeTipo(id, …)</code> y a <code>lookup(id)</code>. ¿Dónde se guarda toda esa información? En la <strong>tabla de símbolos</strong>, la estructura de datos que acompaña al compilador <strong>en todas sus fases</strong>.</p>
</div>

<div class="two-col-flex ratio-40-60">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta</span>    
      <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; ">
        <li>Tabla de símbolos: qué almacena y qué operaciones necesita</li>
        <li>Estructuras posibles y la <strong>tabla hash</strong></li>
        <li>Función hash en tres pasos y colisiones</li>
        <li>Resolución de colisiones</li>
        <li>Ámbito (<em>scope</em>): reglas y su implementación con la tabla</li>
      </ul>       
  </div>  
  <div>
    <!-- CLIP: video original U4 tabla de símbolos, 00:13 – 02:16 (qué es, qué almacena, operaciones, estructuras posibles) -->
    <div class="video-player-wrapper" style="margin-top: 10px; width:100%">
      <video src="videos/c13/ts_intro.mp4" poster="img/fases_TS.png" controls></video>
    </div>
  </div>  
</div>

Note:
Bienvenidos a la clase 13, la última de la Unidad 4. En todas las clases de esta unidad la tabla de símbolos apareció mencionada como una estructura que acompaña al compilador a lo largo de su trabajo. Es hora de estudiarla en detalle: qué guarda, cómo se implementa de forma eficiente y cómo maneja los ámbitos de las declaraciones.

---

## Una estructura transversal

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <!-- PROMPT PARA GENERAR IMAGEN:
    Diagrama del pipeline del compilador: Analizador Léxico → Analizador Sintáctico → Analizador Semántico → Generador de Código Intermedio → Optimizador → Generador de Código, en gris. Debajo, un bloque grande "Tabla de Símbolos" resaltado en rojo/cian brillante, con flechas bidireccionales hacia TODAS las fases. Estilo vectorial técnico sobre fondo oscuro, coherente con el resto de las clases. Nombre sugerido: img/c13_pipeline_ts.png
    -->
    <div class="card" style="padding:6px; text-align:center;">
      <img src="img/ts_pipeline.jpeg" style="width:95%;"></img>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.82rem;"><i class="fas fa-exchange-alt"></i> No es una fase más</h4>
      <ul style="font-size:0.7rem; line-height:1.6;">
        <li>El <strong>léxico</strong> la consulta al reconocer un identificador.</li>
        <li>El <strong>semántico</strong> la puebla con tipos y ámbitos.</li>
        <li>El <strong>generador de código</strong> la consulta para conocer la ubicación en memoria de cada variable.</li>
      </ul>
    </div>
  </div>
</div>

<div class="flipped-callout" style="margin-top:10px; padding:8px;">
  <p style="font-size:0.78rem; margin:0; text-align:center;"><span class="emoji-float"> 🤔</span> ¿Por qué es importante entender la estructura y las funciones de una tabla de símbolos si parece <em>"solo un diccionario"</em>? Porque insertar, buscar y actualizar se ejecutan <strong>cientos de miles de veces</strong> al compilar un programa real: una mala implementación vuelve lento al compilador, aun con programas pequeños.</p>
</div>

Note:
La tabla de símbolos es especial en el diseño de un compilador porque no es una fase lineal más: es una estructura de datos transversal, accedida y modificada por prácticamente todas las fases. Su función principal es colaborar en las comprobaciones semánticas y facilitar la generación de código.

---

## ¿Qué almacena la tabla?

<div class="card" style="padding:10px;">
  <h4 class="card-title" style="font-size:0.82rem;"><i class="fas fa-id-card"></i> Atributos de los identificadores</h4>
  <p style="font-size:0.7rem;">Variables, constantes, funciones y procedimientos. Para cada uno:</p>
  <ul style="font-size:0.7rem; line-height:1.6;">
    <li><strong>Nombre</strong></li>
    <li><strong>Tipo de datos</strong> (entero, real, char, puntero, estructura…)</li>
    <li><strong>Ámbito</strong>: en qué parte del programa es válida la declaración</li>
    <li><strong>Ubicación en memoria</strong> (dirección o desplazamiento relativo)</li>
    <li>En funciones y procedimientos: <strong>cantidad y tipo de parámetros</strong></li>
  </ul>
</div>
<div class="card" style="padding:8px; margin-top:20px">
  <h4 class="card-title" style="font-size:0.8rem;"><i class="fas fa-table"></i> Una tabla de símbolos en un momento de la compilación</h4>
  <table class="compare-table" style="font-size:1rem; width:100%;">
    <thead><tr><th>Identificador</th><th>Tipo</th><th>Dimensión</th><th>Declarada en bloque</th></tr></thead>
    <tbody>
      <tr><td><code>anho</code></td><td>int</td><td>0</td><td>5</td></tr>
      <tr><td><code>b</code></td><td>real</td><td>0</td><td>5</td></tr>
      <tr><td><code>companhia</code></td><td>int</td><td>1</td><td>2</td></tr>
      <tr><td><code>format</code></td><td>char</td><td>2</td><td>4</td></tr>
      <tr><td><code>m</code></td><td>proc</td><td>0</td><td>6</td></tr>
    </tbody>
  </table>
  <p style="font-size:0.65rem; color:var(--text-muted); margin-top:20px;">Cada fila es un identificador; cada columna, un atributo que el compilador necesita recordar para generar código correcto.</p>
</div>


Note:
La dimensión indica, por ejemplo, si el identificador es un escalar (0), un vector (1) o una matriz (2). La columna de bloque registra dónde fue declarado, información clave para el manejo de ámbitos que veremos al final de la clase.

---

## Operaciones

<div class="grid-2" style="margin-bottom:8px;">
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.8rem; color:var(--accent-color);"><i class="fas fa-plus-circle"></i> Insertar</h4>
    <p style="font-size:0.68rem; margin:0;">Al encontrar una <strong>declaración</strong>, se agrega el identificador con sus atributos.</p>
  </div>
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.8rem; color:var(--accent-secondary);"><i class="fas fa-search"></i> Buscar</h4>
    <p style="font-size:0.68rem; margin:0;">Al <strong>usar</strong> un identificador, se verifica que fue declarado y se recuperan sus atributos.</p>
  </div>
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.8rem; color:var(--accent-success);"><i class="fas fa-edit"></i> Actualizar</h4>
    <p style="font-size:0.68rem; margin:0;">Se agrega información nueva a una entrada existente, por ejemplo su dirección de memoria.</p>
  </div>
  <div class="card" style="padding:8px;">
    <h4 class="card-title" style="font-size:0.8rem; color:var(--accent-danger);"><i class="fas fa-trash-alt"></i> Eliminar</h4>
    <p style="font-size:0.68rem; margin:0;">Cuando la declaración deja de ser válida, por ejemplo al <strong>salir de un bloque</strong>.</p>
  </div>
</div>

Note:
La tabla comparativa hace explícito por qué los compiladores reales eligen tablas hash y no las alternativas: es la decisión de diseño que justifica el resto de la clase. Si en los trabajos con PLY guardaron variables en un diccionario de Python, ya usaron una tabla hash: los diccionarios de Python están implementados de esa manera.

---

## Estructuras posibles

 <div class="video-player-wrapper" style="top: -30px; width:80%">
  <video src="videos/c13/ts_tipos.mp4" poster="img/u0_02_play_video.png" style="margin-top: 5px;" controls></video>
</div> 
<table class="compare-table" style="font-size:1rem; width:100%; margin-top:0px">
  <thead><tr><th>Estructura</th><th>Búsqueda</th><th>Ventajas / desventajas</th></tr></thead>
  <tbody>
    <tr><td><strong>Lista lineal</strong></td><td>\(O(n)\)</td><td>Muy simple; alcanza solo para programas pequeños.</td></tr>
    <tr><td><strong>Árbol de búsqueda</strong> (binario, AVL, B-tree)</td><td>\(O(\log n)\) si está balanceado</td><td>Buena búsqueda, pero la eliminación es compleja.</td></tr>
    <tr style="background:rgba(0,200,150,0.10);"><td><strong>Tabla hash</strong></td><td>\(O(1)\) en promedio</td><td>Inserción, búsqueda y eliminación en tiempo constante: <strong>la elección en la práctica</strong>.</td></tr>
  </tbody>
</table>


---

## ¿Qué es una Tabla Hash?

<div class="video-player-wrapper" style="margin-top: -5px; width:80%">
      <video src="videos/c13/ts_tabla_hash.mp4" poster="img/miraestevideo.png" controls></video>
    </div>
<div class="flipped-callout-bis" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.72rem; margin:0;"><i class="fas fa-car-crash"></i> <strong>Colisión:</strong> dos identificadores distintos producen el mismo índice. </p>
    </div>      
<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:10px;">
      <p style="font-size:0.72rem; line-height:1.5;">Un <strong>array de \(m\) posiciones</strong>, llamadas <strong>cubetas</strong> (<em>buckets</em>), indexadas de \(0\) a \(m-1\).</p>
      <p style="font-size:0.72rem; line-height:1.5;">Una <strong>función hash</strong> \(h\) convierte el nombre del identificador en el índice de la cubeta donde debe estar: no hace falta recorrer la tabla.</p>      
    </div>
  </div>
  <div class="col">
         <table class="compare-table" style="font-size:0.9rem; width:70%; margin:6px auto;">
        <thead><tr><th>Índice</th><th>Cubeta</th></tr></thead>
        <tbody>
          <tr><td>0</td><td></td></tr>
          <tr><td>1</td><td></td></tr>
          <tr style="background:rgba(0,200,255,0.12);"><td><strong>i = 2</strong></td><td><code>temp</code></td></tr>
          <tr><td>3</td><td></td></tr>
          <tr><td>4</td><td></td></tr>
        </tbody>
      </table>
      <p style="font-size:0.5rem; color:var(--text-muted); text-align:center;">\(h(\text{"temp"}) = i\): se guarda en la cubeta \(i\). Para buscarla, se vuelve a calcular \(h(\text{"temp"})\).</p>
  </div>
</div>

Note:
Las colisiones son inevitables: la cantidad de identificadores posibles en un lenguaje es enorme, prácticamente infinita, mientras que el tamaño de la tabla es fijo y acotado. Lo que sí podemos controlar es su frecuencia, con una buena función hash que distribuya los identificadores de manera uniforme y que se calcule eficientemente.

---

## La Función Hash en Tres Pasos 

<p>Las colisiones son inevitables: la cantidad de identificadores posibles en un lenguaje es enorme, prácticamente infinita, mientras que el tamaño de la tabla es fijo y acotado. Lo que sí podemos controlar es su frecuencia, con una buena función hash que distribuya los identificadores de manera uniforme y que se calcule eficientemente.</p>

<div class="video-player-wrapper" style="margin-top: 5px; width:80%">
  <video src="videos/c13/ts_fc_hash.mp4" poster="img/miraestevideo.png" controls></video>
</div> 


---

## Pasos 1 y 2

<div class="card" style="padding:10px;">
  <h4 class="card-title" style="font-size:0.82rem;"><span class="text-badge">1</span>&nbsp;Cada carácter → un entero</h4>
  <p style="font-size:0.7rem;">Lo más directo: el código ASCII (en C, un <code>char</code> en una expresión aritmética se convierte solo. Por ejemplo, en Pascal, <code>ord</code>; en Python, <code>ord()</code>).</p>
  <table class="compare-table" style="font-size:0.95rem; width:80%; margin:4px auto;">
    <thead><tr><th style="color:var(--accent-warning) !important">t</th><th  style="color:var(--accent-warning) !important">e</th><th  style="color:var(--accent-warning) !important">m</th><th  style="color:var(--accent-warning) !important">p</th></tr></thead>
    <tbody><tr><td>116</td><td>101</td><td>109</td><td>112</td></tr></tbody>
  </table>
</div>

<div class="card" style="padding:10px;">
  <h4 class="card-title" style="font-size:0.82rem;"><span class="text-badge">2</span>&nbsp;Combinar en un único número</h4>
  <ul style="font-size:0.68rem; line-height:1.5;">
    <li><strong>Sumar:</strong> anagramas colisionan. <code>"xtemp"</code> y <code>"tempx"</code> suman 558.</li>
    <li><strong>Prefijo o sufijo:</strong> <code>"temp1"</code> / <code>"temp2"</code> colisionan con los primeros cuatro caracteres; <code>"apellido_A1"</code> / <code>"nombre_A1"</code>, con los últimos tres.</li>
    <li><strong>Suma ponderada</strong> (la más robusta), para \(c_1 c_2 \dots c_n\):</li>
  </ul>
  <p style="font-size:0.85rem; text-align:center; margin:4px 0;">\(h_n = c_1\alpha^{n-1} + c_2\alpha^{n-2} + \dots + c_{n-1}\alpha + c_n\)</p>
  <p style="font-size:0.62rem; color:var(--text-muted); margin:0;">\(\alpha\): constante, típicamente el tamaño del alfabeto o un número cercano. Cada carácter pesa distinto según su posición.</p>
</div>

Note:
La suma ponderada da un peso distinto a cada carácter según su posición, lo que prácticamente elimina las colisiones por anagramas: "xtemp" y "tempx" ya no producen el mismo valor.

---

## Paso 3: ajustar al tamaño de la tabla

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.82rem;"><span class="text-badge">3</span>&nbsp;Operación módulo</h4>
      <p style="font-size:0.95rem; text-align:center;">\(h = h_n \bmod m\)</p>
      <p style="font-size:0.7rem;">Garantiza un índice válido entre \(0\) y \(m-1\) (<code>MOD</code> en Pascal, <code>%</code> en C y Python).</p>
    </div>
  </div>
  <div class="col">  
    <div class="flipped-callout" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.7rem; margin:0;"><i class="fas fa-ruler-combined"></i> <strong>Tamaño \(m\):</strong> se fija al escribir el compilador; del orden de <strong>100 a 1000</strong> cubetas y, en general, un <strong>número primo</strong>, que junto con una buena función hash reduce las colisiones.</p>
    </div>
  </div>
</div>
<div class="card" style="padding:8px; margin-top:20px">
      <h4 class="card-title" style="font-size:0.8rem;"><i class="fab fa-python"></i> Los tres pasos en Python</h4>
<pre style="font-size:0.6rem; margin:4px 0; width:100%"><code class="language-python">def hash_identificador(nombre: str, alfa: int= 31, m: int= 211) -> int:
    """Devuelve la cubeta (0..m-1) de un identificador."""
    h_n = 0
    for c in nombre:
        h_n = h_n * alfa + ord(c)   # pasos 1 y 2 (Horner)
    return h_n % m                  # paso 3

print(hash_identificador("tempx"))  # 67
print(hash_identificador("xtemp"))  # 159  -> ya no colisionan</code></pre>
  </div>
  <p style="font-size:0.62rem; color:var(--text-muted); margin:0;">El esquema de Horner calcula la misma suma ponderada sin elevar potencias. Con la suma simple, ambos nombres caen en la cubeta \(558 mod 211 = 136\).</p>
    </div>
</div>

Note:
El código es un ejemplo ilustrativo con alfa = 31 y una tabla de 211 cubetas (un número primo). En el video original este tema aparece después de la resolución de colisiones; en esta página lo presentamos antes, para entender primero de dónde salen los índices.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> Un compilador combina los caracteres <strong>sumando sus códigos ASCII</strong>. ¿Qué par de identificadores colisiona <strong>siempre</strong>, sin importar el tamaño de la tabla?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false"><code>temp1</code> y <code>temp2</code></div>
  <div class="quiz-option" data-correct="true"><code>suma</code> y <code>masu</code></div>
  <div class="quiz-option" data-correct="false"><code>i</code> y <code>j</code></div>
  <div class="quiz-option" data-correct="false"><code>total</code> y <code>totales</code></div>
</div>

<div class="quiz-feedback"
     data-correct-explain="suma y masu tienen exactamente las mismas letras en distinto orden: la suma de sus códigos ASCII es idéntica, así que el módulo también lo será. La suma ponderada evita este problema."
     data-incorrect-explain="Con la suma simple el orden de los caracteres no importa. Buscá el par formado por las mismas letras en distinto orden (un anagrama): esos siempre producen el mismo valor."></div>

Note:
temp1 y temp2 difieren en un carácter, por lo que sus sumas difieren en 1; i y j tienen códigos distintos; total y totales tienen distinta cantidad de caracteres.

---

## Resolución de colisiones

<p>¿Qué hacer cuando se producen colisiones?</p>
<div class="video-player-wrapper" style="margin-top: 5px; width:80%">
      <video src="videos/c13/ts_resol_colisiones.mp4" poster="img/miraestevideo_2.png" controls></video>
    </div> 

---

## (1): Direccionamiento Abierto

<div class="card" style="padding:8px;">
      <p style="font-size:0.72rem; margin:0 0 6px 0;">Cada cubeta guarda <strong>a lo sumo un identificador</strong>. Si la cubeta calculada está ocupada, se usa la <strong>siguiente libre</strong>.</p>
</div>
<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:8px;">
      <div class="three-col-flex ratio-separa">
        <div class="col">
          <p style="font-size:0.66rem; margin:0;">Ejemplo 1: <br><code>h(x1) = h(x2) = h(x3) = 2</code></p>
          <table class="compare-table" style="font-size:1rem; width:100%; margin-top:20px">
            <thead><tr><th>Índice</th><th>Id</th></tr></thead>
            <tbody>
              <tr><td>0</td><td></td></tr><tr><td>1</td><td></td></tr>
              <tr><td>2</td><td><code>x1</code></td></tr>
              <tr><td>3</td><td><code>x2</code></td></tr>
              <tr><td>4</td><td><code>x3</code></td></tr>
            </tbody>
          </table>
        </div>
        <div> </div>
        <div class="col">
          <p style="font-size:0.66rem; margin:0;">Ejemplo 2: <br><code>h(cont)= 0, h(a) = 4, h(tam)=2, h(j)=2</code></p>
          <table class="compare-table" style="font-size:1rem; width:100%;">
            <thead><tr><th>Índice</th><th>Id</th></tr></thead>
            <tbody>
              <tr><td>0</td><td><code>cont</code></td></tr>
              <tr><td>1</td><td>—</td></tr>
              <tr><td>2</td><td><code>tam</code></td></tr>
              <tr style="background:rgba(255,200,0,0.12);"><td>3</td><td><code>j</code> (2 ocupada)</td></tr>
              <tr><td>4</td><td><code>a</code></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="flipped-callout-bis" style="margin-top:8px; padding:8px;">
      <h4 style="font-size:0.75rem; margin:0 0 4px 0;"><i class="fas fa-exclamation-triangle"></i> Limitaciones</h4>
      <ul style="font-size:0.64rem; line-height:1.45; margin:10;">
        <li>El tamaño de la tabla <strong>limita</strong> la cantidad de identificadores.</li>
        <li>Al llenarse, el rendimiento se degrada: hay que recorrer linealmente parte de la tabla.</li>
        <li>Eliminar no necesariamente mejora: no se reordenan las entradas.</li>
      </ul>
    </div>
  </div>
</div>

Note:
En el ejemplo de la derecha la tabla tiene 5 cubetas. cont, a y tam encuentran su cubeta libre; j quiere ir a la 2, ocupada por tam, y pasa a la 3. Ese tamaño de tabla tan pequeño sirve solo con fines didácticos.

---

## (2): Encadenamiento por Separado

<div class="card" style="padding:8px;">
      <p style="font-size:0.72rem; margin:0 0 6px 0;">Cada cubeta es el <strong>inicio de una lista enlazada</strong>. Ante una colisión, el nuevo identificador se inserta <strong>al principio</strong> de la lista.</p>
</div>
<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:8px;">
      <p style="font-size:0.66rem; margin:0;">Orden: <code>i, j, cont, temp</code>;<br> <code>h(i)=0, h(j)=1, h(cont)=1, h(temp)=3</code></p>
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead><tr><th>Cubeta</th><th>Lista</th></tr></thead>
        <tbody>
          <tr><td>0</td><td><code>i</code> → •</td></tr>
          <tr style="background:rgba(255,200,0,0.12);"><td>1</td><td><code>cont</code> → <code>j</code> → •</td></tr>
          <tr><td>2</td><td>•</td></tr>
          <tr><td>3</td><td><code>temp</code> → •</td></tr>
          <tr><td>4</td><td>•</td></tr>
        </tbody>
      </table>
      <p style="font-size:0.62rem; color:var(--text-muted); margin:4px 0 0 0;">• = puntero nulo. <code>cont</code> colisionó con <code>j</code> y quedó primero en la lista.</p>
    </div>
  </div>
  <div class="col">
    <!-- CLIP: video original U4 tabla de símbolos, 07:23 – 09:09 (encadenamiento por separado, ejemplo i/j/cont/temp) -->
    <div class="flipped-callout" style="margin-top:8px; padding:8px;">
      <ul style="font-size:0.66rem; line-height:1.45; margin:10;">
        <li>El tamaño del array <strong>ya no limita</strong> la cantidad de identificadores: las listas crecen.</li>
        <li>Con buen tamaño y buena función hash, las listas tienen en promedio <strong>un elemento</strong>: operaciones \(O(1)\).</li>
        <li>Una lista muy larga indica una mala función hash o una tabla chica.</li>
      </ul>
    </div>
  </div>
</div>

Note:
La implementación de las listas enlazadas depende del lenguaje en que esté escrito el compilador. La meta práctica es que el número promedio de colisiones por cubeta sea menor a uno. Esta es la implementación estándar, y la que usaremos para manejar ámbitos.

---

## Ámbito (scope) de una Declaración

<div class="card" style="padding:10px; margin-top:20px">
      <p style="font-size:0.74rem; line-height:1.5;">La tabla no solo registra <strong>qué</strong> identificadores existen, sino <strong>dónde son válidos</strong>. Esa región del programa es el <strong>ámbito</strong> de la declaración.</p>
</div>
<div class="video-player-wrapper" style="margin-top: 5px; width:80%">
      <video src="videos/c13/ts_ambito.mp4" poster="img/miraestevideo_2.png" controls></video>
    </div> 

---

## Regla 1: Declarar antes de usar

<p>Las reglas de ámbito son comunes a muchos lenguajes y tienen que ver con decisiones que toma el compilador. La regla de declarar antes de usar es la que hace posible un compilador de una sola pasada: la tabla se construye a medida que avanza el análisis sintáctico.</p>

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:10px; margin-top:20px">
      <ul style="font-size:0.7rem; line-height:1.55;">
        <li>C, Pascal, Java exigen declarar antes de referenciar.</li>
        <li>Permite construir la tabla en <strong>una sola pasada</strong>: en la declaración se <strong>inserta</strong>; en el uso se <strong>busca</strong>.</li>
        <li>Si la búsqueda falla → error de variable no declarada.</li>
        <li>Los lenguajes sin declaración previa necesitan una <strong>pasada previa</strong> para registrar todos los identificadores.</li>
      </ul>
    </div>
  </div>
  <div class="col">
<pre style="font-size:0.62rem; margin:4px 0;"><code class="language-c">int total;
total = cantidad * 2;   
// buscar("cantidad") 
//falla → error</code></pre>
  </div>
</div>

Note:
Las reglas de ámbito son comunes a muchos lenguajes y tienen que ver con decisiones que toma el compilador. La regla de declarar antes de usar es la que hace posible un compilador de una sola pasada: la tabla se construye a medida que avanza el análisis sintáctico.

---

## Regla 2: Anidamiento más Cercano

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:8px;">
<pre style="font-size:0.58rem; margin:0; width:95%"><code class="language-pascal">
program Ex;                    (* 1 *)
var i, j: integer;
  function f (size: integer): integer;(* 2 *)
  var i, temp: char;                  (* 3 *)
    procedure g;                      (* 4 *)
    var j: real;
    begin ... end;
    procedure h;                      (* 5 *)
    var j: ^char;
    begin ... end;
  begin (* f *) ... end;
begin (* main *) ... end.</code></pre>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px;">
      <p style="font-size:0.7rem; line-height:1.5;">Un <strong>bloque</strong> es una construcción que puede contener declaraciones (programa, funciones, procedimientos, clases, <code>{ }</code> en C). Hay <strong>estructura de bloques</strong> si los bloques pueden anidarse.</p>
      <table class="compare-table" style="font-size:1rem; width:100%;">
        <thead><tr><th>Bloque</th><th>Declara</th></tr></thead>
        <tbody>
          <tr><td>1. Programa</td><td><code>i, j : integer</code></td></tr>
          <tr><td>2. Encabezado de <code>f</code></td><td><code>size : integer</code></td></tr>
          <tr><td>3. Cuerpo de <code>f</code></td><td><code>i, temp : char</code></td></tr>
          <tr><td>4. <code>g</code></td><td><code>j : real</code></td></tr>
          <tr><td>5. <code>h</code></td><td><code>j : ^char</code></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
    <div class="flipped-callout" style="margin-top:8px; padding:8px;">
      <p style="font-size:0.7rem; margin:0;"><i class="fas fa-bullseye"></i> Si un nombre está declarado en varios bloques activos, vale la declaración del <strong>bloque más interno</strong> que contiene la referencia. En el cuerpo de <code>f</code>, <code>i</code> es <code>char</code>: oculta temporalmente a la <code>i</code> del programa.</p>
    </div>

Note:
Lo mismo ocurre con j: dentro de g es real y dentro de h es un puntero a char; en ambos casos ocultan temporalmente a la j entera del programa principal.

---

## Implementar Ámbitos con Encadenamiento

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="card" style="padding:10px;">
      <ul style="font-size:0.7rem; line-height:1.6;">
        <li><strong>Insertar</strong> no borra ni sobrescribe: <strong>oculta</strong> la declaración previa poniendo la nueva <strong>al principio</strong> de la lista.</li>
        <li><strong>Buscar</strong> encuentra primero la declaración más reciente, la del bloque más interno activo.</li>
        <li><strong>Entrar en un bloque:</strong> insertar sus declaraciones.</li>
        <li><strong>Salir de un bloque:</strong> borrar sus declaraciones, y reaparecen las anteriores.</li>
      </ul>
      <div class="flipped-callout-bis" style="margin-top:6px; padding:6px;">
        <p style="font-size:0.68rem; margin:0;"><i class="fas fa-layer-group"></i> Entrar y salir de bloques se comporta como <strong>apilar y desapilar</strong>.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <!-- CLIP: video original U4 tabla de símbolos, 14:44 – 17:17 (ámbitos anidados con encadenamiento: evolución de la tabla para el programa Ex) -->
    <div class="video-player-wrapper" style="margin-top: 5px;">
      <video src="videos/c13/ts_ejemplo_ambito.mp4" poster="img/ejemplo.jpeg" controls></video>
    </div>
    <p style="font-size:0.68rem; text-align:center; margin-top:6px;">Función hash del ejemplo (5 cubetas):<br><code>h(i)=0, h(j)=1, h(size)=1, h(temp)=3, h(f)=4, h(g)=h(h)=2</code></p>
  </div>
</div>

Note:
En las dos diapositivas siguientes seguimos la evolución de la tabla para el programa Ex en cuatro momentos. Tengan el programa a la vista para saber en qué bloque estamos en cada caso.

---

## Evolución de la Tabla (1/2)

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:8px;">
    <pre style="font-size:0.58rem; margin:0; width:95%"><code class="language-pascal">
    program Ex;                    
    var i, j: integer;
      function f (size: integer): integer;
      var i, temp: char;                  
        procedure g;                      
        var j: real;
        begin ... end;
        procedure h;                      
        var j: ^char;
        begin ... end;
      begin (* f *) ... end;
    begin (* main *) ... end.</code></pre>
    </div>
  </div>
  <div class="col">
    <p style="font-size:0.68rem; text-align:left; margin-top:6px;">Función hash (5 cubetas):<br><code>h(i)=0, <br> h(j)=1, <br> h(size)=1,<br> h(temp)=3, <br>h(f)=4, <br>h(g)=h(h)=2</code></p>
  </div>
</div>
<div class="two-col-equal" style="margin-top:20px">
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.78rem;"><span class="text-badge">A</span>&nbsp;Antes de entrar a <code>f</code></h4>
      <table class="compare-table" style="font-size:0.85rem; width:100%;">
        <thead><tr><th>Cubeta</th><th>Lista</th></tr></thead>
        <tbody>
          <tr><td>0</td><td><code>i (int)</code></td></tr>
          <tr><td>1</td><td><code>j (int)</code></td></tr>
          <tr><td>2</td><td>•</td></tr>
          <tr><td>3</td><td>•</td></tr>
          <tr><td>4</td><td>•</td></tr>
        </tbody>
      </table>
      <p style="font-size:0.62rem; color:var(--text-muted); margin:4px 0 0 0;">Solo las declaraciones del programa principal.</p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.78rem;"><span class="text-badge">B</span>&nbsp;Tras las declaraciones de <code>f</code></h4>
      <table class="compare-table" style="font-size:0.85rem; width:100%;">
        <thead><tr><th>Cubeta</th><th>Lista</th></tr></thead>
        <tbody>
          <tr style="background:rgba(255,200,0,0.12);"><td>0</td><td><code>i (char)</code> → <code>i (int)</code></td></tr>
          <tr><td>1</td><td><code>size (int)</code> → <code>j (int)</code></td></tr>
          <tr><td>2</td><td>•</td></tr>
          <tr><td>3</td><td><code>temp (char)</code></td></tr>
          <tr><td>4</td><td><code>f (function)</code></td></tr>
        </tbody>
      </table>
      <p style="font-size:0.62rem; color:var(--text-muted); margin:4px 0 0 0;">La <code>i</code> de <code>f</code> queda primera y <strong>oculta</strong> a la <code>i</code> del programa.</p>
    </div>
  </div>
</div>

Note:
Después de procesar las declaraciones de f, es decir, el parámetro size, las variables locales i y temp, y el propio nombre de la función, la búsqueda de i encuentra primero la i de tipo char: es la del bloque más interno activo.

---

## Evolución de la Tabla (2/2)

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:8px;">
    <pre style="font-size:0.58rem; margin:0; width:95%"><code class="language-pascal">
    program Ex;                    
    var i, j: integer;
      function f (size: integer): integer;
      var i, temp: char;                  
        procedure g;                      
        var j: real;
        begin ... end;
        procedure h;                      
        var j: ^char;
        begin ... end;
      begin (* f *) ... end;
    begin (* main *) ... end.</code></pre>
    </div>
  </div>
  <div class="col">
    <p style="font-size:0.68rem; text-align:left; margin-top:6px;">Función hash (5 cubetas):<br><code>h(i)=0, <br> h(j)=1, <br> h(size)=1,<br> h(temp)=3, <br>h(f)=4, <br>h(g)=h(h)=2</code></p>
  </div>
</div>
<div class="two-col-equal" style="margin-top:20px">
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.78rem;"><span class="text-badge">C</span>&nbsp;Tras las declaraciones de <code>h</code></h4>
      <table class="compare-table" style="font-size:0.85rem; width:100%;">
        <thead><tr><th>Cubeta</th><th>Lista</th></tr></thead>
        <tbody>
          <tr><td>0</td><td><code>i (char)</code> → <code>i (int)</code></td></tr>
          <tr style="background:rgba(255,200,0,0.12);"><td>1</td><td><code>j (^char)</code> → <code>size (int)</code> → <code>j (int)</code></td></tr>
          <tr><td>2</td><td>•</td></tr>
          <tr><td>3</td><td><code>temp (char)</code></td></tr>
          <tr><td>4</td><td><code>f (function)</code></td></tr>
        </tbody>
      </table>
      <p style="font-size:0.62rem; color:var(--text-muted); margin:4px 0 0 0;">La <code>j</code> de <code>h</code> está primera. La <code>j (real)</code> de <code>g</code> ya no aparece: se borró al salir de <code>g</code>.</p>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:8px;">
      <h4 class="card-title" style="font-size:0.78rem;"><span class="text-badge">D</span>&nbsp;Al salir de <code>f</code></h4>
      <table class="compare-table" style="font-size:0.85rem; width:100%;">
        <thead><tr><th>Cubeta</th><th>Lista</th></tr></thead>
        <tbody>
          <tr style="background:rgba(0,200,150,0.10);"><td>0</td><td><code>i (int)</code></td></tr>
          <tr><td>1</td><td><code>j (int)</code></td></tr>
          <tr><td>2</td><td>•</td></tr>
          <tr><td>3</td><td>•</td></tr>
          <tr><td>4</td><td><code>f (function)</code></td></tr>
        </tbody>
      </table>
      <p style="font-size:0.62rem; color:var(--text-muted); margin:4px 0 0 0;">Se borran las declaraciones de <code>f</code> y sus sub-bloques: la <code>i</code> del programa vuelve a ser visible. <code>f</code> permanece porque fue declarada en el programa principal.</p>
    </div>
  </div>
</div>

<p style="font-size:0.6rem; color:var(--text-muted); text-align:center; margin-top:6px;"><i class="fas fa-info-circle"></i> Como en la figura original (Louden), estas tablas muestran solo variables, parámetros y <code>f</code>. Los nombres <code>g</code> y <code>h</code> (\(h=2\)) también ocuparían la cubeta 2 mientras se procesa el cuerpo de <code>f</code>.</p>

Note:
Observen que salir de un bloque deja la tabla exactamente como estaba antes de entrar: es el comportamiento de una pila. Por eso el borrado elimina solo la declaración más reciente de cada nombre y descubre la anterior.

---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> En el programa del ejemplo anterior, dentro del cuerpo del procedimiento <span class="math-lang"><code>g</code></span>, ¿qué tipos tienen <span class="math-lang"><code>i</code></span> y <span class="math-lang"><code>j</code></span>?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false"><code>i</code> es <code>integer</code> y <code>j</code> es <code>integer</code>: valen las declaraciones del programa principal.</div>
  <div class="quiz-option" data-correct="true"><code>i</code> es <code>char</code> (declarada en <code>f</code>) y <code>j</code> es <code>real</code> (declarada en <code>g</code>).</div>
  <div class="quiz-option" data-correct="false"><code>i</code> es <code>char</code> y <code>j</code> es <code>^char</code>.</div>
  <div class="quiz-option" data-correct="false"><code>i</code> no es visible dentro de <code>g</code> porque no fue declarada allí.</div>
</div>

<div class="quiz-feedback"
     data-correct-explain="g no declara i, así que se busca en el bloque abarcador más cercano, f, donde i es char. Y j está declarada en el propio g como real. Es la regla del anidamiento más cercano."
     data-incorrect-explain="Aplicá la regla del anidamiento más cercano: para cada nombre, buscá primero en g y, si no está, en el bloque que lo rodea (f) y luego en el programa. Recordá también que h no está activo mientras se ejecuta g."></div>

Note:
En la tabla hash, mientras se procesa g, la búsqueda de i recorre la cubeta 0 y encuentra primero i (char); la de j recorre la cubeta 1 y encuentra primero j (real).

---

## Implementación Alternativa: una Tabla por Bloque

<div class="card" style="padding:10px; text-align:center; margin-top:0px">
      <ul style="font-size:0.7rem; line-height:1.5;">
        <li>Se crea una <strong>tabla de símbolos separada por cada bloque</strong> y se las <strong>enlaza</strong> de la más interna a la más externa.</li>
        <li><strong>Buscar:</strong> se empieza por la tabla del bloque más interno; si el nombre no está, se pasa a la siguiente hacia afuera.</li>
        <li><strong>Salir de un bloque:</strong> el puntero de acceso pasa a la siguiente tabla y la más interna se descarta.</li>
      </ul>      
    </div>
    <div class="flipped-callout" style="margin-top:5px; padding:2px; text-align:center">
        <p style="font-size:0.6rem; margin:0;">Conceptualmente más limpia: facilita la gestión de ámbitos en lenguajes con reglas de <em>scoping</em> complejas.</p>
    </div>  
<!-- CLIP: video original U4 tabla de símbolos, 17:17 – 18:12 (una tabla por ámbito, enlazadas) -->
<div class="video-player-wrapper" style="margin-top: 5px; width:80%">
  <video src="videos/c13/ts_impl_alternativa.mp4" poster="img/miraestevideo.png" controls></video>
</div>
<!-- PROMPT PARA GENERAR IMAGEN:
Tres tablas hash de 5 cubetas cada una, dibujadas de izquierda a derecha y enlazadas por flechas curvas (de la más interna a la más externa). Un puntero de acceso etiquetado "A" apunta a la primera. Tabla 1 (procedimiento h): cubeta 1 → j (^char). Tabla 2 (función f): cubeta 0 → i (char); cubeta 1 → size (int); cubeta 3 → temp (char). Tabla 3 (programa principal): cubeta 0 → i (int); cubeta 1 → j (int); cubeta 4 → f (function). Leyenda "Al comienzo del procedimiento h". Estilo técnico limpio, fondo oscuro, tipografía monoespaciada. Nombre sugerido: img/c13_tablas_por_bloque.png
-->


Note:
En la imagen se ve el estado al comienzo del procedimiento h: tres tablas enlazadas, que corresponden a h, a la función f que lo contiene y al programa principal. Buscar j encuentra primero j de tipo puntero a char en la tabla de h.

---

## Ejercicios Propuestos

<div class="card">
  <h4 class="card-title"><i class="fas fa-pencil-alt"></i> Ejercicios de Tabla de Símbolos</h4>
  <table class="compare-table" style="font-size:1.2rem;">
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
          Una tabla hash de 7 cubetas recibe, en este orden, <code>suma, x, total, y, aux, i</code> con \(h = 3, 5, 3, 6, 5, 3\). Muestre la tabla final usando <strong>direccionamiento abierto</strong> (considere la tabla circular: después de la cubeta 6 sigue la 0). ¿Cuántas cubetas se inspeccionan para buscar <code>i</code>?
        </td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td>
          Repita el ejercicio 1 usando <strong>encadenamiento por separado</strong> y compare la cantidad de inspecciones para buscar <code>i</code>.
        </td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td>
          Programe en Python la función hash de la clase con <strong>suma simple</strong> y con <strong>suma ponderada</strong> (\(m = 11\)). Para la lista <code>[suma, masu, temp1, temp2, total, x, y, aux, cont, tam]</code> cuente cuántas colisiones produce cada variante.
        </td>
      </tr>
      </tbody>
  </table>
</div>

Note:
Estos ejercicios se trabajarán en el encuentro presencial. Los dos primeros comparan las estrategias de resolución de colisiones, el tercero conecta la teoría con una implementación en Python y el cuarto ejercita el manejo de ámbitos.

---

<!-- SLIDE: Resumen de la Clase -->
<h2 class="text-gradient">Resumen de la Clase</h2> 

<div class="grid">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos hoy</h4>
    <ul style="font-size:0.8rem; line-height:1.5;">
      <li>La <strong>tabla de símbolos</strong> es la estructura central del compilador: todas las fases la usan para guardar y recuperar información sobre los identificadores.</li>
      <li>La implementación estándar es la <strong>tabla hash con encadenamiento por separado</strong>, con operaciones en tiempo constante en promedio.</li>
      <li>La <strong>función hash</strong> convierte un nombre en un índice en tres pasos: caracteres a enteros, combinación ponderada y ajuste por módulo.</li>
      <li>Los <strong>ámbitos anidados</strong> se manejan insertando al principio de las listas (la búsqueda encuentra la declaración más reciente) y borrando al salir de cada bloque.</li>
    </ul>
  </div>   
      
  <div class="card" style="margin-top:10px">
    <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-flag-checkered"></i></span>¡Cerramos la Unidad 4! Próxima lección</h4>
    <p style="margin-top:12px; text-align:center; color:var(--text-muted); font-size:0.85rem;">
      Con el análisis semántico y la tabla de símbolos termina la <strong>etapa de análisis</strong> del compilador. En la <strong>Unidad 5</strong> entramos en la <strong>síntesis</strong>: la <strong>generación de código intermedio</strong>, que transforma el árbol decorado en una representación más cercana al código máquina.
    </p>
  </div>    
</div>

<div class="flipped-callout" style="text-align: center; margin-top:10px;">
  <p style="font-size:0.8rem; margin:0;"><strong>⚠️ Recordatorio:</strong> Completar el cuestionario de autoevaluación sobre tabla de símbolos en la plataforma virtual antes del próximo encuentro presencial.</p>
</div>

Note:
Con esta clase completamos la Unidad 4. El análisis semántico, basado en definiciones dirigidas por la sintaxis y soportado por la tabla de símbolos, es la última etapa de análisis del compilador. A partir de la próxima clase comenzamos la fase de síntesis con la generación de código intermedio. ¡Nos vemos!

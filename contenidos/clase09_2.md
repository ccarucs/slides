<!-- HOJA DE RUTA --->
<h2>¿Qué aprendemos en esta clase?</h2>

<div class="flipped-callout" style="margin-top: 10px !important; margin-bottom: 10px !important; padding: 15px !important;">
  <h4><i class="fas fa-broom"></i> Transformaciones Gramaticales</h4>
  <p>Para construir un analizador sintáctico descendente determinista y sin retroceso, debemos <strong>preparar la gramática</strong>. En esta clase aprenderemos las transformaciones esenciales: limpieza, eliminación de recursividad a izquierda y factorización.</p>
</div>

<div class="grid-2">  
  <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
    <span class="text-badge" style="margin-bottom: 5px !important;">
      <i class="fas fa-list-ul"></i> Hoja de ruta (2da parte)</span>    
    <ul style="font-size: 0.80rem !important; line-height: 1.6; margin-left: 20px; ">
      <li>Limpieza de gramáticas</li>
      <li>Recursividad por la izquierda</li>
      <li>Eliminación de la recursividad a izquierda</li>
      <li>Factorización por la izquierda de prefijos comunes</li>
    </ul>       
  </div>  
  <div><img src="img/limpieza_glc.jpeg" style="align:center; width:70%"></img></div>
</div>

Note:
Bienvenidos. En la clase anterior vimos que el descenso recursivo con retroceso es costoso y que la recursividad a la izquierda provoca bucles infinitos. Hoy aprenderemos a preparar cualquier gramática para que sea apta para un parser descendente: limpiarla, eliminar la recursividad a izquierda y factorizar prefijos comunes.

---

## Limpieza de gramáticas

<div class="flipped-callout recordar" style="margin-top:10px;">
  <p style="font-size:0.75rem;">
    Antes de aplicar cualquier transformación, es necesario <strong>limpiar la gramática</strong> eliminando símbolos inútiles, producciones vacías no deseadas y ciclos. Esto garantiza que las transformaciones posteriores sean correctas y eficientes.
  </p>
</div>
  <div class="video-player-wrapper" style="width:80%">
    <video src="videos/c09/as_limpieza.mp4" poster="img/u0_02_play_video.png" controls></video>
  </div>

---

## Recursividad por la Izquierda

<div class="two-col-flex ratio-40-60">
  <div class="col">
    <div class="flipped-callout" style="border-left-color:var(--accent-danger); padding:12px;">
      <h4 style="color:var(--accent-danger); margin-top:0;"><i class="fas fa-ban"></i> Recursividad Inmediata a Izquierda</h4>
      <p style="font-size:0.8rem;">
        Una producción es recursiva por la izquierda si es de la forma:
        \[ A \rightarrow A \alpha \mid \beta \]
      </p>
    </div>
  </div>
  <div class="col card" style="padding:10px; margin-top:10px;">
    <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-bug"></i> ¿Qué ocurre en el código ejecutable?</h4>
    <pre style="font-size:0.75rem; margin:0;"><code class="language-python">def proc_A():
  # Al intentar la producción A -> A alpha:
  proc_A()  # ¡Llamada recursiva infinita!
  parea(alpha)</code></pre>
    <p style="font-size:0.7rem; margin-top:6px; color:var(--accent-danger);">
      <strong>Resultado:</strong> El procedimiento se invoca a sí mismo infinitamente sin haber consumido ningún token de entrada, provocando un desbordamiento de pila (<em>Stack Overflow</em>).
    </p>
  </div>
</div>
<div style="padding:5px; text-align:center;">
      <p style="font-size:0.75rem;">
        <strong>El Análisis Sintáctico Descendente NO puede procesar gramáticas con recursividad por la izquierda.</strong>
      </p>
      <!-- PROMPT PARA GENERAR IMAGEN:
      Ilustración conceptual de un bucle infinito en código: un engranaje atrapado en un ciclo sin fin marcando 'proc_A() -> proc_A() -> proc_A()' con un cartel luminoso de advertencia 'Stack Overflow'.
      -->
    <div class="video-player-wrapper" style="width:80%">
    <video src="videos/c09/as_elimina_recizq.mp4" poster="img/rec_glc.png" controls></video>
    </div>
</div>

Note:
Aquí llegamos a la restricción más importante del análisis descendente. Si una gramática tiene recursividad por la izquierda, por ejemplo E -> E + T, la función proc_E comenzará llamándose inmediatamente a sí misma antes de haber leído o consumido ningún token. Esto genera una recursion infinita que cuelga el compilador. Por esta razón, antes de escribir un parser descendente, es obligatorio eliminar la recursividad por la izquierda de la gramática.

---

## Eliminación de la Recursividad por la Izquierda

<div>
  <div class="col">
    <p style="font-size:0.85rem;">
      Una regla es <strong>recursiva por la izquierda</strong> si el símbolo No Terminal del lado izquierdo reaparece inmediatamente al principio del lado derecho: \(A \rightarrow A \alpha \mid \beta\).
    </p>
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:1rem; color:var(--accent-color);"><i class="fas fa-exchange-alt"></i> Regla de Transformación Directa</h4>
      <table class="compare-table" style="font-size:1.1rem;">
        <thead>
          <tr>
            <th style="background:rgba(244,67,54,0.15); color:var(--accent-danger);">ANTES (Recursiva por la izquierda)</th>
            <th style="background:rgba(76,175,80,0.15); color:var(--accent-success);">DESPUÉS (Recursiva por la derecha)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              \(A \rightarrow A \alpha \mid \beta\)<br>
              <span style="font-size:0.9rem; color:var(--text-muted);">(Genera: \(\beta, \beta\alpha, \beta\alpha\alpha, \dots\))</span>
            </td>
            <td>
              \(A \rightarrow \beta A'\)<br>
              \(A' \rightarrow \alpha A' \mid \epsilon\)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flipped-callout" style="margin-top:15px; padding:8px;">
      <p style="font-size:0.75rem; margin:0;">
        <strong>Aplicación en Expresiones:</strong><br>
        \(E \rightarrow E + T \mid T\)  &nbsp;<br> 
        \(\Downarrow\)&nbsp; <br>
        \(E \rightarrow T E'\) &nbsp; <br>
        \(E' \rightarrow + T E' \mid \epsilon\).
      </p>
    </div>
  </div>
</div>

Note:
El primer paso indispensable para aplicar un parser descendente es eliminar la recursividad por la izquierda. La transformación consiste en reemplazar las reglas A -> A alpha | beta por A -> beta A' y A' -> alpha A' | epsilon. El conjunto de cadenas generadas por ambas gramáticas es exactamente el mismo (cadena beta seguida de cero o más repeticiones de alpha), pero la nueva gramática pasa a ser recursiva por la derecha, lo cual es perfectamente procesable por nuestro parser.

---

## Algoritmo General: Recursividad Indirecta

<p style="font-size:0.85rem; text-align:center;">La recursividad a la izquierda puede ser <strong>indirecta</strong> (ejemplo: \(A \Rightarrow B \gamma \Rightarrow A \delta\)). El algoritmo de Aho et al. elimina todo tipo de recursión:</p>

<div class="two-col-flex ratio-60-40">
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title" style="font-size:0.85rem;"><i class="fas fa-cogs"></i> Algoritmo de Eliminación Completa</h4>
      <ol style="font-size:0.75rem; line-height:1.5; margin-left:15px;">
        <li>Ordenar los No Terminales de la gramática: \(A_1, A_2, \dots, A_n\).</li>
        <li>Para \(i = 1\) hasta \(n\):
          <ul style="margin-left:10px;">
            <li>Para \(j = 1\) hasta \(i-1\):</li>
            <li style="list-style-type:none;">Reemplazar producciones \(A_i \rightarrow A_j \gamma\) por \(A_i \rightarrow \delta_1 \gamma \mid \delta_2 \gamma \dots\) donde \(A_j \rightarrow \delta_1 \mid \delta_2\) son las producciones de \(A_j\).</li>
            <li>Eliminar la recursividad directa inmediata en las producciones de \(A_i\).</li>
          </ul>
        </li>
      </ol>
    </div>
  </div>

  <div class="col">
    <div class="flipped-callout recordar" style="padding:12px;">
      <h4><i class="fas fa-lightbulb"></i> Garantía del Algoritmo</h4>
      <p style="font-size:0.75rem;">
        Al finalizar las pasadas, la gramática resultante no contendrá <strong>ninguna regla recursiva por la izquierda</strong>, ni directa ni indirecta, manteniendo intacto el lenguaje generado \(L(G)\).
      </p>
    </div>     
  </div>
</div>
<div class="card" style="padding:10px; margin-top:10px;">
      <h4 class="card-title"><i class="fas fa-stream"></i> Ejemplo de Sustitución</h4>
      <p style="font-size:0.7rem; margin-top:4px;">
        Si&nbsp; <span style="color:var(--accent-success)"> \(S \rightarrow A a \mid b\) </span>y <span style="color:var(--accent-success)">\(A \rightarrow S d \mid c\)</span>:<br>
        Sustituyendo \(S\) en \(A\):&nbsp; <span style="color:var(--accent-success)">\(A \rightarrow A a d \mid b d \mid c\)</span>.<br>
        Eliminando recursión directa en \(A\): &nbsp;<span style="color:var(--accent-success)">\(A \rightarrow b d A' \mid c A'\)</span>, &nbsp; <span style="color:var(--accent-success)">\(A' \rightarrow a d A' \mid \epsilon\)</span>.
      </p>
    </div>
Note:
Cuando la recursividad involucra ciclos entre múltiples No Terminales (recursividad indirecta), aplicamos un algoritmo sistemático. Se establece un orden entre los No Terminales A1 a An y se sustituyen progresivamente las producciones de los no terminales anteriores, convirtiendo la recursividad indirecta en directa para luego eliminarla con el esquema estándar.


---

## Factorización por la Izquierda 

<p style="font-size:0.85rem;margin-top:-5px;"">
  Cuando un No Terminal posee dos o más alternativas que comienzan con el <strong>mismo prefijo</strong> (\(A \rightarrow \alpha \beta_1 \mid \alpha \beta_2\)), el parser no puede decidir cuál elegir con 1 solo token de preanálisis.
</p>
<div class="two-col">
  <div class="col">
    <div class="card" style="padding:10px; width:90%">
      <h4 class="card-title"><i class="fas fa-cut"></i> Extracción del Factor Común</h4>
      <!--<div style="font-size:1rem; font-family:monospace; background:rgba(0,0,0,0.2); padding:8px; border-radius:5px;">-->
      <div style="font-size:1rem; font-family:monospace; margin-top:4px;">
        ANTES: &nbsp;&nbsp; A → α β₁ | α β₂ | γ<br>
        DESPUÉS: A → α A' | γ<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A' → β₁ | β₂
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card" style="padding:10px;">
      <h4 class="card-title"><i class="fas fa-code"></i> Caso Clásico: Sentencia if-then-else</h4>
      <div style="font-size:1rem; font-family:monospace; margin-top:4px;">
        prop → <strong>if</strong> expr <strong>then</strong> prop prop'<br>
        prop' → <strong>else</strong> prop | ε
        <br>
      </div>
    </div>
  </div>
</div>
<div>
    <!-- PROMPT PARA GENERAR IMAGEN:
    Ilustración analógica similar al álgebra: mostrando el paso de 'a*b + a*c' a 'a*(b + c)', aplicado visualmente a reglas de código 'if expr then prop else prop' e 'if expr then prop' donde el bloque 'if expr then prop' se extrae hacia afuera.
    -->
    <div class="video-player-wrapper" style="margin-top:8px; width:80%">
      <video src="videos/c09/as_elimina_factizq.mp4" poster="img/factores_izq.png" controls></video>
    </div>
</div>


---

## Responde la siguiente pregunta

<div>
<span class="quiz-question"><span class="emoji-float big"> 🤔</span> Dada la gramática <span class="math-lang">\(A \rightarrow A \alpha \mid \beta\)</span>, ¿cuál es la forma equivalente sin recursividad por la izquierda?</span>
</div>

<div class="quiz-container">  
  <div class="quiz-option" data-correct="false">\(A \rightarrow \alpha A \mid \beta\) &nbsp;sin cambios adicionales.</div>
  <div class="quiz-option" data-correct="true">\(A \rightarrow \beta A'\) &nbsp;y &nbsp;\(A' \rightarrow \alpha A' \mid \epsilon\).</div>
  <div class="quiz-option" data-correct="false">\(A \rightarrow \alpha \beta\)&nbsp; concatenando ambas producciones.</div>
  <div class="quiz-option" data-correct="false">\(A \rightarrow \beta \mid \epsilon\) &nbsp;eliminando directamente la parte recursiva.</div>
</div>

<div class="quiz-feedback"
     data-correct-explain="La transformación introduce un No Terminal auxiliar A' que captura la parte repetitiva de forma recursiva por la derecha, equivalente al lenguaje original pero compatible con el análisis descendente."
     data-incorrect-explain="Recuerda que la transformación estándar introduce un No Terminal auxiliar A' para convertir la recursividad a izquierda en recursividad a derecha: A → β A' y A' → α A' | ε."></div>

Note:
Esta pregunta evalúa si los estudiantes comprenden el mecanismo de transformación para eliminar la recursividad por la izquierda directa.

---

## Ejercicios Propuestos

<div class="card">
  <h4 class="card-title"><i class="fas fa-pencil-alt"></i> Resolver:</h4>
  <table class="compare-table" style="font-size:1.1rem;">
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
          Elimine la recursividad por la izquierda de la gramática de expresiones:<br>
          \(E \rightarrow E + T \mid E - T \mid T\) &nbsp;<br>
          \(T \rightarrow T * F \mid T / F \mid F\) &nbsp; <br>
          \(F \rightarrow ( E ) \mid \mathbf{id}\)
        </td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td>
          Identifique y elimine la recursividad indirecta en:<br>
          \(S \rightarrow A a \mid b\) &nbsp;<br>
          \(A \rightarrow S d \mid c\)
        </td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td>
          Aplique factorización por la izquierda a la gramática:<br>
          \(S \rightarrow \mathbf{if} \; E \; \mathbf{then} \; S \; \mathbf{else} \; S \mid \mathbf{if} \; E \; \mathbf{then} \; S \mid \mathbf{other}\)
        </td>
      </tr>
    </tbody>
  </table>
</div>

Note:
Estos ejercicios cubren las tres transformaciones vistas en la clase: eliminación de recursividad directa, indirecta y factorización. Son ejercicios preparatorios para poder construir la tabla LL(1) en la próxima clase.

---

<!-- SLIDE: Resumen de la Clase -->
<h2 class="text-gradient">Resumen de la Clase (2da parte)</h2> 

<div class="grid">
  <div class="card">
    <h4 class="card-title"><span class="icon"><i class="fas fa-check-double"></i></span>Lo que aprendimos hoy</h4>
    <ul style="font-size:0.8rem; line-height:1.5;">
      <li>La <strong>limpieza de gramáticas</strong> elimina símbolos inútiles y producciones problemáticas antes de cualquier transformación.</li>
      <li>La <strong>recursividad por la izquierda</strong> directa \(A \rightarrow A\alpha \mid \beta\) se elimina con \(A \rightarrow \beta A'\) y \(A' \rightarrow \alpha A' \mid \epsilon\).</li>
      <li>El <strong>algoritmo de Aho et al.</strong> elimina también la recursividad indirecta mediante sustituciones ordenadas.</li>
      <li>La <strong>factorización por la izquierda</strong> extrae prefijos comunes \(\alpha\) en un nuevo No Terminal, postergando la decisión.</li>
      <li>Con estas transformaciones, la gramática queda lista para construir un <strong>parser predictivo sin retroceso</strong>.</li>
    </ul>
  </div>   
    
  <div class="card" style="margin-top:8px;">
    <h4 class="card-title" style="font-size: 1rem !important; color: var(--accent-success) !important;"><span class="icon"><i class="fas fa-calendar-day"></i></span>Próxima lección</h4>
    <p style="margin-top:12px; text-align:center; color:var(--text-muted); font-size:0.85rem;">
      Estudiaremos el <strong>Análisis Sintáctico Descendente LL(1)</strong>: conjuntos PRIMERO y SIGUIENTE, construcción de la Tabla de Análisis \(M[A,a]\) y algoritmo de ejecución con pila explícita.
    </p>
  </div>    
</div>

<div class="flipped-callout" style="text-align: center; margin-top:8px;">
  <p style="font-size:0.8rem; margin:0;"><strong>⚠️ Recordatorio:</strong> Completar el cuestionario de autoevaluación correspondiente a esta clase en la plataforma virtual antes de la próxima clase presencial.</p>
</div>

Note:
Llegamos al final de esta clase. Hemos dominado las tres transformaciones gramaticales fundamentales: limpieza, eliminación de recursividad a izquierda y factorización. Con estas herramientas, cualquier gramática apta puede prepararse para el análisis descendente predictivo. En la próxima clase construiremos la Tabla LL(1) y veremos el parser con pila explícita en acción. ¡Nos vemos!

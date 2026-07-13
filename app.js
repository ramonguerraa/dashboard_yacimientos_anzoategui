/* ==========================================================================
   1. ESTADO GLOBAL DE LA APLICACIÓN (APPLICATION STATE)
   ========================================================================== */
// Aquí se almacenará toda la información viva del portafolio en memoria
const STATE = {
  rawDataset: [],      /* Arreglo original de objetos parsed del CSV */
  filteredDataset: [], /* Subconjunto de datos tras aplicar filtros año/zona */
  currentTab: 'p0',    /* Pestaña activa por defecto: Resumen Ejecutivo */
  metadata: {
    totalRecords: 0,
    uniqueFields: 0
  }
};

/* ==========================================================================
   2. ENRUTADOR DE PESTAÑAS INTERACTIVAS (TAB ROUTER)
   ========================================================================== */
/**
 * Administra el cambio de pantallas ocultando las inactivas y encendiendo la seleccionada
 * @param {string} pageId - El ID de la sección HTML a activar (p0, p1, p2...)
 * @param {HTMLElement} tabElement - El elemento del menú que recibió el clic
 */
function goTo(pageId, tabElement) {
  // 1. Guardar la pestaña activa en el estado global
  STATE.currentTab = pageId;

  // 2. Apagar todas las páginas visualmente
  const allPages = document.querySelectorAll('.page');
  allPages.forEach(page => {
    page.classList.remove('active');
  });

  // 3. Encender exclusivamente la página solicitada
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // 4. Actualizar la estética de las pestañas en la barra superior (topbar)
  const allTabs = document.querySelectorAll('.nav-tab');
  allTabs.forEach(tab => {
    tab.classList.remove('active');
  });

  // 5. Encender visualmente en dorado la pestaña cliqueada
  if (tabElement) {
    tabElement.classList.add('active');
  } else {
    // Salvaguarda por si se llama a la función internamente sin pasar el elemento HTML
    const fallbackTab = Array.from(document.querySelectorAll('.nav-tab'))
      .find(tab => tab.getAttribute('onclick').includes(`'${pageId}'`));
    if (fallbackTab) fallbackTab.classList.add('active');
  }
}

/* ==========================================================================
   3. LECTOR Y PROCESADOR DE ARCHIVOS CSV (CSV PARSER)
   ========================================================================== */
/**
 * Convierte el texto plano de un CSV en un arreglo de objetos JavaScript
 * @param {string} text - El contenido crudo del archivo .csv
 * @returns {Array<Object>} Arreglo de filas estructuradas
 */
function parseCSV(text) {
  // 1. Limpiar retornos de carro (\r) y dividir por saltos de línea (\n)
  const lines = text.replace(/\r/g, '').split('\n').filter(line => line.trim() !== '');
  
  if (lines.length < 2) return [];

  // 2. Extraer los encabezados de la primera línea (removiendo espacios extra)
  const headers = lines[0].split(',').map(h => h.trim());
  const result = [];

  // 3. Recorrer cada fila de datos (empezando en la línea 1)
  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    
    // Validar que la línea tenga el mismo número de columnas que los encabezados
    if (currentLine.length === headers.length) {
      const obj = {};
      
      headers.forEach((header, index) => {
        let value = currentLine[index].trim();
        
        // Convertir automáticamente a números los campos que lo sean
        // (Evita que carguen como texto variables como producción, costos, etc.)
        if (value !== '' && !isNaN(value)) {
          obj[header] = Number(value);
        } else {
          obj[header] = value;
        }
      });
      
      result.push(obj);
    }
  }
  return result;
}

/**
 * Orquesta la lectura del archivo seleccionado por el usuario
 * @param {File} file - El objeto archivo de la aduana HTML
 */
function processFile(file) {
  const reader = new FileReader();

  // Definir qué pasa cuando la lectura en disco termina con éxito
  reader.onload = function(e) {
    const textContent = e.target.result;
    
    // Pasar el texto plano por el parser numérico
    STATE.rawDataset = parseCSV(textContent);
    
    if (STATE.rawDataset.length > 0) {
      // Sincronizar el conjunto de datos filtrado inicialmente con toda la data
      STATE.filteredDataset = [...STATE.rawDataset];
      
      // Actualizar metadatos globales
      STATE.metadata.totalRecords = STATE.rawDataset.length;

      // == LÍNEAS DE INTEGRACIÓN ==
      populateFilterSelects();
      initFilterListeners();
      updateKPICards();
      renderMainTable();
      renderRankings();
      renderHeatmap();
      renderAllCharts();
      renderNarrativeStories();
      // ==================================
      
      console.log("¡Data cargada con éxito! Filas procesadas:", STATE.metadata.totalRecords);
      
      // DISPARADOR MAESTRO DE LA INTERFAZ:
      // Aquí llamaremos más adelante a las funciones que pintan los KPI, Gráficos y Tablas
      
      // Transición visual: Ocultar pantalla de carga y encender el Dashboard Root
      document.getElementById('uploadScreen').style.display = 'none';
      document.getElementById('dashboardRoot').style.display = 'flex';
      
      // Forzar al enrutador a posicionar al usuario en la Portada (P0)
      goTo('p0', null);
    } else {
      alert("Error: El archivo CSV no tiene un formato válido o está vacío.");
    }
  };

  // Leer el archivo como texto plano bajo codificación UTF-8
  reader.readAsText(file, 'UTF-8');
}

/* ==========================================================================
   4. MANIPULADORES DE EVENTOS DE ARRASTRE Y SELECCIÓN (DOM LISTENERS)
   ========================================================================== */
// Ejecutar una vez que todo el árbol HTML esté completamente cargado en memoria
document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');

  if (dropZone && fileInput) {
    
    // Evento 1: Hacer clic en la zona de arrastre abre el explorador de archivos
    dropZone.addEventListener('click', () => fileInput.click());

    // Evento 2: Detectar que el usuario seleccionó un archivo de forma tradicional
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        processFile(e.target.files[0]);
      }
    });

    // Evento 3: El archivo está flotando sobre la zona de arrastre (activar estilo visual)
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault(); // Evita que el navegador abra el archivo en una pestaña nueva
      dropZone.classList.add('dragover');
    });

    // Evento 4: El usuario sacó el archivo de la zona sin soltarlo (remover estilo)
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    // Evento 5: El usuario soltó el archivo dentro de la aduana
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');

      if (e.dataTransfer.files.length > 0) {
        const droppedFile = e.dataTransfer.files[0];
        
        // Control de calidad: Validar que sea un archivo de texto o extensión .csv
        if (droppedFile.name.endsWith('.csv') || droppedFile.type === "text/csv") {
          processFile(droppedFile);
        } else {
          alert("Por favor, sube únicamente archivos con formato .csv de tu portafolio.");
        }
      }
    });
  }
});

/* ==========================================================================
   5. BOTÓN DE REINICIO GLOBAL (SYSTEM RESET)
   ========================================================================== */
/**
 * Limpia el estado global y regresa al usuario a la aduana de carga original
 */
function resetTool() {
  // 1. Vaciar los arreglos de memoria
  STATE.rawDataset = [];
  STATE.filteredDataset = [];
  STATE.currentTab = 'p0';
  STATE.metadata.totalRecords = 0;

  // 2. Limpiar el selector de archivos nativo
  const fileInput = document.getElementById('fileInput');
  if (fileInput) fileInput.value = '';

  // 3. Resetear visualmente las pantallas
  document.getElementById('dashboardRoot').style.display = 'none';
  document.getElementById('uploadScreen').style.display = 'flex';
  
  console.log("Estado de la aplicación reiniciado correctamente.");
}

/* ==========================================================================
   6. EXTRACTOR DE PARÁMETROS Y FILTRADO DINÁMICO (FILTER ENGINE)
   ========================================================================== */
/**
 * Extrae los valores únicos de Zona y Año del dataset para poblar los selectores HTML
 */
function populateFilterSelects() {
  const selectZona = document.getElementById('sel-zona');
  const selectAnio = document.getElementById('sel-anio');
  
  if (!selectZona || !selectAnio) return;

  // 1. Extraer valores únicos usando un Set (Estructura que descarta duplicados)
  const zonas = new Set();
  const anios = new Set();

  STATE.rawDataset.forEach(row => {
    if (row.Zona) zonas.add(row.Zona);
    if (row.Anio) anios.add(row.Anio); // Nota: 'Anio' mapea la columna del CSV sin caracteres especiales
  });

  // 2. Limpiar selectores y añadir la opción por defecto
  selectZona.innerHTML = '<option value="TODAS">Todas las Zonas</option>';
  selectAnio.innerHTML = '<option value="TODOS">Todos los Años</option>';

  // 3. Poblar el selector de Zonas (ordenado alfabéticamente)
  Array.from(zonas).sort().forEach(zona => {
    selectZona.innerHTML += `<option value="${zona}">${zona}</option>`;
  });

  // 4. Poblar el selector de Años (ordenado de forma descendente, el más reciente primero)
  Array.from(anios).sort((a, b) => b - a).forEach(anio => {
    selectAnio.innerHTML += `<option value="${anio}">${anio}</option>`;
  });
}

/**
 * Filtra el dataset global basándose en las opciones seleccionadas en la topbar
 */
function applyFilters() {
  const valZona = document.getElementById('sel-zona').value;
  const valAnio = document.getElementById('sel-anio').value;

  // Filtrado matricial de alto rendimiento
  STATE.filteredDataset = STATE.rawDataset.filter(row => {
    const matchZona = (valZona === 'TODAS' || row.Zona === valZona);
    const matchAnio = (valAnio === 'TODOS' || row.Anio === Number(valAnio));
    return matchZona && matchAnio;
  });

  console.log(`Filtros aplicados. Zona: ${valZona} | Año: ${valAnio}. Registros resultantes: ${STATE.filteredDataset.length}`);

  // == INTEGRACIÓN CON EL FILTRO GLOBAL ==
  updateKPICards();
  renderMainTable();
  renderRankings();
  renderHeatmap();
  renderAllCharts();
  renderNarrativeStories();
  // ======================================
}

/**
 * Vincula los escuchas de cambio a los selectores de la barra superior
 */
function initFilterListeners() {
  const selectZona = document.getElementById('sel-zona');
  const selectAnio = document.getElementById('sel-anio');

  if (selectZona) selectZona.addEventListener('change', applyFilters);
  if (selectAnio) selectAnio.addEventListener('change', applyFilters);
}

/* ==========================================================================
   7. MOTOR DE CARPINTERÍA NUMÉRICA (AGGREGATION & STATS ENGINE)
   ========================================================================== */
/**
 * Realiza el procesamiento numérico y estadístico del dataset filtrado
 * @returns {Object} Diccionario con los agregados y métricas calculadas
 */
function calculateGlobalMetrics() {
  const data = STATE.filteredDataset;
  
  // Salvaguarda por si los filtros dejan el dataset vacío
  if (data.length === 0) {
    return {
      prodTotal: 0, prodDelta: 0,
      liftingAvg: 0, liftingDelta: 0,
      beAvg: 0, beDelta: 0,
      ratioPozos: 0, ratioPozosDelta: 0,
      res1P: 0, res2P: 0,
      cvRiesgo: 0, flaringTotal: 0
    };
  }

  // 1. INICIALIZACIÓN DE ACUMULADORES (CARPINTERÍA BASE)
  let sumaProd = 0;
  let sumaLiftingPesado = 0; // Para promedio ponderado si aplica, o directo
  let sumaLifting = 0;
  let sumaBreakeven = 0;
  let sumaPozosActivos = 0;
  let sumaPozosTotales = 0;
  let sumaRes1P = 0;
  let sumaRes2P = 0;
  let sumaFlaring = 0;

  // Para el cálculo de la volatilidad (Desviación Estándar de la producción)
  const listaProd = [];

  // 2. BUCLE MAESTRO DE AGREGACIÓN
  data.forEach(row => {
    sumaProd += (row.Produccion || 0);
    sumaLifting += (row.Lifting_Cost || 0);
    sumaBreakeven += (row.Breakeven || 0);
    sumaPozosActivos += (row.Pozos_Activos || 0);
    sumaPozosTotales += (row.Pozos_Totales || 0);
    sumaRes1P += (row.Reservas_1P || 0);
    sumaRes2P += (row.Reservas_2P || 0);
    sumaFlaring += (row.Flaring || 0);
    
    if (row.Produccion) listaProd.push(row.Produccion);
  });

  const n = data.length;

  // 3. CÁLCULO DE PROMEDIOS SIMPLES Y COMPUESTOS
  const prodTotal = sumaProd;
  const liftingAvg = sumaLifting / n;
  const beAvg = sumaBreakeven / n;
  const ratioPozos = sumaPozosTotales > 0 ? (sumaPozosActivos / sumaPozosTotales) * 100 : 0;
  const flaringTotal = sumaFlaring;

  // 4. CARPINTERÍA ESTADÍSTICA AVANZADA: Coeficiente de Variación (CV) para el Riesgo
  // CV = (Desviación Estándar / Promedio) * 100
  const prodAvg = prodTotal / n;
  let cvRiesgo = 0;
  
  if (n > 1 && prodAvg > 0) {
    const varianza = listaProd.reduce((acc, val) => acc + Math.pow(val - prodAvg, 2), 0) / (n - 1);
    const desviacionEstandar = Math.sqrt(varianza);
    cvRiesgo = (desviacionEstandar / prodAvg) * 100;
  }

  // 5. CÁLCULO DE DELTAS (Simulación de desvíos vs metas fijas de la cuenca)
  // En un entorno real, estos deltas comparan contra el año anterior o la meta corporativa.
  // Dejamos la carpintería matemática lista con umbrales típicos de Anzoátegui:
  const prodDelta = prodTotal - 120000; // Meta base referencial de 120k bbl/d
  const liftingDelta = liftingAvg - 15.0; // Umbral de costo óptimo: 15 USD/bbl
  const beDelta = beAvg - 40.0; // Precio de equilibrio internacional promedio
  const ratioPozosDelta = ratioPozos - 75.0; // Meta de eficiencia de pozos del 75%

  return {
    prodTotal, prodDelta,
    liftingAvg, liftingDelta,
    beAvg, beDelta,
    ratioPozos, ratioPozosDelta,
    res1P: sumaRes1P,
    res2P: sumaRes2P,
    cvRiesgo,
    flaringTotal
  };
}

/* ==========================================================================
   8. MOTOR DE RENDERIZADO DE RATIOS (KPI UPDATE ENGINE)
   ========================================================================== */
/**
 * Formatea un número con separadores de miles y decimales fijos
 * @param {number} num - El valor numérico crudo
 * @param {number} decimals - Cantidad de decimales deseados
 * @returns {string} Texto formateado
 */
function formatNum(num, decimals = 1) {
  return num.toLocaleString('es-VE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Lee las métricas calculadas y actualiza el DOM de las 6 tarjetas KPI
 */
function updateKPICards() {
  const metrics = calculateGlobalMetrics();

  // CARD 1: PRODUCCIÓN TOTAL
  const elProdVal = document.getElementById('kpi-prod-val');
  const elProdDelta = document.getElementById('kpi-prod-delta');
  if (elProdVal && elProdDelta) {
    elProdVal.innerHTML = `${formatNum(metrics.prodTotal, 0)} <span class="kpi-unit">bbl/d</span>`;
    
    if (metrics.prodDelta >= 0) {
      elProdDelta.className = "kpi-delta up";
      elProdDelta.innerText = `▲ +${formatNum(metrics.prodDelta, 0)} vs meta`;
    } else {
      elProdDelta.className = "kpi-delta warn";
      elProdDelta.innerText = `▼ ${formatNum(metrics.prodDelta, 0)} vs meta`;
    }
  }

  // CARD 2: LIFTING COST PROMEDIO
  const elLiftVal = document.getElementById('kpi-lift-val');
  const elLiftDelta = document.getElementById('kpi-lift-delta');
  if (elLiftVal && elLiftDelta) {
    elLiftVal.innerHTML = `${formatNum(metrics.liftingAvg, 2)} <span class="kpi-unit">USD/bbl</span>`;
    
    // En costos, menos es mejor (up) y más es crítico (critical)
    if (metrics.liftingAvg <= 15.0) {
      elLiftDelta.className = "kpi-delta up";
      elLiftDelta.innerText = `▼ -${formatNum(Math.abs(metrics.liftingDelta), 2)} óptimo`;
    } else if (metrics.liftingAvg <= 20.0) {
      elLiftDelta.className = "kpi-delta warn";
      elLiftDelta.innerText = `▲ +${formatNum(metrics.liftingDelta, 2)} desvío`;
    } else {
      elLiftDelta.className = "kpi-delta critical";
      elLiftDelta.innerText = `▲ +${formatNum(metrics.liftingDelta, 2)} crítico`;
    }
  }

  // CARD 3: PUNTO DE EQUILIBRIO (BREAKEVEN)
  const elBeVal = document.getElementById('kpi-be-val');
  const elBeDelta = document.getElementById('kpi-be-delta');
  if (elBeVal && elBeDelta) {
    elBeVal.innerHTML = `${formatNum(metrics.beAvg, 2)} <span class="kpi-unit">USD/bbl</span>`;
    
    if (metrics.beAvg <= 40.0) {
      elBeDelta.className = "kpi-delta up";
      elBeDelta.innerText = `✓ Seguro vs WTI`;
    } else {
      elBeDelta.className = "kpi-delta critical";
      elBeDelta.innerText = `⚠ Riesgo de pérdida`;
    }
  }

  // CARD 4: RATIO DE POZOS ACTIVOS
  const elPozosVal = document.getElementById('kpi-pozos-val');
  const elPozosDelta = document.getElementById('kpi-pozos-delta');
  if (elPozosVal && elPozosDelta) {
    elPozosVal.innerHTML = `${formatNum(metrics.ratioPozos, 1)} <span class="kpi-unit">%</span>`;
    
    if (metrics.ratioPozos >= 75.0) {
      elPozosDelta.className = "kpi-delta up";
      elPozosDelta.innerText = `▲ Óptimo`;
    } else if (metrics.ratioPozos >= 60.0) {
      elPozosDelta.className = "kpi-delta warn";
      elPozosDelta.innerText = `▼ Mantenimiento req.`;
    } else {
      elPozosDelta.className = "kpi-delta critical";
      elPozosDelta.innerText = `▼ Crítico < 60%`;
    }
  }

  // CARD 5: RESERVAS PATRIMONIALES (1P / 2P)
  const elResVal = document.getElementById('kpi-res-val');
  const elResDelta = document.getElementById('kpi-res-delta');
  if (elResVal && elResDelta) {
    elResVal.innerHTML = `${formatNum(metrics.res1P / 1000, 1)} <span class="kpi-unit">BMMbbl (1P)</span>`;
    elResDelta.className = "kpi-delta";
    elResDelta.innerText = `Soporte 2P: ${formatNum(metrics.res2P / 1000, 1)} BMMbbl`;
  }

  // CARD 6: ESTABILIDAD Y RIESGO (CV / FLARING)
  const elRiesgoVal = document.getElementById('kpi-riesgo-val');
  const elRiesgoDelta = document.getElementById('kpi-riesgo-delta');
  if (elRiesgoVal && elRiesgoDelta) {
    elRiesgoVal.innerHTML = `${formatNum(metrics.cvRiesgo, 1)} <span class="kpi-unit">% CV</span>`;
    
    if (metrics.cvRiesgo <= 15.0) {
      elRiesgoDelta.className = "kpi-delta up";
      elRiesgoDelta.innerText = `Flujo Estable · Q: ${formatNum(metrics.flaringTotal, 1)}`;
    } else {
      elRiesgoDelta.className = "kpi-delta critical";
      elRiesgoDelta.innerText = `Volátil · Flaring: ${formatNum(metrics.flaringTotal, 1)}M`;
    }
  }
}

/* ==========================================================================
   9. RENDERIZADO DE TABLAS OPERATIVAS Y RANKINGS (TABLES & RANKS ENGINE)
   ========================================================================== */
/**
 * Construye la tabla principal de control en la Portada (P0) con semáforos y barras
 */
function renderMainTable() {
  const table = document.getElementById('t-resumen');
  if (!table) return;

  // 1. Definir la estructura de cabeceras de la tabla
  table.innerHTML = `
    <thead>
      <tr>
        <th>Yacimiento</th>
        <th>Zona</th>
        <th>Producción (bbl/d)</th>
        <th>Lifting Cost</th>
        <th>Breakeven</th>
        <th>Eficiencia Pozos</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody id="tb-resumen-body"></tbody>
  `;

  const tbody = document.getElementById('tb-resumen-body');
  
  // 2. Recorrer el dataset filtrado para inyectar cada fila
  STATE.filteredDataset.forEach(row => {
    const eficiencia = row.Pozos_Totales > 0 ? (row.Pozos_Activos / row.Pozos_Totales) * 100 : 0;
    
    // Carpintería analítica: Determinar el color del semáforo según el Breakeven
    let semaforoClass = 'green';
    let estadoTexto = 'Seguro';
    if (row.Breakeven > 45) {
      semaforoClass = 'red';
      estadoTexto = 'Crítico';
    } else if (row.Breakeven > 35) {
      semaforoClass = 'amber';
      estadoTexto = 'Alerta';
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${row.Yacimiento}</strong></td>
      <td><span class="interp-tag">${row.Zona}</span></td>
      <td>${formatNum(row.Produccion, 0)}</td>
      <td>${formatNum(row.Lifting_Cost, 2)} USD</td>
      <td>${formatNum(row.Breakeven, 2)} USD</td>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="min-width: 35px;">${formatNum(eficiencia, 0)}%</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${eficiencia}%; background-color: ${eficiencia < 60 ? 'var(--red-alert)' : 'var(--amber)'}"></div>
          </div>
        </div>
      </td>
      <td>
        <span class="traffic ${semaforoClass}"></span> ${estadoTexto}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * Calcula y dibuja los rankings Top 5 y Bottom 5 basados en Margen Operativo
 */
function renderRankings() {
  const topContainer = document.getElementById('top5');
  const bottomContainer = document.getElementById('bottom5');
  
  if (!topContainer || !bottomContainer) return;

  // 1. Calcular margen operativo (Meta_Precio - Lifting_Cost) y ordenar
  // Asumimos un precio base referencial de venta de 60 USD para el ejercicio de margen
  const rankedData = [...STATE.filteredDataset].map(row => {
    const margen = 60 - (row.Lifting_Cost || 0);
    return { ...row, margen };
  });

  // Ordenar de mayor a menor margen
  rankedData.sort((a, b) => b.margen - a.margen);

  // 2. Renderizar Top 5 (Los más rentables)
  topContainer.innerHTML = '';
  const top5 = rankedData.slice(0, 5);
  top5.forEach((row, idx) => {
    topContainer.innerHTML += `
      <div class="score-row">
        <div style="display: flex; align-items: center;">
          <span class="score-rank">#${idx + 1}</span>
          <span><strong>${row.Yacimiento}</strong> (${row.Zona})</span>
        </div>
        <span style="color: var(--green-success); font-weight: 600;">+${formatNum(row.margen, 2)} USD/bbl</span>
      </div>
    `;
  });

  // 3. Renderizar Bottom 5 (Los de menor margen o mayor costo)
  bottomContainer.innerHTML = '';
  // Invertimos el orden para ver los peores primero
  const bottom5 = [...rankedData].reverse().slice(0, 5);
  bottom5.forEach((row, idx) => {
    bottomContainer.innerHTML += `
      <div class="score-row">
        <div style="display: flex; align-items: center;">
          <span class="score-rank" style="background-color: var(--red-alert); color: #fff;">#${idx + 1}</span>
          <span><strong>${row.Yacimiento}</strong> (${row.Zona})</span>
        </div>
        <span style="color: var(--red-alert); font-weight: 600;">${formatNum(row.margen, 2)} USD/bbl</span>
      </div>
    `;
  });
}

/* ==========================================================================
   10. MAPA DE CALOR MULTIDIMENSIONAL INTERACTIVO (HEATMAP ENGINE)
   ========================================================================== */
/**
 * Determina la clase de intensidad de color para las celdas del Mapa de Calor
 * @param {string} metricName - El nombre de la variable analizada
 * @param {number} value - El valor numérico de la celda
 * @returns {string} Clase CSS de intensidad (v-high, high, mid, low, v-low)
 */
function getHeatmapClass(metricName, value) {
  if (value === undefined || value === null) return 'mid';

  switch (metricName) {
    case 'Produccion':
      if (value > 2500) return 'v-high'; // Excelente flujo
      if (value > 1500) return 'high';
      if (value > 800)  return 'mid';
      if (value > 400)  return 'low';
      return 'v-low';                    // Pozo de baja productividad o marginal

    case 'Lifting_Cost':
      // Lógica Inversa: Costo bajo es excelente (v-high en rendimiento / verde)
      if (value <= 12.0) return 'v-high';
      if (value <= 15.0) return 'high';
      if (value <= 18.0) return 'mid';
      if (value <= 22.0) return 'low';
      return 'v-low';                    // Costo operativo disparado

    case 'Breakeven':
      // Lógica Inversa: Punto de equilibrio bajo es más seguro
      if (value <= 30.0) return 'v-high';
      if (value <= 38.0) return 'high';
      if (value <= 45.0) return 'mid';
      if (value <= 52.0) return 'low';
      return 'v-low';

    case 'Eficiencia':
      if (value >= 85) return 'v-high';
      if (value >= 75) return 'high';
      if (value >= 60) return 'mid';
      if (value >= 45) return 'low';
      return 'v-low';

    default:
      return 'mid';
  }
}

/**
 * Renderiza la matriz del Mapa de Calor en la pestaña P4
 */
function renderHeatmap() {
  const container = document.getElementById('heatmap-container');
  if (!container) return;

  // 1. Inyectar la fila de encabezados de la cuadrícula
  container.innerHTML = `
    <div class="heatmap-row" style="border-bottom: 2px solid var(--border-color); padding-bottom: 8px; margin-bottom: 4px; font-weight: 600; color: var(--text-muted); font-size: 11px; text-transform: uppercase;">
      <div>Yacimiento</div>
      <div style="text-align: center;">Volumen (bbl/d)</div>
      <div style="text-align: center;">Lifting Cost</div>
      <div style="text-align: center;">Breakeven</div>
      <div style="text-align: center;">Eficiencia Pozos</div>
      <div style="text-align: center;">Riesgo (Flaring)</div>
    </div>
  `;

  // 2. Recorrer los datos filtrados para construir la matriz fila por fila
  STATE.filteredDataset.forEach(row => {
    const eficiencia = row.Pozos_Totales > 0 ? (row.Pozos_Activos / row.Pozos_Totales) * 100 : 0;
    
    // Evaluar la intensidad de cada celda de forma independiente
    const classProd  = getHeatmapClass('Produccion', row.Produccion);
    const classLift  = getHeatmapClass('Lifting_Cost', row.Lifting_Cost);
    const classBe    = getHeatmapClass('Breakeven', row.Breakeven);
    const classEf    = getHeatmapClass('Eficiencia', eficiencia);
    
    // El riesgo por flaring lo evaluamos de forma directa y simple para la celda final
    const classRisk  = row.Flaring > 15 ? 'v-low' : (row.Flaring > 5 ? 'mid' : 'v-high');

    // 3. Ensamblar la fila utilizando comillas invertidas (String Literals multilínea)
    const rowDiv = document.createElement('div');
    rowDiv.className = 'heatmap-row';
    rowDiv.innerHTML = `
      <div class="heatmap-label" title="${row.Yacimiento} (${row.Zona})">
        <strong>${row.Yacimiento}</strong>
        <div style="font-size: 10px; color: var(--text-muted);">${row.Zona}</div>
      </div>
      <div class="heatmap-cell ${classProd}" title="Producción: ${formatNum(row.Produccion, 0)} bbl/d">${formatNum(row.Produccion, 0)}</div>
      <div class="heatmap-cell ${classLift}" title="Lifting Cost: ${formatNum(row.Lifting_Cost, 2)} USD/bbl">${formatNum(row.Lifting_Cost, 1)}</div>
      <div class="heatmap-cell ${classBe}" title="Breakeven: ${formatNum(row.Breakeven, 2)} USD/bbl">${formatNum(row.Breakeven, 1)}</div>
      <div class="heatmap-cell ${classEf}" title="Eficiencia: ${formatNum(eficiencia, 1)}%">${formatNum(eficiencia, 0)}%</div>
      <div class="heatmap-cell ${classRisk}" title="Flaring: ${formatNum(row.Flaring, 1)} M bbl">${row.Flaring > 15 ? 'CRÍT' : 'OK'}</div>
    `;
    container.appendChild(rowDiv);
  });
}

/* ==========================================================================
   11. MOTOR DE GRÁFICOS DINÁMICOS INTERACTIVOS (CHART ENGINE)
   ========================================================================== */
// Objeto de control para almacenar las instancias vivas de Chart.js
// Esto nos permite destruir los gráficos previos antes de redibujarlos
const CHARTS = {
  prodAnual: null,  /* Gráfico de barras de producción por yacimiento (P1) */
  costosBe: null,   /* Gráfico de dispersión/líneas de Lifting vs Breakeven (P2) */
  reservasPie: null /* Gráfico de torta/dona de la distribución de reservas (P3) */
};

/**
 * Orquesta el renderizado y la actualización de todos los gráficos del sistema
 */
function renderAllCharts() {
  const data = STATE.filteredDataset;

  // Si no hay datos tras filtrar, no tiene sentido dibujar los gráficos
  if (data.length === 0) return;

  // 1. EXTRAER ARREGLOS DE DATOS PARA LOS EJES
  const nombresYacimientos = data.map(row => row.Yacimiento);
  const volumenesProd = data.map(row => row.Produccion || 0);
  const liftingCosts = data.map(row => row.Lifting_Cost || 0);
  const breakevens = data.map(row => row.Breakeven || 0);
  const reservas1P = data.map(row => row.Reservas_1P || 0);

  // ========================================================================
  // GRÁFICO 1: PORTAFOLIO DE PRODUCCIÓN (PÉSTANA P1) - Gráfico de Barras
  // ========================================================================
  const ctxProd = document.getElementById('chart-produccion');
  if (ctxProd) {
    // Control de calidad: Si el gráfico ya existía, se destruye para liberar memoria
    if (CHARTS.prodAnual) CHARTS.prodAnual.destroy();

    CHARTS.prodAnual = new Chart(ctxProd.getContext('2d'), {
      type: 'bar',
      data: {
        labels: nombresYacimientos,
        datasets: [{
          label: 'Producción de Crudo (bbl/d)',
          data: volumenesProd,
          backgroundColor: 'rgba(232, 168, 50, 0.75)', /* Dorado corporativo con transparencia */
          borderColor: 'var(--amber)',                /* Borde dorado sólido */
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false } /* Ocultamos la leyenda para ganar espacio limpio */
        },
        scales: {
          y: {
            grid: { color: '#1e293b' },
            ticks: { color: '#8a99ad', font: { size: 11 } }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#8a99ad', font: { size: 10 } }
          }
        }
      }
    });
  }

  // ========================================================================
  // GRÁFICO 2: EFICIENCIA DE COSTOS (PESTÁÑA P2) - Gráfico Combinado
  // ========================================================================
  const ctxCostos = document.getElementById('chart-costos');
  if (ctxCostos) {
    if (CHARTS.costosBe) CHARTS.costosBe.destroy();

    CHARTS.costosBe = new Chart(ctxCostos.getContext('2d'), {
      type: 'line',
      data: {
        labels: nombresYacimientos,
        datasets: [
          {
            label: 'Lifting Cost (USD/bbl)',
            data: liftingCosts,
            borderColor: '#10b981', /* Verde para eficiencia operativa */
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            tension: 0.2,
            fill: true
          },
          {
            label: 'Breakeven (USD/bbl)',
            data: breakevens,
            borderColor: 'var(--red-alert)', /* Rojo para el techo crítico de equilibrio */
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 5], /* Línea punteada para denotar umbral de riesgo */
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#e2e8f0', font: { size: 11 } } }
        },
        scales: {
          y: {
            grid: { color: '#1e293b' },
            ticks: { color: '#8a99ad' }
          },
          x: {
            grid: { color: '#1e293b' },
            ticks: { color: '#8a99ad', font: { size: 10 } }
          }
        }
      }
    });
  }

  // ========================================================================
  // GRÁFICO 3: BALANCE DE RESERVAS MATRICIAL (PESTÁÑA P3) - Gráfico de Dona
  // ========================================================================
  const ctxReservas = document.getElementById('chart-reservas');
  if (ctxReservas) {
    if (CHARTS.reservasPie) CHARTS.reservasPie.destroy();

    // Reducimos a los top 4 yacimientos con más reservas y agrupamos el resto en "Otros"
    // Esto evita que la dona se sobrecargue con demasiadas rebanadas ilegibles
    const sortedReservas = [...data].sort((a, b) => (b.Reservas_1P || 0) - (a.Reservas_1P || 0));
    const topYacimientos = sortedReservas.slice(0, 4).map(r => r.Yacimiento);
    const topVals = sortedReservas.slice(0, 4).map(r => r.Reservas_1P || 0);
    
    if (sortedReservas.length > 4) {
      const restoSuma = sortedReservas.slice(4).reduce((acc, r) => acc + (r.Reservas_1P || 0), 0);
      topYacimientos.push('Otros Yacimientos');
      topVals.push(restoSuma);
    }

    CHARTS.reservasPie = new Chart(ctxReservas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: topYacimientos,
        datasets: [{
          data: topVals,
          backgroundColor: [
            '#e8a832', /* Dorado principal de tu marca */
            '#10b981', /* Verde success */
            '#3b82f6', /* Azul de control */
            '#8b5cf6', /* Púrpura de reservas profundas */
            '#475569'  /* Gris muted para 'Otros' */
          ],
          borderWidth: 2,
          borderColor: 'var(--bg-panel)' /* Separación elegante del color de fondo */
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: '#e2e8f0', font: { size: 11 } }
          }
        }
      }
    });
  }
}

/* ==========================================================================
   12. MOTOR NARRATIVO DE HISTORIAS INTERPRETATIVAS (STORYTELLING ENGINE)
   ========================================================================== */
/**
 * Analiza el estado de las métricas actuales y actualiza la pestaña narrativa (P6)
 */
function renderNarrativeStories() {
  const metrics = calculateGlobalMetrics();
  const container = document.getElementById('storytelling-container');
  if (!container) return;

  // 1. Limpiar el contenedor narrativo
  container.innerHTML = '';

  // 2. Historia 1: Diagnóstico de la Producción vs Metas de la Cuenca
  const story1Active = metrics.prodTotal < 120000; // Alerta si no alcanzamos la meta país
  const card1 = document.createElement('div');
  card1.className = `story-card ${story1Active ? 'active' : ''}`;
  card1.innerHTML = `
    <div class="story-num">01</div>
    <div class="story-body">
      <div class="story-title">Brecha Volumétrica y Capacidad de Entrega</div>
      <p class="story-plain">El portafolio activo registra un volumen de extracción consolidado de <strong>${formatNum(metrics.prodTotal, 0)} bbl/d</strong>.</p>
      <div class="story-detail"><strong>Diagnóstico:</strong> El flujo actual se encuentra ${metrics.prodDelta < 0 ? 'por debajo' : 'por encima'} de la meta referencial de la cuenca (120,000 bbl/d).</div>
      <div class="story-evidence"><strong>Evidencia estadística:</strong> Desviación neta de ${formatNum(metrics.prodDelta, 0)} bbl/d contra el plan operativo anual.</div>
      <div class="story-action"><strong>Acción Recomendada:</strong> Evaluar cuellos de botella en las líneas de flujo de los yacimientos con semáforos en alerta o críticos.</div>
    </div>
  `;
  container.appendChild(card1);

  // 3. Historia 2: Evaluación del Umbral de Eficiencia Financiera (Lifting Cost)
  const story2Active = metrics.liftingAvg > 15.0; // Alerta si superamos los 15 USD/bbl
  const card2 = document.createElement('div');
  card2.className = `story-card ${story2Active ? 'active' : ''}`;
  card2.innerHTML = `
    <div class="story-num">02</div>
    <div class="story-body">
      <div class="story-title">Vulnerabilidad de la Estructura de Costos Operativos</div>
      <p class="story-plain">El promedio ponderado del Lifting Cost se sitúa en <strong>${formatNum(metrics.liftingAvg, 2)} USD/bbl</strong>.</p>
      <div class="story-detail"><strong>Diagnóstico:</strong> ${story2Active ? 'La eficiencia está comprometida.' : 'Estructura de costos optimizada bajo el estándar de la cuenca.'}</div>
      <div class="story-evidence"><strong>Evidencia estadística:</strong> Margen operativo promedio estimado en ${formatNum(60 - metrics.liftingAvg, 2)} USD/bbl (asumiendo precio base de realización de 60 USD).</div>
      <div class="story-action"><strong>Acción Recomendada:</strong> Aplicar auditoría de contratos de servicios de pozos en los yacimientos ubicados en el Bottom 5 de rentabilidad.</div>
    </div>
  `;
  container.appendChild(card2);

  // 4. Historia 3: Estabilidad y Gestión de Riesgo Ambiental (Flaring / Volatilidad)
  const story3Active = metrics.cvRiesgo > 15.0; // Alerta si el Coeficiente de Variación supera el 15%
  const card3 = document.createElement('div');
  card3.className = `story-card ${story3Active ? 'active' : ''}`;
  card3.innerHTML = `
    <div class="story-num">03</div>
    <div class="story-body">
      <div class="story-title">Análisis de Riesgo Superficial y Quema de Gas (Flaring)</div>
      <p class="story-plain">El Coeficiente de Variación de la producción arroja un <strong>${formatNum(metrics.cvRiesgo, 1)}%</strong>, con un volumen de Flaring acumulado de <strong>${formatNum(metrics.flaringTotal, 1)} M bbl equivalent</strong>.</p>
      <div class="story-detail"><strong>Diagnóstico:</strong> ${story3Active ? 'Inestabilidad operacional severa y pérdida de valor por venteo/quema de gas.' : 'Operación mecánicamente estable con niveles tolerables de quema.'}</div>
      <div class="story-evidence"><strong>Evidencia estadística:</strong> Volatilidad de producción por encima del umbral seguro corporativo del 15%.</div>
      <div class="story-action"><strong>Acción Recomendada:</strong> Inspeccionar los sistemas de compresión de gas e implementar proyectos de reinyección para mitigar penalizaciones ambientales.</div>
    </div>
  `;
  container.appendChild(card3);

  // 5. Inyectar Banner de Conclusión Dinámica Automatizada
  const conclusionDiv = document.createElement('div');
  conclusionDiv.className = 'conclusion-banner';
  conclusionDiv.innerHTML = `
    <strong>Conclusión del Sistema Dictaminada:</strong> El portafolio analizado presenta un Punto de Equilibrio promedio de 
    <strong>${formatNum(metrics.beAvg, 2)} USD/bbl</strong>. Frente a las dinámicas del WTI, el portafolio se define operacionalmente como 
    ${metrics.beAvg <= 40 ? '<span style="color:var(--green-success); font-weight:700;">RESILIENTE</span>' : '<span style="color:var(--red-alert); font-weight:700;">VULNERABLE</span>'}. 
    Se sugiere priorizar la asignación de capital (CAPEX) exclusivamente hacia los bloques que lideran el ranking Top 5 de márgenes.
  `;
  container.appendChild(conclusionDiv);
}



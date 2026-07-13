# 🛢️ Oilfield Analytics Dashboard - Anzoátegui Portafolio

<!-- INSIGNIAS DE TECNOLOGÍAS (BADGES) -->
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

<!-- INSIGNIAS METRIZADAS DE ROL Y ARQUITECTURA -->
![Role](https://img.shields.io/badge/Role-Data%20Analytic%20%26%20Engineering-E8A832?style=for-the-badge&labelColor=1E293B)
![Architecture](https://img.shields.io/badge/Architecture-Vanilla%20JS%20%28Client--Side%29-1E293B?style=for-the-badge&labelColor=475569)

---

¡Bienvenido! Este es un sistema de control analítico e interpretativo multidimensional diseñado para la evaluación operativa y financiera de yacimientos petroleros en la región de Anzoátegui. La aplicación opera de forma local y nativa (*Client-Side*), garantizando el procesamiento seguro de datos de producción y costos sin dependencias de servidores externos.

<p align="center"><img src="assets/logo_personal_dorado.png"  alt="Logo del Proyecto"></p> 

---

## 🚀 Características Clave del Sistema

* **Aduana de Carga Dinámica:** Zona de arrastre (*Drag & Drop*) con validación de esquemas y procesamiento asíncrono de archivos CSV a través de la API `FileReader`.
* **Motor Analítico en Memoria:** Cálculo automatizado de KPIs críticos en tiempo real:
  * Volumen de extracción consolidado (bbl/d).
  * Promedio ponderado de *Lifting Cost* (USD/bbl).
  * Umbrales de equilibrio (*Breakeven*) contra precios de referencia internacionales.
  * Ratios de eficiencia mecánica de pozos (Pozos Activos vs. Totales).
* **Visualización Multidimensional:** Gráficos elásticos interactivos desarrollados con **Chart.js** (portafolio de producción, curvas de eficiencia de costos y balance de reservas 1P/2P).
* **Diagnóstico Térmico:** Mapa de calor interactivo con evaluación condicional de rendimiento (identificación instantánea de bloques marginales o críticos).
* **Módulo Narrativo Inteligente:** Motor de *storytelling* de datos que evalúa desviaciones estadísticas y dictamina acciones recomendadas automatizadas para la alta gerencia.

---

## 🛠️ Tecnologías Empleadas

* **Arquitectura:** HTML5 Semántico y CSS3 Avanzado (Diseño *Dark & Gold*, Grid, Flexbox, variables globales y layouts elásticos).
* **Lógica de Negocio:** Vanilla JavaScript (ES6+), programación modular, gestión de estado global (`STATE`) e interpolación de plantillas multilínea.
* **Librerías Externas:** Chart.js (CDN) con ciclo de vida controlado (destrucción e inicialización dinámica de instancias para optimización de memoria RAM).
* **Control de Versiones:** Git y GitHub.

---

## 📊 Plantilla de Datos Requerida (CSV)

El sistema requiere un archivo con formato delimitado por comas (`.csv`) con codificación UTF-8. Las cabeceras deben mantener la siguiente estructura tipográfica estricta:

```csv
Yacimiento,Zona,Anio,Produccion,Lifting_Cost,Breakeven,Pozos_Activos,Pozos_Totales,Reservas_1P,Reservas_2P,Flaring
```
⚠️ Nota: Se genera un archivo `DEMO_DATA.csv` en el repositorio como set de datos multianual de simulación listo para pruebas.

## 💻 Instalación y Despliegue Local
Al estar construido sobre tecnología web nativa, el proyecto no requiere configuraciones complejas de Node.js ni bases de datos activas:

1. Clona este repositorio en tu máquina local:

```bash
git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
```
2. Abre la carpeta del proyecto en tu editor (ej. `Visual Studio Code`).

3. Levanta un servidor local utilizando la extensión Live Server (clic derecho sobre `index.html` -> `Open with Live Server`).

4. Presiona el botón `Usar datos de ejemplo (15 yacimientos)` en la aduana de entrada y explora los tableros analíticos.

---

## 👤 Autor y Contacto

<table align="center">
  <tr>
    <td align="center" width="150">
      <img src="assets/foto_personal.jpg" width="120" style="border-radius:50%;" alt="Ramón Antonio Guerra Acosta"><br>
      <strong>Ramón Guerra</strong><br>
      <small>Data Analyst</small>
    </td>
    <td>
      <p>Sistema desarrollado como parte del portafolio técnico enfocado en la optimización analítica y toma de decisiones estratégicas dentro del sector hidrocarburos.</p>
      <!-- BADGES DE CONTACTO PROFESIONAL -->
      <a href="mailto:ramonguerraa@gmail.com">
        <img src="https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white" alt="Email">
      </a>
      <a href="https://linkedin.com/in/ramonguerraa-data-analyst" target="_blank">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn">
      </a>
      <a href="https://github.com/ramonguerraa/dashboard_yacimientos_anzoategui" target="_blank">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub">
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <small>Desarrollado con dedicación y rigor técnico • Región Oriental, Venezuela • 2026</small>
</p>

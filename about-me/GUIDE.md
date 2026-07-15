# Guía de Plantillas y Clases Reutilizables - Sobre Mí

Esta guía contiene la documentación y los bloques de código HTML listos para copiar y pegar en `about-me/index.html` para armar tu historia. Todos estos estilos ya están vinculados y heredan la estética premium del sitio principal (incluyendo fuentes, colores, y animaciones de scroll).

---

## 1. Clases de Animación y Scroll
Para que cualquier bloque tenga animación fluida cuando el usuario hace scroll hacia él, agrégale una de estas clases de **Intersection Observer** (controladas por `app.js`):

*   `.reveal-up`: El elemento se desliza suavemente hacia arriba.
*   `.reveal-left`: Se desliza desde la izquierda.
*   `.reveal-right`: Se desliza desde la derecha.
*   `.fade-in`: Aparece de forma gradual sin traslación brusca.
*   **Retrasos:** Si tienes elementos continuos, añade `.delay-1`, `.delay-2`, `.delay-3` o `.delay-4` para que aparezcan uno tras otro de forma secuencial.

---

## 2. Bloques de Contenido Reutilizables (Copy-Paste)

### Bloque A: Texto y Foto Normal (Foto Izquierda / Texto Derecha)
Ideal para iniciar capítulos o introducir secciones con una foto al lado del texto.

```html
<section class="story-section">
    <div class="container">
        <div class="story-grid">
            <!-- Columna de Imagen -->
            <div class="story-image-col reveal-left">
                <div class="image-frame">
                    <img src="../assets/images/TU-IMAGEN.jpg" alt="Descripción de la imagen">
                </div>
            </div>
            <!-- Columna de Texto -->
            <div class="story-text reveal-right">
                <span class="section-tag">01. Subtítulo</span>
                <h3>Título de la Sección</h3>
                <p>Escribe aquí tu primer párrafo explicativo. Puedes destacar texto con la etiqueta <strong>negrita destacada</strong>.</p>
                <p>Escribe aquí tu segundo párrafo.</p>
            </div>
        </div>
    </div>
</section>
```

---

### Bloque B: Texto y Foto Invertida (Foto Derecha / Texto Izquierda)
Ideal para ir alternando la lectura y que la página no se vuelva monótona. Solo se añade la clase `.reverse` en el elemento `.story-grid`. El orden del HTML se mantiene limpio y CSS se encarga del orden visual.

```html
<section class="story-section bg-alternate">
    <div class="container">
        <div class="story-grid reverse">
            <!-- Columna de Imagen (Mantiene el mismo orden en HTML) -->
            <div class="story-image-col reveal-right">
                <div class="image-frame">
                    <img src="../assets/images/TU-IMAGEN.jpg" alt="Descripción de la imagen">
                </div>
            </div>
            <!-- Columna de Texto -->
            <div class="story-text reveal-left">
                <span class="section-tag">02. Enfoque</span>
                <h3>Título del Capítulo</h3>
                <p>Tu contenido aquí. Todo se adapta perfectamente tanto a computadoras de escritorio como a celulares en modo responsive.</p>
            </div>
        </div>
    </div>
</section>
```

---

### Bloque C: Línea de Tiempo Vertical (Timeline)
Excelente para detallar tu carrera laboral, estudios o hitos importantes cronológicamente.

```html
<section class="story-section">
    <div class="container">
        <div class="section-header center">
            <span class="section-tag">Trayectoria</span>
            <h2 class="reveal-up">Línea de Tiempo</h2>
        </div>

        <div class="story-timeline reveal-up delay-1">
            <!-- Item de la Línea de Tiempo -->
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <span class="timeline-year">Año / Periodo</span>
                <div class="timeline-content">
                    <h4>Título del Hito o Puesto</h4>
                    <p>Descripción detallada de los logros, actividades realizadas o lecciones aprendidas durante este tiempo.</p>
                </div>
            </div>

            <!-- Puedes duplicar el bloque de arriba para añadir más hitos -->
        </div>
    </div>
</section>
```

---

### Bloque D: Cita / Frase Inspiracional Resaltada (Quote Banner)
Un banner ancho con bordes estilizados y una gran comilla, ideal para destacar una filosofía personal.

```html
<section class="story-section bg-alternate">
    <div class="container">
        <div class="story-quote-banner reveal-up">
            <div class="story-quote-icon">
                <i class="ph ph-quotes"></i>
            </div>
            <blockquote>
                "Tu frase o cita célebre aquí."
            </blockquote>
            <span class="story-quote-author">— Tu Nombre (NovinhoDev)</span>
        </div>
    </div>
</section>
```

---

### Bloque E: Tarjetas en Rejilla (Grid Cards)
Perfecto para destacar 3 o 4 valores fundamentales, tecnologías principales, o pilares de tu filosofía de trabajo.

```html
<section class="story-section">
    <div class="container">
        <div class="section-header center">
            <span class="section-tag">Filosofía</span>
            <h2 class="reveal-up">Mis Pilares</h2>
        </div>

        <div class="story-cards-grid reveal-up delay-1">
            <!-- Tarjeta 1 -->
            <div class="story-card-item">
                <span class="story-card-num">01/</span>
                <h4>Título del Pilar</h4>
                <p>Escribe una breve descripción del pilar o principio que rige tu forma de programar o diseñar.</p>
            </div>

            <!-- Tarjeta 2 -->
            <div class="story-card-item">
                <span class="story-card-num">02/</span>
                <h4>Segundo Pilar</h4>
                <p>Escribe aquí la descripción de tu segundo principio.</p>
            </div>

            <!-- Tarjeta 3 -->
            <div class="story-card-item">
                <span class="story-card-num">03/</span>
                <h4>Tercer Pilar</h4>
                <p>Escribe aquí la descripción de tu tercer principio.</p>
            </div>
        </div>
    </div>
</section>
```

---

### Bloque F: Caja de Resaltado dentro de Texto (Highlight Box)
Úsala directamente dentro de cualquier contenedor de `.story-text` para destacar un punto importante o frase pequeña.

```html
<div class="highlight-box">
    <p>"Escribe aquí el texto que deseas resaltar de forma elegante."</p>
</div>
```

---

## 3. Clases de Fondo de Sección
Puedes alternar entre fondos para crear ritmo en la página usando las siguientes clases en la etiqueta `<section>`:

1.  `class="story-section"`: Fondo oscuro por defecto (`#0a0a0a`).
2.  `class="story-section bg-alternate"`: Fondo ligeramente más oscuro (`#050505`) para separar secciones lógicamente.

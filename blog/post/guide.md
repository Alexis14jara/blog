# Guía de Estilos para Posts del Blog

Utiliza estas clases HTML para maquetar tus artículos y mantener la consistencia visual.
Asegúrate de vincular `styles.css` en tu archivo HTML.

## Estructura Principal

- `.post-hero`: Contenedor del título y portada.
- `.post-content`: Contenedor principal del texto (centrado y con ancho de lectura óptimo).

## Textos

- `.post-title`: Título H1 principal.
- `.post-meta`: Fecha y categoría encima del título.
- `<h2>`, `<h3>`: Subtítulos con espaciado automático.
- `<strong>`: Texto en negrita (blanco).
- `<a>`: Enlaces estilizados (beige).

## Componentes

### Cita Destacada

Para resaltar frases importantes:

```html
<blockquote class="post-quote">
    "La consistencia es la clave del freelancing."
</blockquote>
```

### Listas Estilizadas

Para listas con bullets personalizados:

```html
<ul class="post-list">
    <li>Elemento uno</li>
    <li>Elemento dos</li>
</ul>
```

### Caja de Información

Para notas o tips adicionales:

```html
<div class="info-box">
    <div class="info-icon"><i class="ph ph-info"></i></div>
    <div>
        <p>Tip Pro: Siempre pide un anticipo del 50%.</p>
    </div>
</div>
```

### Bloque de Código

Para mostrar snippets:

```html
<div class="code-block">console.log("Hello World");</div>
```

### Biografía del Autor

Al final del post:

```html
<div class="author-bio">
    <img
        src="../../assets/images/about-image.png"
        alt="Autor"
        class="author-avatar"
    />
    <div class="author-info">
        <h4>Escrito por Alexis Jara</h4>
        <p>Desarrollador Frontend & Creador de Contenido.</p>
    </div>
</div>
```

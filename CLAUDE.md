# SECABA · web del proyecto

<!-- Contexto para Claude Code. Mantenerlo corto y al día: solo lo que no se deduce del código. -->

## Objetivo
Web estática del proyecto de investigación SECABA (PID2023-151264NB-I00, Universidad de Jaén). Dos versiones: divulgativa (`index.html`) y técnica para especialistas (`tecnica.html`). Bilingüe ES/EN, modo claro/oscuro. Financiada con la partida de difusión del proyecto.

## Comandos
Sin build ni dependencias. Para verla en local: `python3 -m http.server 8000`.
Publicación: GitHub Pages desde `main` (raíz). El repo es público porque Pages no funciona en privados con cuenta gratuita.

## Arquitectura
- `content.js` define `window.SECABA` con todo el contenido compartido (textos ES/EN, equipo, lugares, cronograma, figuras, logos) y utilidades (idioma, escape, figuras).
- Cada página pinta su HTML desde JS a partir de ese contenido. El idioma (`secaba-lang`) y el tema (`secaba-theme`) se guardan en localStorage y los comparten las dos páginas.
- Fuente del contenido: memoria científico-técnica y solicitud del proyecto (los .docx NO se suben: contienen datos personales).

## Pendiente / supuestos
- Fechas de inicio y fin del proyecto y fórmula exacta de financiación (¿incluye FEDER/UE?): marcadas como pendientes en la web.
- Logos en alta resolución (los actuales salen de los Word y son pequeños).
- Figuras 1 y 2 (Jenkyns 2010, Föllmi 2012) tienen derechos de editorial: pedir permiso o redibujar.
- Fotos de lugares: son de ejemplo (web del proyecto PY20_00783) y van marcadas así; posiciones del mapa aproximadas.
- El Carniense (CPE) que aparece en la memoria se ha dejado fuera a propósito.
- No mostrar el correo de contacto ni etiquetas de "IP" (decisión del cliente).

## Convenciones
Las generales están en `~/.claude/CLAUDE.md`.
